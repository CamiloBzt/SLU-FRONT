<template>
  <div class="AppMain d-flex flex-wrap">
    <div class="LateralMenuContent">
      <MenuGeneral />
    </div>
    <div class="GeneralContent FullOnMovil pl-10 pr-10">
      <!--Titulo de la página-->
      <TitlePage title="Wallet" />
      <!--Barra de navegación-->
      <BarNavGeneral :NavContent="BarNavData" />
      <Information />
      <ProDataPayment />
      <Endorsments />
      <WhiteSpace />
    </div>
  </div>
</template>
<script>
import TitlePage from "@/components/TitlePage";
import MenuGeneral from "@/components/Menu/MenuGeneral";
import BarNavGeneral from "@/components/BarNavGeneral";
import WhiteSpace from "@/components/WhiteSpace";
export default {
  name: "WalletPayments",
  components: {
    TitlePage,
    MenuGeneral,
    BarNavGeneral,
    WhiteSpace,
    Information: () => import("@/components/Wallet/Cancelation/Information"),
    ProDataPayment: () => import("@/components/Wallet/Cancelation/ProDataPayment"),
    Endorsments: () => import("@/components/Wallet/Cancelation/Endorsments"),
  },
  data() {
    return {
      /*
      BarNavData
      Detalles de la barra de navegación
      */
      BarNavData: [
        {
          id: 1,
          text: "Payments", //Texto del link
          path: "/wallet/payments", //Ruta a donde redirige
          active: false, //Si se resalta el link(true) o no (False)
        },
        {
          id: 2,
          text: "Cancelation",
          path: "/wallet/cancelation",
          active: true,
        },
      ],
    };
  },
};
</script>
