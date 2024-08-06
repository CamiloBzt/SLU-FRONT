<template>
  <div class="AppMain d-flex flex-wrap">
    <!--MENU LATERAL IZQUIERDO-->
    <div class="LateralMenuContent">
      <MenuGeneral />
    </div>

    <!--CONTENEDOR GENERAL-->
    <div class="GeneralContent FullOnMovil pl-10 pr-10">
      <!--Titulo de la pagina-->
      <TitlePage title="Portafolio and Accounting" />

      <!--Barra de navegacion-->
      <BarNavPortfolio link1="lnkActive" link2="" link3="" />

      <!--Cuentas-->
      <!-- <AccountsClaims @ShowNotesHistory="ShowNotesHistory($event)" /> -->

      <ShowMoreButton />
      <!--Espacio en blanco-->
      <WhiteSpace />
    </div>

    <!--MODAL NOTAS-->
    <ModalNotes
      @HideModal="ToggleModal"
      :ShowModal="ShowNotesModal"
      :idSubsNotes="idSubsNotes"
    />
  </div>
</template>
<script>
import { mapActions } from "vuex";
import TitlePage from "@/components/TitlePage.vue";
import MenuGeneral from "@/components/Menu/MenuGeneral.vue";
// import BarNavClaims from "@/components/Claims/BarNavClaims.vue";
// import AccountsClaims from "@/components/Claims/RegisterClaims/AccountsClaims.vue";
import WhiteSpace from "@/components/WhiteSpace.vue";
import ModalNotes from "@/components/Notes/ModalNotes.vue";
import ShowMoreButton from "@/components/subscription/ShowMoreButton.vue";
// import SaveModal from "@/components/Claims/SaveModal";

export default {
  name: "PortfolioAccount",
  components: {
    TitlePage,
    MenuGeneral,
    // BarNavClaims,
    // AccountsClaims,
    WhiteSpace,
    ModalNotes,
    ShowMoreButton,
    SaveModal,
    BarNavPortfolio: () => import("@/components/Portfolio/BarNavPortfolio"),
  },
  data() {
    return {
      ShowNotesModal: false, //muestra oculta el historial de notas
      idSubsNotes: null, //referencia de la nota a mostrar en el modal
      ShowSaveModal: false, // Muestra / oculta el modal para guardar
    };
  },
  async created() {},
  methods: {
    ...mapActions(["noteSubscription"]),
    ShowNotesHistory(idSubscription) {
      this.$emit("ShowNotesHistory", idSubscription);
    },
    ToggleModal() {
      this.ShowNotesModal = !this.ShowNotesModal;
    },
    async ShowNotesHistory(idSubscription) {
      this.setLoading();
      console.log(idSubscription);
      this.idSubsNotes = idSubscription;
      await this.loadNotes(idSubscription);
      this.setLoading();
      this.ToggleModal();
    },
    async loadNotes(subId) {
      await this.noteSubscription({ subscription_id: parseInt(subId) });
    },
    HideSaveModal() {
      this.ShowSaveModal = false;
    },
  },
};
</script>
