<template>
  <div>
    <!-- <v-expansion-panels class="SubExpansionComponent"> -->
    <!-- <v-expansion-panel @change="deepDisabled"> -->
    <!-- <v-expansion-panel-header @click="changeSubExpansion" class="ExpansionTitle d-flex justify-start" expand-icon=""> -->
    <!-- <template v-slot:actions> -->
    <div class="subIconCont d-flex justify-start align-center">
      <div class="SubExpansionTitle">Deductible {{ deductibleIndex + 1 }}</div>
    </div>
    <!-- </template> -->
    <!-- </v-expansion-panel-header> -->

    <!-- <v-expansion-panel-content> -->
    <div class="ExpandContent justify-center">
      <div class="TitleCont d-flex justify-space-between align-center">
        <h5>Location</h5>
        <v-btn
          text
          rounded
          @click="
            deleteDeductibleLocation(deductibles.underlyingCatDeductibles.id)
          "
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
              v-model.trim="item.location"
              @blur="onUnderlyingCatDeductiblesChange"
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
          <v-select
            v-model.trim="item.volcanic_eruption"
            @blur="onUnderlyingCatDeductiblesChange"
            :items="catalogUnderlying"
            item-text="data"
            item-value="id"
            clearable
            :disabled="catalogUnderlying.length === 0"
          ></v-select>
        </div>
        <div class="InputRow Large">
          <v-select
            v-model.trim="item.total_volcanic"
            @blur="onUnderlyingCatDeductiblesChange"
            :items="catalogUnderlyingAplica"
            item-text="data"
            label="Total value"
            item-value="id"
            clearable
            :disabled="catalogUnderlyingAplica.length === 0"
          ></v-select>
        </div>
        <div class="InputRow">
          <v-text-field value="Minimum" readonly />
        </div>
        <div class="InputRow">
          <currency-input
            v-model.trim="item.minimum_volcanic"
            @blur="onUnderlyingCatDeductiblesChange"
            :options="currencyOptions"
          />
        </div>
        <div class="InputRow">
          <v-text-field value="Maximum" readonly />
        </div>
        <div class="InputRow">
          <currency-input
            v-model.trim="item.maximum_volcanic"
            @blur="onUnderlyingCatDeductiblesChange"
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
          <v-select
            v-model.trim="item.hidrometeorological"
            @blur="onUnderlyingCatDeductiblesChange"
            :items="catalogUnderlying"
            item-text="data"
            item-value="id"
            clearable
            :disabled="catalogUnderlying.length === 0"
          ></v-select>
        </div>
        <div class="InputRow Large">
          <v-select
            v-model.trim="item.total_hidrometeorological"
            @blur="onUnderlyingCatDeductiblesChange"
            :items="catalogUnderlyingAplica"
            item-text="data"
            label="Total value"
            item-value="id"
            clearable
            :disabled="catalogUnderlyingAplica.length === 0"
          ></v-select>
        </div>
        <div class="InputRow">
          <v-text-field value="Minimum" readonly />
        </div>
        <div class="InputRow">
          <currency-input
            v-model.trim="item.minimum_hidrometeorological"
            @blur="onUnderlyingCatDeductiblesChange"
            :options="currencyOptions"
          />
        </div>
        <div class="InputRow">
          <v-text-field value="Maximum" readonly />
        </div>
        <div class="InputRow">
          <currency-input
            v-model.trim="item.maximum_hidrometeorological"
            @blur="onUnderlyingCatDeductiblesChange"
            :options="currencyOptions"
          />
        </div>
      </div>

      <!--Coverage B // ALOP-->
      <div class="DynamicItemsContent mt-8" v-if="this.showAlopLines">
        <div class="InputTitle d-flex justify-start align-center align-end">
          BI Coverage B, Earthquake, Tremor or Volcanic Eruption
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
                /*SET_BOUND_PROP_DED({
                  index: deductibleIndex,
                  key: 'alopEarthquake',
                  value: $v.boundPropDeductibles.alopEarthquake.$model,
                });
              checkField('alopEarthquake');*/
              "
            />
          </div>
        </div>
      </div>
      <!--Hydrometeorological Risk // ALOP-->
      <div class="DynamicItemsContent mt-7" v-if="this.showAlopLines">
        <div class="InputTitle d-flex justify-start align-center align-end">
          BI Hidrometeorological Risk
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
                /*SET_BOUND_PROP_DED({
                index: deductibleIndex,
                key: 'alopHidro',
                value: $v.boundPropDeductibles.alopHidro.$model,
              });
            checkField('alopHidro');*/
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
        v-for="(item, index) in boundNonPropDeductibles"
        :key="index"
      >
        <!--Fila con todos los inputs-->
        <div class="LineItems">
          <div class="Row">
            <v-autocomplete
              v-model.trim="item.underlying_fire"
              :filter="filter"
              :hide-no-data="!item.search"
              :items="catalogUnderlyingFire"
              :search-input.sync="item.search"
              @change=""
              hide-selected
              item-text="data"
              @blur="onUnderlyingFireECDeductiblesChange"
              item-value="id"
              label="Search for an option"
              clearable
              :disabled="catalogUnderlyingFire.length === 0"
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
            </v-autocomplete>
          </div>

          <div class="Row Small">
            <v-select
              v-model.trim="item.underlying_fire_number"
              @blur="onUnderlyingFireECDeductiblesChange"
              :items="catalogUnderlying"
              item-text="data"
              item-value="id"
              clearable
              :disabled="catalogUnderlying.length === 0"
            ></v-select>
          </div>
          <div class="Row Large">
            <v-select
              v-model.trim="item.underlying_fire_total"
              @blur="onUnderlyingFireECDeductiblesChange"
              :items="catalogUnderlyingFireAplica"
              item-text="data"
              label="Total value"
              item-value="id"
              clearable
              :disabled="catalogUnderlyingFireAplica.length === 0"
            ></v-select>
          </div>
          <div class="Row">
            <v-text-field value="Minimum" readonly />
          </div>
          <div class="Row">
            <currency-input
              :options="currencyOptions"
              v-model.trim="item.underlying_fire_minimum"
              @blur="onUnderlyingFireECDeductiblesChange"
            />
          </div>
          <div class="Row">
            <v-text-field value="Maximum" readonly />
          </div>
          <div class="Row">
            <currency-input
              :options="currencyOptions"
              v-model.trim="item.underlying_fire_maximum"
              @blur="onUnderlyingFireECDeductiblesChange"
            />
          </div>
          <!-- botón de eliminado (debug only) -->
          <v-icon
            small
            @click="() => removeFireDeductible(item.id)"
            class="mt-4"
          >
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
          @click="addFireDeductible"
          :loading="buttonLoader"
        >
          <v-icon class="mr-2"> mdi-plus-circle </v-icon>
          Add Deductible
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
import CurrencyInput from "@/components/CurrencyInput/CurrencyInput.vue";
//Tienda
import { mapGetters } from "vuex";

