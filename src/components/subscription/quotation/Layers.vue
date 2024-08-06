<template>
  <v-expansion-panels>
    <v-expansion-panel @change="disabledLayersFromParent()">
      <!--TITULO DEL ACORDEON-->
      <v-expansion-panel-header
        @click="changeSubExpansion"
        expand-icon=""
      >
        <template v-slot:actions>
          <div class="ExpandMiniTitle d-flex justify-start align-center">
            <div class="subIconCont d-flex justify-start align-center">
              <v-icon class="iconExpand">
                {{ iconSubExpansion }}
              </v-icon>
            </div>
            Layers
          </div>
        </template>
      </v-expansion-panel-header>
      <!--CONTENIDO DEL ACORDEON-->
      <v-expansion-panel-content>
        <div class="ExpandContent">
          <!--CONTENEDOR DE LAYERS-->
          <div class="
              LayerCont
              d-flex
              justify-center
              align-content-start align-start
              flex-wrap
            ">
            <!--VISTA DE UN LAYER-->

            <div
              class="LayerContent"
              v-for="(item, index) in layersArray"
              :key="index"
            >
              <div class="
                  LayerHeader
                  d-flex
                  justify-start
                  align-start align-content-start
                ">
                <!--BOTON ELIMINAR LAYER-->
                <div class="CloseIcon d-flex justify-start align-content-center">
                  <v-btn
                    icon
                    @click="delLayer(item.id)"
                  >
                    <v-icon> mdi-close-circle </v-icon>
                  </v-btn>
                </div>

                <!--NUMERO DE LAYER-->
                <div class="HeaderInput">{{ item.layer }}</div>

                <div class="SelectLayerCont d-flex justify-end align-center">
                  Select layer
                  <div
                    class="iconCont"
                    @click="setActiveLayer(item.id)"
                  >
                    <v-icon> {{ getIcon(item.checked) }} </v-icon>
                  </div>
                </div>
              </div>
              <v-row class="mt-5">
                <v-col
                  :cols="6"
                >
                  <span class="font-weight-bold">Original Currency</span>
                </v-col>
                <v-col
                  :cols="6"
                >
                  <span class="font-weight-bold">USD</span>
                </v-col>
              </v-row>
              <v-row class="mt-5">
                <v-col :cols="6">
                  <v-row>
                    <v-col
                      :cols="4"
                      class="pb-0"
                    >
                      <v-text-field
                        v-model="item.limit"
                        label="Limit"
                        @change="
                          formatNumber($event, item, 'limit'),
                            setSluLimit($event, item, 'sluShare'),
                            setTitle(item),
                            saveColumn(item.id, 'limit'),
                            $nextTick(() => saveColumn(item.id, 'limitUsd')),
                            (item.limitUsd =
                              Number(item.limit.replace(/,/g, '')) /
                              (quotation.exchangeRate || 0))
                        "
                      ></v-text-field>
                    </v-col>
                    <v-col
                      :cols="4"
                      class="pb-0"
                    >
                      <v-text-field
                        v-model="item.excess"
                        label="Excess"
                        @change="
                          formatNumber($event, item, 'excess'),
                            setTitle(item),
                            saveColumn(item.id, 'excess'),
                            $nextTick(() => saveColumn(item.id, 'excessUsd')),
                            (item.excessUsd =
                              Number(item.excess.replace(/,/g, '')) /
                              (quotation.exchangeRate || 0))
                        "
                      ></v-text-field>
                    </v-col>
                    <v-col
                      :cols="4"
                      class="pb-0"
                    >
                      <v-text-field
                        :value="sumDeductions"
                        suffix="%"
                        label="Deductions"
                        type="number"
                        step="0.01"
                        min="1"
                        max="100"
                        @keypress="validateInputNumbersOnly($event)"
                        readonly
                      />
                    </v-col>
                  </v-row>
                </v-col>
                <v-col :cols="6">
                  <v-row>
                    <v-col
                      :cols="4"
                      class="pb-0"
                    >
                      <div class="d-flex justify-center align-center">
                        <currency-input
                          v-model="item.limitUsd"
                          :options="currencyOptions"
                          suffix="USD"
                          label="Limit"
                          readonly
                        />
                      </div>
                    </v-col>
                    <v-col
                      :cols="4"
                      class="pb-0"
                    >
                      <div class="d-flex justify-center align-center">
                        <currency-input
                          v-model="item.excessUsd"
                          :options="currencyOptions"
                          suffix="USD"
                          label="Excess"
                          readonly
                        />
                      </div>
                    </v-col>
                    <v-col
                      :cols="4"
                      class="pb-0"
                    >
                      <div class="d-flex justify-center align-center">
                        <v-text-field
                          :value="sumDeductions"
                          suffix="%"
                          label="Deductions"
                          type="number"
                          step="0.01"
                          min="1"
                          max="100"
                          @keypress="validateInputNumbersOnly($event)"
                          readonly
                        />
                      </div>
                    </v-col>
                  </v-row>
                  <!--INPUTS-->
                  <!-- <div class="LayerInputsCont d-flex justify-space-between">
                    <div class="InputCont">
                      <v-text-field
                        v-model="item.limit"
                        label="Limit"
                        @change="
                          formatNumber($event, item, 'limit'),
                            setSluLimit($event, item, 'sluShare'),
                            setTitle(item),
                            (item.limitUsd =
                              Number(item.limit.replace(/,/g, '')) /
                              (quotation.exchangeRate || 0))
                        "
                      ></v-text-field>
                    </div>

                    <div class="InputCont">
                      <v-text-field
                        v-model="item.excess"
                        label="Excess"
                        @change="
                          formatNumber($event, item, 'excess'),
                            setTitle(item),
                            (item.excessUsd =
                              Number(item.excess.replace(/,/g, '')) /
                              (quotation.exchangeRate || 0))
                        "
                      ></v-text-field>
                    </div>

                    <div class="InputCont">
                      <v-text-field
                        :value="sumDeductions"
                        suffix="%"
                        label="Deductions"
                        type="number"
                        step="0.01"
                        min="1"
                        max="100"
                        @keypress="validateInputNumbersOnly($event)"
                      ></v-text-field>
                    </div>
                  </div> -->
                </v-col>
              </v-row>
              <v-row class="pb-12">
                <v-col :cols="6">
                  <!--INFO-->
                  <div class="InfoCont d-flex flex-wrap justify-space-between pa-3">
                    <div class="InfoLine">
                      <span> SLU Share:</span>
                      <div class="InputCont">
                        <v-text-field
                          suffix="%"
                          v-model="item.sluShare"
                          type="number"
                          step="0.01"
                          min="1"
                          max="100"
                          @keypress="validateInputNumbersOnly($event)"
                          @change="
                            setSluLimit($event, item, 'limit'),
                              setSluPremium($event, item, 'premium'),
                              saveColumn(item.id, 'sluShare'),
                              $nextTick(
                                () => saveColumn(item.id, 'sluLimit'),
                                saveColumn(item.id, 'sluLimitUsd')
                              )
                          "
                        ></v-text-field>
                      </div>
                    </div>
                    <div class="InfoLine">
                      <span> SLU Limit: </span>
                      <div class="InputCont">
                        <v-text-field
                          v-model="item.sluLimit"
                          readonly
                          :suffix="currencyKey"
                        ></v-text-field>
                      </div>
                    </div>

                    <div class="InfoLine">
                      <span>Premium: </span>
                      <div class="InputCont">
                        <v-text-field
                          v-model="item.premium"
                          :suffix="currencyKey"
                          @change="
                            formatNumber($event, item, 'premium'),
                              setSluPremium($event, item, 'sluShare'),
                              saveColumn(item.id, 'premium'),
                              (item.premiumUsd =
                                Number(item.premium.replace(/,/g, '')) /
                                (quotation.exchangeRate || 0)),
                              $nextTick(
                                () => saveColumn(item.id, 'premiumUsd'),
                                saveColumn(item.id, 'sluPremium'),
                                saveColumn(item.id, 'sluPremiumUsd')
                              )
                          "
                        ></v-text-field>
                      </div>
                    </div>
                    <div class="InfoLine">
                      <span> SLU Premium:</span>
                      <div class="InputCont">
                        <v-text-field
                          v-model="item.sluPremium"
                          :suffix="currencyKey"
                          readonly
                        ></v-text-field>
                      </div>
                    </div>
                  </div>
                </v-col>
                <v-col :cols="6">
                  <!--INFO-->
                  <div class="InfoCont d-flex flex-wrap justify-space-between pa-3">
                    <div class="InfoLine">
                      <span> SLU Share:</span>
                      <div class="InputCont">
                        <v-text-field
                          suffix="%"
                          v-model="item.sluShare"
                          type="number"
                          readonly
                        ></v-text-field>
                      </div>
                    </div>
                    <div class="InfoLine">
                      <span> SLU Limit: </span>
                      <div class="InputCont">
                        <currency-input
                          v-model="item.sluLimitUsd"
                          :options="currencyOptions"
                          suffix="USD"
                          readonly
                        />
                      </div>
                    </div>

                    <div class="InfoLine">
                      <span>Premium: </span>
                      <div class="InputCont">
                        <currency-input
                          v-model="item.premiumUsd"
                          :options="currencyOptions"
                          readonly
                        />
                      </div>
                    </div>
                    <div class="InfoLine">
                      <span> SLU Premium:</span>
                      <div class="InputCont">
                        <currency-input
                          v-model="item.sluPremiumUsd"
                          :options="currencyOptions"
                          suffix="USD"
                          readonly
                        />
                      </div>
                    </div>
                  </div>
                </v-col>
              </v-row>
            </div>
          </div>

          <!--BOTON AÑADIR LAYER-->
          <div class="layerButtonCont d-flex justify-start align-center">
            <v-btn
              text
              rounded
              class="btn"
              @click="addLayer()"
            >
              <v-icon class="mr-3"> mdi-plus-circle </v-icon>
              Add New Layer
            </v-btn>
          </div>
        </div>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>
