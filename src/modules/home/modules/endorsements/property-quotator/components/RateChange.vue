<template>
  <div class="outter-wrapper" ref="targetRef">
    <div class="endorsement-title">Rate Change</div> 
    <div class="editAccount" v-if="accountComplete.reference">
      {{ accountComplete.reference }}
    </div>
    <v-stepper v-model="e1">
      <v-stepper-header>
        <v-stepper-step :complete="e1 > 1" step="1" color="#F59607">
          Endorsement
        </v-stepper-step>

        <v-stepper-step :complete="e1 > 2" step="2" color="#F59607">
          Calculate premium
        </v-stepper-step>

        <v-stepper-step step="3" color="#F59607">
          Admitted premium
        </v-stepper-step>
      </v-stepper-header>
      <div class="endorsement-wrapper">
        <div class="content">
          <v-stepper-items>
            <v-stepper-content step="1" class="step-one">
              <!-- DATES -->
              <div class="input-row w-50 d-flex flex-wrap">
                <div class="inner-title">Endorsement date</div>
                <div class="input-col">
                  <div class="input-cont">
                    <v-menu
                      v-model="menuControllStepOne.endorsementEffectiveDate"
                      :close-on-content-click="false"
                      :nudge-right="40"
                      transition="scale-transition"
                      offset-y
                      min-width="auto"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="effectiveDate"
                          label="Endorsement effective date"
                          readonly
                          v-bind="attrs"
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        v-model="effectiveDate"
                        @input="
                          menuControllStepOne.endorsementEffectiveDate = false
                        "
                        @change="
                          endorsementDateValidation($event, effectiveDate)
                        "
                      ></v-date-picker>
                    </v-menu>
                    <div v-if="this.endorsementDateError" class="error-message">
                      The new Endorsement effective date must be lower than
                      expiry date.
                    </div>
                  </div>
                </div>

                <div class="input-col">
                  <div class="input-cont">
                    <v-menu
                      v-model="menuControllStepOne.movementEndDate"
                      :close-on-content-click="false"
                      :nudge-right="40"
                      transition="scale-transition"
                      offset-y
                      min-width="auto"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="movementEndDate"
                          label="Expiry date"
                          readonly
                          v-bind="attrs"
                          v-on="on"
                          disabled
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        v-model="movementEndDate"
                        @input="menuControllStepOne.movementEndDate = false"
                      ></v-date-picker>
                    </v-menu>
                    <div
                      v-if="this.errorsDates['movementEndDate'] && sent"
                      class="error-message"
                    >
                      The new Movement end date must be later than Endorsement
                      effective date.
                    </div>
                  </div>
                </div>
              </div>

              <div v-if="showInfoEndorsement">
                <!-- MOVEMENT VALUE -->
                <div class="input-row w-50 d-flex flex-wrap mt-6">
                  <div class="endorsement-title">Movement value</div>

                  <div class="input-row">
                    <div class="input-col">
                      <div class="column-title">Rate</div>
                      <div class="input-cont">
                        <v-text-field
                          v-model="newRates.damageRate"
                          label="Damage"
                          type="number"
                          suffix="%"
                        ></v-text-field>
                      </div>

                      <div class="input-cont">
                        <v-text-field
                          v-model="newRates.biRate"
                          label="BI"
                          type="number"
                          suffix="%"
                        ></v-text-field>
                      </div>

                      <div class="input-cont">
                        <v-text-field
                          v-model="newRates.stockRate"
                          label="Stocks"
                          type="number"
                          suffix="%"
                        ></v-text-field>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- TOTAL VALUES -->
                <div class="input-row w-50 d-flex flex-wrap mt-6">
                  <div class="endorsement-title">Total Values</div>

                  <div class="input-row">
                    <div class="input-col">
                      <div class="column-title">Rate</div>
                      <div class="input-cont">
                        <v-text-field
                          v-model="
                            accountComplete.tiv.premium.propertyDamageRate
                          "
                          label="Damage"
                          type="number"
                          suffix="%"
                          disabled
                        ></v-text-field>
                      </div>

                      <div class="input-cont">
                        <v-text-field
                          v-model="
                            accountComplete.tiv.premium.businessInterruptionRate
                          "
                          label="BI"
                          type="number"
                          suffix="%"
                          disabled
                        ></v-text-field>
                      </div>

                      <div class="input-cont">
                        <v-text-field
                          v-model="accountComplete.tiv.premium.stockRate"
                          label="Stocks"
                          type="number"
                          suffix="%"
                          disabled
                        ></v-text-field>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Additional -->
                <div class="input-row w-50 d-flex flex-wrap mt-6">
                  <div class="inner-title">Additional</div>
                  <div class="input-col">
                    <div class="input-cont">
                      <v-menu
                        v-model="menuControllStepOne.premiumPaymentDate"
                        :close-on-content-click="false"
                        :nudge-right="40"
                        transition="scale-transition"
                        offset-y
                        min-width="auto"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            v-model="premiumPaymentDate"
                            label="Premium payment date"
                            readonly
                            v-bind="attrs"
                            v-on="on"
                          ></v-text-field>
                        </template>
                        <v-date-picker
                          v-model="premiumPaymentDate"
                          @input="
                            menuControllStepOne.premiumPaymentDate = false
                          "
                        ></v-date-picker>
                      </v-menu>
                      <div
                        v-if="
                          this.errorsDates['endorsementEffectiveDate'] && sent
                        "
                        class="error-message"
                      >
                        The new Endorment effective date must be lower than
                        Inception date date .
                      </div>
                    </div>
                  </div>

                  <div class="input-col">
                    <div class="input-cont">
                      <v-autocomplete
                        :label="'Clause'"
                        v-model="clause"
                        :items="clauseList"
                        item-value="clause"
                        item-text="clause"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </v-stepper-content>

            <v-stepper-content step="2">
              <div class="detail-date">
                <div class="table-title-detail table-title-detail--large">
                  Detail
                </div>
                <div class="input-col">
                  <div class="input-cont">
                    <v-menu
                      v-model="menu4"
                      :close-on-content-click="false"
                      :nudge-right="40"
                      transition="scale-transition"
                      offset-y
                      min-width="auto"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="premiumPaymentDate"
                          label="Premium payment date"
                          readonly
                          disabled
                          v-bind="attrs"
                          v-on="on"
                        ></v-text-field>
                      </template>
                    </v-menu>
                  </div>
                </div>
                <div class="input-col">
                  <div class="input-cont">
                    <v-autocomplete
                      label="Clause"
                      v-model="clause"
                      :items="clauseList"
                      item-value="clause"
                      item-text="clause"
                      disabled
                    />
                  </div>
                </div>
              </div>

              <div class="table-container input-row justify-center">
                <div class="title-col">
                  <div class="table-title-space"></div>
                  <div class="col-subtitle">Damage</div>
                  <div class="col-subtitle">Bi</div>
                  <div class="col-subtitle">Stocks</div>
                </div>

                <template>
                  <div class="table-col">
                    <div>
                      <div class="table-title">New rate</div>
                      <div class="input-row">
                        <div class="inner-col wide-col">
                          <div class="table-input blue-input">
                            {{ newRates.damageRate }}%
                          </div>
                          <div class="table-input blue-input">
                            {{ newRates.biRate }}%
                          </div>
                          <div class="table-input blue-input">
                            {{ newRates.stockRate }}%
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </template>

                <template>
                  <div class="table-col">
                    <div>
                      <div class="table-title">Current rate</div>
                      <div class="input-row">
                        <div class="inner-col wide-col">
                          <div class="table-input blue-input">
                            {{
                              accountComplete.tiv.premium.propertyDamageRate
                            }}%
                          </div>
                          <div class="table-input blue-input">
                            {{
                              accountComplete.tiv.premium
                                .businessInterruptionRate
                            }}%
                          </div>
                          <div class="table-input blue-input">
                            {{ accountComplete.tiv.premium.stockRate }}%
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </template>
              </div>
            </v-stepper-content>

            <v-stepper-content step="3">
              <div class="inner-title">Endorsement Report</div>
              <div
                class="files-submit flex justify-content-start align-items-start align-content-start"
              >
                <AppFile
                  v-for="(item, clave) in files"
                  :key="clave"
                  :fileId="item.fileId"
                  :fileName="item.fileName"
                  :fileDownloadLink="item.fileDownloadLink"
                  :loaded="item.loaded"
                  :error="item.error"
                  :errorMessage="item.errorMessage"
                  :loading="item.loading"
                  :fileType="item.fileType"
                  :fileTypeMessage="item.fileTypeMessage"
                  @removeFileById="removeFileById($event)"
                  @errors="errors($event)"
                  @loading="loadingFile($event)"
                  @loadFile="updateFile($event)"
                />
              </div>
            </v-stepper-content>
          </v-stepper-items>
        </div>
      </div>
      <!-- <DocumentsEndorsement v-if="e1 == 1 || e1 == 3" /> -->
      <EndorsementDocuments
        @setEndorsementDocuments="setEndorsementDocuments"
        v-show="e1 == 1 || e1 == 3"
      />
      <AdmittedPremiumTable
        v-if="e1 == 2"
        @setTotalPremium="setTotalPremium"
        :detailValues="totalPremium"
      />

      <div class="stepper-btn mt-7 mb-3 d-flex justify-end align-center">
        <v-btn :outlined="e1 == 3 ? false : true" rounded large :text="e1 == 3 ? true : false"
          :class="e1 == 3 ? 'blue-btn' : 'clear-btn'" :color="e1 == 3 ? 'none' : '#003D6D'" @click="goNext(e1)"
          :disabled="validationFirstStep">
          {{ buttonTitle }}
        </v-btn>
      </div>

      <div class="stepper-btn mb-7 d-flex justify-end align-center">
        <v-btn rounded large text class="blue-btn" @click="goBack(e1)">
          {{ buttonTitleBack }}
        </v-btn>
      </div>
    </v-stepper>
  </div>
