<template>
  <div class="outter-wrapper" ref="targetRef">
    <div class="endorsement-title">Extension GPW</div>

    <div class="editAccount" v-if="accountComplete.reference">
      {{ accountComplete.reference }}
    </div>

    <v-stepper v-model="e1">
      <v-stepper-header>
        <v-stepper-step :complete="e1 > 1" step="1" color="#F59607">
          Endorsement
        </v-stepper-step>

        <v-stepper-step step="2" color="#F59607">
          Admitted premium
        </v-stepper-step>
      </v-stepper-header>

      <div class="endorsement-wrapper">
        <div class="content">
          <v-stepper-items>
            <v-stepper-content step="1" class="step-one">
              <!-- Endorsement date -->
              <div class="input-row w-100 d-flex flex-wrap">
                <div class="inner-title">Endorsement date</div>

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
                          readonly
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
                          v-model="expiryDate"
                          label="Expiry date"
                          readonly
                          v-bind="attrs"
                          v-on:click="on"
                        ></v-text-field>
                      </template>

                      <v-date-picker
                        v-model="expiryDate"
                        @input="menu = false"
                        @change="endDateValidation($event, expiryDate)"
                      ></v-date-picker>
                    </v-menu>

                    <div v-if="this.endDateError" class="error-message">
                      The new Expiry date must be later than current date.
                    </div>
                  </div>
                </div>

                <InputDaysDiference
                  :endorsementDate="effectiveDate"
                  :expiryDate="expiryDatetoCalc"
                  :key="effectiveDate"
                />
              </div>

              <div v-if="showInfoEndorsement">
                <!-- Installments -->
                <div class="input-row w-100 d-flex flex-wrap">
                  <div class="inner-title">Installments</div>
                  <div class="input-col">
                    <v-select
                      v-model="selectedEndorsement"
                      label="Select the endorsement"
                      :items="endorsementOptions"
                      item-value="id"
                      item-text="name"
                    />
                  </div>
                  <PremiumPaymentWarranty
                    ref="premiumPaymentWarranty"
                    @datasReceive="datasReceive"
                    @deleteInstallment="deleteInstallment"
                    @originalInstallmentsReceive="saveOriginalInstallments"
                  />
                </div>

                <!-- Reason -->
                <div class="input-row w-100 d-flex flex-wrap">
                  <div class="inner-title">Reason</div>

                  <div class="description-container">
                    <div class="textArea-cont">
                      <v-textarea
                        v-model="detailReason"
                        background-color="#EDF2F8"
                        height="180"
                        solo
                        flat
                        rounded
                        no-resize
                        class="textArea"
                        counter="500"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </v-stepper-content>

            <v-stepper-content step="2">
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
        @setEndorsementDocuments="setEndorsementDocuments"
        v-show="e1 == 1 || e1 == 2"
      />

      <div class="stepper-btn mt-7 mb-3 d-flex justify-end align-center">
        <v-btn
          :outlined="e1 == 2 ? false : true"
          rounded
          large
          :text="e1 == 2 ? true : false"
          :class="e1 == 2 ? 'blue-btn' : 'clear-btn'"
          :color="e1 == 2 ? 'none' : '#003D6D'"
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
import AppFile from "../../components/AppFile.vue";
import CurrencyInput from "@/components/CurrencyInput/CurrencyInput.vue";
import ClauseSelector from "../modules/deductions-change/detail/components/ClauseSelector.vue";
import PremiumPaymentWarranty from "../modules/deductions-change/detail/components/PremiumPaymentWarranty.vue";
import InputDaysDiference from "../../components/DaysDiference.vue";
import EndorsementDocuments from "../../components/EndorsementDocuments.vue";
import EndorsementReportCompleteTable from "./EndorsementReportCompleteTable.vue";
/* services */
import { getFiles } from "../../services/mock-files.service";
import EndorsementService from "../../services/endorsement.service";
import accountCompleteService from "@/modules/home/services/account-complete.service";
import PaymentService from "@/components/subscription/bound/services/payment.service";
import { netPremiumInclusionRiskAutoCalcs } from "../class/netPremiumInclusionRisk";

/* libs */
/* utils */
import { removeDollarSign } from "../utils";

