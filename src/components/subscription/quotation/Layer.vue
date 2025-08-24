<template>
  <div class="LayerCont d-flex justify-center align-content-start align-start flex-wrap">
    <!--CONTENIDO-->
    <div class="LayerContent">
      <div class="LayerHeader d-flex justify-start align-start align-content-start">
        <div class="CloseIcon d-flex justify-start align-content-center">
          <v-btn icon>
            <v-icon> mdi-close-circle-outline </v-icon>
          </v-btn>
        </div>
        <!--INPUT DE LA CABEZA-->
        <div class="HeaderInput">
          <div class="LayerNumber d-flex align-center">Layer 1</div>
          <div class="InputCont">
            <v-text-field v-model="layer" label="Layer 1"></v-text-field>
          </div>
        </div>
      </div>
      <div class="SelectLayerCont d-flex justify-end align-center">Select layer</div>

      <!--INPUTS-->
      <div class="LayerInputsCont d-flex justify-space-between">
        <div class="InputCont">
          <v-text-field v-model="limit" label="Limit:"></v-text-field>
        </div>

        <div class="InputCont">
          <v-text-field v-model="excess" label="Excess:"></v-text-field>
        </div>

        <div class="InputCont">
          <v-text-field v-model="deductions" label="Deductions:"></v-text-field>
        </div>
      </div>

      <!--INFO-->
      <div class="InfoCont d-flex flex-wrap justify-space-between pa-3">
        <div class="InfoLine">
          <span> SLU Share: </span>
          {{ share }}
        </div>
        <div class="InfoLine">
          <span> SLU Limit: </span>
          {{ limit }}
        </div>

        <div class="InfoLine">
          <span> Premium: </span>
          {{ premium }}
        </div>
        <div class="InfoLine">
          <span> SLU Premium: </span>
          {{ sluPremim }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Layer",
  data() {
    return {
      //INPUTS
      layer: null,
      limit: null,
      excess: null,
      deductions: null,

      //INFO
      share: "10%",
      limit: "10%",
      premium: "1,000,000.00",
      sluPremim: "1,000,000.00",
    };
  },
};
</script>
<style lang="less" scoped>
.LayerCont {
  width: 100%;
  height: auto;
  display: flex;
  margin-top: 15px;

  //CONTENIDO
  .LayerContent {
    width: 60%;
    height: 400px;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    align-content: flex-start;
    flex-wrap: wrap;

    //NUMERO DE LAYER
    .LayerHeader {
      width: 100%;
      height: 80px;

      //ICONO CERRAR LAYER
      .CloseIcon {
        margin-left: -45px;
        width: 45px;
        height: 45px;
        cursor: pointer;
        i {
          color: var(--secondaryColor);
          font-size: 27px;
        }
      }

      .HeaderInput {
        width: 25%;
        height: 100%;

        .LayerNumber {
          width: 100%;
          height: 30px;
          font-weight: 600;
          font-size: 16px;
        }
        .InputCont {
          width: 100%;
          height: calc(100%-30px);
        }
      }
    }

    //SELECT LAYER
    .SelectLayerCont {
      width: 100%;
      height: 50px;
      color: grey;
      font-size: 16px;
    }

    //INPUTS
    .LayerInputsCont {
      width: 100%;
      height: 120px;
      align-items: center;

      .InputCont {
        width: 30%;
      }
    }

    //INFO
    .InfoCont {
      width: 100%;
      height: 130px;
      border: solid 1px #d2deed;
      align-content: space-between;
      .InfoLine {
        width: 50%;
        height: 50%;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        font-weight: 600;
        font-size: 19px;

        span {
          color: #547fa9;
          margin-right: 5px;
        }
      }
    }
  }
}
</style>
