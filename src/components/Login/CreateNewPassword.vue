<template>
  <div class="LoginComponent d-flex flex-column justify-center align-content-center align-center">
    <!--IMAGEN-->
    <img class="LogoLogin HideOnMovil" src="@/assets/img/logo.svg" />
    <!--TITULO-->
    <h2 class="mt-3">
      Create your new SLU password
    </h2>
    <p>
      Your new password needs to be different from previous used password
    </p>
    <v-form
      class="LoginForm d-flex flex-column"
      > 


      <div class="InputContent d-flex flex-column mt-3">
        <v-text-field
          flat
          type="password"
          required
          label ="yourSLUemail@outlook.com"
          append-icon="mdi-eye-outline"
          placeholder="yourSLUemail@outlook.com"
          v-model="pass1"
          :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="show1 = !show1"
          :type="show1 ? 'text' : 'password'"
        ></v-text-field>
      </div>
      <div class="InputContent d-flex flex-column">
        <v-text-field
          flat
          type="password"
          required
          label ="yourSLUemail@outlook.com"
          append-icon="mdi-eye-outline"
          placeholder="yourSLUemail@outlook.com"
          v-model="pass2"
          :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="show1 = !show1"
          :type="show1 ? 'text' : 'password'"
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
      pass1:null,
      pass2:null,
      show1: false,
    }
  },
  methods:{
    
  }
}
</script>
<style lang="less" scoped>
@import '~@/assets/style/LoginStyle.less';
//RE-ENVIAR CORREO
.LoginComponent{
  p{
    margin-top: 8px;
  }
}




@media(max-width: 650px)
{
  .LoginComponent{
    height: 350px;
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