</template>
<script>
/* components */
import AppFile from "../../components/AppFile.vue";
import CurrencyInput from "@/components/CurrencyInput/CurrencyInput.vue";
import DocumentsEndorsement from "../../components/DocumentsEndorsement.vue";
import InputDaysDiference from "../../components/DaysDiference.vue";
import AdmittedPremiumTable from "../../components/AdmittedPremiumTable.vue";
/* services */
import { getFiles } from "../../services/mock-files.service";
import PaymentService from "@/modules/home/services/payments.service";
import { formatCurrency } from "../../utils";
//Clases
import { netPremiumInclusionRiskAutoCalcs } from "../class/netPremiumInclusionRisk";
import EndorsementService from "../../services/endorsement.service";
import AccountCompleteService from "@/modules/home/services/account-complete.service";
import EndorsementDocuments from "../../components/EndorsementDocuments.vue";

export default {
  name: "RateChange",
  components: {
    AppFile,
    CurrencyInput,
    DocumentsEndorsement,
    InputDaysDiference,
    EndorsementDocuments,
    AdmittedPremiumTable,
  },
  props: {
    type: { type: String, default: "Inclusion Risk" },
    accountComplete: { type: Object },
    changeDateEndorsement: {
      type: Function,
    },
    dateSaved: { type: String },
    showInfoEndorsement: { type: Boolean },
    backToCreateEndorsement: {
      type: Function,
    },
  },
  data() {
    return {
      endorsementDateError: false,
      loadingDocument: false,
      expiryDatetoCalc: this.accountComplete.deductibles.expiryDate,
      expiryDateReal: new Date(this.accountComplete.deductibles.expiryDate)
        .toISOString()
        .substr(0, 10),
      loadingdocument: false,
      checkedModifyTable: false,
      internalAdjustments: {
        deductibles: {},
        newShare: 0,
        totalPremium: 0,
        premiumSlu: 0,
        brokerage: 0,
        tax: 0,
        fronting: 0,
        eng: 0,
        colombiaReserve: 0,
        lta: 0,
        others: 0,
        netPremium: 0,
        netPremiumWithoutReserve: 0,
        netPremiumWithoutFronting: 0,
        tivMovementDamage: 0,
        tivMovementBi: 0,
        tivMovementStocks: 0,
      },
      internalAdjustmentsWithDates: {
        deductibles: {},
        newShare: 0,
        totalPremium: 0,
        premiumSlu: 0,
        brokerage: 0,
        tax: 0,
        fronting: 0,
        eng: 0,
        colombiaReserve: 0,
        lta: 0,
        others: 0,
        netPremium: 0,
        netPremiumWithoutReserve: 0,
        netPremiumWithoutFronting: 0,
        tivMovementDamage: 0,
        tivMovementBi: 0,
        tivMovementStocks: 0,
      },
      newRates: {
        damageRate: 0,
        biRate: 0,
        stockRate: 0,
      },
      applyTo: [],
      clauseList: [],
      currentMonth: [],
      currentMonthUSD: [],
      currencyOptions: {
        currency: "MXN",
        currencyDisplay: "narrowSymbol",
        locale: "en-US",
      },
      attrs: {},
      on: {},
      e1: 1,
      sent: false,
      subscriptionId: this.$route.params.id,
      errors: {
        tivStockReceivable: true,
        totalPremium: true,
        endorsementEffectiveDate: false,
      },
      errorsDates: {
        endorsementEffectiveDate: false,
        movementEndDate: false,
      },
      menuControllStepOne: {
        movementEndDate: false,
        endorsementEffectiveDate: false,
        InceptionDate: false,
        premiumPaymentDate: false,
      },
      menuControllStepTwo: {
        movementEndDate: false,
        endorsementEffectiveDate: false,
        InceptionDate: false,
        premiumPaymentDate: false,
        clause: false,
      },
      detail: 20,
      clause: this.accountComplete.cartera.clausula,
      clauseList: [],
      detailValues: [
        {
          id: 1,
          name: "Original Currency",
          premiumDamage: 0,
          premiumBi: 0,
          premiumStocks: 0,
          premiumTotal: 0,
          sluDamage: 0,
          sluBi: 0,
          sluStocks: 0,
          sluTotal: 0,
        },
        {
          id: 2,
          name: "USD",
          premiumDamage: 0,
          premiumBi: 0,
          premiumStocks: 0,
          premiumTotal: 0,
          sluDamage: 0,
          sluBi: 0,
          sluStocks: 0,
          sluTotal: 0,
        },
      ],
      totalPremium: [
        {
          id: 1,
          name: "Original Currency",
          premiumDamage: 0,
          premiumBi: 0,
          premiumStocks: 0,
          premiumTotal: 0,
          sluDamage: 0,
          sluBi: 0,
          sluStocks: 0,
          sluTotal: 0,
        },
        {
          id: 2,
          name: "USD",
          premiumDamage: 0,
          premiumBi: 0,
          premiumStocks: 0,
          premiumTotal: 0,
          sluDamage: 0,
          sluBi: 0,
          sluStocks: 0,
          sluTotal: 0,
        },
      ],
      files: [
        {
          fileId: 1,
          fileName: "Internal Adjustments",
          fileDownloadLink: "",
          loaded: false,
          error: false,
          errorMessage: "Could not load the file",
          loading: true,
          fileType: "xlsx",
          fileTypeMessage: "Download",
        },
      ],
      endorsementDocuments: [],
      endorsmentReporData: {},
      endDateError: false,
      effectiveDateError: false,
      // effectiveDate: undefined,
      effectiveDate: this.dateSaved,

      expiryDate: undefined,
      //nuevo valor para guardar el expiry date
      movementEndDate: this.initialDateValue(),
      currentMovementEndDate: this.initialDateValue(),
      inceptionDate: this.initialDateValue(),
      premiumPaymentDate: new Date().toISOString().substr(0, 10),
      lastAccountInformacion: {},
      buttonTitle: 'Next',
      buttonTitleBack: 'Cancel',
    };
  },
  async beforeMount() {
    this.el = 1;
    this.files = await getFiles();
    this.clauseList = await PaymentService.getClauses();
    this.stockPercentagePMD = this.stockInputValue * (this.PmdStock / 100);
    this.stockPercentagePMDUSD = this.stockPercentagePMD / this.exchangeRate;
  },
  async created() {
    this.newRates.damageRate =
      this.accountComplete.tiv.premium.propertyDamageRate;
    this.newRates.biRate =
      this.accountComplete.tiv.premium.businessInterruptionRate;
    this.newRates.stockRate = this.accountComplete.tiv.premium.stockRate;
  },
  mounted() {
    console.log("esto es account complete", this.accountComplete);
    const effective = new Date(this.accountComplete.deductibles.expiryDate)
      .toISOString()
      .substring(0, 10);
    const expiry = new Date(this.accountComplete.deductibles.expiryDate)
      .toISOString()
      .substring(0, 10);
    this.expiryDate = expiry;
    this.inceptionDate = effective;
    this.movementEndDate = expiry;
  },
  methods: {
    formatCurrency(amount) {
      return formatCurrency(amount);
    },
    setTotalPremium({ id, value, concept }) {
      const totalPremium = this.totalPremium.find((el) => el.id === id);
      totalPremium[concept] = value;

      if ((concept !== "premiumTotal") & (concept !== "sluTotal")) {
        this.isEdited[concept] = true;
      }
    },
    async endorsementDateValidation(event, incomingDate) {
      if (Date.parse(incomingDate) >= Date.parse(this.expiryDate)) {
        this.endorsementDateError = true;
      } else {
        await this.changeDateEndorsement(incomingDate);
        this.endorsementDateError = false;
      }
    },
    initialDateValue() {
      const newDate = new Date(
        Date.now() + 31536000000 - new Date().getTimezoneOffset() * 60000
      )
        .toISOString()
        .substr(0, 10);

      return newDate;
    },

    nextStep() {
      if (this.e1 === 1) {
        this.sent = true;
        let changeStep = true;

        if (changeStep === true) {
          this.e1 = 2;
          this.sent = false;
        }
        return;
      }
    },

    async prevStep() {
      console.log("prev step");
    },

    async saveEndorsement() {
      console.log("Save endorsement");
    },

    async removeFileById({ id }) {
      console.log("remove file");
    },

    async loadingFile({ data }) {
      console.log("loafing file");
    },

    async updateFile(data) {
      console.log("update file");
    },

    setEndorsementDocuments({ files }) {
      this.endorsementDocuments = files;
    },

    async submit() {
      this.e1 = 1;

      const tivUpdate = {
        insurable: this.accountComplete.tiv.insurable,
        premium: {
          propertyDamageRate: this.newRates.damageRate,
          businessInterruptionRate: this.newRates.biRate,
          stockRate: this.newRates.stockRate,
          stockPercentaje: this.accountComplete.tiv.premium.stockPercentaje,
        },
        boundInsurableProp: this.accountComplete.tiv.boundInsurableProp,
      };

      const accountCompleteResponse =
        await AccountCompleteService.addAccountComplete(this.subscriptionId, {
          ...this.accountComplete,
          deductibles: this.accountComplete.deductibles,
          tiv: tivUpdate,
          netPremium: this.accountComplete.net_premium,
          additionalInfo: this.accountComplete.additional_info,
          cartera: {
            ...this.accountComplete.cartera,
            ...this.cartera,
          },
        });

      await EndorsementService.addEndorsment({
        subscriptionId: this.subscriptionId,
        endorsmentType: 7,
        idUser: this.$store.state.auth.user.id,
        accountId: accountCompleteResponse.id,
        effectiveDate: this.effectiveDate,
        report: {
          endorsmentReporData: {
            ...this.endorsmentReporData,
            additionalInfo: {},
          },
          cartera: {
            ...this.accountComplete.cartera,
            ...this.cartera,
            // netPremiumDifference,
            admitedPremium: this.admitedPremium,
          },
        },
        files: this.endorsementDocuments,
      });

      await this.backToCreateEndorsement();
    },

    /**
     *  @typedef {object} validateDatesParams
     *  @property {Date}  lowerDate fecga que menor
     *  @property {Date} higherDate fecha que debe ser mayor
     *  @property {string} error proiedad del object error
     */

    /**
     * controa
     * @param {*} event
     * @param {validateDatesParams} params
     */
    validateDates(event, { lowerDate, higherDate, error }) {
      this.effectiveDate = lowerDate;
      if (Date.parse(lowerDate) < Date.parse(higherDate)) {
        this.errors[error] = false;
      } else {
        this.errors[error] = true;
      }
    },
    validfields(event) {
      return 0;
    },

    goNext(e1) {
      this.$refs.targetRef.scrollIntoView({ behavior: 'smooth' });
      if (e1 == 1) {
        this.nextStep();
      } else if (e1 == 2) {
        this.e1 = 3;
      } else if (e1 == 3) {
        this.submit();
      }
    },

    goBack(e1) {
      this.$refs.targetRef.scrollIntoView({ behavior: 'smooth' });
      if (e1 == 1) {
        this.backToCreateEndorsement();
      } else if (e1 == 2) {
        this.e1 = 1;
      } else if (e1 == 3) {
        this.e1 = 2;
      }
    },
  },
  watch: {
    e1: async function () {
      if (this.e1 === 1) {
        this.buttonTitle = 'Next';
        this.buttonTitleBack = 'Cancel';
      }
      if (this.e1 === 2) {
        this.buttonTitle = 'Next';
        this.buttonTitleBack = 'Return';
        //INICIO CALCULOS 2

        const options = {
          isEdited: {
            premiumDamage: false,
            premiumBi: false,
            premiumStocks: false,
          },
        };

        const tiv = {
          propertyDamageMovement:
            this.accountComplete.tiv.insurable.propertyDamage,
          businessInterruptionMovement:
            this.accountComplete.tiv.insurable.businessInterruption,
          stockMovement: this.accountComplete.tiv.insurable.stock,

          propertyDamageRate: this.newRates.damageRate,
          businessInterruptionRate: this.newRates.biRate,
          stockRate: this.newRates.stockRate,
          stockPercentaje:
            (this.accountComplete.tiv.premium.stockPercentaje ||
              this.accountComplete.tiv.insurable.porcentaje ||
              0) / 100,
        };

        const dates = {
          effetiveDate: new Date(this.accountComplete.deductibles.inceptionDate)
            .toISOString()
            .substring(0, 10),
          expiryDate: new Date(this.accountComplete.deductibles.expiryDate)
            .toISOString()
            .substring(0, 10),
          endormenteffetiveDate: new Date(this.effectiveDate),
          movementEndDate: new Date(this.expiryDateReal),
        };

        const results = await netPremiumInclusionRiskAutoCalcs(
          tiv,
          this.accountComplete.deductibles,
          this.accountComplete.tiv?.boundInsurableProp.sluLine,
          false,
          dates,
          options
        );

        console.log("results", results);

        this.totalPremium[0].premiumDamage =
          results.totalPremiumResult.damageTotalPremium;
        this.totalPremium[0].premiumBi =
          results.totalPremiumResult.biTotalPremium;
        this.totalPremium[0].premiumStocks =
          results.totalPremiumResult.stockTotalPremium;
        this.totalPremium[0].premiumTotal = results.totalPremiumResult.total;

        this.totalPremium[0].sluDamage = results.data.damagePremiumSlu;
        this.totalPremium[0].sluBi = results.data.biPremiumSlu;
        this.totalPremium[0].sluStocks = results.data.stocksPremiumSlu;
        this.totalPremium[0].sluTotal = results.data.totalPremiumSlu;

        // FIN CALCULOS 2

        this.cartera = {
          ...this.accountComplete.cartera,
          premiumPaymentDate: this.premiumPaymentDate,
          clause: this.clause,
        };
      }

      if (this.e1 === 3) {
        this.buttonTitle = 'Finalize'
        this.buttonTitleBack = 'Return';
        //INICIO CALCULOS 3
        this.loadingDocument = true;

        const options = {
          isEdited: {
            premiumDamage: false,
            premiumBi: false,
            premiumStocks: false,
          },
        };

        const tiv = {
          propertyDamageMovement:
            this.accountComplete.tiv.insurable.propertyDamage,
          businessInterruptionMovement:
            this.accountComplete.tiv.insurable.businessInterruption,
          stockMovement: this.accountComplete.tiv.insurable.stock,

          propertyDamageRate: this.newRates.damageRate,
          businessInterruptionRate: this.newRates.biRate,
          stockRate: this.newRates.stockRate,
          stockPercentaje:
            (this.accountComplete.tiv.premium.stockPercentaje ||
              this.accountComplete.tiv.insurable.porcentaje ||
              0) / 100,
        };

        const dates = {
          effetiveDate: new Date(this.accountComplete.deductibles.inceptionDate)
            .toISOString()
            .substring(0, 10),
          expiryDate: new Date(this.accountComplete.deductibles.expiryDate)
            .toISOString()
            .substring(0, 10),
          endormenteffetiveDate: new Date(this.effectiveDate),
          movementEndDate: new Date(this.expiryDateReal),
        };

        const results = await netPremiumInclusionRiskAutoCalcs(
          tiv,
          this.internalAdjustments.deductibles,
          this.accountComplete.tiv?.boundInsurableProp.sluLine,
          false,
          dates,
          options
        );

        const resultsUSD = await netPremiumInclusionRiskAutoCalcs(
          tiv,
          this.internalAdjustments.deductibles,
          this.accountComplete.tiv?.boundInsurableProp.sluLine,
          true,
          dates,
          options
        );

        // FIN CALCULOS 3

        this.endorsmentReporData = {
          cartera: {
            ...this.accountComplete.cartera,
            premiumPaymentDate: this.premiumPaymentDate,
            clausula: this.clause,
          },
          totalValues: {
            damage: this.accountComplete.tiv.insurable.propertyDamage,
            bi: this.accountComplete.tiv.insurable.businessInterruption,
            stocks: this.accountComplete.tiv.insurable.stock,
            total: this.accountComplete.tiv.insurable.total,
            damageUsd: this.accountComplete.tiv.insurable.propertyDamageUsd,
            biUsd: this.accountComplete.tiv.insurable.businessInterruptionUsd,
            stocksUsd: this.accountComplete.tiv.insurable.stockUsd,
            totalUsd: this.accountComplete.tiv.insurable.totalUsd,
          },
          movementValues: {
            bi: 0,
            biUsd: 0,
            damage: 0,
            damageUsd: 0,
            stocks: 0,
            stocksUsd: 0,
            total: 0,
            totalUsd: 0,
          },
          premium: {
            propertyDamageRate: this.newRates.damageRate,
            businessInterruptionRate: this.newRates.biRate,
            stockRate: this.newRates.stockRate,
            stockPercentaje:
              (this.accountComplete.tiv.premium.stockPercentaje ||
                this.accountComplete.tiv.insurable.porcentaje ||
                0) / 100,
            propertyDamage: this.totalPremium[0].premiumDamage,
            businessInterruption: this.totalPremium[0].premiumBi,
            stock: this.totalPremium[0].premiumStocks,
            total: this.totalPremium[0].premiumTotal,
            totalInsured: this.totalPremium[0].premiumTotal,

            propertyDamageUsd:
              this.totalPremium[0].premiumDamage /
              this.accountComplete.deductibles.exchangeRate,

            businessInterruptionUsd:
              this.totalPremium[0].premiumBi /
              this.accountComplete.deductibles.exchangeRate,

            stockUsd:
              this.totalPremium[0].premiumStocks /
              this.accountComplete.deductibles.exchangeRate,

            totalUsd:
              this.totalPremium[0].premiumTotal /
              this.accountComplete.deductibles.exchangeRate,
          },
          boundInsurableProp: this.accountComplete.tiv?.boundInsurableProp,
          deductibles: this.accountComplete.deductibles,
          netPremium: {
            ...results.data,
            biSluShare: results.data.biPremiumSlu,
            damageSluShare: results.data.damagePremiumSlu,
            stocksSluShare: results.data.stocksPremiumSlu,
            sluShareTotal: results.data.totalPremiumSlu,
          },
          netPremiumUSD: {
            ...resultsUSD.data,
            biSluShare: resultsUSD.data.biPremiumSlu,
            damageSluShare: resultsUSD.data.damagePremiumSlu,
            stocksSluShare: resultsUSD.data.stocksPremiumSlu,
            sluShareTotal: resultsUSD.data.totalPremiumSlu,
          },
        };

        // Invoca el  servicio para generar el excel
        const fileLink = await EndorsementService.getEndorsmentReport({
          subscriptionId: this.subscriptionId,
          endorsmentType: 7,
          endorsmentReporData: this.endorsmentReporData,
        });

        const file = this.files.find((file) => file.fileId === 1);

        if (!fileLink) {
          file.error = true;
        } else {
          file.fileDownloadLink = fileLink;
          file.loaded = true;
          file.loading = false;
        }
        this.loadingDocument = false;
      }
    },
  },
};
</script>

