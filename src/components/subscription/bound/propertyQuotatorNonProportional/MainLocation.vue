<template>
  <div class="main-location-cont flex">
    <div class="title-cont">
      <h5>Main Location Insurable Values</h5>
    </div>
    <div class="wrapper horizontal-scroll">
      <div class="values-cont">
        <div class="line head border-bottom">
          <div class="input-row label" />
          <div class="input-row bold-text">Original Currency</div>
          <div class="input-row bold-text">USD</div>
        </div>

        <div class="line">
          <div class="input-row label">Damage*</div>
          <div class="input-row">
            <currency-input
              v-model="mainLocation.damage"
              @blur="saveField('damage', mainLocation.damage)"
              :options="currencyOptions"
            />
          </div>
          <div class="input-row">
            <currency-input
              v-model="damageUsd"
              :options="currencyOptions"
              readonly
            />
          </div>
        </div>
        <div class="line">
          <div class="input-row label">BI</div>
          <div class="input-row">
            <currency-input
              :options="currencyOptions"
              v-model="mainLocation.businessInterruption"
              @blur="
                saveField(
                  'business_interruption',
                  mainLocation.businessInterruption
                )
              "
              type="number"
            />
          </div>
          <div class="input-row">
            <currency-input
              v-model="businessInterruptionUsd"
              :options="currencyOptions"
              readonly
            />
          </div>
        </div>

        <div class="line border-bottom">
          <div class="input-row label">Stocks</div>
          <div class="input-row">
            <currency-input
              :options="currencyOptions"
              v-model="mainLocation.stocks"
              @blur="saveField('stocks', mainLocation.stocks)"
              type="number"
            />
          </div>
          <div class="input-row">
            <currency-input
              v-model="stocksUsd"
              :options="currencyOptions"
              readonly
            />
          </div>
        </div>

        <div class="line border-bottom">
          <div class="input-row label bold-text">Total</div>
          <div class="input-row bold-text justify-start">
            {{ formatter.format(total) }}
          </div>
          <div class="input-row bold-text justify-start">
            {{ formatter.format(totalUsd) }} USD
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
/* libs */
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import Decimal from "decimal.js";
import numeral from "numeral";
/* debounce */
import { debounce } from "lodash";
/* components */
import CurrencyInput from "@/components/CurrencyInput/CurrencyInput.vue";
/* services */
import {
  getMainLocation,
  saveMainLocation,
} from "./services/MainLocation/main-location.service";

