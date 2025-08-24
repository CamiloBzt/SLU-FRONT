<template>
  <div>
    <div class="TableTitle d-flex justify-space-between align-center mb-5">
      Accounts
      <div class="TableControlsCont ShowFlexOnMovil justify-space-between align-center">
        <div @click="moveLeftTable()" class="ControlBtn d-flex justify-center align-center">
          <v-icon>mdi-chevron-left</v-icon>
        </div>
        <div @click="moveRightTable()" class="ControlBtn d-flex justify-center align-center">
          <v-icon>mdi-chevron-right</v-icon>
        </div>
      </div>
    </div>
    <div class="table-wrapper">
      <table class="subscription-table">
        <thead>
          <tr>
            <th class="ref">Ref Number</th>
            <th class="name">Insured Name</th>
            <th class="name">Net premium SLU USD</th>
            <th class="expidition">PPW</th>
            <th class="name">Clause</th>
            <th class="expidition">Advance notice</th>
            <th class="expidition">Primary notice</th>
            <th class="name">Payment Status</th>
            <th class="status">Overdue days</th>
            <th class="name">Notification Send</th>
            <th class="status">Payment Status</th>
            <th class="name">Comments</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(data, i) in dataTable" :key="i" @mouseleave="showExtraInformation = false">
            <td class="ref" @mouseenter="openMoreInformationWrapper(data.informationExtra)" @click="goToPaymentRequest(data.subscriptionId)">
              {{ data.refNumber }}
            </td>
            <td class="name">{{ data.insuredName }}</td>
            <td class="name">{{ data.netPremiumSluUsd }}</td>
            <td class="expidition">{{ data.ppw }}</td>
            <td class="name">{{ data.clause }}</td>
            <td class="expidition">{{ data.advanceNotice }}</td>
            <td class="expidition">{{ data.primaryNotice }}</td>
            <td class="name">{{ data.paymentStatus }}</td>
            <td class="status">{{ data.overdueDays }}</td>
            <td class="name">{{ data.notificationSent }}</td>
            <td @click="emitShowModal({ ref: data.refNumber, walletId: data.walletId })" class="status">
              <img class="image-icon" src="@/assets/img/comment-icon.png" />
            </td>
            <td v-if="showExtraInformation" class="name">
              <div v-for="(informationExtra, index) in data.informationExtra" :key="index">
                <b> {{ informationExtra.name }}: </b>
                <div>{{ informationExtra.value }}</div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!--div v-for="(data, index) in dataTable" :key="index" @mouseleave="showExtraInformation = false" class="TableBodyContSn table-line d-flex justify-center text-center align-start">
      <div @mouseenter="openMoreInformation(data.informationExtra.length)" @click="goToPaymentRequest(data.subscriptionId)" class="">
        {{ data.refNumber }}
      </div>
      <div class="TableBodyText d-flex justify-center text-center align-center row2">
        {{ data.insuredName }}
      </div>
      <div class="TableBodyText d-flex justify-center text-center align-center row3">
        {{ data.netPremiumSluUsd }}
      </div>
      <div class="TableBodyText d-flex justify-center text-center align-center row4">
        {{ formatDate(data.ppw) }}
      </div>
      <div class="TableBodyText d-flex justify-center text-center align-center row5">
        {{ data.clause }}
      </div>
      <div class="TableBodyText d-flex justify-center text-center align-center row6">
        {{ formatDate(data.advanceNotice) }}
      </div>
      <div class="TableBodyText d-flex justify-center text-center align-center row7">
        {{ formatDate(data.primaryNotice) }}
      </div>
      <div class="TableBodyText d-flex justify-center text-center align-center row8">
        {{ data.paymentStatus }}
      </div>
      <div class="TableBodyText d-flex justify-center text-center align-center row9">
        {{ data.overdueDays }}
      </div>
      <div class="TableBodyText d-flex justify-center text-center align-center row10">
        {{ data.notificationSent }}
      </div>
      <div @click="emitShowModal({ ref: data.refNumber, walletId: data.walletId })" class="TableBodyText d-flex justify-center align-center row11">
        <img class="image-icon" src="@/assets/img/comment-icon.png" />
      </div>
      <div v-if="showExtraInformation" class="table-line__information-extra">
        <div v-for="(informationExtra, index) in data.informationExtra" :key="index" class="information-extra">
          <b> {{ informationExtra.name }}: </b>
          <div>
            {{ informationExtra.value }}
          </div>
        </div>
      </div>
    </div>-->
  </div>
</template>
<script>
import { formatDateWallet } from "@/lib/utils";
export default {
  name: "AppTable",
  data: () => {
    return {
      formatDate: formatDateWallet,
      showExtraInformation: false,
    };
  },
  props: {
    dataTable: {
      required: false,
    },
  },
  methods: {
    openMoreInformation(informationExtra) {
      if (Array.isArray(informationExtra) && informationExtra.length > 0) {
        this.showExtraInformation = true;
      }
    },
    openMoreInformationWrapper(informationExtra) {
      this.openMoreInformation(informationExtra);
    },
    emitShowModal(ref, walletId) {
      this.$emit("showModal", { ref, walletId });
    },
    goToPaymentRequest(subscriptionId) {
      this.$router.push(`/wallet/${subscriptionId}/payment-request`);
    },
  },
};
</script>
<style lang="less" scoped>
@import "~@/assets/style/Subscription/Table.less";
</style>
