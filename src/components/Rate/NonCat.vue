<template>
  <div class="Cont d-flex justify-start align-center flex-wrap align-content-center mt-6">
    <!--TITULO-->
    <div class="TitleCont">
      <h5>Non CAT Rates</h5>
    </div>
    <div class="Table d-flex justify-end align-content-start flex-wrap">
      <!--CABECERA DE LA TABLA-->
      <div class="Line">
        <div class="Row Bold">Activity</div>
        <div class="Row Bold" />
        <div class="Row Bold">Rate</div>
        <div class="Row Bold">Credit / Surchage</div>
        <div class="Row Bold">Reason</div>
        <div class="Row Bold">Final Rate</div>
        <div class="Row Bold">Premium</div>
      </div>

      <div class="Line" v-for="(v, index) in $v.computedGroup.$each.$iter" :key="index">
        <div class="Row">
          <v-text-field
            v-model.trim="v.activity.$model"
            @blur="
              v.activity.$touch();
              checkField(index, 'activity');
            "
            readonly
          />
        </div>
        <div class="Row">
          <v-text-field
            v-model.trim="v.activityRate.$model"
            @blur="
              v.activityRate.$touch();
              checkField(index, 'activityRate');
            "
            readonly
          />
        </div>
        <div class="Row">
          <v-text-field
            v-model.trim="v.rate.$model"
            @blur="
              v.rate.$touch();
              checkField(index, 'rate');
            "
            readonly
          />
        </div>
        <div class="Row">
          <v-text-field
            v-model.trim="v.credit.$model"
            @blur="
              v.credit.$touch();
              checkField(index, 'credit');
            "
            suffix="%"
            type="number"
          />
        </div>
        <div class="Row">
          <v-select
            v-model.trim="v.reason.$model"
            @blur="
              v.reason.$touch();
              checkField(index, 'reason');
            "
            :items="reasons"
            item-value="id"
            item-text="description"
            placeholder="Select a Reason"
          />
        </div>
        <div class="Row">
          <v-text-field
            v-model.trim="v.finalRate.$model"
            @blur="
              v.finalRate.$touch();
              checkField(index, 'finalRate');
            "
            readonly
          />
        </div>
        <div class="Row">
          <v-text-field
            v-model.trim="v.premiumRate.$model"
            @blur="
              v.premiumRate.$touch();
              checkField(index, 'premiumRate');
            "
            readonly
          />
        </div>
      </div>

      <!--BOTON AÑADIR-->
      <div class="Line ButtonLine">
        <v-btn class="btn" rounded text color="#003D6D" @click="addFields()">
          <v-icon class="mr-2"> mdi-plus-circle </v-icon>
          Add New
        </v-btn>
      </div>

      <!--SEPARADOR-->
      <div class="ExpansionLineTop mt-3 HideOnMovil" />
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';
/* validations */
import { validationMixin } from 'vuelidate';
import { required } from 'vuelidate/lib/validators';
import { formValidations } from '@/mixins/formValidations';
/* constantes */
import { proportionalCategories } from '../../constants/proportionalCategories';
import { proportionalReasonsInteger } from '../../constants/proportionalReasons';
/* utils */
import currToNum from '@/lib/currencyToNumber';
import Decimal from 'decimal.js';
import numeral from 'numeral';
import quotation from '../../store/state/subscription/quotation';

export default {
  name: 'NonCat',
  mixins: [validationMixin, formValidations],
  data() {
    return {
      FloodRate: null,
      bigunknownnum: 100000000,
      formatter: new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }),
      reasons: proportionalReasonsInteger,
    };
  },
  async mounted() {
    await this.getCatalogByName({ name: 'activities' });
    await this.loadMultipleSectionRatesModal({ table: 'nonCatRatesPro' });
  },
  computed: {
    ...mapGetters(['accountInformation', 'activities', 'deductions', 'tiv', 'nonRates', 'quotation']),
    sumDeductions: {
      get() {
        const op =
          (!this.deductions.brokerage ? 0 : parseFloat(this.deductions.brokerage)) +
          (!this.deductions.fronting ? 0 : parseFloat(this.deductions.fronting)) +
          (!this.deductions.eng ? 0 : parseFloat(this.deductions.eng)) +
          (!this.deductions.taxes ? 0 : parseFloat(this.deductions.taxes)) +
          (!this.deductions.lta ? 0 : parseFloat(this.deductions.lta)) +
          (!this.deductions.others ? 0 : parseFloat(this.deductions.others));
        return op.toFixed(2);
      },
    },
    computedGroup: {
      get() {
        const act = this.activities.find((v) => v.id === this.accountInformation.activity) || { description: '' };
        return this.nonRates.map((i) => {
          const row = i;
          const sum = Number(this.sumDeductions);
          const dt = sum / 100;
          const fr = i.credit / 100;

          const dtOp = act.rate / (1 - dt) / (1 - dt);
          const finalRateOp = dtOp * (1 + fr);
          const premiumRateOp = Decimal(finalRateOp)
            .mul(this.quotation.tivTarifadorSelect ? numeral((this.quotation.tivTarifadorSelect || '$0').replace('$', '')).value() : 0)
            .div(1000);

          row.activity = act.description;
          row.activityRate = act.rate;
          row.rate = this.formatter.format(dtOp.toFixed(2));
          row.finalRate = this.formatter.format(finalRateOp.toFixed(2));
          row.premiumRate = this.formatter.format(premiumRateOp.toFixed(2));

          this.SET_RATE({ key: 'nonCatFinalRate', value: finalRateOp.toFixed(3) });
          this.SET_RATE({ key: 'nonCatFinalPremiumRate', value: premiumRateOp.toFixed(3) });

          return row;
        });
      },
    },
  },
  validations: {
    computedGroup: {
      $each: {
        activity: { required },
        activityRate: { required },
        rate: { required },
        credit: { required },
        reason: { required },
        finalRate: { required },
        premiumRate: { required },
      },
    },
  },
  methods: {
    ...mapActions(['getCatalogByName', 'saveRatesModalColumn', 'loadMultipleSectionRatesModal', 'addNewFieldModal']),
    ...mapMutations(['SET_RATE']),
    addFields() {
      this.addNewFieldModal({ table: 'nonCatRatesPro' });
    },
    removeField(index) {
      const id = this.$v.computedGroup.$each[index].$model.id;
      this.nonRates.splice(index, 1);
      this.saveRatesModalColumn({
        table: 'nonCatRatesPro',
        key: 'active',
        value: false,
        id,
      });
    },
    async checkField(index, column) {
      if (this.$v.computedGroup.$each[index][column].$invalid || this.$v.computedGroup.$each[index][column].$error) return;
      const value = this.$v.computedGroup.$each[index][column].$model;
      const id = this.$v.computedGroup.$each[index].$model.id;
      await this.saveRatesModalColumn({
        table: 'nonCatRatesPro',
        key: column,
        value,
        id,
      });
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
/*
		Estilos únicos del componente
	*/
.Table {
  .flex();
  width: 100%;
  height: auto;
  align-items: flex-start;
  align-content: flex-start;
  flex-wrap: wrap;

  .Line {
    .flex();
    width: 100%;
    height: 50px;
    justify-content: space-between;

    .Row {
      .flex();
      width: 13.7%;
      height: 50px;
      justify-content: center;
      text-align: center;
    }

    .Bold {
      font-weight: 600;
    }
  }
}
</style>
