<template>
  <div class="BarNavGeneralContent">
    <div class="BarNavGeneralCont d-flex">
      <!--LINKS-->
      <router-link
        v-for="navData in NavContent"
        :key="navData.id"
        :to="navData.path" 
        class="BarNavLinkApp d-flex justify-ceter align-center" 
        :class="navData.active === true ? 'lnkActive' : '' " 
        >
        {{ navData.text }}
      </router-link>
    </div>
  </div>
</template>
<script>
export default {
  name: 'BarNavComponent',
  props: {
    NavContent:Array
  },
};
</script>
<style lang="less" scoped>
@import '~@/assets/style/BarNav.less';
.BarNavGeneralCont .BarNavLinkApp:not(:first-child) {
  margin-left: 15px;
}
</style>
