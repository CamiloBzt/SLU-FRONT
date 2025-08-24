<template>
  <div class="outter-wrapper">
    <div class="endorsement-wrapper">
      <!-- <v-expansion-panel-content> -->
      <div class="content justify-center">
        <!--Cat Sublimes-->
        <div class="TitleCont d-flex justify-start align-center">
          <h5>Cat Sublimits</h5>
        </div>

        <div class="CatCont d-flex justify-start align-center">
          <div class="InputRow">
            <!--Label-->
            <div class="Label">Coverage B Earthquake, Tremor or volcanic Eruption</div>

            <!--Input-->
            <div class="InputCont">
              <v-select v-model.trim="boundSublimes.sublimits1" @blur="" :items="sublimits" item-text="data" item-value="id" clearable :disabled="sublimits.length === 0"> </v-select>
            </div>
          </div>

          <div class="InputRow">
            <!--Label-->
            <div class="Label">Coverage C Hydrometeorological risk</div>

            <!--Input-->
            <div class="InputCont">
              <v-select v-model.trim="boundSublimes.sublimits2" @blur="" :items="sublimits" item-text="data" item-value="id" clearable :disabled="sublimits.length === 0"> </v-select>
            </div>
          </div>
        </div>

        <!--All Other Sublimits-->
        <div class="TitleCont d-flex justify-start align-center">
          <h5>All Other Sublimits</h5>
        </div>

        <div class="SublimitsCont d-flex align-start flex-wrap">
          <div class="Line" v-for="(item, index) in boundSublimitsEng" :key="index">
            <div class="RowLarge">
              <v-select v-model.trim="item.endosoSelect" :items="endoso" item-text="data" item-value="id" clearable :disabled="endoso.length === 0"> </v-select>
            </div>

            <div class="Row">
              <currency-input v-model.trim="item.endosoText" label="Original Currency" @blur="" @change="" :options="currencyOptions" />
            </div>

            <div class="Row">
              <!-- v-model.trim="item.endosoUSD.$model" -->
              <currency-input v-model.trim="computedUsd[index]" label="USD" disabled @input="" @blur="" :options="currencyOptions" />
            </div>

            <!-- botón de eliminado (debug only) -->
            <v-icon small @click="removeField(index)" class="mt-4"> mdi-minus-circle </v-icon>
          </div>
        </div>

        <!--Boton para añadir sublimits-->
        <div class="ButtonCont">
          <v-btn class="Btn" text rounded @click="addSublimits()">
            <v-icon class="mr-2"> mdi-plus-circle </v-icon>
            Add Sublimits
          </v-btn>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { stateExpansiveManager } from "@/mixins/subscription.js";
/* service */
import catalogService from "../services/catalog.service";
/* components */
import CurrencyInput from "@/components/CurrencyInput/CurrencyInput.vue";
/* validations */
import { required } from "vuelidate/lib/validators";
/* numbers */
import Decimal from "decimal.js";
import numeral from "numeral";

export default {
  name: "Sublimes",
  mixins: [stateExpansiveManager],
  components: { CurrencyInput },
  props: {
    boundSublimes: Object,
    quotation: Object,
    boundSublimitsEng: Array,
  },
  data() {
    return {
      currencyOptions: {
        currency: "MXN",
        currencyDisplay: "narrowSymbol",
        locale: "en-US",
      },

      sublimits: [],
      endoso: [],
    };
  },
  async beforeMount() {
    this.sublimits = await catalogService.getSublimits();
    this.endoso = await catalogService.getEndoso();
  },
  computed: {
    computedUsd: {
      get() {
        //console.log('entoro');
        const arr = this.boundSublimitsEng.map((i) => {
          const mynumber = new Decimal(numeral((`${i.endosoText}` || "$0").replace(/[^0-9.]/g, "")).value() || 0);
          const op = mynumber.div(numeral(this.quotation.exchangeRate || 0).value() || 0);
          return op.toNumber();
        });
        return arr;
      },
    },
  },
  async mounted() {},
  methods: {
    addSublimits() {
      const id = this.boundSublimitsEng[this.boundSublimitsEng.length - 1].id + 1;
      this.boundSublimitsEng.push({
        id,
        endosoSelect: "",
        endosoText: "",
        endosoUsd: "",
      });
    },
    removeField(index) {
      const id = this.boundSublimitsEng[index].id;
      this.boundSublimitsEng.splice(index, 1);
    },
    numberWithDotsElement(e) {
      let val = e.target.value;
      let onlyNumbers = val.toString().replace(/[^0-9]+/g, "");
      let newVal = /^\d+$/.test(onlyNumbers) ? onlyNumbers.replace(/\B(?=(\d{3})+(?!\d))/g, ".") : "";
      e.target.value = newVal;
    },
  },
  validations: {
    boundSublimes: {
      sublimits1: { required },
      sublimits2: { required },
    },
    boundSublimitsEng: {
      $each: {
        endosoSelect: { required },
        endosoText: { required },
        endosoUsd: { required },
      },
    },
  },
};
</script>
<style lang="less" scoped>
@import "~@/assets/style/AccordionStyle.less";
@import "~@/assets/style/Subscription/Bound.less";

.outter-wrapper {
  width: 100%;
  margin-top: 28px;
}

.endorsement-wrapper {
  width: 100%;
  height: auto;
  border-radius: 5px;
  background: white;
  //box-shadow: 8px 8px 12px rgba(10, 63, 102, 0.15);
  margin-top: 28px;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-content: center;
  padding: 0 20px;

  @media (max-width: 650px) {
    overflow-x: auto !important;
  }

  //CABEZA DE LA TABLA

  .content {
    width: 100%;
    height: auto;
    padding: 24px 24px 16px;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    align-content: flex-start;
    flex-wrap: wrap;

    .button-cont {
      width: 100%;
      height: auto;
      margin-top: 20;
      display: flex;
      justify-content: flex-end;
      align-items: center;

      .blue-btn {
        color: white;
        width: 200px;
        height: 35px;
        background: #003d6d;
        font-size: 15px;
        font-weight: 500;
        letter-spacing: normal;
        text-transform: capitalize;
      }

      .clear-btn {
        width: 200px;
        height: 35px;
      }
    }
  }

  .v-btn {
    justify-content: flex-start !important;
    color: #003d6d;
    border-radius: 5px;
  }
}

.CatCont {
  width: 100%;
  height: auto;

  .InputRow {
    .flex();
    width: 30%;
    height: auto;
    margin-right: 1%;
    flex-wrap: wrap;
    align-content: flex-start;
    align-items: flex-start;
    margin-top: 15px;

    .Label {
      width: 100%;
      font-size: 14px;
      color: #547fa9;
      margin-bottom: 15px;
    }

    .InputCont {
      width: 100%;
      height: 50px;
      margin-top: -15px;
    }
  }
}

.SublimitsCont {
  width: 80%;
  height: auto;

  .Line {
    .flex();
    width: 100%;
    height: 50px;
    justify-content: space-between;

    .RowLarge {
      width: 73%;
      height: 100%;
    }

    .Row {
      width: 25%;
      height: 100%;
    }
  }
}

.ButtonCont {
  margin-top: 40px;
}
</style>
