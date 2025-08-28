<template>
  <div class="outter-wrapper" ref="targetRef">
    <div class="endorsement-title">Inclusion Risk</div>
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
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        v-model="effectiveDate"
                        @input="menu2 = false"
                        @change="
                          endorsementDateValidation($event, effectiveDate)
                        "
                      ></v-date-picker>
                    </v-menu>
                    <div v-if="this.endorsementDateError" class="error-message">
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
                        ></v-text-field>
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
                <MovementValues
                  type="Inclusion Risk"
                  :accountComplete="accountComplete"
                  ref="componente"
                  @onResultados="onResultados"
                />

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
                            label="Premium payment warranty"
                            readonly
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
                          label="Premium payment warranty"
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
                  <div class="col-subtitle">All Risk</div>
                  <div class="col-subtitle">ALOP</div>
                  <div class="col-subtitle">Total</div>
                  <div class="table-subtitle"></div>
                </div>

                <template v-for="item in detailValues">
                  <div v-if="item.id === 1" class="table-col">
                    <div>
                      <div class="table-title">{{ item.name }}</div>
                      <div class="input-row">
                        <div class="inner-col">
                          <!--<div class="table-subtitle">Total premium</div>-->
                          <div class="table-input blue-input">
                            {{ formatCurrency(item.premiumAllRisk) }}
                          </div>
                          <div class="table-input blue-input">
                            {{ formatCurrency(item.premiumAlop) }}
                          </div>

                          <div class="table-input">
                            {{ formatCurrency(item.premiumTotal) }}
                          </div>
                        </div>
                        <!--
                        <div class="inner-col">
                          <div class="table-subtitle">Premium SLU</div>
                          <div class="table-input blue-input">
                            {{ formatCurrency(item.sluAllRisk) }}
                          </div>
                          <div class="table-input blue-input">
                            {{ formatCurrency(item.sluAlop) }}
                          </div>

                          <div class="table-input">
                            {{ formatCurrency(item.sluTotal) }}
                          </div>
                        </div>
                        -->
                      </div>
                    </div>
                  </div>
                </template>

                <template v-for="item in detailValues">
                  <div v-if="item.id === 2" :key="item.id" class="table-col">
                    <div>
                      <div class="table-title">{{ item.name }}</div>
                      <div class="input-row">
                        <div class="inner-col">
                          <!--<div class="table-subtitle">Total premium</div>-->
                          <div class="table-input blue-input">
                            {{ formatCurrency(item.premiumAllRisk) }}
                          </div>
                          <div class="table-input blue-input">
                            {{ formatCurrency(item.premiumAlop) }}
                          </div>

                          <div class="table-input">
                            {{ formatCurrency(item.premiumTotal) }}
                          </div>
                        </div>
                        <!--
                        <div class="inner-col">
                          <div class="table-subtitle">Premium SLU</div>
                          <div class="table-input blue-input">
                            {{ formatCurrency(item.sluAllRisk) }}
                          </div>
                          <div class="table-input blue-input">
                            {{ formatCurrency(item.sluAlop) }}
                          </div>

                          <div class="table-input">
                            {{ formatCurrency(item.sluTotal) }}
                          </div>
                        </div>
                         -->
                      </div>
                    </div>
                  </div>
                </template>
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
      <!-- <DocumentsEndorsement v-if="e1 == 1 || e1 == 3" /> -->
      <EndorsementDocuments
        @setEndorsementDocuments="setEndorsementDocuments"
        v-show="e1 == 1 || e1 == 3"
      />
      <AdmittedPremiumTableEngineering
        v-if="e1 == 2"
        @setTotalPremium="setTotalPremium"
        :detailValues="totalPremium"
        :exchangeRate="accountComplete.deductibles.exchangeRate"
        :canEditTable="true"
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
import MovementValues from "./MovementValuesEng.vue";
import DocumentsEndorsement from "../../components/DocumentsEndorsement.vue";
import InputDaysDiference from "../../components/DaysDiference.vue";
import AdmittedPremiumTable from "../../components/AdmittedPremiumTable.vue";
import AdmittedPremiumTableEngineering from "../../components/AdmittedPremiumTableEngineering.vue";
import EndorsementReportCompleteTable from "./EndorsementReportCompleteTable.vue";
/* services */
import { getFiles } from "../../services/mock-files.service";
import netPremiumEng from "../services/netpremium.service";
import EndorsementService from "../../services/endorsement.service";
import AccountCompleteService from "@/modules/home/services/account-complete.service";
import PaymentService from "@/modules/home/services/payments.service";
import {
  netPremiumInclusionRiskEng,
  netPremiumInclusionRiskAutoCalcs,
} from "../class/netPremiumInclusionRiskEng";
/* libs */
import Decimal from "@/lib/decimal";
import EndorsementDocuments from "../../components/EndorsementDocuments.vue";

