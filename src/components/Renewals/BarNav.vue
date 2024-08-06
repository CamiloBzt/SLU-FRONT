<template>
  <div class="BarNavGeneralContent">
    <div class="BarNavGeneralCont d-flex">
      <!--LINKS-->
      <router-link to="/renewals/accounts" class="BarNavLinkApp d-flex justify-ceter align-center" :class="link1">
        Registered Accounts
      </router-link>

      <router-link to="/renewals/subscription" class="BarNavLinkApp ml-5 d-flex justify-ceter align-center" :class="link2">
        Underwriting
      </router-link>
    </div>
  </div>
</template>
<script>
export default {
  name: 'BarNavRenewals',
  props: {
    //DEFINE QUE ESTILOS AÑADIMOS A LOS LINKS
    link1: String,
    link2: String,
  },
};
</script>
<style lang="less" scoped>
@import '~@/assets/style/BarNav.less';
</style>
