<template>
  <div class="Modal d-flex justify-center align-start">
    <div class="Cont d-flex justify-center align-center flex-wrap">
      <!--BOTON CERRAR-->
      <div class="CloseModalBtn">
        <v-btn class="btn" icon>
          <img class="iconClose" src="@/assets/img/icons/close.png" />
        </v-btn>
      </div>
      <!--Saludo-->
      <div class="Header">Hi Diana</div>
      <!--Descripción-->
      <div class="Desc">To edit the quotation of the Account <b>CP-ABC with reference number A-1234567890</b> you need to request edit permission.</div>
      <!--Boton-->
      <div class="ButtonCont">
        <v-btn rounded depressed class="btn" color="#003D6D"> Request permission </v-btn>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "ModalPasswordRequest",
};
</script>
<style lang="less" scoped>
.Modal {
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 3000;
  background: rgba(0, 0, 0, 0.6);
  top: 0;
  left: 0;

  //Cuadro de información
  .Cont {
    width: 350px;
    height: 300px;
    background: white;
    margin-top: 5%;
    border-radius: 5px;
    position: relative;
    padding: 25px;
    align-content: space-around;

    //Boton cerrar modal
    .CloseModalBtn {
      width: auto;
      height: auto;
      position: absolute;
      right: -15px;
      top: -15px;
      z-index: 1000;
      border-radius: 25px;
      cursor: pointer;
      .btn {
        width: 30px !important;
        height: 30px !important;
        .iconClose {
          width: 34px;
          height: 34px;
        }
      }
    }

    //Información del modal
    .Header {
      font-size: 26px;
      font-weight: 600;
    }
    .Desc {
      font-size: 16px;
      font-weight: 400;
      color: #547fa9;
      text-align: center;
      b {
        color: inherit;
      }
    }
    .ButtonCont {
      width: 100%;
      height: auto;
      text-align: center;
      .btn {
        border-radius: 5px;
        color: white;
        text-transform: none;
        font-weight: normal;
        height: 40px;
      }
    }
  }
}
</style>
