<template>
  <div class="table-wrapper">
    <table class="subscription-table">
      <thead>
        <tr>
          <th class="ref">Ref Number</th>
          <th class="country">Country</th>
          <th class="risk">Line of Business</th>
          <th class="submission_name">Name</th>
          <th class="broker">Broker</th>
          <th class="cedent">Cedent</th>
          <th class="status">Status</th>
          <th class="expedition">Expedition Risk</th>
          <th class="inception">Inception Date</th>
          <th class="expiry">Expiry Date</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, i) in list" :key="i">
          <td class="ref" @click="redirect(item.id, item.insured_name)">
            {{ item.reference || "N/D" }}
          </td>
          <td class="country">
            {{ item.country != undefined ? item.country : "N/D" }}
          </td>
          <td class="risk">
            {{ item.risk_type != undefined ? item.risk_type : "N/D" }}
          </td>
          <td class="submission_name">
            {{ item.insured_name ? item.insured_name : "N/D" }}
          </td>
          <td class="broker">
            {{ item.broker_name ? item.broker_name : "N/D" }}
          </td>
          <td class="cedent">
            {{ item.cedent_name ? item.cedent_name : "N/D" }}
          </td>
          <td class="status">
            {{ item.status }}
          </td>
          <td class="expedition">
            {{ formatDateMoment(item.created_at) }}
          </td>
          <td class="inception">
            {{ formatDateMoment(item.inception_date) }}
          </td>
          <td class="expiry">
            {{ formatDateMoment(item.expiry_date) }}
          </td>
        </tr>
      </tbody>
      <!-- <div class="TableBodyContent mt-4">

        <div class="TableContentInner scrollable" ref="tableContentInner">
          <div v-for="(item, i) in list" :key="i"
            class="TableBodyContSn d-flex justify-start align-start clickable"
            :style="{
              width: '100%',
            }"
            @click="redirect(item.id, item.insured_name)"
          >

            <div class="TableBodyTextLink d-flex justify-start align-center row1">
              <div v-if="item.facultative_reference">
                {{ item.facultative_reference != undefined ? item.facultative_reference : "N/D" }}
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
      </div> -->
    </table>
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
  },
  mounted() {
    this.$nextTick(() => {
      const el = this.$refs.tableContentInner;
      if (el) {
        const width = el.offsetWidth;
      }
    });
  },
};
</script>

<style lang="less" scoped>
@import "~@/assets/global.less";
@import "~@/assets/style/Claims/Table.less";
@import "~@/assets/style/Subscription/Table.less";
/*
  Controla el ancho de cada columna empezando por ref number
*/
.clickable {
  cursor: pointer;
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
