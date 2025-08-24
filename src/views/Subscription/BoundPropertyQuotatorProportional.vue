<template>
  <div class="AppMain d-flex flex-wrap">
    <!--MENU LATERAL IZQUIERDO-->
    <div class="LateralMenuContent">
      <MenuGeneral />
    </div>
    <div class="GeneralContent FullOnMovil pl-10 pr-10">
      <!--TITULO DE LA PÁGINA-->
      <TitlePage title="Underwriting" />
      <!--BARRA DE NAVEGACIÓN DE Underwriting-->
      <BarNav link1="" link2="lnkActive" />
      <TypeBound />
      <!--PASOS DE REGISTRO-->
      <Stepper
        step3="StepActive"
        stepMovil1="Submission"
        stepMovil2=""
        stepMovil3=""
      />
      <!--COPY ACCOUNT-->
      <div class="CopyAndDetailscont">
        <EditAccount
          v-if="facultativeReference"
          :editAccount="editable"
          :accountName="facultativeReference"
        />
        <EditAccount
          v-else
          :editAccount="editable"
          :accountName="nameReference"
        />
        <CopyAccount />
      </div>
      <RiskAnalysisQuotator
        ref="riskAnalysisQuotator"
        :loadingPanel="loadingPanel"
        @panel-event="disabledInteracton"
        @all-required-fields-complete="onAllRequiredFieldsComplete"
      />
      <FilesSubmission @panel-event="disabledInteracton" />
      <SlipDocuments @panel-event="disabledInteracton" />
      <NotesComponent @panel-event="disabledInteracton" />
      <GeneralReport :disabled="!requiredFieldsCompleted" />

      <div v-if="!requiredFieldsCompleted" class="mt-4 text-center">
        <v-alert type="info" dense>
          Please complete the required fields to enable the action buttons.
        </v-alert>
      </div>
      <!-- <ExtensionAndEndorsements /> -->
      <div class="finishButtonCont mt-7 d-flex justify-end align-center">
        <div @click="onSendToFacultative">
          <v-btn
            v-if="showFacultativeButton"
            rounded
            large
            text
            class="finishBtn"
            :disabled="!buttonsEnabled"
            @click.stop
          >
            Send To Facultative
          </v-btn>
        </div>
      </div>
      <!--Botón crear wallet-->
      <div class="finishButtonCont mt-2 d-flex justify-end align-center">
        <div @click="onCreateWallet">
          <v-btn
            rounded
            large
            text
            class="finishBtn"
            :disabled="!buttonsEnabled"
            @click.stop
          >
            Create Wallet
          </v-btn>
        </div>
      </div>
      <!--ESPACIO EN BLANCO-->
      <WhiteSpace />
    </div>
  </div>
</template>
<script>
import TitlePage from "@/components/TitlePage.vue";
import TypeBound from "@/components/subscription/bound/TypeBound.vue";
import MenuGeneral from "@/components/Menu/MenuGeneral.vue";
import BarNav from "@/components/subscription/BarNav.vue";
import TypeSubmission from "@/components/subscription/submission/TypeSubmission.vue";
import Stepper from "@/components/subscription/submission/Stepper";
import ExtensionAndEndorsements from "@/components/subscription/endorsements/carEar/ExtensionAndEndorsements";
import RiskAnalysisQuotator from "@/components/subscription/bound/propertyQuotatorProportional/RiskAnalysisQuotator";
import FilesSubmission from "@/components/subscription/submission/FilesSubmission.vue";
import SlipDocuments from "@/components/subscription/submission/SlipDocuments.vue";
import NotesComponent from "@/components/Notes/NotesComponent.vue";
import GeneralReport from "@/components/subscription/bound/engineering/GeneralReport";
//import EmailRichEditor from '@/components/Email/EmailRichEditor';
import EditAccount from "@/components/subscription/EditAccount.vue";

import CopyAccount from "@/components/subscription/quotation/CopyAccount.vue";
import WhiteSpace from "@/components/WhiteSpace.vue";
import { mapActions, mapGetters, mapMutations } from "vuex";

//TODO:Quitar este servicio
//services
import { apolloClient } from "@/lib/api";
import AccountCompleteService from "./services/create-account-complete-prop.service";
import NetPremiumService from "@/modules/home/services/net-premium.service";
import SubscriptionService from "@/modules/home/services/subscription.service";
import checkDisableInputsFile from "@/lib/checkDisableInputsFile";
import gql from "graphql-tag";

