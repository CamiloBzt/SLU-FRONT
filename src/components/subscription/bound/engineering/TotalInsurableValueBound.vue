<template>
  <div class="Cont d-flex justify-center align-start flex-wrap">
    <div class="TitleCont d-flex justify-start align-center">
      <h5>Total insurable value</h5>
    </div>

    <!--TABLA-->
    <div class="Table d-flex flex-wrap align-start justify-center">
      <!--
    		Cabecera
    	-->
      <div class="Head d-flex justify-space-between align-center">
        <div class="Label" />
        <div class="Row Bold">Original Currency</div>
        <div class="Row Bold">USD</div>
        <div class="MiniRow Bold">Rate</div>
        <div class="Row Bold">Premium</div>
        <div class="Row Bold">Premium USD</div>
      </div>

      <!-- Valores All Risk-->
      <div class="Line mt-3">
        <div class="Label">All Risks</div>

        <div class="Row">
          <currency-input
            placeholder="-"
            :options="currencyOptions"
            v-model.trim="tiv.propertyDamage"
            disabled
          />
        </div>
        <div class="Row">
          <currency-input
            placeholder="-"
            :options="currencyOptions"
            v-model.trim="tiv.propertyDamageUsd"
            disabled
          />
        </div>
        <div class="MiniRow">
          <v-text-field
            v-model.trim="allRiskRate"
            type="number"
            suffix="%"
            disabled
          />
        </div>
        <div class="Row">
          <currency-input
            :options="currencyOptions"
            v-model="allRiskPremium"
            disabled
          />
        </div>
        <div class="Row">
          <currency-input
            :options="currencyOptions"
            v-model.trim="allRiskPremiumUsd"
            disabled
          />
        </div>
      </div>

      <!--Valores de  ALOP-->
      <div class="Line mt-2">
        <div class="Label">ALOP</div>

        <div class="Row">
          <currency-input
            :options="currencyOptions"
            v-model="alopCurrency"
            @input="setModel('alopCurrency', alopCurrency)"
            @blur="
              SET_BOUND_INSURABLE({
                key: 'alopCurrency',
                value: alopCurrency,
              });
              checkField('alopCurrency');
            "
            disabled
          />
        </div>
        <div class="Row">
          <currency-input
            :options="currencyOptions"
            v-model.trim="alopCurrencyUsd"
            @input="setModel('alopCurrencyUsd', alopCurrencyUsd)"
            disabled
          />
        </div>
        <div class="MiniRow">
          <v-text-field
            v-model.trim="alopCurrencyRate"
            type="number"
            suffix="%"
            @input="setModel('alopCurrencyRate', alopCurrencyRate)"
            @blur="
              SET_BOUND_INSURABLE({
                key: 'alopCurrencyRate',
                value: alopCurrencyRate,
              });
              checkField('alopCurrencyRate');
            "
            disabled
          />
        </div>
        <div class="Row">
          <currency-input
            :options="currencyOptions"
            v-model.trim="alopCurrencyNd"
            @input="setModel('alopCurrencyNd', alopCurrencyNd)"
            disabled
          />
        </div>
        <div class="Row">
          <currency-input
            :options="currencyOptions"
            v-model.trim="alopCurrencyPremium"
            @input="setModel('alopCurrencyPremium', alopCurrencyPremium)"
            disabled
          />
        </div>
      </div>

      <!--Total-->
      <div class="TotalLine mt-3">
        <div class="Label Bold">Total</div>
        <div class="Row Bold">{{ formatNumber(totalCurrency) }}</div>
        <div class="Row Bold">{{ formatNumber(totalCurrencyUsd) }}</div>
        <div class="MiniRow Bold">{{ formatNumber(totalRate) }}</div>
        <div class="Row Bold">{{ formatNumber(totalNd) }}</div>
        <div class="Row Bold">{{ formatNumber(totalPremium) }}</div>
      </div>
    </div>

    <!--INPUTS-->
    <div class="InputsCont d-flex flex-wrap justify-start">
      <div class="MiniInputCont">
        <currency-input
          label="Limit Insured (OG. Currency)"
          v-model="toBeDefined.limitedInsured"
          :options="currencyOptions"
          disabled
        />
      </div>
      <div class="InputCont">
        <currency-input
          label="Limit Insured (USD)"
          :options="currencyOptions"
          v-model="toBeDefined.limitedInsuredUsd"
          disabled
        />
      </div>
      <div class="InputCont">
        <v-select
          v-model.trim="typeSelect"
          @change="changeCoverage(typeSelect)"
          label="Type Of Coverage"
          :items="typeCoverage"
          item-text="data"
          item-value="id"
          :loading="typeCoverage.length === 0"
          disabled
        ></v-select>
      </div>
      <div v-if="showAttachment" class="InputCont">
        <v-text-field label="Attachment point (USD)" />
      </div>
      <div class="MiniInputCont">
        <v-text-field
          suffix="%"
          label="SLU Line"
          v-model.trim="sluLine"
          @input="setModel('sluLine', sluLine)"
          @blur="
            SET_BOUND_INSURABLE({
              key: 'sluLine',
              value: sluLine,
            });
            checkField('sluLine');
          "
          disabled
        />
      </div>
      <div class="InputCont">
        <currency-input
          :options="currencyOptions"
          label="SLU Exposure"
          v-model="sluExposure"
          disabled
        />
      </div>
      <div class="InputCont">
        <currency-input
          :options="currencyOptions"
          label="SLU Premium"
          v-model="sluPremium"
          disabled
        />
      </div>

      <div class="MiniInputCont">
        <v-text-field label="PML" type="number" v-model.trim="pml" suffix="%" />
      </div>
      <div class="InputCont">
        <currency-input :options="currencyOptions" :value="pmlAuto" disabled />
      </div>
    </div>

    <!--COMENTARIOS-->
    <div class="CommentsCont">
      <div class="OfferTitle">Offer Comments</div>
      <textarea
        class="OfferText"
        v-model.trim="comments"
        @input="setModel('comments', comments)"
        @blur="
          SET_BOUND_INSURABLE({
            key: 'comments',
            value: comments,
          });
          checkField('comments');
        "
      >
      </textarea>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
