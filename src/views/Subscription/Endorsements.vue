<template>
  <div class="AppMain d-flex flex-wrap">
    <!--MENU LATERAL IZQUIERDO-->
    <div class="LateralMenuContent">
      <MenuGeneral />
    </div>

    <!--CONTENEDOR GENERAL-->
    <div class="GeneralContent FullOnMovil pl-10 pr-10">
      <!--TITULO DE LA PÁGINA-->
      <TitlePage title="Underwriting" />
      <!--BARRA DE NAVEGACIÓN DE Underwriting-->
      <BarNav link1="" link2="lnkActive" />

      <TypeEndorsement />
      
      <StepperEndorsements
        step1="StepActive"
        stepMovil1="Submission"
        stepMovil2=""
        stepMovil3=""
      />
      

      <!--COPY ACCOUNT-->
      <div class="CopyAndDetailscont">
        <CopyAccount />
      </div>

      <!--Endorsements-->
      <ExtensionAndEndorsements />

      <!--Account Information-->
      <div class="mt-6" />
      <AccountInformation
        ref="accInfo"
        v-on:changeDocuments="changeDocuments($event)"
      />

      <!--Quotation-->
      <div class="mt-6" />
      <QuoProprtional />

      <!--Bound Information-->
      <BoundInformationCarEar />

      <!--Documents-->
      <FilesSubmission />

      <!--Slips-->
      <SlipDocuments />

      <!--Account Risk-->
      <AccountRisks />

      <!--Notes-->
      <NotesComponent />

      <!--General Report-->
      <GeneralReport />

      <!--BOTON PARA FINALIZAR-->
      <div class="finishButtonCont mt-7 d-flex justify-end align-center">
        <v-btn rounded large text class="finishBtn">
          Save Changes
        </v-btn>
      </div>

      <!--ESPACIO EN BLANCO-->
      <WhiteSpace />
    </div>
  </div>
</template>
<script>
import ExtensionAndEndorsements from '@/components/subscription/endorsements/carEar/ExtensionAndEndorsements';
import AccountInformation from '@/components/subscription/submission/AccountInformation.vue';
import QuoProprtional from '@/components/subscription/quotation/QuoProprtional.vue';
import BoundInformationCarEar from '@/components/subscription/endorsements/carEar/BoundInformationCarEar'
import FilesSubmission from '@/components/subscription/submission/FilesSubmission';
import SlipDocuments from '@/components/subscription/submission/SlipDocuments.vue';
import AccountRisks from '@/components/subscription/bound/engineering/AccountRisks';
import GeneralReport from '@/components/subscription/bound/engineering/GeneralReport';
import NotesComponent from '@/components/Notes/NotesComponent.vue';
import TitlePage from '@/components/TitlePage.vue';
import TypeEndorsement from '@/components/subscription/endorsements/TypeEndorsement.vue';
import MenuGeneral from '@/components/Menu/MenuGeneral.vue';
import BarNav from '@/components/subscription/BarNav.vue';
import StepperEndorsements from '@/components/subscription/endorsements/carEar/StepperEndorsements';
import CopyAccount from '@/components/subscription/quotation/CopyAccount.vue';
import WhiteSpace from '@/components/WhiteSpace.vue';
export default {
  name: 'Endorsements',
  components: {
    ExtensionAndEndorsements,
    AccountInformation,
    QuoProprtional,
    BoundInformationCarEar,
    FilesSubmission,
    SlipDocuments,
    AccountRisks,
    GeneralReport,
    NotesComponent,
    TypeEndorsement,
    TitlePage,
    MenuGeneral,
    BarNav,
    StepperEndorsements,
    CopyAccount,
    WhiteSpace
  },
};
</script>
<style lang="less" scoped>
@import '~@/assets/style/AccordionStyle.less';
</style>