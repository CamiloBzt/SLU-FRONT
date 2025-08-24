<template>
  <div class="ExchangeCalcCont d-flex justify-center flex-wrap align-center">
    <div
      class="ExchangeCont d-flex justify-start align-content-start flex-wrap FirstExchangeCont"
    >
      <!--TITULO-->
      <div
        class="TitleCont d-flex justify-end align-content-center align-center"
      >
        <h5>Total insured value - original currency</h5>
      </div>

      <!--INPUTS-->
      <div class="InputContent d-flex justify-end align-center">
        <span class="LabelInput"> Property Damage </span>

        <div class="InputContainer">
          <!-- setStateTIV('propertyDamage', this);
          checkInsuredColumn('propertyDamage'); -->
          <!-- <v-text-field v-model="tivNon.propertyDamage" type="number" prefix="$" @blur="calculeUSD()"></v-text-field> -->
          <currency-input
            v-model="tivNon.propertyDamage"
            :options="currencyOptions"
            :suffix="currentCurrency.key"
          />
        </div>
      </div>

      <div class="InputContent d-flex justify-end align-center">
        <span class="LabelInput" v-if="isPro"> Business Interruption </span>
        <span class="LabelInput" v-if="!isPro"> ALOP </span>

        <div class="InputContainer">
          <!-- <v-text-field class="ml-3" v-model="tivNon.businessInterruption" type="number" prefix="$" @blur="calculeUSD()"></v-text-field> -->
          <currency-input
            v-model="tivNon.businessInterruption"
            :options="currencyOptions"
            :suffix="currentCurrency.key"
          />
        </div>
      </div>

      <div class="InputContent d-flex justify-end align-center">
        <span class="LabelInput"> Stocks </span>

        <div class="InputContainerStocks">
          <!-- <v-text-field  v-model="tivNon.stock" type="number" prefix="$" @blur="calculeUSD()"></v-text-field> -->
          <currency-input
            v-model="tivNon.stock"
            :options="currencyOptions"
            :suffix="currentCurrency.key"
          />
        </div>

        <div class="InputContainerStocks">
          <v-text-field
            v-model="tivNon.stockPercentaje"
            type="number"
            suffix="%"
            max="100"
          />
        </div>
      </div>

      <!--LINEA DIVISORIA-->
      <div class="ExpansionLineTop mt-2"></div>

      <!--TOTAL-->
      <div class="InputContent d-flex justify-end align-center">
        <span class="LabelInput font-weight-bold"> Total </span>
        <div class="InputContainer font-weight-bold">
          {{ tivNon.total }}
        </div>
      </div>

      <!--LINEA DIVISORIA-->
      <div class="ExpansionLineTop"></div>

      <div class="InputContent d-flex justify-end align-center">
        <span class="LabelInput"> PML </span>

        <div class="InputContainer">
          <!-- <v-text-field v-model="premiumNon.pml" prefix="$"></v-text-field> -->
          <currency-input
            v-model="premiumNon.pml"
            :options="currencyOptions"
            :suffix="currentCurrency.key"
            @change="value = $event"
          />
        </div>
      </div>

      <div class="InputContent d-flex justify-end align-center">
        <span class="LabelInput"> Rate </span>

        <div class="InputContainer">
          <v-text-field
            type="number"
            v-model="premiumNon.rate"
            suffix="%"
            @blur="
              sumDatapremiumOriginal();
              setStatePremiumNON('rate', this);
              checkPMLColumn('rate');
            "
            :error-messages="quotationValids('premiumNon', 'rate')"
          ></v-text-field>
        </div>
      </div>

      <div class="InputContent d-flex justify-end align-center">
        <span class="LabelInput bold"> premium </span>

        <div class="InputContainer">
          <b> {{ premiumNon.totalPremium }} </b>
        </div>
      </div>
    </div>

    <div
      class="ExchangeCont d-flex justify-start align-content-start flex-wrap SecondExchangeCont"
    >
      <!--TITULO-->
      <div
        class="TitleCont d-flex justify-start align-content-center align-center"
      >
        <h5>Total insurable value - USD</h5>
      </div>

      <!--INPUTS-->
      <div class="InputContent d-flex justify-start align-center">
        <span class="LabelInput"> Property Damage </span>

        <div class="InputContainer">
          <currency-input
            v-model="tivNon.propertyDamageUsd"
            :options="currencyOptions"
            @blur="
              calculeUSD();
              setStateTIVNON('propertyDamageUsd', this);
              checkInsuredColumn('propertyDamageUsd');
            "
            suffix="USD"
            @change="value = $event"
            readonly
          />
          <!-- <v-text-field
            v-model="tivNon.propertyDamageUsd"
            type="number"
            prefix="$"
            @blur="calculeUSD()"
          ></v-text-field> -->
        </div>
      </div>

      <div class="InputContent d-flex justify-start align-center">
        <span class="LabelInput" v-if="isPro"> Business Interruption </span>
        <span class="LabelInput" v-if="!isPro"> ALOP </span>

        <div class="InputContainer">
          <currency-input
            v-model="tivNon.businessInterruptionUsd"
            :options="currencyOptions"
            @blur="
              calculeUSD();
              setStateTIVNON('businessInterruptionUsd', this);
              checkInsuredColumn('businessInterruptionUsd');
            "
            suffix="USD"
            @change="value = $event"
            readonly
          />
          <!-- <v-text-field
            class="ml-3"
            v-model="tivNon.businessInterruptionUsd"
            type="number"
            prefix="$"
            @blur="calculeUSD()"
          ></v-text-field> -->
        </div>
      </div>

      <div class="InputContent d-flex justify-start align-center">
        <span class="LabelInput"> Stocks </span>

        <div class="InputContainer">
          <currency-input
            v-model="tivNon.stockUsd"
            :options="currencyOptions"
            @blur="
              calculeUSD();
              setStateTIVNON('stockUsd', this);
              checkInsuredColumn('stockUsd');
            "
            suffix="USD"
            @change="value = $event"
            readonly
          />
          <!-- <v-text-field
            class="ml-3"
            v-model="tivNon.stockUsd"
            type="number"
            prefix="$"
            @blur="calculeUSD()"
          ></v-text-field> -->
        </div>
      </div>
      <!--LINEA DIVISORIA-->
      <div class="ExpansionLineTop mt-2"></div>

      <!--TOTAL-->
      <div class="InputContent d-flex justify-start align-center">
        <span class="LabelInput font-weight-bold"> Total </span>
        <div class="InputContainer font-weight-bold">
          {{ tivNon.totalUsd }}
        </div>
      </div>
      <div class="ExpansionLineTop"></div>

      <div class="InputContent d-flex justify-start align-center">
        <span class="LabelInput"> PML </span>

        <div class="InputContainer">
          <currency-input
            v-model="premiumNon.pmlUsd"
            :options="currencyOptions"
            @blur="
              calculeUSD();
              setStatePremiumNON('pmlUsd', this);
              checkPMLColumn('pmlUsd');
            "
            suffix="USD"
            @change="value = $event"
            readonly
          />
          <!-- <v-text-field
            class="ml-3"
            v-model="premiumNon.pmlUsd"
            prefix="$"
          ></v-text-field> -->
        </div>
      </div>

      <div class="InputContent d-flex justify-start align-center">
        <span class="LabelInput"> Rate </span>

        <div class="InputContainer">
          <v-text-field
            type="number"
            v-model="premiumNon.rateUsd"
            suffix="%"
            @blur="
              sumDatapremiumUSD();
              setStatePremiumNON('rateUsd', this);
              checkPMLColumn('rateUsd');
            "
            @change="value = $event"
            :error-messages="quotationValids('premiumNon', 'rateUsd')"
            readonly
          ></v-text-field>
        </div>
      </div>

      <div class="InputContent d-flex justify-start align-center">
        <span class="LabelInput bold"> premiumNon </span>

        <div class="InputContainer">
          <b>{{ premiumNon.totalPremiumUsd }} </b>
        </div>
      </div>
    </div>

    <!--LINEA DIVISORIA-->
    <div class="ExpansionLineTop blueLight mt-2"></div>
  </div>