/* components */
import CurrencyInput from "@/components/CurrencyInput/CurrencyInput.vue";
/* validations */
import { required } from "vuelidate/lib/validators";
import { formValidations } from "@/mixins/formValidations";

import Decimal from "decimal.js";
import numeral from "numeral";
/* lodash */
import { debounce } from "lodash";

function safeDecimal(value) {
  try {
    return new Decimal(value ?? 0);
  } catch {
    return new Decimal(0);
  }
}

export default {
  name: "TotalInsurableValueBound",
  mixins: [formValidations],
  components: { CurrencyInput },
  data() {
    return {
      rate: "",
      nd: null,
      premiumTiv: null,
      alopCurrency: 0,
      alopCurrencyUsd: null,
      alopCurrencyRate: "",
      alopCurrencyNd: null,
      alopCurrencyPremium: null,
      sluLine: "",
      showAttachment: false,
      comments: "",
      currencyOptions: {
        currency: "MXN",
        currencyDisplay: "narrowSymbol",
        locale: "en-US",
      },
      formatter: new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }),
      sluExposure: 0,
    };
  },
  async beforeMount() {
    await this.getCatalogByName({ name: "type_coverages" });

    this.rate = this.boundInsurable.rate || "";
    this.alopCurrency = this.tiv.businessInterruption;
    this.alopCurrencyRate = this.premium.businessInterruptionRate;

    this.sluLine = this.toBeDefined.sluShare;
    this.SET_BOUND_INSURABLE({
      key: "sluLine",
      value: this.sluLine,
    });
    this.checkField("sluLine");
    this.comments = this.boundInsurable.comments;
    this.sluExposure = this.toBeDefined.limitSluUsd
      ? Number(this.toBeDefined.limitSluUsd.replace(/[^0-9.-]+/g, ""))
      : 0;
    this.SET_BOUND_INSURABLE({
      key: "sluExposure",
      value: parseFloat(this.sluExposure),
    });
    this.checkField("sluExposure");

    this.calculateUSD();
  },
  computed: {
    ...mapGetters([
      "tiv",
      "quotation",
      "availableBrokers",
      "availableCedents",
      "activities",
      "activitiesById",
      "operatingEng",
      "boundEng",
      "typeCoverage",
      "toBeDefined",
      "boundInsurable",
      "subscription_id",
      "layersArray",
      "accountInformation",
      "risk_type",
      "premium",
    ]),
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
    typeSelect() {
      const valids = [2, "2"];
      if (this.propEng && valids.includes(this.quotation.typeQuotation)) {
        return 1;
      }
      return 2;
    },
    allRiskRate() {
      return numeral(
        (`${this.premium.propertyDamageRate}` || "$0").replace(/[^0-9.]/g, "")
      ).value();
    },
    allRiskPremium: {
      get() {
        return numeral(
          (`${this.premium.propertyDamage}` || "$0").replace(/[^0-9.]/g, "")
        ).value();
      },
      set() {
        return numeral(
          (`${this.premium.propertyDamage}` || "$0").replace(/[^0-9.]/g, "")
        ).value();
      },
    },
    allRiskPremiumUsd: {
      get() {
        return numeral(
          (`${this.premium.propertyDamageUsd}` || "$0").replace(/[^0-9.]/g, "")
        ).value();
      },
      set() {
        return numeral(
          (`${this.premium.propertyDamageUsd}` || "$0").replace(/[^0-9.]/g, "")
        ).value();
      },
    },
    // calculos
    totalCurrency() {
      return safeDecimal(this.tiv?.propertyDamage)
        .add(safeDecimal(this.alopCurrency))
        .toSignificantDigits(4);
    },
    totalCurrencyUsd() {
      return safeDecimal(this.tiv?.propertyDamageUsd)
        .add(safeDecimal(this.alopCurrencyUsd))
        .toSignificantDigits(4);
    },
    totalRate() {
      return safeDecimal(this.premium?.businessInterruptionRate)
        .add(safeDecimal(this.premium?.propertyDamageRate))
        .toDecimalPlaces(2);
    },
    totalNd() {
      return safeDecimal(this.allRiskPremium)
        .add(safeDecimal(this.alopCurrencyNd))
        .toSignificantDigits(4);
    },
    totalPremium() {
      return safeDecimal(this.allRiskPremiumUsd)
        .add(safeDecimal(this.alopCurrencyPremium))
        .toSignificantDigits(4);
    },
    sluPremium: {
      get() {
        const value =
          numeral(
            (`${this.toBeDefined.premiumSluUsd}` || "$0").replace(
              /[^0-9.]/g,
              ""
            )
          ).value() || 0;
        this.SET_BOUND_INSURABLE({
          key: "sluPremium",
          value: parseFloat(value),
        });
        this.checkField("sluPremium");
        return value;
      },
      set() {},
    },
    pmlAuto() {
      const limitedInsuredUsd = this.toBeDefined.limitedInsuredUsd || 0;

      return (limitedInsuredUsd * (this.pml / 100)).toFixed(2);
    },
    pml: {
      get() {
        return this.boundInsurable.pml || 0;
      },
      set(value) {
        this.boundInsurable.pml = parseFloat(value);
        this.SET_BOUND_INSURABLE({
          key: "pml",
          value: parseFloat(value),
        });
        this.checkField("pml");
      },
    },
    resultPml: {
      get() {
        const result = Decimal(this.pml ? this.pml : 0).add(
          this.alopCurrencyUsd ? this.alopCurrencyUsd : 0
        );
        const op = Decimal(numeral(this.tiv.totalUsd).value() || 0).mul(result);
        return op;
      },
      set() {},
    },
    originalLimitedInsured: {
      get() {
        const data = this.layersArray.find((v) => v.checked);
        if (!data) return 0;
        return data.limit;
      },
      set() {},
    },
    isNonProportional() {
      const valids = [2, "2"];
      if (valids.includes(this.quotation.typeQuotation)) {
        return true;
      }
      return false;
    },
  },
  watch: {
    rate: function () {
      this.calcs();
    },
    alopCurrency: function () {
      this.calcs();
    },
    alopCurrencyRate: function () {
      this.calcs();
    },
    "toBeDefined.limitedInsured": function () {
      this.calculateUSD();
    },
    totalNd(newVal) {
      this.$v.boundInsurable.totalNd.$model = newVal.toNumber();

      this.SET_BOUND_INSURABLE({
        key: "totalNd",
        value: newVal.toNumber(),
      });

      this.checkField("totalNd");
    },
    totalPremium(newVal) {
      this.$v.boundInsurable.totalPremium.$model = newVal.toNumber();

      this.SET_BOUND_INSURABLE({
        key: "totalPremium",
        value: newVal.toNumber(),
      });

      this.checkField("totalPremium");
    },
    totalRate(newVal) {
      this.$v.boundInsurable.totalRate.$model = newVal.toNumber();

      this.SET_BOUND_INSURABLE({
        key: "totalRate",
        value: newVal.toNumber(),
      });

      this.checkField("totalRate");
    },
    nd(newVal) {
      this.$v.boundInsurable.nd.$model = newVal;

      this.SET_BOUND_INSURABLE({
        ke: "nd",
        value: newVal,
      });

      this.checkField("nd");
    },
    premiumTiv(newVal) {
      this.$v.boundInsurable.premiumTiv.$model = newVal;

      this.SET_BOUND_INSURABLE({
        key: "premiumTiv",
        value: newVal,
      });

      this.checkField("premiumTiv");
    },
    alopCurrencyUsd(newVal) {
      this.$v.boundInsurable.alopCurrencyUsd.$model = newVal;

      this.SET_BOUND_INSURABLE({
        key: "alopCurrencyUsd",
        value: newVal,
      });

      this.checkField("alopCurrencyUsd");
    },
    alopCurrencyNd(newVal) {
      this.$v.boundInsurable.alopCurrencyNd.$model = newVal;

      this.SET_BOUND_INSURABLE({
        key: "alopCurrencyNd",
        value: newVal,
      });

      this.checkField("alopCurrencyNd");
    },
    alopCurrencyPremium(newVal) {
      this.$v.boundInsurable.alopCurrencyPremium.$model = newVal;

      this.SET_BOUND_INSURABLE({
        key: "alopCurrencyPremium",
        value: newVal,
      });

      this.checkField("alopCurrencyPremium");
    },
    resultPml(newVal) {
      this.$v.boundInsurable.resultPml.$model = newVal.toNumber();

      // this.SET_BOUND_INSURABLE({
      //   key: 'resultPml',
      //   value: newVal.toNumber()
      // });

      this.checkField("resultPml");
    },

    sluPremium(newVal) {
      this.$v.boundInsurable.sluPremium.$model = parseFloat(newVal);

      this.SET_BOUND_INSURABLE({
        key: "sluPremium",
        value: parseFloat(newVal),
      });

      this.checkField("sluPremium");
    },
    typeSelect(newVal) {
      this.$v.boundInsurable.typeSelect.$model = newVal;

      this.SET_BOUND_INSURABLE({
        key: "typeSelect",
        value: newVal,
      });

      this.checkField("typeSelect");
    },
  },
  methods: {
    ...mapActions(["saveBoundColumn", "getCatalogByName"]),
    ...mapMutations(["SET_BOUND_INSURABLE"]),
    changeCoverage(typeSelect) {
      const valids = [2, "2"];
      if (valids.includes(typeSelect)) this.showAttachment = true;
      else this.showAttachment = false;
    },
    setModel(name, value) {
      this.$v.boundInsurable[name].$model = value;
      this.$v.boundInsurable[name].$touch();
    },
    async checkField(column) {
      this.$v.boundInsurable[column].$touch();
      if (
        this.$v.boundInsurable[column].$invalid ||
        this.$v.boundInsurable[column].$error
      )
        return;
      await this.saveBoundColumn({
        table: "boundInsurable",
        parent: "boundInsurable",
        column,
      });
    },
    calculateUSD() {
      const limit = safeDecimal(
        !this.toBeDefined.limitedInsured ? 0 : this.toBeDefined.limitedInsured
      );
      const exchange = safeDecimal(this.quotation?.exchangeRate || 1);
      this.toBeDefined.limitedInsuredUsd = limit.div(exchange).toNumber();
    },
    calcs() {
      this.nd = safeDecimal(numeral(this.tiv.total).value())
        .mul(this.rate || 0)
        .div(1000);

      this.premiumTiv = safeDecimal(numeral(this.tiv.totalUsd || 0).value())
        .mul(this.rate || 0)
        .div(1000);

      this.alopCurrencyUsd = safeDecimal(this.alopCurrency).div(
        safeDecimal(this.quotation.exchangeRate)
      );

      this.alopCurrencyNd = safeDecimal(this.alopCurrency)
        .mul(this.alopCurrencyRate || 0)
        .div(1000);

      this.alopCurrencyPremium = safeDecimal(this.alopCurrencyUsd)
        .mul(this.alopCurrencyRate || 0)
        .div(1000);
    },
    formatNumber(value) {
      const formatted = this.formatter.format(value);
      return formatted;
    },
  },
  validations: {
    boundInsurable: {
      rate: { required },
      nd: { required },
      premiumTiv: { required },
      alopCurrency: { required },
      alopCurrencyUsd: { required },
      alopCurrencyRate: { required },
      alopCurrencyNd: { required },
      alopCurrencyPremium: { required },
      totalRate: { required },
      totalNd: { required },
      totalPremium: { required },
      typeSelect: { required },
      sluLine: { required },
      sluExposure: { required },
      sluPremium: { required },
      pml: { required },
      resultPml: { required },
      comments: { required },
    },
  },
};
</script>
<style lang="less" scoped>
@import "~@/assets/style/Subscription/Bound.less";
.Cont {
  width: 100%;
  height: auto;
  .TitleCont {
    h5 {
      font-size: 20px;
      font-weight: 600;
    }
  }
  //Tabla
  .Table {
    width: 90%;
    height: auto;

    //Cabecera
    .Head {
      width: 100%;
      height: 70px;
      border-bottom: solid 1px #d2deed;
    }

    //Valores
    .Line {
      .flex();
      justify-content: space-between;
      width: 100%;
      height: auto;

      .Row,
      .MiniRow {
        align-content: flex-end !important;
        align-items: flex-end !important;
      }
    }

    //Total
    .TotalLine {
      .flex();
      justify-content: space-between;
      width: 100%;
      height: 70px;
      border-bottom: solid 1px #d2deed;
      border-top: solid 1px #d2deed;
      .Row,
      .MiniRow {
        justify-content: flex-start;
        text-align: left;
      }
    }

    .Label {
      .flex();
      width: 8%;
      height: 100%;
      justify-content: flex-end;
      text-align: right;
      color: #547fa9;
    }

    .Row {
      .flex();
      width: 18%;
      height: 100%;
    }

    .MiniRow {
      .flex();
      width: 12%;
      height: 100%;
    }
    .Bold {
      font-weight: 600;
    }
  }

  //Inputs
  .InputsCont {
    width: 100%;
    height: auto;
    margin-top: 20px;
    .InputCont {
      width: 17%;
      height: 50px;
      margin-right: 1%;
      margin-top: 10px;
    }
    .MiniInputCont {
      width: 10%;
      height: 50px;
      margin-right: 1%;
      margin-top: 10px;
    }
  }

  //Comentarios
  .CommentsCont {
    width: 100%;
    height: auto;
    margin-top: 40px;

    .OfferTitle {
      width: 100%;
      height: auto;
      font-size: 14px;
      color: #547fa9;
    }
    .OfferText {
      width: 100%;
      height: 90px;
      border: solid 1px #547fa9;
      border-radius: 10px;
      padding: 7px 12px;
    }
    .OfferText:focus {
      outline: none;
    }
  }
}

@media (max-width: 650px) {
  .Cont {
    .InputsCont {
      .InputCont,
      .MiniInputCont {
        width: 100%;
        margin-top: 7px;
      }
    }
  }
}
</style>
