<template>
  <div class="BarNavGeneralContent">
    <div class="BarNavGeneralCont d-flex">
      <!--LINKS-->
      <router-link to="/subscription/" class="BarNavLinkApp d-flex justify-ceter align-center" :class="link1">
        Registered <br class="ShowOnMovil" />
        Accounts
      </router-link>

      <router-link
        to="/underwriting/submission"
        class="BarNavLinkApp ml-5 d-flex justify-ceter align-center"
        :class="link2"
        @click.native="$store.state.facultativeReference = null"
      >
        Underwriting
      </router-link>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
export default {
  name: 'SubscriptionBarNav',
  props: {
    //DEFINE QUE ESTILOS AÑADIMOS A LOS LINKS
    link1: String,
    link2: String,
  },
  computed: {
    ...mapGetters(['facultativeReference']),
  },
};
</script>
<style lang="less" scoped>
@import '~@/assets/style/BarNav.less';
</style>
