<template>
  <div class="pml-cont flex">
    <div class="title-cont">
      <h5>PML</h5>
    </div>
    <div class="wrapper horizontal-scroll">
      <div class="values-cont">
        <div class="line head border-bottom">
          <div class="input-row input-label" />
          <div class="input-row bold-text">%</div>
          <div class="input-row bold-text">USD</div>
        </div>

        <div class="line">
          <div class="input-row input-label">PML Total</div>
          <div class="input-row">
            <v-text-field
              type="number"
              v-model="pmlProperty.pmlTotal"
              @blur="saveField('pml_total', pmlProperty.pmlTotal)"
              min="0"
              max="100"
              step="1"
            />
          </div>
          <div class="input-row">
            <currency-input
              v-model="pmlTotalUsd"
              :options="currencyOptions"
              suffix="USD"
            />
          </div>
        </div>

        <div class="line border-bottom">
          <div class="input-row input-label bold-text" />
          <div class="input-row bold-text justify-start" />
          <div class="input-row bold-text justify-start">
            {{ formatter.format(pmlTotalUsd) }} USD
          </div>
        </div>
      </div>
    </div>

    <div class="title-text-area">PML Comments</div>
    <textarea
      v-model="pmlProperty.comments"
      @blur="saveField('comments', pmlProperty.comments)"
    ></textarea>
  </div>
</template>
<script>
/* components */
import CurrencyInput from "@/components/CurrencyInput/CurrencyInput.vue";
/* services */
import { getPmlProperty, savePmlProperty } from './services/PmlProperty/pml-property.service'
/* libs */
import Decimal from 'decimal.js'
import numeral from 'numeral'
/* debounce */
import { debounce } from 'lodash';

export default {
  name: "PmlProperty",
  components: { CurrencyInput },
  data () {
    return {
      pmlProperty: {
        limit: 0,
        pmlTotal: 0,
        pmlTotalUsd: 0,
        comments: ""
      },
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
    selectedLimit: {
      get () { return this.pmlProperty.limit },
      set (value) {
        this.pmlProperty.limit = new Decimal(numeral(
          (`${value}` || '$0').replace(/[^0-9.]/g, '')
        ).value() || 0)
      }
    },
    pmlTotalUsd: {
      get () {
        const percent = new Decimal(
          numeral(
            (`${this.pmlProperty.pmlTotal}` || '$0').replace(/[^0-9.]/g, '')
          ).value() || 0
        ).div(100)
        const op = new Decimal(this.selectedLimit || 0).mul(percent)
        this.pmlProperty.pmlTotalUsd = op.toNumber()

        return this.pmlProperty.pmlTotalUsd
      },
      set () { }
    }
  },
  async mounted () {
    this.subscriptionId = this.$route.params?.subscriptionId
    if (this.subscriptionId) {
      const data = await getPmlProperty(this.subscriptionId)
      this.pmlProperty = data?.boundNonPropPmlProperty
      this.selectedLimit = data?.layers?.limit
    }
  },
  methods: {
    async saveField (column, value) {
      if (this.subscriptionId)
        await savePmlProperty(this.subscriptionId, column, value);
    },
  },
  watch: {
    'pmlProperty.pmlTotalUsd': debounce(function (value) {
      this.saveField('pml_total_usd', value)
    }, 1000),
  }
};
</script>
<style lang="less" scoped>
@import '~@/assets/style/Subscription/BoundRefactored.less';

.pml-cont {
  width: 100%;
  height: auto;
  flex-wrap: wrap;
  justify-content: center;
  align-items: flex-start;

  .title-cont {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: wrap;
    margin-top: 30px;
  }

  .wrapper {
    margin: 0 auto 30px;
    width: 100%;
    padding: 20px 0;
  }

  .values-cont {
    width: 100%;
    height: auto;
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    justify-content: center;
    flex: 1 1 auto;
    //Contenedores principales
    .line {
      .flex();
      width: 100%;
      height: 55px;
      justify-content: center;
      margin-bottom: 5px;
      gap: 1%;
    }
    .head {
      height: 60px;
      margin-top: 0px;
    }

    //Contenedores de inputs
    .input-row {
      .flex();
      width: 25%;
      height: 100%;
    }

    //Atributos especiales
    .input-label {
      color: #547fa9;
      width: 20%;
      justify-content: flex-end;
      font-size: 14px;
    }
    .bold-text {
      font-weight: 700;
      font-size: 16px;
    }
    .border-bottom {
      border-bottom: solid 1px #d2deed;
    }
  }

  textarea {
    height: 90px;
  }
}
@media (max-width: 650px) {
  .pml-cont {
    .wrapper {
      overflow-x: scroll;
      overflow-y: hidden;
      width: 90%;
    }
    .values-cont {
      width: 500px;
      .input-row {
        width: 40%;
      }
    }
  }
}
</style>
