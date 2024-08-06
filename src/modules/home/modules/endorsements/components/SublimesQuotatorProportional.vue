<template>
  <div>
    <div class="ExpandContent justify-center">
      <!--Location-->
      <div class="TitleCont d-flex justify-space-between align-center">
        <h5>Location</h5>
        <v-btn text rounded @click="deleteSublime(sublime.catSublimes.id)">
          <v-icon> mdi-delete </v-icon>
          Delete This Location
        </v-btn>
      </div>
      <div class="CatCont d-flex justify-start align-center">
        <div class="InputRow">
          <v-text-field v-model.trim="boundSublimes[0].location" @blur="onCatSublimeChange" />
        </div>
      </div>

      <!--Cat Sublimes title-->
      <div class="TitleCont d-flex justify-start align-center">
        <h5>Cat Sublimes</h5>
      </div>

      <v-row class="mt-4">
        <v-col :cols="6">
          <!--Label-->
          <div class="Label">
            Coverage B Earthquake, Tremor or volcanic Eruption
          </div>

          <!--Input-->
          <div class="w-100">
            <v-select v-model.trim="boundSublimes[0].sublimits1" :items="sublimits" item-text="data" item-value="id"
              clearable :disabled="sublimits.length === 0" @blur="onCatSublimeChange"></v-select>
          </div>
        </v-col>

        <v-col :cols="6" v-if="displayHiddenCoverageB">
          <div class="InputRow">
            <!--Label-->
            <div class="Label">Valor numérico</div>

            <div class="InputCont">
              <currency-input v-model.trim="boundSublimes[0].sublimitsValue1" :options="currencyOptions" @blur="onCatSublimeChange" />
            </div>
          </div>
        </v-col>

        <v-col :cols="6">
          <div class="InputRow">
            <!--Label-->
            <div class="Label">Coverage C Hydrometeorological risk</div>

            <!--Input-->
            <div class="InputCont">
              <v-select v-model.trim="boundSublimes[0].sublimits2" :items="sublimits" item-text="data" item-value="id"
                clearable :disabled="sublimits.length === 0" @blur="onCatSublimeChange"></v-select>
            </div>
          </div>
        </v-col>

        <v-col :cols="6" v-if="displayHiddenCoverageC">
          <div class="InputRow">
            <!--Label-->
            <div class="Label">Valor Default</div>

            <!--Input-->
            <div class="InputCont">
              <v-text-field v-model="inputValue" readonly />
            </div>
          </div>
        </v-col>
      </v-row>
      <!-- <div class="CatCont d-flex justify-start align-center">
            <div class="InputRow">
              <div class="Label">
                Coverage B Earthquake, Tremor or volcanic Eruption
              </div>
              <div class="InputCont">
                <v-select
                  v-model.trim="$v.boundSublimes.sublimits1.$model"
                  @blur="
                    SET_BOUND_ENG('sublimits1', this);
                    checkField('sublimits1');
                  "
                  :items="sublimits"
                  item-text="data"
                  item-value="id"
                  clearable
                  :disabled="sublimits.length === 0"
                ></v-select>
              </div>
            </div>
            <div class="InputRow">
              <div class="Label">Coverage C Hydrometeorological risk</div>
              <div class="InputCont">
                <v-select
                  v-model.trim="$v.boundSublimes.sublimits2.$model"
                  @blur="
                    SET_BOUND_ENG('sublimits2', this);
                    checkField('sublimits2');
                  "
                  :items="sublimits"
                  item-text="data"
                  item-value="id"
                  clearable
                  :disabled="sublimits.length === 0"
                ></v-select>
              </div>
            </div>
          </div> -->

      <!--All Other Sublimits-->
      <div class="TitleCont d-flex justify-start align-center">
        <h5>All Other Sublimits</h5>
      </div>

      <div class="SublimitsCont d-flex align-start flex-wrap">
        <div class="Line mt-4" v-for="(item, index) in boundSublimitsProp" :key="index">
          <div class="RowLarge">
            <v-select v-model.trim="item.otherDeductiblesSelect" @input="item.otherDeductiblesSelect"
              :items="otherDeductibles" item-text="data" item-value="id" clearable
              :disabled="sublimits.length === 0" @blur="onAllOtherSublimitsChange"></v-select>
          </div>

          <div class="Row">
            <!-- <currency-input v-model.trim="item.otherDeductiblesValue" @input="item.otherDeductiblesValue"
              label="Original Currency" :options="currencyOptions" @blur="onAllOtherSublimitsChange" /> -->
            <currency-input v-model.trim="item.otherDeductiblesValue"
              label="Original Currency" :options="currencyOptions" @blur="onAllOtherSublimitsChange" />
          </div>

          <div class="Row">
            <currency-input v-model.trim="computedUsd[index]" label="USD" disabled :options="currencyOptions" @blur="onAllOtherSublimitsChange" />
          </div>

          <!-- botón de eliminado (debug only) -->
          <v-icon small @click="removeField(item.id)" class="mt-4">
            mdi-minus-circle
          </v-icon>
        </div>
      </div>

      <!--Boton para añadir sublimits-->
      <div class="ButtonCont">
        <v-btn class="Btn" text rounded @click="addSublimits">
          <v-icon class="mr-2"> mdi-plus-circle </v-icon>
          Add Sublimits
        </v-btn>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions, mapMutations } from 'vuex';