export default {
  name: "InclusionRisk",
  components: {
    AppFile,
    MovementValues,
    DocumentsEndorsement,
    InputDaysDiference,
    AdmittedPremiumTable,
    AdmittedPremiumTableEngineering,
    EndorsementDocuments,
    EndorsementReportCompleteTable,
  },
  props: {
    type: { type: String, default: "Inclusion Risk" },
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
    return {
      endorsementDateError: false,
      expiryDatetoCalc: this.accountComplete.deductibles.expiryDate,
      expiryDateReal: new Date(this.accountComplete.deductibles.expiryDate)
        .toISOString()
        .substr(0, 10),
      menu3: false,
      menu4: false,
      clause: this.accountComplete.cartera.clausula,
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
      buttonTitle: "Next",
      buttonTitleBack: "Cancel",
    };
  },
  created() {},
  async beforeMount() {
    this.clauseList = await PaymentService.getClauses();
  },
  watch: {
    e1: async function () {
      if (this.e1 === 1) {
        this.isEdited = {};
        this.buttonTitle = "Next";
        this.buttonTitleBack = "Cancel";
      }
      if (this.e1 === 2) {
        this.buttonTitle = "Next";
        this.buttonTitleBack = "Return";
      }

      if (this.e1 === 3) {
        this.buttonTitle = "Finalize";
        this.buttonTitleBack = "Return";
        const premiumOriginal = this.detailValues.find((el) => el.id === 1);
        const premiumUSD = this.detailValues.find((el) => el.id === 2);

        // Obteniendo los calculos de Net premium

        const tivMovement = {
          allRisk: this.movementValues[0].allRisk,
          alop: this.movementValues[0].alop,

          allRiskRate: this.accountComplete.tiv.premium.allRiskRate,
          alopRate: this.accountComplete.tiv.premium.alopRate,
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

        const options = {
          isEdited: this.isEdited,
          dataEdited: {
            // totalPremium
            premiumAllRisk: this.totalPremium[0].premiumAllRisk,
            premiumAlop: this.totalPremium[0].premiumAlop,

            // premiumSlu
            sluAllRisk: this.totalPremium[0].sluAllRisk,
            sluAlop: this.totalPremium[0].sluAlop,
          },
        };

        const sluLine = this.accountComplete.tiv?.boundInsurableProp.sluLine;
        const resultOriginalCurenncy = await netPremiumInclusionRiskAutoCalcs(
          tivMovement,
          this.accountComplete.deductibles,
          sluLine,
          false,
          dates,
          options
        );
        const resultUSD = await netPremiumInclusionRiskAutoCalcs(
          tivMovement,
          this.accountComplete.deductibles,
          sluLine,
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
            allRisk: premiumOriginal.premiumAllRisk,
            alop: premiumOriginal.premiumAlop,
            total: premiumOriginal.premiumTotal,
            allRiskUsd: premiumUSD.premiumAllRisk,
            alopUsd: premiumUSD.premiumAlop,
            totalUsd: premiumUSD.premiumTotal,
          },
          movementValues: {
            allRisk: movementValues.allRisk,
            alop: movementValues.alop,
            total: movementValues.allRisk + movementValues.alop,
            allRiskUsd: movementValuesUSD.allRisk,
            alopUsd: movementValuesUSD.alop,
            totalUsd: movementValuesUSD.allRisk + movementValuesUSD.alop,
          },
          premium: {
            allRisk: this.totalPremium[0].premiumAllRisk,
            alop: this.totalPremium[0].premiumAlop,
            totalInsured: this.totalPremium[0].premiumTotal,
            allRiskRate: this.accountComplete.tiv.premium.allRiskRate,
            alopRate: this.accountComplete.tiv.premium.alopRate,
            allRiskUsd: this.toUsd(this.totalPremium[0].premiumAllRisk),
            alopUsd: this.toUsd(this.totalPremium[0].premiumAlop),
            totalUsd: this.toUsd(this.totalPremium[0].premiumTotal),
          },
          boundInsurableProp: this.accountComplete.tiv?.boundInsurableProp,
          deductibles: this.accountComplete.deductibles,
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

        // Guardar los valores de netPremium
        this.netPremium = {
          originalValues: {
            ...resultOriginalCurenncy.data,
            allRiskSluShare: resultOriginalCurenncy.data.allRiskPremiumSlu,
            alopSluShare: resultOriginalCurenncy.data.alopPremiumSlu,
            sluShareTotal: resultOriginalCurenncy.data.totalPremiumSlu,
          },
          usdValues: {
            ...resultUSD.data,
            allRiskSluShare: resultUSD.data.allRiskPremiumSlu,
            alopSluShare: resultUSD.data.alopPremiumSlu,
            sluShareTotal: resultUSD.data.totalPremiumSlu,
          },
        };

        this.endorsmentReporData = endorsmentReporData;

        // Invoca el  servicio para generar el excel
        const fileLink = await EndorsementService.getEndorsmentReport({
          subscriptionId: this.subscriptionId,
          endorsmentType: 1,
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
    validateNumericValue(value, defaultValue = 0) {
      if (value === null || value === undefined || isNaN(Number(value))) {
        return defaultValue;
      }
      return Number(value);
    },
    toUsd(value) {
      const exchangeRate = this.accountComplete.deductibles.exchangeRate;
      return Decimal.div(value, exchangeRate).toNumber();
    },
    setTotalPremium({ id, value, concept }) {
      const totalPremium = this.totalPremium.find((el) => el.id === id);

      if (!totalPremium) {
        console.warn(`No se encontró totalPremium con id: ${id}`);
        return;
      }

      // Asegurar que value sea un número
      const numericValue = Number(value) || 0;
      totalPremium[concept] = numericValue;

      // Recalcular totales automáticamente
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
    formatCurrency(amount) {
      const numericAmount = this.validateNumericValue(amount, 0);

      const formatter = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2,
      });
      return formatter.format(numericAmount);
    },
    activarVistaDatos() {
      this.$refs.componente.reciboLllamada();
    },
    onResultados(datasMV) {
      this.movementValues = datasMV;

      // Asegurar que datasMV sea un array válido
      if (!Array.isArray(datasMV) || datasMV.length === 0) {
        console.warn("datasMV no es un array válido:", datasMV);
        return;
      }

      this.detailValues.map((value, index) => {
        // Verificar que el índice existe en datasMV
        if (datasMV[index]) {
          // Asegurar que los valores sean números, no objetos
          const allRisk = Number(datasMV[index].allRisk) || 0;
          const alop = Number(datasMV[index].alop) || 0;
          const totalAllRisk = Number(datasMV[index].totalAllRisk) || 0;
          const totalAlop = Number(datasMV[index].totalAlop) || 0;

          // tivTotal (tiv + tivMovement)
          value.premiumAllRisk = totalAllRisk + allRisk;
          value.premiumAlop = totalAlop + alop;
          value.premiumTotal = value.premiumAllRisk + value.premiumAlop;
        }
      });

      // Verificar que tenemos datos válidos antes de continuar
      if (!this.movementValues[0]) {
        console.warn("No hay datos válidos en movementValues[0]");
        return;
      }

      const tivMovement = {
        allRisk: Number(this.movementValues[0].allRisk) || 0,
        alop: Number(this.movementValues[0].alop) || 0,
        allRiskRate: this.accountComplete.tiv.premium.allRiskRate,
        alopRate: this.accountComplete.tiv.premium.alopRate,
      };

      const dates = {
        effetiveDate: new Date(this.accountComplete.deductibles.inceptionDate)
          .toISOString()
          .substring(0, 10),
        expiryDate: new Date(this.accountComplete.deductibles.expiryDate)
          .toISOString()
          .substring(0, 10),
        endormenteffetiveDate: this.effectiveDate,
        movementEndDate: this.expiryDateReal,
      };

      try {
        this.calcTotalPremium = new netPremiumInclusionRiskEng(
          tivMovement,
          this.accountComplete.deductibles,
          this.accountComplete.tiv?.boundInsurableProp.sluLine,
          false,
          dates
        );

        const totalPremiumResult =
          this.calcTotalPremium.calculateTotalPremium();

        const totalPremium = this.totalPremium.find((el) => el.id === 1);

        if (totalPremium && totalPremiumResult) {
          totalPremium.premiumAllRisk =
            Number(totalPremiumResult.allRiskTotalPremium) || 0;
          totalPremium.premiumAlop =
            Number(totalPremiumResult.alopTotalPremium) || 0;
          totalPremium.premiumTotal = Number(totalPremiumResult.total) || 0;

          totalPremium.sluAllRisk =
            Number(this.calcTotalPremium.allRiskPremiumSlu()) || 0;
          totalPremium.sluAlop =
            Number(this.calcTotalPremium.alopPremiumSlu()) || 0;
          totalPremium.sluTotal =
            Number(this.calcTotalPremium.totalPremiumSlu()) || 0;
        }
      } catch (error) {
        console.error("Error en cálculos de premium:", error);
      }
    },
    async stepone() {
      this.e1 = 2;
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

    setEndorsementDocuments({ files }) {
      this.endorsementDocuments = files;
    },

    async submit() {
      this.e1 = 1;

      // calcular diferencia del net premium
      const originalNetPremium = this.validateNumericValue(
        this.accountComplete.net_premium?.originalValues
          ?.netSluExcludingSurveyFeesTotal,
        0
      );

      const netPremiumMovement = this.validateNumericValue(
        this.netPremium?.originalValues?.netSLUExcludingSurveyFeesTotal,
        0
      );

      const newNetPremium = Decimal.add(
        originalNetPremium,
        netPremiumMovement
      ).toNumber();

      const netPremiumDifference = Decimal(newNetPremium)
        .sub(originalNetPremium)
        .toNumber();

      // Obteniendo el insurable
      const tivTotal = this.detailValues.find((el) => el.id === 1);
      const tivTotalUsd = this.detailValues.find((el) => el.id === 2);

      // actualizando tiv.insurable de account complete
      const tivUpdate = {
        insurable: {
          allRisk: tivTotal.premiumAllRisk,
          alop: tivTotal.premiumAlop,
          total: tivTotal.premiumTotal,

          allRiskUsd: tivTotalUsd.premiumAllRisk,
          alopUsd: tivTotalUsd.premiumAlop,
          totalUsd: tivTotalUsd.premiumTotal,
        },
        premium: {
          allRiskRate: this.accountComplete.tiv.premium.allRiskRate,
          alopRate: this.accountComplete.tiv.premium.alopRate,
        },
        boundInsurableProp: this.accountComplete.tiv.boundInsurableProp,
      };

      // guardar la cuenta actualizada en BD
      const accountCompleteResponse =
        await AccountCompleteService.addAccountComplete(this.subscriptionId, {
          deductibles: this.accountComplete.deductibles,
          tiv: tivUpdate,
          netPremium: {
            originalValues: {
              netSluExcludingSurveyFeesTotal: newNetPremium,
            },
          },
          cartera: {
            ...this.accountComplete.cartera,
            ...this.cartera,
            netPremiumDifference,
            admitedPremium: this.admitedPremium,
          },
        });

      //guardar registro del endoso
      await EndorsementService.addEndorsment({
        subscriptionId: this.subscriptionId,
        endorsmentType: 1,
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
            netPremiumDifference,
            admitedPremium: this.admitedPremium,
          },
        },
        files: this.endorsementDocuments,
      });

      this.$router.push(`/subscription`);
    },

    endDateValidation(event, incomingDate) {
      if (
        Date.parse(incomingDate) <=
        Date.parse(this.accountComplete.deductibles.inceptionDate)
      ) {
        this.endDateError = true;
      } else {
        this.endDateError = false;
      }
    },

    premiumPaymentDateValidation(event, incomingDate) {
      if (Date.parse(incomingDate) <= Date.parse(this.currentMovementEndDate)) {
        this.premiumPaymentDateError = true;
      } else {
        this.premiumPaymentDateError = true;
      }
    },
    async endorsementDateValidation(event, incomingDate) {
      if (Date.parse(incomingDate) >= Date.parse(this.expiryDateReal)) {
        this.endorsementDateError = true;
      } else {
        await this.changeDateEndorsement(incomingDate);
        this.endorsementDateError = false;
      }
    },

    goNext(e1) {
      this.$refs.targetRef.scrollIntoView({ behavior: "smooth" });
      if (e1 == 1) {
        this.e1 = 2;
        this.activarVistaDatos();
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

  computed: {
    validationFirstStep() {
      const showInfoEndorsement = this.showInfoEndorsement;
      const clause = Boolean(this.clause);

      const result = !(showInfoEndorsement & clause);

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
    width: 100%;
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

.report-complete {
  overflow: auto;
}
</style>
