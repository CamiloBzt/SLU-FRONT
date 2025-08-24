<template>
  <div class="AppMain d-flex flex-wrap">
    <!--MENU LATERAL IZQUIERDO-->

    <!--CONTENEDOR GENERAL-->
    <div class="GeneralContent FullOnMovil pl-10 pr-10">
      <!--TITULO DE LA PÁGINA-->
      <TitlePage title="Screen Activation SLU"></TitlePage>
      <div v-if="activationOk === true">Activation Success</div>
      <!--INFORMACION DE CONTACTO-->
      <WhiteSpace></WhiteSpace>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import TitlePage from "@/components/TitlePage.vue";
import WhiteSpace from "@/components/WhiteSpace.vue";
import { PublicClientApplication } from "@azure/msal-browser";

export default {
  name: "Activation",
  computed: {
    ...mapState({
      config: (state) => state.outlook.config,
      params: (state) => state.outlook.params,
      activationOk: (state) => state.auth.activationOk,
    }),
  },
  data() {
    return {
      userId: "",
      codeActivation: "",
    };
  },
  components: {
    TitlePage,
    WhiteSpace,
  },
  beforeMount() {
    const { userId, codeActivation } = this.$route.query;
    this.codeActivation = codeActivation;
    this.userId = userId;
  },
  async created() {
    this.$msalInstance = new PublicClientApplication(this.config);
    this.signIn();
  },
  methods: {
    ...mapActions(["activateAccount"]),
    async signIn() {
      try {
        await this.$msalInstance.loginPopup(this.params);
        const accounts = this.$msalInstance.getAllAccounts();
        localStorage.setItem("accountOutlook", JSON.stringify(accounts[0]));
        const data = {
          userId: this.userId,
          code: this.codeActivation,
          accountIdMs: accounts[0].localAccountId,
          homeAccountIdMs: accounts[0].homeAccountId,
          emailMs: accounts[0].username,
        };
        await this.activateAccount(data);
      } catch (e) {
        console.log(e);
      }
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
    width: 38%;
    height: auto;
    margin-top: 15px;
  }

  .columnRight {
    width: 58%;
    height: auto;
    margin-top: 15px;
  }
}
</style>
