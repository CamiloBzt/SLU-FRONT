<template>
  <div class="ExchangeCalcCont d-flex justify-center flex-wrap align-center">
    <!--TITULO-->
    <div class="TitleComponent d-flex justify-start align-center">
      <h5>Total insurable value</h5>
    </div>

    <div class="ExchangeCont">
      <div class="TableCont">
        <!--Labels-->
        <div class="LabelsColumn">
          <div class="LabelsColumn__TitleSpace" />
          <div class="LabelsColumn__Labels">Property Damage</div>
          <div class="LabelsColumn__Labels" v-if="isPro">BI</div>
          <div class="LabelsColumn__Labels" v-if="!isPro">ALOP</div>
          <div class="LabelsColumn__Labels" v-if="displayStocks">Stocks</div>
        </div>

        <div class="NormalColumn">
          <!--TITULO-->
          <div class="titleCont">Original Currency</div>

          <!--INPUTS-->
          <div class="InputLine">
            <!--LABEL-->
            <div class="inputLabel ShowFlexOnMovil">Property Damage</div>
            <!--INPUT-->
            <div class="inputCont">
              <!-- <v-text-field v-model="tiv.propertyDamage" type="number" prefix="$" @blur="calcule()" text /> -->
              <currency-input
                v-model="tiv.propertyDamage"
                :options="currencyOptions"
                @blur="
                  calcule();
                  setStateTIV('propertyDamage', this);
                  checkInsurableColumn('propertyDamage');
                "
                :suffix="currentCurrency.key"
                :errorMessages="quotationValids('tiv', 'propertyDamage')"
              />
            </div>
          </div>

          <div class="InputLine">
            <!--LABEL-->
            <div class="inputLabel ShowFlexOnMovil" v-if="isPro">BI</div>
            <div class="inputLabel ShowFlexOnMovil" v-if="!isPro">ALOP</div>
            <!--INPUT-->
            <div class="inputCont">
              <!-- <v-text-field v-model="tiv.businessInterruption" type="number" prefix="$" @blur="calcule()" text /> -->
              <currency-input
                v-model="tiv.businessInterruption"
                :options="currencyOptions"
                @blur="
                  calcule();
                  setStateTIV('businessInterruption', this);
                  checkInsurableColumn('businessInterruption');
                "
                :suffix="currentCurrency.key"
                :errorMessages="quotationValids('tiv', 'businessInterruption')"
              />
            </div>
          </div>

          <div class="Stocks" v-if="displayStocks">
            <!--LABEL-->
            <div class="inputLabel ShowFlexOnMovil">Stocks</div>
            <!--INPUT-->
            <div class="InputStocks">
              <div class="inputCont">
                <!-- <v-text-field v-model="tiv.stock" type="number" prefix="$" @blur="calcule()" text /> -->
                <currency-input
                  v-model="stock"
                  :options="currencyOptions"
                  :suffix="currentCurrency.key"
                  :errorMessages="quotationValids('tiv', 'stock')"
                />
              </div>
              <div class="Percentaje">
                <v-text-field
                  v-model="tiv.porcentaje"
                  @blur="
                    setStateTIV('porcentaje', this);
                    checkInsurableColumn('porcentaje');
                  "
                  type="number"
                  suffix="%"
                  :error-messages="quotationValids('tiv', 'porcentaje')"
                  max="100"
                />
              </div>
            </div>
          </div>

          <div class="Total">{{ tivTotal }}</div>
        </div>

        <div class="NormalColumn">
          <!--TITULO-->
          <div class="titleCont">USD</div>

          <!--INPUTS-->
          <div class="InputLine">
            <!--LABEL-->
            <div class="inputLabel ShowFlexOnMovil">Property Damage</div>
            <!--INPUT-->
            <div class="inputCont">
              <!-- <v-text-field v-model="tiv.propertyDamageUsd" type="number" prefix="$" @blur="calcule()" text /> -->
              <currency-input
                v-model="propertyDamageUsd"
                :options="currencyOptions"
                suffix="USD"
                readonly
              />
            </div>
          </div>
          <div class="InputLine">
            <!--LABEL-->
            <div class="inputLabel ShowFlexOnMovil" v-if="isPro">BI</div>
            <div class="inputLabel ShowFlexOnMovil" v-if="!isPro">ALOP</div>
            <!--INPUT-->
            <div class="inputCont">
              <!-- <v-text-field v-model="tiv.businessInterruptionUsd" type="number" prefix="$" @blur="calcule()" text /> -->
              <currency-input
                v-model="businessInterruptionUsd"
                :options="currencyOptions"
                suffix="USD"
                readonly
              />
            </div>
          </div>
          <div class="InputLine" v-if="displayStocks">
            <!--LABEL-->
            <div class="inputLabel ShowFlexOnMovil">Stocks</div>

            <!--INPUT-->
            <div class="inputCont">
              <!-- <v-text-field v-model="tiv.stockUsd" type="number" prefix="$" @blur="calcule()" text /> -->
              <currency-input
                v-model="stockUsd"
                :options="currencyOptions"
                suffix="USD"
                readonly
              />
            </div>
          </div>

          <div class="Total">{{ tivTotalUsd }}</div>
        </div>

        <div class="Separador HideOnMovil" />
      </div>
    </div>

    <div class="ExpansionLineTop mt-3 HideOnMovil"></div>
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
import CurrencyInput from "@/components/CurrencyInput/CurrencyInput.vue";
/* lodash */
import { debounce } from "lodash";
/* libs */
import Decimal from "decimal.js";

