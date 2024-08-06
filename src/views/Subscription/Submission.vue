<template>
  <div class="AppMain d-flex flex-wrap">
    <!--MENU LATERAL IZQUIERDO-->
    <div class="LateralMenuContent">
      <MenuGeneral />
    </div>

    <AddBrokerOrCedent :displayModal="modalCreateBrokerOrCedent" />

    <!--CONTENEDOR GENERAL-->
    <div class="GeneralContent FullOnMovil pl-10 pr-10">
      <!--TITULO DE LA PÁGINA-->
      <TitlePage title="Underwriting" />

      <!--BARRA DE NAVEGACIÓN DE Underwriting-->
      <BarNav link1="" link2="lnkActive" />

      <!--NEW / RENEWAL -->
      <TypeSubmission />

      <!--PASOS DE REGISTRO-->
      <Stepper
        step1="StepActive"
        stepMovil1="Submission"
        stepMovil2=""
        stepMovil3=""
        stepMovil4=""
      />

      <!--COPY ACCOUNT-->
      <div class="CopyAndDetailscont" v-if="editable">
        <EditAccount v-if="facultativeReference" :editAccount="editable" :accountName="facultativeReference" />
        <EditAccount v-else :editAccount="editable" :accountName="nameReference" />
        <CopyAccount />
      </div>

      <!--INFORMACION DE LA CUENTA-->
      <AccountInformation
        ref="accInfo"
        v-on:changeDocuments="changeDocuments($event)"
        @panel-event="disabledInteracton"
      />

      <!--COMPONENTE PARA SUBIR ARCHIVOS-->

      <FilesSubmission 
        :showFileUp="showFileUp" 
        @panel-event="disabledInteracton"
      />

      <CorrespondenceDocuments  @panel-event="disabledInteracton" />

      <SlipDocuments @panel-event="disabledInteracton"/>

      <!--NOTAS-->
      <NotesComponent @panel-event="disabledInteracton" />

      <!--BOTON PARA FINALIZAR-->
      <div class="finishButtonCont mt-7 d-flex justify-end align-center">
        <v-btn
          rounded
          large
          text
          class="finishBtn"
          :loading="loading"
          @click="submit()"
        >
          <!-- @click="passwordRequest()" -->
          send submission
        </v-btn>
      </div>

      <!--ESPACIO EN BLANCO-->
      <WhiteSpace />
    </div>

    <router-view></router-view>
  </div>
</template>
<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';
import { stateExpansiveManager } from '@/mixins/subscription.js';

import TitlePage from '@/components/TitlePage.vue';
import MenuGeneral from '@/components/Menu/MenuGeneral.vue';
import BarNav from '@/components/subscription/BarNav.vue';
import TypeSubmission from '@/components/subscription/submission/TypeSubmission.vue';
import Stepper from '@/components/subscription/submission/Stepper';
import AccountInformation from '@/components/subscription/submission/AccountInformation.vue';
import FilesSubmission from '@/components/subscription/submission/FilesSubmission.vue';
import SlipDocuments from '@/components/subscription/submission/SlipDocuments.vue';
import CorrespondenceDocuments from '@/components/subscription/submission/CorrespondenceDocuments.vue';
import EditAccount from '@/components/subscription/EditAccount.vue';
import CopyAccount from '@/components/subscription/quotation/CopyAccount.vue';
import WhiteSpace from '@/components/WhiteSpace.vue';
import NotesComponent from '@/components/Notes/NotesComponent.vue';
import AddBrokerOrCedent from '@/components/Create/AddBrokerOrCedent.vue';

//MIXINS
import { showModal } from '@/mixins/subscription.js';

import { validationMixin } from 'vuelidate';

//Servicios
import SubscriptionService from '@/modules/home/services/subscription.service'

