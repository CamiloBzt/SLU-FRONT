<template>
  <div class="outter-wrapper" ref="targetRef">
    <div class="endorsement-title">Deduction Change</div>
    <v-stepper v-model="e1">
      <v-stepper-header>
        <v-stepper-step :complete="e1 > 1" step="1" color="#F59607"> Endorsement </v-stepper-step>

        <v-stepper-step :complete="e1 > 2" step="2" color="#F59607"> Calculate premium </v-stepper-step>

        <v-stepper-step step="3" color="#F59607"> Admitted premium </v-stepper-step>
      </v-stepper-header>
      <div class="endorsement-wrapper">
        <div class="content">
          <v-stepper-items>
            <v-stepper-content step="1" class="step-one">
              <div class="endorsement-title">Endorsements date</div>
              <div class="input-row w-100 d-flex flex-wrap">
                <div class="input-col">
                  <div class="input-cont">
                    <v-menu v-model="menu2" :close-on-content-click="false" :nudge-right="40" transition="scale-transition" offset-y min-width="auto">
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field v-model="effectiveDate" label="Endorsement effective date" readonly v-bind="attrs" v-on="on"></v-text-field>
                      </template>
                      <v-date-picker v-model="effectiveDate" @input="menu2 = false" @change="endorsementDateValidation($event, effectiveDate)"></v-date-picker>
                    </v-menu>
                    <div v-if="this.endorsementDateError" class="error-message">The new Endorsement effective date must be lower than expiry date.</div>
                  </div>
                </div>
                <div class="input-col">
                  <div class="input-cont">
                    <v-menu v-model="menu" :close-on-content-click="false" :nudge-right="40" transition="scale-transition" offset-y min-width="auto">
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field v-model="movementEndDate" label="Movement end date" readonly v-bind="attrs" v-on="on"></v-text-field>
                      </template>
                      <v-date-picker v-model="movementEndDate" @input="menu = false" @change="endDateValidation($event, movementEndDate)"></v-date-picker>
                    </v-menu>
                    <div v-if="this.endDateError" class="error-message">The new Movement end date must be later than current date.</div>
                  </div>
                </div>
                <InputDaysDiference :endorsementDate="effectiveDate" :expiryDate="expiryDatetoCalc" :key="effectiveDate" />
              </div>
              <div v-if="showInfoEndorsement">
                <div class="endorsement-title">Original deductions</div>
                <div class="input-row">
                  <div class="input-col">
                    <div class="input-cont">
                      <v-text-field v-model="accountComplete.deductibles.brokerage" label="Brokerage" suffix="%" disabled />
                    </div>
                    <div class="input-cont">
                      <v-text-field v-model="accountComplete.deductibles.taxes" label="Taxes" suffix="%" disabled />
                    </div>
                    <div class="input-cont">
                      <v-text-field v-model="accountComplete.deductibles.eng" label="Eng fee" suffix="%" disabled />
                    </div>
                  </div>
                  <div class="input-col">
                    <div class="input-cont">
                      <v-text-field v-model="accountComplete.deductibles.deductionType" label="Type" disabled />
                    </div>
                    <div class="input-cont">
                      <v-text-field v-model="accountComplete.deductibles.fronting" label="Fronting fee" suffix="%" disabled />
                    </div>
                    <div class="input-cont">
                      <v-text-field v-model="accountComplete.deductibles.premiumReserve" label="Premium reserve Only Colombia" suffix="%" disabled />
                    </div>
                  </div>
                  <div class="input-col">
                    <div class="input-cont">
                      <v-text-field v-model="accountComplete.deductibles.lta" label="LTA" suffix="%" disabled />
                    </div>
                    <div class="input-cont">
                      <v-text-field v-model="accountComplete.deductibles.others" label="Others" suffix="%" disabled />
                    </div>
                    <div class="input-cont">
                      <v-text-field v-model="accountComplete.tiv.insurable.porcentaje" label="Stocks Percentage" suffix="%" disabled />
                    </div>
                  </div>
                </div>

                <div class="endorsement-title">New deductions</div>

                <div class="input-row">
                  <div class="input-col">
                    <div class="input-cont">
                      <v-text-field label="Brokerage" v-model="brokerage" />
                    </div>

                    <div class="input-cont">
                      <v-text-field label="Taxes" v-model="taxes" />
                    </div>

                    <div class="input-cont">
                      <v-text-field label="Eng fee" v-model="engFee" />
                    </div>
                  </div>

                  <div class="input-col">
                    <div class="input-cont">
                      <v-text-field label="Type" v-model="typeDeductions" />
                    </div>

                    <div class="input-cont">
                      <v-text-field label="Fronting fee" v-model="frontingFee" />
                    </div>

                    <div class="input-cont">
                      <v-text-field label="Premium reserve Only colombia" v-model="premiumReserve" />
                    </div>
                  </div>

                  <div class="input-col">
                    <div class="input-cont">
                      <v-text-field label="LTA" v-model="lta" />
                    </div>

                    <div class="input-cont">
                      <v-text-field label="Others" v-model="others" />
                    </div>

                    <div class="input-cont">
                      <v-text-field label="Stocks Percentage" v-model="porcentStock" disabled />
                    </div>
                  </div>
                </div>

                <div class="inner-title">Additional</div>
                <div class="input-row w-100 d-flex flex-wrap">
                  <div class="input-col">
                    <div class="input-cont">
                      <v-menu v-model="menu5" :close-on-content-click="false" :nudge-right="40" transition="scale-transition" offset-y min-width="auto">
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field v-model="premiumPaymentDate" label="Premium payment date" readonly v-bind="attrs" v-on="on"></v-text-field>
                        </template>
                        <v-date-picker v-model="premiumPaymentDate" @input="menu5 = false"></v-date-picker>
                      </v-menu>
                    </div>
                  </div>
                  <div class="input-col">
                    <div class="input-cont">
                      <v-autocomplete label="Clause" v-model="clause" :items="clauseList" item-value="clause" item-text="clause" />
                    </div>
                  </div>
                </div>
              </div>
            </v-stepper-content>

            <v-stepper-content step="2">
              <div>
                <Table :tableData="tableData" />
              </div>
              <div class="detail-date">
                <div class="table-title-detail table-title-detail--large">Detail</div>
                <div class="input-col">
                  <div class="input-cont">
                    <v-menu v-model="menu3" :close-on-content-click="false" :nudge-right="40" transition="scale-transition" offset-y min-width="auto">
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field v-model="premiumPaymentDate" label="Premium payment date" readonly v-bind="attrs" v-on="on" disabled></v-text-field>
                      </template>
                      <!-- <v-date-picker
                        v-model="movementEndDate"
                        @input="menu = false"
                        @change="endDateValidation($event, movementEndDate)"
                      ></v-date-picker> -->
                    </v-menu>
                  </div>
                </div>
              </div>
              <div class="input-row w-100 d-flex flex-wrap">
                <div class="input-col">
                  <div class="inner-title">Additional</div>
                  <div class="input-cont">
                    <v-autocomplete label="Clause" v-model="clause" :items="clauseList" item-value="clause" item-text="clause" disabled />
                  </div>
                </div>
                <div class="input-col">
                  <div class="inner-title" style="opacity: 0">|</div>
                  <div class="input-cont">
                    <v-menu :close-on-content-click="false" :nudge-right="40" transition="scale-transition" offset-y min-width="auto">
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field v-model="premiumPaymentDate" label="Premium payment date" readonly v-bind="attrs" v-on="on" disabled></v-text-field>
                      </template>
                      <v-date-picker v-model="premiumPaymentDate"></v-date-picker>
                    </v-menu>
                  </div>
                </div>
              </div>
            </v-stepper-content>

            <v-stepper-content step="3">
              <div class="inner-title">Endorsement Report</div>
              <div class="files-submit flex justify-content-start align-items-start align-content-start">
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
        ref="endorsementDocs"
        :idEndorsement="createdEndorsementId"
        :endorsementDocuments="endorsementDocuments"
        @setEndorsementDocuments="setEndorsementDocuments"
        v-show="e1 == 1 || e1 == 3"
      />
      <AdmittedPremiumTableEngineering v-if="e1 == 2" @setTotalPremium="setTotalPremium" :detailValues="totalPremium" />

      <div class="stepper-btn mt-7 mb-3 d-flex justify-end align-center">
        <v-btn :outlined="e1 == 3 ? false : true" rounded large :text="e1 == 3 ? true : false" :class="e1 == 3 ? 'blue-btn' : 'clear-btn'" :color="e1 == 3 ? 'none' : '#003D6D'" @click="goNext(e1)">
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
import Table from "./../modules/deductions-change/detail/components/Table.vue";
import NewDeductions from "./../modules/deductions-change/endorsement/components/NewDeductions.vue";
import DocumentsEndorsement from "../../components/DocumentsEndorsement.vue";
import InputDaysDiference from "../../components/DaysDiference.vue";
import AdmittedPremiumTableEngineering from "../../components/AdmittedPremiumTableEngineering.vue";
/* services */
import EndorsementService from "../../services/endorsement.service";
import { netPremiumInclusionRiskAutoCalcs } from "@/modules/home/modules/endorsements/engineering/class/netPremiumInclusionRiskEng";
import accountCompleteService from "@/modules/home/services/account-complete.service";
import PaymentService from "@/modules/home/services/payments.service";
/* libs */
import Decimal from "@/lib/decimal";
import EndorsementDocuments from "../../components/EndorsementDocuments.vue";

