<template>
  <div class="outter-wrapper" ref="targetRef">
    <div class="endorsement-title">Change of share</div>

    <div class="accountName" v-if="accountComplete.reference">
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
          Admitted premium
        </v-stepper-step>
      </v-stepper-header>

      <div class="endorsement-wrapper">
        <div class="content">
          <v-stepper-items>
            <v-stepper-content step="1" class="step-one">
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
                        @change="endorsementDateValidation($event, effectiveDate)"
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
                          v-model="movementEndDate"
                          label="Expiry date"
                          readonly
                          v-bind="attrs"
                          v-on="on"
                          disabled                          
                        ></v-text-field>
                      </template>

                      <v-date-picker
                        v-model="movementEndDate"
                        @input="menu = false"
                        @change="endDateValidation($event, movementEndDate)"
                      ></v-date-picker>
                    </v-menu>

                    <div v-if="this.endDateError" class="error-message">
                      The new Expiry date must be later than current date.
                    </div>
                  </div>
                </div>

                <InputDaysDiference
                  :endorsementDate="effectiveDate"
                  :expiryDate="movementEndDate"
                  :key="movementEndDate +effectiveDate"
                />
              </div>
              <div v-if="showInfoEndorsement">
              <div class="endorsement-title">New share</div>

              <div class="input-row">
                <div class="input-col">
                  <div class="input-cont">
                    <v-text-field
                      v-model="sharePorcent"
                      label="New share porcent 10"
                      suffix="%"
                    />
                  </div>
                </div>

                <div class="input-col">
                  <div class="endorsement-subtitle">Porcent apply stock</div>
                  <div class="input-cont">
                    <v-text-field
                      v-model="porcentStock"
                      label="Porcent"
                      suffix="%"
                    />
                  </div>
                </div>
              </div>

              <div class="input-row w-100 d-flex flex-wrap">
                <div class="inner-title">Additional</div>
                <div class="input-col">
                  <div class="input-cont">
                    <v-autocomplete label="Clause" v-model="clause" :items="clauseList" item-value="clause"
                      item-text="clause" />
                  </div>
                  <div v-if="!clause" class="error-message">
                    Please select a clause.
                  </div>
                </div>

                <div class="input-col">
                  <div class="input-cont">
                    <v-menu v-model="menu3" :close-on-content-click="false" :nudge-right="40"
                      transition="scale-transition" offset-y min-width="auto">
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field v-model="premiumPaymentDate" label="Premium payment date" readonly v-bind="attrs"
                          v-on="on"></v-text-field>
                      </template>

                      <v-date-picker v-model="premiumPaymentDate" @input="menu3 = false"
                       ></v-date-picker>
                    </v-menu>
                  </div>
                </div>
              </div>
              </div>
            </v-stepper-content>

            <v-stepper-content step="2">
              <div class="table-container input-row justify-center">
                <div class="title-col">
                  <div class="table-title-space"></div>
                  <div class="col-subtitle">Total premium movement</div>
                  <div class="col-subtitle">Premium SLU</div>
                  <div class="col-subtitle">Net premium</div>
                </div>
                <div  class="table-col">
                  <div class="table-title">Original Currency</div>
                  <div class="input-row">
                    <div class="inner-col">
                      <div class="table-input blue-input">
                        {{ premiumMovement }}
                      </div>
                      <div class="table-input blue-input">
                        {{ premiumSlu }}
                      </div>
                      <div class="table-input blue-input">
                        {{ netPremium }}
                      </div>
                    </div>
                  </div>
                </div>
                <div  class="table-col">
                  <div class="table-title">USD</div>
                  <div class="input-row">
                    <div class="inner-col">
                      <div class="table-input blue-input">
                        {{ premiumMovementUsd }}
                      </div>
                      <div class="table-input blue-input">
                        {{ premiumSluUsd }}
                      </div>
                      <div class="table-input blue-input">
                        {{ netPremiumUsd }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="input-row w-100 d-flex flex-wrap">
                <div class="input-col">
                  <div class="inner-title">Additional</div>
                  <div class="input-cont">
                    <v-autocomplete label="Clause" v-model="clause" :items="clauseList" disabled item-value="clause"
                      item-text="clause" />
                  </div>
                </div>
                <div class="input-col">
                  <div class="inner-title" style="opacity: 0">|</div>
                  <div class="input-cont">
                    <v-menu :close-on-content-click="false" :nudge-right="40"
                      transition="scale-transition" offset-y min-width="auto">
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field v-model="premiumPaymentDate" label="Premium payment date" readonly disabled v-bind="attrs"
                          v-on="on"></v-text-field>
                      </template>
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
      <EndorsementDocuments @setEndorsementDocuments="setEndorsementDocuments"  v-show="e1 == 1 || e1 == 3" />
      <AdmittedPremiumTableEngineering v-if="e1 == 2" @setTotalPremium="setTotalPremium" :detailValues="totalPremium" />

      <div class="stepper-btn mt-7 mb-3 d-flex justify-end align-center">
        <v-btn :outlined="e1 == 3 ? false : true" rounded large :text="e1 == 3 ? true : false"
          :class="e1 == 3 ? 'blue-btn' : 'clear-btn'" :color="e1 == 3 ? 'none' : '#003D6D'" @click="goNext(e1)"
          :disabled="validationFirstStep">
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
import AdmittedPremiumTableEngineering from "../../components/AdmittedPremiumTableEngineering.vue";
/* services */
import { getFiles } from "../../services/mock-files.service";
import netPremiumEng from '../services/netpremium.service';
import EndorsementService from "../../services/endorsement.service";
import AccountCompleteService from '@/modules/home/services/account-complete.service';
import PaymentService from '@/modules/home/services/payments.service';
import { netPremiumInclusionRiskEng, netPremiumInclusionRiskAutoCalcs } from "../class/netPremiumInclusionRiskEng";

import { formatCurrency } from "../../utils";

/* libs */
import Decimal from '@/lib/decimal';
import EndorsementDocuments from "../../components/EndorsementDocuments.vue";

export default {
  name: "ChangeOfShare",
  components: {
    AppFile,
    CurrencyInput,
    DocumentsEndorsement,
    InputDaysDiference,
    AdmittedPremiumTableEngineering,
    EndorsementDocuments,
  },
  props: {
    type: { type: String, default: "Change of share" },
    backToCreateEndorsement: {
      type: Function,
    },
    accountComplete: { type: Object },
    changeDateEndorsement: {
      type: Function,
    },
    dateSaved: { type: String },
    showInfoEndorsement: {type: Boolean}
  },
  data() {
    return {
      endorsementDateError: false,
      expiryDatetoCalc: this.accountComplete.deductibles.expiryDate,
      clause: this.accountComplete.cartera.clausula,
      clauseList: [],
      cartera: {},
      premiumPaymentDate: new Date( )
      .toISOString()
      .substr(0, 10),
      subscriptionId: this.$route.params.id,
      attrs:{},
      on:{},
      e1: 1,
      menu: false,
      menu2: false,
      menu3: false,
      effectiveDate: this.dateSaved,
      movementEndDate: new Date(
        this.accountComplete.deductibles.expiryDate
      )
        .toISOString()
        .substr(0, 10),
      detail: 20,
      files: [
        {
          fileId: 1,
          fileName: "Report Change of Share",
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
      sharePorcent:0,
      premiumMovement: 0 ,
      premiumSlu: 0,
      netPremium: 0,
      premiumMovementUsd: 0 ,
      premiumSluUsd: 0,
      netPremiumUsd: 0,

      currentMovementEndDate: new Date(
        Date.now() + 31536000000 - new Date().getTimezoneOffset() * 60000
      )
        .toISOString()
        .substr(0, 10),
      effectiveDateError: false,
      endDateError: false,
      totalPremium: [
        {
          id: 1,
          name: "Original Currency",
          premiumAllRisk: 0,
          premiumAlop: 0,
          premiumTotal:0,
          sluAllRisk: 0,
          sluAlop: 0,
          sluTotal:0,
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
      buttonTitle: 'Next',
      buttonTitleBack: 'Cancel',
    };
  },
  async beforeMount() {
    this.clauseList = await PaymentService.getClauses();
  },
  async mounted() {
  },
  created() {
    this.sharePorcent = this.accountComplete.tiv.boundInsurableProp.sluLine;

    const tiv = this.accountComplete.tiv;
    this.detailValues[0]["premiumAllRisk"] = tiv.insurable.allRisk;
    this.detailValues[0]["premiumAlop"] = tiv.insurable.alop;
    this.detailValues[0]["premiumTotal"] = tiv.insurable.total;

    this.detailValues[1]["premiumAllRisk"] = tiv.insurable.allRiskUsd;
    this.detailValues[1]["premiumAlop"] = tiv.insurable.alopUsd;
    this.detailValues[1]["premiumTotal"] = tiv.insurable.totalUsd;
  },
  computed: {
    validationFirstStep() {

      const showInfoEndorsement = this.showInfoEndorsement;
      const clause = Boolean(this.clause);
      const endDateError = !this.endDateError;

      const result = !( showInfoEndorsement & clause & endDateError);

      return result;
    }
  },
  watch: {
    e1: async function () {
      if (this.e1 === 1) {
        this.buttonTitle = 'Next';
        this.buttonTitleBack = 'Cancel';
      }
      if (this.e1 === 2) {
        this.buttonTitle = 'Next';
        this.buttonTitleBack = 'Return';
        this.calcPremium();
      }

      if(this.e1 === 3){
        this.buttonTitle = 'Finalize'
        this.buttonTitleBack = 'Return';
        const tiv = this.accountComplete.tiv;
        const tivMovement = {
          allRisk: tiv.insurable.allRisk,
          alop:tiv.insurable.alop,

          allRiskRate: tiv.premium.allRiskRate,
          alopRate: tiv.premium.alopRate,
        }

        const dates = {
          effetiveDate:new Date(this.accountComplete.deductibles.inceptionDate).toISOString().substring(0,10),
          expiryDate:new Date(this.accountComplete.deductibles.expiryDate).toISOString().substring(0,10),
          endormenteffetiveDate: new Date (this.effectiveDate),
          movementEndDate:new Date(this.movementEndDate),
        }

        // Obteniendo los calculos de Net premium
        const resultOriginalCurenncy = await netPremiumInclusionRiskAutoCalcs(
          tivMovement,
          this.accountComplete.deductibles,
          this.sharePorcent,
          false,
          dates
        )
        const resultUSD = await netPremiumInclusionRiskAutoCalcs(
          tivMovement,
          this.accountComplete.deductibles,
          this.sharePorcent,
          true,
          dates
        )       
        // Obteniendo premium payment date
        const premiumPaymentDate = new Date(this.premiumPaymentDate).toISOString();

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
            allRisk:this.totalPremium[0].premiumAllRisk,
            alop:this.totalPremium[0].premiumAlop,
            totalInsured:this.totalPremium[0].premiumTotal,
            allRiskRate: this.accountComplete.tiv.premium.allRiskRate,
            alopRate: this.accountComplete.tiv.premium.alopRate,
            allRiskUsd:this.toUsd(this.totalPremium[0].premiumAllRisk),
            alopUsd:this.toUsd(this.totalPremium[0].premiumAlop),
            totalUsd:this.toUsd(this.totalPremium[0].premiumTotal),
          },
          boundInsurableProp: {
            ...this.accountComplete.tiv?.boundInsurableProp,
            sluLine: this.sharePorcent,
          },
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
        }

        this.endorsmentReporData = endorsmentReporData;
        
        try {
          // Invoca el  servicio para generar el excel
          const fileLink = await EndorsementService.getEndorsmentReport({
            subscriptionId: this.subscriptionId,
            endorsmentType: 6,
            endorsmentReporData
          });

          const file = this.files.find(file => file.fileId === 1);
          if (!fileLink) {
            file.error = true
          } else {
            file.fileDownloadLink = fileLink;
            file.loaded = true;
            file.loading = false;
          }
        } catch (error) {
          console.log(error);
        }

      }

    }
  },
  methods: {
    setTotalPremium({id, value, concept}){
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
      this.endorsementDocuments = files
    },

    async submit() {
      this.e1 = 1;

      // Obteniendo el insurable
      const tivTotal = this.detailValues.find((el) => el.id === 1);
      const tivTotalUsd = this.detailValues.find((el) => el.id === 2);

      // actualizando tiv.insurable de account complete
      const tivUpdate = {
        insurable:{

          allRisk: tivTotal.premiumAllRisk,
          alop: tivTotal.premiumAlop,
          total: tivTotal.premiumTotal,

          allRiskUsd: tivTotalUsd.premiumAllRisk,
          alopUsd: tivTotalUsd.premiumAlop,
          totalUsd: tivTotalUsd.premiumTotal,

        },
        premium:{
          allRiskRate: this.accountComplete.tiv.premium.allRiskRate,
          alopRate: this.accountComplete.tiv.premium.alopRate,
        },
        boundInsurableProp:{
            ...this.accountComplete.tiv?.boundInsurableProp,
            sluLine: this.sharePorcent,
        },
      }

      // guardar la cuenta actualizada en BD
      const accountCompleteResponse = await AccountCompleteService.addAccountComplete(this.subscriptionId, {
        deductibles: this.accountComplete.deductibles,
        tiv: tivUpdate,
        netPremium: {
            originalValues:{
              netSluExcludingSurveyFeesTotal:this.accountComplete.net_premium.originalValues.netSluExcludingSurveyFeesTotal,
            }
        },
        cartera:{
          ...this.accountComplete.cartera,
          ...this.cartera,
          admitedPremium: this.admitedPremium,
        },
      });

      //guardar registro del endoso 
      await EndorsementService.addEndorsment({
        subscriptionId: this.subscriptionId,
        endorsmentType: 6,
        idUser: this.$store.state.auth.user.id,
        accountId: accountCompleteResponse.id,
        effectiveDate: this.effectiveDate,
        report: {
          endorsmentReporData:{
            ...this.endorsmentReporData,
            additionalInfo:{},
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

    endDateValidation(event, incomingDate) {
      if (Date.parse(incomingDate) < Date.parse(this.currentMovementEndDate)) {
        this.endDateError = true;
      } else {
        this.endDateError = false;
      }
    },

    calcPremium(){

      const tiv = this.accountComplete.tiv;
      const tivMovement = {
        allRisk: tiv.insurable.allRisk,
        alop:tiv.insurable.alop,

        allRiskRate: tiv.premium.allRiskRate,
        alopRate: tiv.premium.alopRate,
      }

      const dates = {
        effetiveDate:new Date(this.accountComplete.deductibles.inceptionDate).toISOString().substring(0,10),
        expiryDate:new Date(this.accountComplete.deductibles.expiryDate).toISOString().substring(0,10),
        endormenteffetiveDate: new Date (this.effectiveDate),
        movementEndDate:new Date(this.movementEndDate),
      }

      this.calcTotalPremium = new netPremiumInclusionRiskEng(
        tivMovement,
        this.accountComplete.deductibles,
        // Se le pasa el nuevo slushare (sluline)
        this.sharePorcent,
        false,
        dates
      );

      const totalPremiumResult = this.calcTotalPremium.calculateTotalPremium();

      const totalPremium = this.totalPremium.find((el) => el.id === 1);

      totalPremium.premiumAllRisk = totalPremiumResult.allRiskTotalPremium;
      totalPremium.premiumAlop = totalPremiumResult.alopTotalPremium;
      totalPremium.premiumTotal = totalPremiumResult.total;

      totalPremium.sluAllRisk =  this.calcTotalPremium.allRiskPremiumSlu();
      totalPremium.sluAlop =  this.calcTotalPremium.alopPremiumSlu();
      totalPremium.sluTotal =  this.calcTotalPremium.totalPremiumSlu();

      /////////////////

      this.premiumMovement = totalPremium.premiumTotal;
      this.premiumMovementUsd = totalPremiumResult.totalUsd;


      const premiumSlu = totalPremium.sluTotal;

      this.premiumSlu = premiumSlu;
      this.premiumSluUsd = this.toUsd(premiumSlu);

      const netPremium = this.unFormatCurrency(this.calcTotalPremium.netSLUExcludingSurveyFeesTotal());
      this.netPremium = netPremium;
      this.netPremiumUsd = this.toUsd(netPremium);

    },
    toUsd(value){
      const exchangeRate = this.accountComplete.deductibles.exchangeRate
      return Decimal.div(value, exchangeRate).toNumber()
    },
    formatCurrency(amount) {
      return formatCurrency(amount);
    },
    unFormatCurrency(strAmount) {
      const result = +strAmount.replace(/[^0-9.-]/g, '');
      return result;
    },
    async endorsementDateValidation(event, incomingDate) {
      
      if (
        Date.parse(incomingDate) >=
        Date.parse(this.movementEndDate)
      ) {
        this.endorsementDateError = true;
      } else {
        await this.changeDateEndorsement(incomingDate)
        this.endorsementDateError = false;
      }
    },

    goNext(e1) {
      this.$refs.targetRef.scrollIntoView({ behavior: 'smooth' });
      if (e1 == 1) {
        this.e1 = 2;
      } else if (e1 == 2) {
        this.e1 = 3;
      } else if (e1 == 3) {
        this.submit();
      }
    },

    goBack(e1) {
      this.$refs.targetRef.scrollIntoView({ behavior: 'smooth' });
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
   
  }
  .v-btn {
    justify-content: flex-start !important;
    color: #003d6d;
  }
}
.table-container {
  margin-top: 30px;
  .title-col{
    width: 10%;
  }
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
  align-items: flex-end;
  justify-content: flex-start;
}
.input-col {
  width: 20%;
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

.accountName {
  width: auto;
  color: #f59607;
  font-weight: 600;
  font-size: 19px;
}
</style>
