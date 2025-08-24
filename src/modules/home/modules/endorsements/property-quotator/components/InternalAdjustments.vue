<template>
  <div class="outter-wrapper" ref="targetRef">
    <div class="endorsement-title">Internal Adjustments</div>
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
              <!-- Selecciones iniciales -->
              <div class="input-row w-50 d-flex flex-wrap">
                <div class="input-col">
                  <div class="input-cont">
                    <v-autocomplete
                      label="Type of internal adjustment"
                      v-model="selectedInternalAdjustment"
                      :items="typeOfInternalAdjustment"
                    />
                  </div>
                </div>

                <div class="input-col">
                  <div class="input-cont">
                    <v-autocomplete
                      label="Apply to"
                      v-model="endorsementToModify"
                      :items="listEndorsement"
                      item-value="EndorsementType.id"
                      item-text="EndorsementType.type"
                    />
                  </div>
                </div>
              </div>

              <!-- Fechas (como la hoja) -->
              <div class="inner-title">Endorsement</div>

              <!-- Fila 1: Inception / Expiry (solo lectura) -->
              <div class="input-row w-50 d-flex flex-wrap">
                <div class="input-col">
                  <div class="input-cont">
                    <v-text-field
                      v-model="inceptionDate"
                      label="Inception date"
                      readonly
                      disabled
                    />
                  </div>
                </div>
                <div class="input-col">
                  <div class="input-cont">
                    <v-text-field
                      v-model="expiryDate"
                      label="Expiry date"
                      readonly
                      disabled
                    />
                  </div>
                </div>
              </div>

              <!-- Fila 2: Endorsement effective (editable) / Movement end date (readonly) + Days -->
              <div class="input-row w-50 d-flex flex-wrap">
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
                        />
                      </template>
                      <v-date-picker
                        v-model="effectiveDate"
                        @input="
                          menuControllStepOne.endorsementEffectiveDate = false
                        "
                        @change="
                          endorsementDateValidation($event, effectiveDate)
                        "
                      />
                    </v-menu>
                    <div v-if="endorsementDateError" class="error-message">
                      The Endorsement effective date must be earlier than the
                      Movement end date.
                    </div>
                  </div>
                </div>

                <div class="input-col">
                  <div class="input-cont">
                    <v-text-field
                      v-model="movementEndDate"
                      label="Movement end date"
                      readonly
                      disabled
                    />
                  </div>
                </div>

                <InputDaysDiference
                  :endorsementDate="effectiveDate"
                  :expiryDate="expiryDate"
                  :key="effectiveDate"
                />
              </div>

              <!-- Description -->
              <div class="input-row w-50 d-flex flex-wrap mt-4">
                <v-text-field
                  ref="desc"
                  v-model="description"
                  label="Description"
                  :rules="descriptionRules"
                  hide-details="auto"
                  clearable
                  required
                  counter="200"
                  :maxlength="200"
                />
              </div>

              <!-- Percentage -->
              <div class="input-row w-50 d-flex flex-wrap mt-6 block-as-table">
                <div class="endorsement-title">Percentage</div>

                <div class="input-row">
                  <!-- Columna 1 (Share, Brokerage, tax, Fronting) -->
                  <div class="input-col">
                    <div class="input-cont">
                      <v-text-field
                        v-model.number="internalAdjustments.newShare"
                        label="Share"
                        type="number"
                        suffix="%"
                        :rules="[(v) => (v >= 0 && v <= 100) || '0–100%']"
                      />
                    </div>
                    <div class="input-cont">
                      <v-text-field
                        v-model.number="
                          internalAdjustments.deductibles.brokerage
                        "
                        label="Brokerage"
                        type="number"
                        suffix="%"
                        :rules="[(v) => (v >= 0 && v <= 100) || '0–100%']"
                      />
                    </div>
                    <div class="input-cont">
                      <v-text-field
                        v-model.number="internalAdjustments.deductibles.taxes"
                        label="tax"
                        type="number"
                        suffix="%"
                        :rules="[(v) => (v >= 0 && v <= 100) || '0–100%']"
                      />
                    </div>
                    <div class="input-cont">
                      <v-text-field
                        v-model.number="
                          internalAdjustments.deductibles.fronting
                        "
                        label="Fronting"
                        type="number"
                        suffix="%"
                        :rules="[(v) => (v >= 0 && v <= 100) || '0–100%']"
                      />
                    </div>
                  </div>

                  <!-- Columna 2 (ENG fee, Reserve, LTA, Others) -->
                  <div class="input-col">
                    <div class="input-cont">
                      <v-text-field
                        v-model.number="internalAdjustments.deductibles.eng"
                        label="ENG fee"
                        type="number"
                        suffix="%"
                        :rules="[(v) => (v >= 0 && v <= 100) || '0–100%']"
                      />
                    </div>
                    <div class="input-cont">
                      <v-text-field
                        v-model.number="
                          internalAdjustments.deductibles.premiumReserve
                        "
                        label="Reserve"
                        type="number"
                        suffix="%"
                        :rules="[(v) => (v >= 0 && v <= 100) || '0–100%']"
                      />
                    </div>
                    <div class="input-cont">
                      <v-text-field
                        v-model.number="internalAdjustments.deductibles.lta"
                        label="LTA"
                        type="number"
                        suffix="%"
                        :rules="[(v) => (v >= 0 && v <= 100) || '0–100%']"
                      />
                    </div>
                    <div class="input-cont">
                      <v-text-field
                        v-model.number="internalAdjustments.deductibles.others"
                        label="Others"
                        type="number"
                        suffix="%"
                        :rules="[(v) => (v >= 0 && v <= 100) || '0–100%']"
                      />
                    </div>
                  </div>
                </div>

                <!-- Exchange Rate (si lo manejas como %) -->
                <div class="input-row">
                  <div class="input-col">
                    <div class="input-cont">
                      <v-text-field
                        v-model.number="
                          internalAdjustments.deductibles.exchangeRate
                        "
                        label="Exchange Rate"
                        type="number"
                        suffix="%"
                        :rules="[(v) => (v >= 0 && v <= 100) || '0–100%']"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <!-- Original currency -->
              <div class="input-row w-50 d-flex flex-wrap mt-6 block-as-table">
                <div class="endorsement-title">Original currency</div>

                <div class="input-row">
                  <!-- Col 1 -->
                  <div class="input-col">
                    <div class="input-cont">
                      <currency-input
                        v-model="internalAdjustments.totalPremium"
                        label="Total premium"
                        :options="currencyOptions"
                      />
                    </div>
                    <div class="input-cont">
                      <currency-input
                        v-model="internalAdjustments.fronting"
                        label="Fronting"
                        :options="currencyOptions"
                      />
                    </div>
                    <div class="input-cont">
                      <currency-input
                        v-model="internalAdjustments.others"
                        label="Others"
                        :options="currencyOptions"
                      />
                    </div>
                  </div>

                  <!-- Col 2 -->
                  <div class="input-col">
                    <div class="input-cont">
                      <currency-input
                        v-model="internalAdjustments.premiumSlu"
                        label="Premium SLU"
                        :options="currencyOptions"
                      />
                    </div>
                    <div class="input-cont">
                      <currency-input
                        v-model="internalAdjustments.eng"
                        label="ENG fee"
                        :options="currencyOptions"
                      />
                    </div>
                  </div>

                  <!-- Col 3 -->
                  <div class="input-col">
                    <div class="input-cont">
                      <currency-input
                        v-model="internalAdjustments.brokerage"
                        label="Brokerage"
                        :options="currencyOptions"
                      />
                    </div>
                    <div class="input-cont">
                      <currency-input
                        v-model="internalAdjustments.colombiaReserve"
                        label="Reserve"
                        :options="currencyOptions"
                      />
                    </div>
                  </div>

                  <!-- Col 4 -->
                  <div class="input-col">
                    <div class="input-cont">
                      <currency-input
                        v-model="internalAdjustments.tax"
                        label="tax"
                        :options="currencyOptions"
                      />
                    </div>
                    <div class="input-cont">
                      <currency-input
                        v-model="internalAdjustments.lta"
                        label="LTA"
                        :options="currencyOptions"
                      />
                    </div>
                  </div>
                </div>

                <!-- TIVs (si quieres dejarlos en Step 1) -->
                <div class="input-row">
                  <div class="input-col">
                    <div class="input-cont">
                      <currency-input
                        v-model="internalAdjustments.tivMovementDamage"
                        label="TIV movement damage"
                        :options="currencyOptions"
                      />
                    </div>
                  </div>
                  <div class="input-col">
                    <div class="input-cont">
                      <currency-input
                        v-model="internalAdjustments.tivMovementBi"
                        label="TIV movement BI"
                        :options="currencyOptions"
                      />
                    </div>
                  </div>
                  <div class="input-col">
                    <div class="input-cont">
                      <currency-input
                        v-model="internalAdjustments.tivMovementStocks"
                        label="TIV movement stocks"
                        :options="currencyOptions"
                      />
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
                        />
                      </template>
                      <v-date-picker
                        v-model="premiumPaymentDate"
                        @input="menuControllStepOne.premiumPaymentDate = false"
                      />
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
                    />
                  </div>
                </div>
              </div>
            </v-stepper-content>

            <v-stepper-content step="2">
              <!--Details -->
              <div class="details-container">
                <h3 class="inner-title">Detail</h3>
              </div>

              <div class="container-modify-general">
                <div class="subcontainer-modify-general">
                  Modify table
                  <input
                    :checked="checkedModifyTable"
                    v-model="checkedModifyTable"
                    id="checkbox"
                    type="checkbox"
                  />
                </div>
              </div>

              <div class="table-container input-row justify-center">
                <div class="table-title-space"></div>
                <div class="title-col">
                  <div class="col-subtitle">Total premium</div>
                  <div class="col-subtitle">Premium SLU</div>
                  <div class="col-subtitle">Brokerage</div>
                  <div class="col-subtitle">Tax</div>
                  <div class="col-subtitle">Fronting</div>
                  <div class="col-subtitle">Eng fee</div>
                  <div class="col-subtitle">Reserve</div>
                  <div class="col-subtitle">LTA</div>
                  <div class="col-subtitle">Others</div>
                </div>
                <div class="table">
                  <div class="inner-table justify-center">
                    <div class="table-col">
                      <div class="table-title">Calculate premium</div>
                      <div class="input-row mt-4">
                        <div class="inner-col">
                          <div class="table-input blue-input">
                            <currency-input
                              v-model="
                                internalAdjustmentsWithDates.totalPremium
                              "
                              :options="currencyOptions"
                              :readonly="!checkedModifyTable"
                              :disabled="!checkedModifyTable"
                            />
                          </div>

                          <div class="table-input blue-input">
                            <currency-input
                              v-model="internalAdjustmentsWithDates.premiumSlu"
                              :options="currencyOptions"
                              :readonly="!checkedModifyTable"
                              :disabled="!checkedModifyTable"
                            />
                          </div>

                          <div class="table-input blue-input">
                            <currency-input
                              v-model="internalAdjustmentsWithDates.brokerage"
                              :options="currencyOptions"
                              :readonly="!checkedModifyTable"
                              :disabled="!checkedModifyTable"
                            />
                          </div>

                          <div class="table-input blue-input">
                            <currency-input
                              v-model="internalAdjustmentsWithDates.tax"
                              :options="currencyOptions"
                              :readonly="!checkedModifyTable"
                              :disabled="!checkedModifyTable"
                            />
                          </div>

                          <div class="table-input blue-input">
                            <currency-input
                              v-model="internalAdjustmentsWithDates.fronting"
                              :options="currencyOptions"
                              :readonly="!checkedModifyTable"
                              :disabled="!checkedModifyTable"
                            />
                          </div>

                          <div class="table-input blue-input">
                            <currency-input
                              v-model="internalAdjustmentsWithDates.eng"
                              :options="currencyOptions"
                              :readonly="!checkedModifyTable"
                              :disabled="!checkedModifyTable"
                            />
                          </div>

                          <div class="table-input blue-input">
                            <currency-input
                              v-model="
                                internalAdjustmentsWithDates.colombiaReserve
                              "
                              :options="currencyOptions"
                              :readonly="!checkedModifyTable"
                              :disabled="!checkedModifyTable"
                            />
                          </div>

                          <div class="table-input blue-input">
                            <currency-input
                              v-model="internalAdjustmentsWithDates.lta"
                              :options="currencyOptions"
                              :readonly="!checkedModifyTable"
                              :disabled="!checkedModifyTable"
                            />
                          </div>

                          <div class="table-input blue-input">
                            <currency-input
                              v-model="internalAdjustmentsWithDates.others"
                              :options="currencyOptions"
                              :readonly="!checkedModifyTable"
                              :disabled="!checkedModifyTable"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </v-stepper-content>

            <v-stepper-content step="3">
              <div v-if="loadingDocument">cargando documento ..</div>
              <div v-if="!loadingDocument" class="inner-title">
                Endorsement Report
              </div>

              <div
                v-if="
                  !loadingDocument &&
                  cleanReport &&
                  cleanReport.endorsmentReporData
                "
                class="report-complete"
              >
                <EndorsementReportCompleteTable :report="cleanReport" />
              </div>
              <div
                v-if="!loadingDocument"
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

      <div class="stepper-btn mt-7 mb-3 d-flex justify-end align-center">
        <v-btn
          :outlined="e1 == 3 ? false : true"
          rounded
          large
          :text="e1 == 3 ? true : false"
          :class="e1 == 3 ? 'blue-btn' : 'clear-btn'"
          :color="e1 == 3 ? 'none' : '#003D6D'"
          @click="goNext(e1)"
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

    <v-dialog v-model="dialog" persistent width="auto">
      <v-card id="card-eye" class="pb-3">
        <v-card-title class="font-weight-bold text-h5"
          >Changes admitted premium</v-card-title
        >

        <v-divider id="divisor"></v-divider>

        <div id="border-blue" class="mb-8">
          <v-card-text class="font-weight-bold text-h6 blue-text">
            If you continue, the data entered in the admitted premium table will
            be taken.
          </v-card-text>
        </div>

        <div
          class="stepper-btn mt-7 mb-3 d-flex justify-space-around align-center"
        >
          <v-btn text rounded large class="blue-btn" @click="dialog = false">
            Accept
          </v-btn>

          <v-btn
            outlined
            rounded
            large
            class="clear-btn"
            color="#003D6D"
            @click="cancelModifyTable"
          >
            Cancel
          </v-btn>
        </div>
      </v-card>
    </v-dialog>
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
import { formatCurrency } from "../../utils";
import Decimal from "@/lib/decimal";
import EndorsementService from "../../services/endorsement.service";
//Clases
import { netPremiumInclusionRiskAutoCalcs } from "../class/netPremiumInclusionRisk";
import { ChangeofPeriodAutoCalcs } from "../models/ChangeOfPeriod";
import AccountCompleteService from "@/modules/home/services/account-complete.service";
import EndorsementDocuments from "../../components/EndorsementDocuments.vue";

