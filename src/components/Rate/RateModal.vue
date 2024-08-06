<template>
  <div v-if="modalRate" class="Modal d-flex justify-center align-center">
    <div class="ModalContent d-flex flex-wrap align-start justify-center">
      <!--BOTON CERRAR-->
      <div @click="setModalRate(typeRate)" class="CloseModalBtn">
        <v-btn class="btn" icon>
          <img class="iconClose" src="@/assets/img/icons/close.png" />
        </v-btn>
      </div>
      <div class="ContScroll scrollable">
        <div class="Cont">
          <!--TITULO-->
          <div class="Title d-flex justify-start">
            <h5>Authorized</h5>
          </div>

          <div class="ProportionalCont">
            <Proportional />
          </div>
          <Deductions />
          <CatRates ref="rates" />
          <CatTable ref="table" />
          <NonCat ref="noncat" />
          <Summary ref="summary" />
          <div class="ButtonsCont d-flex flex-column">
            <v-btn
              color="#003D6D"
              @click="saveForm()"
              class="Btn"
              outlined
              rounded
              :loading="loader"
            >
              Load
            </v-btn>
            <v-btn
              @click="setModalRate(typeRate)"
              color="#003D6D"
              class="Btn White"
              rounded
            >
              Exit
            </v-btn>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters } from "vuex";
import Proportional from "@/components/Rate/Proportional";
import Deductions from "@/components/Rate/Deductions";
import CatRates from "@/components/Rate/CatRates";
import CatTable from "@/components/Rate/CatTableProp";
import NonCat from "@/components/Rate/NonCat";
import Summary from "@/components/Rate/Summary";

import Decimal from "decimal.js";
import numeral from "numeral";

export default {
  name: "RateModalProperty",
  data() {
    return {
      loader: false,
    };
  },
  components: {
    Proportional,
    Deductions,
    CatRates,
    CatTable,
    Summary,
    NonCat,
  },
  computed: {
    ...mapState(["modalRate"]),
    ...mapGetters({
      premium: "premium",
      premiumNon: "premiumNon",
      tiv: "tiv",
    }),
    typeRate() {
      return "close";
    },
  },
  methods: {
    ...mapMutations(["setModalRate"]),
    async saveForm() {
      this.loader = true;

      const rates = this.$refs.rates;
      const table = this.$refs.table;
      const noncat = this.$refs.noncat;

      const incorrect = rates.$v.$error || table.$v.$error || noncat.$v.$error;

      if (incorrect) {
        this.loader = false;
      }

      this.premium.propertyDamageRate = Decimal(
        numeral(
          (`${this.$refs.summary.totalRate}` || "$0").replace(/[^0-9.]/g, "")
        ).value() || 0
      );
      this.premium.businessInterruptionRate = Decimal(
        numeral(
          (`${this.$refs.summary.totalRate}` || "$0").replace(/[^0-9.]/g, "")
        ).value() || 0
      );
      // this.premium.businessInterruptionRate = Decimal(numeral((`${this.$refs.summary.premiumRate}` || '$0').replace(/[^0-9.]/g, '')).value() || 0);
      this.premiumNon.rate = Decimal(
        numeral(
          (`${this.$refs.summary.totalRate}` || "$0").replace(/[^0-9.]/g, "")
        ).value() || 0
      );

      this.premium.stockRate = Decimal.mul(
        this.premium.propertyDamageRate || 0,
        this.tiv.porcentaje || 0
      ).div(100);

      setTimeout(() => {
        this.loader = false;
        this.setModalRate(this.typeRate);
      }, 1000);
    },
  },
};
</script>
<style lang="less" scoped>
//CONTENEDOR DE QUOTATION
@import "~@/assets/style/AccordionStyle.less";

.Modal {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 5000;
  background: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100%;
  padding: 5px;

  .ModalContent {
    width: 95%;
    height: 94%;
    background: white;
    padding: 25px 10px;
    border-radius: 15px;
    position: relative;

    //CERRAR MODAL
    .CloseModalBtn {
      width: auto;
      height: auto;
      position: absolute;
      right: -15px;
      top: -15px;
      z-index: 1000;
      border-radius: 25px;
      cursor: pointer;
      .btn {
        width: 30px !important;
        height: 30px !important;
        .iconClose {
          width: 34px;
          height: 34px;
        }
      }
    }

    .ContScroll {
      width: 100%;
      height: 100%;
      overflow: auto;
      .Cont {
        width: 100%;
        height: auto;
        padding: 0px 15px;

        .Title {
          width: 100%;
          height: 50px;
          h5 {
            font-size: 20px;
            font-weight: 600;
            color: black;
          }
        }

        .ProportionalCont {
          width: 100%;
          height: auto;
        }

        .ButtonsCont {
          width: 100%;
          height: 100px;
          align-items: flex-end;
          align-content: space-between;
          justify-content: center;

          .Btn {
            width: 190px;
            text-transform: none;
            height: 40px;
          }
          .White {
            color: white;
            margin-top: 15px;
          }
        }
      }
    }
  }
}
</style>
