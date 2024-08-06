<template>
  <v-expansion-panels class="ExpansionComponent ExpansionBordered mt-3" :disabled="loadingPanel"
    v-model="riskAnalysisQuotatorPanel">
    <v-expansion-panel @change="$emit('panel-event')">
      <!--TITULO DEL ACORDEON-->
      <v-expansion-panel-header @click="changeStateExpansive()" class="ExpansionTitle" expand-icon="">
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

          <Deductions @updateNet="updateNetHandler" />

          <TotalInsurableValueBoundQuotator
            @changeTotalInsurableValueStocksRate="changeTotalInsurableValueStocksRate" />

          <NetPremiumProperty :key="dataToNet" @updateUSD="updateUSDHandler" class="my-10" v-if="true" />

          <NetPremiumUsdProperty :key="Math.random()" :netPremiumProperty="dataToPremiumUSD" class="my-10" />

          <MainLocation />
          <div class="expansion-line-top mt-2" />

          <PmlProperty />
          <div class="expansion-line-top mt-7" />

          <DeductiblesQuotator v-for="(item, index) in DeductiblesArray" @deleteDeductible="deleteDeductible"
            :deductibleIndex="+index" :deductibleId="item.id" :item="item" :key="`D${index}`" />

          <div class="ButtonCont" v-if="true">
            <v-btn class="Btn" text rounded @click="addDeductible()">
              <v-icon class="mr-2"> mdi-plus-circle </v-icon>
              Add New Location
            </v-btn>
          </div>

          <div class="expansion-line-top mt-2" />

          <SublimesQuotator v-for="(item, index) in SublimesArray" @deleteSublime="deleteSublime"
            :exchangeRate="quotation.exchangeRate" :sublimeIndex="index" :id="item.id" :item="item" :key="index" />

          <div class="ButtonCont" v-if="true">
            <v-btn class="Btn" text rounded @click="addSublime()">
              <v-icon class="mr-2"> mdi-plus-circle </v-icon>
              Add New Location
            </v-btn>
          </div>

          <PremiumPaymentWarranty />
          <Claims />

          <div class="expansion-line-top mt-2" />
          <Rational />
          <RiskProfile />
        </div>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>
<script>
/* components */
import InputsRiskQuotator from '@/components/subscription/bound/propertyQuotatorNonProportional/InputsRiskQuotator';
import RiskInformationQuotator from '@/components/subscription/bound/propertyQuotatorNonProportional/RiskInformationQuotator';
import CedentInformation from '@/components/subscription/bound/engineering/CedentInformation';
import DeductiblesQuotator from '@/components/subscription/bound/propertyQuotatorNonProportional/DeductiblesQuotator';
import SublimesQuotator from '@/components/subscription/bound/propertyQuotatorNonProportional/SublimesQuotator';
import TotalInsurableValueBoundQuotator from '@/components/subscription/bound/propertyQuotatorNonProportional/TotalInsurableValueBoundQuotator';
import MainLocation from '@/components/subscription/bound/propertyQuotatorNonProportional/MainLocation';
import PmlProperty from '@/components/subscription/bound/propertyQuotatorNonProportional/PmlProperty';
import Deductions from '@/components/subscription//bound/propertyQuotatorNonProportional/Deductions';
import PremiumPaymentWarranty from '@/components/subscription/bound/propertyQuotatorNonProportional/PremiumPaymentWarranty';
import Claims from '@/components/subscription/bound/propertyQuotatorNonProportional/Claims';
import Rational from '@/components/subscription/bound/propertyQuotatorNonProportional/Rational';
import RiskProfile from '@/components/subscription/bound/propertyQuotatorNonProportional/RiskProfile';
import NetPremiumProperty from '@/components/subscription/bound/propertyQuotatorNonProportional/NetPremiumProperty';
import NetPremiumUsdProperty from '@/components/subscription/bound/propertyQuotatorNonProportional/NetPremiumUsdProperty';
/* mixins */
import { stateExpansiveManager } from '@/mixins/subscription.js';
/* services */
import { getDeductiblesById, setNewDeductibleNonProp, setDeleteDeductibleNonProp } from './services/Deductibles/deductibles.js';
import { addSublime, getSublimes, saveSublime } from './services/SublimesQuotator/sublime-quotator.service';

export default {
  name: 'RiskAnalysisQuotator',
  mixins: [stateExpansiveManager],
  data () {
    return {
      riskAnalysisQuotatorPanel: 1,
      SublimesArray: [],
      DeductiblesArray: [],
      dataToPremiumUSD: null,
      dataToNet: Math.random(),
      quotation: { exchangeRate: 0 },
      subscription: { subscriptionId: false }
    };
  },
  props: {
    loadingPanel: {
      type: Boolean,
    },
  },
  provide () {
    return {
      quotation: this.quotation,
      subscription: this.subscription
    }
  },
  components: {
    InputsRiskQuotator,
    RiskInformationQuotator,
    CedentInformation,
    TotalInsurableValueBoundQuotator,
    NetPremiumProperty,
    NetPremiumUsdProperty,
    MainLocation,
    PmlProperty,
    DeductiblesQuotator,
    SublimesQuotator,
    Deductions,
    PremiumPaymentWarranty,
    Claims,
    Rational,
    RiskProfile,
  },
  async mounted () {
    this.subscription.subscriptionId = this.$route.params?.subscriptionId
    if (this.subscription.subscriptionId) {
      this.DeductiblesArray = await getDeductiblesById({ id: this.subscription.subscriptionId });
      const sublimes = await getSublimes(this.subscription.subscriptionId);
      this.SublimesArray = sublimes?.BoundSublimesProps
      this.quotation.exchangeRate = sublimes?.Quotation?.exchange_rate
    }
  },
  methods: {
    async deleteSublime (id, index) {
      const { message } = await saveSublime(id, 'active', false)
      if (message === "success")
        this.SublimesArray.splice(index, 1)
    },
    async addSublime () {
      const data = await addSublime(this.subscription.subscriptionId)
      if (data) {
        const sublimes = await getSublimes(this.subscription.subscriptionId);
        this.SublimesArray = sublimes?.BoundSublimesProps
      }
    },
    async addDeductible () {
      await setNewDeductibleNonProp({ id_subscription: this.subscription.subscriptionId });
      this.DeductiblesArray = await getDeductiblesById({ id: this.subscription.subscriptionId });
    },
    async deleteDeductible (id) {
      await setDeleteDeductibleNonProp({ id: id });
      this.DeductiblesArray = await getDeductiblesById({ id: this.subscription.subscriptionId });
    },
    async updateUSDHandler (data) {
      this.dataToPremiumUSD = data
      this.$set(this.dataToPremiumUSD, data);

    },
    async updateNetHandler () {
      this.dataToNet = Math.random()
    },
    changeTotalInsurableValueStocksRate (value) {
      this.$emit('changeTotalInsurableValueStocksRate', value)
    }
  },
};
</script>
<style lang="less" scoped>
@import '~@/assets/style/AccordionStyle.less';

.expansion-line-top {
  background: #d2deed !important;
}
</style>
