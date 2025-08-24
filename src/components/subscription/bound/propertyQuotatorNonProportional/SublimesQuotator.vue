<template>
  <v-expansion-panels class="sub-expansion-component">
    <v-expansion-panel @change="deepDisabled">
      <v-expansion-panel-header
        @click="changeSubExpansion"
        class="expansion-title d-flex justify-start"
        expand-icon=""
      >
        <template v-slot:actions>
          <div class="sub-icon-cont d-flex justify-start align-center">
            <v-icon class="icon-expand mr-1">
              {{ iconSubExpansion }}
            </v-icon>
            <div class="sub-expansion-title">
              Sublime {{ sublimeIndex + 1 }}
            </div>
          </div>
        </template>
      </v-expansion-panel-header>

      <v-expansion-panel-content>
        <div class="expand-content justify-center">
          <!--Location-->
          <div class="title-cont d-flex justify-space-between align-center">
            <h5>Location</h5>
            <v-btn
              text
              rounded
              @click="$emit('deleteSublime', item.id, sublimeIndex)"
            >
              <v-icon> mdi-delete </v-icon>
              Delete This Location
            </v-btn>
          </div>
          <div class="cat-cont">
            <div class="input-row">
              <v-text-field
                v-model.trim="item.location"
                @blur="saveField('location', item.location)"
              />
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
                  <v-select
                    v-model.trim="item.sublimits1"
                    @blur="saveField('sublimits1', item.sublimits1)"
                    :items="items"
                    item-text="data"
                    item-value="id"
                    clearable
                    :disabled="disabled"
                  ></v-select>
                </div>
              </div>
            </v-col>
            <v-col :cols="12" sm="6" v-if="true">
              <div class="input-row">
                <!--sublime-label-->
                <div class="sublime-label">Valor numérico</div>
                <div class="sublime-input">
                  <currency-input
                    v-model.trim="item.sublimits_value1"
                    @blur="saveField('sublimits_value1', item.sublimits_value1)"
                    :options="currencyOptions"
                  />
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
                  <v-select
                    v-model.trim="item.sublimits2"
                    @blur="saveField('sublimits2', item.sublimits2)"
                    :items="items"
                    item-text="data"
                    item-value="id"
                    clearable
                    :disabled="disabled"
                  />
                </div>
              </div>
            </v-col>
            <v-col :cols="12" sm="6" v-if="true">
              <div class="input-row">
                <!--sublime-label-->
                <div class="sublime-label">Valor Default</div>
                <!--Input-->
                <div class="sublime-input">
                  <currency-input
                    v-model.trim="item.sublimits_value2"
                    :options="currencyOptions"
                    @blur="saveField('sublimits_value2', item.sublimits_value2)"
                  />
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
              <SublimitsQuotator
                v-for="(subitem, index) in SublimitsArray"
                @deleteSublimit="deleteSublimit"
                :otherDeductibles="otherDeductibles"
                :sublimit="subitem"
                :index="index"
                :key="index"
              />
            </div>
          </div>

          <!--Boton para añadir sublimits-->
          <div class="button-cont">
            <v-btn class="Btn" text rounded @click="addSublimit()">
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
import { stateExpansiveManager } from "@/mixins/subscription.js";
/* components */
import SublimitsQuotator from "./SublimitsQuotator.vue";
import CurrencyInput from "@/components/CurrencyInput/CurrencyInput.vue";
/* services */
import {
  getCatalog,
  saveSublime,
} from "./services/SublimesQuotator/sublime-quotator.service";
import {
  saveSublimit,
  getSublimits,
  addSublimit,
} from "./services/SublimesQuotator/sublimit-quotator.service";

export default {
  name: "SublimesQuotator",
  mixins: [stateExpansiveManager],
  components: { CurrencyInput, SublimitsQuotator },
  data() {
    return {
      inputValue: "",
      USD: 10.0,
      SublimitsArray: [],
      items: [],
      otherItems: [],
      disabled: false,
      currencyOptions: {
        currency: "MXN",
        currencyDisplay: "narrowSymbol",
        locale: "en-US",
      },
    };
  },
  props: {
    sublimeIndex: {
      type: String | Number,
      required: true,
    },
    item: {
      type: Object,
      required: true,
    },
    deepDisabled: {
      type: Function,
      required: true,
    },
  },
  inject: ["subscription"],
  async beforeMount() {
    this.items = await getCatalog("sublimits");
    this.otherDeductibles = await getCatalog("other_deductibles");
    this.SublimitsArray = await getSublimits(this.item.id);
  },
  methods: {
    async saveField(column, value) {
      await saveSublime(this.item.id, column, value);
    },
    async addSublimit() {
      const data = await addSublimit(
        this.item.id,
        this.subscription.subscriptionId
      );
      if (data) this.SublimitsArray = await getSublimits(this.item.id);
    },
    async deleteSublimit(id, index) {
      const { message } = await saveSublimit(id, "active", false);
      if (message === "success") this.SublimitsArray.splice(index, 1);
    },
  },
};
</script>
<style lang="less" scoped>
@import "~@/assets/style/AccordionStyleRefactored.less";
@import "~@/assets/style/Subscription/BoundRefactored.less";

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
