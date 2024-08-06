<template>
  <div class="outter-wrapper">
    <div class="content">
      <div class="input-row">
        <div class="inner-title">Movement Values</div>
        <div v-for="(item, clave) in movementValuesComputed" :key="clave" class="input-col">
          <div @click="testi(item)" class="column-title">
            {{ item.name }}
          </div>

          <div class="input-cont">
            <currency-input v-model="item.allRisk" label="All Risk" :options="currencyOptions"
              @blur="($event) => { item.allRisk = changeHandler(item.id, item.allRisk, 'allRisk') }"
              :disabled="item.name == 'USD'" />
          </div>
          <div class="input-cont">
            <currency-input v-model="item.alop" label="ALOP"
              @blur="($event) => { item.alop = changeHandler(item.id, item.alop, 'alop') }" :options="currencyOptions"
              :disabled="item.name == 'USD'" />
          </div>
          <!--<div class="input-cont">
            <currency-input v-model="item.stocks" label="Stocks"
              @blur="($event) => { item.stocks = changeHandler(item.id, item.stocks, 'stocks') }"
              :options="currencyOptions" type="number" :disabled="item.name == 'USD'" />
          </div> -->
        </div>
      </div>
      <div v-if="showTotalValues" class="input-row">
        <div class="inner-title">Total Values</div>
        <div v-for="(item, id) in movementValuesComputed" :key="id" class="input-col">
          <div class="column-title">
            {{ item.name }}
          </div>

          <div class="input-cont">
            <currency-input v-model="item.totalAllRisk" label="All Risk" :options="currencyOptions" disabled />
          </div>
          <div class="input-cont">
            <currency-input v-model="item.totalAlop" label="ALOP" :options="currencyOptions" disabled />
          </div>
          <!--<div class="input-cont">
            <currency-input v-model="item.totalStocks" label="Stocks" :options="currencyOptions" disabled />
          </div>
        </div>
        <div class="input-col">
          <div class="column-title">Porcent apply stock</div>

          <div class="input-cont">
            <currency-input v-model="porcentComputed" label="Porcent" :options="currencyOptions" />
          </div>-->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
/* components */
import CurrencyInput from "@/components/CurrencyInput/CurrencyInput.vue";
import AppFile from "../../components/AppFile.vue";
/* services */
import { getFiles } from "../../services/mock-files.service";

import Decimal from 'decimal.js';

