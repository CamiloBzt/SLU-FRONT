<template>
  <div class="ContactInformation d-flex justify-center align-start align-content-start flex-wrap">
    <!--TITULO-->
    <div class="TitleSection d-flex justify-start align-center">
      <h4>Notifications</h4>
    </div>

    <!--CARD NOTIFICATIONS-->

    <!-- {{ this.notificationList }} -->

    <!--Notifications-->
    <div v-for="noty in notificationList" :key="noty.id" @click="TrackModal(noty.subscription_id)" class="ContentDashboard d-flex mb-6">
      <div class="ImageCont d-flex justify-center align-center">
        <v-avatar size="40" class="AvatarCnt">
          <v-icon v-if="noty.status === 'REVIEW'" large color="rgb(0 61 109)">mdi-checkbox-blank-circle-outline</v-icon>
          <v-icon v-if="noty.status === 'VALIDATING'" large color="yellow">mdi-alert-circle-outline</v-icon>
          <v-icon v-if="noty.status === 'REJECTED'" large color="red">mdi-close-circle-outline</v-icon>
          <v-icon v-if="noty.status === 'ACCEPTED'" large color="green">mdi-check-circle-outline</v-icon>
        </v-avatar>
      </div>

      <!--INFO-->
      <div class="InfoCont flex-wrap">
        <div class="InfoLine">
          <b>{{ noty.reference }}</b
          ><br />
          You asked {{ noty.NotifyingUser.name }} {{ noty.NotifyingUser.last_name }} for a review
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions } from "vuex";

export default {
  name: "Notifications",
  data() {
    return {
      subscription_id: 0,
      notificationList: this.$store.state.socket.notificationList,
    };
  },
  methods: {
    ...mapActions(["getNotificationsFourEye"]),
    TrackModal(id) {
      this.subscription_id = id;
      this.$emit("TrackModal", id);
    },
  },
  async beforeMount() {
    this.notificationList = await this.getNotificationsFourEye(this.$store.state.auth.user.id);
  },
};
</script>
<style lang="less" scoped>
@import "~@/assets/style/Dashboard/General.less";

.ContentDashboard {
  height: 150px;
  background-color: #fff;
  cursor: pointer;

  .ImageCont {
    width: 30%;
    height: 100%;
  }

  .InfoCont {
    width: 68%;
    height: 100%;
    margin-left: 2%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    align-content: center;

    //DATOS
    .InfoLine {
      font-size: 14px;
    }
  }
}
</style>
