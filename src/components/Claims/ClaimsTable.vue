<template>
  <div class="ClaimsTable">
    <div class="TableContent">
      <!--CABEZA DE LA TABLA-->
      <div class="TableHeadContent mt-7 d-flex justify-start align-start">
        <!--NOMBRES DE LAS COLUMNAS-->
        <div class="TableHeadName d-flex justify-start align-center row1">
          Ref Number
        </div>
        <div class="TableHeadName d-flex justify-start align-center row2">
          Country
        </div>
        <div class="TableHeadName d-flex justify-start align-center row3">
          Line of risk
        </div>
        <div class="TableHeadName d-flex justify-start align-center row4">
          Name
        </div>
        <div class="TableHeadName d-flex justify-start align-center row5">
          Broker
        </div>
        <div class="TableHeadName d-flex justify-start align-center row6">
          Cedent
        </div>
        <div class="TableHeadName d-flex justify-start align-center row7">
          Expediition risk
        </div>
        <div class="TableHeadName d-flex justify-start align-center row8">
          Inception Date
        </div>
        <div class="TableHeadName d-flex justify-start align-center row9">
          Expiry Date
        </div>
        <div class="TableHeadName d-flex justify-start align-center row10">
          Status
        </div>
      </div>

      <!--CUERPO DE LA TABLA-->
      <div class="TableBodyContent mt-4">
        <!--
        AQUI EMPIEZA EL CICLO A ITERAR 
        PARA MOSTRAR LAS FILAS DE LA TABLA
      -->
        <div class="TableContentInner scrollable" ref="tableContentInner">
          <div
            v-for="(item, i) in list"
            :key="i"
            class="TableBodyContSn d-flex justify-start align-start clickable"
            :style="{
              width: '100%',
            }"
            @click="redirect(item.id, item.insured_name)"
          >
            <!--INFORMACIÓN DE LA TABLA-->
            <div
              class="TableBodyTextLink d-flex justify-start align-center row1"
            >
              <div v-if="item.facultative_reference">
                {{
                  item.facultative_reference != undefined
                    ? item.facultative_reference
                    : "N/D"
                }}
              </div>
              <div v-else>
                {{ item.reference != undefined ? item.reference : "N/D" }}
              </div>
            </div>
            <div class="TableBodyText d-flex justify-start align-center row2">
              {{ item.country != undefined ? item.country : "N/D" }}
            </div>
            <div class="TableBodyText d-flex justify-start align-center row3">
              {{ item.risk_type != undefined ? item.risk_type : "N/D" }}
            </div>
            <div class="TableBodyText d-flex justify-start align-center row4">
              {{ item.insured_name ? item.insured_name : "N/D" }}
            </div>
            <div class="TableBodyText d-flex justify-start align-center row5">
              {{ item.broker_name ? item.broker_name : "N/D" }}
            </div>
            <div class="TableBodyText d-flex justify-start align-center row6">
              {{ item.cedent_name ? item.cedent_name : "N/D" }}
            </div>
            <div class="TableBodyText d-flex justify-start align-center row7">
              {{ formatDateMoment(item.created_at) }}
            </div>
            <div class="TableBodyText d-flex justify-start align-center row8">
              {{ formatDateMoment(item.inception_date) }}
            </div>
            <div class="TableBodyText d-flex justify-start align-center row9">
              {{ formatDateMoment(item.expiry_date) }}
            </div>
            <div class="TableBodyText d-flex justify-start align-center row10">
              {{ item.status }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import moment from "moment";
import router from "../../router";
moment.locale("es");
export default {
  name: "ClaimsTable",
  data() {
    return {
      pagination: {
        limit: 10,
        offset: 0,
      },
      tableBodyContSnWidth: 0,
    };
  },
  computed: {
    ...mapState({
      list: (state) => state.claims.table.list,
    }),
  },
  methods: {
    ...mapActions(["getClaimsHistoryList"]),
    redirect(id, name) {
      sessionStorage.setItem("ClaimUserName", name);
      router.push(`dashboard/${id}`);
    },
    moveRightTable() {
      this.sideScroll("right", 25, 100, 10);
    },
    moveLeftTable() {
      this.sideScroll("left", 25, 100, 10);
    },
    sideScroll(direction, speed, distance, step) {
      var container = document.querySelector(".TableContent");
      var scrollAmount = 0;
      var slideTimer = setInterval(function () {
        if (direction == "left") {
          container.scrollLeft -= step;
        } else {
          container.scrollLeft += step;
        }
        scrollAmount += step;
        if (scrollAmount >= distance) {
          window.clearInterval(slideTimer);
        }
      }, speed);
    },
    formatDateMoment(dateToFormat) {
      if (dateToFormat) {
        return moment(String(dateToFormat)).utc().format("DD - MM - YYYY");
      } else {
        return dateToFormat;
      }
    },
  },
  beforeMount() {
    this.getClaimsHistoryList(this.pagination);
    console.table([...this.list]);
    console.log(this.list);
  },
  mounted() {
    this.tableBodyContSnWidth = this.$refs.tableContentInner.offsetWidth;
  },
};
</script>

<style lang="less" scoped>
@import "~@/assets/style/Claims/Table.less";

/*
  Controla el ancho de cada columna empezando por ref number
*/
.clickable {
  cursor: pointer;
}

.row1 {
  width: 10% !important;
  padding-left: 15px;
  text-align: center;
  justify-content: center !important;
}

.row2 {
  width: 8% !important;
  text-align: center;
  justify-content: center !important;
}

.row3 {
  width: 12% !important;
  text-align: center;
  justify-content: center !important;
  padding: 0 10px;
}

.row4 {
  width: 12% !important;
  text-align: center;
  justify-content: center !important;
}

.row5 {
  width: 11% !important;
  text-align: center;
  justify-content: center !important;
}

.row6 {
  width: 10% !important;
  text-align: center;
  justify-content: center !important;
}

.row7 {
  width: 10% !important;
  text-align: center;
  justify-content: center !important;
}

.row8 {
  width: 8% !important;
  text-align: center;
  justify-content: center !important;
}

.row9 {
  width: 8% !important;
  text-align: center;
  justify-content: center !important;
}

.row10 {
  width: 12% !important;
  text-align: center;
  justify-content: center !important;
}

.claim-icon {
  width: 8%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
</style>
