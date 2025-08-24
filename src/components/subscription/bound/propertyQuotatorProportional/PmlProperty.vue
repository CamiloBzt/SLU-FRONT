<template>
  <div class="Cont flex flex-wrap justify-center align-start">
    <div class="TitleCont d-flex justify-start align-center flex-wrap">
      <h5>PML</h5>
    </div>

    <div class="ValuesCont d-flex flex-wrap flex align-start justify-center">
      <div class="Line Head BorderBottom">
        <div class="Row Label" />
        <div class="Row Bold">%</div>
        <div class="Row Bold">USD</div>
      </div>

      <div class="Line">
        <div class="Row Label">Damage*</div>
        <div class="Row">
          <v-text-field
            type="number"
            v-model="$v.boundPml.pmlDamage.$model"
            @blur="
              SET_BOUND_PML('pmlDamage', this);
              checkField('pmlDamage');
            "
            hint="Required field"
            persistent-hint
          />
        </div>
        <div class="Row">
          <currency-input
            v-model="pmlDamageUsd"
            :options="currencyOptions"
            readonly
          />
        </div>
      </div>

      <div class="Line">
        <div class="Row Label">BI</div>
        <div class="Row">
          <v-text-field
            type="number"
            v-model="$v.boundPml.pmlBi.$model"
            @blur="
              SET_BOUND_PML('pmlBi', this);
              checkField('pmlBi');
            "
          />
        </div>
        <div class="Row">
          <currency-input
            v-model="pmlBiUsd"
            :options="currencyOptions"
            readonly
          />
        </div>
      </div>

      <div class="Line BorderBottom">
        <div class="Row Label">Stocks</div>
        <div class="Row">
          <v-text-field
            type="number"
            v-model="$v.boundPml.pmlStocks.$model"
            @blur="
              SET_BOUND_PML('pmlStocks', this);
              checkField('pmlStocks');
            "
          />
        </div>
        <div class="Row">
          <currency-input
            v-model="pmlStocksUsd"
            :options="currencyOptions"
            readonly
          />
        </div>
      </div>

      <div class="Line BorderBottom">
        <div class="Row Label Bold">Total</div>
        <div class="Row Bold justify-start" />
        <div class="Row Bold justify-start">
          {{ formatNumber(pmlTotalUsd) }} USD
        </div>
      </div>
    </div>

    <div class="TitleTextArea">PML Comments*</div>
    <v-textarea
      v-model="$v.boundPml.pmlComments.$model"
      @blur="
        SET_BOUND_PML('pmlComments', this);
        checkField('pmlComments');
      "
      placeholder="Please enter PML comments"
      hint="Required field"
      persistent-hint
    />
  </div>
</template>
<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
/* components */
import CurrencyInput from "@/components/CurrencyInput/CurrencyInput.vue";
/* libs */
import Decimal from "decimal.js";
/* validations */
import { required } from "vuelidate/lib/validators";
/* lodash */
import { debounce } from "lodash";

