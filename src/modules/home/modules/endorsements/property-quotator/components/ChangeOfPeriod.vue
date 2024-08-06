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
              <div class="input-row w-50 d-flex flex-wrap">

                <div class="input-col">
                  <div class="inner-title">Endorsement date</div>
                  <div class="input-cont column">
                    <v-menu
                      v-model="menuControllStepOne.endorsementEffectiveDate"
                      :close-on-content-click="false"
                      :nudge-right="40"
                      transition="scale-transition"
                      offset-y
                      min-width="auto"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="endorsementEffectiveDate"
                          label="Endorsement effective date"
                          readonly
                          v-bind="attrs"
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        v-model="endorsementEffectiveDate"
                        @input="menuControllStepOne.endorsementEffectiveDate = false"
                        @change="endorsementDateValidation($event,endorsementEffectiveDate)"
                      ></v-date-picker>
                    </v-menu>
                    <div v-if="this.errorsDates['endorsementEffectiveDate']"  class="error-message">
                      The new Endorment effective date must be lower than expiry date .
                    </div>
                    <div v-if="this.errorsDates['endorsementEffectiveDate'] && !this.errorsDates['endorsementEffectiveDate'] && sent"  class="error-message">
                      The new Endorment effective date must be lower than expiry date .
                    </div>
                    <div v-if="this.errorsDates['validDate']"  class="error-message">
                      Select a valid date
                    </div>
                    
                  </div>
                </div>

                <div class="input-col">
                  <div class="input-cont">
                    <v-menu
                      v-model="menuControllStepOne.movementEndDate"
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
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        v-model="movementEndDate"
                        @input="menuControllStepOne.movementEndDate = false"
                        @change="validateDates($event, {
                            lowerDate:endorsementEffectiveDate,
                            higherDate:movementEndDate,
                            error:'movementEndDate'
                        })"
                      ></v-date-picker>
                    </v-menu>
                    <div v-if="this.errorsDates['movementEndDate']" class="error-message">
                      The expiry date must be later than Endorsement effective date.
                    </div>
                    <div v-if="this.errorsDates['inceptionDate'] && sent" class="error-message">
                      The Expiry date cannot be equal to the Inception date
                    </div>
                  </div>
                </div>

                <InputDaysDiference
                  :endorsementDate="endorsementEffectiveDate"
                  :expiryDate="expiryDatetoCalc"
                  :key="endorsementEffectiveDate"
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
                    <!-- <div v-if="this.errorsDates['inceptionDateTwo']"  class="error-message">
                      The new Movement end date must be later than current date.
                    </div> -->
                  </div>
                </div>

                <div class="input-col" v-if="showInfoEndorsement">
                  <div class="input-cont">
                    <v-menu
                      v-model="menuControllStepOne.premiumPaymentDate"
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
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        v-model="premiumPaymentDate"
                        @input="menuControllStepOne.premiumPaymentDate = false"
                      ></v-date-picker>
                    </v-menu>
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
/* services */
import { getFiles } from "../../services/mock-files.service";
import PaymentService from '@/modules/home/services/payments.service'

//Clases
import { ChangeofPeriodAutoCalcs } from '../models/ChangeOfPeriod'
import EndorsementService from "../../services/endorsement.service";
import AccountCompleteService from "@/modules/home/services/account-complete.service";
import EndorsementDocuments from "../../components/EndorsementDocuments.vue";

