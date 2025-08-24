<template>
  <div class="payment-request-view pb-5">
    <PaymentRequestBarNav />
    <!-- Back button -->
    <div class="payment-request-view__back-button">
      <v-btn class="button-submit button-submit--transparent" rounded depressed color="#003D6D">
        Back to accounts
        <v-icon class="icon">mdi-close-circle</v-icon>
      </v-btn>
    </div>
    <!-- Form -->
    <div class="payment-request-view__form-container">
      <!-- Account information -->
      <div class="wallet-account-information">
        <div class="payment-request-title">Account information</div>
        <div class="input-container">
          <v-text-field label="Bound number" v-model="subscriptionId" :readonly="true" :disabled="true" />
        </div>
        <div class="input-container">
          <v-text-field label="Insured" v-model="accountInformation.insuredName" :readonly="true" :disabled="true" />
        </div>
        <div class="input-container">
          <v-select v-model.trim="accountInformation.typeOfRisk" label="Line" :items="risk_type" item-text="key" item-value="id" :readonly="true" append-icon="" :disabled="true"></v-select>
        </div>
        <div class="input-container input-container--small">
          <v-text-field label="Interception" v-model="quotation.inceptionDate" :readonly="true" :disabled="true" />
        </div>
        <div class="input-container input-container--small">
          <v-text-field label="Expiry" v-model="quotation.expiryDate" :readonly="true" :disabled="true" />
        </div>
        <div class="input-container">
          <v-select v-model.trim="accountInformation.country" label="Country" :items="countries" item-text="description" item-value="id" :readonly="true" append-icon="" :disabled="true"></v-select>
        </div>
        <div class="input-container">
          <v-select v-model.trim="accountInformation.cedent" label="Cedent" :items="availableCedents" item-text="name" item-value="id" :readonly="true" append-icon="" :disabled="true"></v-select>
        </div>
        <div class="input-container">
          <v-select v-model.trim="accountInformation.broker" label="Broker" :items="availableBrokers" item-text="name" item-value="id" :readonly="true" append-icon="" :disabled="true"></v-select>
        </div>
        <div class="input-container input-container--small"></div>
        <div class="input-container input-container--small"></div>
        <div class="input-container">
          <v-text-field label="Limit" v-model.trim="boundInsurableProps.limit" :readonly="true" :disabled="true" />
        </div>
        <div class="input-container">
          <v-text-field label="Excess" v-model.trim="boundInsurableProps.excess" :readonly="true" :disabled="true" />
        </div>
        <div class="input-container">
          <v-text-field label="SLU line" v-model.trim="boundInsurableProps.sluLine" :readonly="true" :disabled="true" />
        </div>
        <div class="input-container">
          <v-text-field label="SLU limit" v-model.trim="boundInsurableProps.sluLimit" :readonly="true" :disabled="true" />
        </div>
        <div class="input-container input-container--small"></div>
      </div>
      <!-- Installments -->
      <div class="installments-suscription">
        <div class="payment-request-title">Installments subscription</div>
        <div class="installments-suscription__form">
          <v-radio-group @change="evaluateRadio($event)" row v-model="installment">
            <!-- mostramos los payment de la base de datos -->
            <template v-if="installments && installments.length">
              <div class="installments-suscription__form" v-for="data in installments">
                <v-radio :value="`installment ${data.index}`" @click="setPercent(data.percent)" :label="`installment ${data.percent} %`" />
                <div class="space" />
              </div>
            </template>
            <div class="radio-with-text-container">
              <v-radio value="installmentCustom" label="Installment" />
              <div class="radio-with-text-container__input">
                <v-text-field :disabled="disabledCustomInstallment" suffix="%" />
              </div>
            </div>
            <div class="space" />
            <v-btn class="button-submit" rounded depressed color="#003D6D"> Preview total premium </v-btn>
          </v-radio-group>
        </div>
      </div>
    </div>
    <!-- Buttons -->
    <div class="payment-request-view__submit-buttons">
      <AppCloseAccount class="button-submit button-submit--outlined" color="#003D6D" :closeAccountData="emailOptions" :classRounded="true" :top="true" text="Send Mail" @close-account="selectedTypeNotification($event)"> </AppCloseAccount>
      <v-btn class="button-submit button-submit--outlined" rounded depressed color="#003D6D"> Generate PDF </v-btn>
    </div>
    <!-- Email -->
    <AppEmailEditor :openEmailEditor="emailEditorModalOpened" @close-modal="closeEmailEditorModal" :idTemplate="emailTemplate.id" :headerEmail="emailTemplate.description" :account="subscriptionId" :sendMail="getInforMail" />
  </div>
</template>
<script>
/**
 // TODO:
	- falta obtener la información de las diferentes parates del editor de mails
	- falta definir el servicio para hacer la query
 */

//vuex
import { mapActions, mapGetters } from "vuex";
import PaymentRequestBarNav from "./components/PaymentRequestBarNav.vue";
import AppEmailEditor from "@/application/components/AppEmailEditor.vue";
import PaymentServices from "@/modules/home/services/payments.service";
import WalletPaymentRequestService from "./services/wallet-payment-request.service";
import AppCloseAccount from "@/application/components/AppCloseAccount.vue";

