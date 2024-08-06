<template>
  <div class="LoginComponent d-flex flex-column justify-center align-content-center align-center">
    <!--IMAGEN-->
    <img class="LogoLogin HideOnMovil" src="@/assets/img/logo.svg" />
    <!--TITULO-->
    <h2 class="mt-3">Check your SLU e-mail</h2>
    <p class="mt-1">
      Please check your inbox, you'll receive and e-mail with a reset password instructions
    </p>

    <v-btn
      class="FinishButton"
      rounded
      large
      depressed
      :color="colorButton"
      >
        Reset password
    </v-btn>

    <div class="textContent">
      <span>
        Don't receive the e-mail?
      </span>
      <br>
      Check your span or 
      <span>resend e-mail</span>
    </div>


  
  </div>
</template>
<script>
export default {
  name:'CheckYourEmail',
  data() {
    return {
      colorButton:'#003D6D',
    }
  }
}
</script>
<style lang="less" scoped>
@import '~@/assets/style/LoginStyle.less';
.LoginComponent{
  
  .FinishButton{
    width: 70% !important;
    text-transform: none !important;
    margin-top: 30px;
    color: white;
  }
  //RE-ENVIAR CORREO
  .textContent{
    width: 70%;
    text-align: center;
    margin-top: 35px;

    span{
      color: #003D6D;
    }
  }

}

@media(max-width: 650px)
{
  .LoginComponent{
    height: 65%;
    position: absolute;
    bottom: 0;
    border-bottom-left-radius: 0px ;
    border-top-right-radius: 15px ;
    justify-content: flex-start !important;

    p{
      width: 90%;
      text-align: left;
      font-size: 14px;
    }
    h2{
      width: 90%;
      font-size: 16px;
      text-align: left;
      margin-top: 45px !important;
    }

    .FinishButton{
      width: 90% !important;
      margin-top: 30px ;
    }


    .textContent{
      width: 95%;
      font-size: 14px;
      margin-top: 15px;
    }

  }
}
</style>
