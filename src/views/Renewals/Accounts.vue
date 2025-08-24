<template>
  <div class="AppMain d-flex flex-wrap">
    <!--MENU LATERAL IZQUIERDO-->
    <div class="LateralMenuContent">
      <MenuGeneral />
    </div>

    <!--CONTENEDOR GENERAL-->
    <div class="GeneralContent FullOnMovil pl-10 pr-10">
      <!--Titulo de la pagina-->
      <TitlePage title="Accounts" />

      <!--Barra de navegación-->
      <BarNavGeneral :NavContent="BarNavData" />
      <!--Tipo-->
      <TypeSubmission />

      <!--Buscador de cuentas-->
      <Search />

      <!--Cuentas-->
      <Accounts @ShowNotesHistory="ShowNotesHistory($event)" />
      <ShowMoreButton />
      <!--Espacio en blanco-->
      <WhiteSpace />
    </div>

    <!--MODAL NOTAS-->
    <ModalNotes @HideModal="ToggleModal" :ShowModal="ShowNotesModal" :idSubsNotes="idSubsNotes" />
  </div>
</template>
<script>
import { mapState, mapMutations, mapActions } from "vuex";
import TitlePage from "@/components/TitlePage";
import MenuGeneral from "@/components/Menu/MenuGeneral";
import BarNavGeneral from "@/components/BarNavGeneral";
import TypeSubmission from "@/components/subscription/submission/TypeSubmission";
import Accounts from "@/components/Renewals/Accounts/Accounts";
import Search from "@/components/Renewals/Accounts/Search";
import WhiteSpace from "@/components/WhiteSpace";
import ModalNotes from "@/components/Notes/ModalNotes";
import ShowMoreButton from "@/components/subscription/ShowMoreButton.vue";
export default {
  name: "AccountsRenewals",
  components: {
    TitlePage,
    MenuGeneral,
    BarNavGeneral,
    TypeSubmission,
    Accounts,
    Search,
    WhiteSpace,
    ModalNotes,
    ShowMoreButton,
  },
  data() {
    return {
      ShowNotesModal: false, //muestra oculta el historial de notas
      idSubsNotes: null, //referencia de la nota a mostrar en el modal
      BarNavData: [
        //Datos de la barra de navegación
        {
          id: 1,
          text: "Registered Accounts",
          path: "/renewals/accounts",
          active: true,
        },
        {
          id: 2,
          text: "Underwriting",
          path: "/renewals/subscription",
          active: false,
        },
      ],
    };
  },
  async created() {},
  methods: {
    ...mapActions(["noteSubscription"]),
    /*
    ShowNotesHistory
    Muestra el historial de notas al
    hacer click en una nota de la tabla
    */
    ShowNotesHistory(idSubscription) {
      this.$emit("ShowNotesHistory", idSubscription);
    },
    ToggleModal() {
      this.ShowNotesModal = !this.ShowNotesModal;
    },
    async ShowNotesHistory(idSubscription) {
      this.setLoading();
      // console.log(idSubscription)
      this.idSubsNotes = idSubscription;
      await this.loadNotes(idSubscription);
      this.setLoading();
      this.ToggleModal();
    },
    async loadNotes(subId) {
      await this.noteSubscription({ subscription_id: parseInt(subId) });
    },
  },
};
</script>
