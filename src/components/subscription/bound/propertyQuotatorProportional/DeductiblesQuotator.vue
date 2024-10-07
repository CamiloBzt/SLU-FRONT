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
            <div class="SubExpansionTitle">
              Deductible {{ deductibleIndex + 1 }}
            </div>
          </div>
        </template>
      </v-expansion-panel-header>

      <v-expansion-panel-content>
        <div class="ExpandContent justify-center">
          <div class="TitleCont d-flex justify-space-between align-center">
            <h5>Location</h5>
            <v-btn
              text
              rounded
              @click="$emit('deleteDeductible', deductibleId)"
            >
              <v-icon> mdi-delete </v-icon>
              Delete This Location
            </v-btn>
          </div>
          <!--Coverage B // ALOP-->
          <div class="DynamicItemsContent">
            <div
              class="InputsCont d-flex justify-space-between align-start flex-wrap"
            >
              <div class="InputRow">
                <v-text-field
                  v-model.trim="$v.boundPropDeductibles.location.$model"
                  @blur="
                    SET_BOUND_PROP_DED({
                      index: deductibleIndex,
                      key: 'location',
                      value: $v.boundPropDeductibles.location.$model,
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

          <!--Coverage B-->
          <div class="InputTitle d-flex justify-start align-center align-end">
            Tremor or Volcanic Eruption
          </div>
          <div
            class="InputsCont d-flex justify-space-between align-start flex-wrap"
          >
            <div class="InputRow Small">
              <v-text-field
                v-model.trim="
                  $v.boundPropDeductibles.underlyingCatSelect.$model
                "
                @blur="
                  SET_BOUND_PROP_DED({
                    index: deductibleIndex,
                    key: 'underlyingCatSelect',
                    value: $v.boundPropDeductibles.underlyingCatSelect.$model,
                  });
                  checkField('underlyingCatSelect');
                "
                :items="underlyingCat"
                item-text="data"
                item-value="id"
                clearable
                :disabled="underlyingCat.length === 0"
                :error-messages="
                  quotationValids('boundPropDeductibles', 'underlyingCatSelect')
                "
                suffix="%"
              ></v-text-field>
            </div>
            <div class="InputRow Large">
              <v-select
                v-model.trim="
                  $v.boundPropDeductibles.underlyingCatAplicaSelect.$model
                "
                @blur="
                  SET_BOUND_PROP_DED({
                    index: deductibleIndex,
                    key: 'underlyingCatAplicaSelect',
                    value: parseInt(
                      $v.boundPropDeductibles.underlyingCatAplicaSelect.$model
                    ),
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
                    'boundPropDeductibles',
                    'underlyingCatAplicaSelect'
                  )
                "
              ></v-select>
            </div>
            <div class="InputRow">
              <v-select
                v-model.trim="
                  $v.boundPropDeductibles.underlyingCatValuesSelect.$model
                "
                @blur="
                  SET_BOUND_PROP_DED({
                    index: deductibleIndex,
                    key: 'underlyingCatValuesSelect',
                    value: parseInt(
                      $v.boundPropDeductibles.underlyingCatValuesSelect.$model
                    ),
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
                    'boundPropDeductibles',
                    'underlyingCatValuesSelect'
                  )
                "
              ></v-select>
            </div>
            <div class="InputRow">
              <currency-input
                v-model.trim="$v.boundPropDeductibles.coverB.$model"
                @blur="
                  SET_BOUND_PROP_DED({
                    index: deductibleIndex,
                    key: 'coverB',
                    value: $v.boundPropDeductibles.coverB.$model,
                  });
                  checkField('coverB');
                "
                :error-messages="
                  quotationValids('boundPropDeductibles', 'coverB')
                "
                :options="currencyOptions"
              />
            </div>
            <div class="InputRow">
              <v-select
                v-model.trim="
                  $v.boundPropDeductibles.underlyingCatValuesSelectTwo.$model
                "
                @blur="
                  SET_BOUND_PROP_DED({
                    index: deductibleIndex,
                    key: 'underlyingCatValuesSelectTwo',
                    value: parseInt(
                      $v.boundPropDeductibles.underlyingCatValuesSelectTwo
                        .$model
                    ),
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
                    'boundPropDeductibles',
                    'underlyingCatValuesSelectTwo'
                  )
                "
              ></v-select>
            </div>
            <div class="InputRow">
              <currency-input
                v-model.trim="$v.boundPropDeductibles.coverTwoB.$model"
                @blur="
                  SET_BOUND_PROP_DED({
                    index: deductibleIndex,
                    key: 'coverTwoB',
                    value: $v.boundPropDeductibles.coverTwoB.$model,
                  });
                  checkField('coverTwoB');
                "
                :error-messages="
                  quotationValids('boundPropDeductibles', 'coverTwoB')
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
                  $v.boundPropDeductibles.underlyingHidroSelect.$model
                "
                @blur="
                  SET_BOUND_PROP_DED({
                    index: deductibleIndex,
                    key: 'underlyingHidroSelect',
                    value: $v.boundPropDeductibles.underlyingHidroSelect.$model,
                  });
                  checkField('underlyingHidroSelect');
                "
                :items="underlyingCat"
                item-text="data"
                item-value="id"
                clearable
                :disabled="underlyingCat.length === 0"
                :error-messages="
                  quotationValids(
                    'boundPropDeductibles',
                    'underlyingHidroSelect'
                  )
                "
                suffix="%"
              ></v-text-field>
            </div>
            <div class="InputRow Large">
              <v-select
                v-model.trim="
                  $v.boundPropDeductibles.underlyingHidroAplicaSelect.$model
                "
                @blur="
                  SET_BOUND_PROP_DED({
                    index: deductibleIndex,
                    key: 'underlyingHidroAplicaSelect',
                    value: parseInt(
                      $v.boundPropDeductibles.underlyingHidroAplicaSelect.$model
                    ),
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
                    'boundPropDeductibles',
                    'underlyingHidroAplicaSelect'
                  )
                "
              ></v-select>
            </div>
            <div class="InputRow">
              <v-select
                v-model.trim="
                  $v.boundPropDeductibles.underlyingHidroValuesSelect.$model
                "
                @blur="
                  SET_BOUND_PROP_DED({
                    index: deductibleIndex,
                    key: 'underlyingHidroValuesSelect',
                    value: parseInt(
                      $v.boundPropDeductibles.underlyingHidroValuesSelect.$model
                    ),
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
                    'boundPropDeductibles',
                    'underlyingHidroValuesSelect'
                  )
                "
              ></v-select>
            </div>
            <div class="InputRow">
              <currency-input
                v-model.trim="$v.boundPropDeductibles.hidroRisk.$model"
                @blur="
                  SET_BOUND_PROP_DED({
                    index: deductibleIndex,
                    key: 'hidroRisk',
                    value: $v.boundPropDeductibles.hidroRisk.$model,
                  });
                  checkField('hidroRisk');
                "
                :error-messages="
                  quotationValids('boundPropDeductibles', 'hidroRisk')
                "
                :options="currencyOptions"
              />
            </div>
            <div class="InputRow">
              <v-select
                v-model.trim="
                  $v.boundPropDeductibles.underlyingHidroValuesSelectTwo.$model
                "
                @blur="
                  SET_BOUND_PROP_DED({
                    index: deductibleIndex,
                    key: 'underlyingHidroValuesSelectTwo',
                    value: parseInt(
                      $v.boundPropDeductibles.underlyingHidroValuesSelectTwo
                        .$model
                    ),
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
                    'boundPropDeductibles',
                    'underlyingHidroValuesSelectTwo'
                  )
                "
              ></v-select>
            </div>
            <div class="InputRow">
              <currency-input
                v-model.trim="$v.boundPropDeductibles.hidroRiskTwo.$model"
                @blur="
                  SET_BOUND_PROP_DED({
                    index: deductibleIndex,
                    key: 'hidroRiskTwo',
                    value: $v.boundPropDeductibles.hidroRiskTwo.$model,
                  });
                  checkField('hidroRiskTwo');
                "
                :error-messages="
                  quotationValids('boundPropDeductibles', 'hidroRiskTwo')
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
                  v-model.trim="$v.boundPropDeductibles.alopEarthquake.$model"
                  @blur="
                    SET_BOUND_PROP_DED({
                      index: deductibleIndex,
                      key: 'alopEarthquake',
                      value: $v.boundPropDeductibles.alopEarthquake.$model,
                    });
                    checkField('alopEarthquake');
                  "
                  :error-messages="
                    quotationValids('boundPropDeductibles', 'alopEarthquake')
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
                  v-model.trim="$v.boundPropDeductibles.alopHidro.$model"
                  @blur="
                    SET_BOUND_PROP_DED({
                      index: deductibleIndex,
                      key: 'alopHidro',
                      value: $v.boundPropDeductibles.alopHidro.$model,
                    });
                    checkField('alopHidro');
                  "
                  :error-messages="
                    quotationValids('boundPropDeductibles', 'alopHidro')
                  "
                />
              </div>
            </div>
          </div>

          <!--Underlying Fire -->
          <div class="TitleCont mt-6 d-flex justify-start align-center">
            <h5>Underlying Fire &#38; EC Deductibles 111</h5>
          </div>

          <!--Contenedor de deducibles-->
          <div
            class="UnderlyingCont d-flex align-start flex-wrap"
            v-for="(item, index) in $v.boundEngDeductibles.$each.$iter"
            :key="index"
          >
            <!--Fila con todos los inputs-->
            <div class="LineItems" FLEX>
              <div class="Row">
                <v-combobox
                  v-model.trim="item.underlyingFireText.$model"
                  :filter="filter"
                  :hide-no-data="!item.search"
                  :items="underlyingFireQuotator"
                  :search-input.sync="item.search"
                  @change="checkMultipleField2(index, 'underlyingFireText')"
                  hide-selected
                  item-text="data"
                  item-value="id"
                  label="Search for an option"
                  clearable
                  return-object
                  :disabled="underlyingFireQuotator.length === 0"
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
                  @blur="
                    checkMultipleField2(index, 'underlyingFireNumberSelect')
                  "
                  :items="underlyingCat"
                  item-text="data"
                  item-value="id"
                  clearable
                  :disabled="underlyingCat.length === 0"
                  suffix="%"
                ></v-text-field>
              </div>
              <div class="Row Large">
                <v-select
                  v-model.trim="item.underlyingFireAplicaSelect.$model"
                  @blur="
                    checkMultipleField2(index, 'underlyingFireAplicaSelect')
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
                  @blur="
                    checkMultipleField2(index, 'underlyingFireValuesSelect')
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
                  :options="currencyOptions"
                  v-model.trim="item.underlyingFireAmount.$model"
                  @blur="checkMultipleField2(index, 'underlyingFireAmount')"
                />
              </div>
              <div class="Row">
                <v-select
                  v-model.trim="item.underlyingFireValuesSelectTwo.$model"
                  @blur="
                    checkMultipleField2(index, 'underlyingFireValuesSelectTwo')
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
                  :options="currencyOptions"
                  v-model.trim="item.underlyingFireAmountTwo.$model"
                  @blur="checkMultipleField2(index, 'underlyingFireAmountTwo')"
                />
              </div>
              <!-- botón de eliminado (debug only) -->
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
import { mapGetters, mapActions, mapMutations } from "vuex";
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
  props: {
    deductibleIndex: {
      type: String | Number,
    },
    deductibleId: {
      type: String | Number,
    },
  },
  data() {
    return {
      underlyingFireSelect: "",
      underlyingFireNumberSelect: "",
      underlyingFireAplicaSelect: "",
      buttonLoader: false,
      deductibles: [],
      search: null,
      model: "",
      editing: null,
      prueba: 0,
      currencyOptions: {
        currency: "MXN",
        currencyDisplay: "narrowSymbol",
        locale: "en-US",
      },
    };
  },
  async beforeMount() {
    await Promise.all([
      this.getCatalogByName({ name: "underlying_cats" }),
      this.getCatalogByName({ name: "underlying_cat_aplica" }),
      this.getCatalogByName({ name: "underlying_cat_values" }),
      this.getCatalogByName({ name: "underlying_fire_quotator" }),
      this.getCatalogByName({ name: "underlying_fire_aplica" }),
    ]);
  },
  computed: {
    ...mapGetters([
      "underlyingCat",
      "underlyingCatAplica",
      "underlyingCatValues",
      "underlyingFireAplica",
      "underlyingFireQuotator",
      "boundPropDeductibles",
      "boundEngDeductibles",
      "mliv",
      "tiv",
    ]),
    ...mapGetters({
      currentDeductibles: "boundPropDeductibles",
      currentUnderlyingFire: "boundEngDeductibles",
    }),
    boundPropDeductibles() {
      return this.currentDeductibles[this.deductibleIndex];
    },
    boundEngDeductibles() {
      const data = Array.from(this.currentUnderlyingFire).filter(
        (v) => v.deductibleId == this.deductibleId
      );
      return data;
    },
    showAlopLines() {
      if (this.mliv.bi) return true;
      return false;
    },
  },
  async mounted() {
    await this.loadMultipleDeductiblesEng({ table: "boundEngDeductibles" });
  },
  methods: {
    ...mapActions([
      "saveBoundColumn",
      "addNewFieldBound",
      "saveEngDeductibleColumn",
      "loadMultipleDeductiblesEng",
      "getCatalogByName",
      "createFireDeductible",
      "updateDeductibleProperty",
    ]),
    ...mapMutations(["SET_BOUND_PROP_DED"]),
    async checkField(column) {
      this.buttonLoader = true;
      this.$v.boundPropDeductibles[column].$touch();
      if (
        this.$v.boundPropDeductibles[column].$invalid ||
        this.$v.boundPropDeductibles[column].$error
      ) {
        this.buttonLoader = false;
        return;
      }
      await this.updateDeductibleProperty({
        id: this.deductibleId,
        column,
        value: this.$v.boundPropDeductibles[column].$model,
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
      const id = this.$v.boundEngDeductibles.$each[index][column].$model.id;

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
      let value = "";
      const id = this.$v.boundEngDeductibles.$each[index].$model.id;
      if (
        typeof this.$v.boundEngDeductibles.$each[index][column].$model ===
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
      await this.createFireDeductible(this.deductibleId);
      await this.loadMultipleDeductiblesEng({ table: "boundEngDeductibles" });
      this.buttonLoader = false;
    },
    async removeField(index) {
      this.buttonLoader = true;
      const id = this.$v.boundEngDeductibles.$each[index].$model.id;
      await this.saveEngDeductibleColumn({
        table: "boundEngDeductibles",
        key: "active",
        value: false,
        id,
      });
      await this.loadMultipleDeductiblesEng({ table: "boundEngDeductibles" });
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
    boundPropDeductibles: {
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
/*
@media(max-width: 650px){
.InputTitle{
  height: auto;
}
.InputsCont{
  .InputRow{
    margin-bottom: 10px;
    width: 100%;
  }
}
}
*/
</style>
