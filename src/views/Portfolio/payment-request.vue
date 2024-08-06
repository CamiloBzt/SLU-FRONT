<template>
  <div class="AppMain d-flex flex-wrap">
    <!--MENU LATERAL IZQUIERDO-->
    <div class="LateralMenuContent">
      <MenuGeneral />
    </div>

    <!--CONTENEDOR GENERAL-->
    <div class="GeneralContent FullOnMovil pl-10 pr-10">
      
      <!--Titulo de la pagina-->
      <TitlePage title="Portafolio and Accounting" />

      <!--Barra de navegacion-->
      <BarNavPortfolio link1="" link2="lnkActive" link3="" />
      
      <AccountPaymentBalance />


      <WhiteSpace />
    </div>
  
  </div>
</template>
<script>
export default {
  name: "PortfolioPaymentRequest",
  components: {
    TitlePage: () => import('@/components/TitlePage'),
    MenuGeneral: () => import('@/components/Menu/MenuGeneral'),
    WhiteSpace: () => import('@/components/WhiteSpace'),
    BarNavPortfolio: () => import('@/components/Portfolio/BarNavPortfolio'),
    AccountPaymentBalance: () => import('@/components/Portfolio/PaymentRequest/AccountInformation'),
  },
  data() {
    return {
      ShowNotesModal: false, //muestra oculta el historial de notas
      idSubsNotes: null, //referencia de la nota a mostrar en el modal
      ShowSaveModal:false // Muestra / oculta el modal para guardar
    };
  },
};
</script>
