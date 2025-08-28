<template>
  <div class="outter-wrapper" ref="targetRef">
    <div class="endorsement-title">Change of period</div>
    <v-stepper v-model="e1">
      <v-stepper-header>
        <v-stepper-step :complete="e1 > 1" step="1" color="#F59607">
          Endorsement
        </v-stepper-step>

        <v-stepper-step :complete="e1 > 2" step="2" color="#F59607">
          Detail
        </v-stepper-step>

        <v-stepper-step step="3" color="#F59607">
          Admitted premium
        </v-stepper-step>
      </v-stepper-header>
      <div class="endorsement-wrapper">
        <div class="content">
          <v-stepper-items>
            <v-stepper-content step="1" class="step-one">
              <div class="input-row w-100 d-flex flex-wrap">
                <div class="input-col">
                  <div class="input-cont">
                    <v-text-field
                      v-model.number="exchangeRate"
                      label="Exchange rate"
                      type="number"
                    />
                  </div>
                </div>
                <div class="input-col">
                  <div class="input-cont">
                    <v-text-field
                      v-model.number="share"
                      label="Share"
                      suffix="%"
                      type="number"
                    />
                  </div>
                </div>
              </div>
              <div class="inner-title">Date</div>
              <div class="input-row w-100 d-flex flex-wrap">
                <div class="input-col">
                  <div class="input-cont">
                    <v-text-field
                      v-model="InceptionDate"
                      label="Inception date"
                      readonly
                      disabled
                    />
                  </div>
                </div>
                <div class="input-col">
                  <div class="input-cont">
                    <v-text-field
                      v-model="ExpiryDate"
                      label="Expiry date"
                      readonly
                      disabled
                    />
                  </div>
                </div>
              </div>
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
                          readonly
                          v-bind="attrs"
                          v-on="on"
                        />
                      </template>
                      <v-date-picker
                        v-model="effectiveDate"
                        @input="menu2 = false"
                        @change="
                          endorsementDateValidation($event, effectiveDate)
                        "
                      />
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
                      v-model="menu6"
                      :close-on-content-click="false"
                      :nudge-right="40"
                      transition="scale-transition"
                      offset-y
                      min-width="auto"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="workStopDate"
                          label="Reactivation of works"
                          readonly
                          v-bind="attrs"
                          v-on="on"
                        />
                      </template>
                      <v-date-picker
                        v-model="workStopDate"
                        @input="menu6 = false"
                        @change="StoppageDateValidation($event, workStopDate)"
                      />
                    </v-menu>
                    <div v-if="this.stoppageDateError" class="error-message">
                      The new stoppage end date must be less than expiry date.
                    </div>
                  </div>
                </div>
                <InputDaysDiference
                  :endorsementDate="effectiveDate"
                  :expiryDate="workStopDate"
                  :key="effectiveDate + workStopDate"
                />
              </div>
              <div v-if="showInfoEndorsement">
                <div class="input-row w-100 d-flex flex-wrap">
                  <div class="w-100">
                    <div class="inner-title">
                      Description (up to 300 characters)
                    </div>
                    <div class="textarea-stopped-container">
                      <v-textarea
                        v-model="reason"
                        class="textarea-stopped"
                        variant="filled"
                        auto-grow
                        rows="4"
                        row-height="30"
                        :maxlength="300"
                      ></v-textarea>
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
                    <div class="input-cont">
                      <v-menu
                        v-model="menu5"
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
                          @input="menu5 = false"
                        ></v-date-picker>
                      </v-menu>
                    </div>
                  </div>
                </div>
              </div>
            </v-stepper-content>
            <v-stepper-content step="2">
              <ModalEndorsement
                v-if="modalOpen"
                :modal="modal"
                :actionButton1="actionButton1"
                :actionButton2="actionButton2"
              />
              <div class="detail-container-step2">
                Admited premium
                <div class="detail-container-step2">
                  <div
                    class="input-row w-80 d-flex flex-wrap detail-subcontainer-step2"
                  >
                    <div class="input-col">
                      <div class="inner-title">Detail</div>
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
                              v-bind="attrs"
                              v-on="on"
                              disabled
                            ></v-text-field>
                          </template>
                          <v-date-picker
                            v-model="premiumPaymentDate"
                          ></v-date-picker>
                        </v-menu>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="container-modify-general">
                <div class="subcontainer-modify-general">
                  Modify table
                  <input
                    @change="onChangeModifyTable($event)"
                    :checked="checkedModifyTable"
                    v-model="checkedModifyTable"
                    id="checkbox"
                    type="checkbox"
                  />
                </div>
              </div>
              <div class="table-container container-input-row justify-center">
                <div class="table-col-subtitle">
                  <div class="table-title-empty"></div>
                  <div class="input-row">
                    <div class="inner-col">
                      <div class="table-input table-title-without-bg">
                        All Risk
                      </div>
                      <div class="table-input table-title-without-bg">ALOP</div>
                      <div class="table-input table-title-without-bg">
                        Total
                      </div>
                    </div>
                  </div>
                </div>
                <div class="table-col">
                  <div class="table-title-empty-two">Total premium</div>
                  <div class="table-title-left">Original currency</div>
                  <div class="input-row">
                    <div class="inner-col">
                      <div class="table-input-heigth blue-input">
                        <div
                          class="table-input-data"
                          :readonly="!checkedModifyTable"
                        >
                          {{ formatCurrency(totalPremium[0].premiumAllRisk) }}
                        </div>
                      </div>
                      <div class="table-input-heigth blue-input">
                        <div
                          class="table-input-data"
                          :readonly="!checkedModifyTable"
                        >
                          {{ formatCurrency(totalPremium[0].premiumAlop) }}
                        </div>
                      </div>
                      <div class="table-input-heigth blue-input">
                        <div
                          class="table-input-data"
                          :readonly="!checkedModifyTable"
                        >
                          {{ formatCurrency(totalPremium[0].premiumTotal) }}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="table-col">
                  <div class="table-title-empty-two">Premium SLU</div>
                  <div class="table-title-left">Original currency</div>
                  <div class="input-row">
                    <div class="inner-col">
                      <div class="table-input-heigth blue-input">
                        <div
                          class="table-input-data"
                          :readonly="!checkedModifyTable"
                        >
                          {{ formatCurrency(totalPremium[0].sluAllRisk) }}
                        </div>
                      </div>
                      <div class="table-input-heigth blue-input">
                        <div
                          class="table-input-data"
                          :readonly="!checkedModifyTable"
                        >
                          {{ formatCurrency(totalPremium[0].sluAlop) }}
                        </div>
                      </div>
                      <div class="table-input-heigth blue-input">
                        <div
                          class="table-input-data"
                          :readonly="!checkedModifyTable"
                        >
                          {{ formatCurrency(totalPremium[0].sluTotal) }}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                v-if="totalPremium[1].premiumTotal > 0"
                class="table-container container-input-row justify-center mt-6"
              >
                <div class="table-col-subtitle">
                  <div class="table-title-empty"></div>
                  <div class="input-row">
                    <div class="inner-col">
                      <div class="table-input table-title-without-bg">
                        All Risk
                      </div>
                      <div class="table-input table-title-without-bg">ALOP</div>
                      <div class="table-input table-title-without-bg">
                        Total
                      </div>
                    </div>
                  </div>
                </div>
                <div class="table-col">
                  <div class="table-title-empty-two">USD</div>
                  <div class="container-table-subtitles">
                    <div class="table-title-left">Total premium</div>
                    <div class="table-title-rigth">Premium SLU</div>
                  </div>
                  <div class="input-row">
                    <div class="inner-col">
                      <div class="table-input-heigth blue-input space-between">
                        <div class="table-input-data">
                          {{ formatCurrency(totalPremium[1].premiumAllRisk) }}
                        </div>
                        <div class="table-input-data">
                          {{ formatCurrency(totalPremium[1].sluAllRisk) }}
                        </div>
                      </div>
                      <div class="table-input-heigth blue-input space-between">
                        <div class="table-input-data">
                          {{ formatCurrency(totalPremium[1].premiumAlop) }}
                        </div>
                        <div class="table-input-data">
                          {{ formatCurrency(totalPremium[1].sluAlop) }}
                        </div>
                      </div>
                      <div class="table-input-heigth blue-input space-between">
                        <div class="table-input-data">
                          {{ formatCurrency(totalPremium[1].premiumTotal) }}
                        </div>
                        <div class="table-input-data">
                          {{ formatCurrency(totalPremium[1].sluTotal) }}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- <div class="content">
                <div class="inner-title">Detail</div>
                <div class="input-col">
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
                          v-model="effectiveDate"
                          label="Endorsement effective date"
                          readonly
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
                      v-model="menu"
                      :close-on-content-click="false"
                      :nudge-right="40"
                      transition="scale-transition"
                      offset-y
                      min-width="auto"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="workStopDate"
                          label="Work stoppage end date"
                          readonly
                          v-bind="attrs"
                          v-on="on"
                        ></v-text-field>
                      </template>
                    </v-menu>
                    <div v-if="this.endDateError" class="error-message">
                      The new Movement end date must be later than current date.
                    </div>
                  </div>
                </div>
                <div class="input-col">
                  <div class="input-cont">
                    <v-menu
                      v-model="menu9"
                      :close-on-content-click="false"
                      :nudge-right="40"
                      transition="scale-transition"
                      offset-y
                      min-width="auto"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="ExpiryDate"
                          label="Expiry date"
                          readonly
                          v-bind="attrs"
                          v-on="on"
                        ></v-text-field>
                      </template>
                    </v-menu>
                    <div v-if="this.endDateError" class="error-message">
                      The new Movement end date must be later than current date.
                    </div>
                  </div>
                </div>
              </div> -->
              <!-- <div class="input-row-center w-100 d-flex flex-wrap">
                <div class="w-100">
                  <div class="inner-title">Reason for the stop</div>
                  <div class="textarea-stopped-container-readonly">
                    <v-textarea
                      v-model="reason"
                      class="textarea-stopped"
                      variant="filled"
                      auto-grow
                      rows="4"
                      row-height="30"
                      :maxlength="300"
                      readonly
                    ></v-textarea>
                  </div>
                </div>
              </div> -->
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
import ModalEndorsement from "../../components/ModalEndorsement.vue";
import EndorsementReportCompleteTable from "./EndorsementReportCompleteTable.vue";
/* services */
import EndorsementService from "../../services/endorsement.service";
import PaymentService from "@/modules/home/services/payments.service";
import AccountCompleteService from "@/modules/home/services/account-complete.service";
import EndorsementDocuments from "../../components/EndorsementDocuments.vue";
import {
  netPremiumInclusionRiskEng,
  netPremiumInclusionRiskAutoCalcs,
} from "../class/netPremiumInclusionRiskEng";
/* libs */
import Decimal from "@/lib/decimal";
import { formatCurrency } from "@/modules/home/modules/endorsements/utils";

