<template>
  <div class="AppMain d-flex flex-wrap">
    <!--MENU LATERAL IZQUIERDO-->
    <div class="LateralMenuContent HideOnMovil">
      <MenuGeneral />
    </div>

    <!--MENU PARA DISPOSITIVOS MOVILES-->
    <div class="SuperiorMenuContent ShowFlexOnMovil">
      <MenuGeneralMovil />
    </div>

    <!--CONTENEDOR GENERAL-->
    <div class="GeneralContent FullOnMovil pl-10 pr-10">
      <!--TITULO DE LA PÁGINA-->
      <TitlePage title="Underwriting" />

      <!--BARRA DE NAVEGACIÓN DE SUBSCRIPTION-->
      <BarNav link1="" link2="lnkActive" />

      <!--POPORTIONAL / NON PROPORTIONAL -->
      <TypeProportional />

      <!--PASOS DE REGISTRO-->
      <Stepper
        step2="StepActive"
        stepMovil1=""
        stepMovil2="Quotation"
        stepMovil3=""
      />

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

      <QuoNonProp
        ref="quoNonProp"
        :loadingPanel="loadingPanel"
        @panel-event="disabledInteracton"
        @disabled-loss-curves="disabledLossCurves"
      />

      <!--SLIP DOCUMENTS-->
      <SlipDocuments @panel-event="disabledInteracton" />

      <!--NOTAS-->
      <NotesComponent @panel-event="disabledInteracton" />

      <!--BOTONES PARA FINALIZAR-->
      <ButtonsQuotation ref="qBtn" @sendToBound="submitQuotation()" />

      <!--MODAL TARIFAR-->
      <RateModal />
      <RateModalCarEar />

      <!--ESPACIO EN BLANCO-->
      <WhiteSpace></WhiteSpace>
    </div>
  </div>
</template>
<script>
import RateModalCarEar from "@/components/Rate/RateModalCarEar.vue";
import RateModal from "@/components/Rate/RateModal.vue";

import TitlePage from "@/components/TitlePage.vue";
import MenuGeneral from "@/components/Menu/MenuGeneral.vue";
import MenuGeneralMovil from "@/components/Menu/MenuGeneralMovil.vue";
import BarNav from "@/components/subscription/BarNav.vue";
import QuoNonProp from "@/components/subscription/quotation/QuoNonProp.vue";
import EditAccount from "@/components/subscription/EditAccount.vue";
import CopyAccount from "@/components/subscription/quotation/CopyAccount.vue";

import TypeProportional from "@/components/subscription/quotation/TypeProportional.vue";
import Stepper from "@/components/subscription/submission/Stepper";

import NotesComponent from "@/components/Notes/NotesComponent.vue";

import ExposureCurves from "@/components/subscription/quotation/ExposureCurves.vue";

import SlipDocuments from "@/components/subscription/submission/SlipDocuments.vue";
import ButtonsQuotation from "@/components/subscription/quotation/ButtonsQuotation";
import checkDisableInputsFile from "@/lib/checkDisableInputsFile";
import WhiteSpace from "@/components/WhiteSpace.vue";

