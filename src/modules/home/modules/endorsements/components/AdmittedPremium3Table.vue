<template>
  <div class="outter-wrapper">
    <!-- <v-stepper v-model="e1"> -->
    <div class="endorsement-wrapper">
      <div class="content">
        <div class="head-items-cont">
          <div class="endorsement-title" style="padding: 20px">
            New Total Insured Value
          </div>
        </div>

        <div class="detail-date">
          <div class="table-title-detail table-title-detail--large">
            Detail
          </div>

          <div class="input-col">
            <div class="input-cont">
              <v-menu :close-on-content-click="false" :nudge-right="40" transition="scale-transition" offset-y
                min-width="auto">
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field v-model="premiumPaymentDate" label="Premium payment date" readonly disabled v-bind="attrs"
                    v-on="on"></v-text-field>
                </template>
              </v-menu>
            </div>
          </div>

          <div class="input-col">
            <div class="input-cont">
              <v-autocomplete label="Clause" v-model="clause" :items="clauseList" item-value="clause" item-text="clause"
                disabled />
            </div>
          </div>
        </div>

        <div class="head-items-cont-checkbox">
          <div class="endorsement-title" style="padding: 20px">
            Admitted premium
          </div>

          <div class="endorsement-title" style="padding: 20px">
            <v-checkbox v-model="showTable"></v-checkbox>
          </div>
        </div>

        <div class="table-container input-row justify-center">
          <div class="title-col">
            <div class="table-title-space"></div>
            <div class="table-title-space"></div>
            <div class="table-title-space-mid"></div>
            <div class="col-subtitle-tall">Damage</div>
            <div class="col-subtitle-tall">Bi</div>
            <div class="col-subtitle-tall">Stocks</div>
            <div class="col-subtitle-tall">Total</div>
          </div>

          <div v-for="element in detailValues" class="content-col">
            <div class="col-title-tall">{{ element.title }}</div>
            <div class="test">
              <template v-for="item in element.datas">
                <div v-if="item.id === 1" class="table-col">
                  <div class="table-title-left">{{ item.name }}</div>
                  <div class="table-title-space-mid"></div>

                  <div class="input-row">
                    <div class="inner-col wide-col">
                      <div class="table-input blue-input">
                        <currency-input :prefix="typeEndorsement == 'Exclusion Risk' ? '-' : ''" v-model="item.damage"
                          :options="currencyOptions" @blur="($event) => {
                            item.damage = changeHandler(
                              item.id,
                              item.damage,
                              'damage'
                            );
                          }
                            " :disabled="item.name == 'USD'" :readonly="!showTable" />
                      </div>

                      <div class="table-input blue-input">
                        <currency-input :prefix="typeEndorsement == 'Exclusion Risk' ? '-' : ''" v-model="item.bi"
                          :options="currencyOptions" @blur="($event) => {
                            item.bi = changeHandler(
                              item.id,
                              item.bi,
                              'bi'
                            );
                          }
                            " :disabled="item.name == 'USD'" :readonly="!showTable" />
                      </div>

                      <div class="table-input blue-input">
                        <currency-input :prefix="typeEndorsement == 'Exclusion Risk' ? '-' : ''" v-model="item.stocks"
                          :options="currencyOptions" @blur="($event) => {
                            item.stocks = changeHandler(
                              item.id,
                              item.stocks,
                              'stocks'
                            );
                          }
                            " :disabled="item.name == 'USD'" :readonly="!showTable" />
                      </div>

                      <div class="table-input">
                        <currency-input :prefix="typeEndorsement == 'Exclusion Risk' ? '-' : ''"
                          v-model="premiumTotalComputed" :options="currencyOptions" :disabled="true" />
                      </div>
                    </div>
                  </div>
                </div>
              </template>

              <template v-for="item in element.datas">
                <div v-if="item.id === 2" :key="item.id" class="table-col">
                  <div class="table-title-right">{{ item.name }}</div>
                  <div class="table-title-space-mid"></div>

                  <div class="input-row">
                    <div class="inner-col wide-col">
                      <div class="table-input blue-input">
                        <currency-input :prefix="typeEndorsement == 'Exclusion Risk' ? '-' : ''" v-model="item.damage"
                          :options="currencyOptions" @blur="($event) => {
                            item.damage = changeHandler(
                              item.id,
                              item.damage,
                              'damage'
                            );
                          }
                            " :disabled="item.name == 'Original Currency'" :readonly="!showTable" />
                      </div>

                      <div class="table-input blue-input">
                        <currency-input :prefix="typeEndorsement == 'Exclusion Risk' ? '-' : ''" v-model="item.bi"
                          :options="currencyOptions" @blur="($event) => {
                            item.bi = changeHandler(
                              item.id,
                              item.bi,
                              'bi'
                            );
                          }
                            " :disabled="item.name == 'Original Currency'" :readonly="!showTable" />
                      </div>

                      <div class="table-input blue-input">
                        <currency-input :prefix="typeEndorsement == 'Exclusion Risk' ? '-' : ''" v-model="item.stocks"
                          :options="currencyOptions" @blur="($event) => {
                            item.stocks = changeHandler(
                              item.id,
                              item.stocks,
                              'stocks'
                            );
                          }
                            " :disabled="item.name == 'Original Currency'" :readonly="!showTable" />
                      </div>

                      <div class="table-input">
                        <currency-input :prefix="typeEndorsement == 'Exclusion Risk' ? '-' : ''"
                          v-model="sluTotalComputed" :options="currencyOptions" :disabled="true" />
                      </div>
                    </div>
                  </div>
                </div>
              </template>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- </v-stepper> -->

    <v-dialog v-model="dialog" persistent width="auto">
      <v-card id="card-eye" class="pb-3">
        <v-card-title class="font-weight-bold text-h5">Changes admitted premium</v-card-title>

        <v-divider id="divisor"></v-divider>

        <div id="border-blue" class="mb-8">
          <v-card-text class="font-weight-bold text-h6 blue-text">
            If you continue, the data entered in the admitted premium table will be taken.
          </v-card-text>
        </div>

        <div class="stepper-btn mt-7 mb-3 d-flex justify-space-around align-center">
          <v-btn text rounded large class="blue-btn" @click="dialog = false">
            Accept
          </v-btn>

          <v-btn outlined rounded large class="clear-btn" color="#003D6D" @click="cancelModifyTable">
            Cancel
          </v-btn>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import _ from 'lodash';
