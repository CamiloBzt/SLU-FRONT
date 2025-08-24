<template>
  <div>
    <!-- <v-expansion-panels class="sub-expansion-component"> -->
    <!-- <v-expansion-panel> -->
    <!-- <v-expansion-panel-header
        @click="changeSubExpansion"
        class="expansion-title d-flex justify-start"
        expand-icon=""
      > -->
    <!-- <template v-slot:actions> -->
    <div class="sub-icon-cont d-flex justify-start align-center">
      <!-- <v-icon class="icon-expand mr-1">
        {{ iconSubExpansion }}
      </v-icon> -->
      <div class="sub-expansion-title">
        Sublime {{ sublimeIndex + 1 }}
      </div>
    </div>
    <!-- </template> -->
    <!-- </v-expansion-panel-header> -->

    <!-- <v-expansion-panel-content> -->
    <div class="expand-content justify-center">
      <!--Location-->
      <div class="title-cont d-flex justify-space-between align-center">
        <h5>Location</h5>
        <v-btn text rounded @click="deleteSublime(sublime.catSublimes.id)">
          <v-icon> mdi-delete </v-icon>
          Delete This Location
        </v-btn>
      </div>
      <div class="cat-cont">
        <div class="input-row">
          <v-text-field v-model.trim="item.location" @blur="onCatSublimeChange" />
        </div>
      </div>

      <!--Cat Sublimes title-->
      <div class="title-cont d-flex justify-start align-center">
        <h5>Cat Sublimits</h5>
      </div>
      <v-row class="mt-4">
        <v-col :cols="12" sm="6">
          <div class="input-row">
            <!--sublime-label-->
            <div class="sublime-label">
              Coverage B Earthquake, Tremor or volcanic Eruption
            </div>

            <!--Input-->
            <div class="w-100">
              <v-select v-model.trim="item.sublimits1" @blur="onCatSublimeChange" :items="items" item-text="data" item-value="id" clearable
                :disabled="disabled"></v-select>
            </div>
          </div>
        </v-col>
        <v-col :cols="12" sm="6" v-if="true">
          <div class="input-row">
            <!--sublime-label-->
            <div class="sublime-label">Valor numérico</div>
            <div class="sublime-input">
              <currency-input v-model.trim="item.sublimits_value1" @blur="onCatSublimeChange" :options="currencyOptions" />
            </div>
          </div>
        </v-col>
        <v-col :cols="12" sm="6">
          <div class="input-row">
            <!--sublime-label-->
            <div class="sublime-label">
              Coverage C Hydrometeorological risk
            </div>
            <!--Input-->
            <div class="w-100">
              <v-select v-model.trim="item.sublimits2" @blur="onCatSublimeChange" :items="items" item-text="data" item-value="id" clearable
                :disabled="disabled" />
            </div>
          </div>
        </v-col>
        <v-col :cols="12" sm="6" v-if="true">
          <div class="input-row">
            <!--sublime-label-->
            <div class="sublime-label">Valor Default</div>
            <!--Input-->
            <div class="sublime-input">
              <currency-input v-model.trim="item.sublimits_value2" :options="currencyOptions" @blur="onCatSublimeChange" />
            </div>
          </div>
        </v-col>
      </v-row>

      <!--All Other Sublimits-->
      <div class="title-cont d-flex justify-start align-center">
        <h5>All Other Sublimits</h5>
      </div>
      <div class="wrapper horizontal-scroll">

        <div class="sublimits-cont">
          <SublimitsQuotator v-for="(subitem, index) in SublimitsArray" @deleteSublimit="deleteSublimit"
            :otherDeductibles="otherDeductibles" :sublimit="subitem" :index="index" :key="index" :exchangeRate="exchangeRate" />
        </div>

      </div>

      <!--Boton para añadir sublimits-->
      <div class="button-cont">
        <v-btn class="Btn" text rounded @click="addSublimit">
          <v-icon class="mr-2"> mdi-plus-circle </v-icon>
          Add Sublimits
        </v-btn>
      </div>
    </div>
    <!-- </v-expansion-panel-content> -->
    <!-- </v-expansion-panel> -->
    <!-- </v-expansion-panels> -->
  </div>
</template>
<script>
import { stateExpansiveManager } from "@/mixins/subscription.js";
/* components */
import SublimitsQuotator from "./SublimitsQuotator.vue";
import CurrencyInput from "@/components/CurrencyInput/CurrencyInput.vue";
/* services */
import { getCatalog, saveSublime } from '@/components/subscription/bound/propertyQuotatorNonProportional/services/SublimesQuotator/sublime-quotator.service'
// import { saveSublimit, getSublimits, addSublimit } from './services/SublimesQuotator/sublimit-quotator.service'

