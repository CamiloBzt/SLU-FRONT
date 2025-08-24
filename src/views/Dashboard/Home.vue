<template>
  <div class="AppMain d-flex flex-wrap">
    <!--Menu sidebar -->
    <div class="LateralMenuContent HideOnMovil">
      <MenuGeneral />
    </div>
    <!--Contenedor principal-->
    <div class="GeneralContent FullOnMovil pl-10 pr-10">
      <!--Titulo -->
      <TitlePage v-if="user" :title="userFullName" />
      <!--Información contacto-->
      <div class="GridDashboard d-flex justify-space-between align-start align-content-start flex-wrap">
        <div class="columnLeft">
          <ContactInformation />
          <DownloadFileCards />
          <!-- <Contacts /> -->
        </div>
        <div class="columnRight">
          <NotificationsModal />
        </div>
      </div>
      <!--Espacio en blanco-->
      <WhiteSpace />
    </div>
  </div>
</template>

<script>
import TitlePage from "@/components/TitlePage.vue";
import MenuGeneral from "@/components/Menu/MenuGeneral.vue";
import ContactInformation from "@/components/Dashboard/ContactInformation.vue";
import DownloadFileCards from "@/components/Dashboard/DownloadFileCards.vue";
import NotificationsModal from "@/components/Dashboard/NotificationsModal.vue";
import WhiteSpace from "@/components/WhiteSpace.vue";
import { mapGetters } from "vuex";

export default {
  name: "Home",
  components: {
    TitlePage,
    MenuGeneral,
    ContactInformation,
    DownloadFileCards,
    NotificationsModal,
    WhiteSpace,
  },
  data() {
    return {
      ShowFilters: false,
      ModalValidation: false,
      subscription_id: 0,
    };
  },
  computed: {
    ...mapGetters(["user"]),
    userFullName() {
      return `${this.user.name} ${this.user.lastName}`;
    },
  },
  methods: {
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
    width: 48%;
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
