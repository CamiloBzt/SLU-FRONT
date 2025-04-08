<template>
  <div class="AppMain d-flex flex-wrap">
    <!--MENU LATERAL IZQUIERDO-->
    <div class="LateralMenuContent HideOnMovil">
      <MenuGeneral></MenuGeneral>
    </div>

    <!--CONTENEDOR GENERAL-->
    <div class="GeneralContent FullOnMovil pl-10 pr-10">
      <!--TITULO DE LA PÁGINA-->
      <TitlePage
        :title="`${this.$store.state.auth.user.name} ${this.$store.state.auth.user.lastName}`"
      ></TitlePage>

      <!--INFORMACION DE CONTACTO-->
      <div
        class="GridDashboard d-flex justify-space-between align-start align-content-start flex-wrap"
      >
        <div class="columnLeft">
          <ContactInformation />
          <DownloadFileCards />
          <!-- <Contacts></Contacts> -->
        </div>
        <div class="columnRight">
          <NotificationsModal />
          <!-- <Calendar></Calendar>
        <WeeklyTasks></WeeklyTasks> -->
        </div>
      </div>

      <!--ESPACIO EN BLANCO-->
      <WhiteSpace></WhiteSpace>
    </div>
  </div>
</template>
<script>
import TitlePage from "@/components/TitlePage.vue";
import MenuGeneral from "@/components/Menu/MenuGeneral.vue";
import ContactInformation from "@/components/Dashboard/ContactInformation.vue";
import DownloadFileCards from "@/components/Dashboard/DownloadFileCards.vue";
// import Contacts from '@/components/Dashboard/Contacts.vue'
import NotificationsModal from "@/components/Dashboard/NotificationsModal.vue";
// import Calendar from '@/components/Dashboard/Calendar.vue'
// import WeeklyTasks from '@/components/Dashboard/WeeklyTasks.vue'

import WhiteSpace from "@/components/WhiteSpace.vue";

export default {
  name: "Home",
  components: {
    TitlePage,
    MenuGeneral,
    ContactInformation,
    DownloadFileCards,
    NotificationsModal,
    // Contacts,
    // Calendar,
    // WeeklyTasks,
    WhiteSpace,
  },
  data() {
    return {
      ShowFilters: false,
      ModalValidation: false,
      subscription_id: 0,
    };
  },
  methods: {
    //MOSTRAR EL MODAL DE FILTROS
    filtersAction() {
      this.ShowFilters = !this.ShowFilters;
    },
  },
};
</script>

<style lang="less" scoped>
.GridDashboard {
  width: 100%;
  height: auto;
  display: flex;

  .columnLeft {
    width: 33%;
    height: auto;
    margin-top: 15px;
  }

  .columnRight {
    width: 48%;
    height: auto;
    margin-top: 15px;
  }
}
</style>
