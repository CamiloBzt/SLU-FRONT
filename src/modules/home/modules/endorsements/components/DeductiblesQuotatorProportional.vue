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
        <v-btn text rounded @click="deleteDeductibleLocation(deductibles.UnderlyingCatDeductibles.id)">
          <v-icon> mdi-delete </v-icon>
          Delete This Location
        </v-btn>
      </div>
      <!--Coverage B // ALOP-->
      <div class="DynamicItemsContent">
        <div class="InputsCont d-flex justify-space-between align-start flex-wrap">
          <div class="InputRow">
            <v-text-field v-model.trim="boundPropDeductibles.location" @blur="onUnderlyingCatDeductiblesChange" />
          </div>
        </div>
      </div>
      <div class="TitleCont d-flex justify-start align-center">
        <h5>Underlying Cat Deductibles</h5>
      </div>

      <!--Coverage B-->
      <div class="InputTitle d-flex justify-start align-center align-end">Tremor or Volcanic Eruption</div>
      <div class="InputsCont d-flex justify-space-between align-start flex-wrap">
        <div class="InputRow Small">
          <v-select v-model.trim="boundPropDeductibles.underlyingCatSelect" :items="underlyingCat" item-text="data"
            item-value="id" clearable :disabled="underlyingCat.length === 0" @blur="onUnderlyingCatDeductiblesChange" ></v-select>
        </div>
        <div class="InputRow Large">
          <v-select v-model.trim="boundPropDeductibles.underlyingCatAplicaSelect" :items="underlyingCatAplica"
            item-text="data" label="Total value" item-value="id" clearable
            :disabled="underlyingCatAplica.length === 0" @blur="onUnderlyingCatDeductiblesChange"></v-select>
        </div>
        <div class="InputRow">
          <v-text-field value="Minimum" readonly />
        </div>
        <div class="InputRow">
          <currency-input v-model.trim="boundPropDeductibles.coverB" :options="currencyOptions" @blur="onUnderlyingCatDeductiblesChange"/>
        </div>
        <div class="InputRow">
          <v-text-field value="Maximum" readonly />
        </div>
        <div class="InputRow">
          <currency-input v-model.trim="boundPropDeductibles.coverTwoB" :options="currencyOptions" @blur="onUnderlyingCatDeductiblesChange" />
        </div>
      </div>
      <!--Hydrometeorological Risk-->
      <div class="InputTitle d-flex justify-start align-end mt-7">Hidrometeorological Risk</div>
      <div class="InputsCont d-flex justify-space-between align-start flex-wrap">
        <div class="InputRow Small">
          <v-select v-model.trim="boundPropDeductibles.underlyingHidroSelect" :items="underlyingCat" item-text="data"
            item-value="id" clearable :disabled="underlyingCat.length === 0" @blur="onUnderlyingCatDeductiblesChange"></v-select>
        </div>
        <div class="InputRow Large">
          <v-select v-model.trim="boundPropDeductibles.underlyingHidroAplicaSelect" :items="underlyingCatAplica"
            item-text="data" label="Total value" item-value="id" clearable
            :disabled="underlyingCatAplica.length === 0" @blur="onUnderlyingCatDeductiblesChange"></v-select>
        </div>
        <div class="InputRow">
          <v-text-field value="Minimum" readonly />
        </div>
        <div class="InputRow">
          <currency-input v-model.trim="boundPropDeductibles.hidroRisk" :options="currencyOptions" @blur="onUnderlyingCatDeductiblesChange" />
        </div>
        <div class="InputRow">
          <v-text-field value="Maximum" readonly />
        </div>
        <div class="InputRow">
          <currency-input v-model.trim="boundPropDeductibles.hidroRiskTwo" :options="currencyOptions" @blur="onUnderlyingCatDeductiblesChange" />
        </div>
      </div>

      <!--Coverage B // ALOP-->
      <div class="DynamicItemsContent mt-8" v-if="this.showAlopLines">
        <div class="InputTitle d-flex justify-start align-center align-end">ALOP Coverage B, Earthquake, Tremor or
          Volcanic Eruption</div>
        <div class="InputsCont d-flex justify-space-between align-start flex-wrap">
          <div class="InputRow">
            <v-text-field type="number" suffix="DAY(S)" v-model.trim="boundPropDeductibles.alopEarthquake" @blur="onUnderlyingCatDeductiblesChange" />
          </div>
        </div>
      </div>
      <!--Hydrometeorological Risk // ALOP-->
      <div class="DynamicItemsContent mt-7" v-if="this.showAlopLines">
        <div class="InputTitle d-flex justify-start align-center align-end">ALOP Hidrometeorological Risk</div>
        <div class="InputsCont d-flex justify-space-between align-start flex-wrap">
          <div class="InputRow">
            <v-text-field type="number" suffix="DAY(S)" v-model.trim="boundPropDeductibles.alopHidro" @blur="onUnderlyingCatDeductiblesChange" />
          </div>
        </div>
      </div>

      <!--Underlying Fire -->
      <div class="TitleCont mt-6 d-flex justify-start align-center">
        <h5>Underlying Fire &#38; EC Deductibles 111</h5>
      </div>

      <!--Contenedor de deducibles-->
      <div class="UnderlyingCont d-flex align-start flex-wrap" v-for="(item, index) in boundEngDeductibles"
        :key="index">
        <!--Fila con todos los inputs-->
        <div class="LineItems" FLEX>
          <div class="Row">
            <v-combobox v-model.trim="item.underlyingFireText" :filter="filter" :hide-no-data="!item.search"
              :items="underlyingFireQuotator" :search-input.sync="item.search" hide-selected item-text="data"
              item-value="id" label="Search for an option" clearable return-object
              @blur="onUnderlyingFireECDeductiblesChange"
              :disabled="underlyingFireQuotator.length === 0">
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
            <v-select v-model.trim="item.underlyingFireNumberSelect" :items="underlyingCat" item-text="data"
              item-value="id" clearable :disabled="underlyingCat.length === 0" @blur="onUnderlyingFireECDeductiblesChange"></v-select>
          </div>
          <div class="Row Large">
            <v-select v-model.trim="item.underlyingFireAplicaSelect" :items="underlyingFireAplica" item-text="data"
              label="Total value" item-value="id" clearable :disabled="underlyingFireAplica.length === 0" @blur="onUnderlyingFireECDeductiblesChange"></v-select>
          </div>
          <div class="Row">
            <v-text-field value="Minimum" readonly />
          </div>
          <div class="Row">
            <currency-input :options="currencyOptions" v-model.trim="item.underlyingFireAmount" @blur="onUnderlyingFireECDeductiblesChange" />
          </div>
          <div class="Row">
            <v-text-field value="Maximum" readonly />
          </div>
          <div class="Row">
            <currency-input :options="currencyOptions" v-model.trim="item.underlyingFireAmountTwo" @blur="onUnderlyingFireECDeductiblesChange" />
          </div>
          <!-- botón de eliminado (debug only) -->
          <v-icon small @click="()=>removeField(item.id)" class="mt-4"> mdi-minus-circle </v-icon>
        </div>
      </div>

      <!--Boton para añadir deducible-->
      <div class="ButtonCont">
        <v-btn class="Btn" text rounded @click="addFields" :loading="buttonLoader">
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
import { mapGetters, mapActions, mapMutations } from 'vuex';
import { stateExpansiveManager } from '@/mixins/subscription.js';
import Catalog from '../services/catalog.service'

