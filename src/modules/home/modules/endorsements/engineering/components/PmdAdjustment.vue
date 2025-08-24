<template>
  <div class="outter-wrapper" ref="targetRef">
    <div class="endorsement-title">PMD Adjustment</div>
    <div class="editAccount" v-if="accountComplete.reference">
      {{ accountComplete.reference }}
    </div>

    <v-stepper v-model="e1">
      <v-stepper-header>
        <v-stepper-step :complete="e1 > 1" step="1" color="#F59607"
          >Endorsement</v-stepper-step
        >
        <v-stepper-step :complete="e1 > 2" step="2" color="#F59607"
          >Calculate premium</v-stepper-step
        >
        <v-stepper-step step="3" color="#F59607">
          Endorsement summary
        </v-stepper-step>
      </v-stepper-header>

      <div class="endorsement-wrapper">
        <div class="content">
          <v-stepper-items>
            <v-stepper-content step="1" class="step-one">
              <!-- Header Dates Section - Improved Layout -->
              <div class="dates-header-section">
                <div class="input-row w-50 d-flex flex-wrap">
                  <div class="input-col">
                    <div class="inner-title">Endorsement date</div>
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
                      <div
                        v-if="this.endorsementDateError"
                        class="error-message"
                      >
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
                            label="expiry date"
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
              </div>

              <div v-if="showInfoEndorsement">
                <!-- Inception and Movement End Date Row -->
                <div class="input-row w-50 d-flex flex-wrap">
                  <div class="input-col">
                    <div class="input-cont">
                      <v-menu
                        v-model="menuControllStepOne.InceptionDate"
                        :close-on-content-click="false"
                        :nudge-right="40"
                        transition="scale-transition"
                        offset-y
                        min-width="auto"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            v-model="inceptionDate"
                            label="Inception date"
                            readonly
                            disabled
                            v-bind="attrs"
                            v-on="on"
                          ></v-text-field>
                        </template>
                        <v-date-picker
                          v-model="inceptionDate"
                          @input="menuControllStepOne.InceptionDate = false"
                          @change="
                            endorsementDateValidation($event, inceptionDate)
                          "
                        ></v-date-picker>
                      </v-menu>
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
                            label="Movement end date"
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
                  <InputDaysDiference
                    :endorsementDate="effectiveDate"
                    :expiryDate="localAccountComplete.deductibles.expiryDate"
                    :key="effectiveDate"
                  />
                </div>

                <!-- Basic Information Section - PMD Stocks, Rate Stocks, SLU Share -->
                <div class="basic-info-section">
                  <div class="input-row w-100 d-flex flex-wrap">
                    <div class="input-col">
                      <div class="input-cont">
                        <v-text-field
                          :value="pmdStocksFormatted"
                          label="PMD Stocks"
                          readonly
                          suffix="%"
                          outlined
                          dense
                        />
                      </div>
                    </div>
                    <div class="input-col">
                      <div class="input-cont">
                        <v-text-field
                          :value="rateStockFormatted"
                          label="Rate Stocks"
                          readonly
                          suffix="‰"
                          outlined
                          dense
                        />
                      </div>
                    </div>
                    <div class="input-col">
                      <div class="input-cont">
                        <v-text-field
                          :value="sluShareFormatted"
                          label="SLU Share"
                          readonly
                          suffix="%"
                          outlined
                          dense
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Total Values Section with Table Layout -->
                <div class="total-values-section">
                  <h3 class="section-title">Total Values</h3>
                  <div class="values-table-container">
                    <table class="values-table">
                      <thead>
                        <tr class="header-row">
                          <th class="label-header"></th>
                          <th class="value-header">Original Currency</th>
                          <th class="value-header">USD</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td class="label-cell">Stocks</td>
                          <td class="value-cell">
                            <currency-input
                              v-model="stockInputValue"
                              :options="currencyOptions"
                              readonly
                              dense
                            />
                          </td>
                          <td class="value-cell">
                            <currency-input
                              v-model="stockInputValueUsd"
                              :options="currencyOptionsUSD"
                              readonly
                              dense
                            />
                          </td>
                        </tr>
                        <tr>
                          <td class="label-cell">Stocks percentage PMD</td>
                          <td class="value-cell">
                            <currency-input
                              :value="stockPercentagePMD"
                              :options="currencyOptions"
                              readonly
                              dense
                            />
                          </td>
                          <td class="value-cell">
                            <currency-input
                              :value="stockPercentagePMDUsd"
                              :options="currencyOptionsUSD"
                              readonly
                              dense
                            />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <!-- Reported Values Section -->
                <div class="reported-values-section">
                  <h3 class="section-title">Reported values</h3>
                  <div class="input-row w-50 d-flex flex-wrap">
                    <div class="inner-title">{{ periodLabel }}</div>
                    <div class="catalog-select">
                      <v-autocomplete
                        label="Movement Type"
                        v-model="periodValue"
                        :items="catalogPeriodo"
                        @change="changePeriod"
                        item-value="id"
                        item-text="type"
                        outlined
                        dense
                      />
                    </div>
                  </div>

                  <!-- Monthly Period Table -->
                  <div
                    v-if="periodValue === '1'"
                    class="period-table-container"
                  >
                    <table class="period-table">
                      <thead>
                        <tr class="table-header">
                          <th class="month-header">Month</th>
                          <th class="value-header">Stocks Original Currency</th>
                          <th class="value-header">Stocks USD</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr
                          v-for="(month, index) in isMonthly"
                          :key="index"
                          class="table-row"
                        >
                          <td class="month-cell">{{ month }}</td>
                          <td class="input-cell">
                            <currency-input
                              v-model="currentMonth[index]"
                              :options="currencyOptions"
                              @input="normalCurrency($event, index)"
                              dense
                            />
                          </td>
                          <td class="input-cell">
                            <currency-input
                              v-model="currentMonthUSD[index]"
                              :options="currencyOptionsUSD"
                              readonly
                              dense
                            />
                          </td>
                        </tr>
                        <tr class="average-row">
                          <td class="average-cell">Monthly average</td>
                          <td class="input-cell">
                            <currency-input
                              v-model="monthlyAverage"
                              :options="currencyOptions"
                              readonly
                              dense
                            />
                          </td>
                          <td class="input-cell">
                            <currency-input
                              v-model="monthlyAverageUsd"
                              :options="currencyOptionsUSD"
                              readonly
                              dense
                            />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <!-- Quarterly Period Table -->
                  <div
                    v-if="periodValue === '2'"
                    class="period-table-container"
                  >
                    <table class="period-table">
                      <thead>
                        <tr class="table-header">
                          <th class="month-header">Quarter</th>
                          <th class="value-header">Stocks Original Currency</th>
                          <th class="value-header">Stocks USD</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr
                          v-for="(quarter, index) in isTrimester"
                          :key="index"
                          class="table-row"
                        >
                          <td class="month-cell">{{ quarter }}</td>
                          <td class="input-cell">
                            <currency-input
                              v-model="currentMonth[index]"
                              :options="currencyOptions"
                              @input="normalCurrency($event, index)"
                              dense
                            />
                          </td>
                          <td class="input-cell">
                            <currency-input
                              v-model="currentMonthUSD[index]"
                              :options="currencyOptionsUSD"
                              readonly
                              dense
                            />
                          </td>
                        </tr>
                        <tr class="average-row">
                          <td class="average-cell">Quarterly average</td>
                          <td class="input-cell">
                            <currency-input
                              v-model="quarterlyAverage"
                              :options="currencyOptions"
                              readonly
                              dense
                            />
                          </td>
                          <td class="input-cell">
                            <currency-input
                              v-model="quarterlyAverageUsd"
                              :options="currencyOptionsUSD"
                              readonly
                              dense
                            />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <!-- Customer Average Period Table -->
                  <div
                    v-if="periodValue === '3'"
                    class="period-table-container"
                  >
                    <table class="period-table">
                      <thead>
                        <tr class="table-header">
                          <th class="month-header">Period</th>
                          <th class="value-header">Stocks Original Currency</th>
                          <th class="value-header">Stocks USD</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr
                          v-for="(period, index) in isCustomer"
                          :key="index"
                          class="table-row"
                        >
                          <td class="month-cell">{{ period }}</td>
                          <td class="input-cell">
                            <currency-input
                              v-model="currentMonth[index]"
                              :options="currencyOptions"
                              @input="normalCurrency($event, index)"
                              dense
                            />
                          </td>
                          <td class="input-cell">
                            <currency-input
                              v-model="currentMonthUSD[index]"
                              :options="currencyOptionsUSD"
                              readonly
                              dense
                            />
                          </td>
                        </tr>
                        <tr class="average-row">
                          <td class="average-cell">Average sent by customer</td>
                          <td class="input-cell">
                            <currency-input
                              v-model="agreeAverage"
                              :options="currencyOptions"
                              readonly
                              dense
                            />
                          </td>
                          <td class="input-cell">
                            <currency-input
                              v-model="agreeAverageUsd"
                              :options="currencyOptionsUSD"
                              readonly
                              dense
                            />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <!-- TIV Stock Receivable Section -->
                <div class="tiv-section">
                  <div class="values-table-container">
                    <table class="values-table">
                      <tbody>
                        <tr>
                          <td class="label-cell">TIV Stock receivable</td>
                          <td class="value-cell">
                            <currency-input
                              v-model="tivStockReceivable"
                              :options="currencyOptions"
                              readonly
                              dense
                            />
                          </td>
                          <td class="value-cell">
                            <currency-input
                              v-model="tivStockReceivableUsd"
                              :options="currencyOptionsUSD"
                              readonly
                              dense
                            />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <!-- PPW Section - Keep as requested -->
                <div class="input-row w-50 d-flex flex-wrap">
                  <div class="inner-title">PPW</div>
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

            <!-- Keep Steps 2 and 3 unchanged -->
            <v-stepper-content step="2">
              <div>
                <Table :tableData="tableData" />
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
      <AdmittedPremiumTableEngineering
        v-if="e1 == 2"
        @setTotalPremium="setTotalPremium"
        :detailValues="admittedPremiumData"
        :exchangeRate="localAccountComplete.deductibles.exchangeRate"
        :canEditTable="true"
      />

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
  </div>
