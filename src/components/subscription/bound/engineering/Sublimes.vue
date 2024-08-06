<template>
  <v-expansion-panels class="SubExpansionComponent">
    <v-expansion-panel @change="deepDisabled">
      <v-expansion-panel-header @click="changeSubExpansion" class="ExpansionTitle d-flex justify-start" expand-icon="">
        <template v-slot:actions>
          <div class="subIconCont d-flex justify-start align-center">
            <v-icon class="iconExpand mr-1">
              {{ iconSubExpansion }}
            </v-icon>
            <div class="SubExpansionTitle">Sublimes</div>
          </div>
        </template>
      </v-expansion-panel-header>

      <v-expansion-panel-content>
        <div class="ExpandContent justify-center">
          <!--Cat Sublimes-->
          <div class="TitleCont d-flex justify-start align-center">
            <h5>Cat Sublimes</h5>
          </div>
          <div class="CatCont d-flex justify-start align-center">
            <div class="InputRow">
              <!--Label-->
              <div class="Label">
                Coverage B Earthquake, Tremor or volcanic Eruption
              </div>
              <!--Input-->
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
          </div>

          <!--All Other Sublimits-->
          <div class="TitleCont d-flex justify-start align-center">
            <h5>All Other Sublimits</h5>
          </div>
          <div class="SublimitsCont d-flex align-start flex-wrap">
            <div class="Line" v-for="(item, index) in $v.boundSublimitsEng.$each.$iter" :key="index">
              <div class="RowLarge">
                <v-select
                  v-model.trim="item.endosoSelect.$model"
                  @input="item.endosoSelect.$touch()"
                  @blur="checkMultipleField(index, 'endosoSelect')"
                  :items="endoso"
                  item-text="data"
                  item-value="id"
                  clearable
                  :disabled="endoso.length === 0"
                ></v-select>
              </div>
              <div class="Row">
                <currency-input
                  v-model.trim="item.endosoText.$model"
                  label="Original Currency"
                  @blur="checkMultipleField(index, 'endosoUsd')"
                  @change="checkMultipleField(index, 'endosoText')"
                  :options="currencyOptions"
                />
              </div>
              <div class="Row">
                <!-- v-model.trim="item.endosoUSD.$model" -->
                <currency-input
                  v-model.trim="computedUsd[index]"
                  label="USD"
                  disabled
                  @input="item.endosoUsd.$touch()"
                  @blur="checkMultipleField(index, 'endosoUsd')"
                  :options="currencyOptions"
                />
              </div>
              <!-- botón de eliminado (debug only) -->
              <v-icon small @click="removeField(index)" class="mt-4">
                mdi-minus-circle
              </v-icon>
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
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>
<script>
import { stateExpansiveManager } from '@/mixins/subscription.js';
import { mapGetters, mapActions, mapMutations } from 'vuex';
/* components */
import CurrencyInput from '@/components/CurrencyInput/CurrencyInput.vue';
/* validations */
import { required } from 'vuelidate/lib/validators';
/* numbers */
import Decimal from 'decimal.js';
import numeral from 'numeral';

export default {
  name: 'Sublimes',
  mixins: [stateExpansiveManager],
  components: { CurrencyInput },
  inject: ['deepDisabled'],
  data() {
    return {
      currencyOptions: {
        currency: 'MXN',
        currencyDisplay: 'narrowSymbol',
        locale: 'en-US',
      },
    };
  },
  async beforeMount() {
    await this.getCatalogByName({ name: 'sublimits' });
    await this.getCatalogByName({ name: 'endoso' });
  },
  computed: {
    ...mapGetters(['sublimits', 'boundSublimes', 'boundSublimitsEng', 'subscription_id', 'endoso', 'quotation']),
    computedUsd: {
      get() {
        console.log('entoro');
        const arr = this.boundSublimitsEng.map((i) => {
          const mynumber = new Decimal(numeral((`${i.endosoText}` || '$0').replace(/[^0-9.]/g, '')).value() || 0);
          const op = mynumber.div(numeral(this.quotation.exchangeRate || 0).value() || 0);
          return op.toNumber();
        });
        return arr;
      },
    },
  },
  async mounted() {
    await this.loadMultipleDeductiblesEng({ table: 'boundSublimitsEng' });
  },
  methods: {
    ...mapActions(['saveBoundColumn', 'loadMultipleDeductiblesEng', 'saveEngDeductibleColumn', 'addNewFieldBound', 'getCatalogByName']),
    ...mapMutations(['SET_BOUND_ENG']),
    async checkField(column) {
      this.$v.boundSublimes[column].$touch();
      console.log(this.$v.boundSublimes[column].$invalid, this.$v.boundSublimes[column].$error);
      if (this.$v.boundSublimes[column].$invalid || this.$v.boundSublimes[column].$error) return;
      await this.saveBoundColumn({
        table: 'boundSublimesEng',
        parent: 'boundSublimes',
        column,
        type: 1,
      });
    },
    async checkMultipleField(index, column) {
      if (this.$v.boundSublimitsEng.$each[index][column].$invalid || this.$v.boundSublimitsEng.$each[index][column].$error) return;
      const value = this.$v.boundSublimitsEng.$each[index][column].$model;
      const id = this.$v.boundSublimitsEng.$each[index].$model.id;
      if (this.$v.boundSublimitsEng.$each[index].endosoText.$model) {
        this.$v.boundSublimitsEng.$each[index].endosoUsd.$model = Decimal(this.$v.boundSublimitsEng.$each[index].endosoText.$model).mul(
          this.quotation.exchangeRate
        );
        //this.$v.boundSublimitsEng.$each[index].endosoUsd.$model
      }
      await this.saveEngDeductibleColumn({
        table: 'boundSublimitsEng',
        key: column,
        value,
        id,
      });
    },
    addSublimits() {
      this.addNewFieldBound({ table: 'boundSublimitsEng' });
    },
    removeField(index) {
      const id = this.$v.boundSublimitsEng.$each[index].$model.id;
      this.boundSublimitsEng.splice(index, 1);
      this.saveEngDeductibleColumn({
        table: 'boundSublimitsEng',
        key: 'active',
        value: false,
        id,
      });
    },
    numberWithDotsElement(e) {
      let val = e.target.value;
      let onlyNumbers = val.toString().replace(/[^0-9]+/g, '');
      let newVal = /^\d+$/.test(onlyNumbers) ? onlyNumbers.replace(/\B(?=(\d{3})+(?!\d))/g, '.') : '';
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
@import '~@/assets/style/AccordionStyle.less';
@import '~@/assets/style/Subscription/Bound.less';

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
