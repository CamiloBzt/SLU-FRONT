<template>
<div class="LoginContent d-flex justify-end">
  <!--COMPONENTE LOGIN-->
  <LoginComponent></LoginComponent>
</div>
</template>
<script>
import { mapState, mapGetters } from 'vuex'
import LoginComponent from '@/components/Login/LoginComponent.vue'
import { PublicClientApplication } from '@azure/msal-browser';

export default {
  name: 'Home',
  components: {
    LoginComponent
  },
  computed: {
    ...mapGetters(['user']),
    ...mapState({
      isSingingSuccesOutlook: (state) => state.auth.isSingingSuccesOutlook,
      config: (state) => state.outlook.config 
    })
  },
  async created() {
    this.$msalInstance = new PublicClientApplication({
      auth:{
          clientId: config.appId,
          redirectUri:config.redirectUri,
      },
      cache:{
          cacheLocation:"sessionStorage",
          storeAuthStateInCookie:true,
      }
    })
    console.log('entrando al created')
    // this.signIn();
  },
  methods: {
    async signIn() {
      // try {
        console.log('AUuthhh', this.config.params)
        //
            
        //     // await this.getUserProfile();
        // } catch (error) {
        //     sessionStorage.setItem('error',JSON.stringify(
        //         {
        //             error: normalizeError(error),
        //             isAuthenticated: false,
        //             user: {},
        //             token:null,
        //             expiresOn:null
        //         }
        //     ));
        //     this.getDataAuthenticated({
        //         AuthComponentProps:{
        //             error: normalizeError(error),
        //             isAuthenticated: false,
        //             user: {},
        //             token:null,
        //             expiresOn:null
        //         }
        //     })
        //     console.log(error)
        // }
      
    }
  }
}
</script>