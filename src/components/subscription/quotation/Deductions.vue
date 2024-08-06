<template>
  <div
    class="
      DeductionsCont
      d-flex
      justify-start
      align-center
      flex-wrap
      align-content-start
    "
  >
    <!--TITULO-->
    <div class="TitleCont d-flex justify-space-between align-center">
      <h5>Deductions</h5>

      <!--BOTON TARIFAR-->
      <div
        v-if="ShowRateBtn == 'Edit Subs quotation non-proportional'"
        class="TarifarBtn"
      >
        <ButtonActiveModalRate />
      </div>
    </div>
    <v-form class="form d-flex flex-wrap">
      <div class="InputContent">
        <v-text-field
          v-model="deductions.brokerage"
          label="Brokerage"
          type="number"
          suffix="%"
          min="0"
          max="100"
          @blur="
            setStateDeductions('brokerage', this);
            checkDeductionsColumn('brokerage');
            sumDeductions();
          "
          :error-messages="quotationValids('deductions', 'brokerage')"
        ></v-text-field>
      </div>

      <div class="InputContent">
        <v-text-field
          v-model="deductions.taxes"
          label="Taxes"
          type="number"
          suffix="%"
          min="0"
          max="100"
          @blur="
            setStateDeductions('taxes', this);
            checkDeductionsColumn('taxes');
            sumDeductions();
          "
          :error-messages="quotationValids('deductions', 'taxes')"
        ></v-text-field>
      </div>

      <div class="InputContent">
        <v-text-field
          v-model="deductions.eng"
          label="Eng Fee"
          type="number"
          min="0"
          max="100"
          suffix="%"
          @blur="
            setStateDeductions('eng', this);
            checkDeductionsColumn('eng');
            sumDeductions();
          "
          :error-messages="quotationValids('deductions', 'eng')"
        ></v-text-field>
      </div>

      <div class="InputContent">
        <v-select
          v-model.trim="deductions.deductionType"
          required
          label="Type"
          :items="deductionsType"
          item-text="type"
          item-value="type"
          min="0"
          max="100"
          :disabled="deductionsType.length === 0"
          @input="
            setStateDeductions('deductionType', this);
            checkDeductionsColumn('deductionType');
          "
          :error-messages="quotationValids('deductions', 'deductionType')"
        >
        </v-select>
      </div>

      <div class="InputContent">
        <v-text-field
          v-model="deductions.fronting"
          label="Fronting Fee"
          type="number"
          suffix="%"
          min="0"
          max="100"
          @blur="
            setStateDeductions('fronting', this);
            checkDeductionsColumn('fronting');
            sumDeductions();
          "
          :error-messages="quotationValids('deductions', 'fronting')"
        ></v-text-field>
      </div>

      <div class="InputContentLarge">
        <v-text-field
          v-model="deductions.premiumReserve"
          label="Premium Reserve Only Colombia"
          type="number"
          min="0"
          max="100"
          suffix="%"
          @blur="
            setStateDeductions('premiumReserve', this);
            checkDeductionsColumn('premiumReserve');
          "
          :error-messages="quotationValids('deductions', 'premiumReserve')"
        ></v-text-field>
      </div>

      <div class="InputContent">
        <v-text-field
          v-model="deductions.lta"
          label="LTA"
          type="number"
          suffix="%"
          min="0"
          max="100"
          @blur="
            setStateDeductions('lta', this);
            checkDeductionsColumn('lta');
            sumDeductions();
          "
          :error-messages="quotationValids('deductions', 'lta')"
        ></v-text-field>
      </div>
      <div class="InputContent">
        <v-text-field
          v-model="deductions.others"
          label="Others"
          type="number"
          suffix="%"
          min="0"
          max="100"
          @blur="
            setStateDeductions('others', this);
            checkDeductionsColumn('others');
            sumDeductions();
          "
          :error-messages="quotationValids('deductions', 'others')"
        ></v-text-field>
      </div>
    </v-form>
  </div>
</template>
<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';
/* validations */
import { validationMixin } from 'vuelidate';
import { required, requiredUnless } from 'vuelidate/lib/validators';
import { DigitsAndDecimals, Percentage } from '@/constants/validations';
import { formValidations } from '@/mixins/formValidations';
import ButtonActiveModalRate from '@/components/Rate/ButtonActiveModalRate.vue';

export default {
  name: 'Deductions',
  mixins: [formValidations, validationMixin],
  async beforeMount() {
    await this.getCatalogByName({ name: 'deductions_type' });
  },
  components: {
    ButtonActiveModalRate,
  },
  computed: {
    ...mapGetters(['deductions', 'deductionsType']),
    ShowRateBtn() {
      return this.$route.name;
    },
  },
  methods: {
    ...mapActions(['saveQuotationColumn', 'getCatalogByName']),
    ...mapMutations(['setStateDeductions']),
    changeBrokerage(value) {
      console.log(value);
    },
    async checkDeductionsColumn(column) {
      this.$v.deductions[column].$touch();
      if (this.$v.deductions[column].$invalid) return;
      await this.saveQuotationColumn({ parent: 'deductions', column });
      this.sumDeductions();
    },
    sumDeductions() {
      const op =
        (!this.deductions.brokerage
          ? 0
          : parseFloat(this.deductions.brokerage)) +
        (!this.deductions.fronting ? 0 : parseFloat(this.deductions.fronting)) +
        (!this.deductions.eng ? 0 : parseFloat(this.deductions.eng)) +
        (!this.deductions.taxes ? 0 : parseFloat(this.deductions.taxes)) +
        (!this.deductions.lta ? 0 : parseFloat(this.deductions.lta)) +
        (!this.deductions.others ? 0 : parseFloat(this.deductions.others));
      this.deductions.sum = op.toFixed(2);
    },
  },
  validations: {
    deductions: {
      brokerage: { required, DigitsAndDecimals, Percentage },
      taxes: { required, DigitsAndDecimals, Percentage },
      eng: { required, DigitsAndDecimals, Percentage },
      deductionType: { required },
      fronting: { required, DigitsAndDecimals, Percentage },
      premiumReserve: { required, DigitsAndDecimals, Percentage },
      lta: { required, DigitsAndDecimals, Percentage },
      others: { required, DigitsAndDecimals, Percentage },
    },
  },
};
</script>
<style lang="less" scoped>
.DeductionsCont {
  width: 100%;
  height: auto;
  padding-bottom: 65px;

  //TITULO
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
  .form {
    width: 100%;
    height: 60px;
    @media (max-width: 650px) {
      height: auto;
    }
    .InputContent {
      width: 10.28%;
      height: 70px;
      margin-right: 1%;
      margin-top: -10px;
      @media (max-width: 650px) {
        width: 100%;
      }
    }
    .InputContentLarge {
      width: 20%;
      height: 70px;
      margin-right: 1%;
      margin-top: -10px;
      @media (max-width: 650px) {
        width: 100%;
      }
    }
  }
}
</style>
