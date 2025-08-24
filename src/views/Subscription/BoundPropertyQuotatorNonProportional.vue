<template>
  <div class="app-main">
    <!--MENU LATERAL IZQUIERDO-->
    <div class="lateral-menu-content">
      <MenuGeneral />
    </div>

    <!--CONTENEDOR GENERAL-->
    <div class="general-content full-on-movil">
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
      <div class="copy-and-details-cont">
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
        @panel-event="disabledInteracton"
        @changeTotalInsurableValueStocksRate="
          changeTotalInsurableValueStocksRate
        "
        :loadingPanel="loadingPanel"
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

      <!--BOTON PARA FINALIZAR-->
      <div class="finish-button-cont">
        <v-btn
          v-if="showFacultativeButton"
          rounded
          large
          text
          class="finish-btn"
          @click="sendToFacultative"
          :disabled="!buttonsEnabled"
        >
          Send To Facultative
        </v-btn>
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
import Stepper from "@/components/subscription/submission/Stepper";
import ExtensionAndEndorsements from "@/components/subscription/endorsements/carEar/ExtensionAndEndorsements";
import RiskAnalysisQuotator from "@/components/subscription/bound/propertyQuotatorNonProportional/RiskAnalysisQuotator";
import FilesSubmission from "@/components/subscription/submission/FilesSubmission.vue";
import SlipDocuments from "@/components/subscription/submission/SlipDocuments.vue";
import NotesComponent from "@/components/Notes/NotesComponent.vue";
import GeneralReport from "@/components/subscription/bound/engineering/GeneralReport";
import EditAccount from "@/components/subscription/EditAccount.vue";
import CopyAccount from "@/components/subscription/quotation/CopyAccount.vue";
import WhiteSpace from "@/components/WhiteSpace.vue";
import checkDisableInputsFile from "@/lib/checkDisableInputsFile";
import { mapGetters } from "vuex";

//Servicios
import AccountCompleteNonPropServices from "./services/create-account-complete-non-prop.service";
import SubscriptionService from "@/modules/home/services/subscription.service";
import NetPremiumService from "@/modules/home/services/net-premium.service";

export default {
  name: "BoundPropertyQuotatorProportional",
  components: {
    TypeBound,
    TitlePage,
    MenuGeneral,
    BarNav,
    Stepper,
    CopyAccount,
    WhiteSpace,
    RiskAnalysisQuotator,
    ExtensionAndEndorsements,
    FilesSubmission,
    SlipDocuments,
    NotesComponent,
    GeneralReport,
    EditAccount,
  },
  watch: {
    loadingPanel: function (newLoadingPanel) {
      if (!newLoadingPanel) this.disabledInteracton();
    },
  },
  data() {
    return {
      subscriptionId: this.$route.params.subscriptionId,
      showFacultativeButton: true,
      loadingPanel: false,
      editable: false,
      totalInsurableValue: {
        stocksRate: 0,
      },
      requiredFieldsCompleted: false,
    };
  },
  provide() {
    return {
      totalInsurableValue: this.totalInsurableValue,
      deepDisabled: this.disabledSubAccordion,
    };
  },
  computed: {
    ...mapGetters([
      "nameReference",
      "facultativeReference",
      "subscriptionStatus",
    ]),
    buttonsEnabled() {
      return this.requiredFieldsCompleted && !this.loadingPanel;
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
    this.disabledInteracton();
  },
  methods: {
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
    async sendToFacultative() {
      const subscriptionId = Number(this.subscriptionId);
      await AccountCompleteNonPropServices.addInitialRegister(subscriptionId);
      this.$router.push({ name: "Subs home" });
    },
    changeTotalInsurableValueStocksRate(value) {
      this.totalInsurableValue.stocksRate = value;
    },
    onAllRequiredFieldsComplete(isComplete) {
      this.requiredFieldsCompleted = isComplete;
    },
  },
};
</script>
