<template>
  <div class="outter-wrapper">
    <div class="endorsement-title">Change of technical conditions</div>

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
          Endorsement summary
        </v-stepper-step>
      </v-stepper-header>

      <div class="endorsement-wrapper">
        <div class="content">
          <v-stepper-items>
            <v-stepper-content step="1" class="step-one">
              <div class="input-row w-100 d-flex flex-wrap">
                <div class="input-col">
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
                          v-bind="attrs"
                          v-on="on"
                        >
                        </v-text-field>
                      </template>

                      <v-date-picker
                        v-model="effectiveDate"
                        @input="menu2 = false"
                        @change="endDateValidation($event, effectiveDate)"
                      >
                      </v-date-picker>
                    </v-menu>

                    <div v-if="this.endDateError" class="error-message">
                      The new Endorsement effective date must be lower than
                      expiry date.
                    </div>

                    <div v-if="!showInfoEndorsement" class="error-message">
                      Please provide a valid endorsement effective date.
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
                          v-model="expiryDateReal"
                          label="Expiry date"
                          disabled
                          v-bind="attrs"
                          v-on="on"
                        >
                        </v-text-field>
                      </template>
                    </v-menu>
                  </div>
                </div>

                <InputDaysDiference
                  :endorsementDate="effectiveDate"
                  :expiryDate="expiryDatetoCalc"
                  :key="effectiveDate"
                />
              </div>

              <div v-if="showInfoEndorsement">
                <!-- Sección de Deducibles -->
                <div class="technical-conditions-section">
                  <div class="section-title">
                    <v-icon class="mr-2">mdi-shield-outline</v-icon>
                    Current Deductibles
                    <span class="highlight-info"
                      >(Changes will be highlighted)</span
                    >
                  </div>

                  <div v-if="quotationType == 1">
                    <div
                      v-for="(
                        deductibles, index
                      ) in technicalConditions.deductibles"
                      :key="deductibles.UnderlyingCatDeductibles.id"
                      :class="{
                        'highlighted-item': isDeductibleModified(
                          deductibles.UnderlyingCatDeductibles.id
                        ),
                      }"
                    >
                      <DeductiblesQuotatorProportional
                        :deductibles="deductibles"
                        @setTechnicalConditionsUpdate="
                          setTechnicalConditionsUpdate
                        "
                        @deleteThisDeductibleLocation="
                          deleteThisDeductibleLocation
                        "
                        :deductibleIndex="index"
                        :isHighlighted="
                          isDeductibleModified(
                            deductibles.UnderlyingCatDeductibles.id
                          )
                        "
                      />
                    </div>

                    <div class="ButtonCont">
                      <v-btn class="Btn" text rounded @click="addNewDeductible">
                        <v-icon class="mr-2"> mdi-plus-circle </v-icon>
                        Add New Location
                      </v-btn>
                    </div>
                  </div>

                  <div v-if="quotationType == 2">
                    <div
                      v-for="(
                        deductibles, index
                      ) in technicalConditions.deductibles"
                      :key="deductibles.underlyingCatDeductibles.id"
                      :class="{
                        'highlighted-item': isDeductibleModified(
                          deductibles.underlyingCatDeductibles.id
                        ),
                      }"
                    >
                      <DeductiblesQuotatorNonProportional
                        :deductibles="deductibles"
                        @setTechnicalConditionsUpdate="
                          setTechnicalConditionsUpdate
                        "
                        @deleteThisDeductibleLocationNonProp="
                          deleteThisDeductibleLocationNonProp
                        "
                        :deductibleIndex="index"
                        :isHighlighted="
                          isDeductibleModified(
                            deductibles.underlyingCatDeductibles.id
                          )
                        "
                      />
                    </div>

                    <div class="ButtonCont">
                      <v-btn
                        class="Btn"
                        text
                        rounded
                        @click="addNewDeductibleNonProp"
                      >
                        <v-icon class="mr-2"> mdi-plus-circle </v-icon>
                        Add New Location
                      </v-btn>
                    </div>
                  </div>
                </div>

                <!-- Sección de Sublímites -->
                <div class="technical-conditions-section">
                  <div class="section-title">
                    <v-icon class="mr-2">mdi-format-list-numbered</v-icon>
                    Current Sublimits
                    <span class="highlight-info"
                      >(Changes will be highlighted)</span
                    >
                  </div>

                  <div
                    v-for="(sublime, index) in technicalConditions.sublime"
                    :key="index"
                    :class="{
                      'highlighted-item': isSublimeModified(
                        sublime.catSublimes.id
                      ),
                    }"
                  >
                    <SublimesQuotatorProportional
                      v-if="quotationType == 1"
                      :exchangeRate="accountComplete.deductibles.exchangeRate"
                      :sublime="sublime"
                      @setTechnicalConditionsUpdate="
                        setTechnicalConditionsUpdate
                      "
                      @deleteThisSublimeLocation="deleteThisSublimeLocation"
                      :isHighlighted="isSublimeModified(sublime.catSublimes.id)"
                    />
                    <SublimesQuotatorNonProportional
                      v-if="quotationType == 2"
                      :exchangeRate="accountComplete.deductibles.exchangeRate"
                      :sublime="sublime"
                      @setTechnicalConditionsUpdate="
                        setTechnicalConditionsUpdate
                      "
                      @deleteThisSublimeLocation="deleteThisSublimeLocation"
                      :sublimeIndex="index"
                      :isHighlighted="isSublimeModified(sublime.catSublimes.id)"
                    />
                  </div>

                  <div class="ButtonCont">
                    <v-btn class="Btn" text rounded @click="addNewSublime">
                      <v-icon class="mr-2"> mdi-plus-circle </v-icon>
                      Add New Location
                    </v-btn>
                  </div>
                </div>
              </div>

              <div class="input-row w-100 d-flex flex-wrap">
                <div class="input-col">
                  <div class="inner-title">Additional</div>
                  <div class="input-cont">
                    <v-autocomplete
                      label="Clause"
                      v-model="clause"
                      :items="clauseList"
                      item-value="clause"
                      item-text="clause"
                    />
                  </div>
                  <div v-if="!clause" class="error-message">
                    Please select a clause.
                  </div>
                </div>
                <div class="input-col">
                  <div class="inner-title" style="opacity: 0">|</div>
                  <div class="input-cont">
                    <v-menu
                      v-model="menu3"
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
                          v-bind="attrs"
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        v-model="premiumPaymentDate"
                        @input="menu3 = false"
                      ></v-date-picker>
                    </v-menu>
                  </div>
                </div>
              </div>
            </v-stepper-content>

            <v-stepper-content step="2">
              <div class="detail-date">
                <div class="table-title-detail table-title-detail--large">
                  Admitted Premium Details
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

              <!-- Solo mostrar tabla de prima admitida -->
              <AdmittedPremiumTable
                @setTotalPremium="setTotalPremium"
                :detailValues="totalPremium"
                :exchangeRate="accountComplete.deductibles.exchangeRate"
              />
            </v-stepper-content>

            <v-stepper-content step="3">
              <div class="inner-title">Endorsement Report</div>
              <div v-if="cleanReport && cleanReport.endorsmentReporData">
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
      <!-- <DocumentsEndorsement v-if="e1 == 1 || e1 == 3" /> -->
      <EndorsementDocuments
        @setEndorsementDocuments="setEndorsementDocuments"
        v-show="e1 == 1 || e1 == 3"
      />

      <div
        v-if="e1 == 1"
        class="stepper-btn mt-7 mb-3 d-flex justify-end align-center"
      >
        <v-btn
          outlined
          rounded
          large
          class="clear-btn"
          color="#003D6D"
          @click="activarVistaDatos()"
          :disabled="validationFirstStep"
        >
          Next
        </v-btn>
      </div>
      <div
        v-if="e1 == 2"
        class="stepper-btn mt-7 mb-3 d-flex justify-end align-center"
      >
        <v-btn
          rounded
          large
          outlined
          class="clear-btn"
          color="#003D6D"
          @click="goStep3"
        >
          Next
        </v-btn>
      </div>
      <div
        v-if="e1 == 1"
        class="stepper-btn mb-7 d-flex justify-end align-center"
      >
        <v-btn
          rounded
          large
          text
          class="blue-btn"
          @click="backToCreateEndorsement"
        >
          Cancel
        </v-btn>
      </div>
      <div
        v-if="e1 == 2"
        class="stepper-btn mb-7 d-flex justify-end align-center"
      >
        <v-btn rounded large text class="blue-btn" @click="e1 = 1">
          Return
        </v-btn>
      </div>
      <div
        v-if="e1 == 3"
        class="stepper-btn mt-7 mb-3 d-flex justify-end align-center"
      >
        <v-btn rounded large text class="blue-btn" @click="submit()">
          Finalize
        </v-btn>
      </div>
      <div v-if="e1 == 3" class="stepper-btn d-flex justify-end align-center">
        <v-btn rounded large text class="blue-btn" @click="e1 = 2">
          Return
        </v-btn>
      </div>
    </v-stepper>
  </div>
