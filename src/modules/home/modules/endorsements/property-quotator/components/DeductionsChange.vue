<template>
  <div class="outter-wrapper" ref="targetRef">
    <div class="endorsement-title">Deductions Change</div>

    <div class="editAccount" v-if="accountComplete.reference">
      {{ accountComplete.reference }}
    </div>

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
              <div class="endorsement-title">Endorsement date</div>

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
                        <v-text-field v-model="currentMovementEndDate" label="Expiry date" readonly v-bind="attrs" v-on="on"></v-text-field>
                      </template>

                      <v-date-picker v-model="currentMovementEndDate" @input="menu = false" @change="endDateValidation($event, currentMovementEndDate)"> </v-date-picker>
                    </v-menu>

                    <div v-if="this.endDateError" class="error-message">The new Expiry end date must be later than current date.</div>
                  </div>
                </div>

                <InputDaysDiference :endorsementDate="effectiveDate" :expiryDate="currentMovementEndDate" :key="effectiveDate" />
              </div>
              <div v-if="showInfoEndorsement">
                <div class="endorsement-title">Original deductions</div>

                <div class="input-row w-100 d-flex flex-wrap">
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

                <div class="input-row w-100 d-flex flex-wrap">
                  <div class="input-col">
                    <v-text-field label="Brokerage" v-model="brokerage" />
                  </div>

                  <div class="input-col">
                    <v-text-field label="Type" v-model="type" />
                  </div>

                  <div class="input-col">
                    <v-text-field label="LTA" v-model="lta" />
                  </div>

                  <div class="input-col" />

                  <div class="input-col">
                    <v-text-field label="Taxes" v-model="taxes" />
                  </div>

                  <div class="input-col">
                    <v-text-field label="Fronting fee" v-model="frontingFee" />
                  </div>

                  <div class="input-col">
                    <v-text-field label="Others" v-model="others" />
                  </div>

                  <div class="input-col" />

                  <div class="input-col">
                    <v-text-field label="Eng fee" v-model="engFee" />
                  </div>

                  <div class="input-col">
                    <v-text-field label="Premium reserve Only colombia" v-model="premiumReserve" />
                  </div>

                  <div class="input-col">
                    <v-text-field label="Stocks Percentage" v-model="porcentStock" disabled />
                  </div>
                </div>

                <div class="inner-title">Additional</div>

                <div class="input-row w-100 d-flex flex-wrap">
                  <div class="input-col">
                    <div class="input-cont">
                      <v-menu v-model="menu3" :close-on-content-click="false" :nudge-right="40" transition="scale-transition" offset-y min-width="auto">
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field v-model="premiumPaymentDate" label="Premium payment date" readonly v-bind="attrs" v-on="on"></v-text-field>
                        </template>

                        <v-date-picker v-model="premiumPaymentDate" @input="menu3 = false"></v-date-picker>
                      </v-menu>
                      <div v-if="this.viewError" class="error-message">the Premium payment date field must be full to continue</div>
                    </div>
                  </div>

                  <div class="input-col">
                    <div class="input-cont">
                      <v-autocomplete label="Clause" v-model="clause" :items="clauseList" item-value="clause" item-text="clause" />
                      <div v-if="this.viewError" class="error-message">the clause field must be full to continue</div>
                    </div>
                  </div>
                </div>
              </div>
            </v-stepper-content>

            <v-stepper-content step="2">
              <!-- <div>
                <Table :tableData="tableData" />
              </div> -->

              <div class="detail-date">
                <div class="table-title-detail table-title-detail--large">Detail</div>

                <div class="input-col">
                  <div class="input-cont">
                    <v-menu :close-on-content-click="false" :nudge-right="40" transition="scale-transition" offset-y min-width="auto">
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field v-model="premiumPaymentDate" label="Premium payment date" readonly disabled v-bind="attrs" v-on="on"></v-text-field>
                      </template>
                    </v-menu>
                  </div>
                </div>

                <div class="input-col">
                  <div class="input-cont">
                    <v-autocomplete label="Clause" v-model="clause" :items="clauseList" item-value="clause" item-text="clause" disabled />
                  </div>
                </div>
              </div>

              <div class="table-container input-row-table justify-center">
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
                      <div class="input-row-table">
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
                      <div class="input-row-table">
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
      <EndorsementDocuments @setEndorsementDocuments="setEndorsementDocuments" v-show="e1 == 1 || e1 == 3" />
      <AdmittedPremiumTable v-if="e1 == 2" @setTotalPremium="setTotalPremium" :detailValues="totalPremium" endorsementType="4" />

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
import DocumentsEndorsement from "../../components/DocumentsEndorsement.vue";
import InputDaysDiference from "../../components/DaysDiference.vue";
import AdmittedPremiumTable from "../../components/AdmittedPremiumTable.vue";
/* services */
import EndorsementService from "../../services/endorsement.service";
import { netPremiumDeductionsChangeAutoCalcs } from "@/modules/home/modules/endorsements/property-quotator/class/netPremiumDeductionChange";
import accountCompleteService from "@/modules/home/services/account-complete.service";
import PaymentService from "@/modules/home/services/payments.service";
import Table from "./../modules/deductions-change/detail/components/Table.vue";
/* libs */
import Decimal from "@/lib/decimal";
/* utils */
import { removeDollarSign } from "../utils";
import { formatCurrency } from "../../utils";
import EndorsementDocuments from "../../components/EndorsementDocuments.vue";

