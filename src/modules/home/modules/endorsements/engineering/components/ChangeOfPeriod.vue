<template>
  <div class="outter-wrapper" ref="targetRef">
    <div class="endorsement-title">Change of period</div>
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
          Admitted premium
        </v-stepper-step>
      </v-stepper-header>
      <div class="endorsement-wrapper">
        <div class="content">
          <v-stepper-items>
            <v-stepper-content step="1" class="step-one">
              <div class="input-row w-100 d-flex flex-wrap">
                <div class="input-col">
                  <div class="inner-title">Endorsement date</div>
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
                        @change="onEffectiveDateChange"
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
                          v-model="movementEndDate"
                          label="Movement end date"
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
                      The new Movement end date must be later than current date.
                    </div>
                  </div>
                </div>
                <InputDaysDiference
                  :endorsementDate="effectiveDate"
                  :expiryDate="expiryDatetoCalc"
                  :key="effectiveDate + expiryDatetoCalc"
                />

                <div class="input-col" v-if="showInfoEndorsement">
                  <div class="input-cont-lg">
                    <v-select
                      v-model="clause"
                      label="Clause"
                      item-value="clause"
                      item-text="clause"
                      :items="clauseList"
                      />
                  </div>
                </div>

                <div class="input-col" v-if="showInfoEndorsement">
                  <div class="input-cont">
                    <v-menu
                      v-model="menuControllStepOne.inceptionDate"
                      :close-on-content-click="false"
                      :nudge-right="40"
                      transition="scale-transition"
                      offset-y
                      min-width="auto"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="inceptionDate"
                          label="Inception date"
                          readonly
                          v-bind="attrs"
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        v-model="inceptionDate"
                        @input="menuControllStepOne.inceptionDate = false"
                        @change="ExpiryDateValidation($event, inceptionDate)"
                      ></v-date-picker>
                    </v-menu>
                    <div v-if="this.errorsDates['inceptionDate']"  class="error-message">
                      The Expiry date cannot be equal to the Inception date
                    </div>
                    <div v-if="this.errorsDates['inceptionDateTwo']"  class="error-message">
                      The new Movement end date must be later than current date.
                    </div>
                  </div>
                </div>

              </div>
            </v-stepper-content>
            
            <v-stepper-content step="2">
              <div class="table-container input-row justify-center">
                
                <div class="table-title-space"></div>
                <div class="title-col">
                  <div class="col-subtitle">Total Premium Moment</div>
                  <div class="col-subtitle">Premium SLU</div>
                  <div class="col-subtitle">Net Premium</div>
                  <div class="col-subtitle mt-4">Total</div>
                </div>



                <div class="table-col">
                  <div class="table-title">Original Currency</div>
                  
                    <div class="input-row mt-4">
                      
                      <div class="inner-col">
                        <div class="table-input blue-input">
                        ${{  this.originalValues.lastInformation.totalPremiumMovement.toFixed(2) }}
                        </div>

                        <div class="table-input blue-input">
                        ${{ this.originalValues.lastInformation.PremiumSlu.toFixed(2) }}
                        </div>

                        <div class="table-input blue-input">
                        ${{ this.originalValues.lastInformation.netPremium.toFixed(2) }}
                        </div>

                        <div class="table-input mt-4">
                        ${{ this.originalValues.lastInformation.total.toFixed(2) }}
                        </div>   
                      </div>
 
                      <div class="inner-col">
                        <div class="table-input blue-input">
                          ${{  this.originalValues.newInformation.totalPremiumMovement.toFixed(2)}}
                        </div>

                        <div class="table-input blue-input">
                          ${{  this.originalValues.newInformation.PremiumSlu.toFixed(2)}}
                        </div>

                        <div class="table-input blue-input">
                         ${{ this.originalValues.newInformation.netPremium.toFixed(2) }}
                        </div>

                        <div class="table-input mt-4">
                         ${{ this.originalValues.newInformation.total.toFixed(2) }}
                        </div>  
                      </div> 
                
                    </div>
                  </div>
                 
                <div class="table-col">
                  <div class="table-title">USD</div>
                    <div class="input-row mt-4">
                      
                      <div class="inner-col">
                        <div class="table-input blue-input">
                        ${{  this.usdValues.lastInformation.totalPremiumMovement.toFixed(2) }}
                        </div>

                        <div class="table-input blue-input">
                        ${{ this.usdValues.lastInformation.PremiumSlu.toFixed(2) }}
                        </div>

                        <div class="table-input blue-input">
                        ${{ this.usdValues.lastInformation.netPremium.toFixed(2) }}
                        </div>

                        <div class="table-input mt-4">
                        ${{ this.usdValues.lastInformation.total.toFixed(2) }}
                        </div>   
                      </div>
 
                      <div class="inner-col">
                        <div class="table-input blue-input">
                          ${{  this.usdValues.newInformation.totalPremiumMovement.toFixed(2)}}
                        </div>

                        <div class="table-input blue-input">
                          ${{  this.usdValues.newInformation.PremiumSlu.toFixed(2)}}
                        </div>

                        <div class="table-input blue-input">
                         ${{ this.usdValues.newInformation.netPremium.toFixed(2) }}
                        </div>

                        <div class="table-input mt-4">
                         ${{ this.usdValues.newInformation.total.toFixed(2) }}
                        </div>  
                      </div> 
                
                    </div>
                </div>

              </div>

              <!--Details -->
            <div class="details-container">
              <h3 class="">Details</h3>

              <div class="details-input-container  d-flex flex-wrap">

                <div class="input-col-details">
                  <div class="input-cont">
                    <v-menu
                      v-model="menuControllStepTwo.endorsementEffectiveDate"
                      :close-on-content-click="false"
                      :nudge-right="40"
                      transition="scale-transition"
                      offset-y
                      min-width="auto"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="endorsementEffectiveDate"
                          label="Endorment effective date"
                          readonly
                          v-bind="attrs"
                          v-on="on"
                          disabled
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        v-model="endorsementEffectiveDate"
                        @input="menuControllStepTwo.endorsementEffectiveDate = false"
                      ></v-date-picker>
                    </v-menu>
                  </div>
                </div>


                <div class="input-col-details">
                  <div class="input-cont">
                    <v-menu
                      v-model="menuControllStepTwo.inceptionDate"
                      :close-on-content-click="false"
                      :nudge-right="40"
                      transition="scale-transition"
                      offset-y
                      min-width="auto"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="inceptionDate"
                          label="Inception date"
                          readonly
                          v-bind="attrs"
                          v-on="on"
                          disabled
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        v-model="inceptionDate"
                        @input="menuControllStepTwo.inceptionDate = false"
                      ></v-date-picker>
                    </v-menu>
                  </div>
                </div>



                <div class="input-col-details">
                  <div class="input-cont">
                    <v-menu
                      v-model="menuControllStepTwo.movementEndDate"
                      :close-on-content-click="false"
                      :nudge-right="40"
                      transition="scale-transition"
                      offset-y
                      min-width="auto"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="movementEndDate"
                          label="expiry date"
                          readonly
                          v-bind="attrs"
                          v-on="on"
                          disabled
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        v-model="movementEndDate"
                        @input="menuControllStepTwo.movementEndDate = false"
                      ></v-date-picker>
                    </v-menu>
                  </div>
                </div>

                
                <div class="input-col-details">
                  <div class="input-cont">
                    <v-menu
                      v-model="menuControllStepTwo.premiumPaymentDate"
                      :close-on-content-click="false"
                      :nudge-right="40"
                      transition="scale-transition"
                      offset-y
                      min-width="auto"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="premiumPaymentDate"
                          label="Premium payment Date"
                          readonly
                          v-bind="attrs"
                          v-on="on"
                          disabled
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        v-model="premiumPaymentDate"
                        @input="menuControllStepTwo.premiumPaymentDate = false"
                      ></v-date-picker>
                    </v-menu>
                  
                  </div>
                </div>  
              </div>
              <div class="input-col">
                  <div class="input-cont-lg">
                    <v-select
                      v-model="clause"
                      label="Clause"
                      item-value="clause"
                      item-text="clause"
                      :items="clauseList"
                      disabled
                      />
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

      <div class="stepper-btn mt-7 mb-3 d-flex justify-end align-center">
        <v-btn :outlined="e1 == 3 ? false : true" rounded large :text="e1 == 3 ? true : false"
          :class="e1 == 3 ? 'blue-btn' : 'clear-btn'" :color="e1 == 3 ? 'none' : '#003D6D'" @click="goNext(e1)">
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