export default {
  name: "BoundPropertyQuotatorProportional",
  components: {
    TypeBound,
    TitlePage,
    MenuGeneral,
    BarNav,
    TypeSubmission,
    Stepper,
    CopyAccount,
    WhiteSpace,
    RiskAnalysisQuotator,
    ExtensionAndEndorsements,
    FilesSubmission,
    SlipDocuments,
    NotesComponent,
    GeneralReport,
    // EmailRichEditor,
    EditAccount,
  },
  data() {
    return {
      loadingPanel: false,
      editable: false,
      subscriptionId: this.$route.params.subscriptionId,
      showFacultativeButton: false,
      requiredFieldsCompleted: false,
    };
  },
  provide() {
    return {
      deepDisabled: this.disabledSubAccordion,
    };
  },
  computed: {
    ...mapGetters([
      "nameReference",
      "layersArray",
      "quotation",
      "facultativeReference",
      "subscriptionStatus",
    ]),
    buttonsEnabled() {
      return this.requiredFieldsCompleted && !this.loadingPanel;
    },
  },
  watch: {
    "$route.params.subscriptionId": async function (id) {
      this.RESET_SUBSCRIPTION_REFERENCE();
      await this.resetSubscriptionStatus();
      if (this.$route.params && this.$route.params.subscriptionId) {
        this.editable = true;
      }
    },
    loadingPanel: function (newLoadingPanel) {
      if (!newLoadingPanel) this.disabledInteracton();
    },
  },
  async beforeMount() {
    /**se agrego esta parte para generar un respiro previo para guardar la actualizaciones del net premium*/
    const subscriptionId = Number(this.subscriptionId);
    const hasInitialRegister = await NetPremiumService.hasInitialRegister(
      subscriptionId
    );
    if (!hasInitialRegister)
      await NetPremiumService.addOrUpdateNetPremium(subscriptionId, {}, false);

    this.showFacultativeButton = !(await SubscriptionService.isAccountComplete(
      subscriptionId
    ));
  },
  async mounted() {
    //TODO: revisar porque la primera vez al ir bound no se carga la referencia a la linea de riesgo PRO
    // *  encontrar el método que actualiza es información

    /* set loaders */
    const lpa = "loadingPanel";
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
      this.getCatalogByName({ name: "activities" }),
      this.getCatalogByName({ name: "currencies" }),
      this.getCatalogByName({ name: "risk_type" }),
      this.getCatalogByName({ name: "countries" }),
    ]);
    await this.getQuotationInformation();
    await this.updateBoundType(2);
    await Promise.all([
      this.getBoundInformation(),
      this.getBoundInformation("boundInsurable"),
      this.getBoundInformation("boundInsurableProp"),
      // this.getBoundInformation('buced'),
      this.loadMultipleDeductiblesEng({ table: "buced" }),
      this.getBoundInformation("boundSublimesEng"),
      this.getBoundInformation("mainLocation"),
      this.getBoundInformation("boundPml"),
      this.getBrokers(),
      this.getCedents(),
      this.getLayers(),
      this.getDeductiblesProperty(),
      this.getSublimesProperty(),
    ]);

    // console.log(this.layersArray);
    /* load finished */
    this[lpa] = false;

    const riskAnalysisQuotator = this.$refs.riskAnalysisQuotator;
    riskAnalysisQuotator.riskAnalysisQuotatorPanel = 0;
    this.disabledInteracton();
  },
  methods: {
    ...mapActions([
      "checkSubscriptionStored",
      "updateBoundType",
      "getBoundInformation",
      "updateQuotationType",
      "getQuotationInformation",
      "getCatalogByName",
      "getBrokers",
      "getCedents",
      "resetSubscriptionStatus",
      "loadMultipleDeductiblesEng",
      "getLayers",
      "getSublimesProperty",
      "addFacultative",
      "getDeductiblesProperty",
    ]),
    ...mapMutations(["RESET_SUBSCRIPTION_REFERENCE"]),
    async disabledInteracton() {
      const subscriptionId = Number(this.$route.params.subscriptionId);
      const isBoundComplete = await SubscriptionService.isAccountComplete(
        subscriptionId
      );

      if (isBoundComplete || [5, 7].includes(this.subscriptionStatus)) {
        checkDisableInputsFile();
      }
    },
    async disabledSubAccordion() {
      const subscriptionId = Number(this.$route.params.subscriptionId);
      const isBoundComplete = await SubscriptionService.isAccountComplete(
        subscriptionId
      );
      if (isBoundComplete || [5, 7].includes(this.subscriptionStatus)) {
        checkDisableInputsFile();
      }
    },
    onSendToFacultative() {
      if (this.buttonsEnabled) {
        this.sendToFacultative();
      } else {
        this.scrollToFirstInvalid();
      }
    },
    async sendToFacultative() {
      const subscriptionId = Number(this.subscriptionId);
      await AccountCompleteService.addInitialRegister(subscriptionId);
      this.$router.push({ name: "Subs home" });
    },
    onCreateWallet() {
      if (this.buttonsEnabled) {
        this.createWallet();
      } else {
        this.scrollToFirstInvalid();
      }
    },
    // TODO:definir bien donde ira este servicio
    async createWallet() {
      try {
        const createWalletQuery = gql`
          mutation createWallet($subscriptionId: ID!) {
            createWallet(subscriptionId: $subscriptionId) {
              statusCode
              response
              message
            }
          }
        `;

        await apolloClient.query({
          variables: {
            subscriptionId: this.subscriptionId,
          },
          query: createWalletQuery,
          fetchPolicy: "no-cache",
        });

        this.$router.push({ path: "/wallet" });
      } catch ({ message }) {
        throw new Error(message);
      }
    },
    onAllRequiredFieldsComplete(isComplete) {
      this.requiredFieldsCompleted = isComplete;
    },
    scrollToFirstInvalid() {
      this.$refs.riskAnalysisQuotator?.scrollToFirstInvalid();
    },
  },
};
</script>
<style lang="less" scoped>
.finishBtn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.finishBtn:disabled:hover {
  background-color: transparent !important;
}
</style>