export default {
  name: "DeductionsChange",
  components: {
    AppFile,
    CurrencyInput,
    Table,
    DocumentsEndorsement,
    InputDaysDiference,
    AdmittedPremiumTable,
    EndorsementDocuments,
  },
  props: {
    endorsement: { type: String, default: "DeductionsChanges" },
    backToCreateEndorsement: {
      type: Function,
    },
    accountComplete: { type: Object },
    changeDateEndorsement: {
      type: Function,
    },
    dateSaved: { type: String },
    showInfoEndorsement: { type: Boolean },
    isFirstEndorsement: { type: Boolean },
    listendorsement: { type: Array },
  },
  data() {
    return {
      insurableRisk: {
        rate: {},
      },
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
      endorsementReport: {},
      endorsementDateError: false,
      viewError: false,
      expiryDatetoCalc: this.accountComplete.deductibles.expiryDate,
      e1: 1,
      subscriptionId: this.$route.params.id,
      menu: false,
      menu2: false,
      menu3: false,
      clause: this.accountComplete.cartera.clausula,
      clauseList: [],
      cartera: {},
      effectiveDate: this.dateSaved,
      expiryDate: new Date(Date.now() + 31536000000 - new Date().getTimezoneOffset() * 60000).toISOString().substr(0, 10),
      premiumPaymentDate: new Date().toISOString().substr(0, 10),
      tableData: {
        currency: {
          total_premium: {
            total_premium_movement: 0,
            premium_slu: 0,
            net_premium: 0,
            total: 0,
          },
          // premium_slu: {
          //   total_premium_movement: 0,
          //   premium_slu: 0,
          //   net_premium: 0,
          //   total: 0,
          // }
        },
        usd: {
          total_premium: {
            total_premium_movement: 0,
            premium_slu: 0,
            net_premium: 0,
            total: 0,
          },
          // premium_slu: {
          //   total_premium_movement: 0,
          //   premium_slu: 0,
          //   net_premium: 0,
          //   total: 0,
          // }
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
      brokerage: 0,
      taxes: 0,
      engFee: 0,
      type: 0,
      frontingFee: 0,
      premiumReserve: 0,
      lta: 0,
      others: 0,
      porcentStock: 0,
      porcentStock: 0,
      deductible: {},
      resultUSD: {},
      resultOriginalCurenncy: {},
      currentMovementEndDate: new Date(new Date(this.accountComplete.deductibles.expiryDate).toISOString().substr(0, 10)).toISOString().substr(0, 10),
      effectiveDateError: false,
      endDateError: false,
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
      isEdited: {},
      options: {},
      tivModificado: {},
      dates: {},
      accountCompleteList: [],
      dataOldEndorsements: {},
      lastAccountInformacion: {},
      buttonTitle: "Next",
      buttonTitleBack: "Cancel",
    };
  },
  async beforeMount() {
    this.clauseList = await PaymentService.getClauses();
    this.lastAccountInformacion = await accountCompleteService.getFirstAccountCompleteByIdSubscription(this.subscriptionId);
    // this.accountCompleteList = await AccountCompleteService.getAllAccountComplete(this.subscriptionId)
    // console.log({accountCompleteList: this.accountCompleteList})
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
    // console.log(this.accountComplete);
    const deductibles = this.accountComplete.deductibles;
    this.brokerage = deductibles.brokerage;
    this.taxes = deductibles.taxes;
    this.engFee = deductibles.eng;
    this.type = deductibles.deductionType;
    this.frontingFee = deductibles.fronting;
    this.premiumReserve = deductibles.premiumReserve;
    this.lta = deductibles.lta;
    this.others = deductibles.others;
    this.porcentStock = tiv.insurable.porcentaje;
    this.detailValues[0].premiumDamage = this.insurableRisk.property_damage;
    this.detailValues[0].premiumBi = this.insurableRisk.business_interruption;
    this.detailValues[0].premiumStocks = this.insurableRisk.stock;
    this.detailValues[0].premiumTotal = this.detailValues[0].premiumDamage + this.detailValues[0].premiumBi + this.detailValues[0].premiumStocks;
    this.detailValues[1].premiumDamage = this.insurableRisk.property_damage_usd;
    this.detailValues[1].premiumBi = this.insurableRisk.business_interruption_usd;
    this.detailValues[1].premiumStocks = this.insurableRisk.stock_usd;
    this.detailValues[1].premiumTotal = this.detailValues[1].premiumDamage + this.detailValues[1].premiumBi + this.detailValues[1].premiumStocks;

    // value.premiumBi = this.insurableRisk.business_interruption;

    // value.premiumStocks = this.insurableRisk.stock;

    // value.premiumTotal =
    //   value.premiumDamage + value.premiumBi + value.premiumStocks;
    // this.detailValues: [
    //   {
    //     id: 1,
    //     name: "Original Currency",
    //     premiumDamage: 0,
    //     premiumBi: 0,
    //     premiumStocks: 0,
    //     premiumTotal: 0,
    //     sluDamage: 0,
    //     sluBi: 0,
    //     sluStocks: 0,
    //     sluTotal: 0,
    //   },
    //   {
    //     id: 2,
    //     name: "USD",
    //     premiumDamage: 0,
    //     premiumBi: 0,
    //     premiumStocks: 0,
    //     premiumTotal: 0,
    //     sluDamage: 0,
    //     sluBi: 0,
    //     sluStocks: 0,
    //     sluTotal: 0,
    //   },
    // ],
  },
  async mounted() {},
  computed: {},
  watch: {
    e1: async function () {
      switch (this.e1) {
        case 1:
          this.isEdited = {};
          this.buttonTitle = "Next";
          this.buttonTitleBack = "Cancel";
          break;
        case 2:
          this.buttonTitle = "Next";
          this.buttonTitleBack = "Return";
          this.deductible = Object.assign(this.accountComplete.deductibles);
          this.deductible.brokerage = Number(this.brokerage);
          this.deductible.taxes = Number(this.taxes);
          this.deductible.eng = Number(this.engFee);
          this.deductible.deductionType = this.type;
          this.deductible.lta = Number(this.lta);
          this.deductible.others = Number(this.others);
          this.deductible.fronting = Number(this.frontingFee);
          this.deductible.premiumReserve = Number(this.premiumReserve);
          this.deductible.exchangeRate = Number(this.accountComplete.deductibles.exchangeRate);

          await this.makeEndorsementCalcules();

          const c_t_t_movement = this.resultOriginalCurenncy.totalPremiumResult.total.toFixed(2);
          const c_t_t_slu = this.resultOriginalCurenncy.data.totalPremiumSlu.toFixed(2);
          const c_t_t_premium = this.resultOriginalCurenncy.data.netTotal.toFixed(2);

          const u_t_t_movement = this.resultUSD.totalPremiumResult.totalUsd.toFixed(2);
          const u_t_t_slu = this.resultUSD.data.totalPremiumSlu.toFixed(2);
          const u_t_t_premium = this.resultUSD.data.netTotal.toFixed(2);

          this.tableData.currency.total_premium.total_premium_movement = c_t_t_movement;
          this.tableData.currency.total_premium.premium_slu = c_t_t_slu;
          this.tableData.currency.total_premium.net_premium = c_t_t_premium;
          // this.tableData.currency.total_premium.total = c_t_t_movement + c_t_t_slu + c_t_t_premium;

          this.tableData.usd.total_premium.total_premium_movement = u_t_t_movement;
          this.tableData.usd.total_premium.premium_slu = u_t_t_slu;
          this.tableData.usd.total_premium.net_premium = u_t_t_premium;
          // this.tableData.usd.total_premium.total = u_t_t_movement + u_t_t_slu + u_t_t_premium;
          break;

        case 3:
          this.buttonTitle = "Finalize";
          this.buttonTitleBack = "Return";
          this.accountComplete.deductibles = this.deductible;

          //se hacen de nuevo los cálculos si se quiere usar los valores admitted premium
          for (const prop in this.isEdited) {
            const element = this.isEdited[prop];
            if (element === true) {
              await this.makeEndorsementCalcules();
            }
          }

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

          this.endorsementReport = {
            cartera: this.cartera,
            totalValues: {
              damage: premiumOriginal.propertyDamage,
              bi: premiumOriginal.businessInterruption,
              stocks: premiumOriginal.stock,
              total: premiumOriginal.total,
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
              ...this.accountComplete.tiv.premium,
              propertyDamage: this.resultOriginalCurenncy.totalPremiumResult.damageTotalPremium,
              businessInterruption: this.resultOriginalCurenncy.totalPremiumResult.biTotalPremium,
              stock: this.resultOriginalCurenncy.totalPremiumResult.stockTotalPremium,
              total: this.resultOriginalCurenncy.totalPremiumResult.total,
              propertyDamageUsd: this.resultOriginalCurenncy.totalPremiumResult.damageTotalPremiumUsd,
              businessInterruptionUsd: this.resultOriginalCurenncy.totalPremiumResult.biTotalPremium,
              stockUsd: this.resultOriginalCurenncy.totalPremiumResult.stockTotalPremiumUsd,
              totalUsd: this.resultOriginalCurenncy.totalPremiumResult.totalUsd,
            },
            boundInsurableProp: this.accountComplete.tiv?.boundInsurableProp,
            deductibles: this.deductible,
            netPremium: {
              ...this.resultOriginalCurenncy.data,
              damageSluShare: this.resultOriginalCurenncy.data.damagePremiumSlu,
              biSluShare: this.resultOriginalCurenncy.data.biPremiumSlu,
              stocksSluShare: this.resultOriginalCurenncy.data.stocksPremiumSlu,
              sluShareTotal: this.resultOriginalCurenncy.data.totalPremiumSlu,
            },
            netPremiumUSD: {
              ...this.resultUSD.data,
              damageSluShare: this.resultUSD.data.damagePremiumSlu,
              biSluShare: this.resultUSD.data.biPremiumSlu,
              stocksSluShare: this.resultUSD.data.stocksPremiumSlu,
              sluShareTotal: this.resultUSD.data.totalPremiumSlu,
            },
          };

          try {
            // Invoca el  servicio para generar el excel
            const fileLink = await EndorsementService.getEndorsmentReport({
              subscriptionId: this.subscriptionId,
              endorsmentType: 4,
              endorsmentReporData: this.endorsementReport,
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
    formatCurrency(amount) {
      return formatCurrency(amount);
    },
    setTotalPremium({ id, value, concept }) {
      const totalPremium = this.totalPremium.find((el) => el.id === id);
      totalPremium[concept] = value;

      if ((concept !== "premiumTotal") & (concept !== "sluTotal")) {
        this.isEdited[concept] = true;
      }
    },

    async makeEndorsementCalcules() {
      let biBrokerage = 0;
      let damageBrokerage = 0;
      let stocksBrokerage = 0;
      let biBrokerageUsd = 0;
      let damageBrokerageUsd = 0;
      let stocksBrokerageUsd = 0;
      let brokerages = {};

      if (!this.isFirstEndorsement) {
        const effetiveDate = new Date(this.lastAccountInformacion.deductibles.inceptionDate);
        const expiryDate = new Date(this.lastAccountInformacion.deductibles.expiryDate);
        const endormenteffetiveDate = new Date(this.effectiveDate);
        const movementEndDate = new Date(this.currentMovementEndDate);

        const resultInital = Math.round(Math.abs(effetiveDate - expiryDate) / 86400000);
        const resultEndorment = Math.round(Math.abs(endormenteffetiveDate - movementEndDate) / 86400000);

        biBrokerage += (this.lastAccountInformacion.net_premium.originalValues.biSluShare / resultInital) * resultEndorment - this.lastAccountInformacion.net_premium.originalValues.biSluShare || 0;
        biBrokerageUsd += (this.lastAccountInformacion.net_premium.usdValues.biSluShare / resultInital) * resultEndorment - this.lastAccountInformacion.net_premium.usdValues.biSluShare || 0;
        damageBrokerage += (this.lastAccountInformacion.net_premium.originalValues.damageSluShare / resultInital) * resultEndorment - this.lastAccountInformacion.net_premium.originalValues.damageSluShare || 0;
        damageBrokerageUsd += (this.lastAccountInformacion.net_premium.usdValues.damageSluShare / resultInital) * resultEndorment - this.lastAccountInformacion.net_premium.usdValues.damageSluShare || 0;
        stocksBrokerage += (this.lastAccountInformacion.net_premium.originalValues.stocksSluShare / resultInital) * resultEndorment - this.lastAccountInformacion.net_premium.originalValues.stocksSluShare || 0;
        stocksBrokerageUsd += (this.lastAccountInformacion.net_premium.usdValues.stocksSluShare / resultInital) * resultEndorment - this.lastAccountInformacion.net_premium.usdValues.stocksSluShare || 0;

        this.listendorsement.map(async (endosos, index) => {
          // if (index == 0){
          //   const effetiveDate = new Date(endosos.report.endorsmentReporData?.deductibles.inceptionDate)
          //   const expiryDate = new Date(endosos.report.endorsmentReporData?.deductibles.expiryDate)
          //   const endormenteffetiveDate = new Date(this.effectiveDate)
          //   const movementEndDate = new Date(this.currentMovementEndDate)

          //   const resultInital  = Math.round(Math.abs( effetiveDate - expiryDate) /86400000)
          //   const resultEndorment = Math.round(Math.abs( endormenteffetiveDate - movementEndDate) /86400000)

          //   biBrokerage += endosos.report.endorsmentReporData?.netPremium.biBrokerage / resultInital * resultEndorment - endosos.report.endorsmentReporData.netPremium.biBrokerage || 0
          //   biBrokerageUsd += endosos.report.endorsmentReporData?.netPremiumUSD.biBrokerage / resultInital * resultEndorment - endosos.report.endorsmentReporData.netPremiumUSD.biBrokerage || 0
          //   damageBrokerage += endosos.report.endorsmentReporData?.netPremium.damageBrokerage / resultInital * resultEndorment -  endosos.report.endorsmentReporData.netPremium.damageBrokerage || 0
          //   damageBrokerageUsd += endosos.report.endorsmentReporData?.netPremiumUSD.damageBrokerage / resultInital * resultEndorment - endosos.report.endorsmentReporData.netPremiumUSD.damageBrokerage || 0
          //   stocksBrokerage += endosos.report.endorsmentReporData?.netPremium.stocksBrokerage / resultInital * resultEndorment - endosos.report.endorsmentReporData.netPremium.stocksBrokerage || 0
          //   stocksBrokerageUsd += endosos.report.endorsmentReporData?.netPremiumUSD.stocksBrokerage / resultInital * resultEndorment - endosos.report.endorsmentReporData.netPremiumUSD.stocksBrokerage || 0

          // } else {
          if (endosos.report.endorsmentReporData) {
            const endormenteffetiveDate = new Date(this.effectiveDate);
            const movementEndDate = new Date(this.currentMovementEndDate);

            const currentEndormenteffetiveDate = new Date(endosos.effective_date);
            const currentMovementEndDate = new Date(endosos.report.endorsmentReporData?.deductibles.expiryDate);

            const currentResultEndorment = Math.round(Math.abs(currentEndormenteffetiveDate - currentMovementEndDate) / 86400000) || 0;

            const result = currentEndormenteffetiveDate > endormenteffetiveDate ? Math.round(Math.abs(movementEndDate - currentEndormenteffetiveDate) / 86400000) : Math.round(Math.abs(movementEndDate - endormenteffetiveDate) / 86400000);

            if (currentResultEndorment && currentResultEndorment > 0) {
              biBrokerage += (endosos.report.endorsmentReporData?.premium.businessInterruption / currentResultEndorment) * result - endosos.report.endorsmentReporData?.premium.businessInterruption || 0;
              biBrokerageUsd += (endosos.report.endorsmentReporData?.premium.businessInterruptionUsd / currentResultEndorment) * result - endosos.report.endorsmentReporData?.premium.businessInterruptionUsd || 0;
              damageBrokerage += (endosos.report.endorsmentReporData?.premium.propertyDamage / currentResultEndorment) * result - endosos.report.endorsmentReporData?.premium.propertyDamage || 0;
              damageBrokerageUsd += (endosos.report.endorsmentReporData?.premium.propertyDamageUsd / currentResultEndorment) * result - endosos.report.endorsmentReporData?.premium.propertyDamageUsd || 0;
              stocksBrokerage += (endosos.report.endorsmentReporData?.premium.stock / currentResultEndorment) * result - endosos.report.endorsmentReporData?.premium.stock || 0;
              stocksBrokerageUsd += (endosos.report.endorsmentReporData?.premium.stockUsd / currentResultEndorment) * result - endosos.report.endorsmentReporData?.premium.stockUsd || 0;
              // stocksBrokerageUsd += endosos.report.endorsmentReporData?.netPremiumUSD.stocksBrokerage / currentResultEndorment * result - endosos.report.endorsmentReporData?.netPremiumUSD.stocksBrokerage||0
            }
          }
          // }
        });
        brokerages = {
          biBrokerage: biBrokerage,
          damageBrokerage: damageBrokerage,
          stocksBrokerage: stocksBrokerage,
          biBrokerageUsd: biBrokerageUsd,
          damageBrokerageUsd: damageBrokerageUsd,
          stocksBrokerageUsd: stocksBrokerageUsd,
        };
        this.dataOldEndorsements = { ...brokerages };
      }

      const endorsementData = await EndorsementService.getEndorsementByAccountcomplete(this.accountComplete.id);

      this.dates = {
        effetiveDate: new Date(this.accountComplete.deductibles.inceptionDate).toISOString().substring(0, 10),
        expiryDate: new Date(this.accountComplete.deductibles.expiryDate).toISOString().substring(0, 10),
        endormenteffetiveDate: new Date(this.effectiveDate),
        movementEndDate: new Date(this.currentMovementEndDate),
        lastEndormenteffetiveDate: new Date(endorsementData.effective_date),
      };

      this.tivModificado = {
        propertyDamageMovement: this.accountComplete.tiv.insurable.propertyDamage,
        businessInterruptionMovement: this.accountComplete.tiv.insurable.businessInterruption,
        stockMovement: this.accountComplete.tiv.insurable.stock,

        propertyDamageRate: this.accountComplete.tiv.premium.propertyDamageRate,
        businessInterruptionRate: this.accountComplete.tiv.premium.businessInterruptionRate,
        stockRate: this.accountComplete.tiv.premium.stockRate,
        stockPercentaje: (this.accountComplete.tiv.insurable.porcentaje || 0) / 100,
      };

      this.options = {
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

      this.resultOriginalCurenncy = await netPremiumDeductionsChangeAutoCalcs(
        this.tivModificado,
        this.deductible,
        this.accountComplete.tiv?.boundInsurableProp.sluLine,
        false,
        this.dates,
        this.options,
        this.isFirstEndorsement,
        this.dataOldEndorsements
      );

      this.resultUSD = await netPremiumDeductionsChangeAutoCalcs(this.tivModificado, this.deductible, this.accountComplete.tiv?.boundInsurableProp.sluLine, true, this.dates, this.options, this.isFirstEndorsement, this.dataOldEndorsements);
    },
    nextTwoValidations() {
      const clauseValidations = this.clause !== undefined && this.clause !== null;
      const premiumPaymentDateValidations = this.premiumPaymentDate !== undefined && this.premiumPaymentDate !== null;

      const isRight = clauseValidations && premiumPaymentDateValidations && !this.endorsementDateError;

      this.viewError = !isRight;

      return isRight;
    },

    goToStepTwo() {
      const isRight = this.nextTwoValidations();
      if (isRight) this.e1 = 2;
      return;
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
        Number(
          removeDollarSign(
            this.accountComplete.net_premium?.originalValues?.netTotal
          )
        ) || 0;
      const newNetPremium =
        Number(
          removeDollarSign(this.resultOriginalCurenncy?.data?.netTotal)
        ) || 0;
      const netPremiumDifference = Decimal(newNetPremium)
        .sub(originalNetPremium)
        .toNumber();

      const accountCompleteResponse = await accountCompleteService.addAccountComplete(this.subscriptionId, {
        ...this.accountComplete,
        deductibles: {
          ...this.accountComplete.deductibles,
          ...this.deductible,
        },
        tiv: {
          boundInsurableProp: {
            ...this.accountComplete.tiv.boundInsurableProp,
          },
          premium: {
            propertyDamageRate: this.accountComplete.tiv.premium.propertyDamageRate,
            businessInterruptionRate: this.accountComplete.tiv.premium.businessInterruptionRate,
            stockRate: this.accountComplete.tiv.premium.stockRate,
          },
          insurable: {
            ...this.accountComplete.tiv.insurable,
          },
        },
        netPremium: {
          originalValues: {
            netTotal: this.resultOriginalCurenncy.data.netTotal,
          },
          usdValues: {
            netTotal: this.resultUSD.data.netTotal,
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
      await EndorsementService.addEndorsment({
        subscriptionId: this.subscriptionId,
        endorsmentType: 4,
        idUser: this.$store.state.auth.user.id,
        accountId: accountCompleteResponse.id,
        effectiveDate: this.effectiveDate,
        report: {
          endorsmentReporData: {
            ...this.endorsementReport,
            additionalInfo: this.accountComplete.additional_info,
          },
          cartera: {
            ...this.accountComplete.cartera,
            ...this.cartera,
            netPremiumDifference,
          },
        },
        files: this.endorsementDocuments,
      });

      this.$router.push(`/subscription`);
    },

    endDateValidation(event, incomingDate) {
      if (Date.parse(incomingDate) < Date.parse(this.currentMovementEndDate)) {
        this.endDateError = true;
      } else {
        this.endDateError = false;
      }
    },
    async endorsementDateValidation(event, incomingDate) {
      if (Date.parse(incomingDate) >= Date.parse(this.expiryDatetoCalc)) {
        this.endorsementDateError = true;
      } else {
        await this.changeDateEndorsement(incomingDate);
        this.endorsementDateError = false;
      }
    },

    goNext(e1) {
      this.$refs.targetRef.scrollIntoView({ behavior: "smooth" });
      if (e1 == 1) {
        this.goToStepTwo();
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
  margin-left: 60px;
}

.input-row-table {
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

.editAccount {
  width: auto;
  color: #f59607;
  font-weight: 600;
  font-size: 19px;
}

.title-col {
  width: 10%;
}

.wide-col {
  width: 100% !important;
}
</style>
