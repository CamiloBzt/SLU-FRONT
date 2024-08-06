<template>
  <div class="input-line mt-4">
    <div class="row-large">
      <v-select
        v-model.trim="sublimit.otherDeductiblesSelect"
        @blur=""
        :items="otherDeductibles"
        item-text="data"
        item-value="id"
        clearable
      ></v-select>
    </div>
    <div class="line-row">
      <currency-input
        v-model.trim="sublimit.otherDeductiblesValue"
        @blur=""
        label="Original Currency"
        :options="currencyOptions"
      />
    </div>
    <div class="line-row">
      <currency-input
        v-model.trim="otherDeductiblesValueUsd"
        label="USD"
        disabled
        :options="currencyOptions"
      />
    </div>
    <!-- botón de eliminado (debug only) -->
    <v-icon
      small
      @click="$emit('deleteSublimit', sublimit.id)"
      class="mt-4"
    >
      mdi-minus-circle
    </v-icon>
  </div>
</template>

<script>
/* libs */
import { debounce } from 'lodash';
import Decimal from 'decimal.js';
import numeral from 'numeral'
/* components */
import CurrencyInput from "@/components/CurrencyInput/CurrencyInput.vue";
/* service */
// import { saveSublimit } from './services/SublimesQuotator/sublimit-quotator.service'

export default {
  name: "SublimitsQuotator",
  components: { CurrencyInput },
  props: {
    sublimit: {
      type: Object,
      required: true
    },
    index: {
      type: [Number, String, Symbol],
      required: true
    },
    otherDeductibles: {
      type: Array,
      required: true
    },
    exchangeRate: {
      type:Number,
    }
  },
  //inject: ['quotation'],
  data: function(){
    return {
    currencyOptions: {
      currency: "MXN",
      currencyDisplay: "narrowSymbol",
      locale: "en-US",
    },

    quotation: {
        exchangeRate: this.exchangeRate,
      },

  }
  },
  computed: {
    otherDeductiblesValueUsd: {
      get () {
        const op = new Decimal(numeral(
          (`${this.sublimit.otherDeductiblesValue}` || '$0').replace(/[^0-9.]/g, '')
        ).value() || 0).div(this.quotation.exchangeRate);
        this.sublimit.otherDeductiblesValueUsd = op.toNumber();

        return this.sublimit.otherDeductiblesValueUsd
      }, set () { }
    }
  },
  methods: {
    // async saveField (column, value) {
    //   await saveSublimit(this.sublimit.id, column, value);
    // },
  },
  watch: {
    // 'otherDeductiblesValueUsd': {
    //   handler: debounce(function (value) {
    //     this.saveField('other_deductibles_value_usd', value)
    //   }, 1000),
    //   deep: true
    // }
  },
}
</script>