export default {
  name: "constructionWorkStoppage",
  components: {
    AppFile,
    CurrencyInput,
    DocumentsEndorsement,
    InputDaysDiference,
    ModalEndorsement,
    EndorsementDocuments,
    EndorsementReportCompleteTable,
  },
  props: {
    type: { type: String, default: "construction Work Stoppage" },
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
      checkedModifyTable: false,
      modalOpen: false,
      modal: {
        title: "Changes admited premium",
        body: `If you continue, the data entered in the
        <br />
        admitted premium table will be taken.`,
        Button1: "Accept",
        Button2: "Cancel",
        includeFooter: true,
        includeCloseButton: false,
      },
      endorsementDateError: false,
      expiryDatetoCalc: this.accountComplete.deductibles.expiryDate,
      subscriptionId: this.$route.params.id,
      attrs: {},
      on: {},
      e1: 1,
      menu: false,
      menu2: false,
      menu3: false,
      menu5: false,
      menu9: false,
      menu6: false,
      menu8: false,
      reason: "",
      exchangeRate: Number(this.accountComplete.deductibles.exchangeRate || 0),
      share: this.accountComplete.tiv?.boundInsurableProp?.sluLine || 0,
      clause: this.accountComplete.cartera.clausula,
      clauseList: [],
      cartera: {},
      effectiveDate: this.dateSaved,
      workStopDate: new Date(
        Date.now() + 31536000000 - new Date().getTimezoneOffset() * 60000
      )
        .toISOString()
        .substr(0, 10),
      workStopDateCalc: new Date(
        Date.now() + 31536000000 - new Date().getTimezoneOffset() * 60000
      ),
      ExpiryDate: new Date(this.accountComplete.deductibles.expiryDate)
        .toISOString()
        .substr(0, 10),
      InceptionDate: new Date(this.accountComplete.deductibles.inceptionDate)
        .toISOString()
        .substr(0, 10),
      stoppageDateError: false,
      premiumPaymentDate: new Date().toISOString().substr(0, 10),
      movementEndDate4: new Date(
        Date.now() + 31536000000 - new Date().getTimezoneOffset() * 60000
      )
        .toISOString()
        .substr(0, 10),
      movementEndDate5: new Date(
        Date.now() + 31536000000 - new Date().getTimezoneOffset() * 60000
      )
        .toISOString()
        .substr(0, 10),
      files: [
        {
          fileId: 1,
          fileName: "Report Construction Work Stoppage",
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
      admitedPremium: 0,
      isEdited: {},
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
          netAllRisk: 0,
          netAlop: 0,
          netTotal: 0,
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
          netAllRisk: 0,
          netAlop: 0,
          netTotal: 0,
        },
      ],
      buttonTitle: "Next",
      buttonTitleBack: "Cancel",
    };
  },
  async beforeMount() {
    this.clauseList = await PaymentService.getClauses();
    this.stoppageDateError =
      Date.parse(this.workStopDateCalc) > Date.parse(this.expiryDatetoCalc);
  },
  created() {},

  async mounted() {},
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

        const excel = await this.getExcel();
        const file = this.files.find((file) => file.fileId === 1);

        if (!excel) {
          file.error = true;
        } else {
          file.fileDownloadLink = excel;
          file.loaded = true;
          file.loading = false;
        }
      }
    },
    exchangeRate(val) {
      this.accountComplete.deductibles.exchangeRate = val;
    },
    share(val) {
      if (
        this.accountComplete.tiv &&
        this.accountComplete.tiv.boundInsurableProp
      ) {
        this.accountComplete.tiv.boundInsurableProp.sluLine = val;
      }
    },
  },
  methods: {
    async removeFileById({ id }) {
      console.log("remove file");
    },

    async loadingFile({ data }) {
      console.log("loafing file");
    },

    async updateFile(data) {
      console.log("update file");
    },

    actionButton1() {
      this.modalOpen = false;
    },
    actionButton2() {
      this.checkedModifyTable = !this.checkedModifyTable;
      document.getElementById("checkbox").checked = false;
      this.modalOpen = false;
    },
    onChangeModifyTable(event) {
      this.modalOpen = event.target.checked;
      if (!event.target.checked) {
        this.checkedModifyTable = false;
      }
    },

    setEndorsementDocuments({ files }) {
      this.endorsementDocuments = files;
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
              netSluExcludingSurveyFeesTotal:
                this.accountComplete.net_premium.originalValues
                  .netSluExcludingSurveyFeesTotal,
            },
          },
          cartera: {
            ...this.accountComplete.cartera,
            ...this.cartera,
            admitedPremium: this.admitedPremium,
          },
        });

      //guardar registro del endoso
      await EndorsementService.addEndorsment({
        subscriptionId: this.subscriptionId,
        endorsmentType: 9,
        idUser: this.$store.state.auth.user.id,
        accountId: accountCompleteResponse.id,
        effectiveDate: this.effectiveDate,
        report: {
          endorsmentReporData: {
            ...this.endorsmentReporData,
            additionalInfo: {
              reason: this.reason,
              workStopDate: this.workStopDate,
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

      this.$router.push(`/subscription`);
    },

    StoppageDateValidation(event, incomingDate) {
      if (Date.parse(incomingDate) < Date.parse(this.expiryDatetoCalc)) {
        this.stoppageDateError = false;
      } else {
        this.stoppageDateError = true;
      }
    },
    async endorsementDateValidation(event, incomingDate) {
      if (Date.parse(incomingDate) >= Date.parse(this.ExpiryDate)) {
        this.endorsementDateError = true;
      } else {
        await this.changeDateEndorsement(incomingDate);
        this.endorsementDateError = false;
      }
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
      const arrPremiumPaymentDate = this.premiumPaymentDate.split("-");
      const premiumPaymentDate = new Date(
        `${arrPremiumPaymentDate[1]}-${arrPremiumPaymentDate[2]}-${arrPremiumPaymentDate[0]}`
      );

      // Obteniendo la clausula
      const clause = this.clause;

      this.cartera = {
        premiumPaymentDate,
        clausula: clause,
      };

      // Construyendo el objeto para generar el excel
      const endorsmentReporData = {
        cartera: this.cartera,
        totalValues: {
          allRisk: this.accountComplete.tiv.insurable.allRisk,
          alop: this.accountComplete.tiv.insurable.alop,
          total: this.accountComplete.tiv.insurable.total,
          allRiskUsd: this.accountComplete.tiv.insurable.allRiskUsd,
          alopUsd: this.accountComplete.tiv.insurable.totalUsd,
          totalUsd: this.accountComplete.tiv.insurable.allRisk,
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

      this.endorsmentReporData = endorsmentReporData;

      // Invoca el  servicio para generar el excel
      const fileLink = await EndorsementService.getEndorsmentReport({
        subscriptionId: this.subscriptionId,
        endorsmentType: 9,
        endorsmentReporData,
      });

      return fileLink;
    },
    async calcPremium() {
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
        endormenteffetiveDate: this.effectiveDate,
        movementEndDate: this.ExpiryDate,
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
      const totalPremiumUSD = this.totalPremium.find((el) => el.id === 2);

      // Total premium
      totalPremium.premiumAllRisk = totalPremiumResult.allRiskTotalPremium;
      totalPremium.premiumAlop = totalPremiumResult.alopTotalPremium;
      totalPremium.premiumTotal = totalPremiumResult.total;

      totalPremiumUSD.premiumAllRisk =
        totalPremiumResult.allRiskTotalPremiumUsd;
      totalPremiumUSD.premiumAlop = totalPremiumResult.alopTotalPremiumUsd;
      totalPremiumUSD.premiumTotal = totalPremiumResult.totalUsd;

      // Premium SLU
      totalPremium.sluAllRisk = this.calcTotalPremium.allRiskPremiumSlu();
      totalPremium.sluAlop = this.calcTotalPremium.alopPremiumSlu();
      totalPremium.sluTotal = this.calcTotalPremium.totalPremiumSlu();

      totalPremiumUSD.sluAllRisk = this.toUsd(totalPremium.sluAllRisk);
      totalPremiumUSD.sluAlop = this.toUsd(totalPremium.sluAlop);
      totalPremiumUSD.sluTotal = this.toUsd(totalPremium.sluTotal);

      // Net Premium
      totalPremium.netAllRisk =
        this.calcTotalPremium.allRiskNetSLUExcludingSurveyFees();
      totalPremium.netAlop =
        this.calcTotalPremium.alopNetSLUExcludingSurveyFees();
      totalPremium.netTotal = this.unFormatCurrency(
        this.calcTotalPremium.netSLUExcludingSurveyFeesTotal()
      );

      totalPremiumUSD.netAllRisk = this.toUsd(totalPremium.netAllRisk);
      totalPremiumUSD.netAlop = this.toUsd(totalPremium.netAlop);
      totalPremiumUSD.netTotal = this.toUsd(totalPremium.netTotal);
    },
    toUsd(value) {
      const exchangeRate = this.accountComplete.deductibles.exchangeRate;
      return Decimal.div(value, exchangeRate).toNumber();
    },
    formatCurrency(amount) {
      return formatCurrency(amount);
    },
    unFormatCurrency(strAmount) {
      return +strAmount.replace("$", "").replace(",", "");
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
.table-input-data {
  display: flex;
  width: 50%;
  align-items: center;
  justify-content: flex-start;
  padding: 0px 5px;
}
.space-between {
  display: flex;
  justify-content: space-between;
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
.detail-container-step2 {
  font-size: 18px;
  font-weight: 600;
  display: flex;
  flex-direction: column;
  width: 80%;
  margin-left: 20px;
}

.detail-subcontainer-step2 {
  margin-left: 50px;
}
.textarea-stopped-container {
  width: 100%;
  max-height: 160px;
  overflow-x: auto;
}
.textarea-stopped-container-readonly {
  width: 100%;
  max-height: 160px;
  overflow: hidden;
}
.textarea-stopped {
  width: 1000px;
  background-color: #edf2f8;
  border-radius: 10px;
  padding: 10px;
}
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
  margin: 5px 10px;
  width: 30%;
  .inner-col {
    width: 100%;
  }
}
.table-col-subtitle {
  width: 10%;
  .inner-col {
    width: 100%;
  }
}
.container-table-subtitles {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 10px 0px;
}
.table-title-left {
  width: 50%;
  height: 50px;
  color: white;
  font-weight: 800;
  background-color: #547fa9;
  border-radius: 6px 0px 0px 6px;
  margin: 20px 4px;
  font-size: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.table-title-rigth {
  width: 50%;
  height: 50px;
  color: white;
  font-weight: 800;
  background-color: #547fa9;
  border-radius: 0px 6px 6px 0px;
  margin: 20px 0px;
  font-size: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.table-title-empty-two {
  width: 100%;
  height: auto;
  color: rgb(0, 0, 0);
  font-weight: 800;
  background-color: #ffffff;
  margin: 10px 0px;
  font-size: 22px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.table-title-without-bg {
  height: 50px;
  color: rgb(0, 0, 0);
  font-weight: 800;
  border-radius: 6px;
  font-size: 16px;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
}
.table-title-without-bg-total {
  height: 50px;
  color: rgb(0, 0, 0);
  font-weight: 800;
  border-radius: 6px;
  font-size: 16px;
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
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
.table-input-heigth {
  height: 50px;
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
.container-input-row {
  width: 100%;
  display: flex;
  align-content: center;
  align-items: flex-end;
  justify-content: flex-start;
}
.input-row-center {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-content: center;
  align-items: center;
  justify-content: center;
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

.report-complete {
  overflow: auto;
}
</style>
