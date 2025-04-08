<template>
  <div class="outter-wrapper" ref="targetRef">
    <div class="endorsement-title">Extension</div>
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
              <div class="inner-title">Original date</div>

              <div class="input-row w-100 d-flex flex-wrap">
                <div class="input-col">
                  <div class="input-cont">
                    <v-menu
                      :close-on-content-click="false"
                      :nudge-right="40"
                      transition="scale-transition"
                      offset-y
                      min-width="auto"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="effectiveDate"
                          label="Inception date"
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
                    <v-menu
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
                    </v-menu>
                  </div>
                </div>
                <InputDaysDiference
                  :endorsementDate="effectiveDate"
                  :expiryDate="movementEndDate"
                  :key="movementEndDate"
                />
              </div>

              <div class="inner-title">Endorsement date</div>

              <div class="input-row w-100 d-flex flex-wrap">
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
                          v-model="originalEffectiveDate"
                          label="Endorsement effective date"
                          readonly
                          v-bind="attrs"
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        v-model="originalEffectiveDate"
                        @input="menu = false"
                        @change="
                          endorsementDateValidation(
                            $event,
                            originalEffectiveDate
                          )
                        "
                      ></v-date-picker>
                    </v-menu>
                    <div v-if="this.endDateError" class="error-message">
                      The new Movement end date must be later than current date.
                    </div>
                    <div
                      v-if="this.endDateErrorInception"
                      class="error-message"
                    >
                      The Movement end date cannot be equal to the Inception
                      date .
                    </div>
                    <div v-if="!originalEffectiveDate" class="error-message">
                      Please provide a valid endorsement effective date.
                    </div>
                  </div>
                </div>
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
                          v-model="originalMovementEndDate"
                          label="Movement end date"
                          readonly
                          v-bind="attrs"
                          v-on="on"
                          @change="
                            ExpiryDateValidation(
                              $event,
                              originalMovementEndDate
                            )
                          "
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        v-model="originalMovementEndDate"
                        :min="movementEndDate"
                        @input="menu2 = false"
                      ></v-date-picker>
                    </v-menu>
                    <!-- Si el campo está vacío, se muestra un mensaje de error -->
                    <div v-if="!originalMovementEndDate" class="error-message">
                      Please select a new expiry date.
                    </div>
                  </div>
                </div>

                <InputDaysDiference
                  :endorsementDate="originalEffectiveDate"
                  :expiryDate="originalMovementEndDate"
                  :key="originalMovementEndDate"
                />
              </div>
              <!-- <MovementValuesEng type="Extension" :showTotalValues="false" /> -->

              <div v-if="showInfoEndorsement">
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
                  <div class="col-subtitle">All Risk</div>
                  <div class="col-subtitle">ALOP</div>
                  <div class="col-subtitle">Total</div>
                  <div class="table-subtitle"></div>
                </div>
                <div
                  v-for="(item, id) in detailValues"
                  :key="id"
                  class="table-col"
                >
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
                      <div class="table-input blue-input">
                        {{ formatCurrency(item.premiumTotal) }}
                      </div>
                    </div>
                    <!--
                    <div class="inner-col">
                      <div class="table-subtitle">Premium SLU</div>
                      <div class="table-input blue-input">
                        {{ formatCurrency(item.sluAllRisk) }}
                      </div>
                      <div class="table-input blue-input">{{ formatCurrency(item.sluAlop) }}</div>

                      <div class="table-input blue-input">{{ formatCurrency(item.sluTotal) }}</div>
                    </div>
                    -->
                  </div>
                </div>
              </div>
              <div class="input-row w-100 d-flex flex-wrap">
                <div class="input-col">
                  <div class="inner-title">Additional</div>
                  <div class="input-cont">
                    <v-autocomplete
                      disabled
                      label="Clause"
                      v-model="clause"
                      :items="clauseList"
                      item-value="clause"
                      item-text="clause"
                    />
                  </div>
                </div>
                <div class="input-col">
                  <div class="inner-title" style="opacity: 0">|</div>
                  <div class="input-cont">
                    <v-menu
                      disabled
                      :close-on-content-click="false"
                      :nudge-right="40"
                      transition="scale-transition"
                      offset-y
                      min-width="auto"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          disabled
                          v-model="premiumPaymentDate"
                          label="Premium payment date"
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
      <AdmittedPremiumTableEngineering
        v-if="e1 == 2"
        @setTotalPremium="setTotalPremium"
        :detailValues="totalPremium"
        :canEditTable="true"
        :exchangeRate="accountComplete.deductibles.exchangeRate"
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
import MovementValuesEng from "./MovementValuesEng.vue";
import DocumentsEndorsement from "../../components/DocumentsEndorsement.vue";
import InputDaysDiference from "../../components/DaysDiference.vue";
import AdmittedPremiumTableEngineering from "../../components/AdmittedPremiumTableEngineering.vue";
/* services */
import EndorsementService from "../../services/endorsement.service";
import netPremiumEng from "../services/netpremium.service";
import accountCompleteService from "@/modules/home/services/account-complete.service";
import PaymentService from "@/modules/home/services/payments.service";
import {
  netPremiumInclusionRiskEng,
  netPremiumInclusionRiskAutoCalcs,
} from "../class/netPremiumInclusionRiskEng";
/* libs */
import Decimal from "@/lib/decimal";
import { formatCurrency } from "@/modules/home/modules/endorsements/utils";
import EndorsementDocuments from "../../components/EndorsementDocuments.vue";