/* components */
import CurrencyInput from "@/components/CurrencyInput/CurrencyInput.vue";

export default {
  name: "AdmittedPremium3Table",
  components: {
    CurrencyInput,
  },
  props: {
    detailValues: Array,
    typeEndorsement: String,
    premiumPaymentDate: String,
    clause: String,
    clauseList: Array,
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
      // e1: 1,
      sluTotal: 0,
      premiumTotal: 0,
    };
  },
  async beforeMount() {
    const admittedPremium = this.detailValues[0].datas.find((el) => el.id === 1);

    this.premiumTotal = admittedPremium.total;
    this.sluTotal = admittedPremium.total;

    this.initialValues = _.cloneDeep(this.detailValues);
  },
  async mounted() { },
  watch: {
    premiumTotal: function (value) {
      this.$emit("setTotalPremium", {
        id: 1,
        value,
        concept: 'premiumTotal'
      });
    },
    sluTotal: function (value) {
      this.$emit("setTotalPremium", {
        id: 1,
        value,
        concept: 'sluTotal'
      });
    },
    showTable: function () {
      this.showDialog()
    }
  },
  computed: {
    premiumTotalComputed: {
      get() {
        this.total = this.sumTotalPremium()
        return this.total
      }
    },
    sluTotalComputed: {
      get() {
        this.total = this.sumPremiumSlu()
        return this.total
      }
    }
  },
  methods: {
    sumTotalPremium() {
      const admittedPremium = this.detailValues[0].datas.find((el) => el.id === 1);
      const sum = (
        admittedPremium.damage
        + admittedPremium.bi
        + admittedPremium.stocks
      )
      return sum;
    },
    sumPremiumSlu() {
      const admittedPremium = this.detailValues[0].datas.find((el) => el.id === 1);
      const sum = (
        admittedPremium.damage
        + admittedPremium.bi
        + admittedPremium.stocks
      )
      return sum;
    },
    changeHandler(id, value, concept) {
      // const initialValue = this.initialValues[0][concept];

      // if ((initialValue).toFixed(2) !== (value).toFixed(2)) {
      //   this.$emit("setTotalPremium", { id, value, concept });
      // }

      // this.premiumTotal = this.sumTotalPremium();
      // this.sluTotal = this.sumPremiumSlu();
      return value
    },
    showDialog() {
      this.dialog = this.showTable
    },
    cancelModifyTable() {
      this.dialog = false
      this.showTable = false
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
  width: 8%;
}

.content-col {
  width: 30%;
}

.table-title-space {
  height: 54px;
}

.table-title-space-mid {
  height: 27px;
}

.col-subtitle-tall {
  min-height: 50px;
  font-weight: 800;
  display: flex;
  align-items: center;
}

.col-title-tall {
  min-height: 70px;
  font-weight: 800;
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.table-col {
  width: 48%;

  .inner-col {
    width: 50%;
  }
}

.table-col-endorsement4 {
  width: 26%;

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

.table-title-left {
  height: 50px;
  color: white;
  font-weight: 800;
  background-color: #547fa9;
  border-top-left-radius: 6px;
  border-bottom-left-radius: 6px;
  margin: 2px;
  font-size: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.table-title-right {
  height: 50px;
  color: white;
  font-weight: 800;
  background-color: #547fa9;
  border-top-right-radius: 6px;
  border-bottom-right-radius: 6px;
  margin: 2px;
  font-size: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.wide-col {
  width: 100% !important;
}

.table-input {
  height: 50px;
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

.detail-date {
  width: 91%;
  height: auto;
  margin: auto;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding: 50px 0 20px;
}

.table-title-detail {
  &--large {
    width: 100%;
  }

  width: 100%;
  font-weight: 800;
  font-size: 16px;
  line-height: 110%;
  height: 50px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 0px 5px;
}

.input-col {
  width: 20%;
  display: block;
  margin-right: 30px;
}

.input-cont {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  align-content: center;
  margin: 5px 0;
}

.test {
  display: flex;
  flex-direction: row;
  justify-content: center;
}
</style>
