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

      <TypeBound />
      <!--PASOS DE REGISTRO-->
      <Stepper step3="StepActive" stepMovil1="Submission" stepMovil2="" stepMovil3="" />

      <!--COPY ACCOUNT-->
      <div class="CopyAndDetailscont">
        <EditAccount v-if="facultativeReference" :editAccount="editable" :accountName="facultativeReference" />
        <EditAccount v-else :editAccount="editable" :accountName="nameReference" />
        <CopyAccount />
      </div>

      <RiskAnalysis :ActionIcons="true" ref="riskAnalysis" :loadingPanel="loadingPanel" />
      <!--Endorsements-->
      <!-- <ExtensionAndEndorsements /> -->

      <FilesSubmission/>
      <SlipDocuments />
      <AccountRisks />
      <NotesComponent />
      <GeneralReport />

      <!--BOTON PARA FINALIZAR-->
      <div class="finishButtonCont mt-7 d-flex justify-end align-center">
        <v-btn 
          v-if="showFacultativeButton"
          rounded large text 
          class="finishBtn" 
          @click="sendToFacultative">
            Send To Facultative 
          </v-btn>
      </div>

      <!--ESPACIO EN BLANCO-->
      <WhiteSpace />
    </div>
  </div>
</template>
<script>
import TitlePage from '@/components/TitlePage.vue';
import TypeBound from '@/components/subscription/bound/TypeBound.vue';
import MenuGeneral from '@/components/Menu/MenuGeneral.vue';
import BarNav from '@/components/subscription/BarNav.vue';
import TypeSubmission from '@/components/subscription/submission/TypeSubmission.vue';
import Stepper from '@/components/subscription/submission/Stepper';
import RiskAnalysis from '@/components/subscription/bound/engineering/RiskAnalysis';
import ExtensionAndEndorsements from '@/components/subscription/endorsements/carEar/ExtensionAndEndorsements';
import FilesSubmission from '@/components/subscription/submission/FilesSubmission.vue';
import SlipDocuments from '@/components/subscription/submission/SlipDocuments.vue';
import AccountRisks from '@/components/subscription/bound/engineering/AccountRisks';
import NotesComponent from '@/components/Notes/NotesComponent.vue';
import GeneralReport from '@/components/subscription/bound/engineering/GeneralReport';
import CopyAccount from '@/components/subscription/quotation/CopyAccount.vue';
import WhiteSpace from '@/components/WhiteSpace.vue';
import EditAccount from '@/components/subscription/EditAccount.vue';

import { mapActions, mapGetters, mapMutations } from 'vuex';

//Servicios
import AccountCompleteService from './services/create-account-complete-eng.service'
import SubscriptionService from '@/modules/home/services/subscription.service'
import NetPremiumService from '@/modules/home/services/net-premium.service'

export default {
  name: 'BoundEngineering',
  components: {
    TypeBound,
    TitlePage,
    MenuGeneral,
    BarNav,
    TypeSubmission,
    Stepper,
    CopyAccount,
    WhiteSpace,
    RiskAnalysis,
    FilesSubmission,
    ExtensionAndEndorsements,
    SlipDocuments,
    AccountRisks,
    NotesComponent,
    GeneralReport,
    EditAccount,
  },
  data() {
    return {
      subscriptionId:this.$route.params.subscriptionId,
      showFacultativeButton:true,
      loadingPanel: false,
      editable: false,
    };
  },
  provide() {
    return {
      deepDisabled: this.disabledSubAccordion
    }
  },
  computed: {
    ...mapGetters([
      'nameReference', 
      'facultativeReference',
      ]),
  },
  watch: {
    '$route.params.subscriptionId': async function(id) {
      this.RESET_SUBSCRIPTION_REFERENCE();
      await this.resetSubscriptionStatus();
      if (this.$route.params && this.$route.params.subscriptionId) {
        this.editable = true;
      }
    },
  },
  async  beforeMount(){
    /**se agrego esta parte para generar un respiro previo para guardar la actualizaciones del net premium*/
    const subscriptionId = Number(this.subscriptionId)
    const hasInitialRegister = await NetPremiumService.hasInitialRegister(subscriptionId)
    if(!hasInitialRegister) await  NetPremiumService.addOrUpdateNetPremium(subscriptionId, {},false)

    this.showFacultativeButton = !(await SubscriptionService.isAccountComplete(subscriptionId))
  },
  async mounted() {
    /* set loaders */
    const lpa = 'loadingPanel';
    /* loaders to true */
    this[lpa] = !this[lpa];
    /* editable */
    this.RESET_SUBSCRIPTION_REFERENCE();
    await this.resetSubscriptionStatus();
    if (this.$route.params && this.$route.params.subscriptionId) {
      this.editable = true;
    }
    /* load data */
    await this.checkSubscriptionStored();
    await Promise.all([
      this.getCatalogByName({ name: 'activities' }),
      this.getCatalogByName({ name: 'currencies' }),
      this.getCatalogByName({ name: 'risk_type' }),
      this.getCatalogByName({ name: 'countries' }),
    ]);
    await this.getQuotationInformation();
    await this.updateBoundType(1);
    await Promise.all([
      this.getBoundInformation(),
      this.getBoundInformation('boundInsurable'),
      this.getBoundInformation('boundInsurableProp'),
      this.getBoundInformation('boundSublimesEng'),
      // this.getBoundInformation('buced'),
      this.loadMultipleDeductiblesEng({ table: 'buced' }),
      this.getBrokers(),
      this.getCedents(),
      this.getLayers(),
      this.getDeductiblesProperty(),
      this.getSublimesProperty(),
    ]);
    /* load finished */
    this[lpa] = false;

    const riskAnalysis = this.$refs.riskAnalysis;
    riskAnalysis.riskAnalysisPanel = 0;
  },
  methods: {
    ...mapActions([
      'checkSubscriptionStored',
      'updateBoundType',
      'getBoundInformation',
      'updateQuotationType',
      'getQuotationInformation',
      'getCatalogByName',
      'getBrokers',
      'getCedents',
      'resetSubscriptionStatus',
      'loadMultipleDeductiblesEng',
      'getLayers',
      'getSublimesProperty',
      'addFacultative',
      'getDeductiblesProperty',
      'updateReference',
    ]),
    ...mapMutations(['RESET_SUBSCRIPTION_REFERENCE']),
    async disabledSubAccordion() {
      const subscriptionId = Number(this.$route.params.subscriptionId)
      const isBoundComplete = await SubscriptionService.isAccountComplete(subscriptionId)
      if( isBoundComplete ) {
        setTimeout(() => {
          const getElements = document.querySelectorAll('.v-input, .ButtonCont button, textarea')
          for (const element of getElements) {
            element.classList.add('disabled-element');
            element.replaceWith(element.cloneNode(true));
          }
        }, 50);
      }
    },
    async sendToFacultative() {
      const subscriptionId = Number(this.subscriptionId)
      await AccountCompleteService.addInitialRegister(subscriptionId)
      this.$router.push({name:'Subs home'})
    },

    async saveNatcatDocument({ subscription_id, doc_s3 }) {
      
    },
    async uploadNatcatDocument({ idFile, file, path }) {
      /*
        1) Crear el servicio "uploadNatcatDocumentAWS"
        2) Se va a recibir un objeto con las siguientes propiedades:
          * filename
          * mimetype
          * encoding
          * uri
        3) Poner la "uri" en la propiedad "downloadLink" por medio del "idFile"
      */
      
    },
    async deleteNatcatDocument({ idDocument }) {
      
    },
  },
};
</script>
