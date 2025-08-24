<template>
  <div class="AppMain d-flex flex-wrap">
    <!--MENU LATERAL IZQUIERDO-->
    <div class="LateralMenuContent">
      <MenuGeneral />
    </div>

    <!--CONTENEDOR GENERAL-->
    <div class="GeneralContent FullOnMovil pl-10 pr-10">
      <!--Titulo de la pagina-->
      <TitlePage title="Facultative" />

      <!--Barra de navegación de facultative-->
      <BarNavGeneral :NavContent="BarNavData" />
      <!--Cuentas-->
      <AccountsFacultative @ShowNotesHistory="ShowNotesHistory($event)" />

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
import TitlePage from "@/components/TitlePage.vue";
import MenuGeneral from "@/components/Menu/MenuGeneral.vue";
import BarNavGeneral from "@/components/BarNavGeneral";
import AccountsFacultative from "@/components/Facultative/Accounts/AccountsFacultative";
import WhiteSpace from "@/components/WhiteSpace.vue";
import ModalNotes from "@/components/Notes/ModalNotes.vue";
import ShowMoreButton from "@/components/subscription/ShowMoreButton.vue";
export default {
  name: "RegisterClaims",
  components: {
    TitlePage,
    MenuGeneral,
    BarNavGeneral,
    AccountsFacultative,
    WhiteSpace,
    ModalNotes,
    ShowMoreButton,
  },
  data() {
    return {
      ShowNotesModal: false, //muestra oculta el historial de notas
      idSubsNotes: null, //referencia de la nota a mostrar en el modal

      /*
      BarNavData: Información de la barra de navegación
        text (String): Texto visible
        path (String): Ruta a donde dirige
        active (Bolean): Resaltar link (true) / No resaltar link (false)
      */
      BarNavData: [
        {
          id: 1,
          text: "Accounts",
          path: "/facultative/accounts",
          active: true,
        },
        {
          id: 2,
          text: "In Negotiation",
          path: "/facultative/negotiation",
          active: false,
        },
      ],
    };
  },
  async created() {},
  methods: {
    ...mapActions(["noteSubscription"]),
    ...mapMutations(["setLoading"]),
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
