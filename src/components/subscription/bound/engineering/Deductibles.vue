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
            <div class="SubExpansionTitle">Deductibles</div>
          </div>
        </template>
      </v-expansion-panel-header>

      <v-expansion-panel-content>
        <div class="ExpandContent justify-center">
          <div class="TitleCont d-flex justify-space-between align-center">
            <h5>Location</h5>
          </div>
          <!--Coverage B // ALOP-->
          <div class="DynamicItemsContent">
            <div
              class="InputsCont d-flex justify-space-between align-start flex-wrap"
            >
              <div class="InputRow">
                <v-text-field
                  v-model.trim="$v.boundEngCatDeductibles.location.$model"
                  @blur="
                    SET_BOUND_ENG_CAT_DED({
                      index: indexarr,
                      key: 'location',
                      value: $v.boundEngCatDeductibles.location.$model,
                    });
                    checkField('location');
                  "
                />
              </div>
            </div>
          </div>
          <div class="TitleCont d-flex justify-start align-center">
            <h5>Underlying Cat Deductibles</h5>
          </div>
          <div class="InputTitle d-flex justify-start align-center align-end">
            Coverage B, Earthquake, Tremor or Volcanic Eruption
          </div>
          <div
            class="InputsCont d-flex justify-space-between align-start flex-wrap"
          >
            <div class="InputRow Small">
              <v-text-field
                v-model.trim="
                  $v.boundEngCatDeductibles.underlyingCatSelect.$model
                "
                label="Underlying Cat Deductibles"
                @blur="
                  SET_BOUND_ENG_CAT_DED({
                    index: indexarr,
                    key: 'underlyingCatSelect',
                    value: $v.boundEngCatDeductibles.underlyingCatSelect.$model,
                  });
                  checkField('underlyingCatSelect');
                "
                clearable
                :disabled="underlyingCat.length === 0"
                :error-messages="
                  quotationValids(
                    'boundEngCatDeductibles',
                    'underlyingCatSelect'
                  )
                "
                suffix="%"
              />
            </div>
            <div class="InputRow Large">
              <v-select
                v-model.trim="
                  $v.boundEngCatDeductibles.underlyingCatAplicaSelect.$model
                "
                @blur="
                  SET_BOUND_ENG_CAT_DED({
                    index: indexarr,
                    key: 'underlyingCatAplicaSelect',
                    value:
                      $v.boundEngCatDeductibles.underlyingCatAplicaSelect
                        .$model,
                  });
                  checkField('underlyingCatAplicaSelect');
                "
                :items="underlyingCatAplica"
                item-text="data"
                label="Total value"
                item-value="id"
                clearable
                :disabled="underlyingCatAplica.length === 0"
                :error-messages="
                  quotationValids(
                    'boundEngCatDeductibles',
                    'underlyingCatAplicaSelect'
                  )
                "
              ></v-select>
            </div>
            <div class="InputRow">
              <v-select
                v-model.trim="
                  $v.boundEngCatDeductibles.underlyingCatValuesSelect.$model
                "
                @blur="
                  SET_BOUND_ENG_CAT_DED({
                    index: indexarr,
                    key: 'underlyingCatValuesSelect',
                    value:
                      $v.boundEngCatDeductibles.underlyingCatValuesSelect
                        .$model,
                  });
                  checkField('underlyingCatValuesSelect');
                "
                :items="underlyingCatValues"
                item-text="data"
                item-value="id"
                clearable
                :disabled="underlyingCatValues.length === 0"
                :error-messages="
                  quotationValids(
                    'boundEngCatDeductibles',
                    'underlyingCatValuesSelect'
                  )
                "
              ></v-select>
            </div>
            <div class="InputRow">
              <currency-input
                v-model.trim="$v.boundEngCatDeductibles.coverB.$model"
                @blur="
                  SET_BOUND_ENG_CAT_DED({
                    index: indexarr,
                    key: 'coverB',
                    value: $v.boundEngCatDeductibles.coverB.$model,
                  });
                  checkField('coverB');
                "
                :error-messages="
                  quotationValids('boundEngCatDeductibles', 'coverB')
                "
                :options="currencyOptions"
              />
            </div>
            <div class="InputRow">
              <v-select
                v-model.trim="
                  $v.boundEngCatDeductibles.underlyingCatValuesSelectTwo.$model
                "
                @blur="
                  SET_BOUND_ENG_CAT_DED({
                    index: indexarr,
                    key: 'underlyingCatValuesSelectTwo',
                    value:
                      $v.boundEngCatDeductibles.underlyingCatValuesSelectTwo
                        .$model,
                  });
                  checkField('underlyingCatValuesSelectTwo');
                "
                :items="underlyingCatValues"
                item-text="data"
                item-value="id"
                clearable
                :disabled="underlyingCatValues.length === 0"
                :error-messages="
                  quotationValids(
                    'boundEngCatDeductibles',
                    'underlyingCatValuesSelectTwo'
                  )
                "
              ></v-select>
            </div>
            <div class="InputRow">
              <currency-input
                v-model.trim="$v.boundEngCatDeductibles.coverTwoB.$model"
                @blur="
                  SET_BOUND_ENG_CAT_DED({
                    index: indexarr,
                    key: 'coverTwoB',
                    value: $v.boundEngCatDeductibles.coverTwoB.$model,
                  });
                  checkField('coverTwoB');
                "
                :error-messages="
                  quotationValids('boundEngCatDeductibles', 'coverTwoB')
                "
                :options="currencyOptions"
              />
            </div>
          </div>
          <!--Hydrometeorological Risk-->
          <div class="InputTitle d-flex justify-start align-end mt-7">
            Hidrometeorological Risk
          </div>
          <div
            class="InputsCont d-flex justify-space-between align-start flex-wrap"
          >
            <div class="InputRow Small">
              <v-text-field
                v-model.trim="
                  $v.boundEngCatDeductibles.underlyingHidroSelect.$model
                "
                label="Underlying Hydrometeorological Deductibles"
                type="number"
                suffix="%"
                @blur="
                  SET_BOUND_ENG_CAT_DED({
                    index: indexarr,
                    key: 'underlyingHidroSelect',
                    value:
                      $v.boundEngCatDeductibles.underlyingHidroSelect.$model,
                  });
                  checkField('underlyingHidroSelect');
                "
                clearable
                :disabled="underlyingCat.length === 0"
                :error-messages="
                  quotationValids(
                    'boundEngCatDeductibles',
                    'underlyingHidroSelect'
                  )
                "
              />
            </div>
            <div class="InputRow Large">
              <v-select
                v-model.trim="
                  $v.boundEngCatDeductibles.underlyingHidroAplicaSelect.$model
                "
                @blur="
                  SET_BOUND_ENG_CAT_DED({
                    index: indexarr,
                    key: 'underlyingHidroAplicaSelect',
                    value:
                      $v.boundEngCatDeductibles.underlyingHidroAplicaSelect
                        .$model,
                  });
                  checkField('underlyingHidroAplicaSelect');
                "
                :items="underlyingCatAplica"
                item-text="data"
                label="Total value"
                item-value="id"
                clearable
                :disabled="underlyingCatAplica.length === 0"
                :error-messages="
                  quotationValids(
                    'boundEngCatDeductibles',
                    'underlyingHidroAplicaSelect'
                  )
                "
              ></v-select>
            </div>
            <div class="InputRow">
              <v-select
                v-model.trim="
                  $v.boundEngCatDeductibles.underlyingHidroValuesSelect.$model
                "
                @blur="
                  SET_BOUND_ENG_CAT_DED({
                    index: indexarr,
                    key: 'underlyingHidroValuesSelect',
                    value:
                      $v.boundEngCatDeductibles.underlyingHidroValuesSelect
                        .$model,
                  });
                  checkField('underlyingHidroValuesSelect');
                "
                :items="underlyingCatValues"
                item-text="data"
                item-value="id"
                clearable
                :disabled="underlyingCatValues.length === 0"
                :error-messages="
                  quotationValids(
                    'boundEngCatDeductibles',
                    'underlyingHidroValuesSelect'
                  )
                "
              ></v-select>
            </div>
            <div class="InputRow">
              <currency-input
                v-model.trim="$v.boundEngCatDeductibles.hidroRisk.$model"
                @blur="
                  SET_BOUND_ENG_CAT_DED({
                    index: indexarr,
                    key: 'hidroRisk',
                    value: $v.boundEngCatDeductibles.hidroRisk.$model,
                  });
                  checkField('hidroRisk');
                "
                :error-messages="
                  quotationValids('boundEngCatDeductibles', 'hidroRisk')
                "
                :options="currencyOptions"
              />
            </div>
            <div class="InputRow">
              <v-select
                v-model.trim="
                  $v.boundEngCatDeductibles.underlyingHidroValuesSelectTwo
                    .$model
                "
                @blur="
                  SET_BOUND_ENG_CAT_DED({
                    index: indexarr,
                    key: 'underlyingHidroValuesSelectTwo',
                    value:
                      $v.boundEngCatDeductibles.underlyingHidroValuesSelectTwo
                        .$model,
                  });
                  checkField('underlyingHidroValuesSelectTwo');
                "
                :items="underlyingCatValues"
                item-text="data"
                item-value="id"
                clearable
                :disabled="underlyingCatValues.length === 0"
                :error-messages="
                  quotationValids(
                    'boundEngCatDeductibles',
                    'underlyingHidroValuesSelectTwo'
                  )
                "
              ></v-select>
            </div>
            <div class="InputRow">
              <currency-input
                v-model.trim="$v.boundEngCatDeductibles.hidroRiskTwo.$model"
                @blur="
                  SET_BOUND_ENG_CAT_DED({
                    index: indexarr,
                    key: 'hidroRiskTwo',
                    value: $v.boundEngCatDeductibles.hidroRiskTwo.$model,
                  });
                  checkField('hidroRiskTwo');
                "
                :error-messages="
                  quotationValids('boundEngCatDeductibles', 'hidroRiskTwo')
                "
                :options="currencyOptions"
              />
            </div>
          </div>
          <!--Coverage B // ALOP-->
          <div class="DynamicItemsContent mt-8" v-if="this.showAlopLines">
            <div class="InputTitle d-flex justify-start align-center align-end">
              ALOP Coverage B, Earthquake, Tremor or Volcanic Eruption
            </div>
            <div
              class="InputsCont d-flex justify-space-between align-start flex-wrap"
            >
              <div class="InputRow">
                <v-text-field
                  type="number"
                  suffix="DAY(S)"
                  v-model.trim="$v.boundEngCatDeductibles.alopEarthquake.$model"
                  @blur="
                    SET_BOUND_ENG_CAT_DED({
                      index: indexarr,
                      key: 'alopEarthquake',
                      value: $v.boundEngCatDeductibles.alopEarthquake.$model,
                    });
                    checkField('alopEarthquake');
                  "
                  :error-messages="
                    quotationValids('boundEngCatDeductibles', 'alopEarthquake')
                  "
                />
              </div>
            </div>
          </div>
          <!--Hydrometeorological Risk // ALOP-->
          <div class="DynamicItemsContent mt-7" v-if="this.showAlopLines">
            <div class="InputTitle d-flex justify-start align-center align-end">
              ALOP Hidrometeorological Risk
            </div>
            <div
              class="InputsCont d-flex justify-space-between align-start flex-wrap"
            >
              <div class="InputRow">
                <v-text-field
                  type="number"
                  suffix="DAY(S)"
                  v-model.trim="$v.boundEngCatDeductibles.alopHidro.$model"
                  @blur="
                    SET_BOUND_ENG_CAT_DED({
                      index: indexarr,
                      key: 'alopHidro',
                      value: $v.boundEngCatDeductibles.alopHidro.$model,
                    });
                    checkField('alopHidro');
                  "
                  :error-messages="
                    quotationValids('boundEngCatDeductibles', 'alopHidro')
                  "
                />
              </div>
            </div>
          </div>

          <!--Underlying Fire -->
          <div class="TitleCont mt-6 d-flex justify-start align-center">
            <h5>Underlying Fire &#38; EC Deductibles</h5>
          </div>

          <!--Contenedor de deducibles-->
          <div
            class="UnderlyingCont d-flex align-start flex-wrap"
            v-for="(item, index) in $v.boundEngDeductibles.$each.$iter"
            :key="index"
          >
            <!--Fila con todos los inputs-->
            <div class="LineItems">
              <div class="Row">
                <v-combobox
                  v-model.trim="item.underlyingFireText.$model"
                  :filter="filter"
                  :hide-no-data="!item.search"
                  :items="underlyingFire"
                  :search-input.sync="item.search"
                  @change="checkMultipleField2(index, 'underlyingFireText')"
                  hide-selected
                  item-text="data"
                  item-value="id"
                  label="Search for an option"
                  clearable
                  return-object
                  :disabled="underlyingFire.length === 0"
                >
                  <template v-slot:no-data>
                    <v-list-item>
                      <span class="subheading">Creating new </span>
                      <v-chip label small> {{ item.search }} </v-chip>
                    </v-list-item>
                  </template>
                  <template v-slot:selection="{ attrs, item }">
                    <span v-if="typeof item === 'object'" v-bind="attrs">
                      {{ item.data }}
                    </span>
                    <span v-else v-bind="attrs">
                      {{ item }}
                    </span>
                  </template>
                </v-combobox>
              </div>
              <div class="Row Small">
                <v-text-field
                  v-model.trim="item.underlyingFireNumberSelect.$model"
                  type="number"
                  suffix="%"
                  @input="item.underlyingFireNumberSelect.$touch()"
                  @blur="
                    checkMultipleField(index, 'underlyingFireNumberSelect')
                  "
                  clearable
                  :disabled="underlyingCat.length === 0"
                />
              </div>
              <div class="Row Large">
                <v-select
                  v-model.trim="item.underlyingFireAplicaSelect.$model"
                  @input="item.underlyingFireAplicaSelect.$touch()"
                  @blur="
                    checkMultipleField(index, 'underlyingFireAplicaSelect')
                  "
                  :items="underlyingFireAplica"
                  item-text="data"
                  label="Total value"
                  item-value="id"
                  clearable
                  :disabled="underlyingFireAplica.length === 0"
                ></v-select>
              </div>
              <div class="Row">
                <v-select
                  v-model.trim="item.underlyingFireValuesSelect.$model"
                  @input="item.underlyingFireValuesSelect.$touch()"
                  @blur="
                    checkMultipleField(index, 'underlyingFireValuesSelect')
                  "
                  :items="underlyingCatValues"
                  item-text="data"
                  item-value="id"
                  clearable
                  :disabled="underlyingCatValues.length === 0"
                ></v-select>
              </div>
              <div class="Row">
                <currency-input
                  v-model.trim="item.underlyingFireAmount.$model"
                  @input="item.underlyingFireAmount.$touch()"
                  @blur="checkMultipleField(index, 'underlyingFireAmount')"
                  :options="currencyOptions"
                />
              </div>
              <div class="Row">
                <v-select
                  v-model.trim="item.underlyingFireValuesSelectTwo.$model"
                  @input="item.underlyingFireValuesSelectTwo.$touch()"
                  @blur="
                    checkMultipleField(index, 'underlyingFireValuesSelectTwo')
                  "
                  :items="underlyingCatValues"
                  item-text="data"
                  item-value="id"
                  clearable
                  :disabled="underlyingCatValues.length === 0"
                ></v-select>
              </div>
              <div class="Row">
                <currency-input
                  v-model.trim="item.underlyingFireAmountTwo.$model"
                  @input="item.underlyingFireAmountTwo.$touch()"
                  @blur="checkMultipleField(index, 'underlyingFireAmountTwo')"
                  :options="currencyOptions"
                />
              </div>
              <!-- botón de eliminado -->
              <v-icon small @click="removeField(index)" class="mt-4">
                mdi-minus-circle
              </v-icon>
            </div>
          </div>

          <!--Boton para añadir deducible-->
          <div class="ButtonCont">
            <v-btn
              class="Btn"
              text
              rounded
              @click="addFields()"
              :loading="buttonLoader"
            >
              <v-icon class="mr-2"> mdi-plus-circle </v-icon>
              Add Deductible
            </v-btn>
          </div>
        </div>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>