</template>
<script>
/* components */
import CurrencyInput from "@/components/CurrencyInput/CurrencyInput.vue";
import AppFile from "../../components/AppFile.vue";
import InputDaysDiference from "../../components/DaysDiference.vue";
import DocumentsEndorsement from "../../components/DocumentsEndorsement.vue";
import EndorsementDocuments from "../../components/EndorsementDocuments.vue";
import Table from "./../modules/deductions-change/detail/components/Table.vue";
import AdmittedPremiumTableEngineering from "../../components/AdmittedPremiumTableEngineering.vue";
import EndorsementReportCompleteTable from "./EndorsementReportCompleteTable.vue";

/* services */
import { netPremiumInclusionRiskAutoCalcs } from "@/modules/home/modules/endorsements/engineering/class/netPremiumInclusionRiskEng";
import AccountCompleteService from "@/modules/home/services/account-complete.service";
import PaymentService from "@/modules/home/services/payments.service";
import EndorsementService from "../../services/endorsement.service";
import { getFiles } from "../../services/mock-files.service";
import { netPremiumInclusionRiskEng } from "../class/netPremiumInclusionRiskEng";

/* libs */
import Decimal from "@/lib/decimal";
import { unFormatCurrency } from "../../utils";

export default {
  name: "PmdAdjustment",
  components: {
    AppFile,
    CurrencyInput,
    DocumentsEndorsement,
    InputDaysDiference,
    EndorsementDocuments,
    Table,
    AdmittedPremiumTableEngineering,
    EndorsementReportCompleteTable,
  },
  props: {
    type: { type: String, default: "Inclusion Risk" },
    accountComplete: { type: Object },
    changeDateEndorsement: { type: Function },
    dateSaved: { type: String },
    showInfoEndorsement: { type: Boolean },
    backToCreateEndorsement: { type: Function },
  },
  data() {
    return {
      menu3: false,
      endorsementDateError: false,
      loadingDocument: false,
      loadingdocument: false,
      sent: false,
      isEdited: {},
      localAccountComplete: JSON.parse(JSON.stringify(this.accountComplete)),
      cartera: {},
      admitedPremium: 0,
      expiryDatetoCalc: this.accountComplete.deductibles.expiryDate,
      newShare: this.accountComplete.tiv.boundInsurableProp.sluLine,
      rateStock: this.accountComplete.tiv.premium.allRiskRate,
      clause: this.accountComplete.cartera.clausula,
      totalPremium: [
        {
          id: 1,
          name: "Original Currency",
          premiumAllRisk: 0,
          premiumAlop: 0,
          premiumTotal: 0,
          sluAllRisk: 0,
          sluAlop: 0,
          sluTotal: 0,
        },
        {
          id: 2,
          name: "USD",
          premiumAllRisk: 0,
          premiumAlop: 0,
          premiumTotal: 0,
          sluAllRisk: 0,
          sluAlop: 0,
          sluTotal: 0,
        },
      ],

      tempAccountComplete: this.accountComplete,
      lastAccountInformacion: {},

      currencyOptions: {
        currency: "MXN",
        currencyDisplay: "narrowSymbol",
        locale: "en-US",
      },
      currencyOptionsUSD: {
        currency: "USD",
        currencyDisplay: "narrowSymbol",
        locale: "en-US",
      },

      periodLabel: "Report monthly statement",
      periodValue: "1",
      catalogPeriodo: [
        { id: "1", type: "Report monthly statement" },
        { id: "2", type: "Report quarterly statement" },
        { id: "3", type: "Report average sent by customer" },
      ],

      isMonthly: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
      isTrimester: ["Q1", "Q2", "Q3", "Q4"],
      isCustomer: ["Average sent by customer"],

      currentMonth: [],
      currentMonthUSD: [],

      monthlyAverage: 0,
      monthlyAverageUsd: 0,
      quarterlyAverage: 0,
      quarterlyAverageUsd: 0,
      agreeAverage: 0,
      agreeAverageUsd: 0,
      tivStockReceivable: 0,
      tivStockReceivableUsd: 0,

      defaultValues: {
        stockValue: 0,
        stockUsd: 0,
        pmdPercentage: 0.85,
      },

      stockInputValue: 0,
      stockInputValueUsd: 0,
      stockPercentagePMDValue: 0,
      stockPercentagePMDUsdValue: 0,
      totalPremiumValue: 0,
      totalPremiumUsdValue: 0,

      admittedPremiumData: [
        {
          id: 1,
          name: "Original Currency",
          premiumAllRisk: 0,
          premiumAlop: 0,
          premiumTotal: 0,
          sluAllRisk: 0,
          sluAlop: 0,
          sluTotal: 0,
        },
        {
          id: 2,
          name: "USD",
          premiumAllRisk: 0,
          premiumAlop: 0,
          premiumTotal: 0,
          sluAllRisk: 0,
          sluAlop: 0,
          sluTotal: 0,
        },
      ],

      effectiveDate: this.dateSaved,
      expiryDate: undefined,
      movementEndDate: this.initialDateValue(),
      currentMovementEndDate: this.initialDateValue(),
      inceptionDate: this.initialDateValue(),
      premiumPaymentDate: this.initialDateValue(),

      clauseList: [],

      files: [
        {
          fileId: 1,
          fileName: "Report PMD Adjustment",
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

      e1: 1,
      buttonTitle: "Next",
      buttonTitleBack: "Cancel",

      errors: {
        tivStockReceivable: true,
        totalPremium: true,
        endorsementEffectiveDate: false,
      },
      errorsDates: {
        endorsementEffectiveDate: false,
        movementEndDate: false,
      },

      tableData: {
        currency: {
          total_premium: {
            total_premium_movement: 0,
            premium_slu: 0,
            net_premium: 0,
            total: 0,
          },
          premium_slu: {
            total_premium_movement: 0,
            premium_slu: 0,
            net_premium: 0,
            total: 0,
          },
        },
        usd: {
          total_premium: {
            total_premium_movement: 0,
            premium_slu: 0,
            net_premium: 0,
            total: 0,
          },
          premium_slu: {
            total_premium_movement: 0,
            premium_slu: 0,
            net_premium: 0,
            total: 0,
          },
        },
      },

      resultspremium: {
        damage: 0.0,
        bi: 0.0,
        stocks: 0.0,
        total: 0.0,
      },
      resultspremiumUSD: {
        damage: 0.0,
        bi: 0.0,
        stocks: 0.0,
        total: 0.0,
      },
      resultsSLU: {
        damage: 0.0,
        bi: 0.0,
        stocks: 0.0,
        total: 0.0,
      },
      resultsSLUUSD: {
        damage: 0.0,
        bi: 0.0,
        stocks: 0.0,
        total: 0.0,
      },

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

      detailValues: [
        {
          id: 1,
          name: "Original Currency",
          premiumAllRisk: 0,
          premiumAlop: 0,
          sluAllRisk: 0,
          sluAlop: 0,
        },
        {
          id: 2,
          name: "USD",
          premiumAllRisk: 0,
          premiumAlop: 0,
          sluAllRisk: 0,
          sluAlop: 0,
        },
      ],

      totalPremium2: [
        {
          id: 1,
          name: "Original Currency",
          premiumAllRisk: 0,
          premiumAlop: 0,
          premiumTotal: 0,
          sluAllRisk: 0,
          sluAlop: 0,
          sluTotal: 0,
        },
        {
          id: 2,
          name: "USD",
          premiumAllRisk: 0,
          premiumAlop: 0,
          sluAllRisk: 0,
          sluAlop: 0,
        },
      ],

      subscriptionId: this.$route.params.id,
      sharePorcent: 0,
      detail: 20,
      endDateError: false,
      effectiveDateError: false,
      attrs: {},
      on: {},
    };
  },

  computed: {
    pmdStocksFormatted() {
      const percentage = this.getPmdPercentage();
      return (percentage * 100).toFixed(2);
    },

    rateStockFormatted() {
      const rate = this.localAccountComplete?.tiv?.premium?.allRiskRate || 2.0;
      return rate.toFixed(2);
    },

    sluShareFormatted() {
      const sluLine =
        this.localAccountComplete?.tiv?.boundInsurableProp?.sluLine || 20.0;
      return sluLine.toFixed(2);
    },

    stockPercentagePMD() {
      const stockValue = this.stockInputValue || 0;
      const pmdPercentage = this.getPmdPercentage();
      return stockValue * pmdPercentage;
    },

    stockPercentagePMDUsd() {
      const exchangeRate =
        this.localAccountComplete?.deductibles?.exchangeRate || 1;
      return this.stockPercentagePMD / exchangeRate;
    },
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
  created() {
    this.initializeDataSafely();
    this.initializeStockValues();

    this.sharePorcent =
      this.localAccountComplete.tiv.boundInsurableProp.sluLine;
    this.lastAccountInformacion = { ...this.localAccountComplete };

    this.admitedPremium =
      this.localAccountComplete.cartera?.admitedPremium || 0;

    const tiv = this.localAccountComplete.tiv;

    this.detailValues[0]["premiumAllRisk"] = tiv.insurable.allRisk || 0;
    this.detailValues[0]["premiumAlop"] = tiv.insurable.alop || 0;
    this.detailValues[0]["premiumTotal"] = tiv.insurable.total || 0;

    this.detailValues[1]["premiumAllRisk"] = tiv.insurable.allRiskUsd || 0;
    this.detailValues[1]["premiumAlop"] = tiv.insurable.alopUsd || 0;
    this.detailValues[1]["premiumTotal"] = tiv.insurable.totalUsd || 0;

    this.initializeArrays();
  },

  async beforeMount() {
    this.e1 = 1;
    this.files = await getFiles();
    this.clauseList = await PaymentService.getClauses();
  },

  mounted() {
    console.log("PmdStock", this.accountComplete);

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
    getStockValue() {
      return (
        this.localAccountComplete?.tiv?.insurable?.stock ||
        this.localAccountComplete?.tiv?.insurable?.allRisk ||
        this.localAccountComplete?.tiv?.insurable?.total ||
        this.defaultValues.stockValue
      );
    },

    getStockUsdValue() {
      return (
        this.localAccountComplete?.tiv?.insurable?.stockUsd ||
        this.localAccountComplete?.tiv?.insurable?.allRiskUsd ||
        this.localAccountComplete?.tiv?.insurable?.totalUsd ||
        this.getStockValue() /
          (this.localAccountComplete?.deductibles?.exchangeRate || 1)
      );
    },

    getPmdPercentage() {
      return (
        this.localAccountComplete?.tiv?.insurable?.porcentaje ||
        this.localAccountComplete?.tiv?.boundInsurableProp?.pmdPercentage ||
        this.localAccountComplete?.tiv?.boundInsurableProp?.sluLine / 100 ||
        this.defaultValues.pmdPercentage
      );
    },

    initializeDataSafely() {
      if (!this.localAccountComplete.tiv.insurable.stock) {
        this.$set(
          this.localAccountComplete.tiv.insurable,
          "stock",
          this.getStockValue()
        );
      }

      if (!this.localAccountComplete.tiv.insurable.stockUsd) {
        this.$set(
          this.localAccountComplete.tiv.insurable,
          "stockUsd",
          this.getStockUsdValue()
        );
      }

      if (!this.localAccountComplete.tiv.insurable.porcentaje) {
        this.$set(
          this.localAccountComplete.tiv.insurable,
          "porcentaje",
          this.getPmdPercentage()
        );
      }
    },

    initializeArrays() {
      const maxLength =
        this.periodValue === "1" ? 12 : this.periodValue === "2" ? 4 : 1;
      this.currentMonth = new Array(maxLength).fill(0);
      this.currentMonthUSD = new Array(maxLength).fill(0);
    },

    changePeriod(event) {
      this.periodValue = event;

      if (event == 1) {
        this.periodLabel = "Report monthly statement";
      } else if (event == 2) {
        this.periodLabel = "Report quarterly statement";
      } else if (event == 3) {
        this.periodLabel = "Report average sent by customer";
      }

      this.resetCalculatedValues();
      this.initializeArrays();
    },

    resetCalculatedValues() {
      this.monthlyAverage = 0;
      this.monthlyAverageUsd = 0;
      this.quarterlyAverage = 0;
      this.quarterlyAverageUsd = 0;
      this.agreeAverage = 0;
      this.agreeAverageUsd = 0;
      this.tivStockReceivable = 0;
      this.tivStockReceivableUsd = 0;
      this.totalPremiumValue = 0;
      this.totalPremiumUsdValue = 0;
    },

    normalCurrency(event, index) {
      try {
        const value = parseFloat(event) || 0;

        if (value < 0) {
          console.warn("Valor negativo detectado, usando 0");
          return;
        }

        if (this.$set) {
          this.$set(this.currentMonth, index, value);
        } else {
          this.currentMonth[index] = value;
        }

        const exchangeRate =
          this.localAccountComplete?.deductibles?.exchangeRate || 25;
        const usdValue = value / exchangeRate;

        if (this.$set) {
          this.$set(this.currentMonthUSD, index, usdValue);
        } else {
          this.currentMonthUSD[index] = usdValue;
        }

        const totalOriginal = this.currentMonth.reduce(
          (sum, val) => sum + (parseFloat(val) || 0),
          0
        );
        const totalUSD = this.currentMonthUSD.reduce(
          (sum, val) => sum + (parseFloat(val) || 0),
          0
        );

        if (this.periodValue == 1) {
          this.monthlyAverage = totalOriginal / 12;
          this.monthlyAverageUsd = totalUSD / 12;
        } else if (this.periodValue == 2) {
          this.quarterlyAverage = totalOriginal / 4;
          this.quarterlyAverageUsd = totalUSD / 4;
        } else if (this.periodValue == 3) {
          this.agreeAverage = totalOriginal;
          this.agreeAverageUsd = totalUSD;
        }

        this.quarterlyAverage = totalOriginal / 4;
        this.quarterlyAverageUsd = totalUSD / 4;
        this.agreeAverage = totalOriginal;
        this.agreeAverageUsd = totalUSD;

        this.checkCompletionAndCalculate();
      } catch (error) {
        console.error("Error en normalCurrency:", error);
      }
    },

    checkCompletionAndCalculate() {
      let count = 0;
      const limit = this.periodValue == 1 ? 12 : this.periodValue == 2 ? 4 : 1;

      for (let i = 0; i < limit; i++) {
        if (this.currentMonth[i] && this.currentMonth[i] > 0) {
          count += 1;
        }
      }

      if (count == limit) {
        this.onCompletedInfo();
      } else {
        this.onNoCompletedInfo();
      }
    },

    setTotalPremium({ id, value, concept }) {
      const totalPremium = this.admittedPremiumData.find((el) => el.id === id);

      if (!totalPremium) {
        console.warn(`No se encontró totalPremium con id: ${id}`);
        return;
      }

      const numericValue = Number(value) || 0;
      totalPremium[concept] = numericValue;

      if (concept === "premiumAllRisk" || concept === "premiumAlop") {
        totalPremium.premiumTotal =
          (totalPremium.premiumAllRisk || 0) + (totalPremium.premiumAlop || 0);
      }

      if (concept === "sluAllRisk" || concept === "sluAlop") {
        totalPremium.sluTotal =
          (totalPremium.sluAllRisk || 0) + (totalPremium.sluAlop || 0);
      }

      if (concept !== "premiumTotal" && concept !== "sluTotal") {
        this.isEdited[concept] = true;
      }
    },

    initializeTotalPremium() {
      const stockReceivable = this.tivStockReceivable || 0;
      const rateStock = this.rateStock || 2.0;
      const exchangeRate =
        this.localAccountComplete?.deductibles?.exchangeRate || 1;
      const sluLine =
        this.localAccountComplete?.tiv?.boundInsurableProp?.sluLine || 20;

      if (stockReceivable <= 0) {
        console.log("No hay stock receivable, no se calculan premiums");
        return;
      }

      const additionalStockPremium =
        (stockReceivable * (rateStock * 0.1)) / 1000;
      const additionalStockPremiumUsd = additionalStockPremium / exchangeRate;

      const existingAllRisk =
        this.localAccountComplete?.tiv?.premium?.allRisk || 0;
      const existingAlop = this.localAccountComplete?.tiv?.premium?.alop || 0;
      const existingAllRiskUsd =
        this.localAccountComplete?.tiv?.premium?.allRiskUsd || 0;
      const existingAlopUsd =
        this.localAccountComplete?.tiv?.premium?.alopUsd || 0;

      const totalPremiumOriginal = this.admittedPremiumData.find(
        (el) => el.id === 1
      );
      if (totalPremiumOriginal) {
        totalPremiumOriginal.premiumAllRisk =
          existingAllRisk + additionalStockPremium;
        totalPremiumOriginal.premiumAlop = existingAlop;
        totalPremiumOriginal.premiumTotal =
          existingAllRisk + existingAlop + additionalStockPremium;

        totalPremiumOriginal.sluAllRisk =
          ((existingAllRisk + additionalStockPremium) * sluLine) / 100;
        totalPremiumOriginal.sluAlop = (existingAlop * sluLine) / 100;
        totalPremiumOriginal.sluTotal =
          (totalPremiumOriginal.premiumTotal * sluLine) / 100;
      }

      const totalPremiumUsd = this.admittedPremiumData.find(
        (el) => el.id === 2
      );
      if (totalPremiumUsd) {
        totalPremiumUsd.premiumAllRisk =
          existingAllRiskUsd + additionalStockPremiumUsd;
        totalPremiumUsd.premiumAlop = existingAlopUsd;
        totalPremiumUsd.premiumTotal =
          existingAllRiskUsd + existingAlopUsd + additionalStockPremiumUsd;

        totalPremiumUsd.sluAllRisk =
          ((existingAllRiskUsd + additionalStockPremiumUsd) * sluLine) / 100;
        totalPremiumUsd.sluAlop = (existingAlopUsd * sluLine) / 100;
        totalPremiumUsd.sluTotal =
          (totalPremiumUsd.premiumTotal * sluLine) / 100;
      }

      console.log("Premium inicializado para ingeniería:", {
        stockReceivable,
        additionalStockPremium,
        totalPremiumOriginal,
        totalPremiumUsd,
      });
    },

    initializeStockValues() {
      this.stockInputValue = this.getStockValue();
      this.stockInputValueUsd = this.getStockUsdValue();
      this.stockPercentagePMDValue = this.stockPercentagePMD;
      this.stockPercentagePMDUsdValue = this.stockPercentagePMDUsd;
    },

    onCompletedInfo() {
      let averageToUse = 0;

      if (this.periodValue == 1) {
        averageToUse = this.monthlyAverage;
      } else if (this.periodValue == 2) {
        averageToUse = this.quarterlyAverage;
      } else if (this.periodValue == 3) {
        averageToUse = this.agreeAverage;
      }

      if (averageToUse > this.newShare) {
        this.tivStockReceivable = averageToUse - this.newShare;
        this.errors.tivStockReceivable = false;
        this.errors.totalPremium = false;

        this.initializeTotalPremium();
      } else {
        this.tivStockReceivable = 0;
        this.errors.tivStockReceivable = true;
        this.errors.totalPremium = true;
      }

      this.tivStockReceivableUsd =
        this.tivStockReceivable /
        (this.localAccountComplete?.deductibles?.exchangeRate || 25);
      this.totalPremiumValue =
        (this.tivStockReceivable * (this.rateStock * 0.1)) / 1000;
      this.totalPremiumUsdValue =
        (this.tivStockReceivableUsd * (this.rateStock * 0.1)) / 1000;
    },

    onNoCompletedInfo() {
      this.tivStockReceivable = 0;
      this.tivStockReceivableUsd = 0;
      this.totalPremiumValue = 0;
      this.totalPremiumUsdValue = 0;
      this.errors.tivStockReceivable = true;
      this.errors.totalPremium = true;
    },

    async endorsementDateValidation(event, incomingDate) {
      if (Date.parse(incomingDate) >= Date.parse(this.movementEndDate)) {
        this.endorsementDateError = true;
      } else {
        if (this.changeDateEndorsement) {
          await this.changeDateEndorsement(incomingDate);
        }
        this.endorsementDateError = false;
      }
    },

    nextStep() {
      if (this.e1 === 1) {
        this.sent = true;
        let changeStep = true;

        for (const property in this.errors) {
          if (this.errors[property] === true) {
            changeStep = false;
            console.log(`Error en ${property}:`, this.errors[property]);
            break;
          }
        }

        if (changeStep === true) {
          this.e1 = 2;
          this.sent = false;
        } else {
          console.log("No se puede avanzar, hay errores:", this.errors);
        }
      }
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
        if (this.backToCreateEndorsement) {
          this.backToCreateEndorsement();
        }
      } else if (e1 == 2) {
        this.e1 = 1;
      } else if (e1 == 3) {
        this.e1 = 2;
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

    toUsd(value) {
      const exchangeRate = this.accountComplete.deductibles.exchangeRate;
      return Decimal.div(value, exchangeRate).toNumber();
    },

    calcPremium() {
      try {
        const tivMovement = {
          allRisk: this.tivStockReceivable || 0,
          alop: 0,
          stocks: 0,
          allRiskRate: this.rateStock || 2.0,
          alopRate: 0,
          stockRate: 0,
        };

        const dates = {
          effetiveDate: new Date(this.accountComplete.deductibles.inceptionDate)
            .toISOString()
            .substring(0, 10),
          expiryDate: new Date(this.accountComplete.deductibles.expiryDate)
            .toISOString()
            .substring(0, 10),
          endormenteffetiveDate: new Date(this.effectiveDate)
            .toISOString()
            .substring(0, 10),
          movementEndDate: new Date(this.expiryDate || this.movementEndDate)
            .toISOString()
            .substring(0, 10),
        };

        const calcTotalPremium = new netPremiumInclusionRiskEng(
          tivMovement,
          this.accountComplete.deductibles,
          this.accountComplete.tiv?.boundInsurableProp.sluLine,
          false,
          dates
        );

        const totalPremiumResult = calcTotalPremium.calculateTotalPremium();

        const totalPremium = this.admittedPremiumData.find((el) => el.id === 1);
        if (totalPremium) {
          totalPremium.premiumAllRisk =
            totalPremiumResult.allRiskTotalPremium || 0;
          totalPremium.premiumAlop = 0;
          totalPremium.premiumTotal = totalPremiumResult.total || 0;

          totalPremium.sluAllRisk = calcTotalPremium.allRiskPremiumSlu();
          totalPremium.sluAlop = 0;
          totalPremium.sluTotal = calcTotalPremium.totalPremiumSlu();
        }

        const totalPremiumUsd = this.admittedPremiumData.find(
          (el) => el.id === 2
        );
        if (totalPremiumUsd) {
          const exchangeRate =
            this.localAccountComplete?.deductibles?.exchangeRate || 1;
          totalPremiumUsd.premiumAllRisk =
            (totalPremiumResult.allRiskTotalPremium || 0) / exchangeRate;
          totalPremiumUsd.premiumAlop = 0;
          totalPremiumUsd.premiumTotal =
            (totalPremiumResult.total || 0) / exchangeRate;

          totalPremiumUsd.sluAllRisk =
            (totalPremium.sluAllRisk || 0) / exchangeRate;
          totalPremiumUsd.sluAlop = 0;
          totalPremiumUsd.sluTotal =
            (totalPremium.sluTotal || 0) / exchangeRate;
        }

        const netTotal = calcTotalPremium.netSLUExcludingSurveyFeesTotal();

        this.tableData.currency.total_premium.total_premium_movement = (
          totalPremiumResult.total || 0
        ).toFixed(2);
        this.tableData.currency.total_premium.premium_slu = (
          totalPremium.sluTotal || 0
        ).toFixed(2);
        this.tableData.currency.total_premium.net_premium = (
          netTotal || 0
        ).toFixed(2);
        this.tableData.currency.total_premium.total = (
          totalPremiumResult.total || 0
        ).toFixed(2);

        this.tableData.usd.total_premium.total_premium_movement = this.toUsd(
          totalPremiumResult.total || 0
        ).toFixed(2);
        this.tableData.usd.total_premium.premium_slu = this.toUsd(
          totalPremium.sluTotal || 0
        ).toFixed(2);
        this.tableData.usd.total_premium.net_premium = this.toUsd(
          netTotal || 0
        ).toFixed(2);
        this.tableData.usd.total_premium.total = this.toUsd(
          totalPremiumResult.total || 0
        ).toFixed(2);

        console.log("Cálculos completados para ingeniería PMD:", {
          tivMovement,
          totalPremiumResult,
          tableData: this.tableData,
          admittedPremiumData: this.admittedPremiumData,
        });
      } catch (error) {
        console.error("Error en cálculos de ingeniería PMD:", error);

        this.calculateBasicPremium();
      }
    },

    calculateBasicPremium() {
      const stockReceivable = this.tivStockReceivable || 0;
      const rate = this.rateStock || 2.0;
      const sluLine =
        this.localAccountComplete?.tiv?.boundInsurableProp?.sluLine || 20;
      const exchangeRate =
        this.localAccountComplete?.deductibles?.exchangeRate || 1;

      const stockPremium = (stockReceivable * (rate * 0.1)) / 1000;
      const stockPremiumUsd = stockPremium / exchangeRate;
      const sluAmount = (stockPremium * sluLine) / 100;
      const sluAmountUsd = sluAmount / exchangeRate;

      const totalPremium = this.admittedPremiumData.find((el) => el.id === 1);
      if (totalPremium) {
        totalPremium.premiumAllRisk = stockPremium;
        totalPremium.premiumAlop = 0;
        totalPremium.premiumTotal = stockPremium;
        totalPremium.sluAllRisk = sluAmount;
        totalPremium.sluAlop = 0;
        totalPremium.sluTotal = sluAmount;
      }

      const totalPremiumUsd = this.admittedPremiumData.find(
        (el) => el.id === 2
      );
      if (totalPremiumUsd) {
        totalPremiumUsd.premiumAllRisk = stockPremiumUsd;
        totalPremiumUsd.premiumAlop = 0;
        totalPremiumUsd.premiumTotal = stockPremiumUsd;
        totalPremiumUsd.sluAllRisk = sluAmountUsd;
        totalPremiumUsd.sluAlop = 0;
        totalPremiumUsd.sluTotal = sluAmountUsd;
      }

      const netPremium = stockPremium - sluAmount;
      const netPremiumUsd = stockPremiumUsd - sluAmountUsd;

      this.tableData.currency.total_premium = {
        total_premium_movement: stockPremium.toFixed(2),
        premium_slu: sluAmount.toFixed(2),
        net_premium: netPremium.toFixed(2),
        total: stockPremium.toFixed(2),
      };

      this.tableData.usd.total_premium = {
        total_premium_movement: stockPremiumUsd.toFixed(2),
        premium_slu: sluAmountUsd.toFixed(2),
        net_premium: netPremiumUsd.toFixed(2),
        total: stockPremiumUsd.toFixed(2),
      };

      console.log("Cálculos básicos aplicados:", {
        stockPremium,
        sluAmount,
        netPremium,
        tableData: this.tableData,
      });
    },

    generateBasicReportEngineering() {
      const premiumOriginal = this.admittedPremiumData.find(
        (el) => el.id === 1
      );
      const premiumUSD = this.admittedPremiumData.find((el) => el.id === 2);

      const stockReceivable = this.tivStockReceivable || 0;
      const stockReceivableUsd = this.tivStockReceivableUsd || 0;
      const stockPremium = premiumOriginal?.premiumTotal || 0;
      const stockPremiumUsd = premiumUSD?.premiumTotal || 0;
      const sluAmount = premiumOriginal?.sluTotal || 0;
      const sluAmountUsd = premiumUSD?.sluTotal || 0;

      const brokerage =
        (stockPremium *
          (this.localAccountComplete.deductibles.brokerage || 1)) /
        100;
      const taxes =
        (stockPremium * (this.localAccountComplete.deductibles.taxes || 2)) /
        100;
      const eng =
        (stockPremium * (this.localAccountComplete.deductibles.eng || 2)) / 100;
      const fronting =
        (stockPremium * (this.localAccountComplete.deductibles.fronting || 2)) /
        100;
      const colombia =
        (stockPremium *
          (this.localAccountComplete.deductibles.premiumReserve || 1)) /
        100;

      const brokerageUsd =
        brokerage / (this.localAccountComplete.deductibles.exchangeRate || 10);
      const taxesUsd =
        taxes / (this.localAccountComplete.deductibles.exchangeRate || 10);
      const engUsd =
        eng / (this.localAccountComplete.deductibles.exchangeRate || 10);
      const frontingUsd =
        fronting / (this.localAccountComplete.deductibles.exchangeRate || 10);
      const colombiaUsd =
        colombia / (this.localAccountComplete.deductibles.exchangeRate || 10);

      this.endorsmentReporData = {
        cartera: this.cartera,

        totalValues: {
          allRisk: stockReceivable,
          alop: 0,
          stocks: 0,
          total: stockReceivable,
          allRiskUsd: stockReceivableUsd,
          alopUsd: 0,
          stocksUsd: 0,
          totalUsd: stockReceivableUsd,
        },

        movementValues: {
          allRisk: stockReceivable,
          alop: 0,
          stocks: 0,
          total: stockReceivable,
          allRiskUsd: stockReceivableUsd,
          alopUsd: 0,
          stocksUsd: 0,
          totalUsd: stockReceivableUsd,
        },

        premium: {
          allRisk: stockPremium,
          alop: 0,
          stocks: 0,
          totalInsured: stockPremium,
          allRiskRate: this.rateStock || 2.0,
          alopRate: 0,
          stockRate: 0,
          allRiskUsd: stockPremiumUsd,
          alopUsd: 0,
          stocksUsd: 0,
          totalUsd: stockPremiumUsd,
        },

        boundInsurableProp: this.localAccountComplete.tiv?.boundInsurableProp,
        deductibles: this.localAccountComplete.deductibles,

        netPremium: {
          allRiskSluShare: sluAmount,
          allRiskBrokerage: brokerage,
          allRiskTaxes: taxes,
          allRiskEng: eng,
          allRiskFronting: fronting,
          allRiskColombia: colombia,
          allRiskNetSLUExcludingSurveyFees:
            stockPremium -
            sluAmount -
            brokerage -
            taxes -
            eng -
            fronting -
            colombia,

          alopSluShare: 0,
          alopBrokerage: 0,
          alopTaxes: 0,
          alopEng: 0,
          alopFronting: 0,
          alopColombia: 0,
          alopNetSLUExcludingSurveyFees: 0,

          sluShareTotal: sluAmount,
          brokerageTotal: brokerage,
          taxesTotal: taxes,
          engTotal: eng,
          frontingTotal: fronting,
          colombiaTotal: colombia,
          netSLUExcludingSurveyFeesTotal:
            stockPremium -
            sluAmount -
            brokerage -
            taxes -
            eng -
            fronting -
            colombia,
        },

        netPremiumUSD: {
          allRiskSluShare: sluAmountUsd,
          allRiskBrokerage: brokerageUsd,
          allRiskTaxes: taxesUsd,
          allRiskEng: engUsd,
          allRiskFronting: frontingUsd,
          allRiskColombia: colombiaUsd,
          allRiskNetSLUExcludingSurveyFees:
            stockPremiumUsd -
            sluAmountUsd -
            brokerageUsd -
            taxesUsd -
            engUsd -
            frontingUsd -
            colombiaUsd,

          alopSluShare: 0,
          alopBrokerage: 0,
          alopTaxes: 0,
          alopEng: 0,
          alopFronting: 0,
          alopColombia: 0,
          alopNetSLUExcludingSurveyFees: 0,

          sluShareTotal: sluAmountUsd,
          brokerageTotal: brokerageUsd,
          taxesTotal: taxesUsd,
          engTotal: engUsd,
          frontingTotal: frontingUsd,
          colombiaTotal: colombiaUsd,
          netSLUExcludingSurveyFeesTotal:
            stockPremiumUsd -
            sluAmountUsd -
            brokerageUsd -
            taxesUsd -
            engUsd -
            frontingUsd -
            colombiaUsd,
        },
      };

      console.log(
        "Reporte básico de ingeniería generado:",
        this.endorsmentReporData
      );
    },

    setTotalPremium({ id, value, concept }) {
      const totalPremium = this.totalPremium2.find((el) => el.id === id);
      totalPremium[concept] = value;

      if ((concept !== "premiumTotal") & (concept !== "sluTotal")) {
        this.isEdited[concept] = true;
      }
    },

    onChangeStockResult(event) {
      console.log(event);
      this.resultspremiumUSD.stocks = event / 25;
      this.resultspremium.total =
        this.resultspremium.damage +
        this.resultspremium.bi +
        this.resultspremium.stocks;
      this.resultspremiumUSD.total =
        this.resultspremiumUSD.damage +
        this.resultspremiumUSD.bi +
        this.resultspremiumUSD.stocks;
    },

    changeHandler(id, value, concept) {},

    calcualteTotalPremiumMoments() {},
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
      console.log("loading file");
    },
    async updateFile(data) {
      console.log("update file");
    },

    setEndorsementDocuments({ files }) {
      this.endorsementDocuments = files;
    },

    async submit() {
      try {
        const tivTotal = this.detailValues.find((el) => el.id === 1);
        const tivTotalUsd = this.detailValues.find((el) => el.id === 2);

        const tivUpdate = {
          insurable: {
            allRisk: tivTotal.premiumAllRisk,
            alop: tivTotal.premiumAlop,
            total: tivTotal.premiumTotal,
            allRiskUsd: tivTotalUsd.premiumAllRisk,
            alopUsd: tivTotalUsd.premiumAlop,
            totalUsd: tivTotalUsd.premiumTotal,
            stock: this.tivStockReceivable || 0,
            stockUsd: this.tivStockReceivableUsd || 0,
          },
          premium: {
            allRiskRate: this.localAccountComplete.tiv.premium.allRiskRate,
            alopRate: this.localAccountComplete.tiv.premium.alopRate,
            stockRate: this.localAccountComplete.tiv.premium.stockRate || 0,
          },
          boundInsurableProp: {
            ...this.localAccountComplete.tiv?.boundInsurableProp,
            sluLine:
              this.sharePorcent ||
              this.localAccountComplete.tiv?.boundInsurableProp.sluLine,
          },
        };

        const accountCompleteResponse =
          await AccountCompleteService.addAccountComplete(this.subscriptionId, {
            deductibles: this.localAccountComplete.deductibles,
            tiv: tivUpdate,
            netPremium: {
              originalValues: {
                netSluExcludingSurveyFeesTotal:
                  this.localAccountComplete.net_premium.originalValues
                    .netSluExcludingSurveyFeesTotal,
              },
            },
            cartera: {
              ...this.localAccountComplete.cartera,
              ...this.cartera,
              admitedPremium: this.admitedPremium,
            },
          });

        const userId = this.$store.state.auth.user.id;

        if (!userId) {
          console.error("User ID not found in store");
          throw new Error("User ID is required");
        }

        //guardar registro del endoso
        await EndorsementService.addEndorsment({
          subscriptionId: this.subscriptionId,
          endorsmentType: 13,
          idUser: userId,
          accountId: accountCompleteResponse.id,
          effectiveDate: this.effectiveDate,
          report: {
            endorsmentReporData: {
              ...this.endorsmentReporData,
              additionalInfo: {},
            },
            cartera: {
              ...this.localAccountComplete.cartera,
              ...this.cartera,
              admitedPremium: this.admitedPremium,
            },
          },
          files: this.endorsementDocuments,
        });

        await this.backToCreateEndorsement();
      } catch (error) {
        console.error("Error submitting endorsement:", error);
      }
    },

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
  },

  watch: {
    e1: async function () {
      if (this.e1 === 1) {
        this.buttonTitle = "Next";
        this.buttonTitleBack = "Cancel";
        this.isEdited = {};
      }
      if (this.e1 === 2) {
        this.buttonTitle = "Next";
        this.buttonTitleBack = "Return";

        this.calcPremium();

        if (this.tivStockReceivable > 0) {
          this.initializeTotalPremium();
        }
      }
      if (this.e1 === 3) {
        this.buttonTitle = "Finalize";
        this.buttonTitleBack = "Return";

        const premiumOriginal = this.admittedPremiumData.find(
          (el) => el.id === 1
        );
        const premiumUSD = this.admittedPremiumData.find((el) => el.id === 2);

        const tivMovement = {
          allRisk: this.tivStockReceivable || 0,
          alop: 0,
          stocks: 0,
          allRiskRate: this.rateStock || 2.0,
          alopRate: 0,
          stockRate: 0,
        };

        const dates = {
          effetiveDate: new Date(
            this.localAccountComplete.deductibles.inceptionDate
          )
            .toISOString()
            .substring(0, 10),
          expiryDate: new Date(this.localAccountComplete.deductibles.expiryDate)
            .toISOString()
            .substring(0, 10),
          endormenteffetiveDate: new Date(this.effectiveDate),
          movementEndDate: new Date(this.movementEndDate),
        };

        const options = {
          isEdited: this.isEdited,
          dataEdited: {
            premiumAllRisk: premiumOriginal?.premiumAllRisk || 0,
            premiumAlop: premiumOriginal?.premiumAlop || 0,
            sluAllRisk: premiumOriginal?.sluAllRisk || 0,
            sluAlop: premiumOriginal?.sluAlop || 0,
          },
        };

        const sluLine =
          this.localAccountComplete.tiv?.boundInsurableProp.sluLine;

        try {
          const resultOriginalCurrency = await netPremiumInclusionRiskAutoCalcs(
            tivMovement,
            this.localAccountComplete.deductibles,
            sluLine,
            false,
            dates,
            options
          );

          const resultUSD = await netPremiumInclusionRiskAutoCalcs(
            tivMovement,
            this.localAccountComplete.deductibles,
            sluLine,
            true,
            dates,
            options
          );

          const premiumPaymentDate = new Date(
            this.premiumPaymentDate
          ).toISOString();
          const clause = this.clause;

          this.cartera = {
            premiumPaymentDate,
            clausula: clause,
          };

          const stockReceivable = this.tivStockReceivable || 0;
          const stockReceivableUsd = this.tivStockReceivableUsd || 0;
          const stockPremium = premiumOriginal?.premiumTotal || 0;
          const stockPremiumUsd = premiumUSD?.premiumTotal || 0;

          const endorsmentReporData = {
            cartera: this.cartera,

            totalValues: {
              allRisk: stockReceivable,
              alop: 0,
              stocks: 0,
              total: stockReceivable,
              allRiskUsd: stockReceivableUsd,
              alopUsd: 0,
              stocksUsd: 0,
              totalUsd: stockReceivableUsd,
            },

            movementValues: {
              allRisk: stockReceivable,
              alop: 0,
              stocks: 0,
              total: stockReceivable,
              allRiskUsd: stockReceivableUsd,
              alopUsd: 0,
              stocksUsd: 0,
              totalUsd: stockReceivableUsd,
            },

            premium: {
              allRisk: stockPremium,
              alop: 0,
              stocks: 0,
              totalInsured: stockPremium,
              allRiskRate: this.rateStock || 2.0,
              alopRate: 0,
              stockRate: 0,
              allRiskUsd: stockPremiumUsd,
              alopUsd: 0,
              stocksUsd: 0,
              totalUsd: stockPremiumUsd,
            },

            boundInsurableProp:
              this.localAccountComplete.tiv?.boundInsurableProp,
            deductibles: this.localAccountComplete.deductibles,

            netPremium: {
              allRiskSluShare:
                resultOriginalCurrency.data.allRiskPremiumSlu || 0,
              allRiskBrokerage:
                resultOriginalCurrency.data.allRiskBrokerage || 0,
              allRiskTaxes: resultOriginalCurrency.data.allRiskTaxes || 0,
              allRiskEng: resultOriginalCurrency.data.allRiskEng || 0,
              allRiskFronting: resultOriginalCurrency.data.allRiskFronting || 0,
              allRiskColombia: resultOriginalCurrency.data.allRiskColombia || 0,
              allRiskNetSLUExcludingSurveyFees:
                resultOriginalCurrency.data.allRiskNetSLUExcludingSurveyFees ||
                0,

              alopSluShare: 0,
              alopBrokerage: 0,
              alopTaxes: 0,
              alopEng: 0,
              alopFronting: 0,
              alopColombia: 0,
              alopNetSLUExcludingSurveyFees: 0,

              sluShareTotal: resultOriginalCurrency.data.totalPremiumSlu || 0,
              brokerageTotal: resultOriginalCurrency.data.brokerageTotal || 0,
              taxesTotal: resultOriginalCurrency.data.taxesTotal || 0,
              engTotal: resultOriginalCurrency.data.engTotal || 0,
              frontingTotal: resultOriginalCurrency.data.frontingTotal || 0,
              colombiaTotal: resultOriginalCurrency.data.colombiaTotal || 0,
              netSLUExcludingSurveyFeesTotal:
                resultOriginalCurrency.data.netSLUExcludingSurveyFeesTotal || 0,
            },

            netPremiumUSD: {
              allRiskSluShare: resultUSD.data.allRiskPremiumSlu || 0,
              allRiskBrokerage: resultUSD.data.allRiskBrokerage || 0,
              allRiskTaxes: resultUSD.data.allRiskTaxes || 0,
              allRiskEng: resultUSD.data.allRiskEng || 0,
              allRiskFronting: resultUSD.data.allRiskFronting || 0,
              allRiskColombia: resultUSD.data.allRiskColombia || 0,
              allRiskNetSLUExcludingSurveyFees:
                resultUSD.data.allRiskNetSLUExcludingSurveyFees || 0,

              alopSluShare: 0,
              alopBrokerage: 0,
              alopTaxes: 0,
              alopEng: 0,
              alopFronting: 0,
              alopColombia: 0,
              alopNetSLUExcludingSurveyFees: 0,

              sluShareTotal: resultUSD.data.totalPremiumSlu || 0,
              brokerageTotal: resultUSD.data.brokerageTotal || 0,
              taxesTotal: resultUSD.data.taxesTotal || 0,
              engTotal: resultUSD.data.engTotal || 0,
              frontingTotal: resultUSD.data.frontingTotal || 0,
              colombiaTotal: resultUSD.data.colombiaTotal || 0,
              netSLUExcludingSurveyFeesTotal:
                resultUSD.data.netSLUExcludingSurveyFeesTotal || 0,
            },
          };

          this.endorsmentReporData = endorsmentReporData;

          console.log(
            "Reporte generado para ingeniería con mapeo correcto:",
            this.endorsmentReporData
          );

          try {
            const fileLink = await EndorsementService.getEndorsmentReport({
              subscriptionId: this.subscriptionId,
              endorsmentType: 13,
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
          } catch (error) {
            console.error("Error generating endorsement report:", error);
            const file = this.files.find((file) => file.fileId === 1);
            if (file) {
              file.error = true;
            }
          }
        } catch (error) {
          console.error("Error en cálculos finales de ingeniería:", error);

          this.generateBasicReportEngineering();
        }
      }
    },
    stockInputValue() {
      this.stockPercentagePMDValue = this.stockPercentagePMD;
      this.stockPercentagePMDUsdValue = this.stockPercentagePMDUsd;
    },
    "localAccountComplete.deductibles.exchangeRate": {
      handler(newRate) {
        if (newRate) {
          this.stockInputValueUsd = this.getStockUsdValue();
          this.stockPercentagePMDUsdValue = this.stockPercentagePMDUsd;
        }
      },
    },
  },
};
</script>
<style lang="less" scoped>
.endorsement-title {
  font-weight: 800;
  font-size: 20px;
  margin-bottom: 10px;
  color: #333;
}

.editAccount {
  width: auto;
  color: #f59607;
  font-weight: 600;
  font-size: 19px;
  margin-bottom: 20px;
}

.endorsement-wrapper {
  width: 100%;
  height: auto;
  border-radius: 5px;
  background: white;
  margin-top: 20px;
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

.dates-header-section {
  margin-bottom: 25px;
  padding: 20px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background-color: #fafafa;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.basic-info-section {
  margin-bottom: 30px;
  padding: 15px;
  border: 1px solid #e8e8e8;
  border-radius: 8px;
  background-color: #fdfdfd;

  .input-row {
    gap: 20px;

    .input-col {
      flex: 1;
      min-width: 200px;
    }
  }
}

.section-title {
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 15px;
  color: #333;
  border-bottom: 2px solid #f59607;
  padding-bottom: 5px;
  display: flex;
  align-items: center;

  &::before {
    content: "";
    width: 4px;
    height: 20px;
    background-color: #f59607;
    margin-right: 10px;
    border-radius: 2px;
  }
}

.total-values-section,
.tiv-section {
  margin-bottom: 30px;

  .values-table-container {
    border: 1px solid #ddd;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    background: white;
  }

  .values-table {
    width: 100%;
    border-collapse: collapse;

    thead tr.header-row {
      background: linear-gradient(135deg, #547fa9 0%, #4a6f96 100%);
      color: white;
    }

    th.label-header,
    th.value-header {
      padding: 15px 12px;
      text-align: center;
      font-weight: 600;
      font-size: 14px;
      border-right: 1px solid rgba(255, 255, 255, 0.2);
      text-transform: uppercase;
      letter-spacing: 0.5px;

      &:last-child {
        border-right: none;
      }
    }

    th.label-header {
      width: 40%;
      text-align: left;
      background: linear-gradient(135deg, #547fa9 0%, #4a6f96 100%);
    }

    th.value-header {
      width: 30%;
      background: linear-gradient(135deg, #547fa9 0%, #4a6f96 100%);
    }

    tbody tr {
      border-bottom: 1px solid #eee;
      transition: background-color 0.2s ease;

      &:last-child {
        border-bottom: none;
      }

      &:hover {
        background-color: #f8f9fa;
      }

      &:nth-child(even) {
        background-color: #fafbfc;
      }
    }

    td.label-cell {
      padding: 15px 12px;
      background-color: #f8f9fa;
      font-weight: 600;
      border-right: 1px solid #ddd;
      width: 40%;
      color: #495057;
      position: relative;

      &::after {
        content: "";
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        width: 3px;
        background-color: #f59607;
      }
    }

    td.value-cell {
      padding: 8px 12px;
      border-right: 1px solid #ddd;
      width: 30%;
      vertical-align: middle;

      &:last-child {
        border-right: none;
      }

      .v-input {
        margin: 0;
        padding: 0;
      }

      .v-text-field {
        margin-top: 0;
        padding-top: 0;

        .v-input__control {
          min-height: 36px;
        }

        .v-text-field__details {
          display: none;
        }
      }
    }
  }
}

.reported-values-section {
  margin-bottom: 30px;

  .period-selector {
    margin-bottom: 20px;
    max-width: 400px;
  }

  .period-table-container {
    border: 1px solid #ddd;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    background: white;
  }

  .period-table {
    width: 100%;
    border-collapse: collapse;

    thead tr.table-header {
      background: linear-gradient(135deg, #547fa9 0%, #4a6f96 100%);
      color: white;
    }

    th.month-header,
    th.value-header {
      padding: 15px 12px;
      text-align: center;
      font-weight: 600;
      font-size: 14px;
      border-right: 1px solid rgba(255, 255, 255, 0.2);
      text-transform: uppercase;
      letter-spacing: 0.5px;

      &:last-child {
        border-right: none;
      }
    }

    th.month-header {
      width: 25%;
      text-align: left;
    }

    th.value-header {
      width: 37.5%;
    }

    tbody tr.table-row {
      border-bottom: 1px solid #eee;
      transition: background-color 0.2s ease;

      &:hover {
        background-color: #f8f9fa;
      }

      &:nth-child(even) {
        background-color: #fafbfc;
      }

      &.average-row {
        background: linear-gradient(135deg, #e9ecef 0%, #dee2e6 100%);
        font-weight: 600;
        border-top: 2px solid #f59607;

        &:hover {
          background: linear-gradient(135deg, #dee2e6 0%, #d1d5db 100%);
        }
      }
    }

    td.month-cell {
      padding: 12px;
      background-color: #f8f9fa;
      font-weight: 500;
      border-right: 1px solid #ddd;
      width: 25%;
      color: #495057;
      position: relative;

      &::after {
        content: "";
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        width: 3px;
        background-color: #f59607;
      }
    }

    td.average-cell {
      padding: 12px;
      background: linear-gradient(135deg, #e9ecef 0%, #dee2e6 100%);
      font-weight: 600;
      border-right: 1px solid #ddd;
      width: 25%;
      color: #495057;
      position: relative;

      &::after {
        content: "";
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        width: 3px;
        background-color: #28a745;
      }
    }

    td.input-cell {
      padding: 6px 8px;
      border-right: 1px solid #ddd;
      width: 37.5%;
      vertical-align: middle;

      &:last-child {
        border-right: none;
      }

      .v-input {
        margin: 0;
        padding: 0;
      }

      .v-text-field {
        margin-top: 0;
        padding-top: 0;

        .v-input__control {
          min-height: 32px;
        }

        .v-text-field__details {
          display: none;
        }
      }
    }
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
    background: linear-gradient(135deg, #003d6d 0%, #002a4d 100%);
    font-size: 15px;
    font-weight: 500;
    letter-spacing: normal;
    text-transform: capitalize;
    transition: all 0.3s ease;
    box-shadow: 0 2px 4px rgba(0, 61, 109, 0.3);

    &:hover {
      background: linear-gradient(135deg, #002a4d 0%, #001a2d 100%);
      box-shadow: 0 4px 8px rgba(0, 61, 109, 0.4);
      transform: translateY(-1px);
    }
  }

  .clear-btn {
    width: 200px;
    height: 35px;
    border: 2px solid #003d6d;
    color: #003d6d;
    background: transparent;
    transition: all 0.3s ease;

    &:hover {
      background: #003d6d;
      color: white;
      transform: translateY(-1px);
    }
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
}

.input-row {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-content: center;
  align-items: flex-end;
  justify-content: flex-start;
  gap: 15px;
  margin-bottom: 20px;
}

.input-col {
  width: 20%;
  display: block;
  margin-right: 30px;
  min-width: 200px;

  @media (max-width: 1200px) {
    width: 30%;
  }

  @media (max-width: 768px) {
    width: 100%;
    margin-right: 0;
    margin-bottom: 15px;
  }
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
  font-size: 18px;
  font-weight: 700;
  margin: 15px 0 10px 0;
  color: #495057;

  &:first-child {
    margin-top: 0;
  }
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
  font-size: 14px;
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
  background: #ccc;
}

.v-stepper__header {
  justify-content: center;
  box-shadow: none;
  margin-bottom: 20px;
}

.v-stepper__items {
  width: 100%;
}

.theme--light.v-stepper {
  background: transparent;
}

.error-message {
  font-size: 12px;
  color: #dc3545;
  margin-top: 4px;
  font-weight: 500;
  display: flex;
  align-items: center;

  &::before {
    content: "⚠";
    margin-right: 4px;
    font-size: 14px;
  }
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

.catalog-select {
  width: 25%;
  min-width: 200px;

  @media (max-width: 768px) {
    width: 100%;
  }
}

.container-rows-periods {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px solid #eee;

  &:last-child {
    border-bottom: none;
  }

  .input-name-period {
    width: 15%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    font-weight: 500;
    color: #495057;
  }

  .input-name-period-subtitle {
    width: 20%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    font-weight: 600;
    font-family: avenir;
    margin-right: 30px;
    color: #495057;
    background-color: #f8f9fa;
    padding: 8px 12px;
    border-radius: 4px;
  }

  .input-name-period-subtitle-month {
    width: 15%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    font-weight: 600;
    font-family: avenir;
    color: #495057;
    background-color: #f8f9fa;
    padding: 8px 12px;
    border-radius: 4px;
  }
}

@media (max-width: 1200px) {
  .basic-info-section .input-row {
    .input-col {
      width: calc(50% - 10px);
      margin-right: 20px;

      &:nth-child(even) {
        margin-right: 0;
      }

      &:nth-child(3) {
        width: 100%;
        margin-right: 0;
        margin-top: 15px;
      }
    }
  }
}

@media (max-width: 768px) {
  .endorsement-title {
    font-size: 18px;
    text-align: center;
  }

  .basic-info-section .input-row {
    flex-direction: column;
    gap: 15px;

    .input-col {
      width: 100%;
      margin-right: 0;
    }
  }

  .dates-header-section {
    padding: 15px;

    .input-row {
      flex-direction: column;
      gap: 15px;
    }
  }

  .values-table-container,
  .period-table-container {
    overflow-x: auto;

    table {
      min-width: 600px;
    }
  }

  .section-title {
    font-size: 16px;
    text-align: center;
  }

  .input-col {
    width: 100%;
    margin-right: 0;
    margin-bottom: 15px;
  }

  .catalog-select {
    width: 100%;
  }

  .stepper-btn {
    .blue-btn,
    .clear-btn {
      width: 100%;
      margin-bottom: 10px;
    }
  }
}

@media (max-width: 480px) {
  .endorsement-wrapper {
    padding: 0 10px;
  }

  .dates-header-section,
  .basic-info-section {
    padding: 10px;
    margin-bottom: 15px;
  }

  .section-title {
    font-size: 14px;
    margin-bottom: 10px;
  }

  .inner-title {
    font-size: 16px;
    margin: 10px 0 5px 0;
  }

  th.label-header,
  th.value-header,
  th.month-header,
  td.label-cell,
  td.month-cell,
  td.average-cell {
    padding: 8px 6px;
    font-size: 12px;
  }

  td.input-cell {
    padding: 4px 6px;
  }
}

.currency-input {
  .v-text-field--dense .v-text-field__details {
    display: none;
  }

  .v-input--dense .v-input__control {
    min-height: 36px;
  }

  &.v-text-field--outlined {
    .v-input__control {
      border-radius: 4px;
    }
  }
}

.field-label {
  display: block;
  font-weight: 600;
  margin-bottom: 5px;
  color: #495057;
  font-size: 14px;
}

.v-text-field--outlined {
  .v-input__control {
    border-radius: 6px;
  }

  &.v-input--dense {
    .v-input__control {
      min-height: 40px;
    }
  }
}

.v-select--outlined,
.v-autocomplete--outlined {
  .v-input__control {
    border-radius: 6px;
  }
}

.loading-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
}

.success-message {
  color: #28a745;
  font-weight: 600;
  display: flex;
  align-items: center;

  &::before {
    content: "✓";
    margin-right: 4px;
    font-size: 16px;
  }
}
.report-complete {
  overflow: auto;
}
</style>
