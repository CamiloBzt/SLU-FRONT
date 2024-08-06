<template>
  <div class="BarNavGeneralContent">
    <div class="BarNavGeneralCont d-flex">
      <router-link to="#" class="BarNavLinkApp d-flex justify-ceter align-center lnkActive">
        Payment Request
      </router-link>

      <router-link to="#" class="BarNavLinkApp ml-5 d-flex justify-ceter align-center">
        Payment Record
      </router-link>
    </div>
  </div>
</template>
<script>
export default {
  name: 'BarNavPortfolio',
};
</script>
<style lang="less" scoped>
@import '~@/assets/style/BarNav.less';
</style>