// Services
// import {
//   setFireDeductibleProperty,
//   setDeductible,
//   setNewFireDeductible,
//   getFireDeductible,
//   setDeleteFireDeductibleNonProp,
// } from './services/Deductibles/deductibles.js';
import { getCatalog } from "@/constants/catalogs/services/catalogs.service.js";

export default {
  name: "DeductiblesQuotatorNonProportional",
  components: { CurrencyInput },
  mixins: [stateExpansiveManager],
  // inject: ['deepDisabled'],
  props: {
    deductibleIndex: {
      type: Number,
    },
    deductibleId: {
      type: String | Number,
    },
    /*item: {
      type: Object,
    },*/

    deductibles: {
      type: Object,
    },
  },
  data() {
    const underlyingCatDeductibles = this.deductibles.underlyingCatDeductibles;
    const underlyingFireECDeductibles =
      this.deductibles.underlyingFireEcDeductibles;
    return {
      catalogUnderlying: [],
      catalogUnderlyingAplica: [],
      catalogUnderlyingValues: [],
      catalogUnderlyingFire: [],
      catalogUnderlyingFireAplica: [],
      underlyingFireSelect: "",
      underlyingFireNumberSelect: "",
      underlyingFireAplicaSelect: "",
      buttonLoader: false,
      search: null,
      model: "",
      editing: null,
      prueba: 0,
      currencyOptions: {
        currency: "MXN",
        currencyDisplay: "narrowSymbol",
        locale: "en-US",
      },

      boundNonPropDeductibles: underlyingFireECDeductibles.map((u, index) => {
        return {
          id: index + 1, // id para manipular el array
          search: null,
          data: null,
          ...u,
        };
      }),

      showAlopLines: false,

      item: {
        ...underlyingCatDeductibles,
      },
    };
  },
  async beforeMount() {
    const catalogUnderlying = await getCatalog({ name: "underlying_cats" });
    this.catalogUnderlying = catalogUnderlying ? catalogUnderlying : [];
    const catalogUnderlyingAplica = await getCatalog({
      name: "underlying_cat_aplica",
    });
    this.catalogUnderlyingAplica = catalogUnderlyingAplica
      ? catalogUnderlyingAplica
      : [];
    const catalogUnderlyingValues = await getCatalog({
      name: "underlying_cat_values",
    });
    this.catalogUnderlyingValues = catalogUnderlyingValues
      ? catalogUnderlyingValues
      : [];
    const catalogUnderlyingFire = await getCatalog({
      name: "underlying_fire_quotator",
    });
    this.catalogUnderlyingFire = catalogUnderlyingFire
      ? catalogUnderlyingFire
      : [];
    const catalogUnderlyingFireAplica = await getCatalog({
      name: "underlying_fire_aplica",
    });
    this.catalogUnderlyingFireAplica = catalogUnderlyingFireAplica
      ? catalogUnderlyingFireAplica
      : [];
  },
  computed: {
    //...mapGetters(['mliv', 'tiv', 'subscription_id']),
  },

  methods: {
    deleteDeductibleLocation(id) {
      this.$emit("deleteThisDeductibleLocationNonProp", id);
    },
    onUnderlyingCatDeductiblesChange() {
      const underlyingCatDeductibles = {
        location: this.item.location,
        volcanicEruption: this.item.volcanic_eruption,
        totalVolcanic: this.item.total_volcanic,
        minimumVolcanic: this.item.minimum_volcanic,
        maximumVolcanic: this.item.maximum_volcanic,
        hidrometeorological: this.item.hidrometeorological,
        totalHidrometeorological: this.item.total_hidrometeorological,
        minimumHidrometeorological: this.item.minimum_hidrometeorological,
        maximumHidrometeorological: this.item.maximum_hidrometeorological,
      };

      this.$emit("setTechnicalConditionsUpdate", { underlyingCatDeductibles });
    },

    onUnderlyingFireECDeductiblesChange() {
      const underlyingFireEcDeductibles = this.boundNonPropDeductibles.map(
        (u) => {
          return {
            underlyingFire: u.underlying_fire,
            underlyingFireNumber: u.underlying_fire_number,
            underlyingFireTotal: u.underlying_fire_total,
            underlyingFireMinimum: u.underlying_fire_minimum,
            underlyingFireMaximum: u.underlying_fire_maximum,
          };
        }
      );

      this.$emit("setTechnicalConditionsUpdate", {
        underlyingFireEcDeductibles,
      });
    },

    addFireDeductible() {
      const highestId = this.boundNonPropDeductibles.reduce((prev, current) => {
        return current.id > prev ? current.id : prev;
      }, 0);

      this.boundNonPropDeductibles.push({
        id: 1 + highestId, // id para manipular el array
        underlying_fire: 0,
        search: null,
        data: null,
        underlying_fire_number: 0,
        underlying_fire_total: 0,
        underlying_fire_minimum: 0,
        underlying_fire_maximum: 0,
      });
    },

    removeFireDeductible(index) {
      this.boundNonPropDeductibles = this.boundNonPropDeductibles.filter(
        (u) => u.id != index
      );
      this.onUnderlyingFireECDeductiblesChange();
    },

    // async saveValue(index, key, value) {
    //   await setDeductible({ id: index, column: key, value: value.toString() });
    // },
    // async saveValueFire(index, key, value) {
    //   await setFireDeductibleProperty({ id: index, column: key, value: value });
    // },
    // async addFields() {
    //   this.buttonLoader = true;
    //   await setNewFireDeductible({ deductible_id: this.deductibleId, id_subscription: this.subscription_id });
    //   this.boundNonPropDeductibles = await getFireDeductible({ id: this.subscription_id });
    //   this.buttonLoader = false;
    // },
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
    // async deleteFireDeductible(id) {
    //   await setDeleteFireDeductibleNonProp({ id: id });
    //   this.boundNonPropDeductibles = await getFireDeductible({ id: this.subscription_id });
    // },
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
