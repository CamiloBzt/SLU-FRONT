<template>
  <div class="input-line mt-4">
    <v-col cols="12" sm="6" md="6">
      <v-select
        v-model.trim="sublimit.otherDeductiblesSelect"
        @blur="
          saveField('other_deductibles_select', sublimit.otherDeductiblesSelect)
        "
        :items="otherDeductibles"
        item-text="data"
        item-value="id"
        clearable
      ></v-select>
    </v-col>
    <v-col cols="12" sm="6" md="2">
      <currency-input
        v-model.trim="sublimit.otherDeductiblesValue"
        @blur="
          saveField('other_deductibles_value', sublimit.otherDeductiblesValue)
        "
        label="Original Currency"
        :options="currencyOptions"
      />
    </v-col>
    <v-col cols="12" sm="6" md="2">
      <currency-input
        v-model.trim="otherDeductiblesValueUsd"
        label="USD"
        disabled
        :options="currencyOptions"
      />
    </v-col>
    <!-- botón de eliminado (debug only) -->
    <v-icon
      small
      @click="$emit('deleteSublimit', sublimit.id, index)"
      class="mt-4"
    >
      mdi-minus-circle
    </v-icon>
  </div>
</template>

<script>
/* libs */
import { debounce } from "lodash";
import Decimal from "decimal.js";
import numeral from "numeral";
/* components */
import CurrencyInput from "@/components/CurrencyInput/CurrencyInput.vue";
/* service */
import { saveSublimit } from "./services/SublimesQuotator/sublimit-quotator.service";

export default {
  name: "SublimitsQuotator",
  components: { CurrencyInput },
  props: {
    sublimit: {
      type: Object,
      required: true,
    },
    index: {
      type: [Number, String, Symbol],
      required: true,
    },
    otherDeductibles: {
      type: Array,
      required: true,
    },
  },
  inject: ["quotation"],
  data: () => ({
    currencyOptions: {
      currency: "MXN",
      currencyDisplay: "narrowSymbol",
      locale: "en-US",
    },
  }),
  computed: {
    otherDeductiblesValueUsd: {
      get() {
        const op = new Decimal(
          numeral(
            (`${this.sublimit.otherDeductiblesValue}` || "$0").replace(
              /[^0-9.]/g,
              ""
            )
          ).value() || 0
        ).div(this.quotation.exchangeRate);
        this.sublimit.otherDeductiblesValueUsd = op.toNumber();

        return this.sublimit.otherDeductiblesValueUsd;
      },
      set() {},
    },
  },
  methods: {
    async saveField(column, value) {
      await saveSublimit(this.sublimit.id, column, value);
    },
  },
  watch: {
    otherDeductiblesValueUsd: {
      handler: debounce(function (value) {
        this.saveField("other_deductibles_value_usd", value);
      }, 1000),
      deep: true,
    },
  },
};
</script>
