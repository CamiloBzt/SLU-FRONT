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
              Deductible {{ parseInt(deductibleIndex) + 1 }}
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
                  v-model.trim="item.location"
                  @blur="saveValue(deductibleId, 'location', item.location)"
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
                v-model.trim="item.volcanic_eruption"
                @blur="
                  saveValue(
                    deductibleId,
                    'volcanic_eruption',
                    item.volcanic_eruption
                  )
                "
                :items="catalogUnderlying"
                item-text="data"
                item-value="id"
                clearable
                :disabled="catalogUnderlying.length === 0"
                suffix="%"
              ></v-text-field>
            </div>
            <div class="InputRow Large">
              <v-select
                v-model.trim="item.total_volcanic"
                @blur="
                  saveValue(deductibleId, 'total_volcanic', item.total_volcanic)
                "
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
                @blur="
                  saveValue(
                    deductibleId,
                    'minimum_volcanic',
                    item.minimum_volcanic
                  )
                "
                :options="currencyOptions"
              />
            </div>
            <div class="InputRow">
              <v-text-field value="Maximum" readonly />
            </div>
            <div class="InputRow">
              <currency-input
                v-model.trim="item.maximum_volcanic"
                @blur="
                  saveValue(
                    deductibleId,
                    'maximum_volcanic',
                    item.maximum_volcanic
                  )
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
                v-model.trim="item.hidrometeorological"
                @blur="
                  saveValue(
                    deductibleId,
                    'hidrometeorological',
                    item.hidrometeorological
                  )
                "
                :items="catalogUnderlying"
                item-text="data"
                item-value="id"
                clearable
                :disabled="catalogUnderlying.length === 0"
                suffix="%"
              ></v-text-field>
            </div>
            <div class="InputRow Large">
              <v-select
                v-model.trim="item.total_hidrometeorological"
                @blur="
                  saveValue(
                    deductibleId,
                    'total_hidrometeorological',
                    item.total_hidrometeorological
                  )
                "
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
                @blur="
                  saveValue(
                    deductibleId,
                    'minimum_hidrometeorological',
                    item.minimum_hidrometeorological
                  )
                "
                :options="currencyOptions"
              />
            </div>
            <div class="InputRow">
              <v-text-field value="Maximum" readonly />
            </div>
            <div class="InputRow">
              <currency-input
                v-model.trim="item.maximum_hidrometeorological"
                @blur="
                  saveValue(
                    deductibleId,
                    'maximum_hidrometeorological',
                    item.maximum_hidrometeorological
                  )
                "
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
                  v-model.trim="item.alop_earthquake"
                  @blur="
                    saveValue(
                      deductibleId,
                      'alop_earthquake',
                      item.alop_earthquake
                    )
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
                  v-model.trim="item.alop_hidrometeorological"
                  @blur="
                    saveValue(
                      deductibleId,
                      'alop_hidrometeorological',
                      item.alop_hidrometeorological
                    )
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
                  @change="
                    saveValueFire(
                      item.id,
                      'underlying_fire',
                      item.underlying_fire
                    )
                  "
                  hide-selected
                  item-text="data"
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
                <v-text-field
                  v-model.trim="item.underlying_fire_number"
                  @blur="
                    saveValueFire(
                      item.id,
                      'underlying_fire_number',
                      item.underlying_fire_number
                    )
                  "
                  :items="catalogUnderlying"
                  item-text="data"
                  item-value="id"
                  clearable
                  :disabled="catalogUnderlying.length === 0"
                  suffix="%"
                ></v-text-field>
              </div>
              <div class="Row Large">
                <v-select
                  v-model.trim="item.underlying_fire_total"
                  @blur="
                    saveValueFire(
                      item.id,
                      'underlying_fire_total',
                      item.underlying_fire_total
                    )
                  "
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
                  @blur="
                    saveValueFire(
                      item.id,
                      'underlying_fire_minimum',
                      item.underlying_fire_minimum
                    )
                  "
                />
              </div>
              <div class="Row">
                <v-text-field value="Maximum" readonly />
              </div>
              <div class="Row">
                <currency-input
                  :options="currencyOptions"
                  v-model.trim="item.underlying_fire_maximum"
                  @blur="
                    saveValueFire(
                      item.id,
                      'underlying_fire_maximum',
                      item.underlying_fire_maximum
                    )
                  "
                />
              </div>
              <!-- botón de eliminado (debug only) -->
              <v-icon small @click="deleteFireDeductible(item.id)" class="mt-4">
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
import { stateExpansiveManager } from "@/mixins/subscription.js";
/* components */
import CurrencyInput from "@/components/CurrencyInput/CurrencyInput.vue";
//Tienda
import { mapGetters } from "vuex";

// Services
import { getCatalog } from "@/constants/catalogs/services/catalogs.service.js";
import {
  getFireDeductible,
  setDeductible,
  setDeleteFireDeductibleNonProp,
  setFireDeductibleProperty,
  setNewFireDeductible,
} from "./services/Deductibles/deductibles.js";

import NetPremiumNonPro from "@/application/class/NetPremiumNONPRO";
import Decimal from "@/lib/decimal";
import { getNetPremiumOriginalCurrencyById } from "./services/NetPremiunProperty/net-premiun-property.service.js";