export default {
  name: "MovementsValue",
  components: {
    AppFile,
    CurrencyInput,
  },
  props: {
    type: { type: String, default: "Inclusion Risk" },
    showTotalValues: { type: Boolean, default: true },
    accountComplete: { type: Object },
  },
  data() {
    return {
      porcent: 0,

      movementValues: [],
      currencyOptions: {
        currency: 'MXN',
        currencyDisplay: 'narrowSymbol',
        locale: 'en-US',
      },
      valueOnUsd: 20,
      exchangeRate: this.accountComplete.deductibles.exchangeRate,
    };
  },
  watch: {},
  computed: {
    movementValuesComputed: {
      get() {
        if (this.type === 'Inclusion Risk') {
          return this.movementValues = [
            {
              id: 1,
              name: "Original Currency",
              allRisk: 0,
              alop: 0,
              totalAllRisk: this.accountComplete.tiv.insurable.allRisk,
              totalAlop: this.accountComplete.tiv.insurable.alop
            },
            {
              id: 2,
              name: "USD",
              allRisk: 0,
              alop: 0,
              totalAllRisk: this.accountComplete.tiv.insurable.allRiskUsd,
              totalAlop: this.accountComplete.tiv.insurable.alopUsd
            },
          ]
        }
        if (this.type === 'Exclusion Risk') {
          return this.movementValues = [
            {
              id: 1,
              name: "Original Currency",
              allRisk: 0,
              alop: 0,
              totalAllRisk: this.accountComplete.tiv.insurable.allRisk,
              totalAlop: this.accountComplete.tiv.insurable.alop
            },
            {
              id: 2,
              name: "USD",
              allRisk: 0,
              alop: 0,
              totalAllRisk: this.accountComplete.tiv.insurable.allRiskUsd,
              totalAlop: this.accountComplete.tiv.insurable.alopUsd
            },
          ]
        }
        if (this.type === 'Extension') {
          return this.movementValues = [
            {
              id: 1,
              name: "Original Currency",
              allRisk: 0,
              alop: 0,
              totalAllRisk: 0,
              totalAlop: 0
            },
            {
              id: 2,
              name: "USD",
              allRisk: 0,
              alop: 0,
              totalAllRisk: 0,
              totalAlop: 0
            },
          ]
        }
        if (this.type === 'Deductions Change') {
          return this.movementValues = [
            {
              id: 1,
              name: "Original Currency",
              allRisk: 0,
              alop: 0,
              totalAllRisk: 0,
              totalAlop: 0
            },
            {
              id: 2,
              name: "USD",
              allRisk: 0,
              alop: 0,
              totalAllRisk: 0,
              totalAlop: 0
            },
          ]
        }
        if (this.type === 'Withouth Premium') {
          return this.movementValues = [
            {
              id: 1,
              name: "Original Currency",
              allRisk: 0,
              alop: 0,
              totalAllRisk: 0,
              totalAlop: 0
            },
            {
              id: 2,
              name: "USD",
              allRisk: 0,
              alop: 0,
              totalAllRisk: 0,
              totalAlop: 0
            },
          ]
        };
      },
      set() { },
    },
  },
  async beforeMount() { },

  methods: {
    testi(item) {
      console.log('ITEM', item)
    },
    calculateUSD() {

    },
    reciboLllamada() {
      this.$emit('onResultados', this.movementValuesComputed);
    },
    changeHandler(id, value, concept) {
      console.log('changeHandler', {
        id, value, concept
      })
      switch (id) {
        case 1: // Original currency action
          switch (concept) {
            case 'allRisk':
              this.movementValuesComputed[1].allRisk = Decimal(!value ? 0 : Decimal(value)).div(
                Decimal(this.exchangeRate || 0));
              return value;
            case 'alop':
              this.movementValuesComputed[1].alop = Decimal(!value ? 0 : Decimal(value)).div(
                Decimal(this.exchangeRate || 0));
              return value;
          }
        case 2: // USD action
          return 29;
        case 3: // Rate action
          this.movementValues = this.values.slice(1, 2);
          break;
        case 4: //
          this.movementValues = this.values.slice(1, 2);
          break;
        case 5:
          this.movementValues = this.values.slice(1, 2);
          break;
        default:
          this.movementValues = this.values;
      }

    },
  },
};
</script>
<style lang="less" scoped>
@import "~@/assets/style/AccordionStyle.less";

.outter-wrapper {
  width: 100%;
}

.input-row {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-content: center;
  align-items: center;
  justify-content: flex-start;
}

.input-col {
  width: 20%;
  display: block;
  margin-right: 30px;
}

.input-cont {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  align-content: center;
  margin: 5px 0;
}

.input-title {
  width: 100%;
}

.inner-title {
  width: 100%;
  font-size: 20px;
  font-weight: 800;
  margin: 15px 0;
}

.column-title {
  font-size: 16px;
  font-weight: 800;
}

.v-sheet.v-stepper:not(.v-sheet--outlined) {
  box-shadow: none !important;
}

.v-stepper__step__step {
  display: none !important;
}

.v-stepper__label {
  color: #547fa9;
  font-weight: 800;
}

.v-application .primary {
  background-color: #586675 !important;
  border-color: #1c2b39 !important;
}

.theme--light.v-stepper .v-stepper__step:not(.v-stepper__step--active):not(.v-stepper__step--complete):not(.v-stepper__step--error) .v-stepper__step__step {
  background: rgb(186, 34, 34);
}

.v-stepper__header {
  justify-content: center;
  box-shadow: none;
}
</style>
