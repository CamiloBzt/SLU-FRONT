<template>
  <div class="AppMain d-flex flex-wrap">
    <!--MENU LATERAL IZQUIERDO-->
    <div class="LateralMenuContent">
      <MenuGeneral />
    </div>

    <!--CONTENEDOR GENERAL-->
    <div class="GeneralContent FullOnMovil pl-10 pr-10">
      <!--TITULO DE LA PÁGINA-->
      <div class="border-decoration">
        <TitlePage title="Claims" />
      </div>

      <!--TABLA DE CLAIMS-->
      <ClaimsTable @ShowNotesHistory="ShowNotesHistory($event)" />

      <!--BOTON MOSTRAR MAS -->
      <ShowMoreButton />

      <!--ESPACIO EN BLANCO-->
      <WhiteSpace />
    </div>
  </div>
</template>
<script>
import { mapState, mapMutations, mapActions } from "vuex";
import MenuGeneral from "@/components/Menu/MenuGeneral.vue";
import TitlePage from "@/components/Claims/TitlePage.vue";
import ClaimsTable from "@/components/Claims/ClaimsTable.vue";
import ShowMoreButton from "@/components/Claims/ShowMoreButton.vue";
import WhiteSpace from "@/components/WhiteSpace.vue";

export default {
  name: "Home",
  components: {
    TitlePage,
    MenuGeneral,
    ClaimsTable,
    ShowMoreButton,
    WhiteSpace,
  },
  data() {
    return {
      ShowFilters: false,
    };
  },
  async created() {},
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
<style lang="less" scoped>
.border-decoration {
  border-bottom: 1px solid #a8bfd9;
}
</style>
