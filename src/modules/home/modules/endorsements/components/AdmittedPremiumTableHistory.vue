<template>
  <div class="outter-wrapper">
    <v-stepper v-model="e1">
      <div class="endorsement-wrapper">
        <div class="content">
          <div class="head-items-cont">
            <div class="endorsement-title" style="padding: 20px">
              Admited premium
            </div>
          </div>
          <div class="table-container input-row justify-center">
            <div class="title-col">
              <div class="table-title-space"></div>
              <div class="table-title-space"></div>
              <div class="col-subtitle-tall">Damage</div>
              <div class="col-subtitle-tall">Bi</div>
              <div class="col-subtitle-tall">Stocks</div>
              <div class="col-subtitle-tall">Total</div>
            </div>

            <template v-for="item in detailValues">
              <div v-if="item.id === 1" class="table-col">
                <div class="col-table-title">Total premium</div>
                <div>
                  <div class="table-title">{{ item.name }}</div>
                  <div class="input-row">
                    <div class="inner-col wide-col">
                      <div class="table-input blue-input">
                        <currency-input
                          v-model="item.premiumDamage"
                          :options="currencyOptions"
                          @blur="
                            ($event) => {
                              item.premiumDamage = changeHandler(
                                item.id,
                                item.premiumDamage,
                                'premiumDamage'
                              );
                            }
                          "
                          :disabled="item.name == 'USD'"
                          :readonly="!showTable"
                        />
                      </div>
                      <div class="table-input blue-input">
                        <currency-input
                          v-model="item.premiumBi"
                          :options="currencyOptions"
                          @blur="
                            ($event) => {
                              item.premiumBi = changeHandler(
                                item.id,
                                item.premiumBi,
                                'premiumBi'
                              );
                            }
                          "
                          :disabled="item.name == 'USD'"
                          :readonly="!showTable"
                        />
                      </div>
                      <div class="table-input blue-input">
                        <currency-input
                          v-model="item.premiumStocks"
                          :options="currencyOptions"
                          @blur="
                            ($event) => {
                              item.premiumStocks = changeHandler(
                                item.id,
                                item.premiumStocks,
                                'premiumStocks'
                              );
                            }
                          "
                          :disabled="item.name == 'USD'"
                          :readonly="!showTable"
                        />
                      </div>
                      <div class="table-input">
                        <currency-input
                          v-model="premiumTotalComputed"
                          :options="currencyOptions"
                          :disabled="true"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </template>

            <template v-for="item in detailValues">
              <div v-if="item.id === 1" :key="item.id" class="table-col">
                <div class="col-table-title">Premium SLU</div>
                <div>
                  <div class="table-title">{{ item.name }}</div>
                  <div class="input-row">
                    <div class="inner-col wide-col">
                      <div class="table-input blue-input">
                        <currency-input
                          v-model="item.sluDamage"
                          :options="currencyOptions"
                          @blur="
                            ($event) => {
                              item.sluDamage = changeHandler(
                                item.id,
                                item.sluDamage,
                                'sluDamage'
                              );
                            }
                          "
                          :disabled="item.name == 'USD'"
                          :readonly="!showTable"
                        />
                      </div>
                      <div class="table-input blue-input">
                        <currency-input
                          v-model="item.sluBi"
                          :options="currencyOptions"
                          @blur="
                            ($event) => {
                              item.sluBi = changeHandler(
                                item.id,
                                item.sluBi,
                                'sluBi'
                              );
                            }
                          "
                          :disabled="item.name == 'USD'"
                          :readonly="!showTable"
                        />
                      </div>
                      <div class="table-input blue-input">
                        <currency-input
                          v-model="item.sluStocks"
                          :options="currencyOptions"
                          @blur="
                            ($event) => {
                              item.sluStocks = changeHandler(
                                item.id,
                                item.sluStocks,
                                'sluStocks'
                              );
                            }
                          "
                          :disabled="item.name == 'USD'"
                          :readonly="!showTable"
                        />
                      </div>
                      <div class="table-input">
                        <currency-input
                          v-model="sluTotalComputed"
                          :options="currencyOptions"
                          :disabled="true"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </template>
          </div>
          <div class="table-container input-row justify-center">
            <div class="title-col">
              <div class="table-title-space"></div>
              <div class="table-title-space"></div>
              <div class="col-subtitle-tall">Damage</div>
              <div class="col-subtitle-tall">Bi</div>
              <div class="col-subtitle-tall">Stocks</div>
              <div class="col-subtitle-tall">Total</div>
            </div>

            <template v-for="item in detailValues">
              <div v-if="item.id === 2" class="table-col">
                <div class="col-table-title">Total premium</div>
                <div>
                  <div class="table-title">{{ item.name }}</div>
                  <div class="input-row">
                    <div class="inner-col wide-col">
                      <div class="table-input blue-input">
                        <currency-input
                          v-model="item.premiumDamage"
                          :options="currencyOptions"
                          @blur="
                            ($event) => {
                              item.premiumDamage = changeHandler(
                                item.id,
                                item.premiumDamage,
                                'premiumDamage'
                              );
                            }
                          "
                          :disabled="item.name == 'USD'"
                          :readonly="!showTable"
                        />
                      </div>
                      <div class="table-input blue-input">
                        <currency-input
                          v-model="item.premiumBi"
                          :options="currencyOptions"
                          @blur="
                            ($event) => {
                              item.premiumBi = changeHandler(
                                item.id,
                                item.premiumBi,
                                'premiumBi'
                              );
                            }
                          "
                          :disabled="item.name == 'USD'"
                          :readonly="!showTable"
                        />
                      </div>
                      <div class="table-input blue-input">
                        <currency-input
                          v-model="item.premiumStocks"
                          :options="currencyOptions"
                          @blur="
                            ($event) => {
                              item.premiumStocks = changeHandler(
                                item.id,
                                item.premiumStocks,
                                'premiumStocks'
                              );
                            }
                          "
                          :disabled="item.name == 'USD'"
                          :readonly="!showTable"
                        />
                      </div>
                      <div class="table-input">
                        <currency-input
                          v-model="premiumTotalComputed"
                          :options="currencyOptions"
                          :disabled="true"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </template>

            <template v-for="item in detailValues">
              <div v-if="item.id === 2" :key="item.id" class="table-col">
                <div class="col-table-title">Premium SLU</div>
                <div>
                  <div class="table-title">{{ item.name }}</div>
                  <div class="input-row">
                    <div class="inner-col wide-col">
                      <div class="table-input blue-input">
                        <currency-input
                          v-model="item.sluDamage"
                          :options="currencyOptions"
                          @blur="
                            ($event) => {
                              item.sluDamage = changeHandler(
                                item.id,
                                item.sluDamage,
                                'sluDamage'
                              );
                            }
                          "
                          :disabled="item.name == 'USD'"
                          :readonly="!showTable"
                        />
                      </div>
                      <div class="table-input blue-input">
                        <currency-input
                          v-model="item.sluBi"
                          :options="currencyOptions"
                          @blur="
                            ($event) => {
                              item.sluBi = changeHandler(
                                item.id,
                                item.sluBi,
                                'sluBi'
                              );
                            }
                          "
                          :disabled="item.name == 'USD'"
                          :readonly="!showTable"
                        />
                      </div>
                      <div class="table-input blue-input">
                        <currency-input
                          v-model="item.sluStocks"
                          :options="currencyOptions"
                          @blur="
                            ($event) => {
                              item.sluStocks = changeHandler(
                                item.id,
                                item.sluStocks,
                                'sluStocks'
                              );
                            }
                          "
                          :disabled="item.name == 'USD'"
                          :readonly="!showTable"
                        />
                      </div>
                      <div class="table-input">
                        <currency-input
                          v-model="sluTotalComputed"
                          :options="currencyOptions"
                          :disabled="true"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </template>
          </div>
        </div>
      </div>
    </v-stepper>
    <v-dialog v-model="dialog" width="600">
      <v-card id="card-eye" class="pb-3">
        <v-card-actions class="px-3 pb-3">
          <v-flex text-xs-right>
            <v-btn
              @click="dialog = false"
              color="orange"
              dark
              small
              absolute
              fab
              right
            >
              <v-icon color="white">mdi-close</v-icon>
            </v-btn>
          </v-flex>
        </v-card-actions>
        <v-card-title class="font-weight-bold text-h5"
          >Changes admitted premium</v-card-title
        >
        <v-divider id="divisor"></v-divider>
        <div id="border-blue" class="mb-8">
          <v-card-text class="font-weight-bold text-h6 blue-text">
            If you continue, the data entered in the admitted premium table will
            be taken.
          </v-card-text>
        </div>
        <div
          class="stepper-btn mt-7 mb-3 d-flex justify-space-around align-center"
        >
          <v-btn text rounded large class="blue-btn" @click="dialog = false">
            Accept
          </v-btn>
          <v-btn
            outlined
            rounded
            large
            class="clear-btn"
            color="#003D6D"
            @click="cancelModifyTable"
          >
            Cancel
          </v-btn>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