</template>
<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
/* validations */
import { validationMixin } from "vuelidate";
import { required, requiredIf } from "vuelidate/lib/validators";
import { DigitsAndDecimals, Percentage } from "@/constants/validations";
import { formValidations } from "@/mixins/formValidations";
/* components */
import ButtonActiveModalRate from "@/components/Rate/ButtonActiveModalRate.vue";
import CurrencyInput from "@/components/CurrencyInput/CurrencyInput.vue";
/* lodash */
import { debounce } from "lodash";

export default {
  name: "ExchangeCalculator",
  mixins: [formValidations, validationMixin],
  data() {
    return {
      currencyOptions: {
        currency: "MXN",
        currencyDisplay: "narrowSymbol",
        locale: "en-US",
      },
      isOptional: true,
    };
  },
  components: {
    CurrencyInput,
  },
  computed: {
    ...mapGetters([
      "quotation",
      "tivNon",
      "premiumNon",
      "accountInformation",
      "currencies",
    ]),
    isPro() {
      return this.accountInformation.typeOfRisk === 3;
    },
    currentCurrency: {
      get() {
        if (
          this.accountInformation.currency &&
          this.currencies &&
          this.currencies.length > 0
        ) {
          const currencyObj = this.currencies.find(
            (v) => v.id === this.accountInformation.currency
          );
          return currencyObj;
        }
        return 0;
      },
    },
  },
  watch: {
    "quotation.exchangeRate": function () {
      this.calculeUSD();
      if (this.premiumNon.rate || this.premiumNon.rateUsd) {
        this.sumDatapremiumOriginal();
        this.sumDatapremiumUSD();
        this.calculeUSDpml();
      }
    },
    "tivNon.propertyDamage": debounce(function (value) {
      this.calculeOnWatch();
      this.$v.tivNon.propertyDamage.$model = value;
      this.setStateTIVNON("propertyDamage", value);
      this.checkInsuredColumn("propertyDamage");
    }, 1000),
    "tivNon.propertyDamageUsd": debounce(function (value) {
      this.calculeOnWatch();
      this.$v.tivNon.propertyDamageUsd.$model = value;
      this.setStateTIVNON("propertyDamageUsd", value);
      this.checkInsuredColumn("propertyDamageUsd");
    }, 1000),
    "tivNon.businessInterruption": debounce(function (value) {
      this.calculeOnWatch();
      this.$v.tivNon.businessInterruption.$model = value;
      this.setStateTIVNON("businessInterruption", value);
      this.checkInsuredColumn("businessInterruption");
    }, 1000),
    "tivNon.businessInterruptionUsd": debounce(function (value) {
      this.calculeOnWatch();
      this.$v.tivNon.businessInterruptionUsd.$model = value;
      this.setStateTIVNON("businessInterruptionUsd", value);
      this.checkInsuredColumn("businessInterruptionUsd");
    }, 1000),
    "tivNon.stock": debounce(function (value) {
      this.calculeOnWatch();
      this.$v.tivNon.stock.$model = value;
      this.setStateTIVNON("stock", value);
      this.checkInsuredColumn("stock");
    }, 1000),
    "tivNon.stockPercentaje": debounce(function (value) {
      this.calculeOnWatch();
      this.$v.tivNon.stockPercentaje.$model = value;
      this.setStateTIVNON("stockPercentaje", value);
      this.checkInsuredColumn("stockPercentaje");
    }, 1000),
    "tivNon.stockUsd": debounce(function (value) {
      this.calculeOnWatch();
      this.$v.tivNon.stockUsd.$model = value;
      this.setStateTIVNON("stockUsd", value);
      this.checkInsuredColumn("stockUsd");
    }, 1000),
    "premiumNon.rate": function () {
      this.calculeOnWatch();
    },
    "premiumNon.pml": debounce(function (value) {
      this.calculeUSD();
      this.$v.premiumNon.pml.$model = value;
      this.setStatePremiumNON("pml", value);
      this.checkPMLColumn("pml");
    }, 1000),
    "premiumNon.pmlUsd": debounce(function (value) {
      this.calculeUSD();
      this.$v.premiumNon.pmlUsd.$model = value;
      this.setStatePremiumNON("pmlUsd", value);
      this.checkPMLColumn("pmlUsd");
    }, 1000),
    "tivNon.total": debounce(async function (value) {
      this.setStateTIVNON("total", value);
      await this.checkInsuredColumn("total");
    }, 1000),
    "tivNon.totalUsd": debounce(async function (value) {
      this.setStateTIVNON("totalUsd", value);
      await this.checkInsuredColumn("totalUsd");
    }, 1000),
    "premiumNon.totalPremium": debounce(async function (value) {
      this.$v.premiumNon.totalPremium.$model = value;
      this.setStatePremiumNON("totalPremium", value);
      await this.checkPMLColumn("totalPremium");
    }, 1000),
    "premiumNon.totalPremiumUsd": debounce(async function (value) {
      this.$v.premiumNon.totalPremiumUsd.$model = value;
      this.setStatePremiumNON("totalPremiumUsd", value);
      await this.checkPMLColumn("totalPremiumUsd");
    }, 1000),
  },
  validations: {
    tivNon: {
      propertyDamage: { required },
      businessInterruption: { required },
      stock: { required },
      total: { required },
      totalUsd: { required },
      propertyDamageUsd: { required },
      businessInterruptionUsd: { required },
      stockUsd: { required },
      stockPercentaje: { required },
    },
    premiumNon: {
      rate: { required, DigitsAndDecimals, Percentage },
      rateUsd: { required, DigitsAndDecimals, Percentage },
      pml: { required },
      pmlUsd: { required },
      totalPremium: { required },
      totalPremiumUsd: {
        required: requiredIf(function () {
          return !this.isOptional;
        }),
      },
    },
  },
  methods: {
    ...mapMutations(["setStateTIVNON", "setStatePremiumNON"]),
    ...mapActions(["saveQuotationColumn"]),
    // Convierte cualquier valor a número, eliminando comas y símbolos
    toNumber(val) {
      if (typeof val === 'number') return val;
      if (!val) return 0;
      // Elimina todo excepto dígitos y punto decimal
      return parseFloat(String(val).replace(/[^\d.\-]/g, '')) || 0;
    },
    calculeOnWatch() {
      this.calculeUSD();
      if (this.premiumNon.rate || this.premiumNon.rateUsd) {
        this.checkPMLColumn("rate");
        this.checkPMLColumn("rateUsd");
        this.sumDatapremiumOriginal();
        this.sumDatapremiumUSD();
      }
    },
    calculeUSD() {
      if (this.quotation.exchangeRate) {
        this.tivNon.propertyDamageUsd =
          this.toNumber(this.tivNon.propertyDamage) / this.toNumber(this.quotation.exchangeRate);
        this.tivNon.businessInterruptionUsd =
          this.toNumber(this.tivNon.businessInterruption) / this.toNumber(this.quotation.exchangeRate);
        this.tivNon.stockUsd = this.toNumber(this.tivNon.stock) / this.toNumber(this.quotation.exchangeRate);
        this.sumData();
        this.calculeUSDpml();
      }
    },
    calculeUSDpml() {
      if (this.quotation.exchangeRate)
        this.premiumNon.pmlUsd =
          this.toNumber(this.premiumNon.pml) / this.toNumber(this.quotation.exchangeRate);
    },
    sumDatapremiumOriginal() {
      this.premiumNon.rateUsd = this.premiumNon.rate;
      this.sumDatapremiumUSD();
      const formatter = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      });

      const propertyDamage = this.toNumber(this.tivNon.propertyDamage);
      const businessInterruption = this.toNumber(this.tivNon.businessInterruption);
      const stock = this.toNumber(this.tivNon.stock);
      const rate = this.toNumber(this.premiumNon.rate);

      this.premiumNon.totalPremium =
        (propertyDamage * rate) / 1000 +
        (businessInterruption * rate) / 1000 +
        (stock * rate) / 1000;

      this.premiumNon.totalPremium = formatter.format(
        this.premiumNon.totalPremium
      );
    },
    sumDatapremiumUSD() {
      if (this.premiumNon.rateUsd) {
        const formatter = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        });

        const propertyDamageUsd = this.toNumber(this.tivNon.propertyDamageUsd);
        const businessInterruptionUsd = this.toNumber(this.tivNon.businessInterruptionUsd);
        const stockUsd = this.toNumber(this.tivNon.stockUsd);
        const rateUsd = this.toNumber(this.premiumNon.rateUsd);

        this.premiumNon.totalPremiumUsd =
          (propertyDamageUsd * rateUsd) / 1000 +
          (businessInterruptionUsd * rateUsd) / 1000 +
          (stockUsd * rateUsd) / 1000;

        this.premiumNon.totalPremiumUsd = formatter.format(
          this.premiumNon.totalPremiumUsd
        );
      }
    },
    sumData() {
      const formatter = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      });

      const propertyDamage = this.toNumber(this.tivNon.propertyDamage);
      const businessInterruption = this.toNumber(this.tivNon.businessInterruption);
      const stock = this.toNumber(this.tivNon.stock);
      const propertyDamageUsd = this.toNumber(this.tivNon.propertyDamageUsd);
      const businessInterruptionUsd = this.toNumber(this.tivNon.businessInterruptionUsd);
      const stockUsd = this.toNumber(this.tivNon.stockUsd);

      this.tivNon.total = propertyDamage + businessInterruption + stock;
      this.tivNon.totalUsd = propertyDamageUsd + businessInterruptionUsd + stockUsd;

      this.tivNon.total = formatter.format(this.tivNon.total);
      this.tivNon.totalUsd = formatter.format(this.tivNon.totalUsd);
    },
    async checkInsuredColumn(column) {
      this.$v.tivNon[column].$touch();
      if (this.$v.tivNon[column].$invalid) return;
      await this.saveQuotationColumn({
        table: "insured",
        parent: "tivNon",
        column,
      });
    },
    async checkPMLColumn(column) {
      this.$v.premiumNon[column].$touch();
      if (this.$v.premiumNon[column].$invalid) return;
      await this.saveQuotationColumn({
        table: "insured",
        parent: "premiumNon",
        column,
      });
    },
  },
};
</script>
<style lang="less" scoped>
@FontSizeLabel: 15px;
@weightTitle: 600;
@sizeTitle: 20px;
@sizeTitleMovil: 14px;
.ExchangeCalcCont {
  width: 100%;
  height: auto;
  position: relative;

  //Boton tarifar
  .TarifarBtn {
    position: absolute;
    right: 0;
    top: 0;
  }
  .ExchangeCont {
    width: 35%;
    height: auto;

    .ExpansionLineTop {
      border-top: solid 1px #a8bfd9;
    }

    //TITULO
    .TitleCont {
      width: 100%;
      height: 60px;
      h5 {
        font-weight: @weightTitle;
        font-size: @sizeTitle;
        text-transform: capitalize;
        color: black;
        text-align: center;
        @media (max-width: 650px) {
          font-size: @sizeTitleMovil;
        }
      }
    }

    //INPUTS
    .InputContent {
      width: 100%;
      height: 50px;

      //LABEL
      .LabelInput {
        color: #547fa9;
        font-size: @FontSizeLabel;
      }
      .bold {
        font-weight: 600;
        font-size: @FontSizeLabel !important;
      }

      .InputContainer {
        width: 50%;
        margin-left: 8px;

        b {
          font-size: 16px;
          font-weight: 600;
        }
      }
      .InputContainerStocks {
        width: 25%;
        margin-left: 8px;

        b {
          font-size: 16px;
          font-weight: 600;
        }
      }
    }

    .Total {
      font-size: 19px;
      font-size: @FontSizeLabel;
      font-weight: 600;
      color: #547fa9 !important;
      b {
        color: black;
        font-size: 16px;
        font-weight: 600;
      }
    }
  }

  .FirstExchangeCont {
    margin-left: -34px;
  }
  .SecondExchangeCont {
    .InputContent,
    .TitleCont {
      margin-left: 34px;
    }
  }

  //DIVISION VERTICAL
  .VerticalDiver {
    width: 1px;
    height: 490px;
    background: black;
    margin-left: 2.5%;
    margin-right: 2.5%;
  }
}
.blueLight {
  background: #a8bfd9 !important;
}
.blueLight {
  background: #a8bfd9 !important;
}
@media (max-width: 640px) {
  .ExchangeCalcCont {
    .ExchangeCont {
      width: 100%;
      padding: 0 !important;
      //TITULO
      .TitleCont {
        h5 {
          font-size: 15px;
        }
      }

      //INPUTS
      .InputContent {
        .LabelInput {
          font-size: 14px;
          height: 60%;
          display: flex;
          justify-content: flex-end;
          align-items: flex-end;
        }
      }

      //TOTAL
      .Total {
        font-size: 14px;
      }
    }
  }
}
</style>
