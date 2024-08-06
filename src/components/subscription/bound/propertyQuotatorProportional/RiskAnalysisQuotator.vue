<template>
  <v-expansion-panels
    class="ExpansionComponent ExpansionBordered mt-3"
    :disabled="loadingPanel"
    v-model="riskAnalysisQuotatorPanel"
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
          <InputsRiskQuotator />
          <RiskInformationQuotator />
          <!-- <CedentInformation /> -->
          <Deductions />
          <TotalInsurableValueBound v-if="!propEng" />
          <TotalInsurableValueBoundQuotator
            v-else-if="propEng && propEng != ''"
          />

          <NetPremiumProperty class="my-10" v-if="propEng && propEng != ''" />
          <NetPremiumUsdProperty
            class="my-10"
            v-if="propEng && propEng != ''"
          />

          <MainLocation />
          <div class="ExpansionLineTop mt-2" />

          <PmlProperty />
          <div class="ExpansionLineTop mt-7" />

          <Deductibles v-if="!propEng" />
          <DeductiblesQuotator
            v-else-if="propEng && propEng != ''"
            v-for="(item, index) in boundPropDeductibles"
            @deleteDeductible="deleteDeductible"
            :deductibleIndex="index"
            :deductibleId="item.id"
            :key="`D${index}`"
          />

          <div class="ButtonCont" v-if="propEng && propEng != ''">
            <v-btn class="Btn" text rounded @click="addDeductible()">
              <v-icon class="mr-2"> mdi-plus-circle </v-icon>
              Add New Location
            </v-btn>
          </div>

          <div class="ExpansionLineTop mt-2" />

          <Sublimes v-if="!propEng" />
          <SublimesQuotator
            v-else-if="propEng && propEng != ''"
            v-for="(item, index) in boundSublimesProp"
            @deleteSublime="deleteSublime"
            :sublimeIndex="index"
            :sublimeId="item.id"
            :key="index"
          />

          <div class="ButtonCont" v-if="propEng && propEng != ''">
            <v-btn class="Btn" text rounded @click="addLocation()">
              <v-icon class="mr-2"> mdi-plus-circle </v-icon>
              Add New Location
            </v-btn>
          </div>

          <PremiumPaymentWarranty />
          <BoundClaims />

          <div class="ExpansionLineTop mt-2" />
          <Rational />
          <RiskProfile />
        </div>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>
<script>
import InputsRiskQuotator from '@/components/subscription/bound/propertyQuotatorProportional/InputsRiskQuotator';
import RiskInformationQuotator from '@/components/subscription/bound/propertyQuotatorProportional/RiskInformationQuotator';
import CedentInformation from '@/components/subscription/bound/engineering/CedentInformation';
import Deductibles from '@/components/subscription/bound/engineering/Deductibles';
import DeductiblesQuotator from '@/components/subscription/bound/propertyQuotatorProportional/DeductiblesQuotator';
import SublimesQuotator from '@/components/subscription/bound/propertyQuotatorProportional/SublimesQuotator';
import TotalInsurableValueBound from '@/components/subscription/bound/engineering/TotalInsurableValueBound';
import TotalInsurableValueBoundQuotator from '@/components/subscription/bound/propertyQuotatorProportional/TotalInsurableValueBoundQuotator';
import MainLocation from '@/components/subscription/bound/propertyQuotatorProportional/MainLocation';
import PmlProperty from '@/components/subscription/bound/propertyQuotatorProportional/PmlProperty';
import Deductions from '@/components/subscription/quotation/Deductions';
import Sublimes from '@/components/subscription/bound/engineering/Sublimes';
import PremiumPaymentWarranty from '@/components/subscription/bound/engineering/PremiumPaymentWarranty';
import BoundClaims from '@/components/subscription/bound/engineering/BoundClaims';
import Rational from '@/components/subscription/bound/engineering/Rational';
import RiskProfile from '@/components/subscription/bound/engineering/RiskProfile';
import NetPremiumProperty from '@/components/subscription/bound/propertyQuotatorProportional/NetPremiumProperty';
import NetPremiumUsdProperty from '@/components/subscription/bound/propertyQuotatorProportional/NetPremiumUsdProperty';

import { stateExpansiveManager } from '@/mixins/subscription.js';
import { mapActions, mapGetters, mapMutations } from 'vuex';
export default {
  name: 'RiskAnalysisQuotator',
  mixins: [stateExpansiveManager],
  data() {
    return {
      riskAnalysisQuotatorPanel: 1,
    };
  },
  props: {
    loadingPanel: {
      type: Boolean,
    },
  },
  components: {
    InputsRiskQuotator,
    RiskInformationQuotator,
    CedentInformation,
    TotalInsurableValueBound,
    TotalInsurableValueBoundQuotator,
    NetPremiumProperty,
    NetPremiumUsdProperty,
    MainLocation,
    PmlProperty,
    Deductibles,
    DeductiblesQuotator,
    SublimesQuotator,
    Deductions,
    Sublimes,
    PremiumPaymentWarranty,
    BoundClaims,
    Rational,
    RiskProfile,
  },
  computed: {
    ...mapGetters([
      'boundEngCatDeductibles',
      'boundPropDeductibles',
      'accountInformation',
      'boundSublimesProp',
      'risk_type',
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
      return this.selectedRisk.key || '';
    },
    propEng() {
      const valid = ['PRO', 'CPE', 'CECR'];
      if (valid.includes(this.selectedRiskKey)) return true;
      return false;
    },
  },
  methods: {
    ...mapActions([
      'updateQuotationType',
      'checkSubscriptionStored',
      'getQuotationInformation',
      'getCatalogByName',
      'updateSubscriptionStatus',
      'addNewFieldBound',
      'createSublimeProperty',
      'getSublimesProperty',
      'updateSublimeProperty',
      'createDeductibleProperty',
      'getDeductiblesProperty',
      'updateDeductibleProperty',
    ]),
    async addLocation() {
      await this.createSublimeProperty();
      await this.getSublimesProperty();
    },
    async deleteSublime(id) {
      await this.updateSublimeProperty({ id, column: 'active' });
      await this.getSublimesProperty();
    },
    async addDeductible() {
      await this.createDeductibleProperty()
      await this.getDeductiblesProperty();
    },
    async deleteDeductible(id) {
      await this.updateDeductibleProperty({ id, column: 'active', value: false });
      await this.getDeductiblesProperty();
    },
  },
};
</script>
<style lang="less" scoped>
@import '~@/assets/style/AccordionStyle.less';
.ExpansionLineTop {
  background: #d2deed !important;
}
</style>
