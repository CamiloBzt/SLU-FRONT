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
          <th class="endorsements">Endorsements</th>
          <th class="notes">Notes</th>
          <th class="expedition">Expedition Date</th>
          <th class="inception">Inception Date</th>
          <th class="expiry">Expiry Date</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, i) in list" :key="i">
          <td class="ref" @click="setSubscriptionInfo(item)">
            {{
              item.facultative_reference != undefined &&
              item.facultative_reference !== ""
                ? item.facultative_reference
                : item.reference != undefined && item.reference !== ""
                ? item.reference
                : "N/D"
            }}
          </td>
          <td class="country">{{ item.country || "N/D" }}</td>
          <td class="risk">{{ item.risk_type || "N/D" }}</td>
          <td class="submission_name">{{ item.submission_name || "N/D" }}</td>
          <td class="broker">{{ item.broker_name || "N/D" }}</td>
          <td class="cedent">{{ item.cedent_name || "N/D" }}</td>
          <td class="status">{{ item.status || "N/D" }}</td>
          <td class="endorsements">
            <img
              @click="item.status === 'Bound Complete' && redirect(item)"
              src="@/assets/img/endorsements-icon.png"
              :class="
                item.status === 'Bound Complete'
                  ? 'endorsements-unlock'
                  : 'endorsements-lock'
              "
            />
          </td>
          <td class="notes">
            <v-icon @click="ShowNotesHistory(item.id)"
              >mdi-comment-outline</v-icon
            >
          </td>
          <td class="expedition">{{ formatDateMoment(item.created_at) }}</td>
          <td class="inception">{{ formatDateMoment(item.inception_date) }}</td>
          <td class="expiry">{{ formatDateMoment(item.expiry_date) }}</td>
        </tr>
      </tbody>
    </table>
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
    this.$nextTick(() => {
      const el = this.$refs.tableContentInner;
      if (el) {
        const width = el.offsetWidth;
        console.log("Ancho del contenedor:", width);
      }
    });
  },
};
</script>

<style lang="less" scoped>
@import "~@/assets/style/Subscription/Table.less";

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
  opacity: 1 !important;
  cursor: pointer;
  transition: filter 0.3s ease;
}

.endorsements-lock {
  opacity: 0.3 !important;
  cursor: not-allowed !important;
  filter: grayscale(100%);
}
</style>
