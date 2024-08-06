<template>
  <div class="AppMain d-flex flex-wrap">
    <!--MENU LATERAL IZQUIERDO-->
    <div class="LateralMenuContent">
      <MenuGeneral />
    </div>

    <div class="GeneralContent FullOnMovil pl-10 pr-10">

    <TitlePage title="Facultative" />
    <BarNavGeneral 
      :NavContent="BarNavData"
    />
    <StepperFacultative
      step1="StepActive"
    />
    <div class="CopyAndDetailscont" v-if="editable">
      <EditAccount :editAccount="editable" :accountName="nameReference" />
    </div>


    <FacultativeShare />
    <Summary />

    <!--Espacio en blanco-->
    <WhiteSpace />
    </div>

  </div>
</template>
<script>
import TitlePage from "@/components/TitlePage";
import MenuGeneral from "@/components/Menu/MenuGeneral";
import BarNavGeneral from "@/components/BarNavGeneral";
import StepperFacultative from "@/components/Facultative/StepperFacultative";
import FacultativeShare from '@/components/Facultative/InNegotiation/FacultativeShare';
import Summary from '@/components/Facultative/InNegotiation/Summary';
import EditAccount from '@/components/subscription/EditAccount';

import WhiteSpace from "@/components/WhiteSpace.vue";
export default {
  name: "InNegotiation",
  components: {
    TitlePage,
    MenuGeneral,
    BarNavGeneral,
    StepperFacultative,
    WhiteSpace,
    FacultativeShare,
    Summary,
    EditAccount,
  },
  data(){
    return{
      loadingPanel: false,
      /*
      BarNavData: Información de la barra de navegación
        text (String): Texto visible
        path (String): Ruta a donde dirige
        active (Boolean): Resaltar link (true) / No resaltar link (false)
      */
      BarNavData:[ 
        {
          id:1,
          text:'Accounts',
          path:'/facultative/accounts',
          active:false
        },
        {
          id:2,
          text:'In Negotiation',
          path:'/facultative/negotiation',
          active:true
        }
      ],

      editable:true,//Dato de ejemplo, se puede borrar
      nameReference:'CP ABC'//Dato de ejemplo, se puede borrar
    }
  }
};
</script>
<style lang="less" scoped>
.InfoClaim{
  width: 100%;
  b{
    margin-right: 5px;
  }
}
</style>