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
                    <div v-if="this.endorsementDateError" class="error-message">
                      The new Endorsement effective date must be lower than
                      expiry date.
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

                  <!-- Select endorsement -->
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
        ref="endorsementDocs"
        :idEndorsement="createdEndorsementId"
        :endorsementDocuments="endorsementDocuments"
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
import MovementValues from "./MovementValuesEng.vue";
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
import { netPremiumInclusionRiskAutoCalcs } from "../class/netPremiumInclusionRiskEng";

/* libs */

export default {
  name: "ExtensionGPW",
  components: {
    AppFile,
    MovementValues,
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
      endorsmentReporData: {},
      endorsementDocuments: [],
      createdEndorsementId: 0,
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
      effectiveDate: this.dateSaved,
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
      clause: this.accountComplete.cartera?.clausula || "",
      cartera: {},
      clauseList: [],
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

          this.paymentsWarranty = await PaymentService.getPayments(
            this.subscriptionId
          );
          this.installmentsForExcel = [...this.paymentsWarranty];
          this.allDatas.map((elModified) => {
            this.paymentsWarranty.map((el) => {
              if (elModified.typeOfOperation === "addOrUpdate") {
                if (el.index === elModified.index) {
                  if (elModified.column === "installment") {
                    this.installmentsForExcel[el.index - 1] = {
                      ...this.installmentsForExcel[el.index - 1],
                      installment: elModified.value,
                    };
                  }
                  if (elModified.column === "ppw_date") {
                    this.installmentsForExcel[el.index - 1] = {
                      ...this.installmentsForExcel[el.index - 1],
                      date: elModified.value,
                    };
                  }
                  if (elModified.column === "percent") {
                    this.installmentsForExcel[el.index - 1] = {
                      ...this.installmentsForExcel[el.index - 1],
                      percent: elModified.value,
                    };
                  }
                  if (elModified.column === "id_payment_clause") {
                    this.installmentsForExcel[el.index - 1] = {
                      ...this.installmentsForExcel[el.index - 1],
                      id_payment_clause: elModified.value,
                    };
                  }
                }
              }
              if (elModified.typeOfOperation === "deletePayment") {
                this.installmentsForExcel.splice(elModified.index - 1, 1);
              }
            });
          });

          this.installmentsForExcel.map((el) => {
            this.clauseList.map((clause) => {
              if (el.idClause === clause.id) el.idClause = clause.clause;
            });
          });

          this.accountComplete.deductibles = this.deductible;
          const premiumOriginal = this.accountComplete.tiv.insurable;
          const premiumUSD = this.detailValues.find((el) => el.id === 2);

          const tiv = this.accountComplete.tiv;
          const tivMovement = {
            allRisk: tiv.insurable.allRisk,
            alop: tiv.insurable.alop,

            allRiskRate: tiv.premium.allRiskRate,
            alopRate: tiv.premium.alopRate,
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
              premiumAllRisk: this.totalPremium[0].premiumAllRisk,
              premiumAlop: this.totalPremium[0].premiumAlop,
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

          const premiumPaymentDate = new Date(
            this.premiumPaymentDay
          ).toISOString();
          this.cartera = {
            premiumPaymentDate,
            clausula: this.clause,
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
              allRisk: this.totalPremium[0].premiumAllRisk,
              alop: this.totalPremium[0].premiumAlop,
              totalInsured: this.totalPremium[0].premiumTotal,
              allRiskRate: this.accountComplete.tiv.premium.allRiskRate,
              alopRate: this.accountComplete.tiv.premium.alopRate,
              allRiskUsd: premiumUSD.premiumAllRisk,
              alopUsd: premiumUSD.premiumAlop,
              totalUsd: premiumUSD.premiumAllRisk + premiumUSD.premiumAlop,
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

          this.endorsmentReporData = endorsmentReporData;

          try {
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
          } catch (error) {}
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
        this.$refs.premiumPaymentWarranty.addPaymentDisabled = false;
      }

      this.allDatas = [installment];
    },
    async stepone() {
      this.e1 = 2;
    },

    async nextStep() {},
    async prevStep() {},

    async saveEndorsement() {},

    async removeFileById({ id }) {},

    async loadingFile({ data }) {},

    async updateFile(data) {},

    setEndorsementDocuments({ files }) {
      this.endorsementDocuments = Array.isArray(files) ? [...files] : [];
    },

    async submit() {
      this.e1 = 1;

      // actualizando tiv.insurable de account complete
      const tiv = this.accountComplete.tiv;
      const tivUpdate = {
        insurable: {
          allRisk: tiv.allRisk,
          alop: tiv.alop,
          total: tiv.total,

          allRiskUsd: tiv.allRiskUsd,
          alopUsd: tiv.alopUsd,
          totalUsd: tiv.totalUsd,
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
          deductibles: this.deductible,
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
      });
      if (endorsementResponse?.id) {
        this.createdEndorsementId = endorsementResponse.id;
        if (this.endorsementDocuments.length) {
          await this.$nextTick();
          await this.$refs.endorsementDocs.uploadPendingFiles();
        }
      }

      // Guardar todo lo hecho en installments
      // this.allDatas.map(async el => {
      //   if (el.typeOfOperation === 'addOrUpdate') {
      //     // Actualizar o agregar
      //     const paymentResponse = await PaymentService.addOrUpdatePayment({
      //       id: el.id, column: el.column, value: el.value
      //     }, el.index, el.subscriptionId)
      //   }
      //   if (el.typeOfOperation === 'deletePayment') {
      //     const paymentResponse = await PaymentService.deletePayment(el.id, el.subscriptionId)
      //   }
      // })

      this.idArrayToDelete.map(async (el) => {
        const paymentResponse = await PaymentService.deletePayment(
          el,
          endorsementResponse.id
        );
      });

      const cleanedInstallments = this.allDatas.map((item) => {
        const copy = { ...item };
        if (!copy.days_of_prior_notice) delete copy.days_of_prior_notice;
        return copy;
      });

      await PaymentService.addOrUpdatePayments(
        cleanedInstallments,
        endorsementResponse.id
      );

      // getPayments
      const payments = await PaymentService.getPayments(endorsementResponse.id);

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
      this.createdEndorsementId = 0;
      this.endorsementDocuments = [];
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
    },

    saveOriginalInstallments(originalInstallments) {
      if (this.originalInstallments.length === 0) {
        this.originalInstallments = JSON.parse(
          JSON.stringify(originalInstallments)
        );
      }
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

.textArea-cont {
  margin-top: 20px;
}

.description-container {
  width: 80%;
  // margin: 40px 0;
}

.description-container-step2 {
  width: 80%;
  margin: 40px auto;
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
.report-complete {
  overflow: auto;
}
</style>