<script>
// Mixins
import { stateExpansiveManager } from '@/mixins/subscription.js';

// Componentes
import Layer from '@/components/subscription/quotation/Layer';
import AddLayerButton from '@/components/subscription/quotation/AddLayerButton';
import CurrencyInput from '@/components/CurrencyInput/CurrencyInput.vue';

// Mappers
import { mapActions, mapGetters, mapMutations } from 'vuex';

export default {
  name: 'layers',
  mixins: [stateExpansiveManager],
  components: {
    Layer,
    AddLayerButton,
    CurrencyInput,
  },
  inject: ['disabledLayersFromParent'],
  data () {
    return {
      // inputs
      deduction: 100,
      detachment: null,
      attachment: null,
      // currency
      currencyOptions: {
        currency: 'USD',
        currencyDisplay: 'narrowSymbol',
        locale: 'en-US',
      },
    };
  },
  computed: {
    ...mapGetters([
      'tivNon',
      'deductions',
      'layersArray',
      'layerSelect',
      'sumDeductions',
      'accountInformation',
      'currencies',
      'quotation',
    ]),
    currencyKey () {
      return this.currencies[this.accountInformation.currency - 1].key;
    },
  },
  async mounted () {
    await this.getQuotationInformation();
    await this.getLayers();
    this.deduction = this.deductions.sum;

    const layerInitial = this.layersArray.find((layers) => layers.checked);
    if (layerInitial) this.$store.state.layerSelect = layerInitial;
  },
  watch: {
    deductions: {
      handler () {
        this.setDeduction();
      },
      deep: true,
    },
  },
  methods: {
    ...mapMutations(['setStatelayerSelect']),
    ...mapActions([
      'getQuotationInformation',
      'createLayer',
      'getLayers',
      'updateLayer',
      'checkLayer',
    ]),
    async saveColumn (id, column) {
      await this.updateLayer({ column, id });
      this.$store.state.layerSelect = this.layersArray.find(
        (layers) => layers.checked
      );
    },
    async addLayer () {
      await this.createLayer();
      await this.getLayers();
    },
    async delLayer (id) {
      await this.updateLayer({ column: 'active', id });
      await this.getLayers();
    },
    async setActiveLayer (id) {
      await this.checkLayer({ id });
      await this.getLayers();
      this.$store.state.layerSelect = this.layersArray.find(
        (layers) => layers.checked
      );
      // const item = Array.from(this.layersArray).find(v => v.id === id);
      // item.deductions = this.deduction;
      // this.setDeduction;
    },
    setDeduction () {
      this.deduction = this.deductions.sum;
    },
    getIcon (checked) {
      if (checked) return 'mdi-checkbox-marked-outline';
      return 'mdi-checkbox-blank-outline';
    },
    validateInputNumbersOnly (event) {
      return Number.isInteger(Number(event.key)) && event.key >= 0;
    },
    formatNumber (val, obj, key) {
      let num = val;
      obj[key] = Number(num.toString().replace(/,/g, '')).toLocaleString(
        'en-US'
      );
      if (obj[key] === 'NaN') obj[key] = '';
    },
    setSluLimit (val, obj, key) {
      const numA =
        key === 'limit'
          ? Number(`${val}`.replace(/,/g, '')) / 100
          : Number(`${val}`.replace(/,/g, ''));
      const numB =
        key === 'sluShare'
          ? Number(`${obj[key]}`.replace(/,/g, '')) / 100
          : Number(`${obj[key]}`.replace(/,/g, ''));

      obj.sluLimit = (numA * numB).toLocaleString('en-US');
      obj.sluLimitUsd =
        Number(obj.sluLimit.replace(/,/g, '')) /
        (this.quotation.exchangeRate || 0);
    },
    setSluPremium (val, obj, key) {
      let numA =
        key === 'premium'
          ? Number(`${val}`.replace(/,/g, '')) / 100
          : Number(`${val}`.replace(/,/g, ''));
      let numB =
        key === 'sluShare'
          ? Number(`${obj[key]}`.replace(/,/g, '')) / 100
          : Number(`${obj[key]}`.replace(/,/g, ''));

      obj.sluPremium = (numA * numB).toLocaleString('en-US');
      obj.sluPremiumUsd =
        Number(`${obj.sluPremium}`.replace(/,/g, '')) /
        (this.quotation.exchangeRate || 0);
    },
    setTitle (obj) {
      const setKMFormat = (num) => {
        const numString = num.replace(/,/g, '');
        const numLength = numString.length;

        const numKMFormat =
          numLength >= 4 && numLength <= 6
            ? `${numString.slice(0, -3)}K`
            : numLength > 6
              ? `${numString.slice(0, -6)}M`
              : numString;

        return numKMFormat;
      };

      if (obj.limit && obj.excess)
        obj.layer = `Layer ${this.currencies[this.accountInformation.currency - 1].key
          } ${setKMFormat(obj.limit)} ${this.currencies[this.accountInformation.currency - 1].key
          } ${setKMFormat(obj.excess)}`;
    },
  },
};
</script>