export default {
  name: "changeOfPeriod",
  components: {
    AppFile,
    CurrencyInput,
    DocumentsEndorsement,
    InputDaysDiference,
    EndorsementDocuments,
  },
  props: {
    type: { type: String, default: "Inclusion Risk" },
    accountComplete: { type: Object },
    changeDateEndorsement: {
      type: Function,
    },
    dateSaved: { type: String },
    showInfoEndorsement: {type: Boolean},
    isFirstEndorsement: {type: Boolean},
    backToCreateEndorsement:  {
      type: Function,
    },
    listendorsement: { type: Array}
  },
  data() {
    return {
      expiryDatetoCalc: this.accountComplete.deductibles.expiryDate,
      attrs:{},
      on:{},
      isMadeCals:false,
      e1: 1,
      sent:false,
      subscriptionId: this.$route.params.id,
      errorsDates:{
        endorsementEffectiveDate:false,
        movementEndDate:false,
        inceptionDate: false,
        inceptionDateTwo: false,
        validDate: false
      },
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
      detail: 20,
      clauseList:[],
      files: [{
          fileId: 1,
          fileName: 'Change of period',
          fileDownloadLink: '',
          loaded: false,
          error: false,
          errorMessage: 'Could not load the file',
          loading: true,
          fileType: 'xlsx',
          fileTypeMessage: 'Download',
      }],
      endorsementDocuments: [],
      endorsmentReporData:{},
      endDateError: false,
      clause: this.accountComplete.cartera.clausula,
      effectiveDateError: false,
      effectiveDate: this.dateSaved,
      expiryDate: new Date(
        Date.now() + 31540000000 - new Date().getTimezoneOffset() * 60000
      )
        .toISOString()
        .substr(0, 10),
      endorsementEffectiveDate:  this.dateSaved,
      //nuevo valor para guardar el expiry date
      movementEndDate:  this.initialDateValue(),
      currentMovementEndDate: new Date(
        new Date(this.accountComplete.deductibles.expiryDate)
        .toISOString()
        .substr(0, 10),
      )
        .toISOString()
        .substr(0, 10),
      inceptionDate:  this.initialDateValue(),
      premiumPaymentDate:   new Date().toISOString().substr(0, 10),
      lastAccountInformacion: {},
      accountCompleteList: [],
      dataOldEndorsements: {},
      buttonTitle: 'Next',
      buttonTitleBack: 'Cancel',
    }
  },
  async beforeMount() {
    this.el = 1
    this.files = await getFiles();
    this.clauseList = await PaymentService.getClauses()   
    this.lastAccountInformacion = await AccountCompleteService.getFirstAccountCompleteByIdSubscription(this.subscriptionId)

    // this.accountCompleteList = await AccountCompleteService.getAllAccountComplete(this.subscriptionId)
    // console.log({accountCompleteList: this.accountCompleteList})
  },
  mounted(){
    // this.lastAccountInformacion = {...this.accountComplete}
    const effective =  new Date(this.accountComplete.deductibles.expiryDate).toISOString().substring(0,10)
    const expiry =  new Date(this.accountComplete.deductibles.expiryDate).toISOString().substring(0,10)

    // //inicializacion de la fechas de las fechas a cambiar
    this.effectiveDate = effective
    this.expiryDate = expiry
    this.inceptionDate = effective
    this.movementEndDate = expiry
  },
  methods: {
    initialDateValue(){
      const  newDate = new Date(  Date.now() + 31536000000 - new Date().getTimezoneOffset() * 60000)
      .toISOString()
      .substr(0, 10)

      return newDate
    },

    nextStep() {
       if(this.e1=== 1){
        this.ExpiryDateValidation('', this.inceptionDate)
        if (!this.endorsementEffectiveDate){
          this.errorsDates['validDate'] = true
        }
          this.sent = true
          let changeStep = true
          for (const property in this.errorsDates) {
             if(this.errorsDates[property] === true) changeStep = false
          }
          if(changeStep === true) {
            this.e1 = 2
            this.sent = false
          }
          return 
       }
    },


    calcualteTotalPremiumMoments() { 
     
      
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
      // Obteniendo premium payment date
      const premiumPaymentDate = new Date(this.premiumPaymentDate).toISOString();

      // Obteniendo la clausula
      const clause = this.clause;

      // Guardando los datos de cartera nuevos
      this.cartera = {
          premiumPaymentDate,
          clausula: clause,
       };
        const accountCompleteResponse = await AccountCompleteService.addAccountComplete(this.subscriptionId, {
          ...this.accountComplete,
        deductibles: this.accountComplete.deductibles,
        tiv: this.accountComplete.tiv,
        netPremium: this.accountComplete.net_premium,
        additionalInfo: this.accountComplete.additional_info,
        technicalConditions: this.accountComplete.technical_conditions,
        cartera:{
          ...this.accountComplete.cartera,
          ...this.cartera,  
        },
      });

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
          cartera:{
            ...this.accountComplete.cartera,
            ...this.cartera,  
          },
        },
        files: this.endorsementDocuments,
      });

     await this.backToCreateEndorsement();
    },

    /**
     *  @typedef {object} validateDatesParams
     *  @property {Date}  lowerDate fecga que menor
     *  @property {Date} higherDate fecha que debe ser mayor
     *  @property {string} error proiedad del object error 
     */

    /**
     * controa  
     * @param {*} event 
     * @param {validateDatesParams} params
     */
    validateDates(event,{
       lowerDate,
       higherDate,
       error
    }) {
      if (Date.parse(lowerDate) < Date.parse(higherDate)) {
        this.errorsDates[error] = false;
        if (Date.parse(higherDate) == Date.parse(this.endorsementEffectiveDate)) {
         this.errorsDates['inceptionDate'] = true;
       } else {
        this.errorsDates['inceptionDate'] = false;
       }
      } else {
        this.errorsDates[error] = true;
        if (Date.parse(higherDate) == Date.parse(this.endorsementEffectiveDate)) {
         this.errorsDates['inceptionDate'] = true;
       } else {
        this.errorsDates['inceptionDate'] = false;
       }
      }
    },
    validfields(event){
      return 0
    },
    ExpiryDateValidation(event, incomingDate) {
      if (Date.parse(incomingDate) == Date.parse(this.movementEndDate)) {
        this.errorsDates['inceptionDate'] = true;
      } else {
        this.errorsDates['inceptionDate'] = false;
      //   if (Date.parse(incomingDate) < Date.parse(this.currentMovementEndDate)) {
      //     this.errorsDates['inceptionDateTwo'] = true;
      // } else {
      //     this.errorsDates['inceptionDateTwo'] = false;
      // }
      }
    },
    async endorsementDateValidation(event, incomingDate) {
      if (
        Date.parse(incomingDate) >=
        Date.parse(this.movementEndDate)
      ) {
        this.errorsDates['endorsementEffectiveDate'] = true;
      } else {
        this.errorsDates['endorsementEffectiveDate'] = false;
        await this.changeDateEndorsement(incomingDate)
      }
    },

    goNext(e1) {
      this.$refs.targetRef.scrollIntoView({ behavior: 'smooth' });
      if (e1 == 1) {
        this.nextStep();
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
  watch:{ 
    e1: async function(){
      if (this.e1 === 1) {
        this.buttonTitle = 'Next';
        this.buttonTitleBack = 'Cancel';
      }

      if(this.e1 === 2 && this.isMadeCals == false) {
        this.buttonTitle = 'Next';
        this.buttonTitleBack = 'Return';
        let accDamage = 0
        let accBi = 0
        let accStocks = 0
        let accTotalpremium = 0
        let accDamageUsd = 0
        let accBiUsd = 0
        let accStocksUsd = 0
        let accTotalpremiumUsd = 0
        let accTotalPremiumObj = {}

        if (!this.isFirstEndorsement) {  
            const effetiveDate = new Date(this.lastAccountInformacion.deductibles.inceptionDate)
            const expiryDate = new Date(this.lastAccountInformacion.deductibles.expiryDate)
            const endormenteffetiveDate = new Date(this.endorsementEffectiveDate)
            const movementEndDate = new Date(this.currentMovementEndDate)

            const resultInital  = Math.round(Math.abs( effetiveDate - expiryDate) /86400000) 
            const resultEndorment = Math.round(Math.abs( endormenteffetiveDate - movementEndDate) /86400000)

            accBi += this.lastAccountInformacion.net_premium.originalValues.biSluShare / resultInital * resultEndorment - this.lastAccountInformacion.net_premium.originalValues.biSluShare || 0
            accBiUsd += this.lastAccountInformacion.net_premium.usdValues.biSluShare / resultInital * resultEndorment - this.lastAccountInformacion.net_premium.usdValues.biSluShare || 0
            accDamage += this.lastAccountInformacion.net_premium.originalValues.damageSluShare / resultInital * resultEndorment -  this.lastAccountInformacion.net_premium.originalValues.damageSluShare || 0
            accDamageUsd += this.lastAccountInformacion.net_premium.usdValues.damageSluShare / resultInital * resultEndorment - this.lastAccountInformacion.net_premium.usdValues.damageSluShare || 0
            accStocks += this.lastAccountInformacion.net_premium.originalValues.stocksSluShare / resultInital * resultEndorment - this.lastAccountInformacion.net_premium.originalValues.stocksSluShare || 0
            accStocksUsd += this.lastAccountInformacion.net_premium.usdValues.stocksSluShare / resultInital * resultEndorment - this.lastAccountInformacion.net_premium.usdValues.stocksSluShare || 0

          this.listendorsement.map(async (endosos, index) => {
          // if (index == 0){
            // const effetiveDate = new Date(endosos.report.endorsmentReporData?.deductibles.inceptionDate)
            // const expiryDate = new Date(endosos.report.endorsmentReporData?.deductibles.expiryDate)
            // const endormenteffetiveDate = new Date(this.effectiveDate)
            // const movementEndDate = new Date(this.currentMovementEndDate)

            // const resultInital  = Math.round(Math.abs( effetiveDate - expiryDate) /86400000) 
            // const resultEndorment = Math.round(Math.abs( endormenteffetiveDate - movementEndDate) /86400000)

            // biBrokerage += endosos.report.endorsmentReporData?.netPremium.biBrokerage / resultInital * resultEndorment - endosos.report.endorsmentReporData.netPremium.biBrokerage || 0
            // biBrokerageUsd += endosos.report.endorsmentReporData?.netPremiumUSD.biBrokerage / resultInital * resultEndorment - endosos.report.endorsmentReporData.netPremiumUSD.biBrokerage || 0
            // damageBrokerage += endosos.report.endorsmentReporData?.netPremium.damageBrokerage / resultInital * resultEndorment -  endosos.report.endorsmentReporData.netPremium.damageBrokerage || 0
            // damageBrokerageUsd += endosos.report.endorsmentReporData?.netPremiumUSD.damageBrokerage / resultInital * resultEndorment - endosos.report.endorsmentReporData.netPremiumUSD.damageBrokerage || 0
            // stocksBrokerage += endosos.report.endorsmentReporData?.netPremium.stocksBrokerage / resultInital * resultEndorment - endosos.report.endorsmentReporData.netPremium.stocksBrokerage || 0
            // stocksBrokerageUsd += endosos.report.endorsmentReporData?.netPremiumUSD.stocksBrokerage / resultInital * resultEndorment - endosos.report.endorsmentReporData.netPremiumUSD.stocksBrokerage || 0

          // } else {
          if(endosos.report.endorsmentReporData){
            const endormenteffetiveDate = new Date(this.endorsementEffectiveDate)
            const movementEndDate = new Date(this.currentMovementEndDate)
            const currentEndormenteffetiveDate = new Date(endosos.effective_date) 
            const currentMovementEndDate = new Date(endosos.report.endorsmentReporData?.deductibles.expiryDate)
            const currentResultEndorment = Math.round(Math.abs( currentEndormenteffetiveDate - currentMovementEndDate) /86400000) ||0

            const result = currentEndormenteffetiveDate > endormenteffetiveDate ?  Math.round(Math.abs( movementEndDate - currentEndormenteffetiveDate) /86400000): Math.round(Math.abs( movementEndDate - endormenteffetiveDate) /86400000)
            if (currentResultEndorment && currentResultEndorment > 0){
            accBi += endosos.report.endorsmentReporData?.premium.businessInterruption / currentResultEndorment * result - endosos.report.endorsmentReporData?.premium.businessInterruption ||0
            accBiUsd += endosos.report.endorsmentReporData?.premium.businessInterruptionUsd / currentResultEndorment * result - endosos.report.endorsmentReporData?.premium.businessInterruptionUsd ||0
            accDamage += endosos.report.endorsmentReporData?.premium.propertyDamage / currentResultEndorment * result - endosos.report.endorsmentReporData?.premium.propertyDamage||0
            accDamageUsd += endosos.report.endorsmentReporData?.premium.propertyDamageUsd / currentResultEndorment * result - endosos.report.endorsmentReporData?.premium.propertyDamageUsd||0
            accStocks += endosos.report.endorsmentReporData?.premium.stock / currentResultEndorment * result - endosos.report.endorsmentReporData?.premium.stock||0
            accStocksUsd += endosos.report.endorsmentReporData?.premium.stockUsd / currentResultEndorment * result - endosos.report.endorsmentReporData?.premium.stockUsd||0
            }

            // }
          }
          })
          accTotalPremiumObj = {
            accBi: accBi,
            accDamage: accDamage,
            accStocks: accStocks,
            accBiUsd: accBiUsd,
            accDamageUsd: accDamageUsd,
            accStocksUsd: accStocksUsd
          }

          this.dataOldEndorsements = {...accTotalPremiumObj}
        }

        const dataOldEndorsements = {accDamage,accBi,accStocks,accTotalpremium}
         const premium = this.lastAccountInformacion.tiv.premium
         const deductibles =  this.lastAccountInformacion.deductibles
         const  sluline = this.lastAccountInformacion.tiv.boundInsurableProp.sluLine    
         
         console.log(this.lastAccountInformacion)
         
         const damage = this.lastAccountInformacion.tiv.premium.propertyDamage
         const bi = this.lastAccountInformacion.tiv.premium.businessInterruption
         const stocks = this.lastAccountInformacion.tiv.premium.stock
         
         const damageUsd = this.lastAccountInformacion.tiv.premium.propertyDamageUsd
         const biUsd = this.lastAccountInformacion.tiv.premium.businessInterruptionUsd
         const stocksUsd = this.lastAccountInformacion.tiv.premium.stockUsd

         ///nueva forma de caculcar el net-premium origina currency
         const results =  await ChangeofPeriodAutoCalcs(premium, deductibles, sluline, false, this.dataOldEndorsements, !this.isFirstEndorsement, {
           effetiveDate:this.effectiveDate,
           expiryDate:this.expiryDate,
           endormenteffetiveDate: this.endorsementEffectiveDate,
           movementEndDate:this.movementEndDate
        })  

         ///nueva forma de caculcar el net-premium  en dolares
        const resultsUSD =  await ChangeofPeriodAutoCalcs(premium, deductibles, sluline, true, this.dataOldEndorsements, !this.isFirstEndorsement,{
           effetiveDate:this.effectiveDate,
           expiryDate:this.expiryDate,
           endormenteffetiveDate: this.endorsementEffectiveDate,
           movementEndDate:this.movementEndDate
        })
  
      //premium que sera premiom Moment
    
       const totalPremiumMovement = (damage + bi + stocks)
       this.originalValues.lastInformation.totalPremiumMovement = totalPremiumMovement

       const totalPremiumMovementDamge = !this.isFirstEndorsement? results.damageSluShare() : damage / results.daysResult.endormentsDays * results.daysResult.initialDays - damage
       const totalPremiumMovementBi = !this.isFirstEndorsement? results.biSluShare() : bi / results.daysResult.endormentsDays * results.daysResult.initialDays - bi
       const totalPremiumMovementStocks = !this.isFirstEndorsement? results.stocksSluShare() : stocks / results.daysResult.endormentsDays * results.daysResult.initialDays -stocks
       const newTotalPremiumMovement = (totalPremiumMovementDamge + totalPremiumMovementBi + totalPremiumMovementStocks)
       this.originalValues.newInformation.totalPremiumMovement = newTotalPremiumMovement
         console.log('--------->', totalPremiumMovementDamge)
         console.log('--------->', totalPremiumMovementBi)
         console.log('--------->', totalPremiumMovementStocks)

       //premum SLU
       this.originalValues.lastInformation.PremiumSlu = this.lastAccountInformacion.net_premium.originalValues.sluShareTotal
       this.originalValues.newInformation.PremiumSlu = results.data.sluShareTotal


      //informacion netPremium 
       this.originalValues.lastInformation.netPremium = this.lastAccountInformacion.net_premium.originalValues.netTotal
       this.originalValues.newInformation.netPremium = results.data.netTotal

      //totales
      this.originalValues.lastInformation.total = (
      totalPremiumMovement + 
      this.lastAccountInformacion.net_premium.originalValues.sluShareTotal + 
      this.lastAccountInformacion.net_premium.originalValues.netTotal
      )
       
      this.originalValues.newInformation.total = (
      newTotalPremiumMovement + 
      results.data.sluShareTotal + 
      results.data.netTotal
      )
      
      //valres pasador pero ahora su valor en dolares
       

       //informacion pasada del  premium  que toma el lugar de totalPremiumMoment
    
       const totalPremiumMovementUsd = (damageUsd + biUsd + stocksUsd)
       this.usdValues.lastInformation.totalPremiumMovement = totalPremiumMovementUsd

       //la nueva informacion del  premium  que toma el lugar de totalPremiumMoment
       const totalPremiumMovementDamgeUsd = !this.isFirstEndorsement? resultsUSD.damageSluShare() : damageUsd / results.daysResult.result
       const totalPremiumMovementBiUsd = !this.isFirstEndorsement? resultsUSD.biSluShare() : biUsd / results.daysResult.result
       const totalPremiumMovementStocksUsd = !this.isFirstEndorsement? resultsUSD.stocksSluShare() : stocksUsd / results.daysResult.result
       const newTotalPremiumMovementUsd = (totalPremiumMovementDamgeUsd + totalPremiumMovementBiUsd + totalPremiumMovementStocksUsd)
       this.usdValues.newInformation.totalPremiumMovement = newTotalPremiumMovementUsd
       //premum SLU
       this.usdValues.lastInformation.PremiumSlu = this.lastAccountInformacion.net_premium.usdValues.sluShareTotal
       this.usdValues.newInformation.PremiumSlu = resultsUSD.data.sluShareTotal


      //informacion netPremium 
       this.usdValues.lastInformation.netPremium = this.lastAccountInformacion.net_premium.usdValues.netTotal
       this.usdValues.newInformation.netPremium = resultsUSD.data.netTotal

      //totales
      this.usdValues.lastInformation.total = (
      totalPremiumMovementUsd + 
      this.lastAccountInformacion.net_premium.usdValues.sluShareTotal + 
      this.lastAccountInformacion.net_premium.usdValues.netTotal
      )
       
      this.usdValues.newInformation.total = (
      newTotalPremiumMovementUsd + 
      resultsUSD.data.sluShareTotal + 
      resultsUSD.data.netTotal
      )
          
        //sustitumimos los nuevos valores para generar el reporte
        this.accountComplete.net_premium.originalValues = results.data
        this.accountComplete.net_premium.usdValues = resultsUSD.data 
        this.accountComplete.tiv.premium = {
           ...this.accountComplete.tiv.premium, 
           propertyDamage: totalPremiumMovementDamge,
           businessInterruption: totalPremiumMovementBi,
           stock: totalPremiumMovementStocks,
           propertyDamageUsd: totalPremiumMovementDamgeUsd,
           businessInterruptionUsd: totalPremiumMovementBiUsd,
           stockUsd: totalPremiumMovementStocksUsd,
           totalInsured:newTotalPremiumMovement,
           totalUsd:newTotalPremiumMovementUsd,
           total:newTotalPremiumMovement
        }
        this.accountComplete.cartera = {
          ...this.accountComplete.cartera,
            premiumPaymentDate: this.premiumPaymentDate,
            clause: this.clause
        }
        this.accountComplete.deductibles = {
         ...this.accountComplete.deductibles, 
         //TODO:estandarizar el guardado de las fechas
         expiryDate: this.movementEndDate ,
         inceptionDate: this.endorsementEffectiveDate
        }

        this.endorsmentReporData = {
          boundInsurableProp:{
             ...this.accountComplete.tiv.boundInsurableProp
          },
          deductibles:{
            ...this.accountComplete.deductibles
          },
          netPremium:{
            ...results.data
          },
          netPremiumUSD:{
            ...resultsUSD.data
          },
          premium:{
            ...this.accountComplete.tiv.premium
          },
          totalValues:{
            ...this.accountComplete.tiv.insurable
          },
          cartera:{
            ...this.accountComplete.cartera,
            ...this.cartera,  
          },
          // admintedPremium:45646464654545466,
          movementValues:{
            bi: totalPremiumMovementBiUsd,
					  biUsd: totalPremiumMovementBiUsd,
					  damage: totalPremiumMovementDamgeUsd,
					  damageUsd: totalPremiumMovementDamgeUsd,
					  stocks: totalPremiumMovementStocksUsd,
					  stocksUsd: totalPremiumMovementStocksUsd,
					  total: newTotalPremiumMovement,
					  totalUsd: newTotalPremiumMovementUsd 
          }
        }

         // Invoca el  servicio para generar el excel
         const fileLink = await EndorsementService.getEndorsmentReport({
          subscriptionId: this.subscriptionId,
          endorsmentType: 8,
          endorsmentReporData:this.endorsmentReporData
        })

        const file = this.files.find(file => file.fileId === 1);

        if (!fileLink) {
          file.error = true
        } else {
          file.fileDownloadLink = fileLink;
          file.loaded = true;
          file.loading = false;
        }

        //variable que controlara si se tienen que volver a hacer los calculos
        this.isMadeCals = true
        
    } 
      if (this.e1 === 3) {
        this.buttonTitle = 'Finalize'
        this.buttonTitleBack = 'Return';
      }

  }
 }
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
  .title-col {
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

.input-col-lg {
  width: 50%;
  display: block;
  margin-right: 30px;
}

.input-cont-lg{
  width: 40%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  align-content: center;
  margin: 5px 0;
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

.details-container {
    width: 100%;
    height: auto;
    padding-top: 10px;
    padding-bottom: 10px;
    margin-left: 5%;
    margin-top: 44px;
}
.details-input-container{
  justify-content: center;
  align-items: center ;
}

.input-col-details{
  flex-grow: 1;
  margin-inline-end: 20px;
}

.column{
  flex-direction: column;
}

.editAccount {
  width: auto;
  color: #f59607;
  font-weight: 600;
  font-size: 19px;
}
</style>