export default {
  name: "DeductionsChange",
  components: {
    AppFile,
    CurrencyInput,
    Table,
    NewDeductions,
    DocumentsEndorsement,
    InputDaysDiference,
    AdmittedPremiumTableEngineering,
    EndorsementDocuments,
  },
  props: {
    type: { type: String, default: "Deductions Change" },
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
      e1: 1,
      subscriptionId: this.$route.params.id,
      menu: false,
      menu2: false,
      menu3: false,
      menu5: false,
      clause: this.accountComplete.cartera.clausula,
      clauseList: [],
      cartera: {},
      effectiveDate: this.dateSaved,
      movementEndDate: new Date(Date.now() + 31536000000 - new Date().getTimezoneOffset() * 60000).toISOString().substr(0, 10),
      premiumPaymentDate: new Date().toISOString().substr(0, 10),
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
      detail: 20,
      files: [
        {
          fileId: 1,
          fileName: "Report Deductions Change",
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
      createdEndorsementId: 0,
      brokerage: 0,
      taxes: 0,
      engFee: 0,
      typeDeductions: 0,
      frontingFee: 0,
      premiumReserve: 0,
      lta: 0,
      others: 0,
      porcentStock: 0,
      deductible: {},
      sluLine: 0,
      resultOriginalCurenncy: {},
      resultUSD: {},
      currentMovementEndDate: new Date(Date.now() + 31536000000 - new Date().getTimezoneOffset() * 60000).toISOString().substr(0, 10),
      effectiveDateError: false,
      endDateError: false,
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
      buttonTitle: "Next",
      buttonTitleBack: "Cancel",
    };
  },
  async beforeMount() {
    this.clauseList = await PaymentService.getClauses();
  },
  created() {
    const deductibles = this.accountComplete.deductibles;
    const tiv = this.accountComplete.tiv;
    this.brokerage = deductibles.brokerage;
    this.taxes = deductibles.taxes;
    this.engFee = deductibles.eng;
    this.typeDeductions = deductibles.deductionType;
    this.frontingFee = deductibles.fronting;
    this.premiumReserve = deductibles.premiumReserve;
    this.lta = deductibles.lta;
    this.others = deductibles.others;
    this.porcentStock = tiv.insurable.porcentaje;
  },
  async mounted() {},
  computed: {},
  watch: {
    e1: async function () {
      switch (this.e1) {
        case 1:
          this.buttonTitle = "Next";
          this.buttonTitleBack = "Cancel";
          break;
        case 2:
          this.buttonTitle = "Next";
          this.buttonTitleBack = "Return";
          this.deductible = Object.assign(this.accountComplete.deductibles);
          this.deductible.brokerage = this.brokerage;
          this.deductible.taxes = this.taxes;
          this.deductible.eng = this.engFee;
          this.deductible.deductionType = this.typeDeductions;
          this.deductible.lta = this.lta;
          this.deductible.others = this.others;
          this.deductible.fronting = this.frontingFee;
          this.deductible.premiumReserve = this.premiumReserve;
          this.sluLine = this.accountComplete.tiv?.boundInsurableProp.sluLine;
          this.deductible.exchangeRate = Number(this.accountComplete.deductibles.exchangeRate);

          const tivModificado = {
            allRisk: this.accountComplete.tiv.insurable.allRisk,
            alop: this.accountComplete.tiv.insurable.alop,

            allRiskRate: this.accountComplete.tiv.premium.allRiskRate,
            alopRate: this.accountComplete.tiv.premium.alopRate,
          };

          const dates = {
            effetiveDate: new Date(this.accountComplete.deductibles.inceptionDate).toISOString().substring(0, 10),
            expiryDate: new Date(this.accountComplete.deductibles.expiryDate).toISOString().substring(0, 10),
            endormenteffetiveDate: new Date(this.effectiveDate),
            movementEndDate: new Date(this.movementEndDate),
          };

          this.resultOriginalCurenncy = await netPremiumInclusionRiskAutoCalcs(tivModificado, this.deductible, this.sluLine, false, dates);
          this.resultUSD = await netPremiumInclusionRiskAutoCalcs(tivModificado, this.deductible, this.sluLine, true, dates);

          const c_t_t_movement = this.accountComplete.tiv.insurable.total;
          const c_t_t_slu = this.accountComplete.tiv.premium.totalInsured;
          const c_t_t_premium = this.resultOriginalCurenncy.data.netSLUExcludingSurveyFeesTotal;

          const u_t_t_movement = this.accountComplete.tiv.insurable.totalUsd;
          const u_t_t_slu = this.accountComplete.tiv.premium.totalUsd;
          const u_t_t_premium = this.resultUSD.data.netSLUExcludingSurveyFeesTotal;

          this.tableData.currency.total_premium.total_premium_movement = c_t_t_movement;
          this.tableData.currency.total_premium.premium_slu = c_t_t_slu;
          this.tableData.currency.total_premium.net_premium = c_t_t_premium;
          this.tableData.currency.total_premium.total = c_t_t_movement + c_t_t_slu + c_t_t_premium;

          this.tableData.usd.total_premium.total_premium_movement = u_t_t_movement;
          this.tableData.usd.total_premium.premium_slu = u_t_t_slu;
          this.tableData.usd.total_premium.net_premium = u_t_t_premium;
          this.tableData.usd.total_premium.total = u_t_t_movement + u_t_t_slu + u_t_t_premium;
          break;
        case 3:
          this.buttonTitle = "Finalize";
          this.buttonTitleBack = "Return";
          this.accountComplete.deductibles = {
            ...this.accountComplete.deductibles,
            ...this.deductible,
          };
          const premiumOriginal = this.accountComplete.tiv.insurable;

          // Obteniendo premium payment date
          const premiumPaymentDate = new Date(this.premiumPaymentDate).toISOString();

          // Obteniendo la clausula
          const clause = this.clause;

          // Guardando los datos de cartera nuevos
          this.cartera = {
            premiumPaymentDate,
            clausula: clause,
          };
          const endorsmentReporData = {
            cartera: this.cartera,
            totalValues: {
              allRisk: premiumOriginal.allRisk,
              alop: premiumOriginal.alop,
              total: premiumOriginal.total,
              allRiskUsd: premiumOriginal.allRiskUsd,
              alopUsd: premiumOriginal.alopUsd,
              totalUsd: premiumOriginal.totalUsd,
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
              allRisk: this.resultOriginalCurenncy.totalPremiumResult.allRiskTotalPremium,
              alop: this.resultOriginalCurenncy.totalPremiumResult.alopTotalPremium,
              totalInsured: this.resultOriginalCurenncy.totalPremiumResult.total,
              allRiskUsd: this.resultUSD.totalPremiumResult.allRiskTotalPremiumUsd,
              alopUsd: this.resultUSD.totalPremiumResult.alopTotalPremiumUsd,
              totalUsd: this.resultUSD.totalPremiumResult.totalUsd,
            },
            boundInsurableProp: this.accountComplete.tiv?.boundInsurableProp,
            deductibles: this.accountComplete.deductibles,
            netPremium: {
              ...this.resultOriginalCurenncy.data,
              allRiskSluShare: this.resultOriginalCurenncy.data.allRiskPremiumSlu,
              alopSluShare: this.resultOriginalCurenncy.data.alopPremiumSlu,
              sluShareTotal: this.resultOriginalCurenncy.data.totalPremiumSlu,
            },
            netPremiumUSD: {
              ...this.resultUSD.data,
              allRiskSluShare: this.resultUSD.data.allRiskPremiumSlu,
              alopSluShare: this.resultUSD.data.alopPremiumSlu,
              totalPremiumSlu: this.resultUSD.data.totalPremiumSlu,
            },
          };

          try {
            // Invoca el  servicio para generar el excel
            const fileLink = await EndorsementService.getEndorsmentReport({
              subscriptionId: this.subscriptionId,
              endorsmentType: 4,
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
          break;
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
    setTotalPremium({ id, value, concept }) {
      const totalPremium = this.totalPremium.find((el) => el.id === id);
      totalPremium[concept] = value;
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

    setEndorsementDocuments({ files }) {
      this.endorsementDocuments = Array.isArray(files) ? [...files] : [];
    },

    async submit() {
      this.e1 = 1;

      // calcular diferencia del net premium
      const originalNetPremium = this.validateNumericValue(
        this.accountComplete.net_premium?.originalValues
          ?.netSluExcludingSurveyFeesTotal,
        0
      );
      const newNetPremium = this.validateNumericValue(
        this.resultOriginalCurenncy?.data?.netSLUExcludingSurveyFeesTotal,
        0
      );
      const netPremiumDifference = Decimal(newNetPremium)
        .sub(originalNetPremium)
        .toNumber();

      // guardar la cuenta actualizada en BD

      const { allRiskSluShare, alopSluShare, totalPremiumSlu, ...netPremium } = this.resultOriginalCurenncy.data;
      const { allRiskSluShare: allRiskSluShareUSD, alopSluShare: alopSluShareUSD, totalPremiumSlu: totalPremiumSluUSD, ...netPremiumUSD } = this.resultUSD.data;

      const accountCompleteResponse = await accountCompleteService.addAccountComplete(this.subscriptionId, {
        deductibles: this.accountComplete.deductibles,
        tiv: {
          boundInsurableProp: {
            ...this.accountComplete.boundInsurableProp,
          },
          premium: {
            ...this.accountComplete.premium,
            allRisk: this.resultOriginalCurenncy.totalPremiumResult.allRiskTotalPremium,
            alop: this.resultOriginalCurenncy.totalPremiumResult.alopTotalPremium,
            totalInsured: this.resultOriginalCurenncy.totalPremiumResult.total,
            allRiskUsd: this.resultUSD.totalPremiumResult.allRiskTotalPremiumUsd,
            alopUsd: this.resultUSD.totalPremiumResult.alopTotalPremiumUsd,
            totalUsd: this.resultUSD.totalPremiumResult.totalUsd,
          },
          insurable: {
            ...this.accountComplete.insurable,
          },
        },
        netPremium: {
          originalValues: {
            ...netPremium,
            allRiskSluShare: allRiskSluShare,
            alopSluShare: alopSluShare,
            sluShareTotal: totalPremiumSlu,
          },
          usdValues: {
            ...netPremiumUSD,
            allRiskSluShare: allRiskSluShareUSD,
            alopSluShare: alopSluShareUSD,
            sluShareTotal: totalPremiumSluUSD,
          },
        },
        additionalInfo: this.accountComplete.additional_info,
        technicalConditions: this.accountComplete.technical_conditions,
        cartera: {
          ...this.accountComplete.cartera,
          ...this.cartera,
          netPremiumDifference,
        },
      });

      //guardar registro del endoso
      const endorsementResponse = await EndorsementService.addEndorsment({
        subscriptionId: this.subscriptionId,
        endorsmentType: 4,
        idUser: this.$store.state.auth.user.id,
        accountId: accountCompleteResponse.id,
        effectiveDate: this.effectiveDate,
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

    endDateValidation(event, incomingDate) {
      if (Date.parse(incomingDate) < Date.parse(this.currentMovementEndDate)) {
        this.endDateError = true;
      } else {
        this.endDateError = false;
      }
    },
    async endorsementDateValidation(event, incomingDate) {
      if (Date.parse(incomingDate) >= Date.parse(this.movementEndDate)) {
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
  align-items: flex-start;
  justify-content: flex-start;
}
.input-col {
  width: 23%;
  display: block;
  margin-right: 30px;
  margin-left: 60px;
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

.theme--light.v-stepper .v-stepper__step:not(.v-stepper__step--active):not(.v-stepper__step--complete):not(.v-stepper__step--error) .v-stepper__step__step {
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

// Inputs
@import "~@/assets/style/AccordionStyle.less";
.inputs-container {
  width: 100%;
  height: auto;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 2.3%;
  padding: 10px 0px;
  margin-left: 60px;

  &__input {
    width: 23%;
  }
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
  width: 65%;
  height: auto;
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  align-content: flex-start;
}
</style>