/* services */
import { getFiles } from "../../services/mock-files.service";
import PaymentService from '@/modules/home/services/payments.service'
import EndorsementDocuments from "../../components/EndorsementDocuments.vue";
import netPremiumEngLast from "../services/netpremium.service";
import { netPremiumInclusionRiskEng, netPremiumInclusionRiskAutoCalcs } from "../class/netPremiumInclusionRiskEng";
import EndorsementService from "../../services/endorsement.service";
import AccountCompleteService from '@/modules/home/services/account-complete.service';


/* libs */
import Decimal from '@/lib/decimal';
import { unFormatCurrency } from "../../utils";

export default {
  name: "ChangeOfPeriod",
  components: {
    AppFile,
    CurrencyInput,
    DocumentsEndorsement,
    InputDaysDiference,
    EndorsementDocuments,
  },
  props: {
    type: { type: String, default: "Change of Period" },
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
      subscriptionId: this.$route.params.id,
      attrs:{},
      on:{},
      expiryDatetoCalc: this.accountComplete.deductibles.expiryDate,
      e1: 1,
      menu: false,
      menu2: false,
      effectiveDate:this.dateSaved,
      endorsementEffectiveDate:  this.dateSaved,
      premiumPaymentDate:   new Date().toISOString().substr(0, 10),
      movementEndDate: new Date(
        this.accountComplete.deductibles.expiryDate
      )
        .toISOString()
        .substr(0, 10),
      detail: 20,
      files: [
        {
          fileId: 1,
          fileName: "Report Change of Period",
          fileDownloadLink: "",
          loaded: false,
          error: false,
          errorMessage: "Could not load the file",
          loading: true,
          fileType: "xlsx",
          fileTypeMessage: "Download",
        },
      ],
      clauseList:[],
      clause: this.accountComplete.cartera.clausula,
      endorsementDocuments: [],
      currentMovementEndDate: new Date(
        Date.now() + 31536000000 - new Date().getTimezoneOffset() * 60000
      )
        .toISOString()
        .substr(0, 10),
      effectiveDateError: false,
      endDateError: false,
      inceptionDate:  this.initialDateValue(),
      menuControllStepOne : {
        movementEndDate:false,
        endorsementEffectiveDate: false,
        InceptionDate: false,
        premiumPaymentDate: false, 
      },
      menuControllStepTwo : {
        movementEndDate:false,
        endorsementEffectiveDate: false,
        InceptionDate: false,
        premiumPaymentDate: false,
        clause:false
      },

      errorsDates:{
        endorsementEffectiveDate:true,
        movementEndDate:true,
        inceptionDate: false,
        inceptionDateTwo: false
      },
      originalValues:{
          lastInformation:{
            totalPremiumMovement:0,
            PremiumSlu:0,
            netPremium:0,
            total:0
          },
          newInformation:{
            totalPremiumMovement:0,
            PremiumSlu:0,
            netPremium:0,
            total:0
          } 
      },
      usdValues:{
        lastInformation:{
            totalPremiumMovement:0,
            PremiumSlu:0,
            netPremium:0,
            total:0
          },
          newInformation:{
            totalPremiumMovement:0,
            PremiumSlu:0,
            netPremium:0,
            total:0
          } 
      },
      buttonTitle: 'Next',
      buttonTitleBack: 'Cancel',
    };
  },
  async beforeMount() {
    console.log('Change of period');
    this.clauseList = await PaymentService.getClauses()  
    //this.files = await getFiles();
  },

  async mounted() {},
  computed: {},
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
        this.calcPremiumLastInformation();
      }

      if(this.e1 === 3){
        this.buttonTitle = 'Finalize'
        this.buttonTitleBack = 'Return';
        this.getExcel()
      }


    }
  },
  methods: {

    initialDateValue(){
      const  newDate = new Date(  Date.now() + 31536000000 - new Date().getTimezoneOffset() * 60000)
      .toISOString()
      .substr(0, 10)

      return newDate
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

    async onEffectiveDateChange(){
      this.menu2 = false
      console.log('this.effectiveDate',this.effectiveDate);
      console.log('this.expiryDatetoCalc',this.expiryDatetoCalc);
      console.log('effectiveDate + expiryDatetoCalc',this.effectiveDate + this.expiryDatetoCalc);

      /*

      <InputDaysDiference
                  :endorsementDate="effectiveDate"
                  :expiryDate="expiryDatetoCalc"
                  :key="effectiveDate"
                />
      */

      await this.changeDateEndorsement(this.effectiveDate)
    },

    async submit() {
      this.e1 = 1;

      // Obteniendo el insurable
      const tiv = this.accountComplete.tiv

      // actualizando tiv.insurable de account complete
      const tivUpdate = {
        insurable:{

          allRisk: tiv.insurable.allRisk,
          alop: tiv.insurable.alop,
          total: tiv.insurable.total,

          allRiskUsd: tiv.insurable.allRiskUsd,
          alopUsd: tiv.insurable.alopUsd,
          totalUsd: tiv.insurable.totalUsd,

        },
        premium:{
          allRiskRate: tiv.premium.allRiskRate,
          alopRate: tiv.premium.alopRate,
        },
        boundInsurableProp: tiv?.boundInsurableProp,
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
        },
      });

      //guardar registro del endoso 
      await EndorsementService.addEndorsment({
        subscriptionId: this.subscriptionId,
        endorsmentType: 8,
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
          },
        },
        files: this.endorsementDocuments,
      });

      this.$router.push(`/subscription`);
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



      const calcTotalPremium = new netPremiumInclusionRiskEng(
        tivMovement,
        this.accountComplete.deductibles,
        this.accountComplete.tiv?.boundInsurableProp.sluLine,
        false,
        dates
      );

      const totalPremiumResult = calcTotalPremium.calculateTotalPremium();

      const newTotalPremiumMovement = totalPremiumResult.total;

      const newPremiumSlu = calcTotalPremium.totalPremiumSlu();

      const newNetPremium = this.unFormatCurrency(calcTotalPremium.netSLUExcludingSurveyFeesTotal());


      this.originalValues.newInformation.totalPremiumMovement = newTotalPremiumMovement;
      this.originalValues.newInformation.PremiumSlu = newPremiumSlu;
      this.originalValues.newInformation.netPremium = newNetPremium;

      this.originalValues.newInformation.total = (
        newTotalPremiumMovement + 
        newPremiumSlu + 
        newNetPremium
      )

      this.usdValues.newInformation.totalPremiumMovement = this.toUsd(newTotalPremiumMovement);
      this.usdValues.newInformation.PremiumSlu = this.toUsd(newPremiumSlu);
      this.usdValues.newInformation.netPremium = this.toUsd(newNetPremium);
      this.usdValues.newInformation.total = this.toUsd(this.originalValues.newInformation.total);

    },

    async calcPremiumLastInformation(){

      const tiv = this.accountComplete.tiv
      const premiumAllRisk = tiv.insurable.allRisk * tiv.premium.allRiskRate /1000
      const premiumAlop = tiv.insurable.alop * tiv.premium.alopRate /1000

      const calcNetPremium = await netPremiumEngLast(
        {
          allRisk: premiumAllRisk,
          allRiskUsd: this.toUsd(premiumAllRisk),
          alop: premiumAlop,
          alopUsd: this.toUsd(premiumAlop),
        },
        this.accountComplete.deductibles,
        this.accountComplete.tiv?.boundInsurableProp.sluLine,
      )

      console.log({calcNetPremium});

      const newTotalPremiumMovement = premiumAllRisk + premiumAlop;

      const newPremiumSlu = calcNetPremium.data.sluShareTotal;

      const newNetPremium = calcNetPremium.data.netSLUExcludingSurveyFeesTotal;


      this.originalValues.lastInformation.totalPremiumMovement = newTotalPremiumMovement;
      this.originalValues.lastInformation.PremiumSlu = newPremiumSlu;
      this.originalValues.lastInformation.netPremium = newNetPremium;

      this.originalValues.lastInformation.total = (
        newTotalPremiumMovement + 
        newPremiumSlu + 
        newNetPremium
      )

      this.usdValues.lastInformation.totalPremiumMovement = this.toUsd(newTotalPremiumMovement);
      this.usdValues.lastInformation.PremiumSlu = this.toUsd(newPremiumSlu);
      this.usdValues.lastInformation.netPremium = this.toUsd(newNetPremium);
      this.usdValues.lastInformation.total = this.toUsd(this.originalValues.newInformation.total);

    },    

    async getExcel(){

      const tiv = this.accountComplete.tiv

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

      const resultOriginalCurenncy = await netPremiumInclusionRiskAutoCalcs(
        tivMovement,
        this.accountComplete.deductibles,
        this.accountComplete.tiv?.boundInsurableProp.sluLine,
        false,
        dates
      )
      const resultUSD = await netPremiumInclusionRiskAutoCalcs(
        tivMovement,
        this.accountComplete.deductibles,
        this.accountComplete.tiv?.boundInsurableProp.sluLine,
        true,
        dates
      )

      console.log({resultOriginalCurenncy});

      // Creación del objeto a insertar
      const endorsmentReporData = {
        cartera: this.cartera,
        totalValues: {
          allRisk: tiv.insurable.allRisk,
          alop: tiv.insurable.alop,
          total: tiv.insurable.total,
          allRiskUsd: tiv.insurable.allRiskUsd,
          alopUsd: tiv.insurable.alopUsd,
          totalUsd: tiv.insurable.totalUsd,
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

          allRisk: resultOriginalCurenncy.totalPremium.allRiskTotalPremium,
          alop: resultOriginalCurenncy.totalPremium.alopTotalPremium,
          totalInsured: resultOriginalCurenncy.totalPremium.total,

          allRiskRate: this.accountComplete.tiv.premium.allRiskRate,
          alopRate: this.accountComplete.tiv.premium.alopRate,

          allRiskUsd:resultOriginalCurenncy.totalPremium.allRiskTotalPremiumUsd,
          alopUsd:resultOriginalCurenncy.totalPremium.alopTotalPremiumUsd,
          totalUsd: resultOriginalCurenncy.totalPremium.totalUsd,
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
      }

      this.endorsmentReporData = endorsmentReporData;

      try {
          // Invoca el  servicio para generar el excel
          const fileLink = await EndorsementService.getEndorsmentReport({
            subscriptionId: this.subscriptionId,
            endorsmentType: 8,
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
    },

    unFormatCurrency(strAmount){
      return unFormatCurrency(strAmount);
    },

    toUsd(value){
      const exchangeRate = this.accountComplete.deductibles.exchangeRate
      return Decimal.div(value, exchangeRate).toNumber()
    },

    endDateValidation(event, incomingDate) {
      if (Date.parse(incomingDate) < Date.parse(this.currentMovementEndDate)) {
        this.endDateError = true;
      } else {
        this.endDateError = false;
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

.editAccount {
  width: auto;
  color: #f59607;
  font-weight: 600;
  font-size: 19px;
}
</style>