<style lang="less" scoped>
@import '~@/assets/style/AccordionStyle.less';
.ExpandMiniTitle {
  position: absolute;
  width: 100%;
  left: 24px;
  height: 100%;
  top: 0;
  color: #003d6d !important;
  font-weight: 600 !important;
  .iconExpand {
    background: #003d6d;
    color: white !important;
    margin-right: 15px;
  }
}

//LAYERS
.LayerCont {
  width: 100%;
  height: auto;
  display: flex;
  margin-top: 15px;

  //CONTENIDO
  .LayerContent {
    width: 80%;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    align-content: flex-start;
    flex-wrap: wrap;

    //NUMERO DE LAYER
    .LayerHeader {
      width: 100%;
      height: 40px;

      //ICONO CERRAR LAYER
      .CloseIcon {
        margin-left: -45px;
        width: 45px;
        height: 45px;
        cursor: pointer;
        i {
          color: var(--secondaryColor);
          font-size: 27px;
        }
      }

      .HeaderInput {
        width: 50%;
        height: 100%;
        font-weight: 600;
        font-size: 16px;
      }
    }

    //SELECT LAYER
    .SelectLayerCont {
      width: 100%;
      color: grey;
      font-size: 16px;

      .iconCont {
        width: 37px;
        height: 37px;
        background: grey;
        border-radius: 37px;
        margin-left: 10px;
        display: flex;
        justify-content: center;
        align-items: center;
        background: #a8bfd9;
        i {
          font-size: 23px;
          color: #003d6d;
        }
      }
    }

    //INPUTS
    .LayerInputsCont {
      width: 100%;
      height: 120px;
      align-items: center;

      .InputCont {
        width: 30%;
      }
    }

    //INFO
    .InfoCont {
      width: 100%;
      height: 130px;
      border: solid 1px #d2deed;
      align-content: space-between;
      .InfoLine {
        width: 50%;
        height: 50%;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        font-weight: 700;
        font-size: 16px;

        span {
          color: #547fa9;
          margin-right: 5px;
        }

        .InputCont {
          width: 60%;
        }
      }
    }
  }
}

//BOTON AÑADIR LAYER
.layerButtonCont {
  width: 100%;
  height: 60px;
  margin-left: -24px;
  .btn {
    text-transform: none !important;
    color: #003d6d;
    font-weight: 500 !important;
    letter-spacing: normal;
  }
}

.usd-span {
  color: #547fa9;
  font-weight: 700;
  font-size: 16px;
  white-space: nowrap;
}
</style>
