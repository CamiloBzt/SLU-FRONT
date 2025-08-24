<template>
  <div class="input-row w-100 d-flex flex-wrap">
    <v-expansion-panels class="ExpansionComponent ExpansionBordered mt-6">
      <v-expansion-panel @change="$emit('panel-event')" :disabled="loadingPanel">
        <!--TITULO DEL ACORDEON-->
        <v-expansion-panel-header @click="changeStateCorrespondence()" class="ExpansionTitle" expand-icon="">
          <div class="inner-title">Endorsement [{{ elementComplete.EndorsementType.type }}] {{ item + 1 }}</div>

          <div class="ExpansionState HideOnMovil">
            {{ stateExpansiveMessageCorr }}
          </div>

          <template v-slot:actions>
            <v-icon class="iconExpand">
              {{ iconExpansiveCorr }}
            </v-icon>
          </template>
        </v-expansion-panel-header>

        <!--CONTENIDO DEL ACORDEON-->
        <v-expansion-panel-content>
          <div class="input-row w-100 d-flex flex-wrap pl-15">
            <div class="input-col">
              <div class="input-cont">
                <v-text-field v-model="deductionType" label="Type" v-on="on" readonly> </v-text-field>
              </div>

              <div class="input-cont">
                <v-text-field v-model="cancellationDate" label="Cancellation date" v-on="on"> </v-text-field>
              </div>
            </div>

            <div class="input-col">
              <div class="input-cont">
                <v-text-field v-model="inceptionDate" label="Inception date" v-on="on" readonly> </v-text-field>
              </div>

              <div class="input-cont">
                <v-text-field v-model="cancellationTerm" label="Cancellation term" v-on="on"> </v-text-field>
              </div>
            </div>

            <div class="input-col">
              <div class="input-cont">
                <v-text-field v-model="expiryDate" label="Expiry date" v-on="on" readonly> </v-text-field>
              </div>
            </div>
          </div>

          <div class="table-container input-row justify-center">
            <div class="title-col">
              <div class="table-title-space"></div>

              <div v-for="subtitle in subtitleList">
                <div class="col-subtitle">{{ subtitle }}</div>
              </div>
            </div>

            <div class="table-col">
              <div class="table-title leftStyle">Original Currency</div>

              <div class="input-row">
                <div class="inner-col wide-col">
                  <div v-for="value in originalCurrencyDatas">
                    <div class="table-input blue-input">
                      {{ formatCurrency(value) }}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="table-col">
              <div class="table-title rightStyle">USD</div>

              <div class="input-row">
                <div class="inner-col wide-col">
                  <div v-for="value in usdDatas">
                    <div class="table-input blue-input">
                      {{ formatCurrency(value) }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="head-items-cont-checkbox">
            <div class="endorsement-title" style="padding: 20px 0">Cancel endorsement</div>

            <div class="endorsement-title" style="padding: 20px 40px">
              <v-checkbox v-model="checkEndorsement" :value="elementComplete.id" @click="checkOrNotCheck(item + 1)"></v-checkbox>
            </div>
          </div>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>
<script>
/* utils */
import { formatCurrency } from "../utils";
import { stateExpansiveManager } from "@/mixins/subscription.js";

export default {
  name: "CancellationEndorsement",
  mixins: [stateExpansiveManager],
  props: {
    elementComplete: { type: Object },
    item: { type: Number },
  },
  data() {
    return {
      subtitleList: ["Total premium", "Premium SLU", "Net premium", "Deductions", "Fronting"],
      originalCurrencyDatas: {
        totalPremium: 0,
        premiumSLU: 0,
        netPremium: 0,
        deductions: 0,
        fronting: this.elementComplete.AccountComplete.deductibles.fronting,
      },
      usdDatas: {
        totalPremium: 0,
        premiumSLU: 0,
        netPremium: 0,
        deductions: 0,
        fronting: 0,
      },
      loadingPanel: false,
      showAccountOrEndorsements: false,
      on: {},
      deductionType: this.elementComplete.AccountComplete.deductibles.deductionType,
      cancellationDate: "",
      inceptionDate: new Date(this.elementComplete.AccountComplete.deductibles.inceptionDate).toISOString().substr(0, 10),
      cancellationTerm: "",
      expiryDate: new Date(this.elementComplete.AccountComplete.deductibles.expiryDate).toISOString().substr(0, 10),
      checkEndorsement: false,
    };
  },
  async beforeMount() {},
  async mounted() {
    // console.log('this.endorsementCancellationList --->', this.endorsementCancellationList)
  },
  watch: {},
  methods: {
    formatCurrency(amount) {
      return formatCurrency(amount);
    },
    checkOrNotCheck(index) {
      // console.log('this.checkEndorsement --->', this.checkEndorsement)
      // console.log('value', index)
      this.$emit("arrayCancellationEndorsement", { id: index, value: this.checkEndorsement });
    },
  },
};
</script>
<style lang="less" scoped>
//ESTILOS GENERALES DEL ACORDEON
@import "~@/assets/style/AccordionStyle.less";
@import "~@/assets/style/FilesStyle.less";

.endorsement-cancellation {
  width: 100%;
  height: auto;
  border-radius: 5px;
  background: white;
  //box-shadow: 8px 8px 12px rgba(10, 63, 102, 0.15);
  margin-top: 28px;
  margin-bottom: 28px;
  padding: 0 20px;
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

.input-row {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-content: center;
  align-items: flex-start;
  justify-content: flex-start;
}

.table-container {
  margin: 30px 0;
}

.title-col {
  width: 15%;
}

.table-title-space {
  height: 54px;
}

.col-subtitle {
  min-height: 40px;
  font-weight: 800;
  display: flex;
  align-items: center;
}

.table-col {
  width: 35%;

  .inner-col {
    width: 50%;
  }
}

.table-title {
  height: 50px;
  color: white;
  font-weight: 800;
  background-color: #547fa9;
  margin: 2px;
  font-size: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.leftStyle {
  border-top-left-radius: 6px;
  border-bottom-left-radius: 6px;
}

.rightStyle {
  border-top-right-radius: 6px;
  border-bottom-right-radius: 6px;
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

.inner-title {
  // width: 100%;
  font-size: 20px;
  font-weight: 800;
  margin: 15px 0;
  // padding: 24px;
}

.ExpansionComponent {
  z-index: 0;
}

.ExpansionBordered {
  border-radius: 5px;
}

.ExpansionComponent,
.SubExpansionComponent {
  width: 100%;
  height: auto;

  //TITULO DEL ACORDEON
  .ExpansionTitle {
    font-weight: 600;
    font-size: 20px;
    height: 55px;
    text-transform: capitalize;

    .subIconCont {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;

      .SubExpansionTitle {
        font-weight: 600 !important;
        font-size: 16px;

        .SubIconCont {
          width: 30px;
          height: 30px;
          background: #d2deed;
          border-radius: 35px;
          margin-right: 15px;

          i {
            font-size: 18px;
            color: #003d6d;
            margin-top: -1px;
            margin-left: 1px;
          }
        }
      }
    }
  }
}

.head-items-cont-checkbox {
  display: flex;
  justify-content: left;
  align-items: center;
  width: 100%;
}

.endorsement-title {
  font-weight: 800;
  font-size: 18px;
  color: #003d6d;
}
</style>
