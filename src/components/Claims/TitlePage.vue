<template>
  <div
    class="TitlePageComponent justify-space-between align-center HideOnMovil"
  >
    <!--TITULO-->
    <h4>
      {{ title }}
    </h4>

    <div class="Actions">
      <Searcher />
      <Notifications />
    </div>
  </div>
</template>
<script>
import Notifications from "@/components/Menu/Notifications";
import Searcher from "@/components/Claims/Filters/Searcher";
export default {
  name: "TitlePage",
  props: {
    title: String,
  },
  components: {
    Notifications,
    Searcher,
  },
};
</script>
<style lang="less" scoped>
.TitlePageComponent {
  width: 100%;
  height: 70px;
  position: relative;
  display: flex;
  h4 {
    font-weight: 700;
    font-size: 23px;
  }

  .Actions {
    width: 90px;
    height: 50px;
    position: absolute;
    right: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}

@media (max-width: 600px) {
  .TitlePageComponent {
    height: 60px;
    h4 {
      font-size: 19px;
      text-overflow: all;
      display: flex;
      white-space: nowrap !important;
    }
  }
}
</style>
