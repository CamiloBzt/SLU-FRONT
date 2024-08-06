<template>
  <div class="BarNavGeneralContent">
    <div class="BarNavGeneralCont d-flex">
      <!--LINKS-->
      <router-link to="/portfolio" class="BarNavLinkApp d-flex justify-ceter align-center" :class="link1">
        Payment Status
      </router-link>

      <router-link to="/portfolio/payment-request/" class="BarNavLinkApp ml-5 d-flex justify-ceter align-center" :class="link2">
        Payment Request
      </router-link>

      <router-link to="/portfolio/balance/" class="BarNavLinkApp ml-5 d-flex justify-ceter align-center" :class="link3">
        Balance
      </router-link>
    </div>
  </div>
</template>
<script>
export default {
  name: 'BarNavPortfolio',
  props: {
    //DEFINE QUE ESTILOS AÑADIMOS A LOS LINKS
    link1: String,
    link2: String,
    link3: String,
  },
};
</script>
<style lang="less" scoped>
@import '~@/assets/style/BarNav.less';
</style>
