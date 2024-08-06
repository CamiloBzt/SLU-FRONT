<template>
  <div class="deductions-cont">
    <!--TITULO-->
    <div class="title-cont">
      <h5>Deductions</h5>
      <!--BOTON TARIFAR-->
      <div
        v-if="showTarifador"
        class="tarifar-btn"
      >
        <ButtonActiveModalRate />
      </div>
    </div>
    <v-form class="form">
      <div class="input-content">
        <v-text-field
          v-model="deductions.brokerage"
          label="Brokerage"
          type="number"
          suffix="%"
          min="0"
          max="100"
          @change="updateByColumn('brokerage', $event)"
          :error-messages="quotationValids('deductions', 'brokerage')"
        ></v-text-field>
      </div>

      <div class="input-content">
        <v-text-field
          v-model="deductions.taxes"
          label="Taxes"
          type="number"
          suffix="%"
          min="0"
          max="100"
          @change="updateByColumn('taxes', $event)"
          :error-messages="quotationValids('deductions', 'taxes')"
        ></v-text-field>
      </div>

      <div class="input-content">
        <v-text-field
          v-model="deductions.eng"
          label="Eng Fee"
          type="number"
          min="0"
          max="100"
          suffix="%"
          @change="updateByColumn('eng', $event)"
          :error-messages="quotationValids('deductions', 'eng')"
        ></v-text-field>
      </div>

      <div class="input-content">
        <v-select
          v-model.trim="deductions.deduction_type"
          label="Type"
          :items="catalogDeductionsType"
          item-text="type"
          item-value="type"
          @change="updateByColumn('deduction_type', $event)"
        >
        </v-select>
      </div>

      <div class="input-content">
        <v-text-field
          v-model="deductions.fronting"
          label="Fronting Fee"
          type="number"
          suffix="%"
          min="0"
          max="100"
          @change="updateByColumn('fronting', $event)"
          :error-messages="quotationValids('deductions', 'fronting')"
        ></v-text-field>
      </div>

      <div class="input-content-large">
        <v-text-field
          v-model="deductions.premium_reserve"
          label="Premium Reserve Only Colombia"
          type="number"
          min="0"
          max="100"
          suffix="%"
          @change="updateByColumn('premium_reserve', $event)"
          :error-messages="quotationValids('deductions', 'premium_reserve')"
        ></v-text-field>
      </div>

      <div class="input-content">
        <v-text-field
          v-model="deductions.lta"
          label="LTA"
          type="number"
          suffix="%"
          min="0"
          max="100"
          @change="updateByColumn('lta', $event)"
          :error-messages="quotationValids('deductions', 'lta')"
        ></v-text-field>
      </div>

      <div class="input-content">
        <v-text-field
          v-model="deductions.others"
          label="Others"
          type="number"
          suffix="%"
          min="0"
          max="100"
          @change="updateByColumn('others', $event)"
          :error-messages="quotationValids('deductions', 'others')"
        ></v-text-field>
      </div>
    </v-form>
  </div>
</template>
<script>
//Tienda
import { mapGetters } from 'vuex';
//Componentes
import ButtonActiveModalRate from "@/components/Rate/ButtonActiveModalRate.vue";
//Validaciones
import { formValidations } from '@/mixins/formValidations';
import { required } from 'vuelidate/lib/validators';
import { DigitsAndDecimals, Percentage } from '@/constants/validations';
//Services
import { getCatalog } from '@/constants/catalogs/services/catalogs.service.js';
import { updateChange } from './services/PremiumPaymentWarranty/premium-payment.service.js';
import { getNetPremiumOriginalCurrencyById } from './services/NetPremiunProperty/net-premiun-property.service.js';

export default {
  name: "Deductions",
  mixins: [formValidations],
  components: {
    ButtonActiveModalRate,
  },
  data() {
    return {
      //Catalogs
      catalogDeductionsType: [],
      //Deductions
      deductions:{
        brokerage: "",
        taxes: "",
        eng: "",
        deduction_type: "As Incurred",
        fronting: "",
        premium_reserve: "",
        lta: "",
        others: "",
      },
      id: 0,
      //variables
      showTarifador: false,
    };
  },
   computed: {
    ...mapGetters([
      'subscription_id'
    ]),
  },
  methods: {
    async updateByColumn(column, data) {
      this.$v.deductions[column].$touch();
      if (this.$v.deductions[column].$invalid) return;
      const res = await updateChange({
        id: this.id,
        tableName: 'quotation',
        column,
        dataValue: data.toString()
      })
      this.$emit('updateNet')
    }
  },
  async beforeMount() {
    //Catalogs
    const catalogDeductionsType = await getCatalog({ name: 'deductions_type' })
    this.catalogDeductionsType = catalogDeductionsType ? catalogDeductionsType : [];
    //Services
    const bound = await getNetPremiumOriginalCurrencyById({ id_subscription: this.subscription_id })
    this.deductions.brokerage = bound ? bound.Quotation.brokerage : this.deductions.brokerage
    this.deductions.taxes = bound ? bound.Quotation.taxes : this.deductions.taxes
    this.deductions.eng = bound ? bound.Quotation.eng : this.deductions.eng
    this.deductions.deduction_type = bound ? bound.Quotation.deduction_type : this.deductions.deduction_type
    this.deductions.fronting = bound ? bound.Quotation.fronting : this.deductions.fronting
    this.deductions.premium_reserve = bound ? bound.Quotation.premium_reserve : this.deductions.premium_reserve
    this.deductions.lta = bound ? bound.Quotation.lta : this.deductions.lta
    this.deductions.others = bound ? bound.Quotation.others : this.deductions.others
    this.id = bound ? bound.Quotation.id : this.id
  },
  validations: {
    deductions: {
      brokerage: { required, DigitsAndDecimals, Percentage },
      taxes: { required, DigitsAndDecimals, Percentage },
      eng: { required, DigitsAndDecimals, Percentage },
      deduction_type: { required },
      fronting: { required, DigitsAndDecimals, Percentage },
      premium_reserve: { required, DigitsAndDecimals, Percentage },
      lta: { required, DigitsAndDecimals, Percentage },
      others: { required, DigitsAndDecimals, Percentage },
    },
  },
};
</script>
<style lang="less" scoped>
.deductions-cont {
  width: 100%;
  height: auto;
  margin-bottom: 40px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  align-content: flex-start;

  //TITULO
  .title-cont {
    width: 100%;
    height: 90px;
    display: flex;
    justify-content: space-between;
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
    display: flex;
    flex-wrap: wrap;

    @media (max-width: 650px) {
      height: auto;
    }
    .input-content {
      width: 10.28%;
      height: 70px;
      margin-right: 1%;
      margin-top: -10px;
      @media (max-width: 900px) {
        width: 32%;
      }
      @media (max-width: 650px) {
        width: 100%;
      }
    }
    .input-content-large {
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
