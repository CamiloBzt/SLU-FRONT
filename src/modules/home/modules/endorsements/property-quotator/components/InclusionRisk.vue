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
                        @change="endDateValidation($event, effectiveDate)"
                      ></v-date-picker>
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
                  :insurableRiskData="insurableRisk"
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
                  <div class="col-subtitle">Damage</div>
                  <div class="col-subtitle">Bi</div>
                  <div class="col-subtitle">Stocks</div>
                  <div class="col-subtitle">Total</div>
                </div>

                <template v-for="item in detailValues">
                  <div v-if="item.id === 1" class="table-col">
                    <div>
                      <div class="table-title">{{ item.name }}</div>
                      <div class="input-row">
                        <div class="inner-col wide-col">
                          <div class="table-input blue-input">
                            {{ formatCurrency(item.premiumDamage) }}
                          </div>
                          <div class="table-input blue-input">
                            {{ formatCurrency(item.premiumBi) }}
                          </div>
                          <div class="table-input blue-input">
                            {{ formatCurrency(item.premiumStocks) }}
                          </div>
                          <div class="table-input">
                            {{ formatCurrency(item.premiumTotal) }}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </template>

                <template v-for="item in detailValues">
                  <div v-if="item.id === 2" :key="item.id" class="table-col">
                    <div>
                      <div class="table-title">{{ item.name }}</div>
                      <div class="input-row">
                        <div class="inner-col wide-col">
                          <div class="table-input blue-input">
                            {{ formatCurrency(item.premiumDamage) }}
                          </div>
                          <div class="table-input blue-input">
                            {{ formatCurrency(item.premiumBi) }}
                          </div>
                          <div class="table-input blue-input">
                            {{ formatCurrency(item.premiumStocks) }}
                          </div>
                          <div class="table-input">
                            {{ formatCurrency(item.premiumTotal) }}
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
      <AdmittedPremiumTable
        v-if="e1 == 2"
        @setTotalPremium="setTotalPremium"
        :detailValues="totalPremium"
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
import MovementValues from "./MovementValues.vue";
import DocumentsEndorsement from "../../components/DocumentsEndorsement.vue";
import CurrencyInput from "@/components/CurrencyInput/CurrencyInput.vue";
import InputDaysDiference from "../../components/DaysDiference.vue";
import AdmittedPremiumTable from "../../components/AdmittedPremiumTable.vue";
import EndorsementDocuments from "../../components/EndorsementDocuments.vue";
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

/* libs */
import Decimal from "@/lib/decimal";
/* utils */
import { removeDollarSign } from "../utils";
import { formatCurrency } from "../../utils";