export default {
  name: "SublimesQuotatorNonProportional",
  mixins: [stateExpansiveManager],
  components: { CurrencyInput, SublimitsQuotator },
  data() {
    const catSublimes = this.sublime.catSublimes
    const allOtherSublimits = this.sublime.allOtherSublimits;
    return {
      inputValue: "",
      USD: 10.0,
      otherDeductibles:[],
      SublimitsArray:allOtherSublimits.map((s, index) => {
        return {
          id: index +1,
          otherDeductiblesSelect:s.other_deductibles_select,
          otherDeductiblesValue:s.other_deductibles_value,
          
        }
      }),

      items: [],
      otherItems: [],
      disabled: false,
      currencyOptions: {
        currency: "MXN",
        currencyDisplay: "narrowSymbol",
        locale: "en-US",
      },

      item: {
        ...catSublimes,
      },

    };
  },
  props: {
    sublimeIndex: {
      type: String | Number,
      required: true
    },
    technicalConditions: {
      type:Object,
    },
    sublime: {
      type:Object,
    },
    exchangeRate: {
      type:Number,
    }
  },
  // inject: ['subscription'],
  async beforeMount() {
    this.items = await getCatalog('sublimits')
    this.otherDeductibles = await getCatalog('other_deductibles')
    // this.SublimitsArray = await getSublimits(this.item.id);
  },
  methods: {
    deleteSublime(id){
      this.$emit('deleteThisSublimeLocation', id)
    },
    onCatSublimeChange(){
      this.$emit("setTechnicalConditionsUpdate", {catSublimes: this.item});
    },

    onAllOtherSublimitsChange(){
      const allOtherSublimits = this.SublimitsArray.map(s => {
        return {
          other_deductibles_select: s.otherDeductiblesSelect,
          other_deductibles_value: s.otherDeductiblesValue,
          other_deductibles_value_usd: (s.otherDeductiblesValue / this.exchangeRate),
        }
      });
      this.$emit("setTechnicalConditionsUpdate", {allOtherSublimits});
    },

    addSublimit(){

      const highestId = this.SublimitsArray.reduce((prev, current) => {
        return (current.id > prev) ? current.id : prev;
      }, 0);

      this.SublimitsArray.push({
          id: highestId +1,
          otherDeductiblesSelect:0,
          otherDeductiblesValue:0,
          
        })
    },

    // async saveField (column, value) {
    //   await saveSublime(this.item.id, column, value);
    // },
    // async addSublimit () {
    //   const data = await addSublimit(this.item.id, this.subscription.subscriptionId)
    //   if (data) this.SublimitsArray = await getSublimits(this.item.id);
    // },
    deleteSublimit(id) {
      this.SublimitsArray = this.SublimitsArray.filter(s => s.id !== id)
    },
  },
  watch:{
    SublimitsArray: {
      deep:true,
      handler() {
        this.onAllOtherSublimitsChange();
      },
    }
  }
};
</script>
<style lang="less" scoped>
@import '~@/assets/style/AccordionStyleRefactored.less';
@import '~@/assets/style/Subscription/BoundRefactored.less';

.sublime-label {
  width: 100%;
  font-size: 14px;
  color: #547fa9;
  min-height: 45px;
}

.sublime-input {
  width: 30%;

  @media (max-width: 900px) {
    width: 100%;
  }
}

.cat-cont {
  width: 100%;
  height: auto;
  display: flex;
  justify-content: flex-start;
  align-items: center;

  .input-row {
    .flex();
    width: auto;
    height: auto;
    margin-right: 1%;
    flex-wrap: wrap;
    align-content: flex-start;
    align-items: flex-start;
    margin-top: 15px;

    .input-cont {
      width: 100%;
      height: 50px;
      margin-top: -15px;
    }
  }
}

.wrapper {
  margin: auto;
  overflow-x: hidden;
  overflow-y: hidden;
  width: 90%;
  padding: 20px 0;
}

.sublimits-cont {
  width: 100%;
  height: auto;
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;

  .input-line {
    .flex();
    width: 100%;
    height: 50px;
    justify-content: space-between;

    .row-large {
      width: 73%;
      height: 100%;
    }

    .line-row {
      width: 25%;
      height: 100%;
    }
  }
}

.button-cont {
  margin-top: 40px;
}

@media (max-width: 900px) {
  .wrapper {
    overflow-x: scroll;
  }

  .sublimits-cont {
    width: 800px;

    .input-line {
      .row-large {
        width: 50%;
        height: 100%;
      }

      .line-row {
        width: 30%;
        height: 100%;
      }
    }
  }
}
</style>
