<template>
  <div class="AppMain d-flex flex-wrap">
    <!--MENU LATERAL IZQUIERDO-->
    <div class="LateralMenuContent">
      <MenuGeneral />
    </div>

    <!--CONTENEDOR GENERAL-->
    <div class="GeneralContent FullOnMovil pl-10 pr-10">

      <!--Titulo de la página-->
      <TitlePage title="Wallet" />
      <!--Barra de navegación-->
      <BarNavGeneral 
        :NavContent="BarNavData"
      />
      <Information />
      <Installment />
      <TotalPaymentInformation />
      <Calculator />


      <WhiteSpace />
    </div>
  </div>
</template>
<script>
export default {
  name: "WalletPayments",
  components: {
    TitlePage: () => import('@/components/TitlePage'),
    MenuGeneral: () => import('@/components/Menu/MenuGeneral'),
    BarNavGeneral: () => import('@/components/BarNavGeneral'),
    WhiteSpace: () => import('@/components/WhiteSpace'),
    Information: () => import('@/components/Wallet/Payments/Information'),
    Installment: () => import('@/components/Wallet/Payments/Installment'),
    TotalPaymentInformation: () => import('@/components/Wallet/Payments/TotalPaymentInformation'),
    Calculator: () => import('@/components/Wallet/Payments/Calculator'),
  },
  data(){
    return{
      /*
      BarNavData
      Detalles de la barra de navegación
      */
      BarNavData:[ 
        {
          id:1,
          text:'Payments',//Texto del link
          path:'/wallet/payments',//Ruta a donde redirige
          active:true//Si se resalta el link(true) o no (False)
        },
        {
          id:2,
          text:'Cancelation',
          path:'/wallet/cancelation',
          active:false
        }
      ]
    }
  }
};
</script>