export default {
  name: "InternalAdjustments",
  components: {
    AppFile,
    CurrencyInput,
    DocumentsEndorsement,
    InputDaysDiference,
    EndorsementDocuments,
    EndorsementReportCompleteTable,
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
      description: "Adjustment by error in fronting",
      descriptionRules: [
        (v) => !!(v && v.trim()) || "Description is required",
        (v) => (v ? v.length <= 200 : true) || "Max 200 characters",
      ],
      endorsementDateError: false,
      loadingDocument: false,
      expiryDatetoCalc: this.accountComplete.deductibles.expiryDate,
      expiryDateReal: new Date(this.accountComplete.deductibles.expiryDate)
        .toISOString()
        .substr(0, 10),
      loadingdocument: false,
      tempAccountComplete: this.accountComplete,
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
      internalAdjustmentType: [],
      listEndorsement: [],
      endorsementToModify: 0,
      typeOfInternalAdjustment: [
        "Premium adjustment",
        "Rate adjustment",
        "Insurable/Insured value adjustment",
      ],
      selectedInternalAdjustment: "",
      applyTo: [],
      clauseList: [],
      currentMonth: [],
      currentMonthUSD: [],
      currencyOptions: {
        currency: this.accountComplete?.deductibles?.currency || "MXN",
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
      cartera: {},
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
      dialog: false,
      buttonTitle: "Next",
      buttonTitleBack: "Cancel",
    };
  },
  async beforeMount() {
    this.el = 1;
    this.files = await getFiles();
    this.clauseList = await PaymentService.getClauses();
    this.stockPercentagePMD = this.stockInputValue * (this.PmdStock / 100);
    this.stockPercentagePMDUSD = this.stockPercentagePMD / this.exchangeRate;
    this.listEndorsement =
      await EndorsementService.getEndorsementsBySubscriptionId(
        this.subscriptionId
      );
    console.log("listEndorsement =>", this.listEndorsement);
  },
  async created() {
    //Calculos iniciales

    const premiumDamage =
      (this.accountComplete.tiv.insurable.propertyDamage *
        this.accountComplete.tiv.premium.propertyDamageRate) /
      100;

    const premiumBi =
      (this.accountComplete.tiv.insurable.businessInterruption *
        this.accountComplete.tiv.premium.businessInterruptionRate) /
      100;

    const premiumStocks =
      (this.accountComplete.tiv.insurable.stock *
        this.accountComplete.tiv.premium.stockRate) /
      100;

    const options = {
      isEdited: {
        premiumDamage: true,
        premiumBi: true,
        premiumStocks: true,
      },
      dataEdited: {
        // totalPremium
        premiumDamage: premiumDamage,
        premiumBi: premiumBi,
        premiumStocks: premiumStocks,
      },
    };

    const tiv = {
      propertyDamageMovement: this.accountComplete.tiv.insurable.propertyDamage,
      businessInterruptionMovement:
        this.accountComplete.tiv.insurable.businessInterruption,
      stockMovement: this.accountComplete.tiv.insurable.stock,

      propertyDamageRate: this.accountComplete.tiv.premium.propertyDamageRate,
      businessInterruptionRate:
        this.accountComplete.tiv.premium.businessInterruptionRate,
      stockRate: this.accountComplete.tiv.premium.stockRate,
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

    this.internalAdjustments = {
      deductibles: this.accountComplete.deductibles,
      newShare: this.accountComplete.tiv.boundInsurableProp.sluLine,
      totalPremium: results.totalPremiumResult.total,
      premiumSlu: results.data.totalPremiumSlu,
      brokerage: results.data.brokerageTotal,
      tax: results.data.taxesTotal,
      fronting: results.data.frontingTotal,
      eng: results.data.engTotal,
      colombiaReserve: results.data.colombiaTotal,
      lta: results.data.LTATotal,
      others: results.data.otherTotal,
      tivMovementDamage: this.accountComplete.tiv.insurable.propertyDamage,
      tivMovementBi: this.accountComplete.tiv.insurable.businessInterruption,
      tivMovementStocks: this.accountComplete.tiv.insurable.stock,
    };
  },
  mounted() {
    console.log("accountComplete =>", this.accountComplete);
    const inception = new Date(this.accountComplete.deductibles.inceptionDate)
      .toISOString()
      .substring(0, 10);
    const expiry = new Date(this.accountComplete.deductibles.expiryDate)
      .toISOString()
      .substring(0, 10);

    this.inceptionDate = inception;
    this.expiryDate = expiry;
    this.movementEndDate = expiry; // readonly
    this.expiryDateReal = expiry; // cálculos/reporte
  },
  computed: {
    cleanReport() {
      return this.endorsmentReporData &&
        Object.keys(this.endorsmentReporData).length > 0
        ? {
            endorsmentReporData: this.endorsmentReporData,
            cartera: this.cartera,
          }
        : {};
    },
  },

  methods: {
    async endorsementDateValidation(_, incomingDate) {
      this.endorsementDateError =
        Date.parse(incomingDate) >= Date.parse(this.expiryDate);
      if (!this.endorsementDateError) {
        await this.changeDateEndorsement(incomingDate);
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
        const ok = this.$refs.desc?.validate
          ? this.$refs.desc.validate(true)
          : !!(this.description && this.description.trim());
        if (!ok) return;
        this.e1 = 2;
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
    toUsd(value) {
      const exchangeRate = this.accountComplete.deductibles.exchangeRate;
      return Decimal.div(value, exchangeRate).toNumber();
    },
    async submit() {
      this.e1 = 1;
      const accountCompleteResponse =
        await AccountCompleteService.addAccountComplete(this.subscriptionId, {
          ...this.accountComplete,
          deductibles: this.internalAdjustmentsWithDates,
          tiv: this.accountComplete.tiv,
          netPremium: this.accountComplete.net_premium,
          additionalInfo: this.accountComplete.additional_info,
          technicalConditions: this.accountComplete.technical_conditions,
          cartera: {
            ...this.accountComplete.cartera,
            ...this.cartera,
          },
        });

      await EndorsementService.addEndorsment({
        subscriptionId: this.subscriptionId,
        endorsmentType: 15,
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
    showDialog() {
      this.dialog = this.checkedModifyTable;
    },
    cancelModifyTable() {
      this.dialog = false;
      this.checkedModifyTable = false;
    },

    goNext(e1) {
      this.$refs.targetRef.scrollIntoView({ behavior: "smooth" });
      if (e1 == 1) {
        this.nextStep();
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
  },
  watch: {
    e1: async function () {
      if (this.e1 === 1) {
        this.buttonTitle = "Next";
        this.buttonTitleBack = "Cancel";
        this.accountComplete = this.tempAccountComplete;
      }

      if (this.e1 === 2) {
        this.buttonTitle = "Next";
        this.buttonTitleBack = "Return";
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

          propertyDamageRate:
            this.accountComplete.tiv.premium.propertyDamageRate,
          businessInterruptionRate:
            this.accountComplete.tiv.premium.businessInterruptionRate,
          stockRate: this.accountComplete.tiv.premium.stockRate,
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

        console.log(
          "deductibles internal",
          this.internalAdjustments.deductibles
        );

        const results = await netPremiumInclusionRiskAutoCalcs(
          tiv,
          this.internalAdjustments.deductibles,
          this.accountComplete.tiv?.boundInsurableProp.sluLine,
          false,
          dates,
          options
        );

        console.log("results", results);

        this.internalAdjustmentsWithDates = {
          deductibles: this.internalAdjustments.deductibles,
          newShare: this.accountComplete.tiv.boundInsurableProp.sluLine,
          totalPremium: results.totalPremiumResult.total,
          premiumSlu: results.data.totalPremiumSlu,
          brokerage: results.data.brokerageTotal,
          tax: results.data.taxesTotal,
          fronting: results.data.frontingTotal,
          eng: results.data.engTotal,
          colombiaReserve: results.data.colombiaTotal,
          lta: results.data.LTATotal,
          others: results.data.otherTotal,
          tivMovementDamage: this.accountComplete.tiv.insurable.propertyDamage,
          tivMovementBi:
            this.accountComplete.tiv.insurable.businessInterruption,
          tivMovementStocks: this.accountComplete.tiv.insurable.stock,
        };

        // FIN CALCULOS 2

        this.cartera = {
          ...this.accountComplete.cartera,
          premiumPaymentDate: this.premiumPaymentDate,
          clausula: this.clause,
        };
      }

      if (this.e1 === 3) {
        this.buttonTitle = "Finalize";
        this.buttonTitleBack = "Return";
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

          propertyDamageRate:
            this.accountComplete.tiv.premium.propertyDamageRate,
          businessInterruptionRate:
            this.accountComplete.tiv.premium.businessInterruptionRate,
          stockRate: this.accountComplete.tiv.premium.stockRate,
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

        const mapForReport = (d) => ({
          ...d,
          biSluShare: d.biPremiumSlu,
          damageSluShare: d.damagePremiumSlu,
          stocksSluShare: d.stocksPremiumSlu,
          sluShareTotal: d.totalPremiumSlu,
        });

        this.endorsmentReporData = {
          cartera: {
            ...this.accountComplete.cartera,
            premiumPaymentDate: this.premiumPaymentDate,
            clausula: this.clause, // ver punto 2
          },
          boundInsurableProp: {
            ...this.accountComplete.tiv.boundInsurableProp,
          },
          deductibles: { ...this.internalAdjustments.deductibles },
          netPremium: mapForReport(results.data),
          netPremiumUSD: mapForReport(resultsUSD.data),
          premium: {
            ...results.premium,
            businessInterruptionMovementUsd: this.toUsd(
              results.premium.businessInterruptionMovement
            ),
            propertyDamageMovementUsd: this.toUsd(
              results.premium.propertyDamageMovement
            ),
            stockMovementUsd: this.toUsd(results.premium.stockMovement),
          },
          totalValues: { ...results.totalPremiumResult },
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
        };
        // Invoca el  servicio para generar el excel
        const fileLink = await EndorsementService.getEndorsmentReport({
          subscriptionId: this.subscriptionId,
          endorsmentType: 15,
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
    checkedModifyTable(val) {
      this.dialog = !!val;
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
  gap: 20px;
  .title-col {
    width: 15%;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
  }
}
.table {
  width: 35%;
}
.table-block-title {
  font-weight: 800;
  font-size: 24px;
  line-height: 110%;
  text-align: center;
  padding-bottom: 25px;
}
.inner-table {
  display: flex;
  flex-wrap: wrap;
  align-content: center;
  align-items: flex-end;
  justify-content: flex-start;
}
.table-col {
  width: 100%;
  .inner-col {
    width: 100%;
  }
}
.table-main-title {
  height: 50px;
  color: white;
  font-weight: 800;
  background-color: #547fa9;
  border-radius: 6px;
  margin: 2px;
  font-size: 18px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
.table-title {
  height: 50px;
  color: white;
  font-weight: 800;
  background-color: #547fa9;
  border-radius: 6px;
  margin: 2px;
  font-size: 14px;
  padding: 0 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
.container-subtitles {
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
}
.table-subtitle {
  width: 50%;
  color: rgb(0, 0, 0);
  font-weight: 800;
  border-radius: 6px;
  margin: 2px;
  font-size: 18px;
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
  height: 1px;
  width: 100%;
}
.input-row {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-content: center;
  justify-content: flex-start;
}
.input-col {
  width: 20%;
  display: block;
  margin-right: 30px;
}
.input-col-month {
  width: 20%;
  display: block;
  margin-right: 30px;
}

.input-col-lg {
  width: 50%;
  display: block;
  margin-right: 30px;
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

.container-modify-general {
  width: 100%;
  display: flex;
  justify-content: flex-end;
  padding: 10px;
}
.subcontainer-modify-general {
  display: flex;
  font-size: 18px;
  font-weight: 600;
  input {
    cursor: pointer;
    accent-color: #003d6d;
    margin-left: 10px;
    transform: scale(1.8);
  }
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

.details-container {
  width: 60%;
  height: auto;
  padding-top: 10px;
  padding-bottom: 10px;
  margin-left: 5%;
}
.details-input-container {
  justify-content: center;
  align-items: center;
}

.input-col-details {
  flex-grow: 1;
  margin-inline-end: 20px;
}
.catalog-select {
  width: 25%;
}
.container-rows-periods {
  display: flex;
  flex-direction: row;
  .input-name-period {
    width: 15%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }
  .input-name-period-subtitle {
    width: 20%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    font-weight: 600;
    font-family: avenir;
    margin-right: 30px;
  }
  .input-name-period-subtitle-month {
    width: 15%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    font-weight: 600;
    font-family: avenir;
  }
}
.block-as-table {
  border: 1px solid #cfd8ea;
  border-radius: 6px;
  padding: 12px;
  background: #f7f9fe;
  margin-top: 12px;
}
.report-complete {
  overflow: auto;
}
</style>