/* components */
import CurrencyInput from "@/components/CurrencyInput/CurrencyInput.vue";

export default {
  name: "AdmittedPremiumTableHistory",
  components: {
    CurrencyInput,
  },
  props: {
    detailValues: Array,
  },
  data() {
    return {
      currencyOptions: {
        currency: "MXN",
        currencyDisplay: "narrowSymbol",
        locale: "en-US",
      },
      dialog: false,
      showTable: false,
      e1: 1,
      sluTotal: 0,
      premiumTotal: 0,
    };
  },
  async beforeMount() {
    const admittedPremium = this.detailValues.find((el) => el.id === 1);

    this.premiumTotal = admittedPremium.premiumTotal;
    this.sluTotal = admittedPremium.sluTotal;
  },
  async mounted() {},
  computed: {},
  watch: {
    premiumTotal: function (value) {
      this.$emit("setTotalPremium", {
        id: 1,
        value,
        concept: "premiumTotal",
      });
    },
    sluTotal: function (value) {
      this.$emit("setTotalPremium", {
        id: 1,
        value,
        concept: "sluTotal",
      });
    },
    showTable: function () {
      this.showDialog();
    },
  },
  computed: {
    premiumTotalComputed: {
      get() {
        this.premiumTotal = this.sumTotalPremium();
        return this.premiumTotal;
      },
    },
    sluTotalComputed: {
      get() {
        this.sluTotal = this.sumPremiumSlu();
        return this.sluTotal;
      },
    },
  },
  methods: {
    sumTotalPremium() {
      const admittedPremium = this.detailValues.find((el) => el.id === 1);
      const sum =
        admittedPremium.premiumDamage +
        admittedPremium.premiumBi +
        admittedPremium.premiumStocks;
      return sum;
    },
    sumPremiumSlu() {
      const admittedPremium = this.detailValues.find((el) => el.id === 1);
      const sum =
        admittedPremium.sluDamage +
        admittedPremium.sluBi +
        admittedPremium.sluStocks;
      return sum;
    },
    changeHandler(id, value, concept) {
      this.$emit("setTotalPremium", { id, value, concept });
      this.premiumTotal = this.sumTotalPremium();
      this.sluTotal = this.sumPremiumSlu();
      return value;
    },
    showDialog() {
      this.dialog = this.showTable;
    },
    cancelModifyTable() {
      this.dialog = false;
      this.showTable = false;
    },
  },
};
</script>
<style lang="less" scoped>
@import "~@/assets/style/AccordionStyle.less";

