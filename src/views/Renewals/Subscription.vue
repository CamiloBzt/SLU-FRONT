<template>
  <div class="AppMain d-flex flex-wrap">
    <!--MENU LATERAL IZQUIERDO-->
    <div class="LateralMenuContent">
      <MenuGeneral />
    </div>

    <!--CONTENEDOR GENERAL-->
    <div class="GeneralContent FullOnMovil pl-10 pr-10">
      <!--Titulo de la pagina-->
      <TitlePage title="Accounts" />
      
      <!--Barra de navegación de claims-->
      <BarNavGeneral 
        :NavContent="BarNavData"
      />
      <!--Tipo-->
      <TypeSubmission />

      <!--Buscador de cuentas-->
      <Search />

      <!--COPY ACCOUNT-->
      <div class="CopyAndDetailscont" v-if="editable">
        <EditAccount :editAccount="editable" :accountName="nameReference" />
        <CopyAccount />
      </div>

      <!--INFORMACION DE LA CUENTA-->
      <AccountInformation
        ref="accInfo"
        v-on:changeDocuments="changeDocuments($event)"
      />

      <!--Quotation-->
      <div class="mt-6" />
      <QuoProprtional />

      <!--Bound Information-->
      <div class="mt-6" />
      <BoundInformationCarEar />

      <!--Documents-->
      <FilesSubmission />

      <!--Slips-->
      <SlipDocuments />

      <!--Account risks-->
      <AccountRisks />

      <!--Notes-->
      <NotesComponent />

      <!--General report-->
      <GeneralReport />

      <!--Boton para finalizar-->
      <div class="finishButtonCont mt-7 d-flex justify-end align-center">
        <v-btn rounded large text class="finishBtn">
          Renew Account
        </v-btn>
      </div>
      <!--Espacio en blanco-->
      <WhiteSpace />
    </div>
  </div>
</template>
<script>
import { mapState, mapMutations, mapActions } from "vuex";

export default {
  name: "AccountsRenewals",
  components: {
    EditAccount: () => import('@/components/subscription/EditAccount'),
    CopyAccount: () => import('@/components/subscription/quotation/CopyAccount'),
    AccountInformation: () => import('@/components/subscription/submission/AccountInformation.vue'),
    QuoProprtional: () => import('@/components/subscription/quotation/QuoProprtional'),
    BoundInformationCarEar: () => import('@/components/subscription/endorsements/carEar/BoundInformationCarEar'),
    FilesSubmission: () => import('@/components/subscription/submission/FilesSubmission'),
    SlipDocuments: () => import('@/components/subscription/submission/SlipDocuments'),
    AccountRisks: () => import('@/components/subscription/bound/engineering/AccountRisks'),
    NotesComponent: () => import('@/components/Notes/NotesComponent'),
    GeneralReport: () => import('@/components/subscription/bound/engineering/GeneralReport'),
    TitlePage: () => import('@/components/TitlePage'),
    MenuGeneral: () => import('@/components/Menu/MenuGeneral'),
    BarNavGeneral: () => import('@/components/BarNavGeneral'),
    TypeSubmission: () => import('@/components/subscription/submission/TypeSubmission'),
    Search: () => import('@/components/Renewals/Accounts/Search'),
    WhiteSpace: () => import('@/components/WhiteSpace'),
  },

  data(){
    return {
      /* en caso de ser editable */
      editable: false,
      /*
        nameReference es una variable de prueba, se puede borrar 
        cuando se agregue la referencia real
      */
      nameReference:'Test',
      BarNavData:[ //Datos de la barra de navegación
        {
          id:1,
          text:'Registered Accounts',
          path:'/renewals/accounts',
          active:false
        },
        {
          id:2,
          text:'Underwriting',
          path:'/renewals/subscription',
          active:true
        }
      ]
    };
  }
};
</script>
