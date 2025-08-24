<template>
  <div class="Cont flex flex-wrap justify-center align-start">
    <div class="TitleCont d-flex justify-start align-center flex-wrap">
      <h5>Main Location Insurable Values</h5>
    </div>

    <div class="ValuesCont d-flex flex-wrap flex align-start justify-center">
      <div class="Line Head BorderBottom">
        <div class="Row Label" />
        <div class="Row Bold">Original Currency</div>
        <div class="Row Bold">USD</div>
      </div>

      <div class="Line">
        <div class="Row Label">Damage*</div>
        <div class="Row">
          <currency-input
            v-model="$v.mliv.damage.$model"
            :options="currencyOptions"
            @blur="
              SET_MLIV_BOUND('damage', this);
              checkField('damage');
            "
          />
        </div>
        <div class="Row">
          <currency-input
            v-model="mlivDamageUsd"
            :options="currencyOptions"
            readonly
          />
        </div>
      </div>

      <div class="Line">
        <div class="Row Label">BI</div>
        <div class="Row">
          <currency-input
            :options="currencyOptions"
            v-model="$v.mliv.bi.$model"
            type="number"
            @blur="
              SET_MLIV_BOUND('bi', this);
              checkField('bi');
            "
          />
        </div>
        <div class="Row">
          <currency-input
            v-model="mlivBiUsd"
            :options="currencyOptions"
            readonly
          />
        </div>
      </div>

      <div class="Line BorderBottom">
        <div class="Row Label">Stocks</div>
        <div class="Row">
          <currency-input
            :options="currencyOptions"
            v-model="$v.mliv.stocks.$model"
            type="number"
            @blur="
              SET_MLIV_BOUND('stocks', this);
              checkField('stocks');
            "
          />
        </div>
        <div class="Row">
          <currency-input
            v-model="mlivStocksUsd"
            :options="currencyOptions"
            readonly
          />
        </div>
      </div>

      <div class="Line BorderBottom">
        <div class="Row Label Bold">Total</div>
        <div class="Row Bold justify-start">{{ formatNumber(mlivTotal) }}</div>
        <div class="Row Bold justify-start">
          {{ formatNumber(mlivTotalUsd) }} USD
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
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
  name: "MainLocation",
  components: { CurrencyInput },
  data() {
    return {
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
    ...mapGetters([
      "quotation",
      "tiv",
      "premium",
      "typeCoverage",
      "applySir",
      "mliv",
    ]),
    mlivDamageUsd: {
      get() {
        const op = Decimal(this.mliv.damage || 0).div(
          this.quotation.exchangeRate || 0
        );

        this.mliv.damageUsd = op;
        return op;
      },
      set() {},
    },
    mlivBiUsd: {
      get() {
        const op = Decimal(this.mliv.bi || 0).div(
          this.quotation.exchangeRate || 0
        );

        this.mliv.biUsd = op;
        return op;
      },
      set() {},
    },
    mlivStocksUsd: {
      get() {
        const op = Decimal(this.mliv.stocks || 0).div(
          this.quotation.exchangeRate || 0
        );

        this.mliv.stocksUsd = op;
        return op;
      },
      set() {},
    },
    mlivTotal: {
      get() {
        const op = Decimal(this.mliv.damage || 0).add(
          Decimal(this.mliv.bi || 0).add(Decimal(this.mliv.stocks || 0))
        );

        this.mliv.total = op;

        return op;
      },
    },
    mlivTotalUsd: {
      get() {
        const op = Decimal(this.mliv.damageUsd)
          .add(this.mliv.biUsd)
          .add(this.mliv.stocksUsd);

        this.mliv.totalUsd = op;

        return op;
      },
    },
    damageFieldCompleted() {
      return !!(this.mliv.damage && this.mliv.damage > 0);
    },
  },
  watch: {
    mlivDamageUsd: debounce(function (val) {
      this.$v.mliv.damageUsd.$model = val.toNumber();
      this.SET_MLIV_BOUND("damageUsd", val.toNumber());
      this.checkField("damageUsd");
    }, 1000),
    mlivBiUsd: debounce(function (val) {
      this.$v.mliv.biUsd.$model = val.toNumber();
      this.SET_MLIV_BOUND("biUsd", val.toNumber());
      this.checkField("biUsd");
    }, 1000),
    mlivStocksUsd: debounce(function (val) {
      this.$v.mliv.stocksUsd.$model = val.toNumber();
      this.SET_MLIV_BOUND("stocksUsd", val.toNumber());
      this.checkField("stocksUsd");
    }, 1000),
    mlivTotal: debounce(function (val) {
      this.$v.mliv.total.$model = val.toNumber();
      this.SET_MLIV_BOUND("total", val.toNumber());
      this.checkField("total");
    }, 1000),
    mlivTotalUsd: debounce(function (val) {
      this.$v.mliv.totalUsd.$model = val.toNumber();
      this.SET_MLIV_BOUND("totalUsd", val.toNumber());
      this.checkField("totalUsd");
    }, 1000),
    damageFieldCompleted: {
      handler(newValue) {
        this.$emit("damage-field-change", newValue);
      },
      immediate: true,
    },
  },
  methods: {
    ...mapActions(["saveBoundColumn"]),
    ...mapMutations(["SET_MLIV_BOUND"]),
    async checkField(column) {
      this.$v.mliv[column].$touch();
      // console.log(this.$v.mliv[column].$invalid, this.$v.mliv[column].$error);
      if (this.$v.mliv[column].$invalid || this.$v.mliv[column].$error) return;
      await this.saveBoundColumn({
        table: "mainLocation",
        parent: "mliv",
        column,
      });
    },
    formatNumber(value) {
      const formatted = this.formatter.format(value);
      return formatted;
    },
  },
  validations: {
    mliv: {
      damage: { required },
      damageUsd: { required },
      bi: { required },
      biUsd: { required },
      stocks: { required },
      stocksUsd: { required },
      total: { required },
      totalUsd: { required },
    },
  },
};
</script>
<style lang="less" scoped>
@import "~@/assets/style/Subscription/Bound.less";

.Cont {
  width: 100%;
  height: auto;
  margin-top: 17px;

  .ValuesCont {
    width: 40%;
    height: auto;

    //Contenedores principales
    .Line {
      .flex();
      width: 100%;
      height: 55px;
      justify-content: space-between;
      margin-bottom: 5px;
    }
    .Head {
      height: 60px;
      margin-top: 0px;
    }

    //Contenedores de inputs
    .Row {
      .flex();
      width: 40%;
      height: 100%;
    }

    //Atributos especiales
    .Label {
      color: #547fa9;
      width: 15%;
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
  }
}
</style>