<style lang="less" scoped>
@import "~@/assets/style/AccordionStyle.less";

.endorsement-title {
  font-weight: 800;
  font-size: 20px;
}

.endorsement-wrapper {
  width: 100%;
  height: auto;
  border-radius: 15px;
  background: white;
  box-shadow: 8px 8px 12px rgba(10, 63, 102, 0.15);
  margin-top: 28px;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-content: center;
  padding: 0 20px;

  @media (max-width: 650px) {
    overflow-x: auto !important;
  }

  //CABEZA DE LA TABLA

  .content {
    width: 100%;
    height: auto;
    padding-top: 10px;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    align-content: flex-start;
    flex-wrap: wrap;
    padding-bottom: 10px;

    .button-cont {
      width: 100%;
      height: auto;
      margin-top: 20;
      display: flex;
      justify-content: flex-end;
      align-items: center;

      .blue-btn {
        color: white;
        width: 200px;
        height: 35px;
        background: #003d6d;
        font-size: 15px;
        font-weight: 500;
        letter-spacing: normal;
        text-transform: capitalize;
      }

      .clear-btn {
        width: 200px;
        height: 35px;
      }
    }
  }

  .v-btn {
    justify-content: flex-start !important;
    color: #003d6d;
  }
}

.table-container {
  margin-top: 30px;
}