import { stateExpansiveManager } from '@/mixins/subscription.js';
import Catalog from '../services/catalog.service'
/* components */
import CurrencyInput from '@/components/CurrencyInput/CurrencyInput.vue';
/* validations */
import { required, requiredIf } from 'vuelidate/lib/validators';
/* lodash */
import { debounce } from 'lodash';
/* numbers */
import Decimal from 'decimal.js';
import numeral from 'numeral';

export default {
  name: 'SublimesQuotatorProportional',
  mixins: [stateExpansiveManager],
  // inject: ['deepDisabled'],
  components: { CurrencyInput },
  data() {
    // console.log('this.sublime --->', this.sublime)
    const catSublimes = this.sublime.catSublimes
    const allOtherSublimits = this.sublime.allOtherSublimits
    return {
      allOtherSublimits: [],
      boundSublimes: [
        {
          location: catSublimes.location,
          sublimits1: catSublimes.sublimits1,
          sublimitsValue1: catSublimes.sublimits_value1,
          sublimits2: catSublimes.sublimits2,
          sublimitsValue2: catSublimes.sublimits_value2,
        },
      ],
      boundSublimitsProp: allOtherSublimits.map((s, index) => {
        return {
          id: index+1,
          otherDeductiblesSelect: s.other_deductibles_select,
          otherDeductiblesValue: s.other_deductibles_value,
          otherDeductiblesValueUsd: s.other_deductibles_value_usd,
        }
      }),
      quotation: {
        exchangeRate: this.exchangeRate,
      },
      currencyOptions: {
        currency: 'MXN',
        currencyDisplay: 'narrowSymbol',
        locale: 'en-US',
      },
      sublimits:[],
      otherDeductibles:[],
    };
  },
  props: {
    sublimeIndex: {
      type: String | Number,
    },
    sublimeId: {
      type: String | Number,
    },
    sublime: {
      type:Object,
    },
    exchangeRate: {
      type:Number,
    }
  },
  async beforeMount() {
    this.sublimits = await Catalog.getSublimits();
    this.otherDeductibles = await Catalog.getOtherDeductibles();
  },
  async mounted() {
    // console.log('this.boundSublimitsProp --->', this.boundSublimitsProp)
  },
  computed: {

    computedUsd: {
      get() {
        const arr = this.boundSublimitsProp.map((i) => {
          const mynumber = new Decimal(numeral((`${i.otherDeductiblesValue}` || '$0').replace(/[^0-9.]/g, '')).value() || 0);
          const op = mynumber.div(numeral(this.quotation.exchangeRate || 0).value() || 0);
          return op.toNumber();
        });
        return arr;
      },
    },
    displayHiddenCoverageB() {
      const valid = [4, '4'];
      const comparison = valid.includes(this.boundSublimes.sublimits1);
      if (comparison) return true;
      return false;
    },
    displayHiddenCoverageC() {
      const valid = [4, '4'];
      const comparison = valid.includes(this.boundSublimes.sublimits2);
      if (comparison) return true;
      return false;
    },
    inputValue() {
      if (this.displayHiddenCoverageC) return 'Strike, Riot & Commotion';
      return '';
    },
  },
  watch: {
    inputValue: debounce(function (val) {
      this.boundSublimes.sublimitsValue2 = val;
      // this.SET_BOUND_ENG('sublimitsValue2', val);
      // this.checkField('sublimitsValue2');
    }, 1000),
  },
  methods: {
    deleteSublime(id){
      this.$emit('deleteThisSublimeLocation', id)
    },

    onCatSublimeChange(){

      const catSublimes = {
          location: this.boundSublimes[0].location,
          sublimits1: this.boundSublimes[0].sublimits1,
          sublimits_value1: this.boundSublimes[0].sublimitsValue1,
          sublimits2: this.boundSublimes[0].sublimits2,
          sublimits_value2: this.boundSublimes[0].sublimitsValue2,
        };

      this.$emit("setTechnicalConditionsUpdate", {catSublimes});
    },


    onAllOtherSublimitsChange(){

      const allOtherSublimits = this.boundSublimitsProp.map(s => {
        return {
          other_deductibles_select: s.otherDeductiblesSelect,
          other_deductibles_value: s.otherDeductiblesValue,
          other_deductibles_value_usd: (s.otherDeductiblesValue / this.exchangeRate),
        }
      });

      this.$emit("setTechnicalConditionsUpdate", {allOtherSublimits});
    },


    computedOnUsd(index, column = 'otherDeductiblesValueUsd') {
      this.boundSublimitsProp[index][column] = this.computedUsd[index];
    },

    addSublimits() {

      const highestId = this.boundSublimitsProp.reduce((prev, current) => {
        return (current.id > prev) ? current.id : prev;
      }, 0);

      this.boundSublimitsProp.push({
          id: highestId+1, // id para manipular el array (eliminar elementos)
          otherDeductiblesSelect: 0,
          otherDeductiblesValue: 0,
          otherDeductiblesValueUsd: 0,
        })
      
    },

    removeField(index) {
      this.boundSublimitsProp = this.boundSublimitsProp.filter(s => s.id !== index)
      this.onAllOtherSublimitsChange();
    },

    numberWithDotsElement(e) {
      let val = e.target.value;
      let onlyNumbers = val.toString().replace(/[^0-9]+/g, '');
      let newVal = /^\d+$/.test(onlyNumbers) ? onlyNumbers.replace(/\B(?=(\d{3})+(?!\d))/g, '.') : '';
      e.target.value = newVal;
    },
  },
  // validations: {
  //   boundSublimes: {
  //     sublimits1: { required },
  //     sublimitsValue1: {
  //       required: requiredIf(function () {
  //         return this.displayHiddenCoverageB;
  //       }),
  //     },
  //     sublimits2: { required },
  //     sublimitsValue2: {
  //       required: requiredIf(function () {
  //         return this.displayHiddenCoverageC;
  //       }),
  //     },
  //     location: { required },
  //   },
  //   boundSublimitsProp: {
  //     $each: {
  //       otherDeductiblesSelect: { required },
  //       otherDeductiblesValue: { required },
  //       otherDeductiblesValueUsd: { required },
  //     },
  //   },
  // },
};
</script>
<style lang="less" scoped>
@import '~@/assets/style/AccordionStyle.less';
@import '~@/assets/style/Subscription/Bound.less';

.LocationCont {
  .flex();
  width: 100%;
  height: auto;
  flex-wrap: wrap;
  align-content: flex-start;
  align-items: flex-start;

  .Location {
    width: 100%;
    color: #737373;
    font-size: 14px;
  }

  .Risk {
    width: 100%;
    font-size: 16px;
    margin-top: 5px;
  }
}

.Label {
  width: 100%;
  font-size: 14px;
  color: #547fa9;
  margin-bottom: 15px;
}

.CatCont {
  width: 100%;
  height: auto;

  .InputRow {
    .flex();
    width: auto;
    height: auto;
    margin-right: 1%;
    flex-wrap: wrap;
    align-content: flex-start;
    align-items: flex-start;
    margin-top: 15px;

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
