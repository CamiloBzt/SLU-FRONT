<template>
  <div class="AppMain d-flex flex-wrap">
    <!--MENU LATERAL IZQUIERDO-->
    <div class="LateralMenuContent">
      <MenuGeneral />
    </div>

    <!--CONTENEDOR GENERAL-->
    <div class="GeneralContent FullOnMovil pl-10 pr-10">
      <!--TITULO DE LA PÁGINA-->
      <TitlePage title="Underwriting" />

      <!--BARRA DE NAVEGACIÓN DE Underwriting-->
      <BarNav link1="lnkActive" link2="" />

      <!--TABLA DE SUBSCRIPTION-->
      <SubscriptionTable @ShowNotesHistory="ShowNotesHistory($event)" />

      <!--BOTON MOSTRAR MAS -->
      <ShowMoreButton />

      <!--ESPACIO EN BLANCO-->
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
import { mapState, mapMutations, mapActions } from "vuex";
import { PublicClientApplication } from "@azure/msal-browser";

import TitlePage from "@/components/TitlePage.vue";
import MenuGeneral from "@/components/Menu/MenuGeneral.vue";
import BarNav from "@/components/subscription/BarNav.vue";
import SubscriptionTable from "@/components/subscription/SubscriptionTable.vue";
import ShowMoreButton from "@/components/subscription/ShowMoreButton.vue";
import WhiteSpace from "@/components/WhiteSpace.vue";
import ModalNotes from "@/components/Notes/ModalNotes.vue";
export default {
  name: "Home",
  components: {
    TitlePage,
    MenuGeneral,
    BarNav,
    SubscriptionTable,
    ShowMoreButton,
    WhiteSpace,
    ModalNotes,
  },
  data() {
    return {
      ShowFilters: false,
      ShowNotesModal: false, //muestra oculta el historial de notas
      idSubsNotes: null, //referencia de la nota a mostrar en el modal
    };
  },
  async created() {
  },
  computed: {
    ...mapState({
      isSingingSuccesOutlook: (state) => state.auth.isSingingSuccesOutlook,
      config: (state) => state.outlook.config,
      params: (state) => state.outlook.params,
    }),
  },
  methods: {
    //MOSTRAR EL MODAL DE FILTROS
    ...mapActions(["noteSubscription"]),
    ...mapMutations(["setTokenOutlook", "setLoading"]),
    filtersAction() {
      this.ShowFilters = !this.ShowFilters;
    },
    ToggleModal() {
      this.ShowNotesModal = !this.ShowNotesModal;
    },
    /*
    ShowNotesHistory
    Muestra el historial de notas al 
    hacer click en una nota de la tabla
    */
    async ShowNotesHistory(idSubscription) {
      this.setLoading();
      console.log(idSubscription)
      this.idSubsNotes = idSubscription;
      await this.loadNotes(idSubscription);
      this.setLoading();
      this.ToggleModal();
    },
    async loadNotes(subId) {
      await this.noteSubscription({ subscription_id: parseInt(subId) });
    },
    async signIn() {
      try {
        console.log(this.isSingingSuccesOutlook);
        if (!this.isSingingSuccesOutlook == true) {
          await this.$msalInstance.loginPopup(this.params);
          const accounts = this.$msalInstance.getAllAccounts();
          localStorage.setItem("accountOutlook", JSON.stringify(accounts[0]));
          const silentResult = await this.$msalInstance.acquireTokenSilent({
            scopes: this.params.scopes,
            account: accounts[0],
          });
          this.setTokenOutlook(silentResult.accessToken);
          localStorage.setItem("tokenOutlook", silentResult.accessToken);
          // const client = Client.init(options);
        }
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>