.title-col {
  width: 10%;
}

.table-col {
  width: 40%;

  .inner-col {
    width: 50%;
  }
}

.table-title {
  height: 50px;
  color: white;
  font-weight: 800;
  background-color: #547fa9;
  border-radius: 6px;
  margin: 2px;
  font-size: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.table-title-space {
  height: 54px;
}

.table-subtitle {
  height: 60px;
  font-weight: 800;
}

.stepper-btn {
  width: 100%;
  height: 40px;

  .blue-btn {
    color: white;
    width: 200px;
    height: 35px;
    background: #003d6d;
    font-size: 15px;
    font-weight: 500;
    letter-spacing: normal;
    text-transform: capitalize;
  }

  .clear-btn {
    width: 200px;
    height: 35px;
  }
}

.v-stepper__items {
  width: 100%;
}

.head-items-cont {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.col-subtitle {
  min-height: 40px;
  font-weight: 800;
  display: flex;
  align-items: center;
}

.table-input {
  min-height: 40px;
  padding: 0 10px;
  display: flex;
  align-items: center;
}

.blue-input {
  background-color: #dce5fc;
}

.column-title {
  font-size: 16px;
  font-weight: 800;
  margin: 15px 0;
}

.input-row {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-content: center;
  align-items: flex-start;
  justify-content: flex-start;
}

.input-col {
  width: 20%;
  display: block;
  margin-right: 30px;
}

.input-cont {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  align-content: center;
  margin: 5px 0;
}

.input-title {
  width: 100%;
}

.inner-title {
  width: 100%;
  font-size: 20px;
  font-weight: 800;
  margin: 15px 0;
}

.column-title {
  font-size: 16px;
  font-weight: 800;
}

.v-sheet.v-stepper:not(.v-sheet--outlined) {
  box-shadow: none !important;
}

.v-stepper__step__step {
  display: none !important;
}

.v-stepper__label {
  color: #547fa9;
  font-weight: 800;
}

.v-application .primary {
  background-color: #586675 !important;
  border-color: #1c2b39 !important;
}

.theme--light.v-stepper
  .v-stepper__step:not(.v-stepper__step--active):not(
    .v-stepper__step--complete
  ):not(.v-stepper__step--error)
  .v-stepper__step__step {
  background: rgb(186, 34, 34);
}

.v-stepper__header {
  justify-content: center;
  box-shadow: none;
}

.theme--light.v-stepper {
  background: #ffe9e900;
}

.error-message {
  font-size: 12px;
  color: red;
  max-width: 200px;
  transform: translateY(-14px);
}

.editAccount {
  width: auto;
  color: #f59607;
  font-weight: 600;
  font-size: 19px;
}
.table-title-detail {
  &--large {
    width: 100%;
  }
  width: 100%;
  font-weight: 800;
  font-size: 16px;
  line-height: 110%;
  height: 50px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 0px 5px;
}

.detail-date {
  width: 91%;
  height: auto;
  margin: auto;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding: 50px 0 20px;
}

.wide-col {
  width: 100% !important;
}
</style>
