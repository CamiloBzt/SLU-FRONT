<template>
  <div class="total-insurable-cont">
    <div class="title-cont">
      <h5>Total insurable value</h5>
    </div>

    <!--TABLA-->
    <div class="wrapper horizontal-scroll">
      <div class="total-insurable-cont__table">
        <!--
    		Cabecera
    	-->
        <div class="head">
          <div class="label"></div>

          <div class="input-row bold-text">Original Currency</div>
          <div class="input-row bold-text">USD</div>
          <div class="mini-row bold-text">Rate</div>
          <div class="input-row bold-text">Premium</div>
          <div class="input-row bold-text">Premium USD</div>
        </div>

        <!-- Valores Damage-->
        <div class="line mt-3">
          <div class="label">Damage</div>

          <div class="input-row">
            <currency-input
              v-model="quotationInsured.propertyDamage"
              :options="currencyOptions"
              disabled
            />
          </div>
          <div class="input-row">
            <currency-input
              v-model="quotationInsured.propertyDamageUsd"
              :options="currencyOptions"
              disabled
            />
          </div>
          <div class="mini-row">
            <v-text-field
              placeholder="-"
              v-model="propertyBusinessRate"
              :options="currencyOptions"
              disabled
            />
          </div>
          <div class="input-row">
            <currency-input
              v-model="propertyDamagePremium"
              :options="currencyOptions"
              disabled
            />
          </div>
          <div class="input-row">
            <currency-input
              v-model="propertyDamageUsdPremium"
              :options="currencyOptions"
              disabled
            />
          </div>
        </div>

        <!--Valores de  Bi-->
        <div class="line mt-2">
          <div class="label">Bi</div>

          <div class="input-row">
            <currency-input
              v-model="quotationInsured.businessInterruption"
              :options="currencyOptions"
              disabled
            />
          </div>
          <div class="input-row">
            <currency-input
              v-model="quotationInsured.businessInterruptionUsd"
              :options="currencyOptions"
              disabled
            />
          </div>
          <div class="mini-row">
            <v-text-field
              placeholder="-"
              v-model="propertyBusinessRate"
              disabled
            />
          </div>
          <div class="input-row">
            <currency-input
              v-model="businessInterruptionPremium"
              :options="currencyOptions"
              disabled
            />
          </div>
          <div class="input-row">
            <currency-input
              v-model="businessInterruptionUsdPremium"
              :options="currencyOptions"
              disabled
            />
          </div>
        </div>

        <div class="line mt-2">
          <div class="label">Stocks</div>

          <div class="input-row">
            <div class="row__input-middle">
              <currency-input
                v-model="quotationInsured.stock"
                :options="currencyOptions"
                disabled
              />
            </div>
            <div class="row__input-small pl-5">
              <v-text-field
                suffix="%"
                type="number"
                v-model="totalInsurableValue.stocksRate"
                @blur="saveField('stocks_rate', totalInsurableValue.stocksRate)"
              />
            </div>
          </div>
          <div class="input-row">
            <currency-input
              v-model="quotationInsured.stockUsd"
              :options="currencyOptions"
              disabled
            />
          </div>
          <div class="mini-row">
            <v-text-field
              placeholder="-"
              v-model="stocksPremiumRate"
              disabled
            />
          </div>
          <div class="input-row">
            <currency-input
              v-model="stockPremium"
              :options="currencyOptions"
              disabled
            />
          </div>
          <div class="input-row">
            <currency-input
              v-model="stockUsdPremium"
              :options="currencyOptions"
              disabled
            />
          </div>
        </div>

        <!--Total-->
        <div class="TotalLine mt-3">
          <div class="label bold-text">Total</div>
          <div class="input-row bold-text">{{ formatter.format(total) }}</div>
          <div class="input-row bold-text">
            {{ formatter.format(totalUsd) }}
          </div>
          <div class="mini-row bold-text" />
          <div class="input-row bold-text">
            {{ formatter.format(totalPremium) }}
          </div>
          <div class="input-row bold-text">
            {{ formatter.format(totalPremiumUsd) }}
          </div>
        </div>
      </div>
    </div>

    <!--INPUTS-->
    <div class="inputs-cont">
      <div class="input-cont">
        <currency-input
          label="Limit Insured (OG. Currency)"
          v-model.trim="limitInsuredOg"
          :options="currencyOptions"
          disabled
        />
      </div>
      <div class="input-cont">
        <currency-input
          label="Limit Insured (USD)"
          v-model="limitInsuredUsd"
          :options="currencyOptions"
          disabled
        />
      </div>

      <div class="input-cont">
        <v-select
          v-model.trim="quotation.typeQuotation"
          label="Type Of Coverage"
          :items="items"
          item-text="data"
          item-value="id"
          :loading="loading"
          disabled
        ></v-select>
      </div>

      <div class="input-cont">
        <currency-input
          label="Attachment point (Og. Currency)"
          v-model.trim="excess"
          :options="currencyOptions"
          disabled
        />
      </div>
      <div class="input-cont">
        <currency-input
          label="Attachment point (USD)"
          v-model="excessUsd"
          :options="currencyOptions"
          disabled
        />
      </div>

      <div class="mini-input-cont">
        <currency-input
          label="SLU Line"
          v-model="layers.sluShare"
          :options="currencyOptions"
          suffix="%"
          disabled
        />
      </div>
      <div class="input-cont">
        <currency-input
          label="SLU Exposure"
          v-model="sluLimitUsd"
          :options="currencyOptions"
          disabled
        />
      </div>
      <div class="input-cont">
        <currency-input
          label="SLU Premium"
          readonly
          v-model="sluPremiumUsd"
          :options="currencyOptions"
          disabled
        />
      </div>

      <div class="extra-large ml">
        <currency-input
          label="Self insured"
          v-model.trim="selfInsured"
          :options="currencyOptions"
        />
      </div>
      <div class="extra-large">
        <v-select
          v-model.trim="applySirSelect"
          label="Apply"
          :items="items"
          item-text="data"
          item-value="id"
          clearable
          :disabled="disabled"
        ></v-select>
      </div>
    </div>
  </div>
