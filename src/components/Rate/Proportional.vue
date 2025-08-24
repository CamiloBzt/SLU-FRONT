<template>
  <div class="ExpandContent" :disabled="loadingPanel">
    <v-form class="Form d-flex justify-start align-center flex-wrap">
      <!--CURRENCY-->
      <div class="InputContent">
        <v-select
          v-model="currencyTarifador"
          required
          label="Currency"
          :items="filteredCurrencies"
          item-text="key"
          item-value="id"
          :hint="`${currencyTarifador.region || 'Region'}, ${
            currencyTarifador.description || 'Description'
          }`"
          persistent-hint
          return-object
          :loading="loadingCurrencies"
          :disabled="!currencies || currencies.length === 0"
          @change="changeTiv()"
        >
          <template slot="item" slot-scope="data">
            {{ data.item.key }} - {{ data.item.description }}
          </template>
        </v-select>
      </div>

      <!--TIV-->
      <div class="InputContent">
        <v-text-field
          label="TIV"
          v-model="quotation.tivTarifadorSelect"
          readonly
        ></v-text-field>
      </div>

      <!--INCEPTION DATE-->
      <div class="InputContent">
        <v-menu
          v-model="menu2"
          :close-on-content-click="false"
          :nudge-right="40"
          transition="scale-transition"
          offset-y
          min-width="auto"
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
            v-model="quotation.inceptionDate"
            @input="(menu2 = false), setStateQuotation('inceptionDate', this)"
            disabled
            readonly
          ></v-date-picker>
        </v-menu>
      </div>

      <!--EXPIRY DATE-->
      <div class="InputContent">
        <v-menu
          v-model="menu"
          :close-on-content-click="false"
          :nudge-right="40"
          transition="scale-transition"
          offset-y
          min-width="auto"
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
            @input="(menu = false), setStateQuotation('expiryDate', this)"
            disabled
            readonly
          ></v-date-picker>
        </v-menu>
      </div>

      <div class="InputContent">
        <v-text-field label="Term" v-model="quotation.term" readonly>
        </v-text-field>
      </div>
    </v-form>
  </div>
</template>
<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import { required, requiredIf, minLength } from "vuelidate/lib/validators";
import Decimal from "decimal.js";
export default {
  name: "ProportionalRates",
  data() {
    return {
      currencyItems: [],
      loadingPanel: false,
      loadingCurrencies: false,
      menu2: false,
      menu: false,
      currencyTarifador: [],
      tivTarifadorSelect: null,
    };
  },
  computed: {
    ...mapGetters([
      "accountInformation",
      "currencies",
      "quotation",
      "tiv",
      "tivNon",
      "rate",
    ]),
    ShowRateTerm: {
      get() {
        return this.$route.name;
      },
    },

    filteredCurrencies() {
      if (this.currencies.length && this.currencies.length > 0)
        return this.currencies.filter((v) => {
          const model = this.$v.accountInformation.currency.$model;
          const valid = v.id == model || v.id == 1;
          if (valid) return v;
        });

      return [];
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
    await this.getCatalogByName({ name: "activities" });
    await this.checkSubscriptionStored();
    if (!this.quotation.inceptionDate)
      this.quotation.inceptionDate = new Date(
        Date.now() - new Date().getTimezoneOffset() * 60000
      )
        .toISOString()
        .substr(0, 10);
    if (!this.quotation.expiryDate)
      this.quotation.expiryDate = new Date(
        Date.now() + 31536000000 - new Date().getTimezoneOffset() * 60000
      )
        .toISOString()
        .substr(0, 10);
    let fecha1 = new Date(this.quotation.inceptionDate);
    let fecha2 = new Date(this.quotation.expiryDate);
    this.quotation.term = new Decimal(
      Math.round(
        (fecha2.getTime() - fecha1.getTime()) / (1000 * 60 * 60 * 24)
      ) / 30
    );
    this.quotation.term = this.quotation.term.toDP(3);
    /* loaders to false */
    this[lcu] = false;
    this[lpa] = false;
  },
  methods: {
    ...mapActions([
      "getCatalogByName",
      "saveColumn",
      "checkSubscriptionStored",
    ]),
    ...mapMutations(["setLoading", "setStateQuotation", "setStateAccount"]),
    async checkColumn(column, difname = column) {
      this.$v.accountInformation[column].$touch();
      if (this.$v.accountInformation[column].$invalid) return;
      await this.saveColumn({
        table: "submission",
        parent: "accountInformation",
        column,
        difname,
      });
    },
    changeTiv() {
      let tivRate = this.tiv;

      if (this.quotation.typeQuotation == 2) tivRate = this.tivNon;
      if (this.currencyTarifador.key == "USD") {
        this.quotation.tivTarifadorSelect = tivRate.totalUsd;
        this.setStateQuotation("tivTarifadorSelect", tivRate.totalUsd);
      } else {
        this.quotation.tivTarifadorSelect = tivRate.total;
        this.setStateQuotation("tivTarifadorSelect", tivRate.total);
      }
    },
  },
  validations: {
    accountInformation: {
      insuredName: { required },
      currency: { required },
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
