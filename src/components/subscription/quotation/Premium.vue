<template>
  <div class="ExchangeCalcCont d-flex justify-center flex-wrap align-center">
    <!--TITULO DEL COMPONENTE-->
    <div class="TitleComponent d-flex justify-space-between align-center">
      <h5>Premium</h5>

      <!--BOTON TARIFAR-->
      <ButtonActiveModalRate />
    </div>

    <!--TABLA-->
    <div class="Table">
      <!--
		-------------------------------------
			PRIMER COLUMNA - LABELS
		-------------------------------------
		-->
      <div class="Col LabelsCol">
        <!--TITULO-->
        <div class="Row Title" />

        <!--CONTENIDO-->
        <div class="Row Label">Property Damage</div>
        <div class="Row Label" v-if="isPro">BI</div>
        <div class="Row Label" v-if="!isPro">ALOP</div>
        <div class="Row Label" v-if="displayStocks">Stocks</div>
        <div class="Row Total">Total</div>
      </div>

      <!--
		-------------------------------------
			SEGUNDA COLUMNA - RATE
		-------------------------------------
		-->
      <div class="Col">
        <!--TITULO-->
        <div class="Row Title">Rate</div>

        <!--CONTENIDO-->
        <div class="Row Content">
          <div class="Label">Property Damage</div>
          <div class="Input">
            <v-text-field
              type="number"
              v-model="premium.propertyDamageRate"
              suffix="%"
              @blur="
                setStatePremium({
                  key: 'propertyDamageRate',
                  value: premium.propertyDamageRate,
                }),
                  checkPremium('propertyDamageRate')
              "
              :error-messages="quotationValids('premium', 'propertyDamageRate')"
            />
          </div>
        </div>
        <div class="Row Content">
          <div class="Label" v-if="isPro">BI</div>
          <div class="Label" v-if="!isPro">ALOP</div>
          <div class="Input">
            <v-text-field
              type="number"
              v-model="premium.businessInterruptionRate"
              suffix="%"
              @blur="
                setStatePremium({
                  key: 'businessInterruptionRate',
                  value: premium.businessInterruptionRate,
                }),
                  checkPremium('businessInterruptionRate')
              "
              :error-messages="
                quotationValids('premium', 'businessInterruptionRate')
              "
            />
          </div>
        </div>
        <div class="Row Content" v-if="displayStocks">
          <div class="Label">Stocks</div>
          <div class="Input">
            <v-text-field
              type="number"
              v-model="premium.stockRate"
              suffix="%"
              @blur="
                setStatePremium({
                  key: 'stockRate',
                  value: premium.stockRate,
                }),
                  checkPremium('stockRate')
              "
              :error-messages="quotationValids('premium', 'stockRate')"
            />
          </div>
        </div>
        <div class="Row Total HideOnMovil" />
      </div>

      <!--
		-------------------------------------
			TERCER COLUMNA - ORIGINAL INSURED
		-------------------------------------
		-->
      <div class="Col">
        <!--TITULO-->
        <div class="Row Title">Original Insured</div>

        <!--CONTENIDO-->
        <div class="Row Content">
          <div class="Label">Property Damage</div>
          <div class="Input">
            <currency-input
              v-model="premiumPropertyDamage"
              :options="currencyOptions"
              :suffix="currentCurrency.key"
              readonly
            />
          </div>
        </div>
        <div class="Row Content">
          <div class="Label" v-if="isPro">BI</div>
          <div class="Label" v-if="!isPro">ALOP</div>
          <div class="Input">
            <currency-input
              v-model="premiumBusinessInterruption"
              :options="currencyOptions"
              :suffix="currentCurrency.key"
              readonly
            />
          </div>
        </div>
        <div class="Row Content" v-if="displayStocks">
          <div class="Label">Stocks</div>
          <div class="Input">
            <currency-input
              v-model="premiumStock"
              :options="currencyOptions"
              :suffix="currentCurrency.key"
              readonly
            />
          </div>
        </div>

        <!--TOTAL-->
        <div class="Row TotalContent">
          <div class="Label">Total</div>
          <div class="TotalText">{{ premiumTotalInsured }}</div>
        </div>
      </div>

      <!--
		-------------------------------------
			CUARTA COLUMNA - USD
		-------------------------------------
		-->
      <div class="Col">
        <!--TITULO-->
        <div class="Row Title">USD</div>

        <!--CONTENIDO-->
        <div class="Row Content">
          <div class="Label">Property Damage</div>
          <div class="Input">
            <currency-input
              v-model="premiumPropertyDamageUsd"
              :options="currencyOptions"
              readonly
              suffix="USD"
            />
          </div>
        </div>
        <div class="Row Content">
          <div class="Label" v-if="isPro">BI</div>
          <div class="Label" v-if="!isPro">ALOP</div>
          <div class="Input">
            <currency-input
              v-model="premiumBusinessInterruptionUsd"
              :options="currencyOptions"
              readonly
              suffix="USD"
            />
          </div>
        </div>
        <div class="Row Content" v-if="displayStocks">
          <div class="Label">Stocks</div>
          <div class="Input">
            <currency-input
              v-model="premiumStockUsd"
              :options="currencyOptions"
              readonly
              suffix="USD"
            />
          </div>
        </div>

        <!--TOTAL-->
        <div class="Row TotalContent">
          <div class="Label">Total</div>
          <div class="TotalText">{{ premiumTotalUsd }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
/* validations */
import { validationMixin } from "vuelidate";
import { required, requiredIf } from "vuelidate/lib/validators";
import { Percentage } from "@/constants/validations";
import { formValidations } from "@/mixins/formValidations";
/* components */
import CurrencyInput from "@/components/CurrencyInput/CurrencyInput.vue";
import ButtonActiveModalRate from "@/components/Rate/ButtonActiveModalRate.vue";
/* lodash */
import { debounce } from "lodash";
/* libs */
import Decimal from "decimal.js";

export default {
  name: "Premium",
  mixins: [formValidations, validationMixin],
  components: {
    CurrencyInput,
    ButtonActiveModalRate,
  },
  data() {
    return {
      currencyOptions: {
        currency: "MXN",
        currencyDisplay: "narrowSymbol",
        locale: "en-US",
      },
      isOptional: true,
      formatter: new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }),
    };
  },
  computed: {
    ...mapGetters([
      "quotation",
      "tiv",
      "premium",
      "accountInformation",
      "currencies",
      "rates",
      "tarifarNonCatRate",
      "risk_type",
    ]),
    // displays
    displayStocks() {
      if (this.propEng) return true;
      return false;
    },
    // type of risk
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
      return this.selectedRisk.key || "";
    },
    propEng() {
      const valid = ["PRO", "CPE", "CECR"];
      if (valid.includes(this.selectedRiskKey)) return true;
      return false;
    },
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
    premiumPropertyDamage: {
      set(newValue) {
        return newValue;
      },
      get() {
        const propertyDamageRate =
          typeof this.premium.propertyDamageRate === "string"
            ? parseFloat(this.premium.propertyDamageRate.replace("$", ""))
            : this.premium.propertyDamageRate || 0;

        const op = Decimal.mul(
          this.tiv.propertyDamage || 0,
          propertyDamageRate || 0
        ).div(1000);

        return op;
      },
    },
    premiumPropertyDamageUsd: {
      set(newValue) {
        return newValue;
      },
      get() {
        const propertyDamageRate =
          typeof this.premium.propertyDamageRate === "string"
            ? parseFloat(this.premium.propertyDamageRate.replace("$", ""))
            : this.premium.propertyDamageRate || 0;

        const op = Decimal.mul(
          this.tiv.propertyDamageUsd || 0,
          propertyDamageRate || 0
        ).div(1000);

        return op.toNumber() === Infinity ? 0 : op;
      },
    },
    premiumBusinessInterruption: {
      set(newValue) {
        return newValue;
      },
      get() {
        const op = Decimal.mul(
          this.tiv.businessInterruption || 0,
          this.premium.businessInterruptionRate || 0
        ).div(1000);

        return op;
      },
    },
    premiumBusinessInterruptionUsd: {
      set(newValue) {
        return newValue;
      },
      get() {
        const op = Decimal.mul(
          this.tiv.businessInterruptionUsd || 0,
          this.premium.businessInterruptionRate || 0
        ).div(1000);

        return op.toNumber() === Infinity ? 0 : op;
      },
    },
    premiumStock: {
      set(newValue) {
        return newValue;
      },
      get() {
        const stock = this.tiv.stock != null ? this.tiv.stock : 0;
        const porcentaje =
          this.tiv.porcentaje != null ? this.tiv.porcentaje : 0;
        /*const op = Decimal.mul( stock , porcentaje)
          .div(100)
          .mul(this.premium.stockRate || 0)
          .div(1000);*/

        const op = Decimal.mul(stock, this.premium.stockRate || 0).div(1000);

        return op;
      },
    },

    premiumStockUsd: {
      set(newValue) {
        return newValue;
      },
      get() {
        const op = Decimal.mul(
          this.tiv.stockUsd || 0,
          this.premium.stockRate || 0
        ).div(1000);

        return op;
      },
    },
    premiumTotalInsured: {
      set(newValue) {
        return newValue;
      },
      get() {
        const values = [
          this.premiumPropertyDamage || 0,
          this.premiumBusinessInterruption || 0,
          this.premiumStock || 0,
        ];

        if (!this.propEng) values.pop();

        const op = Decimal.sum(...values);
        return this.formatter.format(op);
      },
    },
    premiumTotalUsd: {
      set(newValue) {
        return newValue;
      },
      get() {
        const values = [
          this.premiumPropertyDamageUsd || 0,
          this.premiumBusinessInterruptionUsd || 0,
          this.premiumStockUsd || 0,
        ];

        if (!this.propEng) values.pop();

        const op = Decimal.sum(...values);
        return op.toNumber() === Infinity || isNaN(op.toNumber())
          ? this.formatter.format(0)
          : this.formatter.format(op);
      },
    },
  },
  watch: {
    premiumPropertyDamage(newVal, oldVal) {
      if (newVal != oldVal) {
        this.$v.premium.propertyDamage.$model = newVal;
        this.checkPremium("propertyDamage");
      }
    },
    premiumPropertyDamageUsd(newVal, oldVal) {
      if (newVal != oldVal) {
        this.$v.premium.propertyDamageUsd.$model = newVal;
        this.checkPremium("propertyDamageUsd");
      }
    },
    premiumBusinessInterruption(newVal, oldVal) {
      if (newVal != oldVal) {
        this.$v.premium.businessInterruption.$model = newVal;
        this.checkPremium("businessInterruption");
      }
    },
    premiumBusinessInterruptionUsd(newVal, oldVal) {
      if (newVal != oldVal) {
        this.$v.premium.businessInterruptionUsd.$model = newVal;
        this.checkPremium("businessInterruptionUsd");
      }
    },
    premiumStock(newVal, oldVal) {
      if (newVal != oldVal) {
        this.$v.premium.stock.$model = newVal;
        this.checkPremium("stock");
      }
    },
    premiumStockUsd(newVal, oldVal) {
      if (newVal != oldVal) {
        this.$v.premium.stockUsd.$model = newVal;

        // this.setStatePremium({
        //   key: 'stockUsd',
        //   value: newVal
        // });

        this.checkPremium("stockUsd");
      }
    },
    "tiv.porcentaje": debounce(function (val) {
      const op = Decimal.mul(
        this.premium.propertyDamageRate || 0,
        val || 0
      ).div(100);
      this.premium.stockRate = op;
      this.checkPremium("stockRate");
      return op;
    }),
    stockRate(newVal, oldVal) {
      if (newVal != oldVal) {
        this.$v.premium.stockRate.$model = newVal;
        this.checkPremium("stockRate");
      }
    },
    premiumTotalInsured(newVal, oldVal) {
      if (newVal != oldVal) {
        this.$v.premium.totalInsured.$model = newVal;
        this.checkPremium("totalInsured");
      }
    },
    premiumTotalUsd(newVal, oldVal) {
      if (newVal != oldVal) {
        this.$v.premium.totalUsd.$model = newVal;
        this.checkPremium("totalUsd");
      }
    },
    "rates.nonCatFinalRate": function () {
      if (
        this.accountInformation.typeOfRisk === 1 ||
        this.accountInformation.typeOfRisk === 2
      ) {
        const result = new Decimal(this.tarifarNonCatRate.finalRate || 0).add(
          this.rates.nonCatFinalRate
        );
        if (result.lessThan(1) && result.greaterThan(-1))
          return result.toFixed(5);
        this.premium.propertyDamageRate = result.toFixed(2);
      } else if (
        this.accountInformation.typeOfRisk === 3 ||
        this.accountInformation.typeOfRisk === 5 ||
        this.accountInformation.typeOfRisk === 4
      ) {
        this.premium.propertyDamageRate = this.formatter.format(
          this.rates.nonCatFinalRate
        );
      }
    },
    "premium.propertyDamageRate": debounce(function (value) {
      this.setStatePremium({
        key: "propertyDamageRate",
        value,
      });
      this.checkPremium("propertyDamageRate");
    }, 1200),
    "premium.businessInterruptionRate": debounce(function (value) {
      this.setStatePremium({
        key: "businessInterruptionRate",
        value,
      });
      this.checkPremium("businessInterruptionRate");
    }, 1200),
    "premium.stockRate": debounce(function (value) {
      this.setStatePremium({
        key: "stockRate",
        value,
      });
      this.checkPremium("stockRate");
    }, 1200),
  },
  validations: {
    premium: {
      propertyDamage: { required },
      businessInterruption: { required },
      stock: {
        required: requiredIf(function () {
          return this.displayStocks;
        }),
      },
      propertyDamageRate: { required, Percentage },
      businessInterruptionRate: { required, Percentage },
      stockRate: {
        required: requiredIf(function () {
          return this.displayStocks;
        }),
        Percentage,
      },
      totalInsured: { required },
      totalUsd: {
        required: requiredIf(function () {
          return !this.isOptional;
        }),
      },
      propertyDamageUsd: {
        required: requiredIf(function () {
          return !this.isOptional;
        }),
      },
      businessInterruptionUsd: {
        required: requiredIf(function () {
          return !this.isOptional;
        }),
      },
      stockUsd: {
        required: requiredIf(function () {
          return !this.isOptional;
        }),
      },
    },
  },
  methods: {
    ...mapMutations(["setStatePremium"]),
    ...mapActions(["saveQuotationColumn"]),
    async checkPremium(column) {
      this.$v.premium[column].$touch();
      if (this.$v.premium[column].$invalid || this.$v.premium[column].$error)
        return;
      await this.saveQuotationColumn({
        table: "premium",
        parent: "premium",
        column,
      });
    },
  },
};
</script>
<style lang="less" scoped>
@weightTitle: 600;
@sizeTitle: 20px;
@sizeTitleMovil: 14px;
.flexCenter {
  display: flex;
  justify-content: center;
  align-items: center;
}
.ExchangeCalcCont {
  width: 100%;
  height: auto;

  //TITULO DEL COMPONENTE
  .TitleComponent {
    width: 100%;
    height: 60px;
    margin-top: 15px;
    h5 {
      font-size: 20px;
      color: black;
      font-weight: 600;
      text-transform: capitalize;
    }
  }

  //TABLA
  .Table {
    .flexCenter();
    width: 100%;
    height: auto;
    flex-wrap: wrap;
    /*
		LABELS EN DESKTOP
		*/
    .Col {
      margin-right: 10px;
      .flexCenter();
      width: 18%;
      height: auto;
      align-items: flex-start;
      flex-wrap: wrap;

      .Row {
        .flexCenter();
        width: 100%;
        height: 45px;

        //INPUTS
        .Input {
          width: 100%;
        }
        //LABEL MOVIL
        .Label {
          display: none;
        }
      }

      //TITULO DE LA COLUMNA
      .Title {
        height: 40px;
        justify-content: center;
        text-align: center;
        font-weight: @weightTitle;
        font-size: @sizeTitle;
        @media (max-width: 650px) {
          font-size: @sizeTitleMovil;
        }
      }
      //LABEL
      .Label {
        padding-right: 10px;
        color: #547fa9;
        justify-content: flex-end;
        text-align: right;
        font-size: 15px;
      }
      //TOTAL
      .Total {
        font-weight: 600;
        padding-right: 10px;
        font-size: 15px;
        color: #547fa9;
        justify-content: flex-end;
        margin-top: 15px;
      }

      //TOTAL TEXT
      .TotalContent {
        justify-content: flex-start !important;
        font-weight: 600;
        margin-top: 15px;
      }

      //CONTENIDO
      .Content {
        justify-content: flex-start;
      }
    }
  }
}

@media (max-width: 650px) {
  .ExchangeCalcCont {
    .Table {
      .Col {
        margin-right: 0px;
        width: 100%;
        .Row {
          .Label {
            display: flex !important;
            width: 45%;
          }
          //INPUTS
          .Input {
            width: 55%;
          }
        }
        .Label {
          font-size: 12px;
        }
        .TotalContent {
          justify-content: flex-end;
          .TotalText {
            width: 55%;
            font-size: 16px;
          }
        }
      }
    }
    //OCULTAR LABELS
    .LabelsCol {
      display: none !important;
    }
  }
}
</style>
