<template>
  <div class="outter-wrapper">
    <div class="content">
      <div class="input-row">
        <div class="inner-title">Movement Values</div>
        <div v-for="(item, clave) in movementValuesComputed" :key="clave" class="input-col">
          <div class="column-title">
            {{ item.name }}
          </div>

          <div class="input-cont">
            <currency-input v-model="item.damage" label="Damage" :options="currencyOptions"
              @blur="($event) => { item.damage = changeHandler(item.id, item.damage, 'damage') }"
              :disabled="item.name == 'USD'" />
          </div>
          <div class="input-cont">
            <currency-input v-model="item.bi" label="Bi"
              @blur="($event) => { item.bi = changeHandler(item.id, item.bi, 'bi') }" :options="currencyOptions"
              :disabled="item.name == 'USD'" />
          </div>
          <div class="input-cont">
            <currency-input v-model="item.stocks" label="Stocks"
              @blur="($event) => { item.stocks = changeHandler(item.id, item.stocks, 'stocks') }"
              :options="currencyOptions" type="number" :disabled="item.name == 'USD'" />
          </div>
        </div>
      </div>
      <div v-if="showTotalValues" class="input-row">
        <div class="inner-title">Total Values</div>
        <div v-for="(item, id) in movementValuesComputed" :key="id" class="input-col">
          <div class="column-title">
            {{ item.name }}
          </div>

          <div class="input-cont">
            <currency-input v-model="item.totalDamage" label="Damage" :options="currencyOptions" disabled />
          </div>
          <div class="input-cont">
            <currency-input v-model="item.totalBi" label="Bi" :options="currencyOptions" disabled />
          </div>
          <div class="input-cont">
            <currency-input v-model="item.totalStocks" label="Stocks" :options="currencyOptions" disabled />
          </div>
        </div>
        <div class="input-col">
          <div class="column-title">Porcent apply stock</div>

          <div class="input-cont">
            <v-text-field
              v-model="porcentComputed"
              type="number"
              label="Porcent"
              prefix="%"
              suffix="%"
            />
          </div>
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
    insurableRiskData: { type: Object },
  },
  data() {
    return {
      insurableRisk: {},
      porcent: 0,
      values: [
        {
          id: 1,
          name: "Original Currency",
          damage: 0,
          bi: 0,
          stocks: 0,
          totalDamage: 0,
          totalBi: 0,
          totalStocks: 0,
        },
        {
          id: 2,
          name: "USD",
          damage: 0,
          bi: 0,
          stocks: 0,
          totalDamage: 0,
          totalBi: 0,
          totalStocks: 0,
        },
        {
          id: 3,
          name: "Rate",
          damage: 0,
          bi: 0,
          stocks: 0,
          totalDamage: 0,
          totalBi: 0,
          totalStocks: 0,
        },
        {
          id: 4,
          name: "Premium",
          damage: 0,
          bi: 0,
          stocks: 0,
          totalDamage: 0,
          totalBi: 0,
          totalStocks: 0,
        },
        {
          id: 5,
          name: "Premium USD",
          damage: 0,
          bi: 0,
          stocks: 0,
          totalDamage: 0,
          totalBi: 0,
          totalStocks: 0,
        },
      ],
      movementValues: [],
      currencyOptions: {
        currency: 'MXN',
        currencyDisplay: 'narrowSymbol',
        locale: 'en-US',
      },
      valueOnUsd: 20,
      exchangeRate: 20,
    };
  },
  watch: {
    /* // Probablermente es watch no sea necesario
    insurableRiskData: function (val) {
      this.insurableRisk = val;
    }*/
  },
  computed: {
    porcentComputed: {
      get() {
        return this.porcent = this.insurableRisk.porcentaje;
      },
      set() { },
    },
    movementValuesComputed: {
      get() {
        if (this.type === 'Inclusion Risk') {
          return this.movementValues = [
            {
              id: 1,
              name: "Original Currency",
              damage: 0,
              bi: 0,
              stocks: 0,
              totalDamage: this.insurableRisk.property_damage,
              totalBi: this.insurableRisk.business_interruption,
              totalStocks: this.insurableRisk.stock,
            },
            {
              id: 2,
              name: "USD",
              damage: 0,
              bi: 0,
              stocks: 0,
              totalDamage: this.insurableRisk.property_damage_usd,
              totalBi: this.insurableRisk.business_interruption_usd,
              totalStocks: this.insurableRisk.stock_usd,
            },
          ]
        }
        if (this.type === 'Exclusion Risk') {
          return this.movementValues = [
            {
              id: 1,
              name: "Original Currency",
              damage: 0,
              bi: 0,
              stocks: 0,
              totalDamage: this.insurableRisk.property_damage,
              totalBi: this.insurableRisk.business_interruption,
              totalStocks: this.insurableRisk.stock,
            },
            {
              id: 2,
              name: "USD",
              damage: 0,
              bi: 0,
              stocks: 0,
              totalDamage: this.insurableRisk.property_damage_usd,
              totalBi: this.insurableRisk.business_interruption_usd,
              totalStocks: this.insurableRisk.stock_usd,
            },
          ]
        }
        if (this.type === 'Extension') {
          return this.movementValues = [
            {
              id: 1,
              name: "Original Currency",
              damage: 0,
              bi: 0,
              stocks: 0,
              totalDamage: 0,
              totalBi: 0,
              totalStocks: 0,
            },
            {
              id: 2,
              name: "USD",
              damage: 0,
              bi: 0,
              stocks: 0,
              totalDamage: 0,
              totalBi: 0,
              totalStocks: 0,
            },
          ]
        }
        if (this.type === 'Deductions Change') {
          return this.movementValues = [
            {
              id: 2,
              name: "USD",
              damage: 0,
              bi: 0,
              stocks: 0,
              totalDamage: 0,
              totalBi: 0,
              totalStocks: 0,
            },
            {
              id: 3,
              name: "Rate",
              damage: 0,
              bi: 0,
              stocks: 0,
              totalDamage: 0,
              totalBi: 0,
              totalStocks: 0,
            },
          ]
        }
        if (this.type === 'Withouth Premium') {
          return this.movementValues = [
            {
              id: 2,
              name: "USD",
              damage: 0,
              bi: 0,
              stocks: 0,
              totalDamage: 0,
              totalBi: 0,
              totalStocks: 0,
            },
            {
              id: 3,
              name: "Rate",
              damage: 0,
              bi: 0,
              stocks: 0,
              totalDamage: 0,
              totalBi: 0,
              totalStocks: 0,
            },
          ]
        };
      },
      set() { },
    },
  },
  async beforeMount() {
    if (this.insurableRiskData) {
      this.insurableRisk = this.insurableRiskData
    }
    this.files = await getFiles();

    switch (this.type) {
      case "Inclusion Risk":
        this.movementValues = this.values.slice(0, 2);
        console.log(this.movementValues);
        break;
      case "Exclusion Risk":
        this.movementValues = this.values.slice(0, 2);
        break;
      case "Extension":
        this.movementValues = this.values.slice(0, 2);
        break;
      case "Deductions Change":
        this.movementValues = this.values.slice(1, 2);
        break;
      case "Withouth Premium":
        this.movementValues = this.values.slice(1, 2);
        break;
      case "Change of Share":
        this.movementValues = this.values.slice(1, 2);
        break;
      case "Internal Adjustment":
        this.movementValues = this.values.slice(1, 2);
        break;
      default:
        this.movementValues = this.values;
    }
  },

  methods: {
    calculateUSD() {

    },
    reciboLllamada() {
      this.$emit('onResultados', this.movementValuesComputed);
    },
    changeHandler(id, value, concept) {

      switch (id) {
        case 1: // Original currency action
          switch (concept) {
            case 'damage':
              this.movementValuesComputed[1].damage = Decimal(!value ? 0 : Decimal(value)).div(
                Decimal(this.exchangeRate || 0));
              return value;

            case 'bi':
              this.movementValuesComputed[1].bi = Decimal(!value ? 0 : Decimal(value)).div(
                Decimal(this.exchangeRate || 0));
              return value;

            case 'stocks':
              this.movementValuesComputed[1].stocks = Decimal(!value ? 0 : Decimal(value)).div(
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
  align-items: flex-start;
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
