<!-- TEMPLATE MEJORADO PARA CHANGE OF PERIOD ENGINEERING -->
<template>
  <div class="outter-wrapper" ref="targetRef">
    <div class="endorsement-title">Change of period</div>
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
              <div class="endorsement-main-container">
                <div class="endorsement-form-section">
                  <div class="inner-title">Endorsement</div>

                  <!-- Endorsement effective date -->
                  <div class="input-row w-100 mb-4">
                    <div class="input-col-full">
                      <div class="input-cont">
                        <v-menu
                          v-model="menu2"
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
                            @input="menu2 = false"
                            @change="onEffectiveDateChange"
                          ></v-date-picker>
                        </v-menu>
                        <div v-if="effectiveDateError" class="error-message">
                          Please select a valid endorsement effective date.
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Current dates row -->
                  <div class="input-row w-100 mb-4">
                    <div class="input-col">
                      <div class="input-cont">
                        <v-text-field
                          :value="currentInceptionDateFormatted"
                          label="Current Inception date"
                          readonly
                          disabled
                        ></v-text-field>
                      </div>
                    </div>
                    <div class="input-col">
                      <div class="input-cont">
                        <v-text-field
                          :value="currentExpiryDateFormatted"
                          label="Current Expiry date"
                          readonly
                          disabled
                        ></v-text-field>
                      </div>
                    </div>
                    <div class="input-col-days">
                      <div class="input-cont">
                        <v-text-field
                          :value="currentPolicyDays"
                          label="Days"
                          readonly
                          disabled
                        ></v-text-field>
                      </div>
                    </div>
                  </div>

                  <!-- New dates row -->
                  <div class="input-row w-100 mb-4">
                    <div class="input-col">
                      <div class="input-cont">
                        <v-menu
                          v-model="menuControllStepOne.inceptionDate"
                          :close-on-content-click="false"
                          :nudge-right="40"
                          transition="scale-transition"
                          offset-y
                          min-width="auto"
                        >
                          <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                              v-model="inceptionDate"
                              label="New Inception date"
                              readonly
                              v-bind="attrs"
                              v-on="on"
                            ></v-text-field>
                          </template>
                          <v-date-picker
                            v-model="inceptionDate"
                            @input="menuControllStepOne.inceptionDate = false"
                            @change="validateInceptionDate"
                          ></v-date-picker>
                        </v-menu>
                        <div v-if="inceptionDateError" class="error-message">
                          Inception date must be before expiry date.
                        </div>
                      </div>
                    </div>
                    <div class="input-col">
                      <div class="input-cont">
                        <v-menu
                          v-model="menu"
                          :close-on-content-click="false"
                          :nudge-right="40"
                          transition="scale-transition"
                          offset-y
                          min-width="auto"
                        >
                          <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                              v-model="movementEndDate"
                              label="New Expiry date"
                              readonly
                              v-bind="attrs"
                              v-on="on"
                            ></v-text-field>
                          </template>
                          <v-date-picker
                            v-model="movementEndDate"
                            @input="menu = false"
                            @change="validateExpiryDate"
                          ></v-date-picker>
                        </v-menu>
                        <div v-if="endDateError" class="error-message">
                          Expiry date must be after endorsement effective date.
                        </div>
                      </div>
                    </div>
                    <div class="input-col-days">
                      <InputDaysDiference
                        :endorsementDate="effectiveDate"
                        :expiryDate="movementEndDate"
                        :key="effectiveDate + movementEndDate"
                      />
                    </div>
                  </div>

                  <!-- Additional section -->
                  <div class="mb-4" v-if="showInfoEndorsement">
                    <div class="inner-title">Additional</div>
                    <div class="input-row w-100">
                      <div class="input-col">
                        <div class="input-cont">
                          <v-select
                            v-model="clause"
                            label="Clause"
                            item-value="clause"
                            item-text="clause"
                            :items="clauseList"
                          />
                        </div>
                      </div>
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
                                label="Premium payment warranty"
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
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </v-stepper-content>

            <!-- STEP 2 mejorado con Details arriba -->
            <v-stepper-content step="2">
              <!--Details -->
              <div class="details-container">
                <h3 class="">Details</h3>

                <div class="details-input-container d-flex flex-wrap">
                  <div class="input-col-details">
                    <div class="input-cont">
                      <v-text-field
                        v-model="effectiveDate"
                        label="Endorsement effective date"
                        readonly
                        disabled
                      ></v-text-field>
                    </div>
                  </div>

                  <div class="input-col-details">
                    <div class="input-cont">
                      <v-text-field
                        v-model="inceptionDate"
                        label="Inception date"
                        readonly
                        disabled
                      ></v-text-field>
                    </div>
                  </div>

                  <div class="input-col-details">
                    <div class="input-cont">
                      <v-text-field
                        v-model="movementEndDate"
                        label="Expiry date"
                        readonly
                        disabled
                      ></v-text-field>
                    </div>
                  </div>

                  <div class="input-col-details">
                    <div class="input-cont">
                      <v-text-field
                        v-model="premiumPaymentDate"
                        label="Premium payment Date"
                        readonly
                        disabled
                      ></v-text-field>
                    </div>
                  </div>
                </div>
                <div class="input-col">
                  <div class="input-cont-lg">
                    <v-select
                      v-model="clause"
                      label="Clause"
                      item-value="clause"
                      item-text="clause"
                      :items="clauseList"
                      disabled
                    />
                  </div>
                </div>
              </div>

              <!-- TABLA mejorada -->
              <div class="table-container input-row justify-center">
                <div class="table-title-space"></div>
                <div class="title-col">
                  <div class="col-subtitle">Total Premium Moment</div>
                  <div class="col-subtitle">Premium SLU</div>
                  <div class="col-subtitle">Net Premium</div>
                  <div class="col-subtitle mt-4">Total</div>
                </div>

                <div class="table-col">
                  <div class="table-title">Original Currency</div>
                  <div class="input-row mt-4">
                    <div class="inner-col">
                      <div class="table-input blue-input">
                        ${{
                          formatCurrency(
                            originalValues.lastInformation.totalPremiumMovement
                          )
                        }}
                      </div>
                      <div class="table-input blue-input">
                        ${{
                          formatCurrency(
                            originalValues.lastInformation.PremiumSlu
                          )
                        }}
                      </div>
                      <div class="table-input blue-input">
                        ${{
                          formatCurrency(
                            originalValues.lastInformation.netPremium
                          )
                        }}
                      </div>
                      <div class="table-input mt-4">
                        ${{
                          formatCurrency(originalValues.lastInformation.total)
                        }}
                      </div>
                    </div>

                    <div class="inner-col">
                      <div class="table-input blue-input">
                        ${{
                          formatCurrency(
                            originalValues.newInformation.totalPremiumMovement
                          )
                        }}
                      </div>
                      <div class="table-input blue-input">
                        ${{
                          formatCurrency(
                            originalValues.newInformation.PremiumSlu
                          )
                        }}
                      </div>
                      <div class="table-input blue-input">
                        ${{
                          formatCurrency(
                            originalValues.newInformation.netPremium
                          )
                        }}
                      </div>
                      <div class="table-input mt-4">
                        ${{
                          formatCurrency(originalValues.newInformation.total)
                        }}
                      </div>
                    </div>
                  </div>
                </div>

                <div class="table-col">
                  <div class="table-title">USD</div>
                  <div class="input-row mt-4">
                    <div class="inner-col">
                      <div class="table-input blue-input">
                        ${{
                          formatCurrency(
                            usdValues.lastInformation.totalPremiumMovement
                          )
                        }}
                      </div>
                      <div class="table-input blue-input">
                        ${{
                          formatCurrency(usdValues.lastInformation.PremiumSlu)
                        }}
                      </div>
                      <div class="table-input blue-input">
                        ${{
                          formatCurrency(usdValues.lastInformation.netPremium)
                        }}
                      </div>
                      <div class="table-input mt-4">
                        ${{ formatCurrency(usdValues.lastInformation.total) }}
                      </div>
                    </div>

                    <div class="inner-col">
                      <div class="table-input blue-input">
                        ${{
                          formatCurrency(
                            usdValues.newInformation.totalPremiumMovement
                          )
                        }}
                      </div>
                      <div class="table-input blue-input">
                        ${{
                          formatCurrency(usdValues.newInformation.PremiumSlu)
                        }}
                      </div>
                      <div class="table-input blue-input">
                        ${{
                          formatCurrency(usdValues.newInformation.netPremium)
                        }}
                      </div>
                      <div class="table-input mt-4">
                        ${{ formatCurrency(usdValues.newInformation.total) }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </v-stepper-content>

            <v-stepper-content step="3">
              <div class="inner-title">Endorsement Report</div>
              <div
                v-if="cleanReport && cleanReport.endorsmentReporData"
                class="report-complete"
              >
                <EndorsementReportCompleteTable :report="cleanReport" />
              </div>
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

      <EndorsementDocuments
        ref="endorsementDocs"
        :idEndorsement="createdEndorsementId"
        :endorsementDocuments="endorsementDocuments"
        @setEndorsementDocuments="setEndorsementDocuments"
        v-show="e1 == 1 || e1 == 3"
      />

      <div class="stepper-btn mt-7 mb-3 d-flex justify-end align-center">
        <v-btn
          :outlined="e1 == 3 ? false : true"
          rounded
          large
          :text="e1 == 3 ? true : false"
          :class="e1 == 3 ? 'blue-btn' : 'clear-btn'"
          :color="e1 == 3 ? 'none' : '#003D6D'"
          @click="goNext(e1)"
          :disabled="validationFirstStep"
        >
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
import EndorsementReportCompleteTable from "./EndorsementReportCompleteTable.vue";

/* services */
import { getFiles } from "../../services/mock-files.service";
import PaymentService from "@/modules/home/services/payments.service";
import EndorsementDocuments from "../../components/EndorsementDocuments.vue";
import netPremiumEngLast from "../services/netpremium.service";
import {
  netPremiumInclusionRiskEng,
  netPremiumInclusionRiskAutoCalcs,
} from "../class/netPremiumInclusionRiskEng";
import EndorsementService from "../../services/endorsement.service";
import AccountCompleteService from "@/modules/home/services/account-complete.service";
import { formatCurrency, unFormatCurrency } from "../../utils";

/* libs */
import Decimal from "@/lib/decimal";

export default {
  name: "ChangeOfPeriod",
  components: {
    AppFile,
    CurrencyInput,
    DocumentsEndorsement,
    InputDaysDiference,
    EndorsementDocuments,
    EndorsementReportCompleteTable,
  },
  props: {
    type: { type: String, default: "Change of Period" },
    backToCreateEndorsement: { type: Function },
    accountComplete: { type: Object },
    changeDateEndorsement: { type: Function },
    dateSaved: { type: String },
    showInfoEndorsement: { type: Boolean },
  },
  data() {
    return {
      subscriptionId: this.$route.params.id,
      e1: 1,
      menu: false,
      menu2: false,
      effectiveDate: this.dateSaved,
      endorsementEffectiveDate: this.dateSaved,
      premiumPaymentDate: new Date().toISOString().substr(0, 10),
      movementEndDate: "",
      inceptionDate: "",

      // Errores de validación
      effectiveDateError: false,
      endDateError: false,
      inceptionDateError: false,

      // Menús de control
      menuControllStepOne: {
        movementEndDate: false,
        endorsementEffectiveDate: false,
        inceptionDate: false,
        premiumPaymentDate: false,
      },
      menuControllStepTwo: {
        movementEndDate: false,
        endorsementEffectiveDate: false,
        inceptionDate: false,
        premiumPaymentDate: false,
        clause: false,
      },

      files: [
        {
          fileId: 1,
          fileName: "Report Change of Period",
          fileDownloadLink: "",
          loaded: false,
          error: false,
          errorMessage: "Could not load the file",
          loading: true,
          fileType: "xlsx",
          fileTypeMessage: "Download",
        },
      ],
      clauseList: [],
      clause: this.accountComplete.cartera.clausula,
      endorsementDocuments: [],
      createdEndorsementId: 0,

      // Valores para las tablas
      originalValues: {
        lastInformation: {
          totalPremiumMovement: 0,
          PremiumSlu: 0,
          netPremium: 0,
          total: 0,
        },
        newInformation: {
          totalPremiumMovement: 0,
          PremiumSlu: 0,
          netPremium: 0,
          total: 0,
        },
      },
      usdValues: {
        lastInformation: {
          totalPremiumMovement: 0,
          PremiumSlu: 0,
          netPremium: 0,
          total: 0,
        },
        newInformation: {
          totalPremiumMovement: 0,
          PremiumSlu: 0,
          netPremium: 0,
          total: 0,
        },
      },
      buttonTitle: "Next",
      buttonTitleBack: "Cancel",
      cartera: {},
      endorsmentReporData: {},
    };
  },

  async beforeMount() {
    this.clauseList = await PaymentService.getClauses();
  },

  mounted() {
    this.initializeDates();
  },

  computed: {
    cleanReport() {
      if (
        !this.endorsmentReporData ||
        Object.keys(this.endorsmentReporData).length === 0
      ) {
        return {};
      }

      const carteraData = {
        premiumPaymentDate:
          this.cartera?.premiumPaymentDate || this.premiumPaymentDate,
        clausula: this.cartera?.clausula || this.clause,
        ...(this.cartera || {}),
      };

      return {
        endorsmentReporData: this.endorsmentReporData,
        cartera: carteraData,
      };
    },
    // Fechas actuales formateadas
    currentInceptionDateFormatted() {
      if (!this.accountComplete?.deductibles?.inceptionDate) return "";
      return new Date(
        this.accountComplete.deductibles.inceptionDate
      ).toLocaleDateString("en-US");
    },

    currentExpiryDateFormatted() {
      if (!this.accountComplete?.deductibles?.expiryDate) return "";
      return new Date(
        this.accountComplete.deductibles.expiryDate
      ).toLocaleDateString("en-US");
    },

    // Días de la póliza actual
    currentPolicyDays() {
      if (
        !this.accountComplete?.deductibles?.inceptionDate ||
        !this.accountComplete?.deductibles?.expiryDate
      )
        return 0;

      const start = new Date(this.accountComplete.deductibles.inceptionDate);
      const end = new Date(this.accountComplete.deductibles.expiryDate);
      return Math.round((end - start) / (1000 * 60 * 60 * 24));
    },

    // Validación del primer paso
    validationFirstStep() {
      const showInfoEndorsement = this.showInfoEndorsement;
      const clause = Boolean(this.clause);
      const hasValidDates =
        this.effectiveDate && this.inceptionDate && this.movementEndDate;
      const noDateErrors =
        !this.effectiveDateError &&
        !this.endDateError &&
        !this.inceptionDateError;

      return !(showInfoEndorsement && clause && hasValidDates && noDateErrors);
    },
  },

  watch: {
    e1: async function () {
      if (this.e1 === 1) {
        this.buttonTitle = "Next";
        this.buttonTitleBack = "Cancel";
      }
      if (this.e1 === 2) {
        this.buttonTitle = "Next";
        this.buttonTitleBack = "Return";
        this.calcPremium();
        this.calcPremiumLastInformation();
      }
      if (this.e1 === 3) {
        this.buttonTitle = "Finalize";
        this.buttonTitleBack = "Return";
        this.getExcel();
      }
    },
  },

  methods: {
    // Inicialización de fechas
    initializeDates() {
      if (!this.accountComplete?.deductibles) return;

      const currentInception = this.accountComplete.deductibles.inceptionDate;
      const currentExpiry = this.accountComplete.deductibles.expiryDate;

      // Por defecto, las nuevas fechas son iguales a las actuales
      this.inceptionDate = new Date(currentInception)
        .toISOString()
        .substr(0, 10);
      this.movementEndDate = new Date(currentExpiry)
        .toISOString()
        .substr(0, 10);

      // La fecha efectiva del endoso viene del dateSaved
      if (this.dateSaved) {
        this.effectiveDate = this.dateSaved;
        this.endorsementEffectiveDate = this.dateSaved;
      }
    },

    // Formateo de moneda
    formatCurrency(amount) {
      return formatCurrency(amount);
    },

    unFormatCurrency(strAmount) {
      return unFormatCurrency(strAmount);
    },

    toUsd(value) {
      const exchangeRate = this.accountComplete.deductibles.exchangeRate;
      return Decimal.div(value, exchangeRate).toNumber();
    },

    // Validaciones de fechas
    async onEffectiveDateChange() {
      this.menu2 = false;
      this.validateAllDates();
      await this.changeDateEndorsement(this.effectiveDate);
    },

    validateInceptionDate() {
      this.validateAllDates();
    },

    validateExpiryDate() {
      this.validateAllDates();
    },

    validateAllDates() {
      const endorsementDate = Date.parse(this.effectiveDate);
      const inceptionDate = Date.parse(this.inceptionDate);
      const expiryDate = Date.parse(this.movementEndDate);

      // Reset errors
      this.effectiveDateError = false;
      this.endDateError = false;
      this.inceptionDateError = false;

      // Validaciones lógicas
      if (!this.effectiveDate) {
        this.effectiveDateError = true;
      }

      if (endorsementDate >= expiryDate) {
        this.effectiveDateError = true;
      }

      if (inceptionDate >= expiryDate) {
        this.inceptionDateError = true;
      }

      if (expiryDate <= endorsementDate) {
        this.endDateError = true;
      }

      return (
        !this.effectiveDateError &&
        !this.endDateError &&
        !this.inceptionDateError
      );
    },

    // Cálculos de primas
    calcPremium() {
      const tiv = this.accountComplete.tiv;
      const tivMovement = {
        allRisk: tiv.insurable.allRisk,
        alop: tiv.insurable.alop,
        allRiskRate: tiv.premium.allRiskRate,
        alopRate: tiv.premium.alopRate,
      };

      const dates = {
        effetiveDate: new Date(this.accountComplete.deductibles.inceptionDate)
          .toISOString()
          .substring(0, 10),
        expiryDate: new Date(this.accountComplete.deductibles.expiryDate)
          .toISOString()
          .substring(0, 10),
        endormenteffetiveDate: new Date(this.effectiveDate),
        movementEndDate: new Date(this.movementEndDate),
      };

      const calcTotalPremium = new netPremiumInclusionRiskEng(
        tivMovement,
        this.accountComplete.deductibles,
        this.accountComplete.tiv?.boundInsurableProp.sluLine,
        false,
        dates
      );

      const totalPremiumResult = calcTotalPremium.calculateTotalPremium();
      const newTotalPremiumMovement = totalPremiumResult.total;
      const newPremiumSlu = calcTotalPremium.totalPremiumSlu();
      const newNetPremium = this.unFormatCurrency(
        calcTotalPremium.netSLUExcludingSurveyFeesTotal()
      );

      this.originalValues.newInformation.totalPremiumMovement =
        newTotalPremiumMovement;
      this.originalValues.newInformation.PremiumSlu = newPremiumSlu;
      this.originalValues.newInformation.netPremium = newNetPremium;
      this.originalValues.newInformation.total =
        newTotalPremiumMovement + newPremiumSlu + newNetPremium;

      this.usdValues.newInformation.totalPremiumMovement = this.toUsd(
        newTotalPremiumMovement
      );
      this.usdValues.newInformation.PremiumSlu = this.toUsd(newPremiumSlu);
      this.usdValues.newInformation.netPremium = this.toUsd(newNetPremium);
      this.usdValues.newInformation.total = this.toUsd(
        this.originalValues.newInformation.total
      );
    },

    async calcPremiumLastInformation() {
      const tiv = this.accountComplete.tiv;
      const premiumAllRisk =
        (tiv.insurable.allRisk * tiv.premium.allRiskRate) / 1000;
      const premiumAlop = (tiv.insurable.alop * tiv.premium.alopRate) / 1000;

      const calcNetPremium = await netPremiumEngLast(
        {
          allRisk: premiumAllRisk,
          allRiskUsd: this.toUsd(premiumAllRisk),
          alop: premiumAlop,
          alopUsd: this.toUsd(premiumAlop),
        },
        this.accountComplete.deductibles,
        this.accountComplete.tiv?.boundInsurableProp.sluLine
      );

      const newTotalPremiumMovement = premiumAllRisk + premiumAlop;
      const newPremiumSlu = calcNetPremium.data.sluShareTotal;
      const newNetPremium = calcNetPremium.data.netSLUExcludingSurveyFeesTotal;

      this.originalValues.lastInformation.totalPremiumMovement =
        newTotalPremiumMovement;
      this.originalValues.lastInformation.PremiumSlu = newPremiumSlu;
      this.originalValues.lastInformation.netPremium = newNetPremium;
      this.originalValues.lastInformation.total =
        newTotalPremiumMovement + newPremiumSlu + newNetPremium;

      this.usdValues.lastInformation.totalPremiumMovement = this.toUsd(
        newTotalPremiumMovement
      );
      this.usdValues.lastInformation.PremiumSlu = this.toUsd(newPremiumSlu);
      this.usdValues.lastInformation.netPremium = this.toUsd(newNetPremium);
      this.usdValues.lastInformation.total = this.toUsd(
        this.originalValues.lastInformation.total
      );
    },

    // Otros métodos existentes...
    setEndorsementDocuments({ files }) {
      this.endorsementDocuments = Array.isArray(files) ? [...files] : [];
    },

    async getExcel() {
      const tiv = this.accountComplete.tiv;
      const tivMovement = {
        allRisk: tiv.insurable.allRisk,
        alop: tiv.insurable.alop,
        allRiskRate: tiv.premium.allRiskRate,
        alopRate: tiv.premium.alopRate,
      };

      const dates = {
        effetiveDate: new Date(this.accountComplete.deductibles.inceptionDate)
          .toISOString()
          .substring(0, 10),
        expiryDate: new Date(this.accountComplete.deductibles.expiryDate)
          .toISOString()
          .substring(0, 10),
        endormenteffetiveDate: new Date(this.effectiveDate),
        movementEndDate: new Date(this.movementEndDate),
      };

      const resultOriginalCurenncy = await netPremiumInclusionRiskAutoCalcs(
        tivMovement,
        this.accountComplete.deductibles,
        this.accountComplete.tiv?.boundInsurableProp.sluLine,
        false,
        dates
      );

      const resultUSD = await netPremiumInclusionRiskAutoCalcs(
        tivMovement,
        this.accountComplete.deductibles,
        this.accountComplete.tiv?.boundInsurableProp.sluLine,
        true,
        dates
      );

      // Obteniendo premium payment date
      const premiumPaymentDate = new Date(
        this.premiumPaymentDate
      ).toISOString();
      const clause = this.clause;

      // Guardando los datos de cartera nuevos
      this.cartera = {
        premiumPaymentDate,
        clausula: clause,
      };

      // Creación del objeto a insertar
      const endorsmentReporData = {
        cartera: this.cartera,
        totalValues: {
          allRisk: tiv.insurable.allRisk,
          alop: tiv.insurable.alop,
          total: tiv.insurable.total,
          allRiskUsd: tiv.insurable.allRiskUsd,
          alopUsd: tiv.insurable.alopUsd,
          totalUsd: tiv.insurable.totalUsd,
        },
        movementValues: {
          allRisk: 0,
          alop: 0,
          total: 0,
          allRiskUsd: 0,
          alopUsd: 0,
          totalUsd: 0,
        },
        premium: {
          ...this.accountComplete.tiv.premium,
          allRisk: resultOriginalCurenncy.totalPremium.allRiskTotalPremium,
          alop: resultOriginalCurenncy.totalPremium.alopTotalPremium,
          totalInsured: resultOriginalCurenncy.totalPremium.total,
          allRiskRate: this.accountComplete.tiv.premium.allRiskRate,
          alopRate: this.accountComplete.tiv.premium.alopRate,
          allRiskUsd:
            resultOriginalCurenncy.totalPremium.allRiskTotalPremiumUsd,
          alopUsd: resultOriginalCurenncy.totalPremium.alopTotalPremiumUsd,
          totalUsd: resultOriginalCurenncy.totalPremium.totalUsd,
        },
        boundInsurableProp: this.accountComplete.tiv?.boundInsurableProp,
        deductibles: {
          ...this.accountComplete.deductibles,
          expiryDate: this.movementEndDate,
          inceptionDate: this.inceptionDate,
        },
        netPremium: {
          ...resultOriginalCurenncy.data,
          allRiskSluShare: resultOriginalCurenncy.data.allRiskPremiumSlu,
          alopSluShare: resultOriginalCurenncy.data.alopPremiumSlu,
          sluShareTotal: resultOriginalCurenncy.data.totalPremiumSlu,
        },
        netPremiumUSD: {
          ...resultUSD.data,
          allRiskSluShare: resultUSD.data.allRiskPremiumSlu,
          alopSluShare: resultUSD.data.alopPremiumSlu,
          sluShareTotal: resultUSD.data.totalPremiumSlu,
        },
      };

      this.endorsmentReporData = endorsmentReporData;

      try {
        // Invoca el servicio para generar el excel
        const fileLink = await EndorsementService.getEndorsmentReport({
          subscriptionId: this.subscriptionId,
          endorsmentType: 8,
          endorsmentReporData,
        });

        const file = this.files.find((file) => file.fileId === 1);
        if (!fileLink) {
          file.error = true;
        } else {
          file.fileDownloadLink = fileLink;
          file.loaded = true;
          file.loading = false;
        }
      } catch (error) {
        console.log(error);
        const file = this.files.find((file) => file.fileId === 1);
        file.error = true;
        file.loading = false;
      }
    },

    async submit() {
      this.e1 = 1;

      // Obteniendo el insurable
      const tiv = this.accountComplete.tiv;

      // actualizando tiv.insurable de account complete
      const tivUpdate = {
        insurable: {
          allRisk: tiv.insurable.allRisk,
          alop: tiv.insurable.alop,
          total: tiv.insurable.total,
          allRiskUsd: tiv.insurable.allRiskUsd,
          alopUsd: tiv.insurable.alopUsd,
          totalUsd: tiv.insurable.totalUsd,
        },
        premium: {
          allRiskRate: tiv.premium.allRiskRate,
          alopRate: tiv.premium.alopRate,
        },
        boundInsurableProp: tiv?.boundInsurableProp,
      };

      // guardar la cuenta actualizada en BD
      const accountCompleteResponse =
        await AccountCompleteService.addAccountComplete(this.subscriptionId, {
          ...this.accountComplete,
          deductibles: {
            ...this.accountComplete.deductibles,
            expiryDate: this.movementEndDate,
            inceptionDate: this.inceptionDate,
          },
          tiv: tivUpdate,
          netPremium: {
            originalValues: {
              netSluExcludingSurveyFeesTotal:
                this.accountComplete.net_premium.originalValues
                  .netSluExcludingSurveyFeesTotal,
            },
          },
          cartera: {
            ...this.accountComplete.cartera,
            ...this.cartera,
          },
        });

      //guardar registro del endoso
      const endorsementResponse = await EndorsementService.addEndorsment({
        subscriptionId: this.subscriptionId,
        endorsmentType: 8,
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
          },
        },
      });
      if (endorsementResponse?.id) {
        this.createdEndorsementId = endorsementResponse.id;
        if (this.endorsementDocuments.length) {
          await this.$nextTick();
          await this.$refs.endorsementDocs.uploadPendingFiles();
        }
      }

      await this.backToCreateEndorsement();
      this.createdEndorsementId = 0;
      this.endorsementDocuments = [];
    },

    goNext(e1) {
      this.$refs.targetRef.scrollIntoView({ behavior: "smooth" });
      if (e1 == 1) {
        if (this.validateAllDates()) {
          this.e1 = 2;
        }
      } else if (e1 == 2) {
        this.e1 = 3;
      } else if (e1 == 3) {
        this.submit();
      }
    },

    goBack(e1) {
      this.$refs.targetRef.scrollIntoView({ behavior: "smooth" });
      if (e1 == 1) {
        this.backToCreateEndorsement();
      } else if (e1 == 2) {
        this.e1 = 1;
      } else if (e1 == 3) {
        this.e1 = 2;
      }
    },

    // Métodos de manejo de archivos y documentos
    async removeFileById({ id }) {
      console.log("remove file");
    },

    async loadingFile({ data }) {
      console.log("loading file");
    },

    async updateFile(data) {
      console.log("update file");
    },
  },
};
</script>
<style lang="less" scoped>
.endorsement-title {
  font-weight: 800;
  font-size: 20px;
}
.endorsement-wrapper {
  width: 100%;
  height: auto;
  border-radius: 5px;
  background: white;
  //box-shadow: 8px 8px 12px rgba(10, 63, 102, 0.15);
  margin-top: 28px;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-content: center;
  padding: 0 20px;
  @media (max-width: 650px) {
    overflow-x: auto !important;
  }
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
  }
  .v-btn {
    justify-content: flex-start !important;
    color: #003d6d;
    border-radius: 5px;
  }
}
.table-container {
  margin-top: 30px;
  .title-col {
    width: 10%;
  }
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
  border-radius: 0px;
  margin: 2px;
  font-size: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.table-title-space {
  height: 50px;
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
.input-row {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-content: center;
  align-items: flex-end;
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

.v-stepper__items {
  width: 100%;
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
.endorsement-main-container {
  display: flex;
  gap: 30px;
  width: 100%;
}

.endorsement-form-section {
  flex: 2;
}

.input-col-full {
  width: 100%;
  max-width: 350px;
}

.input-col-days {
  width: 15%;
  min-width: 120px;
}

.details-container {
  width: 100%;
  height: auto;
  padding-top: 10px;
  padding-bottom: 10px;
  margin-left: 5%;
  margin-top: 44px;
}

.details-input-container {
  justify-content: center;
  align-items: center;
}

.input-col-details {
  flex-grow: 1;
  margin-inline-end: 20px;
}

.input-cont-lg {
  width: 40%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  align-content: center;
  margin: 5px 0;
}
.report-complete {
  overflow: auto;
}
</style>
