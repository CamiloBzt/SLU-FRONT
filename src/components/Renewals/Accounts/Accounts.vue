<template>
  <div class="SubscriptionTable mt-5">
    <div class="TableTitle d-flex justify-space-between align-center mb-5">
      <div class="title">Accounts to be renewed</div>
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
      <table class="subscription-table">
        <thead>
          <tr>
            <th class="ref">Ref Number</th>
            <th class="name">Country</th>
            <th class="name">Line of Business</th>
            <th class="Inception">Broker</th>
            <th class="Inception">Inception Date</th>
            <th class="Inception">Expiring Date</th>
            <th class="status">Status</th>
            <th class="status">Notes</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, i) in list" :key="i">
            <td
              class="ref"
              @click="createRenewalAccount({ id: item.id, section: 'bound' })"
            >
              {{ item.reference != undefined ? item.reference : "N/D" }}
            </td>
            <td class="name">
              {{ item.country != undefined ? item.country : "N/D" }}
            </td>
            <td class="name">
              {{ item.risk_type != undefined ? item.risk_type : "N/D" }}
            </td>
            <td class="Inception">
              {{ item.broker != undefined ? item.broker : "N/D" }}
            </td>
            <td class="Inception">
              {{ formatDateMoment(item.created_at) }}
            </td>
            <td class="Inception">
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
    <!--Boton
    <div  class="ButtonTableCont d-flex justify-end align-center">
      <v-btn class="Btn" depressed rounded color="#003D6D">
      	See More Accounts
      </v-btn>
    </div>
    -->
  </div>
</template>
<script>
import { mapActions, mapState } from "vuex";
import moment from "moment";
import { tableControl } from "@/mixins/subscription.js";
moment.locale("es");
export default {
  name: "AccountsRenewals",
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
    };
  },
  mixins: [tableControl],
  computed: {
    ...mapState({
      list: (state) => state.subscription.table.list,
    }),
  },
  methods: {
    ...mapActions([
      "getSubscriptionList",
      "loadSubscription",
      "createRenewalAccount",
    ]),
    ShowNotesHistory(idSubscription) {
      this.$emit("ShowNotesHistory", idSubscription);
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
  },
  beforeMount() {
    this.getSubscriptionList(this.pagination);
  },
};
</script>
<style lang="less" scoped>
@import "~@/assets/global.less";
@import "~@/assets/style/Subscription/Table.less";
</style>
