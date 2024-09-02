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

      <!-- Valores Damage-->
      <div class="Line mt-3">
        <div class="Label">Damage</div>

        <div class="Row">
          <currency-input
            v-model="tiv.propertyDamage"
            :options="currencyOptions"
            disabled
          />
        </div>
        <div class="Row">
          <currency-input
            v-model="tiv.propertyDamageUsd"
            :options="currencyOptions"
            disabled
          />
        </div>
        <div class="MiniRow">
          <v-text-field
            placeholder="-"
            v-model="premium.propertyDamageRate"
            disabled
          />
        </div>
        <div class="Row">
          <currency-input
            v-model="premium.propertyDamage"
            :options="currencyOptions"
            disabled
          />
        </div>
        <div class="Row">
          <currency-input
            v-model="premium.propertyDamageUsd"
            :options="currencyOptions"
            disabled
          />
        </div>
      </div>

      <!--Valores de  Bi-->
      <div class="Line mt-2">
        <div class="Label">Bi</div>

        <div class="Row">
          <currency-input
            v-model="tiv.businessInterruption"
            :options="currencyOptions"
            disabled
          />
        </div>
        <div class="Row">
          <currency-input
            v-model="tiv.businessInterruptionUsd"
            :options="currencyOptions"
            disabled
          />
        </div>
        <div class="MiniRow">
          <v-text-field
            placeholder="-"
            v-model="premium.businessInterruptionRate"
            disabled
          />
        </div>
        <div class="Row">
          <currency-input
            v-model="premium.businessInterruption"
            :options="currencyOptions"
            disabled
          />
        </div>
        <div class="Row">
          <currency-input
            v-model="premium.businessInterruptionUsd"
            :options="currencyOptions"
            disabled
          />
        </div>
      </div>

      <div class="Line mt-2">
        <div class="Label">Stocks</div>

        <div class="Row">
          <div class="Row__input-middle">
            <currency-input
              v-model="tiv.stock"
              :options="currencyOptions"
              disabled
            />
          </div>
          <div class="Row__input-small">
            <v-text-field suffix="%" type="number" v-model="tiv.porcentaje" />
          </div>
        </div>
        <div class="Row">
          <currency-input
            v-model="tiv.stockUsd"
            :options="currencyOptions"
            disabled
          />
        </div>
        <div class="MiniRow">
          <v-text-field placeholder="-" v-model="premium.stockRate" disabled />
        </div>
        <div class="Row">
          <currency-input
            v-model="premium.stock"
            :options="currencyOptions"
            disabled
          />
        </div>
        <div class="Row">
          <currency-input
            v-model="premium.stockUsd"
            :options="currencyOptions"
            disabled
          />
        </div>
      </div>

      <!--Total-->
      <div class="TotalLine mt-3">
        <div class="Label Bold">Total</div>
        <div class="Row Bold">{{ tiv.total }}</div>
        <div class="Row Bold">{{ tiv.totalUsd }}</div>
        <div class="MiniRow Bold" />
        <div class="Row Bold">
          {{ premium.totalInsured ? premium.totalInsured : tiv.total }}
        </div>
        <div class="Row Bold">{{ premium.totalUsd }}</div>
      </div>
    </div>

    <!--INPUTS-->
    <div class="InputsCont d-flex flex-wrap justify-start">
      <div class="InputCont">
        <currency-input
          label="Limit Insured (OG. Currency)"
          v-model.trim="limitedInsuredOriginal"
          :options="currencyOptions"
          disabled
        />
      </div>
      <div class="InputCont">
        <currency-input
          label="Limit Insured (USD)"
          :options="currencyOptions"
          v-model="limitedInsuredUsd"
          disabled
        />
      </div>
      <div class="InputCont">
        <v-select
          v-model.trim="typeSelect"
          @change="evaluateCoverage($event)"
          label="Type Of Coverage"
          :items="typeCoverage"
          item-text="data"
          item-value="id"
          :loading="typeCoverage.length === 0"
          disabled
        ></v-select>
      </div>
      <div v-if="isNonProportional" class="InputCont">
        <currency-input
          label="Attachment point (Og. Currency)"
          v-model.trim="attachPointExcess"
          :options="currencyOptions"
          disabled
        />
      </div>
      <div v-if="showAttachmentPoint" class="InputCont">
        <currency-input
          :options="currencyOptions"
          label="Attachment point (USD)"
          v-model="attachPointUsd"
          disabled
        />
      </div>

      <div
        class="MiniInputCont"
        :class="showAttachmentPoint === true ? 'mt-7' : ''"
      >
        <currency-input
          label="SLU Line"
          v-model="sluLine"
          suffix="%"
          :options="{ ...currencyOptions, currencyDisplay: 'hidden' }"
          disabled
        />
      </div>
      <div :class="isNonProportional && 'mt-7'" class="InputCont">
        <currency-input
          :options="currencyOptions"
          label="SLU Exposure"
          v-model="sluExposure"
          disabled
        />
      </div>
      <div class="InputCont mt-7">
        <currency-input
          label="SLU Premium"
          readonly
          :options="currencyOptions"
          v-model="sluPremium"
          disabled
        />
      </div>

      <div class="ExtraLarge mt-7 ml">
        <currency-input
          label="Self insured"
          v-model.trim="$v.boundInsurableProp.selfInsured.$model"
          :options="currencyOptions"
          @blur="
            SET_INSURABLE_PROP_BOUND('selfInsured', this);
            checkField('selfInsured');
          "
        />
      </div>
      <div class="ExtraLarge mt-7">
        <v-select
          v-model.trim="applySirSelect"
          @input="$v.boundInsurableProp.applySirSelect.$model = applySirSelect"
          @blur="
            SET_INSURABLE_PROP_BOUND('applySirSelect', applySirSelect);
            checkField('applySirSelect');
          "
          label="Apply"
          :items="applySir"
          item-text="data"
          item-value="id"
          clearable
          :disabled="applySir.length === 0"
        ></v-select>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters, mapMutations, mapState } from "vuex";