export default {
  name: 'Submission',
  mixins: [showModal, validationMixin, stateExpansiveManager],
  components: {
    TitlePage,
    MenuGeneral,
    BarNav,
    TypeSubmission,
    Stepper,
    EditAccount,
    CopyAccount,
    AccountInformation,
    FilesSubmission,
    SlipDocuments,
    CorrespondenceDocuments,
    WhiteSpace,
    NotesComponent,
    AddBrokerOrCedent,
  },
  data() {
    return {
      showFileUp: true,
      /* loading button & loaders */
      loader: null,
      loading: false,
      /* submitted on click */
      submitted: false,
      /* en caso de ser editable */
      editable: false,
    };
  },
  watch: {
    '$route.params.subscriptionId': async function (id) {
      this.RESET_SUBSCRIPTION_REFERENCE();
      await this.resetSubscriptionStatus();
      if (this.$route.params && this.$route.params.subscriptionId) {
        this.editable = true;
      }
    },
    modalCreateBrokerOrCedent: async function (val) {
      if (val == false) {
        await Promise.all([this.getBrokers(), this.getCedents()]);
      }
    },
  },
  async mounted() {
    this.disabledInteracton()
    this.RESET_SUBSCRIPTION_REFERENCE();
    await this.resetSubscriptionStatus();
    if (this.$route.params && this.$route.params.subscriptionId) {
      this.editable = true;
    }
  },
  computed: {
    ...mapGetters([
      'subscription_type',
      'subscription_id',
      'nameReference',
      'facultativeReference',
      'subscriptionStatus',
      'modalCreateBrokerOrCedent',
    ]),
  },
  methods: {
    ...mapActions([
      'subscriptionSubmission',
      'updateDataSubscription',
      'resetSubscriptionStatus',
      'updateSubscriptionStatus',
      'globalSaveColumn',
      'getBrokers',
      'getCedents'
    ]),
    ...mapMutations(['RESET_SUBSCRIPTION_REFERENCE']),
    async disabledInteracton () {
      if(!this.$route.params.subscriptionId) return;
      const subscriptionId = Number(this.$route.params.subscriptionId)
      const isBoundComplete =  await SubscriptionService.isAccountComplete(subscriptionId)
      isBoundComplete ? this.checkDisableInputsFile() : ''
    },
    checkDisableInputsFile  () {
      setTimeout(() => {
        // Disabled close account
        const closeAccountButton = document.querySelector('.closeCont')
        closeAccountButton.classList.add('disabled-element');
        // Disabled copy account
        const copyAccountButton = document.querySelector('.CopyAccount')
        copyAccountButton.classList.add('disabled-element');
        // Disable all another elements
        const getElements = document.querySelectorAll('.v-input')
        const deleteButtons = document.querySelectorAll('.TableDelete')
        const getInputSquare = document.querySelectorAll('.InputFileContent')
        const getButtosnDelete = document.querySelectorAll('.InputDeletContBtn')
        const buttonsFileLarge = document.querySelectorAll('.actions button.v-btn')
        const getButtosAdd = document.querySelectorAll('.button')
        const getButtosAddTwo = document.querySelectorAll('.moreButton')
        const inputButton = document.querySelectorAll('button.moreButton')
        const buttonAddNotes = document.querySelectorAll('.CreateNoteCont button.v-btn')
        
        for (const inputSquare of getInputSquare) {
          inputSquare.classList.add('disabled-element');
        }
        for (const button of inputButton) {
          button.disabled = true;
          button.classList.add('disabled-element');
        }
        for (const buttonDelete of getButtosnDelete) {
          buttonDelete.classList.add('disabled-element');
          buttonDelete.replaceWith(buttonDelete.cloneNode(true));
        }
        for (const buttonFileLarge of buttonsFileLarge) {
          buttonFileLarge.classList.add('disabled-element');
          buttonFileLarge.replaceWith(buttonFileLarge.cloneNode(true));
        }
        for (const buttonAdd of getButtosAdd) {
          buttonAdd.classList.add('disabled-element');
        }
        for (const buttonAddTwo of getButtosAddTwo) {
          buttonAddTwo.classList.add('disabled-element-hidden');
        }
        for (const element of getElements) {
          element.classList.add('disabled-element');
        }
        for (const deleteButtons of deleteButtons) {
          deleteButtons.classList.add('disabled-element');
          deleteButtons.replaceWith(deleteButtons.cloneNode(true));
        }
        for (const addNotesBtn of buttonAddNotes) {
          addNotesBtn.classList.add('disabled-element');
          addNotesBtn.replaceWith(addNotesBtn.cloneNode(true));
        }
      }, 50);
    },
    async submit() {
      const referedForm = this.$refs.accInfo; // referencia al formulario
      referedForm.$v.$touch(); // valida el formulario

      /* revisión de errores */
      const errorExists =
        referedForm.$v.accountInformation.$invalid ||
        referedForm.$v.contactsInformation.$invalid;

      /* abrir los páneles en caso de error */
      if (errorExists) {
        referedForm.accountPanel = 0;
        referedForm.contactPanel = 0;
      }

      if (referedForm.$v.$invalid) return; // en caso de haber errores

      this.loader = 'loading'; // button loader

      /* loader button config */
      const l = this.loader;
      this[l] = !this[l];

      const {
        // name: { $model: name },
        broker: { $model: broker },
        cedent: { $model: cedent },
        country: { $model: country },
        activity: { $model: activity },
        currency: { $model: currency },
        typeOfRisk: { $model: typeOfRisk },
        insuredName: { $model: insuredName },
      } = referedForm.$v.accountInformation;

      const { $model: contactsInformation } =
        referedForm.$v.contactsInformation;

      try {
        await this.subscriptionSubmission({
          accountInformation: {
            insuredName,
            name,
            country,
            typeOfRisk,
            activity,
            currency,
            broker,
            cedent,
          },
          contactsInformation,
        });
        localStorage.removeItem("insuredName");
        localStorage.removeItem("activity");
        localStorage.removeItem("broker");
        localStorage.removeItem("cedent");
        localStorage.removeItem("country");
        localStorage.removeItem("currency");
        localStorage.removeItem("typeOfRisk");
        localStorage.setItem("IsPrecaptured", "0");

        if (!this.nameReference) {
          await this.updateDataSubscription({
            reference: 'COT-' + this.subscription_id,
          });
        }

        if (this.subscriptionStatus <= 1 || !this.subscriptionStatus)
          await this.updateSubscriptionStatus(2);
        await this.globalSaveColumn({
          table: 'subscription',
          column: 'subscription_type',
          difname: 'type',
          id: this.subscription_id,
        });

        this.$router.push({
          name: 'Edit Subs quotation',
          params: { subscriptionId: this.subscription_id },
        });
      } catch (e) {
        console.error(e);
      }

      this[l] = false;
      this.loader = null;
    },
    changeDocuments(event) {
      if (event != '') {
        this.showFileUp = true;
      } else {
        this.showFileUp = false;
      }
    },
  },
};
</script>
<style lang="less" scoped>
//ESTILOS GENERALES DEL ACORDEON
@import '~@/assets/style/AccordionStyle.less';
</style>