</template>
<script>
/* components */
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";

import CurrencyInput from "@/components/CurrencyInput/CurrencyInput.vue";
/* services */
import {
  getCatalog,
  getTotalInsurableValue,
  saveTotalInsurableValue,
} from "./services/TotalInsurableValue/total-insurable-value.service";
/* numbers */
import Decimal from "decimal.js";
import numeral from "numeral";

export default {
  name: "TotalInsurableValueBoundQuotator",
  components: { CurrencyInput },
  data() {
    return {
      quotation: {
        exchangeRate: null,
        typeQuotation: null,
      },
      layers: {
        premium: "",
        limit: "",
        limitUsd: "",
        excess: "",
        excessUsd: "",
        sluShare: "",
        sluLimitUsd: "",
        sluPremiumUsd: "",
      },
      quotationInsured: {
        propertyDamage: "",
        propertyDamageUsd: "",
        businessInterruption: "",
        businessInterruptionUsd: "",
        stock: "",
        stockUsd: "",
        rate: "",
        total: "",
      },
      totalInsurableValue: {
        stocksRate: "",
      },
      selfInsured: "",
      applySirSelect: "",
      items: [],
      disabled: true,
      loading: false,
      subscriptionId: false,
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
  computed: {
    ...mapState({
      realData: (state) => state.totalInsurableValue,
    }),
    totalInsured: {
      get() {
        const op = new Decimal(
          numeral(
            (`${this.quotationInsured.total}` || "$0").replace(/[^0-9.]/g, "")
          ).value() || 0
        );

        return op;
      },
      set() {},
    },
    propertyBusinessRate: {
      get() {
        const op = new Decimal(
          numeral(
            (`${this.layers.premium}` || "$0").replace(/[^0-9.]/g, "")
          ).value() || 0
        )
          .div(this.totalInsured || 0)
          .mul(1000);

        return op;
      },
      set() {},
    },
    stocksPremiumRate: {
      get() {
        const op = this.propertyBusinessRate.mul(
          this.totalInsurableValue.stocksRate || 0
        );
        return op;
      },
      set() {},
    },
    propertyDamagePremium: {
      get() {
        const mult = new Decimal(this.quotationInsured.propertyDamage || 0).mul(
          this.propertyBusinessRate || 0
        );
        const result = Decimal.div(mult || 0, 1000);
        return result.toNumber();
      },
      set() {},
    },
    businessInterruptionPremium: {
      get() {
        const mult = new Decimal(
          this.quotationInsured.businessInterruption || 0
        ).mul(this.propertyBusinessRate || 0);
        const result = Decimal.div(mult || 0, 1000);
        return result.toNumber();
      },
      set() {},
    },
    stockPremium: {
      get() {
        const percent = Decimal.div(this.stocksPremiumRate || 0, 100);
        const mult = new Decimal(this.quotationInsured.stock || 0).mul(percent);
        const result = Decimal.div(mult || 0, 1000);
        return result.toNumber();
      },
      set() {},
    },
    propertyDamageUsdPremium: {
      get() {
        const result = new Decimal(this.propertyDamagePremium || 0).div(
          this.quotation.exchangeRate || 0
        );
        return result;
      },
      set() {},
    },
    businessInterruptionUsdPremium: {
      get() {
        const result = new Decimal(this.businessInterruptionPremium || 0).div(
          this.quotation.exchangeRate || 0
        );
        return result;
      },
      set() {},
    },
    stockUsdPremium: {
      get() {
        const result = new Decimal(this.stockPremium || 0).div(
          this.quotation.exchangeRate || 0
        );
        return result;
      },
      set() {},
    },
    total: {
      get() {
        const result = Decimal.sum(
          this.quotationInsured.propertyDamage || 0,
          this.quotationInsured.businessInterruption || 0,
          this.quotationInsured.stock || 0
        );
        return result;
      },
      set() {},
    },
    totalUsd: {
      get() {
        const result = Decimal.sum(
          this.quotationInsured.propertyDamageUsd || 0,
          this.quotationInsured.businessInterruptionUsd || 0,
          this.quotationInsured.stockUsd || 0
        );
        return result;
      },
      set() {},
    },
    totalPremium: {
      get() {
        const result = Decimal.sum(
          this.propertyDamagePremium || 0,
          this.businessInterruptionPremium || 0,
          this.stockPremium || 0
        );
        return result;
      },
      set() {},
    },
    totalPremiumUsd: {
      get() {
        const result = Decimal.sum(
          this.propertyDamageUsdPremium || 0,
          this.businessInterruptionUsdPremium || 0,
          this.stockUsdPremium || 0
        );
        return result;
      },
      set() {},
    },
    /* sección de abajo */
    limitInsuredOg() {
      const num =
        numeral(
          (`${this.layers.limit}` || "$0").replace(/[^0-9.]/g, "")
        ).value() || 0;

      return num;
    },
    limitInsuredUsd: {
      get() {
        const num =
          numeral(
            (`${this.layers.limitUsd}` || "$0").replace(/[^0-9.]/g, "")
          ).value() || 0;

        return num;
      },
      set() {},
    },
    excess: {
      get() {
        const num =
          numeral(
            (`${this.layers.excess}` || "$0").replace(/[^0-9.]/g, "")
          ).value() || 0;

        return num;
      },
      set() {},
    },
    excessUsd: {
      get() {
        const num =
          numeral(
            (`${this.layers.excessUsd}` || "$0").replace(/[^0-9.]/g, "")
          ).value() || 0;

        return num;
      },
      set() {},
    },
    sluLimitUsd: {
      get() {
        const num =
          numeral(
            (`${this.layers.sluLimitUsd}` || "$0").replace(/[^0-9.]/g, "")
          ).value() || 0;

        return num;
      },
      set() {},
    },
    sluPremiumUsd: {
      get() {
        const num =
          numeral(
            (`${this.layers.sluPremiumUsd}` || "$0").replace(/[^0-9.]/g, "")
          ).value() || 0;

        return num;
      },
      set() {},
    },
  },
  beforeMount() {
    this.items = getCatalog("type_coverages");

    this.subscriptionId = this.$route.params?.subscriptionId;
    if (this.subscriptionId) {
      Promise.all([this.getTotalInsurableValue(this.subscriptionId)]).finally(
        () => {
          this.quotation = this.realData.quotation;
          this.quotationInsured = this.realData.quotationInsured;
          this.layers = this.realData.layers;
          this.totalInsurableValue = {
            stocksRate:
              this.realData.boundNonPropTotalInsurableValue.stocksRate,
          };
        }
      );
    }
  },
  methods: {
    ...mapActions(["getTotalInsurableValue"]),
    async saveField(column, value) {
      if (this.subscriptionId)
        await saveTotalInsurableValue(this.subscriptionId, column, value);
    },
  },
  watch: {
    "totalInsurableValue.stocksRate": function (value) {
      this.$emit("changeTotalInsurableValueStocksRate", value);
    },
  },
};
</script>
<style lang="less" scoped>
@import "~@/assets/style/Subscription/BoundRefactored.less";

.back {
  background: red;
}

.wrapper {
  overflow: auto;
  width: 90%;
  margin: auto;
}

.total-insurable-cont {
  width: 100%;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-wrap: wrap;

  .title-cont {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 100%;

    h5 {
      font-size: 20px;
      font-weight: 600;
    }
  }

  //Tabla
  &__table {
    width: 1000px;
    height: auto;
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    justify-content: center;

    //Cabecera
    .head {
      width: 100%;
      height: 70px;
      border-bottom: solid 1px #d2deed;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    //Valores
    .line {
      .flex();
      justify-content: space-between;
      width: 100%;
      height: auto;

      .input-row,
      .mini-row {
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

      .input-row,
      .mini-row {
        justify-content: flex-start;
        text-align: left;
      }
    }

    .label {
      .flex();
      width: 8%;
      height: 100%;
      justify-content: flex-end;
      text-align: right;
      color: #547fa9;
    }

    .input-row {
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

    .mini-row {
      .flex();
      width: 11%;
      height: 100%;
    }

    .bold-text {
      font-weight: 700;
    }
  }

  //Inputs
  .inputs-cont {
    width: 100%;
    height: auto;
    margin-top: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;

    .input-cont {
      width: 16%;
      height: 50px;
      margin-right: 1%;
      margin-top: 10px;
    }

    .mini-input-cont {
      width: 10%;
      height: 50px;
      margin-right: 1%;
      margin-top: 10px;
    }

    .extra-large {
      width: 47%;
      height: 50px;
      margin-top: 10px;
    }

    .ml {
      margin-right: 6%;
    }
  }
}

@media (max-width: 850px) {
  .total-insurable-cont {
    .inputs-cont {
      .input-cont,
      .mini-input-cont {
        width: 32%;
        margin-top: 7px;
      }
    }
  }
}

@media (max-width: 650px) {
  .total-insurable-cont {
    .inputs-cont {
      .input-cont,
      .mini-input-cont {
        width: 100%;
        margin-top: 7px;
      }
    }
  }
}
</style>
