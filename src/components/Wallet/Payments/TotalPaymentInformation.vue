<template>
  <v-expansion-panels class="ExpansionComponent ExpansionBordered mt-7">
    <v-expansion-panel>
      <v-expansion-panel-header @click="changeStateExpansive()" class="ExpansionTitle" expand-icon="">
        <!--Titulo del acordeon-->
        Total Payment Information
        <div class="ExpansionState HideOnMovil">
          {{ stateExpansiveMessage }}
        </div>
        <template v-slot:actions>
          <v-icon class="iconExpand">
            {{ iconExpansive }}
          </v-icon>
        </template>
      </v-expansion-panel-header>

      <v-expansion-panel-content>
        <div class="ExpandContent justify-center">
          <!--Total Payment Information-->
        	<div class="Table">

        		<div class="Line BorderBottom">
        			<div class="Row Label" />
        			<div class="Row Medium" />
        			<div class="Row Small" />
        			<div class="Row font-weight-bold">
        				Deductions
        			</div>
              <div class="Row font-weight-bold">
                USD
              </div>
            </div>

            <div class="Line">
              <div class="Row Label">
                SLU Gross Premium
              </div>
              <div class="Row Medium NoDrop">
                <v-text-field :disabled="DisabledInputs" />
              </div>
              <div class="Row Small">
                <v-text-field v-model="boundInsurable.sluLine" suffix="%" />
              </div>
              <div class="Row">
                <v-text-field v-model="sluGross" />
              </div>
              <div class="Row align-right">
                <v-text-field v-model="sluGrossUSD" />
              </div>
            </div>

            <div class="Line">
              <div class="Row Label">
                Brokerage
              </div>
              <div class="Row Medium NoDrop">
                <v-text-field :disabled="DisabledInputs" />
              </div>
              <div class="Row Small">
                <v-text-field v-model="deductions.brokerage" suffix="%" />
              </div>
              <div class="Row">
                <v-text-field prefix="$" v-model="brokerageOC" />
              </div>
              <div class="Row align-right">
                <v-text-field prefix="$" v-model="brokerageUSD" />
              </div>
            </div>

            <div class="Line">
              <div class="Row Label">
                Tax
              </div>
              <div class="Row Medium NoDrop">
                <v-text-field :disabled="DisabledInputs" />
              </div>
              <div class="Row Small">
                <v-text-field v-model="deductions.taxes" suffix="%" />
              </div>
              <div class="Row">
                <v-text-field prefix="$" v-model="taxesOC" />
              </div>
              <div class="Row align-right">
                <v-text-field prefix="$" v-model="taxesUSD" />
              </div>
            </div>

            <div class="Line">
              <div class="Row Label">
                Eng Fee
              </div>
              <div class="Row Medium NoDrop">
                <v-select :items="EngFeeOptions" v-model="deductions.deductionType" />
              </div>
              <div class="Row Small">
                <v-text-field v-model="deductions.eng" suffix="%" />
              </div>
              <div class="Row">
                <v-text-field prefix="$" v-model="engOC" />
              </div>
              <div class="Row align-right">
                <v-text-field prefix="$" v-model="engUSD" />
              </div>
            </div>

            <div class="Line">
              <div class="Row Label">
                LTA
              </div>
              <div class="Row Medium NoDrop">
                <v-text-field :disabled="DisabledInputs" />
              </div>
              <div class="Row Small">
                <v-text-field v-model="deductions.lta" suffix="%" />
              </div>
              <div class="Row">
                <v-text-field prefix="$" v-model="ltaOC" />
              </div>
              <div class="Row align-right">
                <v-text-field prefix="$" v-model="ltaUSD" />
              </div>
            </div>

            <div class="Line BorderBottom">
              <div class="Row Label">
                Others
              </div>
              <div class="Row Medium NoDrop">
                <v-text-field :disabled="DisabledInputs" />
              </div>
              <div class="Row Small">
                <v-text-field v-model="deductions.others" suffix="%" />
              </div>
              <div class="Row">
                <v-text-field prefix="$" v-model="othersOC" />
              </div>
              <div class="Row align-right">
                <v-text-field prefix="$" v-model="othersUSD" />
              </div>
            </div>

            <div class="Line">
              <div class="Row Label">
                Fronting Fee
              </div>
              <div class="Row Medium">
                <v-select :items="FrontingFeeOptions" />
              </div>
              <div class="Row Small">
                <v-text-field v-model="deductions.fronting" suffix="%" />
              </div>
              <div class="Row">
                <v-text-field prefix="$" v-model="frontingOC" />
              </div>
              <div class="Row align-right">
                <v-text-field prefix="$" v-model="frontingUSD" />
              </div>
            </div>

            <div class="Line">
              <div class="Row Label">
                Net Premium
              </div>
              <div class="Row Medium">
                <v-text-field />
              </div>
              <div class="Row Small" />
              <div class="Row">
                <v-text-field class="Bold" prefix="$" v-model="netPremiumOC" />
              </div>
              <div class="Row align-right">
                <v-text-field class="Bold" prefix="$" v-model="netPremiumUSD" />
              </div>
            </div>
          </div>

          <!--Installment Payment Information-->
          <div class="TitleCont d-flex justify-space-between align-center">
            <h5>Installment Payment Information</h5>
          </div>
          <div class="Table" v-if="checkPayment.value1.active">
            <h5 class="TableTitle">Installment Payment 1</h5>
            <div class="Line BorderBottom">
              <div class="Row Label" />
              <div class="Row Medium" />
              <div class="Row Small" />
              <div class="Row font-weight-bold">
                Deductions
              </div>
              <div class="Row font-weight-bold">
                  
              </div>
            </div>

            <div class="Line">
              <div class="Row Label">
                SLU Gross Premium
              </div>
              <div class="Row Medium NoDrop">
                <v-text-field :disabled="DisabledInputs" />
              </div>
              <div class="Row Small">
                <v-text-field v-model="boundInsurable.sluLine" suffix="%" />
              </div>
              <div class="Row">
                <v-text-field v-model="checkPayment.value1.value" />
              </div>
              <div class="Row align-right">
                <v-text-field v-model="form1.sluGrossUSD" />
              </div>
            </div>

            <div class="Line">
              <div class="Row Label">
                Brokerage
              </div>
              <div class="Row Medium NoDrop">
                <v-text-field :disabled="DisabledInputs" />
              </div>
              <div class="Row Small">
                <v-text-field v-model="deductions.brokerage" suffix="%" />
              </div>
              <div class="Row">
                <v-text-field prefix="$" v-model="form1.brokerageOC" />
              </div>
              <div class="Row align-right">
                <v-text-field prefix="$" v-model="form1.brokerageUSD" />
              </div>
            </div>

            <div class="Line">
              <div class="Row Label">
                Tax
              </div>
              <div class="Row Medium NoDrop">
                <v-text-field :disabled="DisabledInputs" />
              </div>
              <div class="Row Small">
                <v-text-field v-model="deductions.taxes" suffix="%" />
              </div>
              <div class="Row">
                <v-text-field prefix="$" v-model="form1.taxesOC" />
              </div>
              <div class="Row align-right">
                <v-text-field prefix="$" v-model="form1.taxesUSD" />
              </div>
            </div>

            <div class="Line">
              <div class="Row Label">
                Eng Fee
              </div>
              <div class="Row Medium NoDrop">
                <v-select :items="EngFeeOptions" v-model="deductions.deductionType" />
              </div>
              <div class="Row Small">
                <v-text-field v-model="deductions.eng" suffix="%" />
              </div>
              <div class="Row">
                <v-text-field prefix="$" v-model="form1.engOC" />
              </div>
              <div class="Row align-right">
                <v-text-field prefix="$" v-model="form1.engUSD" />
              </div>
            </div>

            <div class="Line">
              <div class="Row Label">
                LTA
              </div>
              <div class="Row Medium NoDrop">
                <v-text-field :disabled="DisabledInputs" />
              </div>
              <div class="Row Small">
                <v-text-field v-model="deductions.lta" suffix="%" />
              </div>
              <div class="Row">
                <v-text-field prefix="$" v-model="form1.ltaOC" />
              </div>
              <div class="Row align-right">
                <v-text-field prefix="$" v-model="form1.ltaUSD" />
              </div>
            </div>

            <div class="Line BorderBottom">
              <div class="Row Label">
                Others
              </div>
              <div class="Row Medium NoDrop">
                <v-text-field :disabled="DisabledInputs" />
              </div>
              <div class="Row Small">
                <v-text-field v-model="deductions.others" suffix="%" />
              </div>
              <div class="Row">
                <v-text-field prefix="$" v-model="form1.othersOC" />
              </div>
              <div class="Row align-right">
                <v-text-field prefix="$" v-model="form1.othersUSD" />
              </div>
            </div>

            <div class="Line">
              <div class="Row Label">
                Fronting Fee
              </div>
              <div class="Row Medium">
                <v-select :items="FrontingFeeOptions" />
              </div>
              <div class="Row Small">
                <v-text-field v-model="deductions.fronting" suffix="%" />
              </div>
              <div class="Row">
                <v-text-field prefix="$" v-model="form1.frontingOC" />
              </div>
              <div class="Row align-right">
                <v-text-field prefix="$" v-model="form1.frontingUSD" />
              </div>
            </div>

            <div class="Line">
              <div class="Row Label">
                Net Premium
              </div>
              <div class="Row Medium">
                <v-text-field />
              </div>
              <div class="Row Small" />
              <div class="Row">
                <v-text-field class="Bold" prefix="$" v-model="form1.netPremiumOC" />
              </div>
              <div class="Row align-right">
                <v-text-field class="Bold" prefix="$" v-model="form1.netPremiumUSD" />
              </div>
            </div>
          </div>

          <div class="Table" v-if="checkPayment.value2.active">
            <div class="Separator" />
            <h5 class="TableTitle">Installment Payment 2</h5>
            <div class="Line BorderBottom">
              <div class="Row Label" />
              <div class="Row Medium" />
              <div class="Row Small" />
              <div class="Row font-weight-bold">
                Original Currency
              </div>
              <div class="Row font-weight-bold">
                USD
              </div>
            </div>

            <div class="Line">
              <div class="Row Label">
                SLU Gross Premium
              </div>
              <div class="Row Medium NoDrop">
                <v-text-field :disabled="DisabledInputs" />
              </div>
              <div class="Row Small">
                <v-text-field v-model="boundInsurable.sluLine" suffix="%" />
              </div>
              <div class="Row">
                <v-text-field v-model="checkPayment.value2.value" />
              </div>
              <div class="Row align-right">
                <v-text-field v-model="form2.sluGrossUSD" />
              </div>
            </div>

            <div class="Line">
              <div class="Row Label">
                Brokerage
              </div>
              <div class="Row Medium NoDrop">
                <v-text-field :disabled="DisabledInputs" />
              </div>
              <div class="Row Small">
                <v-text-field v-model="deductions.brokerage" suffix="%" />
              </div>
              <div class="Row">
                <v-text-field prefix="$" v-model="form2.brokerageOC" />
              </div>
              <div class="Row align-right">
                <v-text-field prefix="$" v-model="form2.brokerageUSD" />
              </div>
            </div>

            <div class="Line">
              <div class="Row Label">
                Tax
              </div>
              <div class="Row Medium NoDrop">
                <v-text-field :disabled="DisabledInputs" />
              </div>
              <div class="Row Small">
                <v-text-field v-model="deductions.taxes" suffix="%" />
              </div>
              <div class="Row">
                <v-text-field prefix="$" v-model="form2.taxesOC" />
              </div>
              <div class="Row align-right">
                <v-text-field prefix="$" v-model="form2.taxesUSD" />
              </div>
            </div>

            <div class="Line">
              <div class="Row Label">
                Eng Fee
              </div>
              <div class="Row Medium NoDrop">
                <v-select :items="EngFeeOptions" v-model="deductions.deductionType" />
              </div>
              <div class="Row Small">
                <v-text-field v-model="deductions.eng" suffix="%" />
              </div>
              <div class="Row">
                <v-text-field prefix="$" v-model="form2.engOC" />
              </div>
              <div class="Row align-right">
                <v-text-field prefix="$" v-model="form2.engUSD" />
              </div>
            </div>

            <div class="Line">
              <div class="Row Label">
                LTA
              </div>
              <div class="Row Medium NoDrop">
                <v-text-field :disabled="DisabledInputs" />
              </div>
              <div class="Row Small">
                <v-text-field v-model="deductions.lta" suffix="%" />
              </div>
              <div class="Row">
                <v-text-field prefix="$" v-model="form2.ltaOC" />
              </div>
              <div class="Row align-right">
                <v-text-field prefix="$" v-model="form2.ltaUSD" />
              </div>
            </div>

            <div class="Line BorderBottom">
              <div class="Row Label">
                Others
              </div>
              <div class="Row Medium NoDrop">
                <v-text-field :disabled="DisabledInputs" />
              </div>
              <div class="Row Small">
                <v-text-field v-model="deductions.others" suffix="%" />
              </div>
              <div class="Row">
                <v-text-field prefix="$" v-model="form2.othersOC" />
              </div>
              <div class="Row align-right">
                <v-text-field prefix="$" v-model="form2.othersUSD" />
              </div>
            </div>

            <div class="Line">
              <div class="Row Label">
                Fronting Fee
              </div>
              <div class="Row Medium">
                <v-select :items="FrontingFeeOptions" />
              </div>
              <div class="Row Small">
                <v-text-field v-model="deductions.fronting" suffix="%" />
              </div>
              <div class="Row">
                <v-text-field prefix="$" v-model="form2.frontingOC" />
              </div>
              <div class="Row align-right">
                <v-text-field prefix="$" v-model="form2.frontingUSD" />
              </div>
            </div>

            <div class="Line">
              <div class="Row Label">
                Net Premium
              </div>
              <div class="Row Medium">
                <v-text-field />
              </div>
              <div class="Row Small" />
              <div class="Row">
                <v-text-field class="Bold" prefix="$" v-model="form2.netPremiumOC" />
              </div>
              <div class="Row align-right">
                <v-text-field class="Bold" prefix="$" v-model="form2.netPremiumUSD" />
              </div>
            </div>
          </div>
          <div class="Table" v-if="checkPayment.value3.active">
            <div class="Separator" />
            <h5 class="TableTitle">Installment Payment 3</h5>
            <div class="Line BorderBottom">
              <div class="Row Label" />
              <div class="Row Medium" />
              <div class="Row Small" />
              <div class="Row font-weight-bold">
                Original Currency
              </div>
              <div class="Row font-weight-bold">
                USD
              </div>
            </div>

            <div class="Line">
              <div class="Row Label">
                SLU Gross Premium
              </div>
              <div class="Row Medium NoDrop">
                <v-text-field :disabled="DisabledInputs" />
              </div>
              <div class="Row Small">
                <v-text-field v-model="boundInsurable.sluLine" suffix="%" />
              </div>
              <div class="Row">
                <v-text-field v-model="checkPayment.value3.value" />
              </div>
              <div class="Row align-right">
                <v-text-field v-model="form3.sluGrossUSD" />
              </div>
            </div>

            <div class="Line">
              <div class="Row Label">
                Brokerage
              </div>
              <div class="Row Medium NoDrop">
                <v-text-field :disabled="DisabledInputs" />
              </div>
              <div class="Row Small">
                <v-text-field v-model="deductions.brokerage" suffix="%" />
              </div>
              <div class="Row">
                <v-text-field prefix="$" v-model="form3.brokerageOC" />
              </div>
              <div class="Row align-right">
                <v-text-field prefix="$" v-model="form3.brokerageUSD" />
              </div>
            </div>

            <div class="Line">
              <div class="Row Label">
                Tax
              </div>
              <div class="Row Medium NoDrop">
                <v-text-field :disabled="DisabledInputs" />
              </div>
              <div class="Row Small">
                <v-text-field v-model="deductions.taxes" suffix="%" />
              </div>
              <div class="Row">
                <v-text-field prefix="$" v-model="form3.taxesOC" />
              </div>
              <div class="Row align-right">
                <v-text-field prefix="$" v-model="form3.taxesUSD" />
              </div>
            </div>

            <div class="Line">
              <div class="Row Label">
                Eng Fee
              </div>
              <div class="Row Medium NoDrop">
                <v-select :items="EngFeeOptions" v-model="deductions.deductionType" />
              </div>
              <div class="Row Small">
                <v-text-field v-model="deductions.eng" suffix="%" />
              </div>
              <div class="Row">
                <v-text-field prefix="$" v-model="form3.engOC" />
              </div>
              <div class="Row align-right">
                <v-text-field prefix="$" v-model="form3.engUSD" />
              </div>
            </div>

            <div class="Line">
              <div class="Row Label">
                LTA
              </div>
              <div class="Row Medium NoDrop">
                <v-text-field :disabled="DisabledInputs" />
              </div>
              <div class="Row Small">
                <v-text-field v-model="deductions.lta" suffix="%" />
              </div>
              <div class="Row">
                <v-text-field prefix="$" v-model="form3.ltaOC" />
              </div>
              <div class="Row align-right">
                <v-text-field prefix="$" v-model="form3.ltaUSD" />
              </div>
            </div>

            <div class="Line BorderBottom">
              <div class="Row Label">
                Others
              </div>
              <div class="Row Medium NoDrop">
                <v-text-field :disabled="DisabledInputs" />
              </div>
              <div class="Row Small">
                <v-text-field v-model="deductions.others" suffix="%" />
              </div>
              <div class="Row">
                <v-text-field prefix="$" v-model="form3.othersOC" />
              </div>
              <div class="Row align-right">
                <v-text-field prefix="$" v-model="form3.othersUSD" />
              </div>
            </div>

            <div class="Line">
              <div class="Row Label">
                Fronting Fee
              </div>
              <div class="Row Medium">
                <v-select :items="FrontingFeeOptions" />
              </div>
              <div class="Row Small">
                <v-text-field v-model="deductions.fronting" suffix="%" />
              </div>
              <div class="Row">
                <v-text-field prefix="$" v-model="form3.frontingOC" />
              </div>
              <div class="Row align-right">
                <v-text-field prefix="$" v-model="form3.frontingUSD" />
              </div>
            </div>

            <div class="Line">
              <div class="Row Label">
                Net Premium
              </div>
              <div class="Row Medium">
                <v-text-field />
              </div>
              <div class="Row Small" />
              <div class="Row">
                <v-text-field class="Bold" prefix="$" v-model="form3.netPremiumOC" />
              </div>
              <div class="Row align-right">
                <v-text-field class="Bold" prefix="$" v-model="form3.netPremiumUSD" />
              </div>
            </div>
          </div>
        </div>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>
