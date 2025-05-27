<template>
  <div
    class="ContactInformation d-flex justify-center align-start align-content-start flex-wrap"
  >
    <!--TITULO-->
    <div class="TitleSection d-flex justify-start align-center">
      <h4>Contact Information</h4>
    </div>

    <!--CONTENIDO-->

    <div
      class="ContentDashboard d-flex justify-space-between align-center pa-5"
    >
      <!--IMAGEN-->
      <!-- <div class="ImageCont d-flex justify-center align-center">
			<v-avatar size="65" class="AvatarCnt">
		    <img
		      src="https://cdn.vuetifyjs.com/images/john.jpg"
		      alt="John"
		    >
    	</v-avatar>
		</div> -->

      <!--INFO-->
      <div class="InfoCont flex-wrap">
        <div class="InfoLine">
          Name:
          <b
            >{{ this.$store.state.auth.user.name }}
            {{ this.$store.state.auth.user.lastName }}</b
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
  height: 150px;
  background-color: #fff;

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
