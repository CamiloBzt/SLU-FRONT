<template>
  <div class="Cont d-flex justify-start align-center flex-wrap align-content-center">
    <!--TITULO-->
    <div class="TitleCont">
      <h5>CAT Rates</h5>
    </div>
    <div class="Table d-flex justify-end align-content-start flex-wrap">
      <!--LABELS-->
      <div class="Col LabelsCol">
        <div class="Row" />
        <div class="Row">Ponderated EQ Rate</div>
        <div class="Row">Ponderated Hidrometeorological Rate</div>
        <div class="Row">Ponderated Flood Rate</div>
        <div class="Row">Ponderated Other Rate</div>
        <div class="Row">
          <b> CAT Rate </b>
        </div>
      </div>

      <!--COLUMNA SIN NOMBRE-->
      <div class="Col">
        <div class="Row TitleCol" />
        <div class="Row">
          <v-text-field v-model="ponderatedEQRate" type="number" readonly />
        </div>
        <div class="Row">
          <v-text-field v-model="ponderatedHydroRate" type="number" readonly />
        </div>
        <div class="Row">
          <v-text-field v-model="ponderatedFloodRate" type="number" readonly />
        </div>
        <div class="Row">
          <v-text-field v-model="ponderatedOtherRate" type="number" readonly />
        </div>
        <div class="Row">
          <v-text-field v-model="catRate" type="number" readonly />
        </div>
      </div>

      <!--CREDIT SURCHARGE-->
      <div class="Col">
        <div class="Row TitleCol">Credit / Surcharge</div>
        <div class="Row">
          <v-text-field
            v-model="$v.ratesObj.eqRate2.$model"
            @input="$v.ratesObj.eqRate2.$touch()"
            @blur="
              $v.ratesObj.eqRate2.$touch();
              checkField('eqRate2');
            "
            type="number"
            suffix="%"
          />
        </div>
        <div class="Row">
          <v-text-field
            v-model="$v.ratesObj.hydro2.$model"
            @input="$v.ratesObj.hydro2.$touch()"
            @blur="
              $v.ratesObj.hydro2.$touch();
              checkField('hydro2');
            "
            type="number"
            suffix="%"
          />
        </div>
        <div class="Row">
          <v-text-field
            v-model="$v.ratesObj.flood2.$model"
            @input="$v.ratesObj.flood2.$touch()"
            @blur="
              $v.ratesObj.flood2.$touch();
              checkField('flood2');
            "
            type="number"
            suffix="%"
          />
        </div>
        <div class="Row">
          <v-text-field
            v-model="$v.ratesObj.other2.$model"
            @input="$v.ratesObj.other2.$touch()"
            @blur="
              $v.ratesObj.other2.$touch();
              checkField('other2');
            "
            type="number"
            suffix="%"
          />
        </div>
        <div class="Row" />
      </div>

      <!--REASON-->
      <div class="Col">
        <div class="Row TitleCol">Reason</div>
        <div class="Row">
          <v-select
            v-model="$v.ratesObj.eqRateSelect.$model"
            @input="$v.ratesObj.eqRateSelect.$touch()"
            @blur="
              $v.ratesObj.eqRateSelect.$touch();
              checkField('eqRateSelect');
            "
            :items="reasons"
            item-value="id"
            item-text="description"
            placeholder="Select a Reason"
          >
          </v-select>
        </div>
        <div class="Row">
          <v-select
            v-model="$v.ratesObj.hydroSelect.$model"
            @input="$v.ratesObj.hydroSelect.$touch()"
            @blur="
              $v.ratesObj.hydroSelect.$touch();
              checkField('hydroSelect');
            "
            :items="reasons"
            item-value="id"
            item-text="description"
            placeholder="Select a Reason"
          >
          </v-select>
        </div>
        <div class="Row">
          <v-select
            v-model="$v.ratesObj.floodSelect.$model"
            @input="$v.ratesObj.floodSelect.$touch()"
            @blur="
              $v.ratesObj.floodSelect.$touch();
              checkField('floodSelect');
            "
            :items="reasons"
            item-value="id"
            item-text="description"
            placeholder="Select a Reason"
          >
          </v-select>
        </div>
        <div class="Row">
          <v-select
            v-model="$v.ratesObj.otherSelect.$model"
            @input="$v.ratesObj.otherSelect.$touch()"
            @blur="
              $v.ratesObj.otherSelect.$touch();
              checkField('otherSelect');
            "
            :items="reasons"
            item-value="id"
            item-text="description"
            placeholder="Select a Reason"
          >
          </v-select>
        </div>
        <div class="Row" />
      </div>

      <!--FINAL RATE-->
      <div class="Col">
        <div class="Row TitleCol">Final Rate</div>
        <div class="Row">
          <v-text-field v-model="finalRate1" type="number" readonly></v-text-field>
        </div>
        <div class="Row">
          <v-text-field v-model="finalRate2" type="number" readonly></v-text-field>
        </div>
        <div class="Row">
          <v-text-field v-model="finalRate3" type="number" readonly></v-text-field>
        </div>
        <div class="Row">
          <v-text-field v-model="finalRate4" type="number" readonly></v-text-field>
        </div>
        <div class="Row" />
      </div>

      <!--PREMIUM RATE-->
      <div class="Col">
        <div class="Row TitleCol">Premium Rate</div>
        <div class="Row">
          <v-text-field v-model="premiumRate1" readonly> </v-text-field>
        </div>
        <div class="Row">
          <v-text-field v-model="premiumRate2" readonly> </v-text-field>
        </div>
        <div class="Row">
          <v-text-field v-model="premiumRate3" readonly> </v-text-field>
        </div>
        <div class="Row">
          <v-text-field v-model="premiumRate4" readonly> </v-text-field>
        </div>
        <div class="Row" />
      </div>
    </div>
    <!--SEPARADOR-->
    <div class="ExpansionLineTop mt-4 HideOnMovil" />
  </div>
