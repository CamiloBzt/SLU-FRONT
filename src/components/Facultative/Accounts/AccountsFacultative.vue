<template>
  <div>
    <div class="TableTitle d-flex justify-space-between align-center pt-4">
      <!--Titulo-->
      <div class="title">Facultative 2</div>
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
    <div class="table-wrapper">
      <table class="SubscriptionTable mt-5">
        <!--Titulos de la tabla-->
        <thead>
          <tr>
            <th class="id">Ref Number 2</th>
            <th class="country">Country</th>
            <th class="risk">Line of Business</th>
            <th class="broker">Broker</th>
            <th class="inception">Inception Date</th>
            <th class="expedition">Expiring Date</th>
            <th class="status">Status Date</th>
            <th class="status">Notes</th>
          </tr>
        </thead>
        <!--Columnas de la tabla-->
        <tbody>
          <tr
            v-for="(item, i) in list"
            :key="i"
            class="TableBodyContSn d-flex justify-start align-start"
            :style="{
              width:
                tableBodyContSnWidth > 0 ? `${tableBodyContSnWidth}px` : '100%',
            }"
          >
            <td class="ref" @click="setSubscriptionInfo(item)">
              {{ getItemReference(item.reference) }}
            </td>
            <td class="country">
              {{ item.country != undefined ? item.country : "N/D" }}
            </td>
            <td class="risk">
              {{ item.risk_type != undefined ? item.risk_type : "N/D" }}
            </td>
            <td class="broker">
              {{ getItemBroker(item.broker) }}
            </td>
            <td class="inception">
              {{ formatDateMoment(item.created_at) }}
            </td>
            <td class="expedition">
              {{ formatDateMoment(item.created_at) }}
            </td>
            <td class="status">
              {{ item.status }}
            </td>
            <td @click="ShowNotesHistory(item.id)" class="status">
              <v-icon>mdi-comment-outline</v-icon>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";
import moment from "moment";
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
          expiringDate: "Expiring date",
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
    ...mapGetters(["availableBrokers"]),
  },
  methods: {
    ...mapActions(["getSubscriptionList", "loadSubscription", "getBrokers"]),
    getItemReference(reference) {
      if (typeof reference === "undefined") return "N/D";
      const boundNumber = reference.replace("COT", "BOUND");
      return boundNumber;
    },
    getItemBroker(broker) {
      if (typeof broker === "undefined") return "N/D";
      const brokerName = this.availableBrokers.find((v) => v.id == broker);
      if (!brokerName) return "N/D";
      return brokerName.name;
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
        const date = moment(dateToFormat);
        const day = date.format("DD");
        const month = date.format("MM");
        const year = date.format("YYYY");
        const hour = date.format("HH:mm").toUpperCase();
        return `${day} - ${month} - ${year}`;
      } else {
        return dateToFormat;
      }
    },
    setSubscriptionInfo(item) {
      this.loadSubscription(item);
      this.$router.push(`/subscription/${item.id}/submission`);
    },
  },
  beforeMount() {
    this.getSubscriptionList(this.pagination);
  },
  async mounted() {
    await this.getBrokers();
    this.$nextTick(() => {
      this.tableBodyContSnWidth = this.$refs.tableContentInner;
      if (el) {
        const width = el.offsetWidth;
        //console.log("Ancho del contenedor:", width);
      }
    });
    // this.tableBodyContSnWidth = this.$refs.tableContentInner.offsetWidth;
  },
};
</script>

<style lang="less" scoped>
@import "~@/assets/style/Subscription/Table.less";
</style>