/* components */
import CurrencyInput from "@/components/CurrencyInput/CurrencyInput.vue";
/* libs */
import Decimal from "decimal.js";
import numeral from "numeral";
/* validations */
import { required } from "vuelidate/lib/validators";
/* lodash */
import { debounce } from "lodash";

export default {
  name: "TotalInsurableValueBoundQuotator",
  components: { CurrencyInput },
  data() {
    return {
      applySirSelect: "",
      attachPoint: null,
      showAttachmentPoint: false,
      currencyOptions: {
        currency: "MXN",
        currencyDisplay: "narrowSymbol",
        locale: "en-US",
      },
    };
  },
  async beforeMount() {
    await this.getCatalogByName({ name: "type_coverages" });
    await this.getCatalogByName({ name: "apply_sir" });

    this.tiv.totalUsd = this.tiv.totalUsd;
    this.premium.stockUsd = this.premium.stockUsd;
    this.applySirSelect = this.boundInsurableProp.applySirSelect;

    const valids = [2, "2"];

    if (valids.includes(this.typeSelect)) {
      this.showAttachmentPoint = true;
    }
  },
  computed: {
    ...mapGetters([
      "quotation",
      "premium",
      "typeCoverage",
      "applySir",
      "tivBound",
      "boundInsurable",
      "boundInsurableProp",
      "layersArray",
      "accountInformation",
      "risk_type",
      "toBeDefined",
    ]),
    ...mapState({
      tiv(state) {
        if (this.isNonProportional) return state.tivNon;
        return state.tiv;
      },
    }),
    // tipo de riesgo
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
    typeSelect() {
      if (!this.isNonProportional) return 1;
      return 2;
    },
    isNonProportional() {
      const valids = [2, "2"];
      if (valids.includes(this.quotation.typeQuotation)) {
        return true;
      }
      return false;
    },
    // valores computados
    limitedInsuredOriginal: {
      get() {
        return this.toBeDefined.limitedInsured;
      },
      set() {},
    },
    limitedInsuredUsd: {
      get() {
        return this.toBeDefined.limitedInsured / this.quotation.exchangeRate;
      },
      set() {},
    },
    attachPointExcess: {
      get() {
        const data = this.layersArray.find((v) => v.checked);
        if (!data) return new Decimal(0);
        return (
          numeral((`${data.excess}` || "$0").replace(/[^0-9.]/g, "")).value() ||
          0
        );
      },
      set() {},
    },
    attachPointUsd: function () {
      const data = this.layersArray.find((v) => v.checked);
      if (!data) return new Decimal(0);
      return (
        numeral(
          (`${data.excessUsd}` || "$0").replace(/[^0-9.]/g, "")
        ).value() || 0
      );
    },
    sluLine: {
      get() {
        const data = this.layersArray.find((v) => v.checked);
        if (!this.isNonProportional) {
          const value = new Decimal(
            numeral(
              (`${this.toBeDefined.sluShare}` || "$0").replace(/[^0-9.]/g, "")
            ).value() || 0
          ).toNumber();
          this.boundInsurableProp.sluLine = value;
          return value;
        }

        if (!data) return new Decimal(0);

        const value =
          numeral(
            (`${data.sluShare}` || "$0").replace(/[^0-9.]/g, "")
          ).value() || 0;

        this.boundInsurableProp.sluLine = value;
        return value;
      },
      set() {},
    },
    sluExposure: {
      get() {
        return Decimal(
          numeral(
            (`${this.limitedInsuredUsd}` || "$0").replace(/[^0-9.]/g, "")
          ).value() || 0
        )
          .mul(this.sluLine || 0)
          .div(100);
      },
      set() {},
    },
    sluPremium: {
      get() {
        return (
          numeral(
            (`${this.toBeDefined.premiumSluUsd}` || "$0").replace(
              /[^0-9.]/g,
              ""
            )
          ).value() || 0
        );
      },
      set() {},
    },
  },
  watch: {
    "boundInsurableProp.limitedInsured": function (val) {
      this.tivBound.limitedInsured = val;
    },
    typeSelect: {
      immediate: true,
      handler(val) {
        this.tivBound.typeSelect = val;
        this.$v.boundInsurableProp.typeSelect.$model = val;
        this.SET_INSURABLE_PROP_BOUND("typeSelect", val);
        this.checkField("typeSelect");
      },
    },
    limitedInsuredOriginal: {
      immediate: true,
      handler: debounce(function (val) {
        this.$v.boundInsurableProp.limitedInsured.$model = val;
        this.SET_INSURABLE_PROP_BOUND("limitedInsured", val);
        this.checkField("limitedInsured");
      }, 1000),
    },
    limitedInsuredUsd: {
      immediate: true,
      handler: debounce(function (val) {
        this.$v.boundInsurableProp.limitedInsuredUsd.$model = val;
        this.SET_INSURABLE_PROP_BOUND("limitedInsuredUsd", val);
        this.checkField("limitedInsuredUsd");
      }, 1000),
    },
    attachPointExcess: {
      immediate: true,
      handler: debounce(function (val) {
        // si no funciona, usar val.toNumber()
        this.$v.boundInsurableProp.attachPoint.$model = val;
        this.SET_INSURABLE_PROP_BOUND("attachPoint", val);
        this.checkField("attachPoint");
      }, 1000),
    },
    attachPointUsd: {
      immediate: true,
      handler: debounce(function (val) {
        this.$v.boundInsurableProp.attachPointUsd.$model = val;
        this.SET_INSURABLE_PROP_BOUND("attachPointUsd", val);
        this.checkField("attachPointUsd");
      }, 1000),
    },
    sluExposure: {
      immediate: true,
      handler: debounce(function (val) {
        this.$v.boundInsurableProp.sluExposure.$model = val.toNumber();
        this.SET_INSURABLE_PROP_BOUND("sluExposure", val.toNumber());
        this.checkField("sluExposure");
      }, 1000),
    },
    sluPremium: {
      immediate: true,
      handler: debounce(function (val) {
        this.$v.boundInsurableProp.sluPremium.$model = val;
        this.SET_INSURABLE_PROP_BOUND("sluPremium", val);
        this.checkField("sluPremium");
      }, 1000),
    },
    sluLine: {
      immediate: true,
      handler: debounce(function (val) {
        this.$v.boundInsurableProp.sluLine.$model = val;
        this.SET_INSURABLE_PROP_BOUND("sluLine", val);
        this.checkField("sluLine");
      }, 1000),
    },
  },
  methods: {
    ...mapActions(["saveBoundColumn", "getCatalogByName"]),
    ...mapMutations(["SET_TIV_BOUND", "SET_INSURABLE_PROP_BOUND"]),
    async checkField(column) {
      this.$v.boundInsurableProp[column].$touch();
      if (
        this.$v.boundInsurableProp[column].$invalid ||
        this.$v.boundInsurableProp[column].$error
      )
        return;
      await this.saveBoundColumn({
        table: "boundInsurableProp",
        parent: "boundInsurableProp",
        column,
      });
    },
    /*
      evaluateCoverage
      Evalua la opción seleccionada y muestra el input Attachment point
      en caso de haber elegido Excess of loss
    */
    evaluateCoverage(val) {
      if (val === 2) {
        this.showAttachmentPoint = true;
      } else {
        this.showAttachmentPoint = false;
      }
    },
  },
  validations: {
    tivBound: {
      limitedInsured: { required },
      typeSelect: { required },
    },
    boundInsurableProp: {
      limitedInsured: { required },
      limitedInsuredUsd: { required },
      typeSelect: { required },
      attachPoint: { required },
      attachPointUsd: { required },
      sluLine: { required },
      sluExposure: { required },
      sluPremium: { required },
      applySirSelect: { required },
      selfInsured: { required },
    },
  },
};
</script>
<style lang="less" scoped>
@import "~@/assets/style/Subscription/Bound.less";
.back {
  background: red;
}
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
    width: 80%;
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
      width: 17%;
      height: 100%;
      justify-content: space-between;

      &__input-middle {
        width: 70%;
        height: 100%;
      }
      &__input-small {
        width: 25%;
        height: 100%;
      }
    }

    .MiniRow {
      .flex();
      width: 11%;
      height: 100%;
    }

    .Percentaje {
      width: 7%;
      height: 100%;
    }

    .Bold {
      font-weight: 700;
    }
  }

  //Inputs
  .InputsCont {
    width: 100%;
    height: auto;
    margin-top: 20px;
    .InputCont {
      width: 19%;
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
    .ExtraLarge {
      width: 47%;
      height: 50px;
      margin-top: 10px;
    }
    .ml {
      margin-right: 6%;
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