<script>
import { stateExpansiveManager } from '@/mixins/subscription.js';
import { mapActions, mapGetters, mapMutations } from 'vuex';
import Decimal from 'decimal.js';
export default {
  name: 'TotalPaymentWallet',
  mixins: [stateExpansiveManager],
  data() {
    return {
      DisabledInputs: true,
      EngFeeOptions: ['As Incurrent', 'As Inception'],
      FrontingFeeOptions: ['Apply', 'No Apply'],
      sluGrossPorcentaje: '',
      total: '',
      form1: {
        sluGrossUSD: '',
        brokerageOC: '',
        brokerageUSD: '',
        taxesOC: '',
        taxesUSD: '',
        engOC: '',
        engUSD: '',
        ltaOC: '',
        ltaUSD: '',
        othersOC: '',
        othersUSD: '',
        frontingOC: '',
        frontingUSD: '',
        netPremiumOC: '',
        netPremiumUSD: '',
      },
      form3: {
        sluGrossUSD: '',
        brokerageOC: '',
        brokerageUSD: '',
        taxesOC: '',
        taxesUSD: '',
        engOC: '',
        engUSD: '',
        ltaOC: '',
        ltaUSD: '',
        othersOC: '',
        othersUSD: '',
        frontingOC: '',
        frontingUSD: '',
        netPremiumOC: '',
        netPremiumUSD: '',
      },
      form2: {
        sluGrossUSD: '',
        brokerageOC: '',
        brokerageUSD: '',
        taxesOC: '',
        taxesUSD: '',
        engOC: '',
        engUSD: '',
        ltaOC: '',
        ltaUSD: '',
        othersOC: '',
        othersUSD: '',
        frontingOC: '',
        frontingUSD: '',
        netPremiumOC: '',
        netPremiumUSD: '',
      },
    };
  },
  watch: {
    'checkPayment.value1.value': function() {
      this.calculateCheck1();
    },
    'checkPayment.value2.value': function() {
      this.calculateCheck2();
    },
    'checkPayment.value3.value': function() {
      this.calculateCheck3();
    },
    'checkPayment.value1.active': function() {
      this.calculateCheck1();
    },
    'checkPayment.value2.active': function() {
      this.calculateCheck2();
    },
    'checkPayment.value3.active': function() {
      this.calculateCheck3();
    },
  },
  methods: {
    ...mapActions(['getQuotationInformation', 'checkSubscriptionStored', 'getBoundInformation']),
    calculateCheck1() {
      const total = this.checkPayment.value1.value;
      this.form1.sluGrossUSD = Decimal.div(total || 0, 100).mul(this.quotation.exchangeRate);
      this.form1.brokerageOC = Decimal.mul(this.deductions.brokerage || 0, total || 0).div(100);
      this.form1.brokerageUSD = Decimal.mul(this.deductions.brokerage || 0, total || 0)
        .div(100)
        .mul(this.quotation.exchangeRate);
      this.form1.engOC = Decimal.mul(this.deductions.eng || 0, total || 0).div(100);
      this.form1.engUSD = Decimal.mul(this.deductions.eng || 0, total || 0)
        .div(100)
        .mul(this.quotation.exchangeRate);
      this.form1.taxesOC = Decimal.mul(this.deductions.taxes || 0, total || 0).div(100);
      this.form1.taxesUSD = Decimal.mul(this.deductions.taxes || 0, total || 0)
        .div(100)
        .mul(this.quotation.exchangeRate);
      this.form1.ltaOC = Decimal.mul(this.deductions.lta || 0, total || 0).div(100);
      this.form1.ltaUSD = Decimal.mul(this.deductions.lta || 0, total || 0)
        .div(100)
        .mul(this.quotation.exchangeRate);
      this.form1.othersOC = Decimal.mul(this.deductions.others || 0, total || 0).div(100);
      this.form1.othersUSD = Decimal.mul(this.deductions.others || 0, total || 0)
        .div(100)
        .mul(this.quotation.exchangeRate);
      this.form1.frontingOC = Decimal.mul(this.deductions.fronting || 0, total || 0).div(100);
      this.form1.frontingUSD = Decimal.mul(this.deductions.fronting || 0, total || 0)
        .div(100)
        .mul(this.quotation.exchangeRate);
      this.form1.netPremiumOC = Decimal.sum(
        this.form1.sluGross || 0,
        this.form1.brokerageOC || 0,
        this.form1.taxesOC || 0,
        this.form1.engOC || 0,
        this.form1.ltaOC || 0,
        this.form1.othersOC || 0,
        this.form1.frontingOC || 0
      );
      this.form1.netPremiumUSD = Decimal.sum(
        this.form1.sluGrossUSD || 0,
        this.form1.brokerageUSD || 0,
        this.form1.taxesUSD || 0,
        this.form1.engUSD || 0,
        this.form1.ltaUSD || 0,
        this.form1.othersUSD || 0,
        this.form1.frontingUSD || 0
      );
    },
    calculateCheck2() {
      const total = this.checkPayment.value2.value;
      this.form2.sluGrossUSD = Decimal.div(total || 0, 100).mul(this.quotation.exchangeRate);
      this.form2.brokerageOC = Decimal.mul(this.deductions.brokerage || 0, total || 0).div(100);
      this.form2.brokerageUSD = Decimal.mul(this.deductions.brokerage || 0, total || 0)
        .div(100)
        .mul(this.quotation.exchangeRate);
      this.form2.engOC = Decimal.mul(this.deductions.eng || 0, total || 0).div(100);
      this.form2.engUSD = Decimal.mul(this.deductions.eng || 0, total || 0)
        .div(100)
        .mul(this.quotation.exchangeRate);
      this.form2.taxesOC = Decimal.mul(this.deductions.taxes || 0, total || 0).div(100);
      this.form2.taxesUSD = Decimal.mul(this.deductions.taxes || 0, total || 0)
        .div(100)
        .mul(this.quotation.exchangeRate);
      this.form2.ltaOC = Decimal.mul(this.deductions.lta || 0, total || 0).div(100);
      this.form2.ltaUSD = Decimal.mul(this.deductions.lta || 0, total || 0)
        .div(100)
        .mul(this.quotation.exchangeRate);
      this.form2.othersOC = Decimal.mul(this.deductions.others || 0, total || 0).div(100);
      this.form2.othersUSD = Decimal.mul(this.deductions.others || 0, total || 0)
        .div(100)
        .mul(this.quotation.exchangeRate);
      this.form2.frontingOC = Decimal.mul(this.deductions.fronting || 0, total || 0).div(100);
      this.form2.frontingUSD = Decimal.mul(this.deductions.fronting || 0, total || 0)
        .div(100)
        .mul(this.quotation.exchangeRate);
      this.form2.netPremiumOC = Decimal.sum(
        this.form1.sluGross || 0,
        this.form1.brokerageOC || 0,
        this.form1.taxesOC || 0,
        this.form1.engOC || 0,
        this.form1.ltaOC || 0,
        this.form1.othersOC || 0,
        this.form1.frontingOC || 0
      );
      this.form2.netPremiumUSD = Decimal.sum(
        this.form1.sluGrossUSD || 0,
        this.form1.brokerageUSD || 0,
        this.form1.taxesUSD || 0,
        this.form1.engUSD || 0,
        this.form1.ltaUSD || 0,
        this.form1.othersUSD || 0,
        this.form1.frontingUSD || 0
      );
    },
    calculateCheck3() {
      const total = this.checkPayment.value3.value;
      this.form3.sluGrossUSD = Decimal.div(total || 0, 100).mul(this.quotation.exchangeRate);
      this.form3.brokerageOC = Decimal.mul(this.deductions.brokerage || 0, total || 0).div(100);
      this.form3.brokerageUSD = Decimal.mul(this.deductions.brokerage || 0, total || 0)
        .div(100)
        .mul(this.quotation.exchangeRate);
      this.form3.engOC = Decimal.mul(this.deductions.eng || 0, total || 0).div(100);
      this.form3.engUSD = Decimal.mul(this.deductions.eng || 0, total || 0)
        .div(100)
        .mul(this.quotation.exchangeRate);
      this.form3.taxesOC = Decimal.mul(this.deductions.taxes || 0, total || 0).div(100);
      this.form3.taxesUSD = Decimal.mul(this.deductions.taxes || 0, total || 0)
        .div(100)
        .mul(this.quotation.exchangeRate);
      this.form3.ltaOC = Decimal.mul(this.deductions.lta || 0, total || 0).div(100);
      this.form3.ltaUSD = Decimal.mul(this.deductions.lta || 0, total || 0)
        .div(100)
        .mul(this.quotation.exchangeRate);
      this.form3.othersOC = Decimal.mul(this.deductions.others || 0, total || 0).div(100);
      this.form3.othersUSD = Decimal.mul(this.deductions.others || 0, total || 0)
        .div(100)
        .mul(this.quotation.exchangeRate);
      this.form3.frontingOC = Decimal.mul(this.deductions.fronting || 0, total || 0).div(100);
      this.form3.frontingUSD = Decimal.mul(this.deductions.fronting || 0, total || 0)
        .div(100)
        .mul(this.quotation.exchangeRate);
      this.form3.netPremiumOC = Decimal.sum(
        this.form1.sluGross || 0,
        this.form1.brokerageOC || 0,
        this.form1.taxesOC || 0,
        this.form1.engOC || 0,
        this.form1.ltaOC || 0,
        this.form1.othersOC || 0,
        this.form1.frontingOC || 0
      );
      this.form3.netPremiumUSD = Decimal.sum(
        this.form1.sluGrossUSD || 0,
        this.form1.brokerageUSD || 0,
        this.form1.taxesUSD || 0,
        this.form1.engUSD || 0,
        this.form1.ltaUSD || 0,
        this.form1.othersUSD || 0,
        this.form1.frontingUSD || 0
      );
    },
  },
  async mounted() {
    await this.checkSubscriptionStored();
    await this.getQuotationInformation();
    await this.getBoundInformation('boundInsurable');
    this.total = this.premium.totalInsured.replace('$', '');
  },

  computed: {
    ...mapGetters(['subscription_id', 'quotation', 'premium', 'deductions', 'checkPayment', 'boundInsurable']),
    sluGross: {
      get() {
        const op = this.total || 0;
        return op;
      },
    },
    sluGrossUSD: {
      get() {
        const op = Decimal.div(this.total || 0, 100).mul(this.quotation.exchangeRate);
        return op;
      },
    },
    brokerageOC: {
      get() {
        const op = Decimal.mul(this.deductions.brokerage || 0, this.total || 0).div(100);
        return op;
      },
    },
    brokerageUSD: {
      get() {
        const op = Decimal.mul(this.deductions.brokerage || 0, this.total || 0)
          .div(100)
          .mul(this.quotation.exchangeRate);
        return op;
      },
    },
    taxesOC: {
      get() {
        const op = Decimal.mul(this.deductions.taxes || 0, this.total || 0).div(100);
        return op;
      },
    },
    taxesUSD: {
      get() {
        const op = Decimal.mul(this.deductions.taxes || 0, this.total || 0)
          .div(100)
          .mul(this.quotation.exchangeRate);
        return op;
      },
    },
    engOC: {
      get() {
        const op = Decimal.mul(this.deductions.eng || 0, this.total || 0).div(100);
        return op;
      },
    },
    engUSD: {
      get() {
        const op = Decimal.mul(this.deductions.eng || 0, this.total || 0)
          .div(100)
          .mul(this.quotation.exchangeRate);
        return op;
      },
    },
    ltaOC: {
      get() {
        const op = Decimal.mul(this.deductions.lta || 0, this.total || 0).div(100);
        return op;
      },
    },
    ltaUSD: {
      get() {
        const op = Decimal.mul(this.deductions.lta || 0, this.total || 0)
          .div(100)
          .mul(this.quotation.exchangeRate);
        return op;
      },
    },
    othersOC: {
      get() {
        const op = Decimal.mul(this.deductions.others || 0, this.total || 0).div(100);
        return op;
      },
    },
    othersUSD: {
      get() {
        const op = Decimal.mul(this.deductions.others || 0, this.total || 0)
          .div(100)
          .mul(this.quotation.exchangeRate);
        return op;
      },
    },
    frontingOC: {
      get() {
        const op = Decimal.mul(this.deductions.fronting || 0, this.total || 0).div(100);
        return op;
      },
    },
    frontingUSD: {
      get() {
        const op = Decimal.mul(this.deductions.fronting || 0, this.total || 0)
          .div(100)
          .mul(this.quotation.exchangeRate);
        return op;
      },
    },
    netPremiumOC: {
      get() {
        const op = Decimal.sum(this.sluGross, this.brokerageOC, this.taxesOC, this.engOC, this.ltaOC, this.othersOC, this.frontingOC);
        return op;
      },
    },
    netPremiumUSD: {
      get() {
        const op = Decimal.sum(this.sluGrossUSD, this.brokerageUSD, this.taxesUSD, this.engUSD, this.ltaUSD, this.othersUSD, this.frontingUSD);
        return op;
      },
    },
  },
};
</script>
<style scoped lang="less">
@import '~@/assets/style/AccordionStyle.less';
/*
Clases que se repiten en el componente
*/
.flex {
  display: flex;
  justify-content: center;
  align-items: center;
}
.BorderBottom {
  border-bottom: 1px solid #d2deed;
  margin-bottom: 15px;
}
//Centrar inputs con clase .Small
::v-deep .Small .v-input input {
  text-align: center;
}
//Centrar inputs con clase .align-right
::v-deep .align-right .v-input input {
  text-align: right;
}