export default {
  name: "ExtensionGPW",
  components: {
    AppFile,
    CurrencyInput,
    ClauseSelector,
    PremiumPaymentWarranty,
    InputDaysDiference,
    EndorsementDocuments,
    EndorsementReportCompleteTable,
  },
  props: {
    type: { type: String, default: "Extension GPW" },
    backToCreateEndorsement: {
      type: Function,
    },
    accountComplete: { type: Object },
    changeDateEndorsement: {
      type: Function,
    },
    dateSaved: { type: String },
    showInfoEndorsement: { type: Boolean },
    selectedEndorsementId: { type: Number },
    listEndorsement: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      originalInstallments: [],
      selectedEndorsement: 0,
      endorsementDocuments: [],
      endorsementDateError: false,
      expiryDatetoCalc: this.accountComplete.deductibles.expiryDate,
      attrs: null,
      on: true,
      movementValues: [
        {
          id: 1,
          name: "Original Currency",
          allRisk: 0,
          alop: 0,
          totalAllRisk: this.accountComplete.tiv.insurable.allRisk,
          totalAlop: this.accountComplete.tiv.insurable.alop,
        },
        {
          id: 2,
          name: "USD",
          allRisk: 0,
          alop: 0,
          totalAllRisk: this.accountComplete.tiv.insurable.allRiskUsd,
          totalAlop: this.accountComplete.tiv.insurable.alopUsd,
        },
      ],
      subscriptionId: this.$route.params.id,
      e1: 1,
      menu: false,
      menu2: false,
      effectiveDate: this.dateSaved || new Date().toISOString().substr(0, 10),
      expiryDate: new Date(
        Date.now() + 31536000000 - new Date().getTimezoneOffset() * 60000
      )
        .toISOString()
        .substr(0, 10),
      newPaymentDate: new Date(
        Date.now() + 31536000000 - new Date().getTimezoneOffset() * 60000
      )
        .toISOString()
        .substr(0, 10),
      premiumPaymentDay: new Date().toISOString().substr(0, 10),
      detail: 20,
      files: [
        {
          fileId: 1,
          fileName: "Report Extension GPW",
          fileDownloadLink: "",
          loaded: false,
          error: false,
          errorMessage: "Could not load the file",
          loading: true,
          fileType: "xlsx",
          fileTypeMessage: "Download",
        },
      ],
      insurable: [],
      currentMovementEndDate: new Date(
        Date.now() + 31536000000 - new Date().getTimezoneOffset() * 60000
      )
        .toISOString()
        .substr(0, 10),
      effectiveDateError: false,
      endDateError: false,
      detailReason: " ",
      detailDescription: " ",
      currencyOptions: {
        currency: "MXN",
        currencyDisplay: "narrowSymbol",
        locale: "en-US",
      },
      installmentNumber: [1, 2, 3, 4],
      installmentValue: "",
      assignedPercentage: 16,
      clauseList: [],
      clause: this.accountComplete.cartera?.clausula || "",
      cartera: {},
      newClause: "",
      currentClause: "",
      additionalClause: "",
      daysNotice: "",
      allDatas: [],
      installmentsForExcel: [],
      paymentsWarranty: [],
      allRisk: 0,
      alop: 0,
      brokerage: 0,
      taxes: 0,
      engFee: 0,
      deductionType: 0,
      frontingFee: 0,
      premiumReserve: 0,
      lta: 0,
      others: 0,
      porcentStock: 0,
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
      endorsmentReporData: {},
      isEdited: {},
      idArrayToDelete: [],
      buttonTitle: "Next",
      buttonTitleBack: "Cancel",
    };
  },
  async beforeMount() {
    try {
      this.clauseList = await PaymentService.getClauses();
      if (this.accountComplete.cartera?.clausula) {
        this.clause = this.accountComplete.cartera.clausula;
      }
    } catch (error) {
      console.warn("Could not load clauses:", error);
      this.clauseList = [];
    }
  },
  async mounted() {
    if (!this.dateSaved) {
      this.effectiveDate = new Date().toISOString().substr(0, 10);
      this.endorsementDateValidation(null, this.effectiveDate);
    }
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
    endorsementOptions() {
      const options = this.listEndorsement.map((endorsement) => {
        return {
          id: endorsement.id,
          name: `${endorsement.EndorsementType?.type || "Unknown"} - ${new Date(
            endorsement.effective_date
          ).toLocaleDateString()}`,
        };
      });
      return [{ id: 0, name: "Original Account" }, ...options];
    },
  },
  created() {
    const deductibles = this.accountComplete.deductibles;
    const tiv = this.accountComplete.tiv;
    this.brokerage = deductibles.brokerage;
    this.taxes = deductibles.taxes;
    this.engFee = deductibles.eng;
    this.deductionType = deductibles.deductionType;
    this.frontingFee = deductibles.fronting;
    this.premiumReserve = deductibles.premiumReserve;
    this.lta = deductibles.lta;
    this.others = deductibles.others;
    this.porcentStock = tiv.insurable.porcentaje;
  },
  watch: {
    selectedEndorsement(newVal) {
      this.loadInstallmentsBySelectedEndorsement(newVal);
    },
    e1: async function () {
      switch (this.e1) {
        case 1:
          this.isEdited = {};
          this.buttonTitle = "Next";
          this.buttonTitleBack = "Cancel";
          break;

        case 2:
          this.buttonTitle = "Finalize";
          this.buttonTitleBack = "Return";
          this.deductible = Object.assign(this.accountComplete.deductibles);
          this.deductible.brokerage = this.brokerage;
          this.deductible.taxes = this.taxes;
          this.deductible.eng = this.engFee;
          this.deductible.deductionType = this.deductionType;
          this.deductible.lta = this.lta;
          this.deductible.others = this.others;
          this.deductible.fronting = this.frontingFee;
          this.deductible.premiumReserve = this.premiumReserve;
          this.sluLine = this.accountComplete.tiv?.boundInsurableProp.sluLine;

          // ** En este endoso no hay tivMovement, le pasamos directamente los valores de accountComplete
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
            effetiveDate: new Date(
              this.accountComplete.deductibles.inceptionDate
            )
              .toISOString()
              .substring(0, 10),
            expiryDate: new Date(this.accountComplete.deductibles.expiryDate)
              .toISOString()
              .substring(0, 10),
            endormenteffetiveDate: new Date(this.effectiveDate),
            movementEndDate: new Date(this.expiryDate),
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

          // Obteniendo premium payment date
          const premiumPaymentDate = new Date(
            this.premiumPaymentDay
          ).toISOString();
          this.cartera = {
            premiumPaymentDate,
            clausula: this.clause,
          };
          this.accountComplete.deductibles = this.deductible;
          const premiumOriginal = this.accountComplete.tiv.insurable;

          const endorsmentReporData = {
            cartera: this.cartera,
            totalValues: {
              damage: premiumOriginal.propertyDamage,
              bi: premiumOriginal.businessInterruption,
              stocks: premiumOriginal.stock,
              total: premiumOriginal.sluTotal,
              damageUsd: premiumOriginal.propertyDamageUsd,
              biUsd: premiumOriginal.businessInterruptionUsd,
              stocksUsd: premiumOriginal.stockUsd,
              totalUsd: premiumOriginal.totalUsd,
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
            deductibles: this.deductible,
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

          this.endorsmentReporData = endorsmentReporData;

          try {
            // Invoca el  servicio para generar el excel
            const fileLink = await EndorsementService.getEndorsmentReport({
              subscriptionId: this.subscriptionId,
              endorsmentType: 10,
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
    loadInstallmentsBySelectedEndorsement(endorsementId) {
      if (endorsementId === 0) {
        if (this.originalInstallments.length > 0) {
          const originalInstallments = JSON.parse(
            JSON.stringify(this.originalInstallments)
          );
          if (this.$refs.premiumPaymentWarranty) {
            this.$refs.premiumPaymentWarranty.paymentsWarranty = [
              ...originalInstallments,
            ];
            this.$refs.premiumPaymentWarranty.addPaymentDisabled =
              originalInstallments.length >= 3;
          }
          this.allDatas = [...originalInstallments];
        }
        return;
      }

      const endorsementSelected = this.listEndorsement.find(
        (endorsement) => endorsement.id === endorsementId
      );

      if (!endorsementSelected) return;
      const cartera = endorsementSelected?.report?.endorsmentReporData?.cartera;
      const premiumPaymentDate =
        cartera?.premiumPaymentDate?.substring(0, 10) ||
        new Date().toISOString().substr(0, 10);
      const clauseName = cartera?.clausula || "";
      const idClause =
        this.clauseList.find((cl) => cl.clause === clauseName)?.id || "";

      const installment = {
        id: null,
        index: 1,
        installment: 1,
        percent: 100,
        date: premiumPaymentDate,
        idClause,
        ...(cartera?.days_of_prior_notice && {
          days_of_prior_notice: cartera.days_of_prior_notice,
        }),
        showCalendar: false,
      };

      if (this.$refs.premiumPaymentWarranty) {
        this.$refs.premiumPaymentWarranty.paymentsWarranty = [installment];
        this.$refs.premiumPaymentWarranty.addPaymentDisabled = true;
      }

      this.allDatas = [installment];
    },

    saveOriginalInstallments(originalInstallments) {
      if (this.originalInstallments.length === 0) {
        this.originalInstallments = JSON.parse(
          JSON.stringify(originalInstallments)
        );
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

    setEndorsementDocuments({ files }) {
      this.endorsementDocuments = files;
    },

    async submit() {
      this.e1 = 1;

      // Obteniendo el insurable
      const tiv = this.accountComplete.tiv.insurable;

      // actualizando tiv.insurable de account complete
      const tivUpdate = {
        insurable: {
          propertyDamage: tiv.propertyDamage,
          businessInterruption: tiv.businessInterruption,
          stock: tiv.stock,

          propertyDamageUsd: tiv.propertyDamageUsd,
          businessInterruptionUsd: tiv.businessInterruptionUsd,
          stockUsd: tiv.stockUsd,

          total: tiv.total,
          totalUsd: tiv.totalUsd,

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
        boundInsurableProp: this.accountComplete.tiv?.boundInsurableProp,
      };

      // guardar la cuenta actualizada en BD
      const accountCompleteResponse =
        await accountCompleteService.addAccountComplete(this.subscriptionId, {
          ...this.accountComplete,
          deductibles: this.deductible,
          tiv: tivUpdate,
          netPremium: {
            originalValues: {
              netTotal:
                this.accountComplete.net_premium.originalValues.netTotal,
            },
          },
          technicalConditions: this.accountComplete.technical_conditions,
          cartera: {
            ...this.accountComplete.cartera,
            ...this.cartera,
            admitedPremium: this.admitedPremium,
          },
        });

      //guardar registro del endoso
      const endorsementResponse = await EndorsementService.addEndorsment({
        subscriptionId: this.subscriptionId,
        endorsmentType: 10,
        idUser: this.$store.state.auth.user.id,
        accountId: accountCompleteResponse.id,
        effectiveDate: this.effectiveDate,
        report: {
          endorsmentReporData: {
            ...this.endorsmentReporData,
            additionalInfo: {
              detailDescription: this.detailDescription,
              paymentsWarranty: [],
              endorsementSelected: this.selectedEndorsementId, // <== id del endoso seleccionado
            },
          },
          cartera: {
            ...this.accountComplete.cartera,
            ...this.cartera,
            admitedPremium: this.admitedPremium,
          },
        },
        files: this.endorsementDocuments,
      });

      // Guardar todo lo hecho en installments
      // this.allDatas.map(async (el) => {
      //   if (el.typeOfOperation === "addOrUpdate") {
      //     // Actualizar o agregar
      //     const paymentResponse = await PaymentService.addOrUpdatePayment(
      //       {
      //         id: el.id,
      //         column: el.column,
      //         value: el.value,
      //       },
      //       el.index,
      //       el.subscriptionId
      //     );
      //   }
      //   if (el.typeOfOperation === "deletePayment") {
      //     const paymentResponse = await PaymentService.deletePayment(
      //       el.id,
      //       el.subscriptionId
      //     );
      //   }
      // });

      this.idArrayToDelete.map(async (el) => {
        const paymentResponse = await PaymentService.deletePayment(
          el,
          this.subscriptionId
        );
      });

      await PaymentService.addOrUpdatePayments(
        this.allDatas,
        this.subscriptionId
      );

      // getPayments
      const payments = await PaymentService.getPayments(this.subscriptionId);

      // update endorsement.report.endorsmentReporData.additionalInfo.paymentsWarranty
      const report = {
        ...endorsementResponse.report,
        endorsmentReporData: {
          ...endorsementResponse.report.endorsmentReporData,
          additionalInfo: {
            ...endorsementResponse.report.endorsmentReporData.additionalInfo,
            paymentsWarranty: payments,
          },
        },
      };

      await EndorsementService.editEndorsement({
        endorsementId: endorsementResponse.id,
        columnName: "report",
        value: report,
      });

      await this.backToCreateEndorsement();
    },

    deleteInstallment(id) {
      this.idArrayToDelete = [...this.idArrayToDelete, id];
    },

    endDateValidation(event, incomingDate) {
      if (Date.parse(incomingDate) < Date.parse(this.currentMovementEndDate)) {
        this.endDateError = true;
      } else {
        this.endDateError = false;
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
    keepDescription() {
      this.e1 = 2;
      this.detailDescription = this.detailReason;
    },

    datasReceive(datasUpdate) {
      this.allDatas = [...datasUpdate];
      console.log("this.allDatas", this.allDatas);
    },

    goNext(e1) {
      this.$refs.targetRef.scrollIntoView({ behavior: "smooth" });
      if (e1 == 1) {
        this.keepDescription();
      } else if (e1 == 2) {
        this.submit();
      }
    },

    goBack(e1) {
      this.$refs.targetRef.scrollIntoView({ behavior: "smooth" });
      if (e1 == 1) {
        this.backToCreateEndorsement();
      } else if (e1 == 2) {
        this.e1 = 1;
      }
    },
  },
};
</script>
<style lang="less" scoped>
@import "~@/assets/style/AccordionStyle.less";
@import "~@/assets/style/ExtensionGPW.less";
.report-complete {
  overflow: auto;
}
</style>
