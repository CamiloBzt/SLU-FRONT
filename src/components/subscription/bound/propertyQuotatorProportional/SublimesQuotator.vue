<template>
  <v-expansion-panels class="SubExpansionComponent">
    <v-expansion-panel @change="deepDisabled">
      <v-expansion-panel-header
        @click="changeSubExpansion"
        class="ExpansionTitle d-flex justify-start"
        expand-icon=""
      >
        <template v-slot:actions>
          <div class="subIconCont d-flex justify-start align-center">
            <v-icon class="iconExpand mr-1">
              {{ iconSubExpansion }}
            </v-icon>
            <div class="SubExpansionTitle">Sublime {{ sublimeIndex + 1 }}</div>
          </div>
        </template>
      </v-expansion-panel-header>

      <v-expansion-panel-content>
        <div class="ExpandContent justify-center">
          <!--Location-->
          <div class="TitleCont d-flex justify-space-between align-center">
            <h5>Location</h5>
            <v-btn
              text
              rounded
              @click="deleteSublime()"
            >
              <v-icon> mdi-delete </v-icon>
              Delete This Location
            </v-btn>
          </div>
          <div class="CatCont d-flex justify-start align-center">
            <div class="InputRow">
              <v-text-field
                v-model.trim="$v.boundSublimes.location.$model"
                @blur="
                  SET_BOUND_ENG('location', this);
                  checkField('location');
                "
              />
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
            </v-col>
            <v-col
              :cols="6"
              v-if="displayHiddenCoverageB"
            >
              <div class="InputRow">
                <!--Label-->
                <div class="Label">Valor numérico</div>
                <div class="InputCont">
                  <currency-input
                    v-model.trim="$v.boundSublimes.sublimitsValue1.$model"
                    @blur="
                      SET_BOUND_ENG('sublimitsValue1', this);
                      checkField('sublimitsValue1');
                    "
                    :options="currencyOptions"
                  />
                </div>
              </div>
            </v-col>
            <v-col :cols="6">
              <div class="InputRow">
                <!--Label-->
                <div class="Label">Coverage C Hydrometeorological risk</div>
                <!--Input-->
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
            </v-col>
            <v-col
              :cols="6"
              v-if="displayHiddenCoverageC"
            >
              <div class="InputRow">
                <!--Label-->
                <div class="Label">Valor Default</div>
                <!--Input-->
                <div class="InputCont">
                  <v-text-field
                    v-model="inputValue"
                    readonly
                  />
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
            <div
              class="Line mt-4"
              v-for="(item, index) in $v.boundSublimitsProp.$each.$iter"
              :key="index"
            >
              <div class="RowLarge">
                <v-select
                  v-model.trim="item.otherDeductiblesSelect.$model"
                  @input="item.otherDeductiblesSelect.$touch()"
                  @blur="checkMultipleField(index, 'otherDeductiblesSelect')"
                  :items="otherDeductibles"
                  item-text="data"
                  item-value="id"
                  clearable
                  :disabled="sublimits.length === 0"
                ></v-select>
              </div>
              <div class="Row">
                <currency-input
                  v-model.trim="item.otherDeductiblesValue.$model"
                  @input="item.otherDeductiblesValue.$touch()"
                  @blur="
                    checkMultipleField(index, 'otherDeductiblesValue');
                    computedOnUsd(index, 'otherDeductiblesValueUsd');
                  "
                  label="Original Currency"
                  :options="currencyOptions"
                />
              </div>
              <div class="Row">
                <currency-input
                  v-model.trim="computedUsd[index]"
                  label="USD"
                  disabled
                  :options="currencyOptions"
                />
              </div>
              <!-- botón de eliminado (debug only) -->
              <v-icon
                small
                @click="removeField(index)"
                class="mt-4"
              >
                mdi-minus-circle
              </v-icon>
            </div>
          </div>

          <!--Boton para añadir sublimits-->
          <div class="ButtonCont">
            <v-btn
              class="Btn"
              text
              rounded
              @click="addSublimits()"
            >
              <v-icon class="mr-2"> mdi-plus-circle </v-icon>
              Add Sublimits
            </v-btn>
          </div>
        </div>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>