</template>
<script>
/* components */
import AppFile from "../../components/AppFile.vue";
import MovementValues from "./MovementValues.vue";
import DocumentsEndorsement from "../../components/DocumentsEndorsement.vue";
import CurrencyInput from "@/components/CurrencyInput/CurrencyInput.vue";
import InputDaysDiference from "../../components/DaysDiference.vue";
import AdmittedPremiumTable from "../../components/AdmittedPremiumTable.vue";
import EndorsementDocuments from "../../components/EndorsementDocuments.vue";
import DeductiblesQuotatorProportional from "../../components/DeductiblesQuotatorProportional.vue";
import SublimesQuotatorProportional from "../../components/SublimesQuotatorProportional.vue";
import DeductiblesQuotatorNonProportional from "../../components/DeductiblesQuotatorNonProportional.vue";
import SublimesQuotatorNonProportional from "../../components/SublimesQuotatorNonProportional.vue";
import EndorsementReportCompleteTable from "./EndorsementReportCompleteTable.vue";
/* services */
import { getFiles } from "../../services/mock-files.service";
import netPremiumPRO from "../services/netpremium.service";
import {
  netPremiumInclusionRisk,
  netPremiumInclusionRiskAutoCalcs,
} from "../class/netPremiumInclusionRisk";
import EndorsementService from "../../services/endorsement.service";
import AccountCompleteService from "@/modules/home/services/account-complete.service";
import PaymentService from "@/modules/home/services/payments.service";
import SubscriptionService from "@/modules/home/services/subscription.service";