export default {
  name: "InclusionRisk",
  components: {
    AppFile,
    MovementValues,
    DocumentsEndorsement,
    CurrencyInput,
    InputDaysDiference,
    AdmittedPremiumTable,
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
      insurableRisk: {
        rate: {},
      },
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
      buttonTitle: "Next",
      buttonTitleBack: "Cancel",
    };
  },
  async beforeMount() {
    this.clauseList = await PaymentService.getClauses();
  },
  created() {
    const tiv = this.accountComplete.tiv;
    this.insurableRisk = {
      property_damage: tiv.insurable.propertyDamage,
      business_interruption: tiv.insurable.businessInterruption,
      stock: tiv.insurable.stock,
      property_damage_usd: tiv.insurable.propertyDamageUsd,
      business_interruption_usd: tiv.insurable.businessInterruptionUsd,
      stock_usd: tiv.insurable.stockUsd,
      rate: {
        property_damage_rate: tiv.premium.propertyDamageRate,
        business_interruption_rate: tiv.premium.businessInterruptionRate,
        stock_rate: tiv.premium.stockRate,
      },
      porcentaje: tiv.insurable.porcentaje,
    };
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

        const tivModificado = {
          propertyDamageMovement: this.movementValues[0].damage,
          businessInterruptionMovement: this.movementValues[0].bi,
          stockMovement: this.movementValues[0].stocks,

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
            damage: movementValues.damage,
            bi: movementValues.bi,
            stocks: movementValues.stocks,
            total:
              movementValues.damage + movementValues.bi + movementValues.stocks,
            damageUsd: movementValuesUSD.damage,
            biUsd: movementValuesUSD.bi,
            stocksUsd: movementValuesUSD.stocks,
            totalUsd:
              movementValuesUSD.damage +
              movementValuesUSD.bi +
              movementValuesUSD.stocks,
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
    formatCurrency(amount) {
      return formatCurrency(amount);
    },
    activarVistaDatos() {
      this.$refs.componente.reciboLllamada();
    },
    setTotalPremium({ id, value, concept }) {
      const totalPremium = this.totalPremium.find((el) => el.id === id);
      totalPremium[concept] = value;

      if ((concept !== "premiumTotal") & (concept !== "sluTotal")) {
        this.isEdited[concept] = true;
      }
    },
    onResultados(datasMV) {
      this.movementValues = datasMV;
      this.detailValues.map((value, index) => {
        value.premiumDamage =
          datasMV[index].totalDamage + datasMV[index].damage;

        value.premiumBi = datasMV[index].totalBi + datasMV[index].bi;

        value.premiumStocks =
          datasMV[index].totalStocks + datasMV[index].stocks;

        value.premiumTotal =
          value.premiumDamage + value.premiumBi + value.premiumStocks;
      });

      const premiumOriginal = this.detailValues.find((el) => el.id === 1);

      const tivModificado = {
        propertyDamageMovement: this.movementValues[0].damage,
        businessInterruptionMovement: this.movementValues[0].bi,
        stockMovement: this.movementValues[0].stocks,

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

      const totalPremium = new netPremiumInclusionRisk(
        tivModificado,
        this.accountComplete.deductibles,
        this.accountComplete.tiv?.boundInsurableProp.sluLine,
        false,
        dates
      );

      const retultTotalPremium = totalPremium.totalPremium();

      const premiumOriginal2 = this.totalPremium.find((el) => el.id === 1);

      premiumOriginal2.premiumDamage = retultTotalPremium.damageTotalPremium;
      premiumOriginal2.premiumBi = retultTotalPremium.biTotalPremium;
      premiumOriginal2.premiumStocks = retultTotalPremium.stockTotalPremium;
      premiumOriginal2.premiumTotal = retultTotalPremium.total;

      premiumOriginal2.sluDamage = totalPremium.damagePremiumSlu();
      premiumOriginal2.sluBi = totalPremium.biPremiumSlu();
      premiumOriginal2.sluStocks = totalPremium.stocksPremiumSlu();
      premiumOriginal2.sluTotal = +totalPremium
        .totalPremiumSlu()
        .replace("$", "")
        .replace(",", "");

      const totalPremiumUsd = new netPremiumInclusionRisk(
        tivModificado,
        this.accountComplete.deductibles,
        this.accountComplete.tiv?.boundInsurableProp.sluLine,
        true,
        dates
      );

      const retultTotalPremiumUsd = totalPremiumUsd.totalPremium();

      const premiumOriginal2Usd = this.totalPremium.find((el) => el.id === 2);

      premiumOriginal2Usd.premiumDamage =
        retultTotalPremiumUsd.damageTotalPremiumUsd;
      premiumOriginal2Usd.premiumBi = retultTotalPremiumUsd.biTotalPremiumUsd;
      premiumOriginal2Usd.premiumStocks =
        retultTotalPremiumUsd.stockTotalPremiumUsd;
      premiumOriginal2Usd.premiumTotal = retultTotalPremiumUsd.totalUsd;

      premiumOriginal2Usd.sluDamage = totalPremiumUsd.damagePremiumSlu();
      premiumOriginal2Usd.sluBi = totalPremiumUsd.biPremiumSlu();
      premiumOriginal2Usd.sluStocks = totalPremiumUsd.stocksPremiumSlu();
      premiumOriginal2Usd.sluTotal = +totalPremiumUsd
        .totalPremiumSlu()
        .replace("$", "")
        .replace(",", "");
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

    goStep3() {
      this.e1 = 3;
    },

    setEndorsementDocuments({ files }) {
      this.endorsementDocuments = files;
    },

    async submit() {
      this.e1 = 1;

      // calcular diferencia del net premium
      const originalNetPremium =
        Number(
          removeDollarSign(
            this.accountComplete.net_premium?.originalValues?.netTotal
          )
        ) || 0;

      const netPremiumMovement =
        Number(removeDollarSign(this.netPremium?.originalValues?.netTotal)) ||
        0;

      const newNetPremium = Decimal.add(
        originalNetPremium,
        netPremiumMovement
      ).toNumber();

      const netPremiumDifference = netPremiumMovement;

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
              netTotal: newNetPremium,
            },
          },
          technicalConditions: this.accountComplete.technical_conditions,
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
.report-complete {
  overflow: auto;
}
</style>