<script>
import { mapGetters, mapActions, mapMutations } from 'vuex';
import { stateExpansiveManager } from '@/mixins/subscription.js';
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
  name: 'SublimesQuotator',
  mixins: [stateExpansiveManager],
  inject: ['deepDisabled'],
  components: { CurrencyInput },
  data () {
    return {
      sublimits1: '',
      sublimits2: '',
      allOtherSublimits: [],
      currencyOptions: {
        currency: 'MXN',
        currencyDisplay: 'narrowSymbol',
        locale: 'en-US',
      },
    };
  },
  props: {
    sublimeIndex: {
      type: String | Number,
    },
    sublimeId: {
      type: String | Number,
    },
  },
  async beforeMount () {
    await Promise.all([this.getCatalogByName({ name: 'sublimits' }), this.getCatalogByName({ name: 'other_deductibles' })]);
  },
  async mounted () {
    await this.loadMultipleDeductiblesEng({ table: 'boundSublimitsProp' });
  },
  computed: {
    ...mapGetters(['otherDeductibles', 'sublimits', 'subscription_id', 'quotation']),
    ...mapGetters({
      currentSublimes: 'boundSublimesProp',
      currentSublimits: 'boundSublimitsProp',
    }),
    boundSublimes () {
      return this.currentSublimes[this.sublimeIndex];
    },
    boundSublimitsProp () {
      const data = Array.from(this.currentSublimits).filter((v) => v.sublimeId == this.sublimeId);
      return data;
    },
    computedUsd: {
      get () {
        const arr = this.boundSublimitsProp.map((i) => {
          const mynumber = new Decimal(numeral((`${i.otherDeductiblesValue}` || '$0').replace(/[^0-9.]/g, '')).value() || 0);
          const op = mynumber.div(numeral(this.quotation.exchangeRate || 0).value() || 0);
          return op.toNumber();
        });
        return arr;
      },
    },
    displayHiddenCoverageB () {
      const valid = [4, '4'];
      const comparison = valid.includes(this.$v.boundSublimes.sublimits1.$model);
      if (comparison) return true;
      return false;
    },
    displayHiddenCoverageC () {
      const valid = [4, '4'];
      const comparison = valid.includes(this.$v.boundSublimes.sublimits2.$model);
      if (comparison) return true;
      return false;
    },
    inputValue () {
      if (this.displayHiddenCoverageC) return 'Strike, Riot & Commotion';
      return '';
    },
  },
  watch: {
    inputValue: debounce(function (val) {
      this.$v.boundSublimes.sublimitsValue2.$model = val;
      this.SET_BOUND_ENG('sublimitsValue2', val);
      this.checkField('sublimitsValue2');
    }, 1000),
  },
  methods: {
    ...mapActions([
      'saveBoundColumn',
      'loadMultipleDeductiblesEng',
      'saveEngDeductibleColumn',
      'addNewFieldBound',
      'getCatalogByName',
      'updateSublimeProperty',
      'createSublimitProperty',
    ]),
    ...mapMutations(['SET_BOUND_ENG']),
    computedOnUsd (index, column = 'otherDeductiblesValueUsd') {
      this.$v.boundSublimitsProp.$each[index][column].$model = this.computedUsd[index];
      this.checkMultipleField(index, column);
    },
    async checkField (column) {
      this.$v.boundSublimes[column].$touch();
      const id = this.$v.boundSublimes.$model.id;
      console.log(this.$v.boundSublimes[column].$invalid, this.$v.boundSublimes[column].$error);
      if (this.$v.boundSublimes[column].$invalid || this.$v.boundSublimes[column].$error) return;

      await this.updateSublimeProperty({
        id: this.sublimeId,
        column,
      });
    },
    async checkMultipleField (index, column) {
      if (this.$v.boundSublimitsProp.$each[index][column].$invalid || this.$v.boundSublimitsProp.$each[index][column].$error) return;
      const value = this.$v.boundSublimitsProp.$each[index][column].$model;
      const id = this.$v.boundSublimitsProp.$each[index].$model.id;

      if (this.$v.boundSublimitsProp.$each[index].otherDeductiblesValue.$model) {
        this.$v.boundSublimitsProp.$each[index].otherDeductiblesValueUsd.$model = Decimal(
          this.$v.boundSublimitsProp.$each[index].otherDeductiblesValue.$model
        ).mul(this.quotation.exchangeRate);
      }
      await this.saveEngDeductibleColumn({
        table: 'boundSublimitsProp',
        key: column,
        value,
        id,
      });
    },
    async addSublimits () {
      await this.createSublimitProperty(this.sublimeId);
      await this.loadMultipleDeductiblesEng({ table: 'boundSublimitsProp' });
    },
    async deleteSublime () {
      this.$emit('deleteSublime', this.sublimeId);
    },
    removeField (index) {
      const id = this.$v.boundSublimitsProp.$each[index].$model.id;
      this.boundSublimitsProp.splice(index, 1);
      this.saveEngDeductibleColumn({
        table: 'boundSublimitsProp',
        key: 'active',
        value: false,
        id,
      });
    },
    numberWithDotsElement (e) {
      let val = e.target.value;
      let onlyNumbers = val.toString().replace(/[^0-9]+/g, '');
      let newVal = /^\d+$/.test(onlyNumbers) ? onlyNumbers.replace(/\B(?=(\d{3})+(?!\d))/g, '.') : '';
      e.target.value = newVal;
    },
  },
  validations: {
    boundSublimes: {
      sublimits1: { required },
      sublimitsValue1: {
        required: requiredIf(function () {
          return this.displayHiddenCoverageB;
        }),
      },
      sublimits2: { required },
      sublimitsValue2: {
        required: requiredIf(function () {
          return this.displayHiddenCoverageC;
        }),
      },
      location: { required },
    },
    boundSublimitsProp: {
      $each: {
        otherDeductiblesSelect: { required },
        otherDeductiblesValue: { required },
        otherDeductiblesValueUsd: { required },
      },
    },
  },
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