export default {
  name: "MainLocation",
  components: { CurrencyInput },
  data() {
    return {
      mainLocation: {
        damage: "",
        damageUsd: "",
        businessInterruption: "",
        businessInterruptionUsd: "",
        stocks: "",
        stocksUsd: "",
        total: "",
        totalUsd: "",
      },
      exchangeRate: 1,
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
      realMainLocation: (state) => state.mainLocation,
    }),
    damageFieldCompleted() {
      return !!(this.mainLocation.damage && this.mainLocation.damage > 0);
    },
    damageUsd: {
      get() {
        // const percentDivided = Decimal.div(this.exchangeRate, 100)
        const percentDivided = Decimal(this.exchangeRate);
        const result = Decimal.div(
          this.mainLocation.damage || 0,
          percentDivided
        );
        this.mainLocation.damageUsd = result.toNumber();

        return this.mainLocation.damageUsd;
      },
      set() {},
    },
    businessInterruptionUsd: {
      get() {
        // const percentDivided = Decimal.div(this.exchangeRate, 100)
        const percentDivided = Decimal(this.exchangeRate);
        const result = Decimal.div(
          this.mainLocation.businessInterruption || 0,
          percentDivided
        );
        this.mainLocation.businessInterruptionUsd = result.toNumber();

        return this.mainLocation.businessInterruptionUsd;
      },
      set() {},
    },
    stocksUsd: {
      get() {
        // const percentDivided = Decimal.div(this.exchangeRate, 100)
        const percentDivided = Decimal(this.exchangeRate);
        const result = Decimal.div(
          this.mainLocation.stocks || 0,
          percentDivided
        );
        this.mainLocation.stocksUsd = result.toNumber();

        return this.mainLocation.stocksUsd;
      },
      set() {},
    },
    total() {
      const total = Decimal.sum(
        Decimal(this.mainLocation.damage || 0),
        Decimal(this.mainLocation.businessInterruption || 0),
        Decimal(this.mainLocation.stocks || 0)
      );
      this.mainLocation.total = total.toNumber();

      return this.mainLocation.total;
    },
    totalUsd() {
      const total = Decimal.sum(
        this.damageUsd,
        this.businessInterruptionUsd,
        this.stocksUsd
      );
      this.mainLocation.totalUsd = total.toNumber();

      return this.mainLocation.totalUsd;
    },
  },
  async beforeMount() {
    this.subscriptionId = this.$route.params?.subscriptionId;
    if (this.subscriptionId) {
      const data = await getMainLocation(this.subscriptionId);
      this.exchangeRate =
        numeral(
          (`${data?.quotation.exchangeRate}` || "$0").replace(/[^0-9.]/g, "")
        ).value() || 0;
      this.mainLocation = data?.boundNonPropMainLocation;
    }
  },
  methods: {
    async saveField(column, value) {
      if (this.subscriptionId)
        await saveMainLocation(this.subscriptionId, column, value);
      if (column === "damage") {
        this.$forceUpdate();
      }
    },
  },
  watch: {
    "mainLocation.damage": {
      handler() {
        this.$nextTick(() => {
          this.$emit("damage-field-change", this.damageFieldCompleted);
        });
      },
    },
    "mainLocation.damageUsd": {
      handler: debounce(function (value) {
        saveMainLocation(this.subscriptionId, "damage_usd", value);
      }, 1000),
    },
    "mainLocation.businessInterruptionUsd": {
      handler: debounce(function (value) {
        saveMainLocation(
          this.subscriptionId,
          "business_interruption_usd",
          value
        );
      }, 1000),
    },
    "mainLocation.stocksUsd": {
      handler: debounce(function (value) {
        saveMainLocation(this.subscriptionId, "stocks_usd", value);
      }, 1000),
    },
    "mainLocation.total": {
      handler: debounce(function (value) {
        saveMainLocation(this.subscriptionId, "total", value);
      }, 1000),
    },
    "mainLocation.totalUsd": {
      handler: debounce(function (value) {
        saveMainLocation(this.subscriptionId, "total_usd", value);
      }, 1000),
    },
    damageFieldCompleted: {
      handler(newValue) {
        this.$emit("damage-field-change", newValue);
      },
      immediate: true,
    },
  },
};
</script>
<style lang="less" scoped>
@import "~@/assets/style/Subscription/BoundRefactored.less";

.main-location-cont {
  width: 100%;
  height: auto;
  margin-top: 17px;
  flex-wrap: wrap;
  justify-content: center;
  align-items: flex-start;
  .title-cont {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: wrap;
  }
  .values-cont {
    flex: 1 1 auto;
    width: 100%;
    height: auto;
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    justify-content: center;

    .line {
      .flex();
      width: 100%;
      height: 55px;
      justify-content: space-between;
      margin-bottom: 5px;
    }
    .head {
      height: 60px;
      margin-top: 0px;
    }

    .input-row {
      .flex();
      width: 40%;
      height: 100%;
    }

    .label {
      color: #547fa9;
      width: 15%;
      justify-content: flex-end;
      font-size: 14px;
    }
    .bold-text {
      font-weight: 600;
      font-size: 16px;
    }
    .border-bottom {
      border-bottom: solid 1px #d2deed;
    }
  }
}

@media (max-width: 900px) {
  .main-location-cont {
    .wrapper {
      overflow: auto;
      width: 90%;
      margin: auto;
    }
    .values-cont {
      width: 750px;
    }
  }
}
</style>
