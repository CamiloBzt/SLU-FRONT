<template>
  <div class="BarNavGeneralContent mt-4">
    <div class="BarNavGeneralCont d-flex">
      <!--LINKS-->
      <router-link
        to="/create/broker"
        class="BarNavLinkApp mr-3 d-flex justify-ceter align-center"
				active-class="lnkActive"
      >
        New Broker
      </router-link>

      <router-link
        to="/create/cedent"
        class="BarNavLinkApp mr-3 d-flex justify-ceter align-center"
				active-class="lnkActive"
      >
        New Cedent
      </router-link>

      <router-link
        to="/create/user"
        class="BarNavLinkApp mr-3 d-flex justify-ceter align-center"
				active-class="lnkActive"
      >
        New SLU User
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "CreateBarNav",
};
</script>

<style lang="less" scoped>
@import "~@/assets/style/BarNav.less";
</style>