export default {
  name: "Deductibles",
  components: { CurrencyInput },
  mixins: [stateExpansiveManager],
  inject: ["deepDisabled"],
  props: {
    deductibleIndex: {
      type: Number,
    },
    deductibleId: {
      type: String | Number,
    },
    item: {
      type: Object,
    },
  },
  data() {
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
      boundNonPropDeductibles: [],
      subscriptionId: this.$route.params.subscriptionId,
      sluLine: 0,
      premium: {},
      deductions: {},
      isColombia: true,
      currencyOptions: {
        currency: "MXN",
        currencyDisplay: "narrowSymbol",
        locale: "en-US",
      },
    };
  },
  async beforeMount() {
    await this.getInitialValues();
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
    this.boundNonPropDeductibles = await getFireDeductible({
      id: this.subscription_id,
    });
  },
  computed: {
    ...mapGetters(["mliv", "tiv", "subscription_id"]),
    calculates() {
      return new NetPremiumNonPro(
        this.premium,
        this.deductions,
        this.sluLine,
        false
      );
    },
    showAlopLines() {
      // Si biSluShare es mayor que 0, mostrar líneas ALOP
      return this.calculates.biSluShare() > 0;
    },
  },

  methods: {
    async getInitialValues() {
      //Services
      const netPremium = await getNetPremiumOriginalCurrencyById({
        id_subscription: this.subscription_id,
      });

      //Calc
      if (netPremium !== undefined) {
        this.netPremium = { ...this.netPremium, ...netPremium };
        const selectedLayer = netPremium.Layers[0] ? netPremium.Layers[0] : {};
        //Need parseFloat
        const sluLine = selectedLayer.slu_share
          ? parseFloat(selectedLayer.slu_share.replace(/[^0-9.]/g, ""))
          : 0;
        this.sluLine = sluLine;

        const premium = selectedLayer.premium
          ? parseFloat(selectedLayer.premium.replace(/[^0-9.]/g, ""))
          : 0;
        const total = netPremium.QuotationInsured
          ? parseFloat(
              netPremium.QuotationInsured.total.replace(/[^0-9.]/g, "")
            )
          : 0;
        const propertyDamage = netPremium.QuotationInsured
          ? parseFloat(
              netPremium.QuotationInsured.property_damage.replace(
                /[^0-9.]/g,
                ""
              )
            )
          : 0;
        const businessInterruption = netPremium.QuotationInsured
          ? parseFloat(
              netPremium.QuotationInsured.business_interruption.replace(
                /[^0-9.]/g,
                ""
              )
            )
          : 0;
        const stock = netPremium.QuotationInsured
          ? parseFloat(
              netPremium.QuotationInsured.stock.replace(/[^0-9.]/g, "")
            )
          : 0;
        const porcentaje =
          netPremium.QuotationInsured &&
          netPremium.QuotationInsured.stock_percentaje
            ? parseFloat(
                netPremium.QuotationInsured.stock_percentaje.replace(
                  /[^0-9.]/g,
                  ""
                )
              )
            : 0;
        //Not need parseFloat
        const brokerage = netPremium.Quotation
          ? netPremium.Quotation.brokerage
          : 0;
        const taxes = netPremium.Quotation ? netPremium.Quotation.taxes : 0;
        const eng = netPremium.Quotation ? netPremium.Quotation.eng : 0;
        const fronting = netPremium.Quotation
          ? netPremium.Quotation.fronting
          : 0;
        const premiumReserve = netPremium.Quotation
          ? netPremium.Quotation.premium_reserve
          : 0;
        const lta = netPremium.Quotation ? netPremium.Quotation.lta : 0;
        const others = netPremium.Quotation ? netPremium.Quotation.others : 0;
        const deductionType = netPremium.Quotation
          ? netPremium.Quotation.deduction_type
          : "As Incurred";

        const rate = !isNaN((premium / total) * 1000)
          ? (premium / total) * 1000
          : 0;
        const rateStock = !isNaN((premium / total) * 10 * porcentaje)
          ? (premium / total) * 10 * porcentaje
          : 0;

        //premium en original currency

        const premiumDamage =
          Decimal.mul(propertyDamage, rate).div(1000).toNumber() || 0;
        const premiumBI = !isNaN((businessInterruption * rate) / 1000)
          ? (businessInterruption * rate) / 1000
          : 0;
        const premiumStock =
          Decimal.mul(stock, rateStock).div(1000).toNumber() || 0;
        const exchange = netPremium.Quotation
          ? parseFloat(
              netPremium.Quotation.exchange_rate.replace(/[^0-9.]/g, "")
            )
          : 0;

        this.deductions = {
          brokerage,
          taxes,
          eng,
          fronting,
          premiumReserve,
          lta,
          others,
          deductionType,
        };

        this.premium = {
          propertyDamage: premiumDamage,
          businessInterruption: premiumBI,
          stock: premiumStock,
          propertyDamageUsd: Decimal.div(premiumDamage, exchange).toNumber(),
          businessInterruptionUsd: Decimal.div(premiumBI, exchange).toNumber(),
          stockUsd: Decimal.div(premiumStock, exchange).toNumber(),
        };
      }
    },
    async saveValue(index, key, value) {
      await setDeductible({ id: index, column: key, value: value.toString() });
    },
    async saveValueFire(index, key, value) {
      if (key === "underlying_fire_number") {
        const intValue = parseInt(value, 10);
        if (!isNaN(intValue)) {
          await setFireDeductibleProperty({
            id: index,
            column: key,
            value: intValue,
          });
        } else {
          console.error("Invalid integer: ", value);
        }
      } else {
        await setFireDeductibleProperty({
          id: index,
          column: key,
          value: value,
        });
      }
    },
    async addFields() {
      this.buttonLoader = true;
      await setNewFireDeductible({
        deductible_id: this.deductibleId,
        id_subscription: this.subscription_id,
      });
      this.boundNonPropDeductibles = await getFireDeductible({
        id: this.subscription_id,
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
    async deleteFireDeductible(id) {
      await setDeleteFireDeductibleNonProp({ id: id });
      this.boundNonPropDeductibles = await getFireDeductible({
        id: this.subscription_id,
      });
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