//MIXINS
import { stateExpansiveManager } from "@/mixins/subscription.js";
// Servicios
import SubscriptionService from "@/modules/home/services/subscription.service";
import { mapState, mapGetters, mapActions, mapMutations } from "vuex";
export default {
  name: "QuotationNonProportional",
  mixins: [stateExpansiveManager],
  data() {
    return {
      loadingPanel: false,
      editable: false,
    };
  },
  provide() {
    return {
      disablesLossCurvesFromParent: this.disabledLossCurves,
      disabledLayersFromParent: this.disabledLayers,
    };
  },
  components: {
    TitlePage,
    RateModalCarEar,
    RateModal,
    MenuGeneral,
    MenuGeneralMovil,
    BarNav,
    TypeProportional,
    Stepper,
    QuoNonProp,
    CopyAccount,
    EditAccount,
    NotesComponent,
    ExposureCurves,
    SlipDocuments,
    ButtonsQuotation,
    WhiteSpace,
  },
  computed: {
    ...mapState(["modalRateCarEar"]),
    ...mapGetters([
      "subscription_id",
      "subscriptionStatus",
      "nameReference",
      "subscription_type",
      "accountInformation",
      "risk_type",
      "facultativeReference",
    ]),
    selectedRisk: {
      get() {
        if (
          this.accountInformation.typeOfRisk &&
          this.risk_type &&
          this.risk_type.length > 0
        ) {
          const typeObj = this.risk_type.find(
            (v) => v.id === this.accountInformation.typeOfRisk
          );
          return typeObj;
        }
        return 0;
      },
    },
    routeToPush: {
      get() {
        if (this.selectedRisk && this.selectedRisk.key) {
          const { key } = this.selectedRisk;
          if (key === "CAR" || key === "EAR") return "Edit Bound";
        }
        return "Bound Property Quotator Non Proportional";
      },
    },
  },
  async beforeMount() {
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
    await this.getCatalogByName({ name: "currencies" });
    await this.updateQuotationType(2);
    await this.getQuotationInformation();
    /* load finished */
    this[lpa] = false;

    /* abrir panel después de carga para montar el componente */
    const quoNonProp = this.$refs.quoNonProp;
    quoNonProp.quoPropPanel = 0;
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
    modalRateCarEar: function (newValue) {
      if (newValue) this.disabledInteracton();
    },
  },
  mounted() {
    this.disabledInteracton();
  },
  methods: {
    ...mapActions([
      "updateQuotationType",
      "checkSubscriptionStored",
      "getQuotationInformation",
      "getCatalogByName",
      "updateSubscriptionStatus",
      "resetSubscriptionStatus",
      "globalSaveColumn",
      "addFacultative",
    ]),
    ...mapMutations([
      "RESET_QUOTATION",
      "RESET_SUBSCRIPTION_REFERENCE",
      "NEW_OR_RENEWAL",
    ]),
    async disabledInteracton() {
      if (!this.$route.params.subscriptionId) return;
      const subscriptionId = Number(this.$route.params.subscriptionId);
      const isBoundComplete = await SubscriptionService.isAccountComplete(
        subscriptionId
      );
      if (isBoundComplete || [5, 7].includes(this.subscriptionStatus)) {
        checkDisableInputsFile();
      }
    },
    async disabledLossCurves() {
      if (!this.$route.params.subscriptionId) return;
      const subscriptionId = Number(this.$route.params.subscriptionId);
      const isBoundComplete = await SubscriptionService.isAccountComplete(
        subscriptionId
      );
      if (isBoundComplete || [5, 7].includes(this.subscriptionStatus)) {
        checkDisableInputsFile();
      }
    },
    async disabledLayers() {
      if (!this.$route.params.subscriptionId) return;
      const subscriptionId = Number(this.$route.params.subscriptionId);
      const isBoundComplete = await SubscriptionService.isAccountComplete(
        subscriptionId
      );
      if (isBoundComplete) {
        setTimeout(() => {
          const layersButton = document.querySelectorAll(
            ".layerButtonCont .v-btn, .LayerCont .v-btn, .v-input, .SelectLayerCont .iconCont"
          );
          for (const layerButton of layersButton) {
            layerButton.classList.add("disabled-element");
            layerButton.replaceWith(layerButton.cloneNode(true));
          }
        }, 50);
      }
    },
    startLoad() {
      this.loader = "loading";
      const l = this.loader;
      this[l] = !this[l];
    },
    endLoad(l) {
      this[l] = false;
      this.loader = null;
    },
    async submitQuotation() {
      const qbtns = this.$refs.qBtn;
      qbtns.loadBtn = true;

      const quoNonProp = this.$refs.quoNonProp;

      const exchangeCalc = quoNonProp.$refs.exchangeCalc;
      const deductions = quoNonProp.$refs.deductions;

      /* open panels */
      if (quoNonProp.loadingPanel) {
        qbtns.loadBtn = false;
        return;
      }

      quoNonProp.quoPropPanel = 0;

      deductions.$v.$touch();
      exchangeCalc.$v.$touch();

      const deduError = deductions.$v.$error || deductions.$v.$invalid;
      const exchError = exchangeCalc.$v.$error || exchangeCalc.$v.$invalid;

      if (deduError || exchError) {
        if (exchError) this.scrollToSection(exchangeCalc);
        if (deduError) this.scrollToSection(deductions);

        qbtns.loadBtn = false;
        return;
      }

      if (this.subscriptionStatus <= 3 || !this.subscriptionStatus)
        await this.updateSubscriptionStatus(4);

      if (this.subscription_type === "RENEWAL") {
        this.NEW_OR_RENEWAL({ value: "NEW" });
        await this.globalSaveColumn({
          table: "subscription",
          column: "subscription_type",
          difname: "type",
          id: this.subscription_id,
        });
      }
      await this.addFacultative({ subscription_id: this.subscription_id });
      qbtns.loadBtn = false;

      this.$router.push({
        name: this.routeToPush,
        params: { subscriptionId: this.subscription_id },
      });
    },
    tempReturn() {
      if (this.subscription_id)
        return `/subscription/${this.subscription_id}/submission`;
      return "/subscription/submission";
    },
    scrollToSection(reference) {
      this.$nextTick(() => {
        const input = reference.$el;
        input.scrollIntoView({ behavior: "smooth" });
      });
    },
  },
};
</script>
<style lang="less" scoped>
//CONTENEDOR DE QUOTATION
@import "~@/assets/style/AccordionStyle.less";
</style>
