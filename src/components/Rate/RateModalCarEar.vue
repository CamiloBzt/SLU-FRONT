<template>
  <div v-if="modalRateCarEar" class="Modal d-flex justify-center align-center">
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
            <h5>Quotation</h5>
          </div>

          <div class="ProportionalCont">
            <Proportional />
          </div>
          <Deductions />
          <CatRates ref="rates" />
          <CatTable ref="table" />
          <NonCatLarge ref="nonlarge" />
          <AlopRate ref="alop" />
          <SummaryCarEar ref="summary" />

          <div class="ButtonsCont d-flex flex-column">
            <v-btn color="#003D6D" @click="saveForm()" :loading="loader" class="Btn buttons-modal-car" outlined rounded> Load </v-btn>
            <v-btn @click="setModalRate(typeRate)" color="#003D6D" class="Btn White" rounded> Exit </v-btn>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters, mapActions } from "vuex";

import Proportional from "@/components/Rate/Proportional";
import Deductions from "@/components/Rate/Deductions";
import CatRates from "@/components/Rate/CatRates";
import CatTable from "@/components/Rate/CatTable";
import AlopRate from "@/components/Rate/AlopRate";
import NonCatLarge from "@/components/Rate/NonCatLarge";
import SummaryCarEar from "@/components/Rate/SummaryCarEar";

export default {
  name: "RateModalCar",
  components: {
    Proportional,
    Deductions,
    CatRates,
    NonCatLarge,
    CatTable,
    SummaryCarEar,
    AlopRate,
  },
  data() {
    return {
      loader: false,
    };
  },
  computed: {
    ...mapState(["modalRateCarEar"]),
    ...mapGetters({
      globalRates: "rates",
      alopRate: "alopRate",
      premium: "premium",
    }),
    typeRate() {
      return "close";
    },
  },
  methods: {
    ...mapActions(["saveQuotationColumn", "saveRateAndAlopCurrency"]),
    ...mapMutations(["setModalRate", "setStatePremium", "SET_BOUND_INSURABLE"]),
    async saveForm() {
      this.loader = true;

      const rates = this.$refs.rates;
      const table = this.$refs.table;
      const nonlarge = this.$refs.nonlarge;
      const alop = this.$refs.alop;

      const incorrect = rates.$v.$error || table.$v.$error || nonlarge.$v.$error || alop.$v.$error;

      if (incorrect) {
        this.loader = false;
        // console.log(rates.$v, table.$v, nonlarge.$v, alop.$v);
      }

      this.premium.businessInterruptionRate = this.alopRate.finalRate;
      this.premium.propertyDamageRate = this.$refs.summary.damageRate;
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
    width: 85%;
    height: 94%;
    background: white;
    padding: 25px 10px;
    border-radius: 5px;
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
        border-radius: 5px;
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
            border-radius: 5px;
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