export default {
  name: "InsurableValue",
  components: {
    CurrencyInput,
  },
  mixins: [formValidations, validationMixin],
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
      "currencies",
      "accountInformation",
      "risk_type",
      "premium",
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
    // currency
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
    tivTotal: {
      get() {
        const values = [
          this.tiv.propertyDamage || 0,
          this.tiv.businessInterruption || 0,
          this.tiv.stock || 0,
        ];

        if (!this.propEng) values.pop();

        const op = Decimal.sum(...values);

        const result = this.formatter.format(op);
        return result;
      },
    },
    tivTotalUsd: {
      get() {
        const values = [
          this.tiv.propertyDamageUsd || 0,
          this.tiv.businessInterruptionUsd || 0,
          this.tiv.stockUsd || 0,
        ];

        if (!this.propEng) values.pop();

        const op = Decimal.sum(...values);

        const result =
          op.toNumber() === Infinity || isNaN(op.toNumber())
            ? this.formatter.format(0)
            : this.formatter.format(op);
        return result;
      },
    },
    propertyDamageUsd: {
      get() {
        const op = Decimal.div(
          this.tiv.propertyDamage || 0,
          this.quotation.exchangeRate || 0
        );

        return op.toNumber() === Infinity ? 0 : op;
      },
      async set(value) {
        this.$v.tiv.propertyDamageUsd.$model = value;
        this.setStateTIV("propertyDamageUsd", value);
        this.$v.tiv.propertyDamageUsd.$touch();
      },
    },
    businessInterruptionUsd: {
      get() {
        const op = Decimal.div(
          this.tiv.businessInterruption || 0,
          this.quotation.exchangeRate || 0
        );

        return op.toNumber() === Infinity ? 0 : op;
      },
      set(value) {
        this.$v.tiv.businessInterruptionUsd.$model = value;
        this.setStateTIV("businessInterruptionUsd", value);
        this.$v.tiv.businessInterruptionUsd.$touch();
      },
    },
    stock: {
      get() {
        return this.tiv.stock;
      },
      set(value) {
        this.tiv.stock = value;
      },
    },
    stockUsd: {
      get() {
        if (!this.propEng) return new Decimal(0);

        const op = Decimal.div(
          this.tiv.stock || 0,
          this.quotation.exchangeRate || 0
        );

        return op.toNumber() === Infinity ? 0 : op;
      },
      set(value) {
        this.$v.tiv.stockUsd.$model = value;
        this.setStateTIV("stockUsd", value);
        this.$v.tiv.stockUsd.$touch();
      },
    },
  },
  watch: {
    "$store.state.quotation.exchangeRate": function () {
      this.calcule();
    },
    "tiv.propertyDamageUsd": debounce(function (val) {
      this.$v.tiv.propertyDamageUsd.$model = val;
      this.setStateTIV("propertyDamageUsd", val);
      this.checkInsurableColumn("propertyDamageUsd");
    }, 1000),
    propertyDamageUsd: debounce(function (val) {
      this.$v.tiv.propertyDamageUsd.$model = val;
      this.setStateTIV("propertyDamageUsd", val);
      this.checkInsurableColumn("propertyDamageUsd");
    }, 1000),
    "tiv.businessInterruptionUsd": debounce(function (val) {
      this.$v.tiv.businessInterruptionUsd.$model = val;
      this.setStateTIV("businessInterruptionUsd", val);
      this.checkInsurableColumn("businessInterruptionUsd");
    }, 1000),
    businessInterruptionUsd: debounce(function (val) {
      this.$v.tiv.businessInterruptionUsd.$model = val;
      this.setStateTIV("businessInterruptionUsd", val);
      this.checkInsurableColumn("businessInterruptionUsd");
    }, 1000),
    "tiv.stock": debounce(function (val) {
      this.calcule();
      this.$v.tiv.stock.$model = val;
      this.setStateTIV("stock", val);
      this.checkInsurableColumn("stock");
    }, 1000),
    stock: debounce(function (val) {
      this.calcule();
      this.$v.tiv.stock.$model = val;
      this.setStateTIV("stock", val);
      this.checkInsurableColumn("stock");
    }, 1000),
    "tiv.stockUsd": debounce(function (val) {
      this.$v.tiv.stockUsd.$model = val;
      this.setStateTIV("stockUsd", val);
      this.checkInsurableColumn("stockUsd");
    }, 1000),
    stockUsd: debounce(function (val) {
      this.$v.tiv.stockUsd.$model = val;
      this.setStateTIV("stockUsd", val);
      this.checkInsurableColumn("stockUsd");
    }, 1000),
    "tiv.total": debounce(function (val) {
      this.$v.tiv.total.$model = val;
      this.setStateTIV("total", val);
      this.checkInsurableColumn("total");
    }, 1000),
    tivTotal: debounce(function (val) {
      this.$v.tiv.total.$model = val;
      this.setStateTIV("total", val);
      this.checkInsurableColumn("total");
    }, 1000),
    "tiv.totalUsd": debounce(function (val) {
      this.$v.tiv.totalUsd.$model = val;
      this.setStateTIV("totalUsd", val);
      this.checkInsurableColumn("totalUsd");
    }, 1000),
    tivTotalUsd: debounce(function (val) {
      this.$v.tiv.totalUsd.$model = val;
      this.setStateTIV("totalUsd", val);
      this.checkInsurableColumn("totalUsd");
    }, 1000),
  },
  methods: {
    ...mapMutations(["setStateTIV"]),
    ...mapActions(["saveQuotationColumn"]),
    calcule() {
      this.tiv.propertyDamageUsd = Decimal.div(
        this.tiv.propertyDamage || 0,
        this.quotation.exchangeRate || 0
      );
      this.tiv.businessInterruptionUsd = Decimal.div(
        this.tiv.businessInterruption || 0,
        this.quotation.exchangeRate || 0
      );
      if (!this.propEng)
        this.tiv.stockUsd = Decimal.div(
          this.tiv.stock || 0,
          this.quotation.exchangeRate || 0
        );
    },
    async checkInsurableColumn(column) {
      this.$v.tiv[column].$touch();
      if (this.$v.tiv[column].$invalid) return;
      await this.saveQuotationColumn({
        table: "insurable",
        parent: "tiv",
        column,
      });
    },
  },
  validations: {
    tiv: {
      total: { required },
      stock: {
        required: requiredIf(function () {
          return this.displayStocks;
        }),
        DigitsAndDecimals,
      },
      propertyDamage: { required, DigitsAndDecimals },
      businessInterruption: { required, DigitsAndDecimals },
      porcentaje: {
        required: requiredIf(function () {
          return this.displayStocks;
        }),
        DigitsAndDecimals,
        Percentage,
      },
      totalUsd: { required },
      propertyDamageUsd: { required },
      businessInterruptionUsd: { required },
      stockUsd: {
        required: requiredIf(function () {
          return this.displayStocks;
        }),
      },
    },
  },
};
</script>
<style lang="less" scoped>
@inputLarge: 250px;
@InputHeightMovil: 70px;
@weightTitle: 600;
.FlexCenter {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.ExchangeCalcCont {
  width: 100%;
  height: auto;

  //TITULO DEL COMPONENTE
  .TitleComponent {
    width: 100%;
    height: 50px;
    h5 {
      font-size: 20px;
      font-weight: 600;
      text-transform: capitalize;
      color: black;
      @media (max-width: 650px) {
        font-size: 14px;
      }
    }
  }

  .ExchangeCont {
    width: 100%;
    height: auto;
    display: flex;
    justify-content: center;
    align-content: flex-start;
    flex-wrap: wrap;

    .TableCont {
      .FlexCenter();
      width: auto;
      height: auto;
      justify-content: center;
      align-content: flex-start;
      align-items: flex-start;
      gap: 25px;
      position: relative;
      flex-wrap: wrap;
      padding-right: 100px;
      @media (max-width: 650px) {
        padding-right: 0px;
      }

      //Labels
      .LabelsColumn {
        width: 155px;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: flex-start;
        align-content: flex-start;
        flex-wrap: wrap;
        @media (max-width: 650px) {
          display: none;
        }
        //Labels
        &__Labels {
          .FlexCenter();
          width: 100%;
          height: 55px;
          justify-content: flex-end;
          text-align: right;
          color: #547fa9;
        }
        &__TitleSpace {
          width: 100%;
          height: 60px;
        }
      }

      //COLUMNA IZQUIERDA
      .NormalColumn {
        width: @inputLarge;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: flex-start;
        align-content: flex-start;
        flex-wrap: wrap;
        @media (max-width: 650px) {
          width: 100%;
          height: auto;
        }

        //TITULO
        .titleCont {
          .FlexCenter();
          width: 100%;
          height: 60px;
          color: black;
          font-size: 20px;
          font-weight: 600;
          text-align: center;
          justify-content: center;
          @media (max-width: 650px) {
            font-size: 14px;
          }
        }

        //INPUTS
        .InputLine {
          .FlexCenter();
          width: 100%;
          height: 55px;
          @media (max-width: 650px) {
            justify-content: flex-end;
          }

          .inputCont {
            .FlexCenter();
            width: 100%;
            height: 50px;
            @media (max-width: 650px) {
              width: 55%;
            }
          }
          .inputLabel {
            width: 45%;
            color: #547fa9;
            padding-right: 10px;
            @media (max-width: 650px) {
              font-size: 12px;
              text-align: right;
              justify-content: flex-end;
            }
          }
        }

        //Stocks
        .Stocks {
          .FlexCenter();
          width: 100%;
          height: 55px;
          @media (max-width: 650px) {
            justify-content: flex-end;
          }

          //Label
          .inputLabel {
            width: 45%;
            color: #547fa9;
            padding-right: 10px;
            @media (max-width: 650px) {
              font-size: 12px;
              text-align: right;
              justify-content: flex-end;
            }
          }

          //Input
          .InputStocks {
            .FlexCenter();
            width: 100%;
            height: 100%;
            @media (max-width: 650px) {
              width: 55%;
            }
            //INPUT
            .inputCont {
              .FlexCenter();
              width: calc(@inputLarge - 60px);
              height: 100%;
              overflow: hidden;
            }

            //PORCENTAJE
            .Percentaje {
              .FlexCenter();
              width: 50px;
              height: 100%;
              overflow: hidden;
              margin-left: 10px;
            }
          }
        }

        //TOTAL
        .Total {
          .FlexCenter();
          width: 100%;
          height: 70px;
          font-weight: bold;

          .TotalLabel {
            color: #547fa9;
            justify-content: flex-end;
            align-items: center;
            width: 30%;
            height: 100%;
            padding-right: 7px;
          }
          .TotalData {
            .FlexCenter();
            width: @inputLarge;
            height: 100%;
          }
        }
      }

      //Separador
      .Separador {
        position: absolute;
        width: 100%;
        height: 1px;
        background: #a8bfd9;
        bottom: 70px;
      }
    }
  }
}
</style>
