<template>
  <v-expansion-panels
    class="ExpansionComponent ExpansionBordered mt-3"
    :disabled="loadingPanel"
    v-model="riskAnalysisPanel"
  >
    <v-expansion-panel @change="$emit('panel-event')">
      <!--TITULO DEL ACORDEON-->
      <v-expansion-panel-header
        @click="changeStateExpansive()"
        class="ExpansionTitle"
        expand-icon=""
      >
        Analysis

        <div class="ExpansionState HideOnMovil">
          {{ stateExpansiveMessage }}
        </div>
        <template v-slot:actions>
          <v-icon class="iconExpand">
            {{ iconExpansive }}
          </v-icon>
        </template>
      </v-expansion-panel-header>
      <!--CONTENIDO DEL ACORDEON-->
      <v-expansion-panel-content>
        <div class="ExpandContent">
          <InputsRisk @required-fields-change="onRequiredFieldsChange" />
          <RiskInformation />
          <!-- <CedentInformation /> -->
          <Deductions />
          <TotalInsurableValueBound v-if="!propEng" />
          <TotalInsurableValueBoundQuotator
            v-else-if="propEng && propEng != ''"
          />
          <NetPremiumProperty />
          <NetPremiumUsdProperty />
          <Deductibles v-if="!propEng" />
          <template v-if="propEng && propEng !== ''">
            <DeductiblesQuotator
              v-for="(item, index) in boundPropDeductibles"
              :key="`D${index}`"
              @deleteDeductible="deleteDeductible"
              :deductibleIndex="index"
              :deductibleId="item.id"
            />
          </template>

          <div class="ButtonCont" v-if="propEng && propEng != ''">
            <v-btn class="Btn" text rounded @click="addDeductible()">
              <v-icon class="mr-2"> mdi-plus-circle </v-icon>
              Add New Deductible
            </v-btn>
          </div>

          <div class="ExpansionLineTop mt-2" />

          <Sublimes v-if="!propEng" />
          <template v-if="propEng">
            <SublimesQuotator
              v-for="(item, index) in boundSublimesProp"
              :key="`S${index}`"
              @deleteSublime="deleteSublime"
              :sublimeIndex="index"
              :sublimeId="item.id"
            />
          </template>

          <div class="ButtonCont" v-if="propEng && propEng != ''">
            <v-btn class="Btn" text rounded @click="addLocation()">
              <v-icon class="mr-2"> mdi-plus-circle </v-icon>
              Add New Location
            </v-btn>
          </div>

          <PremiumPaymentWarranty
            @payments-warranty-change="onPaymentsWarrantyChange"
          />
          <BoundClaims
            :selectedRiskKey="selectedRiskKey"
            @bound-claims-change="onBoundClaimsChange"
          />

          <div class="ExpansionLineTop mt-2" />

          <Rational @rational-comments-change="onRationalCommentsChange" />
          <RiskProfile @risk-profile-change="onRiskProfileChange" />
        </div>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>