export default {
  name: "PmlProperty",
  data() {
    return {
      pmlDamage: null,
      pmlBi: null,
      pmlStocks: null,
      currencyOptions: {
        currency: "MXN",
        currencyDisplay: "narrowSymbol",
        locale: "en-US",
      },
      formatter: new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }),
    };
  },
  components: { CurrencyInput },
  computed: {
    ...mapGetters([
      "quotation",
      "tiv",
      "premium",
      "typeCoverage",
      "applySir",
      "tivBound",
      "mliv",
      "boundPml",
      "boundInsurableProp",
      "risk_type",
      "accountInformation",
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
    // calcs
    pmlDamageUsd: {
      get() {
        if (this.propEng) {
          const op = Decimal(this.mliv.damageUsd || 0)
            .mul(this.boundPml.pmlDamage || 0)
            .div(100);
          return op;
        }
        return this.boundInsurableProp.limitedInsuredUsd;
      },
      set() {},
    },
    pmlBiUsd: {
      get() {
        if (this.propEng) {
          const op = Decimal(this.mliv.biUsd || 0)
            .mul(this.boundPml.pmlBi || 0)
            .div(100);
          return op;
        }
        return 0;
      },
      set() {},
    },
    pmlStocksUsd: {
      get() {
        if (this.propEng) {
          const op = Decimal(this.mliv.stocksUsd || 0)
            .mul(this.boundPml.pmlStocks || 0)
            .div(100);

          return op;
        }
        return 0;
      },
      set() {},
    },
    pmlTotalUsd: function () {
      return Decimal(this.pmlDamageUsd || 0)
        .add(this.pmlBiUsd || 0)
        .add(this.pmlStocksUsd || 0);
    },
    pmlRequiredFieldsCompleted() {
      const pmlDamageComplete = !!(
        this.boundPml.pmlDamage && this.boundPml.pmlDamage > 0
      );
      const pmlCommentsComplete = !!(
        this.boundPml.pmlComments && this.boundPml.pmlComments.trim().length > 0
      );

      return pmlDamageComplete && pmlCommentsComplete;
    },
  },
  watch: {
    pmlDamageUsd: debounce(function (val) {
      this.$v.boundPml.pmlDamageUsd.$model = val.toNumber();
      this.SET_BOUND_PML("pmlDamageUsd", val.toNumber());
      this.checkField("pmlDamageUsd");
    }, 1000),
    pmlStocksUsd: debounce(function (val) {
      this.$v.boundPml.pmlStocksUsd.$model = val.toNumber();
      this.SET_BOUND_PML("pmlStocksUsd", val.toNumber());
      this.checkField("pmlStocksUsd");
    }, 1000),
    pmlBiUsd: debounce(function (val) {
      this.$v.boundPml.pmlBiUsd.$model = val.toNumber();
      this.SET_BOUND_PML("pmlBiUsd", val.toNumber());
      this.checkField("pmlBiUsd");
    }, 1000),
    pmlTotalUsd: debounce(function (val) {
      this.$v.boundPml.pmlTotalUsd.$model = val.toNumber();
      this.SET_BOUND_PML("pmlTotalUsd", val.toNumber());
      this.checkField("pmlTotalUsd");
    }, 1000),
    pmlRequiredFieldsCompleted: {
      handler(newValue) {
        this.$emit("pml-fields-change", newValue);
      },
      immediate: true,
    },
  },
  methods: {
    ...mapActions(["saveBoundColumn"]),
    ...mapMutations(["SET_BOUND_PML"]),
    async checkField(column) {
      this.$v.boundPml[column].$touch();
      // console.log(this.$v.boundPml[column].$invalid, this.$v.boundPml[column].$error);
      if (this.$v.boundPml[column].$invalid || this.$v.boundPml[column].$error)
        return;
      await this.saveBoundColumn({
        table: "boundPml",
        parent: "boundPml",
        column,
      });
    },
    formatNumber(value) {
      const formatted = this.formatter.format(value);
      return formatted;
    },
  },
  validations: {
    boundPml: {
      pmlDamage: { required },
      pmlDamageUsd: { required },
      pmlBi: { required },
      pmlBiUsd: { required },
      pmlStocks: { required },
      pmlStocksUsd: { required },
      pmlComments: { required },
      pmlTotal: { required },
      pmlTotalUsd: { required },
    },
  },
};
</script>
<style lang="less" scoped>
@import "~@/assets/style/Subscription/Bound.less";

.Cont {
  width: 100%;
  height: auto;

  .ValuesCont {
    width: 37%;
    height: auto;

    //Contenedores principales
    .Line {
      .flex();
      width: 100%;
      height: 55px;
      justify-content: center;
      margin-bottom: 5px;
      gap: 1%;
    }
    .Head {
      height: 60px;
      margin-top: 0px;
    }

    //Contenedores de inputs
    .Row {
      .flex();
      width: 25%;
      height: 100%;
    }

    //Atributos especiales
    .Label {
      color: #547fa9;
      width: 20%;
      justify-content: flex-end;
      font-size: 14px;
    }
    .Bold {
      font-weight: 600;
      font-size: 15px;
    }
    .BorderBottom {
      border-bottom: solid 1px #d2deed;
    }
    .Small {
      width: 35%;
      margin-left: 1%;
    }
  }

  .Title {
    margin-top: 25px;
  }
  textarea {
    height: 90px;
  }
}
</style>
