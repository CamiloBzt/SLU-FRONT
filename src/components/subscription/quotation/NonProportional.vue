<template>
  <div class="ExpandContent" :disabled="loadingPanel">
    <v-form class="Form d-flex justify-start align-center flex-wrap">
      <!--INSURED-->
      <div class="InputContent">
        <v-text-field
          v-model="accountInformation.insuredName"
          label="Insured"
          @blur="setStateQuotation('insuredName', this)"
          readonly
        >
        </v-text-field>
      </div>

      <!--CURRENCY-->
      <div class="InputContent">
        <v-select
          v-model.trim="$v.accountInformation.currency.$model"
          required
          label="Currency"
          :items="currencies"
          item-text="key"
          item-value="id"
          :hint="`${currentCurrency.region}, ${currentCurrency.description}`"
          persistent-hint
          return-object
          :loading="loadingCurrencies"
          :disabled="!currencies || currencies.length === 0"
          @blur="setStateQuotation('currency', this)"
          readonly
        >
        </v-select>
      </div>

      <!--Rate of Exchange-->
      <div class="InputContent">
        <v-text-field
          v-model="quotation.exchangeRate"
          label="Rate of Exchange"
          @blur="
            setStateQuotation('exchangeRate', this);
            checkQuotationColumn('exchangeRate');
          "
        >
        </v-text-field>
      </div>
      <!--INCEPTION DATE-->
      <div class="InputContent">
        <v-menu
          v-model="menu2"
          :close-on-content-click="false"
          offset-y
          min-width="auto"
          content-class="elevation-3"
          transition="scale-transition"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="quotation.inceptionDate"
              label="Inception Date"
              readonly
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
            no-title
            color="#003D6D"
            v-model="quotation.inceptionDate"
            @input="
              (menu2 = false),
                setStateQuotation('inceptionDate', this),
                checkQuotationColumn('inceptionDate')
            "
            :error-messages="requiredQuotation('inceptionDate')"
          ></v-date-picker>
        </v-menu>
      </div>

      <!--EXPIRY DATE-->
      <div class="InputContent">
        <v-menu
          v-model="menu"
          :close-on-content-click="false"
          offset-y
          min-width="auto"
          content-class="elevation-3"
          transition="scale-transition"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="quotation.expiryDate"
              label="Expiry Date"
              readonly
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="quotation.expiryDate"
            no-title
            color="#003D6D"
            @input="
              (menu = false),
                setStateQuotation('expiryDate', this),
                checkQuotationColumn('expiryDate')
            "
            :error-messages="requiredQuotation('expiryDate')"
          ></v-date-picker>
        </v-menu>
      </div>
    </v-form>
  </div>
</template>
<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import { required } from "vuelidate/lib/validators";
import { DigitsAndDecimals } from "@/constants/validations";
import { formValidations } from "@/mixins/formValidations";
export default {
  name: "NonProportional",
  mixins: [formValidations],
  data() {
    return {
      currencyItems: [],
      loadingPanel: false,
      loadingCurrencies: false,
      menu2: false,
      menu: false,
    };
  },
  computed: {
    ...mapGetters(["accountInformation", "currencies", "quotation"]),

    safeCurrencies() {
      return Array.isArray(this.currencies) ? this.currencies : [];
    },
    currentCurrency() {
      const item = this.safeCurrencies.find(
        (v) => v.id === this.accountInformation.currency
      );
      return (
        item || {
          region: "Region",
          description: "Description",
        }
      );
    },
  },
  async mounted() {
    /* set loadings (data) */
    const lpa = "loadingPanel";
    const lcu = "loadingCurrencies";
    /* loaders to true */
    this[lpa] = !this[lpa];
    this[lcu] = !this[lcu];
    /* obtención de catálogos */
    await this.getCatalogByName({ name: "currencies" });
    /* loaders to false */
    this[lcu] = false;
    this[lpa] = false;
  },
  methods: {
    ...mapActions(["getCatalogByName", "saveQuotationColumn"]),
    ...mapMutations(["setLoading", "setStateQuotation"]),
    async checkQuotationColumn(column) {
      this.$v.quotation[column].$touch();
      if (this.$v.quotation[column].$invalid) return;
      await this.saveQuotationColumn({ parent: "quotation", column });
    },
  },
  validations: {
    accountInformation: {
      insuredName: { required },
      currency: { required },
    },
    quotation: {
      exchangeRate: { required, DigitsAndDecimals },
      inceptionDate: { required },
      expiryDate: { required },
    },
  },
};
</script>
<style lang="less" scoped>
.flexCenter {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  align-content: center;
}
.Form {
  width: 100%;
  height: 60px;
  .InputContent {
    width: 19%;
    margin-right: 1%;
    height: 100%;
    .flexCenter();
  }
}
@media (max-width: 640px) {
  .Form {
    height: auto;
    .InputContent {
      width: 100%;
    }
  }
}
</style>