<script>
import InputsRisk from "@/components/subscription/bound/engineering/InputsRisk";
import RiskInformation from "@/components/subscription/bound/engineering/RiskInformation";
import CedentInformation from "@/components/subscription/bound/engineering/CedentInformation";
import TotalInsurableValueBound from "@/components/subscription/bound/engineering/TotalInsurableValueBound";
import TotalInsurableValueBoundQuotator from "@/components/subscription/bound/propertyQuotatorProportional/TotalInsurableValueBoundQuotator";
import Deductibles from "@/components/subscription/bound/engineering/Deductibles";
import DeductiblesQuotator from "@/components/subscription/bound/propertyQuotatorProportional/DeductiblesQuotator";
import Deductions from "@/components/subscription/quotation/Deductions";
import Sublimes from "@/components/subscription/bound/engineering/Sublimes";
import SublimesQuotator from "@/components/subscription/bound/propertyQuotatorProportional/SublimesQuotator";
import PremiumPaymentWarranty from "@/components/subscription/bound/engineering/PremiumPaymentWarranty";
import BoundClaims from "@/components/subscription/bound/engineering/BoundClaims";
import Rational from "@/components/subscription/bound/engineering/Rational";
import RiskProfile from "@/components/subscription/bound/engineering/RiskProfile";
import NetPremiumProperty from "@/components/subscription/bound/engineering/NetPremiumProperty";
import NetPremiumUsdProperty from "@/components/subscription/bound/engineering/NetPremiumUsdProperty";
import { stateExpansiveManager } from "@/mixins/subscription.js";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "RiskAnalysis",
  mixins: [stateExpansiveManager],
  data() {
    return {
      riskAnalysisPanel: 1,
      requiredFieldsCompleted: false,
      paymentsWarrantyCompleted: true,
      boundClaimsCompleted: false,
      rationalCommentsCompleted: false,
      riskProfileCompleted: false,
    };
  },
  props: {
    loadingPanel: {
      type: Boolean,
    },
    ActionIcons: {
      type: Boolean,
    },
  },
  components: {
    InputsRisk,
    RiskInformation,
    CedentInformation,
    TotalInsurableValueBound,
    TotalInsurableValueBoundQuotator,
    Deductibles,
    DeductiblesQuotator,
    Deductions,
    Sublimes,
    SublimesQuotator,
    PremiumPaymentWarranty,
    BoundClaims,
    Rational,
    RiskProfile,
    NetPremiumProperty,
    NetPremiumUsdProperty,
  },
  async mounted() {
    // Cambia el icono si el panel se muestra abierto por default
    if (this.ActionIcons === true) {
      this.changeStateExpansive();
    }
  },
  computed: {
    ...mapGetters([
      "boundEngCatDeductibles",
      "boundPropDeductibles",
      "accountInformation",
      "boundSublimesProp",
      "risk_type",
    ]),
    selectedRisk: {
      get() {
        if (
          this.accountInformation.typeOfRisk &&
          this.risk_type &&
          this.risk_type.length > 0
        ) {
          const typeObj = this.risk_type.find(
            (v) => v.id === this.accountInformation.typeOfRisk
          );
          return typeObj;
        }
        return 0;
      },
    },
    selectedRiskKey() {
      return this.selectedRisk.key || "";
    },
    propEng() {
      const valid = ["PRO", "CPE", "CECR"];
      if (valid.includes(this.selectedRiskKey)) return true;
      return false;
    },
  },
  methods: {
    ...mapActions([
      "createSublimeProperty",
      "getSublimesProperty",
      "updateSublimeProperty",
      "createDeductibleProperty",
      "getDeductiblesProperty",
      "updateDeductibleProperty",
    ]),
    async addLocation() {
      try {
        await this.createSublimeProperty();
        await this.getSublimesProperty();
      } catch (error) {
        console.error("Error adding Sublime:", error);
      }
    },
    async addDeductible() {
      try {
        await this.updateDeductibleProperty({
          id,
          column: "active",
          value: false,
        });
        await this.getDeductiblesProperty();
      } catch (error) {
        console.error("Error deleting Deductible:", error);
      }
    },
    async deleteSublime(id) {
      await this.updateSublimeProperty({ id, column: "active" });
      await this.getSublimesProperty();
    },
    async deleteDeductible(id) {
      await this.updateDeductibleProperty({
        id,
        column: "active",
        value: false,
      });
      await this.getDeductiblesProperty();
    },
    onRequiredFieldsChange(isComplete) {
      this.requiredFieldsCompleted = isComplete;
      this.emitValidationStatus();
    },

    onPaymentsWarrantyChange(isComplete) {
      this.paymentsWarrantyCompleted = isComplete;
      this.emitValidationStatus();
    },

    onBoundClaimsChange(isComplete) {
      this.boundClaimsCompleted = isComplete;
      this.emitValidationStatus();
    },

    onRationalCommentsChange(isComplete) {
      this.rationalCommentsCompleted = isComplete;
      this.emitValidationStatus();
    },

    onRiskProfileChange(isComplete) {
      this.riskProfileCompleted = isComplete;
      this.emitValidationStatus();
    },

    emitValidationStatus() {
      const allFieldsComplete =
        this.requiredFieldsCompleted &&
        this.paymentsWarrantyCompleted &&
        this.boundClaimsCompleted &&
        this.rationalCommentsCompleted &&
        this.riskProfileCompleted;

      this.$emit("all-required-fields-complete", allFieldsComplete);
    },
  },
};
</script>
<style lang="less" scoped>
@import "~@/assets/style/AccordionStyle.less";
</style>