export default {
  name: "WalletPaymentRequest",
  data: () => {
    return {
      subscriptionId: null,
      percent: 0,
      installments: [],
      installment: "",
      disabledCustomInstallment: false,
      emailEditorModalOpened: false,
      emailOptions: [],
      emailTemplate: {},
      boundInsurableProps: {},
    };
  },
  components: {
    PaymentRequestBarNav,
    AppEmailEditor,
    AppCloseAccount,
  },
  methods: {
    evaluateRadio(value) {
      value === "installmentCustom" ? (this.disabledCustomInstallment = false) : (this.disabledCustomInstallment = true);
    },
    closeEmailEditorModal() {
      this.emailEditorModalOpened = false;
    },
    selectedTypeNotification({ idOptionSelected }) {
      // optionSelected Contiene el id de la opción que se seleccionó
      this.emailTemplate = this.emailOptions.find((option) => option.id === idOptionSelected);
      this.openEmailEditor();
    },
    openEmailEditor() {
      this.emailEditorModalOpened = true;
    },

    setPercent(percent) {
      this.percent = Number(percent);
    },

    getInforMail() {},

    //métodos de la vuex
    ...mapActions(["subscriptionSubmission", "checkSubscriptionStored", "getCatalogByName", "getBrokers", "getCedents", "getQuotationInformation"]),
  },
  computed: {
    //getter de vuex
    ...mapGetters(["countries", "risk_type", "currencies", "availableBrokers", "availableCedents", "accountInformation", "quotation"]),
  },
  async beforeMount() {
    // ponemos el valor de ls sub
    this.subscriptionId = this.$route.params.subscriptionId;

    //actualizamos los datos de la store
    await this.checkSubscriptionStored();

    //cargamos la informacion de los  catálogos Y la guardamos en la store
    await this.getCatalogByName({ name: "activities" });
    await this.getCatalogByName({ name: "countries" });
    await this.getCatalogByName({ name: "risk_type" });
    await this.getCatalogByName({ name: "currencies" });
    await this.getBrokers();
    await this.getCedents();

    //obtenemos la quotations a partir del subscription_id del state
    await this.getQuotationInformation();

    //traemos todos lo installments
    this.installments = await PaymentServices.getPayments(this.subscriptionId);

    //le agregamos el valor que controlara los radios
    this.installments = this.installments.map((installment) => ({ ...installment, selected: false }));

    //opciones del las notificaciones los mails
    this.emailOptions = await WalletPaymentRequestService.getEmailTemplatesWallet();

    //información de bound_insurable_prop
    this.boundInsurableProps = await WalletPaymentRequestService.getInfoInsurablePropBySubscriptionId(this.subscriptionId);
  },
};
</script>
<style lang="less" scoped>
.payment-request-view {
  &__back-button {
    width: 100%;
    height: auto;
    display: flex;
    justify-content: flex-end;
    align-items: flex-start;
    align-content: flex-start;
    margin-top: 15px;
  }
  &__form-container {
    width: 100%;
    height: auto;
    padding: 25px 25px;
    background: white;
    border-radius: 5px;
    margin-top: 30px;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    align-content: flex-start;
    flex-wrap: wrap;
    row-gap: 50px;
    // Wallet account information
    .wallet-account-information {
      width: 100%;
      height: auto;
      display: flex;
      justify-content: flex-start;
      align-items: flex-start;
      align-content: flex-start;
      flex-wrap: wrap;
      justify-content: flex-start;
      gap: 1.75%;
      row-gap: 25px;
      .input-container {
        width: 19.5%;
        height: 50px;
        &--small {
          width: 15%;
        }
      }
    }

    // Installments
    .installments-suscription {
      width: 100%;
      &__form {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        align-content: center;
        height: auto;
        margin-top: 10px;

        .radio-with-text-container {
          display: flex;
          justify-content: flex-start;
          align-items: center;
          &__input {
            width: 50px;
            margin-left: -8px;
          }
        }
      }
      .space {
        width: 10px;
      }
    }
  }

  &__submit-buttons {
    width: 100%;
    height: auto;
    margin-top: 25px;
    display: flex;
    justify-content: flex-start;
    align-items: flex-end;
    align-content: flex-start;
    flex-direction: column;
    row-gap: 25px;
  }
}
.margin-top {
  margin-top: 50px;
}
.payment-request-title {
  width: 100%;
  font-size: 20px;
  font-weight: 600;
}
.button-submit {
  border-radius: 5px;
  width: 213px;
  color: white !important;
  height: 40px !important;
  font-weight: 400;
  letter-spacing: normal;
  margin-left: 15px;

  &--outlined {
    color: #003d6d !important;
    background: transparent !important;
    border: solid 1px !important;
  }
  &--transparent {
    width: 190px;
    color: #547fa9 !important;
    background: transparent !important;
    justify-content: space-around !important;
    .icon {
      color: #f59607;
    }
  }
}
</style>
