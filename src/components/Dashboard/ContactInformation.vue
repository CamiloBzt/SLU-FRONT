<template>
  <div class="ContactInformation d-flex justify-center align-start align-content-start flex-wrap">
    <div class="ContentDashboard d-flex justify-space-between align-center">
      <div class="InfoCont flex-wrap">
        <div class="TitleSection d-flex justify-start align-center">
          <h4>Contact Information</h4>
        </div>
        <div class="InfoLine">
          Name:
          <b>{{ this.$store.state.auth.user.name }} {{ this.$store.state.auth.user.lastName }}</b
          ><br />
          Contact Number: <b>{{ this.$store.state.auth.user.number }}</b
          ><br />
          Contact E-mail: <b>{{ this.$store.state.auth.user.email }}</b
          ><br />
          SLU Position: <b>{{ this.$store.state.auth.user.roleId }}</b>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ContactInformation",
};
</script>

<style lang="less" scoped>
@import "~@/assets/style/Dashboard/General.less";
.ContentDashboard {
  background-color: #fff;

  .ImageCont {
    width: 30%;
    height: 100%;
  }
  .InfoCont {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    align-content: center;

    //DATOS
    .InfoLine {
      font-size: 14px;
      padding: 20px;
    }
  }
  .TitleSection {
    background-color: #c6e2ff;
    padding-left: 20px;
  }
}
</style>