//Estilos de las tablas grandes
.Table{
	width: 57%;
	height: auto;
	flex-wrap: wrap;
	align-content: flex-start;
	align-items:flex-start;
  justify-content: space-between;


  //Titulo
  .TableTitle{
    font-size: 16px;
    margin-top: 35px;
    font-weight: 700;
  }
  .Separator{
    width: 100%;
    border-bottom:solid 1px #d2deed;
  }
  .Line {
    .flex();
    width: 100%;
    height: 50px;
    justify-content: space-between;

    //Filas
    .Row {
      .flex();
      width: 19%;
      height: 100%;

      .Bold {
        font-weight: 700;
        ::v-deep .v-label {
          color: black;
        }
      }
    }

    //Tamaños y estilos de las filas
    .Label{
      width: 127px;
      color:#547FA9;
      font-size: 14px;
      justify-content: flex-end;
      text-align: right;
    }
    .Medium {
      width: 20%;
    }
    .Small {
      width: 12%;
    }
  }
}

//Subtitulo
.TitleCont {
  width: 100%;
  height: 90px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  h5 {
    font-size: 20px;
    color: black;
    font-weight: 600;
  }

  @media (max-width: 650px) {
    height: 50px;
    h5 {
      font-size: 16px;
    }
  }
}

//Boton para añadir pagos
.ButtonCont {
  width: 100%;
  margin-top: 25px;
  .v-btn {
    text-transform: none;
    color: white;
    width: 217px;
    height: 40px;
  }
}

//Añade borde continuo a los inputs desactivados
.theme--light.v-text-field::v-deep.v-input--is-disabled .v-input__slot::before {
  -o-border-image: repeating-linear-gradient(to right, #d2deed 0px, #d2deed 2px, transparent 2px, transparent 4px) 1 repeat !important;
  border-image: repeating-linear-gradient(to right, #d2deed 0px, #d2deed 2px, transparent 2px, transparent 4px) 1 repeat !important;
}
.NoDrop {
  cursor: no-drop;
}
</style>