<script>
import { mapGetters, mapActions, mapMutations, mapState } from "vuex";
import { stateExpansiveManager } from "@/mixins/subscription.js";
/* components */
import CurrencyInput from "@/components/CurrencyInput/CurrencyInput.vue";
/* validations */
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";
import { formValidations } from "@/mixins/formValidations";

export default {
  name: "Deductibles",
  components: { CurrencyInput },
  mixins: [stateExpansiveManager, validationMixin, formValidations],
  inject: ["deepDisabled"],
  async beforeMount() {
    await Promise.all([
      this.getCatalogByName({ name: "underlying_cats" }),
      this.getCatalogByName({ name: "underlying_cat_aplica" }),
      this.getCatalogByName({ name: "underlying_cat_values" }),
      this.getCatalogByName({ name: "underlying_fire" }),
      this.getCatalogByName({ name: "underlying_fire_aplica" }),
    ]);
  },
  data() {
    return {
      underlyingFireSelect: "",
      underlyingFireNumberSelect: "",
      underlyingFireAplicaSelect: "",
      deductibles: [],
      showAlopLines: false,
      showBiLines: false,
      buttonLoader: false,
      currencyOptions: {
        currency: "MXN",
        currencyDisplay: "narrowSymbol",
        locale: "en-US",
      },
    };
  },
  props: {
    indexarr: {
      type: String | Number,
      default: 0,
    },
    deductibleid: {
      type: String | Number,
    },
  },
  computed: {
    ...mapGetters([
      "underlyingCat",
      "underlyingCatAplica",
      "underlyingCatValues",
      "underlyingFireAplica",
      "underlyingFire",
      "boundEngCatDeductibles",
      "boundEngDeductibles",
      "boundInsurable",
    ]),
    ...mapGetters({
      boundECD: "boundEngCatDeductibles",
    }),
    boundEngCatDeductibles: {
      get() {
        const current = this.boundECD[this.indexarr];
        return current;
      },
    },
  },
  watch: {
    "boundInsurable.alopCurrency": function (latest, old) {
      latest == "" ? (this.showAlopLines = false) : (this.showAlopLines = true);
    },
  },
  async mounted() {
    await this.loadMultipleDeductiblesEng({ table: "boundEngDeductibles" });

    //Muestra / oculta las lineas que dependen de los camapos ALOP
    this.boundInsurable.alopCurrency != ""
      ? (this.showAlopLines = true)
      : (this.showAlopLines = false);
  },
  methods: {
    ...mapActions([
      "saveBoundMultipleColumn",
      "addNewFieldBound",
      "saveEngDeductibleColumn",
      "loadMultipleDeductiblesEng",
      "getCatalogByName",
      "createFireDeductible",
    ]),
    ...mapMutations(["SET_BOUND_ENG_CAT_DED"]),
    async checkField(column) {
      this.buttonLoader = true;
      this.$v.boundEngCatDeductibles[column].$touch();
      if (
        this.$v.boundEngCatDeductibles[column].$invalid ||
        this.$v.boundEngCatDeductibles[column].$error
      ) {
        this.buttonLoader = false;
        return;
      }
      await this.saveBoundMultipleColumn({
        table: "buced",
        parent: "boundEngCatDeductibles",
        column,
        id: this.indexarr,
      });
      this.buttonLoader = false;
    },
    async checkMultipleField(index, column) {
      this.buttonLoader = true;
      if (
        this.$v.boundEngDeductibles.$each[index][column].$invalid ||
        this.$v.boundEngDeductibles.$each[index][column].$error
      ) {
        this.buttonLoader = false;
        return;
      }
      const value = this.$v.boundEngDeductibles.$each[index][column].$model;
      const id = this.$v.boundEngDeductibles.$each[index].$model.id;
      await this.saveEngDeductibleColumn({
        table: "boundEngDeductibles",
        key: column,
        value,
        id,
      });
      this.buttonLoader = false;
    },
    async checkMultipleField2(index, column) {
      this.buttonLoader = true;

      if (
        this.$v.boundEngDeductibles.$each[index][column].$invalid ||
        this.$v.boundEngDeductibles.$each[index][column].$error
      ) {
        this.buttonLoader = false;
        return;
      }
      var value = "";
      const id = this.$v.boundEngDeductibles.$each[index].$model.id;
      if (
        typeof this.$v.boundEngDeductibles.$each[index][column].$model ==
        "object"
      ) {
        value = this.$v.boundEngDeductibles.$each[index][column].$model.id;
        await this.saveEngDeductibleColumn({
          table: "boundEngDeductibles",
          key: "underlyingFireSelect",
          value,
          id,
        });
        value = this.$v.boundEngDeductibles.$each[index][column].$model.data;
      } else {
        value = 0;
        await this.saveEngDeductibleColumn({
          table: "boundEngDeductibles",
          key: "underlyingFireSelect",
          value,
          id,
        });
        value = this.$v.boundEngDeductibles.$each[index][column].$model;
      }

      await this.saveEngDeductibleColumn({
        table: "boundEngDeductibles",
        key: column,
        value,
        id,
      });

      this.buttonLoader = false;
    },
    async addFields() {
      // await this.addNewFieldBound({ table: 'boundEngDeductibles' });
      this.buttonLoader = true;
      const id = this.boundEngCatDeductibles.id;
      await this.createFireDeductible(id);
      await this.loadMultipleDeductiblesEng({ table: "boundEngDeductibles" });
      this.buttonLoader = false;
    },
    async removeField(index) {
      this.buttonLoader = true;
      const id = this.$v.boundEngDeductibles.$each[index].$model.id;
      this.boundEngDeductibles.splice(index, 1);
      await this.saveEngDeductibleColumn({
        table: "boundEngDeductibles",
        key: "active",
        value: false,
        id,
      });
      this.buttonLoader = false;
    },
    filter(item, queryText, itemText) {
      if (item.header) return false;

      const hasValue = (val) => (val != null ? val : "");

      const text = hasValue(itemText);
      const query = hasValue(queryText);

      return (
        text.toString().toLowerCase().indexOf(query.toString().toLowerCase()) >
        -1
      );
    },
  },
  validations: {
    boundEngCatDeductibles: {
      location: { required },
      underlyingCatSelect: { required },
      underlyingCatAplicaSelect: { required },
      underlyingCatValuesSelect: { required },
      underlyingCatValuesSelectTwo: { required },
      underlyingHidroSelect: { required },
      underlyingHidroAplicaSelect: { required },
      underlyingHidroValuesSelect: { required },
      underlyingHidroValuesSelectTwo: { required },
      coverB: { required },
      coverTwoB: { required },
      hidroRisk: { required },
      hidroRiskTwo: { required },
      alopEarthquake: { required },
      alopHidro: { required },
    },
    boundEngDeductibles: {
      $each: {
        underlyingFireSelect: { required },
        underlyingFireNumberSelect: { required },
        underlyingFireAplicaSelect: { required },
        underlyingFireValuesSelect: { required },
        underlyingFireAmount: { required },
        underlyingFireValuesSelectTwo: { required },
        underlyingFireAmountTwo: { required },
        underlyingFireText: { required },
      },
    },
  },
};
</script>
<style lang="less" scoped>
@import "~@/assets/style/AccordionStyle.less";
@import "~@/assets/style/Subscription/Bound.less";
.TitleCont {
  .v-btn {
    margin-left: 5px;
    letter-spacing: normal;
    color: #003d6d;

    .v-icon {
      font-size: 18px;
      margin-right: 10px;
    }
  }
}
.InputTitle {
  width: 95%;
  height: 30px;
  color: #547fa9;
  font-size: 14px;
  margin-bottom: 15px;
}
.DynamicItemsContent {
  width: 95%;
  height: auto;
  .InputsCont {
    width: 100%;
    height: auto;
  }
}
/*Inputs*/
.InputsCont {
  width: 95%;
  height: auto;

  .InputRow {
    width: 16%;
    height: 50px;
  }

  /*Largo de los inputs*/
  .Small {
    width: 10%;
  }
  .Large {
    width: 22%;
  }
  .ExtraLarge {
    width: 33%;
  }
}

/*Underlying*/
.UnderlyingCont {
  width: 95%;
  height: auto;

  .LineItems {
    .flex();
    width: 100%;
    justify-content: space-between;

    .Row {
      width: 10%;
      height: 100%;
    }
    .Small {
      width: 12%;
    }
    .Large {
      width: 30%;
    }
  }

  /*Linea con dos inputs*/
  .TwoInputs {
    justify-content: flex-end;
    .Row {
      margin-left: 1%;
    }
  }
}
.ButtonCont {
  margin-top: 15px;
}
</style>
