<template>
  <div class="LoginComponent d-flex flex-column justify-center align-content-center align-center">
    <!--IMAGEN-->
    <img class="LogoLogin HideOnMovil" src="@/assets/img/logo.svg" />
    <!--TITULO-->
    <h2 class="mt-3">
      Forgot your SLU password?
    </h2>
    <p class="mt-1">
      Enter your SLU email associated with your account, we'll send you the next stepsto rest your password
    </p>
    <v-form
      class="LoginForm d-flex flex-column"
      > 
      <div class="InputContent d-flex flex-column mt-3">
        <v-text-field
          flat
          required
          label ="yourSLUemail@outlook.com"
          append-icon="mdi-email-outline"
          placeholder="yourSLUemail@outlook.com"
        ></v-text-field>
      </div>



      <div class="FinishButtonCont mt-2 mx-auto">
        <v-btn
          class="FinishButton"
          :color="colorButton"
          rounded
          large
          depressed
          >
            Send e-mail
        </v-btn>
      </div>

    </v-form>

    
  </div>
</template>
<script>
export default {
  name:'ResetPassword',
  data() {
    return {
      colorButton:'#003D6D',
    }
  }
}
</script>
<style lang="less" scoped>
@import '~@/assets/style/LoginStyle.less';
@media(max-width: 650px)
{
  .LoginComponent{
    height: 300px;
    position: absolute;
    bottom: 0;
    border-bottom-left-radius: 0px ;
    border-top-right-radius: 15px ;

    p{
      width: 90%;
      text-align: left;
      font-size: 14px;
    }
    h2{
      width: 90%;
      font-size: 16px;
      text-align: left;
    }

    .LoginForm{
      width: 90%;
      .InputContent{
        height: 55px;
        margin-top: 0px !important;
      }
      .FinishButtonCont{
        margin-top: 20px !important;
      }
      
    }
  }
}
</style>