.outter-wrapper {
  width: 100%;
  margin-top: 28px;
}

.endorsement-wrapper {
  width: 100%;
  height: auto;
  border-radius: 15px;
  background: white;
  box-shadow: 8px 8px 12px rgba(10, 63, 102, 0.15);
  margin-top: 28px;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-content: center;
  padding: 0 20px;

  @media (max-width: 650px) {
    overflow-x: auto !important;
  }

  //CABEZA DE LA TABLA

  .content {
    width: 100%;
    height: auto;
    padding-top: 10px;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    align-content: flex-start;
    flex-wrap: wrap;
    padding-bottom: 10px;

    .button-cont {
      width: 100%;
      height: auto;
      margin-top: 20;
      display: flex;
      justify-content: flex-end;
      align-items: center;

      .blue-btn {
        color: white;
        width: 200px;
        height: 35px;
        background: #003d6d;
        font-size: 15px;
        font-weight: 500;
        letter-spacing: normal;
        text-transform: capitalize;
      }

      .clear-btn {
        width: 200px;
        height: 35px;
      }
    }
  }

  .v-btn {
    justify-content: flex-start !important;
    color: #003d6d;
  }
}

.head-items-cont {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.head-items-cont-checkbox {
  display: flex;
  justify-content: right;
  align-items: center;
  width: 100%;
}

.endorsement-title {
  font-weight: 800;
  font-size: 20px;
}

.table-container {
  margin-top: 30px;
}

.input-row {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-content: center;
  align-items: flex-start;
  justify-content: flex-start;
}

.title-col {
  width: 10%;
}

.table-title-space {
  height: 54px;
}

.col-subtitle-tall {
  min-height: 70px;
  font-weight: 800;
  display: flex;
  align-items: center;
}

.table-col {
  width: 40%;

  .inner-col {
    width: 50%;
  }
}

.col-table-title {
  font-weight: 800;
  font-size: 20px;
  text-align: center;
  padding: 15px 0;
}

.table-title {
  height: 50px;
  color: white;
  font-weight: 800;
  background-color: #547fa9;
  border-radius: 6px;
  margin: 2px;
  font-size: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.wide-col {
  width: 100% !important;
}

.table-input {
  min-height: 40px;
  padding: 0 10px;
  display: flex;
  align-items: center;
}

.blue-input {
  background-color: #dce5fc;
}

#card-eye {
  border-radius: 20px;
}

#divisor {
  width: 92%;
  margin: auto;
  background-color: #a8bfd9;
}

#border-blue {
  margin: 20px;
  border: solid 2px #a8bfd9;
  border-radius: 20px;
}

.blue-text {
  color: #547fa9 !important;
  text-align: center !important;
}

.stepper-btn {
  width: 100%;
  height: 40px;

  .blue-btn {
    color: white;
    width: 200px;
    height: 35px;
    background: #003d6d;
    font-size: 15px;
    font-weight: 500;
    letter-spacing: normal;
    text-transform: capitalize;
  }

  .clear-btn {
    width: 200px;
    height: 35px;
  }
}
</style>