</template>
<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';
/* validations */
import { validationMixin } from 'vuelidate';
import { required } from 'vuelidate/lib/validators';
import { formValidations } from '@/mixins/formValidations';
/* en caso de que unknownbignumber sea el tiv */
import currToNum from '@/lib/currencyToNumber';
import { proportionalReasons } from '../../constants/proportionalReasons';
import Decimal from 'decimal.js';

export default {
  name: 'CatRates',
  mixins: [validationMixin, formValidations],
  data() {
    return {
      reasons: proportionalReasons,

      bigunknownnum: 100000000,
      formatter: new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }),
    };
  },
  async mounted() {
    await this.loadSectionRatesModal({ table: 'catRates' });
  },
  computed: {
    ...mapGetters(['tiv', 'ratesObj', 'catRatesGroup', 'quotation']),
    /* eqRate */
    eqRateSelect: {
      get() {
        return this.$v.ratesObj.eqRateSelect.$model;
      },
    },
    eqRate1: {
      get() {
        return this.$v.ratesObj.eqRate1.$model;
      },
    },
    eqRate2: {
      get() {
        return this.$v.ratesObj.eqRate2.$model;
      },
    },
    eqRate3: {
      get() {
        const op = this.eqRate1 * ((100 + parseInt(this.eqRate2)) / 100); // se convierte porcentaje a decimal
        const final = op.toFixed(3);
        this.SET_RATE({ key: 'eqRate', value: final });
        return final;
      },
      set(value) {
        this.$v.ratesObj.eqRate3.$model = value;
        this.$v.ratesObj.eqRate3.$touch();
      },
    },
    eqRate4: {
      get() {
        // const tiv = currToNum(this.tiv.total);
        const tiv = this.bigunknownnum;
        const op = (this.eqRate3 * tiv) / 1000;
        const num = this.formatter.format(op.toFixed(3));
        return num;
      },
      set(value) {
        this.$v.ratesObj.eqRate4.$model = value;
        this.$v.ratesObj.eqRate4.$touch();
      },
    },
    /* hydro */
    hydroSelect: {
      get() {
        return this.$v.ratesObj.hydroSelect.$model;
      },
    },
    hydro1: {
      get() {
        return this.$v.ratesObj.hydro1.$model;
      },
    },
    hydro2: {
      get() {
        return this.$v.ratesObj.hydro2.$model;
      },
    },
    hydro3: {
      get() {
        const op = this.hydro1 * ((100 + parseInt(this.hydro2)) / 100); // se convierte porcentaje a decimal
        const final = op.toFixed(3);
        this.SET_RATE({ key: 'hydroRate', value: final });
        return final;
      },
      set(value) {
        this.$v.ratesObj.hydro3.$model = value;
        this.$v.ratesObj.hydro3.$touch();
      },
    },
    hydro4: {
      get() {
        // const tiv = currToNum(this.tiv.total);
        const tiv = this.bigunknownnum;
        const op = (this.hydro3 * tiv) / 1000;
        const num = this.formatter.format(op.toFixed(3));
        return num;
      },
      set(value) {
        this.$v.ratesObj.hydro4.$model = value;
        this.$v.ratesObj.hydro4.$touch();
      },
    },
    /* flood */
    floodSelect: {
      get() {
        return this.$v.ratesObj.floodSelect.$model;
      },
    },
    flood1: {
      get() {
        return this.$v.ratesObj.flood1.$model;
      },
    },
    flood2: {
      get() {
        return this.$v.ratesObj.flood2.$model;
      },
    },
    flood3: {
      get() {
        const op = this.flood1 * ((100 + parseInt(this.flood2)) / 100); // se convierte porcentaje a decimal
        const final = op.toFixed(3);
        this.SET_RATE({ key: 'floodRate', value: final });
        return final;
      },
      set(value) {
        this.$v.ratesObj.flood3.$model = value;
        this.$v.ratesObj.flood3.$touch();
      },
    },
    flood4: {
      get() {
        // const tiv = currToNum(this.tiv.total);
        const tiv = this.bigunknownnum;
        const op = (this.flood3 * tiv) / 1000;
        const num = this.formatter.format(op.toFixed(3));
        return num;
      },
      set(value) {
        this.$v.ratesObj.flood4.$model = value;
        this.$v.ratesObj.flood4.$touch();
      },
    },
    /* other */
    otherSelect: {
      get() {
        return this.$v.ratesObj.otherSelect.$model;
      },
    },
    other1: {
      get() {
        return this.$v.ratesObj.other1.$model;
      },
    },
    other2: {
      get() {
        return this.$v.ratesObj.other2.$model;
      },
    },
    other3: {
      get() {
        const op = this.other1 * ((100 + parseInt(this.other2)) / 100); // se convierte porcentaje a decimal
        const final = op.toFixed(3);
        this.SET_RATE({ key: 'otherRate', value: final });
        return final;
      },
      set(value) {
        this.$v.ratesObj.other3.$model = value;
        this.$v.ratesObj.other3.$touch();
      },
    },
    other4: {
      get() {
        // const tiv = currToNum(this.tiv.total);
        const tiv = this.bigunknownnum;
        const op = (this.other3 * tiv) / 1000;
        const num = this.formatter.format(op.toFixed(3));
        return num;
      },
      set(value) {
        this.$v.ratesObj.other4.$model = value;
        this.$v.ratesObj.other4.$touch();
      },
    },
    /* Cat Rate */
    // catRate: {
    //   get() {
    //     const objToSum = [this.eqRate3, this.hydro3, this.flood3, this.other3];
    //     const sum = objToSum.reduce((pv, cv) => Number(pv) + Number(cv), 0);
    //     return sum.toFixed(3);
    //   },
    // },
    // -------------------
    // CAT Rates
    // -------------------
    ponderatedEQRate() {
      let tiv = this.quotation.tivTarifadorSelect ? Number(this.quotation.tivTarifadorSelect.replace(/\$/g, '').replace(/,/g, '') || 0) : 0;

      let values = [];
      let earthquakeRates = [];
      let premiumTerrmotos = [];

      this.catRatesGroup.forEach((e, i) => {
        values.push(tiv * (Number(e.rate) / 100));
        earthquakeRates.push(Number(e.earthquakeRate));
        premiumTerrmotos.push((earthquakeRates[i] * values[i]) / 1000);
      });

      let result = (premiumTerrmotos.reduce((total, currentValue) => total + currentValue, 0) / tiv) * 1000 || 0;
      let fixedResult = Number(result.toFixed(3));

      return fixedResult;
    },
    ponderatedHydroRate() {
      let tiv = this.quotation.tivTarifadorSelect ? Number(this.quotation.tivTarifadorSelect.replace(/\$/g, '').replace(/,/g, '') || 0) : 0;

      let values = [];
      let windRate = [];
      let premiumHydro = [];

      this.catRatesGroup.forEach((e, i) => {
        values.push(tiv * (Number(e.rate) / 100));
        windRate.push(Number(e.windRate));
        premiumHydro.push((windRate[i] * values[i]) / 1000);
      });

      let result = (premiumHydro.reduce((total, currentValue) => total + currentValue, 0) / tiv) * 1000 || 0;
      let fixedResult = Number(result.toFixed(3));

      return fixedResult;
    },
    ponderatedFloodRate() {
      let tiv = this.quotation.tivTarifadorSelect ? Number(this.quotation.tivTarifadorSelect.replace(/\$/g, '').replace(/,/g, '') || 0) : 0;

      let values = [];
      let floodRate = [];
      let premiumFlood = [];

      this.catRatesGroup.forEach((e, i) => {
        values.push(tiv * (Number(e.rate) / 100));
        floodRate.push(Number(e.floodRate));
        premiumFlood.push((floodRate[i] * values[i]) / 1000);
      });

      let result = (premiumFlood.reduce((total, currentValue) => total + currentValue, 0) / tiv) * 1000 || 0;
      let fixedResult = Number(result.toFixed(3));

      return fixedResult;
    },
    ponderatedOtherRate() {
      let tiv = this.quotation.tivTarifadorSelect ? Number(this.quotation.tivTarifadorSelect.replace(/\$/g, '').replace(/,/g, '') || 0) : 0;

      let values = [];
      let otherRate = [];
      let premiumOther = [];

      this.catRatesGroup.forEach((e, i) => {
        values.push(tiv * (Number(e.rate) / 100));
        otherRate.push(Number(e.otherRate));
        premiumOther.push((otherRate[i] * values[i]) / 1000);
      });

      let result = (premiumOther.reduce((total, currentValue) => total + currentValue, 0) / tiv) * 1000 || 0;
      let fixedResult = Number(result.toFixed(3));

      return fixedResult;
    },
    catRate() {
      let result = this.finalRate1 + this.finalRate2 + this.finalRate3 + this.finalRate4;
      let fixedResult = Number(result.toFixed(3));
      this.quotation.catRate = fixedResult;
      let result1 = Decimal(this.premiumRate1.replace(/\$/g, '').replace(/,/g, ''))
        .add(this.premiumRate2.replace(/\$/g, '').replace(/,/g, ''))
        .add(this.premiumRate3.replace(/\$/g, '').replace(/,/g, ''))
        .add(this.premiumRate4.replace(/\$/g, '').replace(/,/g, ''));
      let fixedResult2 = Number(result1.toFixed(3));
      this.quotation.premiumRate = fixedResult2;
      return fixedResult;
    },
    // -------------------
    // Final Rate
    // -------------------
    finalRate1() {
      let result = this.ponderatedEQRate * ((100 + parseInt(this.eqRate2)) / 100);
      let fixedResult = Number(result.toFixed(3));

      this.SET_RATE({ key: 'eqRate', value: fixedResult });

      return fixedResult || 0;
    },
    finalRate2() {
      let result = this.ponderatedHydroRate * ((100 + parseInt(this.hydro2)) / 100);
      let fixedResult = Number(result.toFixed(3));

      this.SET_RATE({ key: 'hydroRate', value: fixedResult });

      return fixedResult || 0 ;
    },
    finalRate3() {
      let result = this.ponderatedFloodRate * ((100 + parseInt(this.flood2)) / 100);
      let fixedResult = Number(result.toFixed(3));

      this.SET_RATE({ key: 'floodRate', value: fixedResult });

      return fixedResult || 0 ;
    },
    finalRate4() {
      let result = this.ponderatedOtherRate * ((100 + parseInt(this.other2)) / 100);
      let fixedResult = Number(result.toFixed(3));

      this.SET_RATE({ key: 'otherRate', value: fixedResult });

      return fixedResult || 0 ;
    },
    // -------------------
    // Premium Rate
    // -------------------

    premiumRate1() {
      let tiv = this.quotation.tivTarifadorSelect ? Number(this.quotation.tivTarifadorSelect.replace(/\$/g, '').replace(/,/g, '') || 0) : 0;

      let result = (this.finalRate1 * tiv) / 1000;
      let fixedResult = this.formatter.format(result.toFixed(3));
      //TODO:Buscar hacer una mejor comparación 
      const value =  fixedResult !== '$NaN' ? fixedResult : '$0.00'  
      
      return value
    },
    premiumRate2() {
      let tiv = this.quotation.tivTarifadorSelect ? Number(this.quotation.tivTarifadorSelect.replace(/\$/g, '').replace(/,/g, '') || 0) : 0;

      let result = (this.finalRate2 * tiv) / 1000;
      let fixedResult = this.formatter.format(result.toFixed(3));
      const value =  fixedResult !== '$NaN' ? fixedResult : '$0.00'  


      return value;
    },
    premiumRate3() {
      let tiv = this.quotation.tivTarifadorSelect ? Number(this.quotation.tivTarifadorSelect.replace(/\$/g, '').replace(/,/g, '') || 0) : 0;

      let result = (this.finalRate3 * tiv) / 1000;
      let fixedResult = this.formatter.format(result.toFixed(3));
      const value =  fixedResult !== '$NaN' ? fixedResult : '$0.00'  


      return value;
    },
    premiumRate4() {
      let tiv = this.quotation.tivTarifadorSelect ? Number(this.quotation.tivTarifadorSelect.replace(/\$/g, '').replace(/,/g, '') || 0) : 0;

      let result = (this.finalRate4 * tiv) / 1000;
      let fixedResult = this.formatter.format(result.toFixed(3));
      const value =  fixedResult !== '$NaN' ? fixedResult : '$0.00'  


      return value;
    },
  },
  methods: {
    ...mapMutations(['SET_RATE']),
    ...mapActions(['saveRatesModalColumn', 'loadSectionRatesModal']),
    async checkField(column) {
      this.$v.ratesObj[column].$touch();
      if (this.$v.ratesObj[column].$invalid || this.$v.ratesObj[column].$error) return;
      const value = this[column];
      await this.saveRatesModalColumn({ key: column, value });
    },
  },
  watch: {
    async ponderatedEQRate(newVal) {
      await this.saveRatesModalColumn({ key: 'eqRate1', value: newVal });
    },
    async ponderatedHydroRate(newVal) {
      await this.saveRatesModalColumn({ key: 'hydro1', value: newVal });
    },
    async ponderatedFloodRate(newVal) {
      await this.saveRatesModalColumn({ key: 'flood1', value: newVal });
    },
    async ponderatedOtherRate(newVal) {
      await this.saveRatesModalColumn({ key: 'other1', value: newVal });
    },
    async catRate(newVal) {
      await this.saveRatesModalColumn({ key: 'total_rate', value: newVal });
    },
  },
  validations: {
    ratesObj: {
      eqRate1: { required },
      hydro1: { required },
      flood1: { required },
      other1: { required },

      eqRate2: { required },
      hydro2: { required },
      flood2: { required },
      other2: { required },

      eqRate3: { required },
      hydro3: { required },
      flood3: { required },
      other3: { required },

      eqRate4: { required },
      hydro4: { required },
      flood4: { required },
      other4: { required },

      eqRateSelect: { required },
      hydroSelect: { required },
      floodSelect: { required },
      otherSelect: { required },
    },
  },
};
</script>
<style lang="less" scoped>
/*
Estilos compartidos por los componentes
del tarifador, controlan:
	- Clase .flex()
	- Titulo general
	- Contenedor general
*/
@import '~@/assets/style/Subscription/Rate.less';
.Cont {
  width: 100%;
  height: auto;
  padding: 0 !important;
  /*
		Estilos únicos del componente
	*/
  .Table {
    width: 100%;
    height: 300px;

    .Col {
      .flex();
      width: 13%;
      height: 100%;
      justify-content: space-between;
      align-content: flex-start;
      flex-wrap: wrap;
      //LABELS
      .Row {
        .flex();
        width: 100%;
        height: 50px;
        text-align: right;
        justify-content: flex-end;
        padding-left: 7px;
      }

      .TitleCol {
        .flex();
        justify-content: center;
        text-align: center;
        font-weight: 600 !important;
      }
    }
    .LabelsCol {
      width: 27%;
      .Row {
        padding-right: 7px;
        padding-left: 0px;
        color: #547fa9;
        b {
          color: inherit;
        }
      }
    }
  }
}
</style>