export default {
  name: "Extension",
  components: {
    AppFile,
    MovementValuesEng,
    DocumentsEndorsement,
    InputDaysDiference,
    AdmittedPremiumTableEngineering,
    EndorsementDocuments,
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
          sluAllRisk: 0,
          sluAlop: 0,
        },
      ],
      expiryDatetoCalc: this.accountComplete.deductibles.expiryDate,
      clause: this.accountComplete.cartera.clausula,
      clauseList: [],
      cartera: {},
      premiumPaymentDate: new Date().toISOString().substr(0, 10),
      e1: 1,
      netPremium: {},
      subscriptionId: this.$route.params.id,
      menu: false,
      menu2: false,
      menu3: false,
      effectiveDate: new Date(this.accountComplete.deductibles.inceptionDate)
        .toISOString()
        .substr(0, 10),
      movementEndDate: new Date(
        Date.now() + 31536000000 - new Date().getTimezoneOffset() * 60000
      )
        .toISOString()
        .substr(0, 10),
      originalEffectiveDate: this.dateSaved,
      originalMovementEndDate: "",
      detail: 20,
      files: [
        {
          fileId: 1,
          fileName: "Report Extention",
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
      currentMovementEndDate: new Date().toISOString().substr(0, 10),
      effectiveDateError: false,
      endDateError: false,
      endDateErrorInception: false,
      resultOriginalCurenncy: {},
      resultUSD: {},
      netPremium: {},
      endorsmentReporData: {},
      admitedPremium: 0,
      isEdited: {},
      buttonTitle: "Next",
      buttonTitleBack: "Cancel",
    };
  },
  async beforeMount() {
    this.clauseList = await PaymentService.getClauses();
  },
  created() {
    const initDate = new Date(this.accountComplete.deductibles.inceptionDate);
    const endDate = new Date(this.accountComplete.deductibles.expiryDate);

    this.effectiveDate = initDate.toISOString().slice(0, 10);

    this.movementEndDate = endDate.toISOString().slice(0, 10);

    // llenamos los valores del segundo paso del endoso
    const tiv = this.accountComplete.tiv;
    this.detailValues[0]["premiumAllRisk"] = tiv.insurable.allRisk;
    this.detailValues[0]["premiumAlop"] = tiv.insurable.alop;
    this.detailValues[0]["premiumTotal"] = tiv.insurable.total;

    this.detailValues[1]["premiumAllRisk"] = tiv.insurable.allRiskUsd;
    this.detailValues[1]["premiumAlop"] = tiv.insurable.alopUsd;
    this.detailValues[1]["premiumTotal"] = tiv.insurable.totalUsd;
  },
  async mounted() {
    if (!this.dateSaved) {
      const endDate = new Date(this.accountComplete.deductibles.expiryDate);
      endDate.setDate(endDate.getDate());
      this.originalEffectiveDate = endDate.toISOString().slice(0, 10);
      this.endorsementDateValidation(null, this.originalEffectiveDate);
    }
  },
  computed: {
    validationFirstStep() {
      const showInfoEndorsement = this.showInfoEndorsement;
      // Se requiere que clause esté seleccionado, que showInfoEndorsement sea true y que se haya elegido una New Expiry date.
      return this.clause &&
        showInfoEndorsement &&
        this.originalMovementEndDate !== ""
        ? false
        : true;
    },
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
        this.calcPremium();
      }

      if (this.e1 === 3) {
        this.buttonTitle = "Finalize";
        this.buttonTitleBack = "Return";
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
          endormenteffetiveDate: new Date(this.originalEffectiveDate),
          movementEndDate: new Date(this.originalMovementEndDate),
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

        // Obteniendo los calculos de Net premium
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

        // Creación del objeto a insertar
        const endorsmentReporData = {
          cartera: this.cartera,
          totalValues: {
            allRisk: this.detailValues[0]["premiumAllRisk"],
            alop: this.detailValues[0]["premiumAlop"],
            total: this.detailValues[0]["premiumTotal"],
            allRiskUsd: this.detailValues[1]["premiumAllRisk"],
            alopUsd: this.detailValues[1]["premiumAlop"],
            totalUsd: this.detailValues[1]["premiumTotal"],
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

        try {
          // Invoca el  servicio para generar el excel
          const fileLink = await EndorsementService.getEndorsmentReport({
            subscriptionId: this.subscriptionId,
            endorsmentType: 3,
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
        }
      }
    },
  },
  methods: {
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
        endormenteffetiveDate: new Date(this.originalEffectiveDate),
        movementEndDate: new Date(this.originalMovementEndDate),
      };

      this.calcTotalPremium = new netPremiumInclusionRiskEng(
        tivMovement,
        this.accountComplete.deductibles,
        this.accountComplete.tiv?.boundInsurableProp.sluLine,
        false,
        dates
      );

      const totalPremiumResult = this.calcTotalPremium.calculateTotalPremium();

      const totalPremium = this.totalPremium.find((el) => el.id === 1);

      totalPremium.premiumAllRisk = totalPremiumResult.allRiskTotalPremium;
      totalPremium.premiumAlop = totalPremiumResult.alopTotalPremium;
      totalPremium.premiumTotal = totalPremiumResult.total;

      totalPremium.sluAllRisk = this.calcTotalPremium.allRiskPremiumSlu();
      totalPremium.sluAlop = this.calcTotalPremium.alopPremiumSlu();
      totalPremium.sluTotal = this.calcTotalPremium.totalPremiumSlu();
    },
    toUsd(value) {
      const exchangeRate = this.accountComplete.deductibles.exchangeRate;
      return Decimal.div(value, exchangeRate).toNumber();
    },
    setTotalPremium({ id, value, concept }) {
      const totalPremium = this.totalPremium.find((el) => el.id === id);
      totalPremium[concept] = value;

      if ((concept !== "premiumTotal") & (concept !== "sluTotal")) {
        this.isEdited[concept] = true;
      }
    },
    formatCurrency(amount) {
      return formatCurrency(amount);
    },
    async stepone() {
      // this.endDateValidation('',this.movementEndDate)
      if (this.e1 === 1) {
        if (this.endDateErrorInception !== true && this.endDateError !== true) {
          this.e1 = 2;
        }
        return;
      }
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

    setEndorsementDocuments({ files }) {
      this.endorsementDocuments = files;
    },

    async submit() {
      this.e1 = 1;

      // calcular diferencia del net premium
      const originalNetPremium =
        this.accountComplete.net_premium.originalValues
          .netSluExcludingSurveyFeesTotal;

      const netPremiumMovement =
        this.netPremium.originalValues.netSLUExcludingSurveyFeesTotal;

      const newNetPremium = Decimal.add(
        originalNetPremium,
        netPremiumMovement
      ).toNumber();

      const netPremiumDifference = Decimal(Decimal(newNetPremium))
        .sub(Decimal(originalNetPremium))
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
        await accountCompleteService.addAccountComplete(this.subscriptionId, {
          deductibles: {
            ...this.accountComplete.deductibles,
            expiryDate: new Date(this.originalMovementEndDate).toISOString(),
          },
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
        endorsmentType: 3,
        idUser: this.$store.state.auth.user.id,
        accountId: accountCompleteResponse.id,
        effectiveDate: this.originalEffectiveDate,
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
      if (Date.parse(incomingDate) == Date.parse(this.effectiveDate)) {
        this.endDateErrorInception = true;
      } else {
        this.endDateErrorInception = false;
        if (
          Date.parse(incomingDate) < Date.parse(this.currentMovementEndDate)
        ) {
          this.endDateError = true;
        } else {
          this.endDateError = false;
          this.accountComplete.deductibles.expiryDate = new Date(incomingDate);
        }
      }
    },

    ExpiryDateValidation(event, incomingDate) {
      // Si no hay valor, no se realiza la validación (o puedes dejarlo como error)
      if (!incomingDate) {
        return;
      }
      // Si la fecha seleccionada es anterior a la fecha actual de expiración, se marca error.
      if (Date.parse(incomingDate) < Date.parse(this.movementEndDate)) {
        this.endDateErrorTwo = true;
      } else {
        this.endDateErrorTwo = false;
        // Actualiza la fecha de expiración en accountComplete si es necesario.
        this.accountComplete.deductibles.expiryDate = new Date(incomingDate);
      }
    },

    async endorsementDateValidation(event, incomingDate) {
      if (Date.parse(incomingDate) > Date.parse(this.movementEndDate)) {
        this.endorsementDateError = true;
      } else {
        await this.changeDateEndorsement(incomingDate);
        this.endorsementDateError = false;
      }
    },

    goNext(e1) {
      this.$refs.targetRef.scrollIntoView({ behavior: "smooth" });
      if (e1 == 1) {
        this.stepone();
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
  width: 15%;
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
  border-radius: 6px;
  margin: 2px;
  font-size: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.table-title-space {
  height: 50px;
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
  justify-content: flex-start;
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
</style>