/* components */
import CurrencyInput from '@/components/CurrencyInput/CurrencyInput.vue';
/* validations */
import { validationMixin } from 'vuelidate';
import { required } from 'vuelidate/lib/validators';
import { formValidations } from '@/mixins/formValidations';

export default {
  name: 'DeductiblesProportional',
  components: { CurrencyInput },
  mixins: [stateExpansiveManager, validationMixin, formValidations],
  // inject: ['deepDisabled'],
  props: {
    deductibleIndex: {
      type: String | Number,
    },
    deductibleId: {
      type: String | Number,
    },

    deductibles: {
      type:Object,
    }
  },
  data() {
    // console.log('this.deductibles --->', this.deductibles)
    const underlyingCatDeductibles = this.deductibles.UnderlyingCatDeductibles
    const underlyingFireECDeductibles = this.deductibles.UnderlyingFireECDeductibles
    return {
      boundPropDeductibles: {
        location: underlyingCatDeductibles.location || null,
        underlyingCatSelect: underlyingCatDeductibles.underlying_cat_select || null,
        underlyingCatAplicaSelect: underlyingCatDeductibles.underlying_cat_aplica_select || null,
        underlyingCatValuesSelect: underlyingCatDeductibles.underlying_cat_values_select || null,
        underlyingCatValuesSelectTwo: underlyingCatDeductibles.underlying_cat_values_select_two || null,
        underlyingHidroSelect: underlyingCatDeductibles.underlying_hidro_select || null,
        underlyingHidroAplicaSelect: underlyingCatDeductibles.underlying_hidro_aplica_select || null,
        underlyingHidroValuesSelect: underlyingCatDeductibles.underlying_hidro_values_select || null,
        underlyingHidroValuesSelectTwo: underlyingCatDeductibles.underlying_hidro_values_select_two || null,
        coverB: underlyingCatDeductibles.cover_b || null,
        coverTwoB: underlyingCatDeductibles.cover_two_b || null,
        hidroRisk: underlyingCatDeductibles.hidro_risk || null,
        hidroRiskTwo: underlyingCatDeductibles.hidro_risk_two || null,
        alopEarthquake: underlyingCatDeductibles.alop_earthquake || null,
        alopHidro: underlyingCatDeductibles.alop_hidro || null,
      },
      boundEngDeductibles:underlyingFireECDeductibles.map((u, index) => {
        return {
          id: index+1, // id para manipular el array
          underlyingFireSelect: u.underlying_fire_select,
          underlyingFireNumberSelect: u.underlying_fire_number_select,
          underlyingFireAplicaSelect: u.underlying_fire_aplica_select,
          underlyingFireValuesSelect: u.underlying_fire_values_select,
          underlyingFireAmount: u.underlying_fire_amount,
          underlyingFireValuesSelectTwo: u.underlying_fire_values_select_two,
          underlyingFireAmountTwo: u.underlying_fire_amount_two,
          underlyingFireText: u.underlying_fire_text,
        }
      }),
      underlyingFireSelect: '',
      underlyingFireNumberSelect: '',
      underlyingFireAplicaSelect: '',
      buttonLoader: false,
      search: null,
      model: '',
      editing: null,
      prueba: 0,
      currencyOptions: {
        currency: 'MXN',
        currencyDisplay: 'narrowSymbol',
        locale: 'en-US',
      },
      underlyingCat:[],
      underlyingCatAplica:[],
      underlyingFireAplica:[],
      //underlyingFire:[],
      underlyingFireQuotator:[],
      showAlopLines:true,
      minimumId: null,
      maximumId: null,
    };
  },
  async beforeMount() {
    this.underlyingCat = await Catalog.getUnderlyingCat();
    this.underlyingCatAplica = await Catalog.getUnderlyingCatAplica()
    const values = await Catalog.getUnderlyingCatValues();
    this.minimumId = values.find(v => v.data?.toLowerCase() === 'minimum')?.id || null;
    this.maximumId = values.find(v => v.data?.toLowerCase() === 'maximum')?.id || null;
    if(!this.boundPropDeductibles.underlyingCatValuesSelect && this.minimumId !== null){
      this.boundPropDeductibles.underlyingCatValuesSelect = this.minimumId;
    }
    if(!this.boundPropDeductibles.underlyingCatValuesSelectTwo && this.maximumId !== null){
      this.boundPropDeductibles.underlyingCatValuesSelectTwo = this.maximumId;
    }
    if(!this.boundPropDeductibles.underlyingHidroValuesSelect && this.minimumId !== null){
      this.boundPropDeductibles.underlyingHidroValuesSelect = this.minimumId;
    }
    if(!this.boundPropDeductibles.underlyingHidroValuesSelectTwo && this.maximumId !== null){
      this.boundPropDeductibles.underlyingHidroValuesSelectTwo = this.maximumId;
    }
    this.boundEngDeductibles = this.boundEngDeductibles.map(u => ({
      ...u,
      underlyingFireValuesSelect: u.underlyingFireValuesSelect || this.minimumId,
      underlyingFireValuesSelectTwo: u.underlyingFireValuesSelectTwo || this.maximumId,
    }));
    this.onUnderlyingCatDeductiblesChange();
    this.onUnderlyingFireECDeductiblesChange();
    this.underlyingFireAplica = await Catalog.getUnderlyingFireAplica();
    //this.underlyingFire = await Catalog.getUnderlyingFire();
    this.underlyingFireQuotator = await Catalog.getUnderlyingFireQuotator();

  },
  computed: {

  },
  async mounted() {
    // await this.loadMultipleDeductiblesEng({ table: 'boundEngDeductibles' });
    // console.log('this.technicalConditions.deductibles.underlyingCatDeductibles[0] ---->', this.technicalConditions.deductibles.underlyingCatDeductibles[0])
  },

  methods: {
    deleteDeductibleLocation(id){
      this.$emit('deleteThisDeductibleLocation', id)
    },

    onUnderlyingCatDeductiblesChange(){

      const underlyingCatDeductibles = {
        location: this.boundPropDeductibles.location,
        underlying_cat_select: this.boundPropDeductibles.underlyingCatSelect,
        underlying_cat_aplica_select: this.boundPropDeductibles.underlyingCatAplicaSelect,
        underlying_cat_values_select: this.boundPropDeductibles.underlyingCatValuesSelect,
        underlying_cat_values_select_two: this.boundPropDeductibles.underlyingCatValuesSelectTwo,
        underlying_hidro_select: this.boundPropDeductibles.underlyingHidroSelect,
        underlying_hidro_aplica_select: this.boundPropDeductibles.underlyingHidroAplicaSelect,
        underlying_hidro_values_select: this.boundPropDeductibles.underlyingHidroValuesSelect,
        underlying_hidro_values_select_two: this.boundPropDeductibles.underlyingHidroValuesSelectTwo,
        cover_b: this.boundPropDeductibles.coverB,
        cover_two_b: this.boundPropDeductibles.coverTwoB,
        hidro_risk: this.boundPropDeductibles.hidroRisk,
        hidro_risk_two: this.boundPropDeductibles.hidroRiskTwo,
        alop_earthquake: this.boundPropDeductibles.alopEarthquake,
        alop_hidro: this.boundPropDeductibles.alopHidro,
      }

      this.$emit("setTechnicalConditionsUpdate", {underlyingCatDeductibles});
    },

    onUnderlyingFireECDeductiblesChange(){

      const underlyingFireEcDeductibles = this.boundEngDeductibles.map(u => {
        return {
          underlying_fire_select: u.underlyingFireSelect,
          underlying_fire_number_select: u.underlyingFireNumberSelect,
          underlying_fire_aplica_select: u.underlyingFireAplicaSelect,
          underlying_fire_values_select: u.underlyingFireValuesSelect,
          underlying_fire_amount: u.underlyingFireAmount,
          underlying_fire_values_select_two: u.underlyingFireValuesSelectTwo,
          underlying_fire_amount_two: u.underlyingFireAmountTwo,
          underlying_fire_text:(typeof u.underlyingFireText === 'string') ? u.underlyingFireText : u.underlyingFireText.data,
        }
      })
      this.$emit("setTechnicalConditionsUpdate", {underlyingFireEcDeductibles});
    },

    async addFields() {
      
      const highestId = this.boundEngDeductibles.reduce((prev, current) => {
        return (current.id > prev) ? current.id : prev;
      }, 0);

      this.boundEngDeductibles.push({
          id: 1+highestId, // id para manipular el array
          underlyingFireSelect:0,
          underlyingFireNumberSelect: 0,
          underlyingFireAplicaSelect: 0,
          underlyingFireValuesSelect: this.minimumId,
          underlyingFireAmount: 0,
          underlyingFireValuesSelectTwo: this.maximumId,
          underlyingFireAmountTwo: 0,
          underlyingFireText: "",
        })

    },

    async removeField(index) {
      this.boundEngDeductibles = this.boundEngDeductibles.filter(u => u.id != index)
      this.onUnderlyingFireECDeductiblesChange();
    },

    filter(item, queryText, itemText) {
      if (item.header) return false;

      const hasValue = (val) => (val != null ? val : '');

      const text = hasValue(itemText);
      const query = hasValue(queryText);

      return text.toString().toLowerCase().indexOf(query.toString().toLowerCase()) > -1;
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
@import '~@/assets/style/AccordionStyle.less';
@import '~@/assets/style/Subscription/Bound.less';

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
