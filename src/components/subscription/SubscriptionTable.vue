<template>
  <div class="SubscriptionTable mt-5">
    <!--TITULO DE LA TABLA-->
    <!-- {{ list }} -->
    <div class="TableTitle d-flex justify-space-between align-center">
      <!--TITULO-->
      Accounts

      <div
        class="TableControlsCont ShowFlexOnMovil justify-space-between align-center"
      >
        <div
          @click="moveLeftTable()"
          class="ControlBtn d-flex justify-center align-center"
        >
          <v-icon>mdi-chevron-left</v-icon>
        </div>

        <div
          @click="moveRightTable()"
          class="ControlBtn d-flex justify-center align-center"
        >
          <v-icon>mdi-chevron-right</v-icon>
        </div>
      </div>
    </div>

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
          Line of Risk
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
          Expedition Date
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
        <div
          class="TableHeadName d-flex justify-start align-center row11 endorsements"
        >
          Endorsements
        </div>
        <div class="TableHeadName d-flex justify-center align-center row11">
          Notes
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
            class="TableBodyContSn d-flex justify-start align-start"
            :style="{
              width:
                tableBodyContSnWidth > 0 ? `${tableBodyContSnWidth}px` : '100%',
            }"
          >
            <!--INFORMACIÓN DE LA TABLA-->
            <div
              class="TableBodyTextLink d-flex justify-start align-center row1"
              @click="setSubscriptionInfo(item)"
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
            <div
              class="TableBodyText d-flex justify-start align-center overflow-hidden row3"
            >
              {{ item.risk_type != undefined ? item.risk_type : "N/D" }}
            </div>
            <div
              class="TableBodyText d-flex justify-start align-center overflow-hidden row4"
            >
              {{ item.submission_name ? item.submission_name : "N/D" }}
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
            <div class="endorsements-icon">
              <img
                @click="item.status === 'Bound Complete' && redirect(item)"
                src="@/assets/img/endorsements-icon.png"
                :class="
                  item.status === 'Bound Complete'
                    ? 'endorsements-unlock'
                    : 'endorsements-lock'
                "
              />
            </div>
            <div
              @click="ShowNotesHistory(item.id)"
              class="TableBodyText d-flex justify-center align-center row11"
            >
              <v-icon>mdi-comment-outline</v-icon>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import { mapActions, mapState } from "vuex";
import router from "../../router";
moment.locale("es");
export default {
  name: "SubscriptionTable",
  data() {
    return {
      pagination: {
        limit: 10,
        offset: 0,
      },
      columsArray: [
        {
          refNumber: "Ref number",
          country: "Country",
          typeOfRisk: "Type of Risk ",
          Broker: "Broker",
          inceptionDate: "Inception date",
          expiringDate: "Expiry date",
          status: "status",
        },
      ],
      tableBodyContSnWidth: 0,
    };
  },
  computed: {
    ...mapState({
      list: (state) => state.subscription.table.list,
    }),
  },
  methods: {
    ...mapActions(["getSubscriptionList", "loadSubscription"]),
    redirect(item) {
      const { id } = item;
      const accountType =
        item.risk_type === "Construction All Risk" ||
        item.risk_type === "Eraction All Risk"
          ? "engineering"
          : "property-quotator";
      router.push(`/endorsements/${accountType}/${id}`);
    },
    moveRightTable() {
      this.sideScroll("right", 25, 100, 10);
    },
    moveLeftTable() {
      this.sideScroll("left", 25, 100, 10);
    },
    ShowNotesHistory(idSubscription) {
      this.$emit("ShowNotesHistory", idSubscription);
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
    setSubscriptionInfo(item) {
      this.loadSubscription(item);
      this.$router.push(`/underwriting/${item.id}/submission`);
    },
  },
  beforeMount() {
    this.getSubscriptionList(this.pagination);
  },
  mounted() {
    this.tableBodyContSnWidth = this.$refs.tableContentInner.offsetWidth;
    console.table([...this.list]);
  },
};
</script>

<style lang="less" scoped>
@import "~@/assets/style/Subscription/Table.less";

/*
  Controla el ancho de cada columna empezando por ref number
*/
.row1 {
  width: 10% !important;
  padding-left: 15px;
}

.row2 {
  width: 8% !important;
}

.row3 {
  width: 8% !important;
}

.row4 {
  width: 8% !important;
}

.row5 {
  width: 9% !important;
}

.row6 {
  width: 18% !important;
}

.row7 {
  width: 9% !important;
}

.row8 {
  width: 8.5% !important;
}

.row9 {
  width: 8.5% !important;
}

.row10 {
  width: 6% !important;
}

.row11 {
  width: 7% !important;
  cursor: pointer;

  i {
    color: #d2deed;
  }
}

.endorsements {
  width: 8% !important;
  justify-content: center;
  align-items: center !important;
}

.endorsements-icon {
  width: 8%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.endorsements-unlock {
  opacity: 0.1;
  cursor: pointer;
}

.endorsements-lock {
  opacity: 0.1;
  cursor: not-allowed;
}
</style>
