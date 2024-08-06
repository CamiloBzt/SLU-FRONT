<template>
  <div class="LoginComponent d-flex flex-column justify-center align-content-center align-center">
    <!--IMAGEN-->
    <img class="LogoLogin" src="@/assets/img/logo.svg" />
    <!--TITULO-->
    <h2 class="mt-3">Welcome back to SLU</h2>
    <p class="mt-1">
      Enter your information to access<br />
      to your account
    </p>

    <v-form ref="loginForm" v-model="valid" lazy-validation class="LoginForm d-flex flex-column" @submit.prevent="signIn">
      <!--INPUTS-->
      <!-- <div class="InputContent d-flex flex-column mt-3">
        <div class="LabelInputSlu">E-mail</div>
        <v-text-field
          v-model.trim="email"
          flat
          required
          label ="yourSLUemail@outlook.com"
          append-icon="mdi-email-outline"
          placeholder="yourSLUemail@outlook.com"
          :rules="[requiredInput, validEmail]"
        ></v-text-field>
      </div>

      <div class="InputContent d-flex flex-column inputMargin">
        <div class="LabelInputSlu">Password</div>
        <v-text-field
          v-model="password"
          flat
          required
          :type="showPassword ? 'text' : 'password'"
          @click:append="showPassword = !showPassword"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          label="You SLU Password"
          :rules="[requiredInput]"
        ></v-text-field>
      </div> -->

      <!-- Recordar contraseña -->
      <div class="RememberPassword d-flex justify-start align-center inputMargin">
        <v-container class="px-0" fluid>
          <v-checkbox
          v-model="checkbox" color="#003D6D" label="Remember Password"></v-checkbox>
        </v-container>
      </div>

      <!--BOTON-->
      <div class="FinishButtonCont mt-2 mx-auto">
        <v-btn
          class="FinishButton"
          rounded
          large
          depressed
          :color="colorButton"
          :loading="loading"
          @click="loader = 'loading'"
          type="submit"
        >
          Sign in
        </v-btn>
      </div>
    </v-form>
    <loading :show="show" position="absolute" />
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from "vuex";
import { formValidations } from "@/mixins/formValidations";
import { PublicClientApplication, InteractionType } from '@azure/msal-browser';
import { Client } from '@microsoft/microsoft-graph-client';
import { AuthCodeMSALBrowserAuthenticationProvider } from '@microsoft/microsoft-graph-client/authProviders/authCodeMsalBrowser';
import Loading from '@/components/loading.vue'
export default {
  mixins: [formValidations],
  components: {
    Loading
  },
  data() {
    return {
      colorButton:'#003D6D',
      showPassword: false,
      email: null,
      password: null,
      submitted: false,
      show: false,
      valid: true,
      checkbox: true,
      loader: null,
      loading: false,
    };
  },
  mounted() {
  },
  async created() {
    this.$msalInstance = new PublicClientApplication(this.config);
    this.signIn();
  },
  computed: {
    ...mapState({
      config: (state) => state.outlook.config,
      params: (state) => state.outlook.params,
    }),
	},
  methods: {
    ...mapActions(["loginNew", "showMessageLogin", 'socketConnectNewUser']),
    ...mapMutations(["setTokenOutlook"]),

    async signIn() {
      try {
        await this.$msalInstance.loginPopup(this.params);
        this.show= true;
        const accounts = this.$msalInstance.getAllAccounts();
        let account = accounts[0]
        accounts.forEach(element => {
          if (element.idTokenClaims.iat > account?.idTokenClaims.iat)
            account = element
        });
        localStorage.setItem("accountOutlook", JSON.stringify(account));
        const silentResult = await this.$msalInstance.acquireTokenSilent({
          scopes: this.params.scopes,
          account: account,
        });
        const data = {
          token: account.localAccountId,
          homeAccountIdMs: account.homeAccountId,
          email: account.username
        };

        await this.loginNew(data);
        this.setTokenOutlook(silentResult.accessToken);
        localStorage.setItem("tokenOutlook", silentResult.accessToken);
        const authProvider = new AuthCodeMSALBrowserAuthenticationProvider(
          this.$msalInstance,
          {
            account: accounts,
            scopes: this.params.scopes,
            interactionType: InteractionType.Popup
          }
        );
        this.show= false;
        await this.socketConnectNewUser()
      } catch (e) {
        console.log(e);
        this.showMessageLogin(e.message);
      }
    },
  },
};
</script>

<style lang="less">
@import '~@/assets/style/LoginStyle.less';
</style>