/* libs */
import Decimal from "@/lib/decimal";
import _ from "lodash";
/* utils */
import { removeDollarSign } from "../utils";
import { formatCurrency } from "../../utils";

export default {
  name: "ChangeOfTechnicalConditions",
  components: {
    AppFile,
    MovementValues,
    DocumentsEndorsement,
    CurrencyInput,
    InputDaysDiference,
    AdmittedPremiumTable,
    EndorsementDocuments,
    DeductiblesQuotatorProportional,
    SublimesQuotatorProportional,
    DeductiblesQuotatorNonProportional,
    SublimesQuotatorNonProportional,
    EndorsementReportCompleteTable,
  },
  props: {
    type: { type: String, default: "Change of Technical Conditions" },
    backToCreateEndorsement: {
      type: Function,
    },
    accountComplete: { type: Object },
    changeDateEndorsement: {
      type: Function,
    },
    dateSaved: { type: String },
    showInfoEndorsement: { type: Boolean },
  },
  data() {
    const deductibles = this.accountComplete?.deductibles || {};
    const expiryDateReal = deductibles.expiryDate
      ? new Date(deductibles.expiryDate).toISOString().substr(0, 10)
      : "";
    const technicalConditions =
      this.accountComplete?.technical_conditions || {
        deductibles: [],
        sublime: [],
      };

    return {
      expiryDatetoCalc: deductibles.expiryDate || null,
      expiryDateReal,
      menu3: false,
      menu4: false,
      clause: this.accountComplete?.cartera?.clausula || "",
      clauseList: [],
      cartera: {},
      premiumPaymentDate: new Date().toISOString().substr(0, 10),
      on: true,

      movementValues: [],
      netPremium: {},
      subscriptionId: this.$route.params.id,
      e1: 1,
      menu: false,
      menu2: false,
      effectiveDate: this.dateSaved,
      expiryDate: new Date(
        Date.now() + 31540000000 - new Date().getTimezoneOffset() * 60000
      )
        .toISOString()
        .substr(0, 10),
      admitedPremium: 0,
      files: [
        {
          fileId: 1,
          fileName: "Report Inclusion Risk",
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
      insurable: [],
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
      currentMovementEndDate: new Date(
        Date.now() - new Date().getTimezoneOffset() * 60000
      )
        .toISOString()
        .substr(0, 10),
      effectiveDateError: false,
      endDateError: false,
      premiumPaymentDateError: true,
      endorsmentReporData: {},
      isEdited: {},
      quotationType: 0,
      item: {
        location: "",
        volcanic_eruption: "",
        total_volcanic: "",
        minimum_volcanic: 0,
        maximum_volcanic: 0,
        hidrometeorological: "",
        total_hidrometeorological: "",
        minimum_hidrometeorological: 0,
        maximum_hidrometeorological: 0,
        sublimits1: "",
        sublimits_value1: 0,
        sublimits2: "",
        sublimits_value2: 0,
      },
      deductibleIndex: 0,
      deductibleId: 1,
      sublimeIndex: 1,
      technicalConditions,
      technicalConditionsUpdate: _.cloneDeep(technicalConditions),
      originalTechnicalConditions: {},
      modifiedDeductibles: new Set(),
      modifiedSublimes: new Set(),
    };
  },
  async beforeMount() {
    this.clauseList = await PaymentService.getClauses();
    if (this.accountComplete?.id_subscription) {
      this.quotationType =
        await SubscriptionService.getTypeQuotationBySubscription(
          this.accountComplete.id_subscription
        );
    }
  },
  created() {
    // console.log('this.technicalConditions --->', this.technicalConditions);

    // llenamos los valores del segundo paso del endoso
    const tiv = this.accountComplete?.tiv;
    if (tiv?.insurable) {
      this.detailValues[0]["premiumDamage"] = tiv.insurable.propertyDamage;
      this.detailValues[0]["premiumBi"] = tiv.insurable.businessInterruption;
      this.detailValues[0]["premiumStocks"] = tiv.insurable.stock;
      this.detailValues[0]["premiumTotal"] = tiv.insurable.total;

      this.detailValues[1]["premiumDamage"] = tiv.insurable.propertyDamageUsd;
      this.detailValues[1]["premiumBi"] = tiv.insurable.businessInterruptionUsd;
      this.detailValues[1]["premiumStocks"] = tiv.insurable.stockUsd;
      this.detailValues[1]["premiumTotal"] = tiv.insurable.totalUsd;
    }

    console.log("this.accountComplete --->", this.accountComplete);

    this.deductibleIndex = this.technicalConditions.deductibles.length;
    this.initializeChangeTracking();
  },
  watch: {
    accountComplete: {
      immediate: true,
      handler(newVal) {
        const deductibles = newVal?.deductibles || {};

        this.expiryDatetoCalc = deductibles.expiryDate || null;
        this.expiryDateReal = deductibles.expiryDate
          ? new Date(deductibles.expiryDate).toISOString().substr(0, 10)
          : "";

        this.technicalConditions =
          newVal?.technical_conditions || { deductibles: [], sublime: [] };
        this.technicalConditionsUpdate = _.cloneDeep(this.technicalConditions);

        this.clause = newVal?.cartera?.clausula || "";
        this.deductibleIndex = this.technicalConditions.deductibles.length;
        this.initializeChangeTracking();
      },
    },
    e1: async function () {
      if (this.e1 === 1) {
        this.isEdited = {};
      }

      if (this.e1 === 2) {
        this.calcPremium();
      }

      if (this.e1 === 3) {
        const premiumOriginal = this.detailValues.find((el) => el.id === 1);
        const premiumUSD = this.detailValues.find((el) => el.id === 2);

        const tiv = this.accountComplete.tiv;
        const tivModificado = {
          propertyDamageMovement: tiv.insurable.propertyDamage,
          businessInterruptionMovement: tiv.insurable.businessInterruption,
          stockMovement: tiv.insurable.stock,

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
          effetiveDate: this.accountComplete?.deductibles?.inceptionDate
            ? new Date(this.accountComplete.deductibles.inceptionDate)
                .toISOString()
                .substring(0, 10)
            : null,
          expiryDate: this.accountComplete?.deductibles?.expiryDate
            ? new Date(this.accountComplete.deductibles.expiryDate)
                .toISOString()
                .substring(0, 10)
            : null,
          endormenteffetiveDate: this.effectiveDate
            ? new Date(this.effectiveDate)
            : null,
          movementEndDate: this.expiryDateReal
            ? new Date(this.expiryDateReal)
            : null,
        };

        const options = {
          isEdited: this.isEdited,
          dataEdited: {
            // totalPremium
            premiumDamage: this.totalPremium[0].premiumDamage,
            premiumBi: this.totalPremium[0].premiumBi,
            premiumStocks: this.totalPremium[0].premiumStocks,

            // premiumSlu
            sluDamage: this.totalPremium[0].sluDamage,
            sluBi: this.totalPremium[0].sluBi,
            sluStocks: this.totalPremium[0].sluStocks,
          },
        };

        // Obteniendo los calculos de Net premium
        const resultOriginalCurenncy = await netPremiumInclusionRiskAutoCalcs(
          tivModificado,
          this.accountComplete.deductibles,
          this.accountComplete.tiv?.boundInsurableProp.sluLine,
          false,
          dates,
          options
        );

        const resultUSD = await netPremiumInclusionRiskAutoCalcs(
          tivModificado,
          this.accountComplete.deductibles,
          this.accountComplete.tiv?.boundInsurableProp.sluLine,
          true,
          dates,
          options
        );

        // Obteniendo los inputs del usuario
        const movementValues = this.movementValues.find((el) => el.id === 1);
        const movementValuesUSD = this.movementValues.find((el) => el.id === 2);

        // Obteniendo premium payment date
        const premiumPaymentDate = new Date(
          this.premiumPaymentDate
        ).toISOString();

        // Obteniendo la clausula
        const clause = this.clause;

        // Guardando los datos de cartera nuevos
        this.cartera = {
          premiumPaymentDate,
          clausula: clause,
        };

        // Construyendo el objeto para generar el excel
        const endorsmentReporData = {
          cartera: this.cartera,
          totalValues: {
            damage: premiumOriginal.premiumDamage,
            bi: premiumOriginal.premiumBi,
            stocks: premiumOriginal.premiumStocks,
            total: premiumOriginal.premiumTotal,
            damageUsd: premiumUSD.premiumDamage,
            biUsd: premiumUSD.premiumBi,
            stocksUsd: premiumUSD.premiumStocks,
            totalUsd: premiumUSD.premiumTotal,
          },
          movementValues: {
            damage: 0,
            bi: 0,
            stocks: 0,
            total: 0,
            damageUsd: 0,
            biUsd: 0,
            stocksUsd: 0,
            totalUsd: 0,
          },
          premium: {
            propertyDamageRate:
              this.accountComplete.tiv.premium.propertyDamageRate,
            businessInterruptionRate:
              this.accountComplete.tiv.premium.businessInterruptionRate,
            stockRate: this.accountComplete.tiv.premium.stockRate,
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
            ...resultOriginalCurenncy.data,
            biSluShare: resultOriginalCurenncy.data.biPremiumSlu,
            damageSluShare: resultOriginalCurenncy.data.damagePremiumSlu,
            stocksSluShare: resultOriginalCurenncy.data.stocksPremiumSlu,
            sluShareTotal: resultOriginalCurenncy.data.totalPremiumSlu,
          },
          netPremiumUSD: {
            ...resultUSD.data,
            biSluShare: resultUSD.data.biPremiumSlu,
            damageSluShare: resultUSD.data.damagePremiumSlu,
            stocksSluShare: resultUSD.data.stocksPremiumSlu,
            sluShareTotal: resultUSD.data.totalPremiumSlu,
          },
        };

        // Guardar los valores de netPremium
        this.netPremium = {
          originalValues: {
            ...resultOriginalCurenncy.data,
            biSluShare: resultOriginalCurenncy.data.biPremiumSlu,
            damageSluShare: resultOriginalCurenncy.data.damagePremiumSlu,
            stocksSluShare: resultOriginalCurenncy.data.stocksPremiumSlu,
            sluShareTotal: resultOriginalCurenncy.data.totalPremiumSlu,
          },
          usdValues: {
            ...resultUSD.data,
            biSluShare: resultUSD.data.biPremiumSlu,
            damageSluShare: resultUSD.data.damagePremiumSlu,
            stocksSluShare: resultUSD.data.stocksPremiumSlu,
            sluShareTotal: resultUSD.data.totalPremiumSlu,
          },
        };

        this.endorsmentReporData = endorsmentReporData;

        // Invoca el  servicio para generar el excel
        const fileLink = await EndorsementService.getEndorsmentReport({
          subscriptionId: this.subscriptionId,
          endorsmentType: 11,
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
      }
    },
  },
  methods: {
    addNewSublime() {
      console.log("Add new sublime", this.technicalConditions);
      const highestIdCatSublimes =
        this.technicalConditions.sublime[
          this.technicalConditions.sublime.length - 1
        ].catSublimes.id;

      this.technicalConditions.sublime.push({
        catSublimes: {
          id: highestIdCatSublimes + 1, // Por cuestiones de arreglos
          location: "",
          sublimits1: 0,
          sublimits2: 0,
          sublimits_value1: null,
          sublimits_value2: null,
        },
        allOtherSublimits: [],
      });
    },
    addNewDeductibleNonProp() {
      const highestIdUnderlyingCatDeductibles =
        this.technicalConditions.deductibles[
          this.technicalConditions.deductibles.length - 1
        ].underlyingCatDeductibles.id;

      this.technicalConditions.deductibles.push({
        underlyingCatDeductibles: {
          hidrometeorological: 0,
          id: highestIdUnderlyingCatDeductibles + 1,
          location: "",
          maximum_hidrometeorological: "",
          maximum_volcanic: "",
          minimum_hidrometeorological: "",
          minimum_volcanic: "",
          total_hidrometeorological: 0,
          total_volcanic: 0,
          volcanic_eruption: 0,
        },
        underlyingFireEcDeductibles: [],
      });
    },
    addNewDeductible() {
      const highestIdUnderlyingCatDeductibles =
        this.technicalConditions.deductibles[
          this.technicalConditions.deductibles.length - 1
        ].UnderlyingCatDeductibles.id;

      // console.log('highestIdUnderlyingFireECDeductibles ///--->', highestIdUnderlyingFireECDeductibles)

      this.technicalConditions.deductibles.push({
        UnderlyingCatDeductibles: {
          alop_earthquake: null,
          alop_hidro: null,
          cover_b: "0",
          cover_two_b: "0",
          hidro_risk: "0",
          hidro_risk_two: "0",
          id: highestIdUnderlyingCatDeductibles + 1, // Por cuestiones de arreglos
          location: "0",
          underlying_cat_aplica_select: 0,
          underlying_cat_select: 0,
          underlying_cat_values_select: 0,
          underlying_cat_values_select_two: 0,
          underlying_hidro_aplica_select: 0,
          underlying_hidro_select: 0,
          underlying_hidro_values_select: 0,
          underlying_hidro_values_select_two: 0,
        },
        UnderlyingFireECDeductibles: [],
      });
      // console.log('this.technicalConditions --->', this.technicalConditions)
    },
    deleteThisDeductibleLocationNonProp(id) {
      this.technicalConditions.deductibles =
        this.technicalConditions.deductibles.filter(
          (u) => u.underlyingCatDeductibles.id !== id
        );
    },
    deleteThisDeductibleLocation(id) {
      this.technicalConditions.deductibles =
        this.technicalConditions.deductibles.filter(
          (u) => u.UnderlyingCatDeductibles.id !== id
        );
    },
    deleteThisSublimeLocation(id) {
      this.technicalConditions.sublime =
        this.technicalConditions.sublime.filter((u) => u.catSublimes.id !== id);
    },
    calcPremium() {
      const tiv = this.accountComplete.tiv;
      const tivMovement = {
        propertyDamageMovement: tiv.insurable.propertyDamage,
        businessInterruptionMovement: tiv.insurable.businessInterruption,
        stockMovement: tiv.insurable.stock,
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
        effetiveDate: this.accountComplete?.deductibles?.inceptionDate
          ? new Date(this.accountComplete.deductibles.inceptionDate)
              .toISOString()
              .substring(0, 10)
          : null,
        expiryDate: this.accountComplete?.deductibles?.expiryDate
          ? new Date(this.accountComplete.deductibles.expiryDate)
              .toISOString()
              .substring(0, 10)
          : null,
        endormenteffetiveDate: this.effectiveDate
          ? new Date(this.effectiveDate)
          : null,
        movementEndDate: this.expiryDateReal
          ? new Date(this.expiryDateReal)
          : null,
      };

      const calcPremium = new netPremiumInclusionRisk(
        tivMovement,
        this.accountComplete.deductibles,
        this.accountComplete.tiv?.boundInsurableProp.sluLine,
        false,
        dates
      );

      const retultTotalPremium = calcPremium.totalPremium();

      const totalPremium = this.totalPremium.find((el) => el.id === 1);
      totalPremium.premiumDamage = retultTotalPremium.damageTotalPremium;
      totalPremium.premiumBi = retultTotalPremium.biTotalPremium;
      totalPremium.premiumStocks = retultTotalPremium.stockTotalPremium;
      totalPremium.premiumTotal = retultTotalPremium.total;

      totalPremium.sluDamage = calcPremium.damagePremiumSlu();
      totalPremium.sluBi = calcPremium.biPremiumSlu();
      totalPremium.sluStocks = calcPremium.stocksPremiumSlu();
      totalPremium.sluTotal = +calcPremium
        .totalPremiumSlu()
        .replace("$", "")
        .replace(/,/g, "");

      const exchangeRate = this.accountComplete.deductibles.exchangeRate;
      const totalPremiumUsd = this.totalPremium.find((el) => el.id === 2);
      totalPremiumUsd.premiumDamage = retultTotalPremium.damageTotalPremiumUsd;
      totalPremiumUsd.premiumBi = retultTotalPremium.biTotalPremiumUsd;
      totalPremiumUsd.premiumStocks = retultTotalPremium.stockTotalPremiumUsd;
      totalPremiumUsd.premiumTotal = retultTotalPremium.totalUsd;
      totalPremiumUsd.sluDamage = totalPremium.sluDamage / exchangeRate;
      totalPremiumUsd.sluBi = totalPremium.sluBi / exchangeRate;
      totalPremiumUsd.sluStocks = totalPremium.sluStocks / exchangeRate;
      totalPremiumUsd.sluTotal = totalPremium.sluTotal / exchangeRate;
    },
    formatCurrency(amount) {
      return formatCurrency(amount);
    },
    activarVistaDatos() {
      this.e1 = 2;
      //this.$refs.componente.reciboLllamada();
    },
    setTotalPremium({ id, value, concept }) {
      const totalPremium = this.totalPremium.find((el) => el.id === id);
      totalPremium[concept] = value;

      if ((concept !== "premiumTotal") & (concept !== "sluTotal")) {
        this.isEdited[concept] = true;
      }
    },

    initializeChangeTracking() {
      this.originalTechnicalConditions = _.cloneDeep(this.technicalConditions);
    },

    // Verificar si un deducible ha sido modificado
    isDeductibleModified(deductibleId) {
      return this.modifiedDeductibles.has(deductibleId);
    },

    // Verificar si un sublímite ha sido modificado
    isSublimeModified(sublimeId) {
      return this.modifiedSublimes.has(sublimeId);
    },

    // Marcar deducible como modificado
    markDeductibleAsModified(deductibleId) {
      this.modifiedDeductibles.add(deductibleId);
    },

    // Marcar sublímite como modificado
    markSublimeAsModified(sublimeId) {
      this.modifiedSublimes.add(sublimeId);
    },

    // Método modificado para tracking
    setTechnicalConditionsUpdate(el) {
      // Existing logic
      this.setTechnicalConditionsDeductibles(el);
      this.setTechnicalConditionsSublime(el);

      // Add tracking
      if (el.UnderlyingCatDeductibles?.id) {
        this.markDeductibleAsModified(el.UnderlyingCatDeductibles.id);
      }
      if (el.underlyingCatDeductibles?.id) {
        this.markDeductibleAsModified(el.underlyingCatDeductibles.id);
      }
      if (el.catSublimes?.id) {
        this.markSublimeAsModified(el.catSublimes.id);
      }
    },

    async stepone() {
      this.e1 = 2;
      console.log(this.e1);
    },

    async nextStep() {
      console.log("next step");
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
    async downloadFile() {
      console.log("downloadFile");
    },

    goStep3() {
      this.e1 = 3;
    },

    setEndorsementDocuments({ files }) {
      this.endorsementDocuments = files;
    },

    setTechnicalConditionsUpdate(el) {
      this.setTechnicalConditionsDeductibles(el);
      this.setTechnicalConditionsSublime(el);
    },

    setTechnicalConditionsSublime(el) {
      if (el.catSublimes) {
        this.technicalConditionsUpdate.sublime.catSublimes = [el.catSublimes];
      }

      if (el.allOtherSublimits) {
        this.technicalConditionsUpdate.sublime.allOtherSublimits =
          el.allOtherSublimits;
      }
    },

    setTechnicalConditionsDeductibles(el) {
      if (el.underlyingCatDeductibles) {
        this.technicalConditionsUpdate.deductibles.underlyingCatDeductibles = [
          el.underlyingCatDeductibles,
        ];
      }

      if (el.underlyingFireEcDeductibles) {
        this.technicalConditionsUpdate.deductibles.underlyingFireEcDeductibles =
          el.underlyingFireEcDeductibles;
      }
    },

    async submit() {
      this.e1 = 1;

      // Obteniendo el insurable
      const tivTotal = this.detailValues.find((el) => el.id === 1);
      const tivTotalUsd = this.detailValues.find((el) => el.id === 2);

      // actualizando tiv.insurable de account complete
      const tivUpdate = {
        insurable: {
          propertyDamage: tivTotal.premiumDamage,
          businessInterruption: tivTotal.premiumBi,
          stock: tivTotal.premiumStocks,

          propertyDamageUsd: tivTotalUsd.premiumDamage,
          businessInterruptionUsd: tivTotalUsd.premiumBi,
          stockUsd: tivTotalUsd.premiumStocks,

          total: tivTotal.premiumTotal,
          totalUsd: tivTotalUsd.premiumTotal,

          porcentaje: this.accountComplete.tiv.insurable.porcentaje,
        },
        premium: {
          propertyDamageRate:
            this.accountComplete.tiv.premium.propertyDamageRate,
          businessInterruptionRate:
            this.accountComplete.tiv.premium.businessInterruptionRate,
          stockRate: this.accountComplete.tiv.premium.stockRate,
          stockPercentaje: this.accountComplete.tiv.premium.stockPercentaje,
        },
        boundInsurableProp: this.accountComplete.tiv.boundInsurableProp,
      };

      // guardar la cuenta actualizada en BD
      const accountCompleteResponse =
        await AccountCompleteService.addAccountComplete(this.subscriptionId, {
          ...this.accountComplete,
          deductibles: this.accountComplete.deductibles,
          tiv: tivUpdate,
          netPremium: {
            originalValues: {
              netTotal:
                this.accountComplete.net_premium.originalValues.netTotal,
            },
          },
          technicalConditions: this.technicalConditionsUpdate,
          cartera: {
            ...this.accountComplete.cartera,
            ...this.cartera,
            admitedPremium: this.admitedPremium,
          },
        });

      //guardar registro del endoso
      await EndorsementService.addEndorsment({
        subscriptionId: this.subscriptionId,
        endorsmentType: 11,
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
            admitedPremium: this.admitedPremium,
          },
        },
        files: this.endorsementDocuments,
      });

      await this.backToCreateEndorsement();
    },

    async endDateValidation(event, incomingDate) {
      if (Date.parse(incomingDate) >= Date.parse(this.expiryDateReal)) {
        this.endDateError = true;
      } else {
        await this.changeDateEndorsement(incomingDate);
        this.endDateError = false;
      }
    },

    premiumPaymentDateValidation(event, incomingDate) {
      if (Date.parse(incomingDate) <= Date.parse(this.currentMovementEndDate)) {
        this.premiumPaymentDateError = true;
      } else {
        this.premiumPaymentDateError = false;
      }
    },
  },

  computed: {
    validationFirstStep() {
      const showInfoEndorsement = this.showInfoEndorsement;
      const clause = Boolean(this.clause);
      const endDateError = !this.endDateError;

      const result = !(showInfoEndorsement & clause & endDateError);

      return result;
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
    border-radius: 5px;
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
  border-radius: 0px;
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
.technical-conditions-section {
  width: 100%;
  margin: 30px 0;
  padding: 20px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background-color: #fafafa;
}

.section-title {
  font-size: 18px;
  font-weight: 700;
  color: #003d6d;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
}

.highlight-info {
  font-size: 12px;
  font-weight: 400;
  color: #666;
  margin-left: 10px;
  font-style: italic;
}

.highlighted-item {
  position: relative;
  background: linear-gradient(135deg, #fff3cd 0%, #ffeaa7 100%);
  border: 2px solid #f39c12;
  border-radius: 8px;
  padding: 15px;
  margin: 10px 0;
  box-shadow: 0 4px 8px rgba(243, 156, 18, 0.2);
  animation: pulse-highlight 2s ease-in-out infinite;
}

.highlighted-item::before {
  content: "MODIFIED";
  position: absolute;
  top: -8px;
  right: 10px;
  background: #f39c12;
  color: white;
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.5px;
}

@keyframes pulse-highlight {
  0% {
    box-shadow: 0 4px 8px rgba(243, 156, 18, 0.2);
  }
  50% {
    box-shadow: 0 6px 15px rgba(243, 156, 18, 0.4);
  }
  100% {
    box-shadow: 0 4px 8px rgba(243, 156, 18, 0.2);
  }
}

/* Para items no modificados */
.technical-conditions-section > div:not(.highlighted-item) {
  background: white;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  padding: 15px;
  margin: 10px 0;
  transition: all 0.3s ease;
}

.technical-conditions-section > div:not(.highlighted-item):hover {
  border-color: #ccc;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>
