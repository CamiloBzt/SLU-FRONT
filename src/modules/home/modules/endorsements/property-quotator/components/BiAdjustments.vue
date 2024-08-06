<template>
  <div class="outter-wrapper" ref="targetRef">
    <div class="endorsement-title">Bi Adjustment</div>
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
                  <div class="input-cont">
                        <v-text-field
                          v-model="newExchangeRateInTo"
                          label="Exchange rate"
                          type="number"
                        ></v-text-field>
                  </div>
                </div>
                <div class="input-col">
                  <div class="input-cont">
                        <v-text-field
                          v-model="newShareInTo"
                          label="Share"
                          type="number"
                          suffix="%"
                        ></v-text-field>
                  </div>
                </div>
              </div>
              <div class="inner-title">Endorsement date</div>
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
                          v-model="inceptionDate"
                          label="Incpetion date"
                          readonly
                          disabled
                          v-bind="attrs"
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        v-model="inceptionDate"
                        @input="menu2 = false"
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
                          label="Expiry date"
                          readonly
                          disabled
                          v-bind="attrs"
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        v-model="movementEndDate"
                        @input="menu = false"
                      ></v-date-picker>
                    </v-menu>
                  </div>
                </div>
                <div class="input-col">
                  <div class="input-cont">
                    <template>
                      <v-text-field
                        v-model="rateBi"
                        label="Rate Bi"
                        readonly
                        disabled
                      ></v-text-field>
                    </template>
                  </div>
                </div>
              </div>
              <div class="input-row w-100 d-flex flex-wrap">
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
                          v-model="newEffectiveDate"
                          label="Endorsement effective date"
                          readonly
                          v-bind="attrs"
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        v-model="newEffectiveDate"
                        @input="menu4 = false"
                        @change="endorsementDateValidation($event, newEffectiveDate, newShareInTo, newExchangeRateInTo)"
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
                      v-model="menu5"
                      :close-on-content-click="false"
                      :nudge-right="40"
                      transition="scale-transition"
                      offset-y
                      min-width="auto"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="newMovementEndDate"
                          label="Movement end date"
                          readonly
                          v-bind="attrs"
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        v-model="newMovementEndDate"
                        @input="menu5 = false"
                      ></v-date-picker>
                    </v-menu>
                  </div>
                </div>
                <InputDaysDiference
                  :endorsementDate="newEffectiveDate"
                  :expiryDate="movementEndDate"
                  :key="newEffectiveDate+movementEndDate"
                />
              </div>
              <div v-if="showInfoEndorsement">
              <MovementValues
                type="Bi Adjustment"
                :insurableRiskData="biAdjustment"
                :accountComplete="accountComplete"
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
              <ModalEndorsement
              v-if="modalOpen"
              :modal="modal"
              :actionButton1="actionButton1"
              :actionButton2="actionButton2" />
              <div class="detail-container-step2">
                Admited premium
              <div class="detail-container-step2">
              <div class="input-row w-80 d-flex flex-wrap detail-subcontainer-step2">
                <div class="input-col">
                  <div class="inner-title">Detail</div>
                  <div class="input-cont">
                    <v-autocomplete label="Clause" v-model="clause" :items="clauseList" item-value="clause" item-text="clause" disabled />
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
            <div class="container-modify-general"><div class="subcontainer-modify-general">Modify table <input @change="onChangeModifyTable($event)" :checked="checkedModifyTable"  v-model="checkedModifyTable" id="checkbox" type="checkbox"></div></div>
              <div class="table-container container-input-row justify-center">
                <div class="table-col-subtitle">
                  <div class="table-title-empty"></div>
                  <div class="input-row">
                    <div class="inner-col">
                      <div class="table-input table-title-without-bg">
                        Damage
                      </div>
                      <div class="table-input table-title-without-bg">
                        Bi
                      </div>
                        <div class="table-input table-title-without-bg">
                        Stocks
                      </div>
                      <div class="table-input table-title-without-bg">
                        Total
                      </div>
                    </div>
                  </div>
                </div>
                <div class="table-col">
                  <div class="table-title-empty-two">Total premium</div>
                  <div class="container-table-subtitles">
                  
                  <div class="table-title-left">Original currency</div>
                  <div class="table-title-rigth">USD</div>
                  </div>
                  <div class="input-row">
                    <div class="inner-col">
                      <div class="table-input-heigth blue-input space-between">
                        <v-text-field
                          v-model="result.totalpremium.damage"
                          label=""
                          type="number"
                          prefix="$"
                          @input="changeTableData()"
                          :disabled="enabledInputs"
                        ></v-text-field>
                        <div  class="table-input-data"> {{ formatCurrency(resultUsd.totalpremium.damage) }}</div> 
                      </div>
                      <div class="table-input-heigth blue-input space-between">
                        <div  class="table-input-data">
                          <v-text-field
                          v-model="result.totalpremium.bi"
                          label=""
                          type="number"
                          prefix="$"
                          @input="changeTableData()"
                          :disabled="enabledInputs"
                        ></v-text-field>
                        </div>
                        <div  class="table-input-data"> {{ formatCurrency(resultUsd.totalpremium.bi) }}</div> 
                      </div>
                      <div class="table-input-heigth blue-input space-between">
                        <v-text-field
                          v-model="result.totalpremium.stocks"
                          label=""
                          type="number"
                          prefix="$"
                          @input="changeTableData()"
                          :disabled="enabledInputs"
                        ></v-text-field>
                        <div  class="table-input-data"> {{ formatCurrency( resultUsd.totalpremium.stocks) }}</div> 
                      </div>
                      <div class="table-input-heigth blue-input space-between">
                        <div  class="table-input-data"> {{ formatCurrency( result.totalpremium.total) }}</div>
                        <div  class="table-input-data"> {{ formatCurrency( resultUsd.totalpremium.total) }}</div> 
                      </div>
                      <!--
                      <div class="table-input-heigth blue-input space-between">
                        <div  class="table-input-data"> ${{ accountComplete.tiv.insurable.totalUsd }}</div>
                        <div  class="table-input-data"> ${{ accountComplete.tiv.insurable.totalUsd }}</div> 
                      </div> 
                      -->
                    </div>
                  </div>
                </div>
                <div class="table-col">
                  <div class="table-title-empty-two">Premium SLU</div>
                  <div class="container-table-subtitles">
                  <div class="table-title-left">Original currency</div>
                  <div class="table-title-rigth">USD</div>
                  </div>
                  <div class="input-row">
                    <div class="inner-col">
                      <div class="table-input-heigth blue-input space-between">
                        <v-text-field
                          v-model="result.premiumslu.damage"
                          label=""
                          type="number"
                          prefix="$"
                          @input="changeTableData()"
                          :disabled="enabledInputs"
                        ></v-text-field>
                        <div class="table-input-data"> {{ formatCurrency(resultUsd.premiumslu.damage) }}</div> 
                      </div>
                      <div class="table-input-heigth blue-input space-between">
                        <v-text-field
                          v-model="result.premiumslu.bi"
                          label="Share"
                          type="number"
                          prefix="$"
                          @input="changeTableData()"
                          :disabled="enabledInputs"
                        ></v-text-field>
                        <div  class="table-input-data"> {{ formatCurrency(resultUsd.premiumslu.bi) }}</div> 
                      </div>
                      <div class="table-input-heigth blue-input space-between">
                        <v-text-field
                          v-model="result.premiumslu.stocks"
                          label=""
                          type="number"
                          prefix="$"
                          @input="changeTableData()"
                          :disabled="enabledInputs"
                        ></v-text-field>
                        <div  class="table-input-data"> {{ formatCurrency(resultUsd.premiumslu.stocks) }}</div> 
                      </div>
                      <div class="table-input-heigth blue-input space-between">
                        <div  class="table-input-data"> {{ formatCurrency(result.premiumslu.total) }}</div>
                        <div  class="table-input-data"> {{ formatCurrency(resultUsd.premiumslu.total) }}</div> 
                      </div>
                      <!--<div class="table-input-heigth blue-input space-between">
                        <div  class="table-input-data"> {{ accountComplete.tiv.insurable.totalUsd }}</div>
                        <div  class="table-input-data"> {{ accountComplete.tiv.insurable.totalUsd }}</div> 
                      </div>-->
                    </div>
                  </div>
                </div>
                <div class="table-col">
                  <div class="table-title-empty-two">Net premium</div>
                  <div class="container-table-subtitles">

                 
                  <div class="table-title-left">Original currency</div>
                  <div class="table-title-rigth">USD</div>
                  </div>
                  <div class="input-row">
                    <div class="inner-col">
                      <div class="table-input-heigth blue-input space-between">
                        <v-text-field
                          v-model="result.netpremium.damage"
                          label=""
                          type="number"
                          prefix="$"
                          @input="changeTableData()"
                          :disabled="enabledInputs"
                        ></v-text-field>
                        <div class="table-input-data"> {{ formatCurrency(resultUsd.netpremium.damage) }}</div> 
                      </div>
                      <div class="table-input-heigth blue-input space-between">
                        <v-text-field
                          v-model="result.netpremium.bi"
                          label=""
                          type="number"
                          prefix="$"
                          @input="changeTableData()"
                          :disabled="enabledInputs"
                        ></v-text-field>
                        <div  class="table-input-data"> {{ formatCurrency(resultUsd.netpremium.bi) }}</div> 
                      </div>
                      <div class="table-input-heigth blue-input space-between">
                        <v-text-field
                          v-model="result.netpremium.stocks"
                          label=""
                          type="number"
                          prefix="$"
                          @input="changeTableData()"
                          :disabled="enabledInputs"
                        ></v-text-field>
                        <div  class="table-input-data"> {{ formatCurrency(resultUsd.netpremium.stocks) }}</div> 
                      </div>
                      <div class="table-input-heigth blue-input space-between">
                        <div  class="table-input-data"> {{ formatCurrency(result.netpremium.total) }}</div>
                        <div  class="table-input-data"> {{ formatCurrency(resultUsd.netpremium.total) }}</div> 
                      </div>
                      <!--<div class="table-input-heigth blue-input space-between">
                        <div  class="table-input-data"> {{ accountComplete.tiv.insurable.totalUsd }}</div>
                        <div  class="table-input-data"> {{ accountComplete.tiv.insurable.totalUsd }}</div> 
                      </div>-->
                    </div>
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
import MovementValues from "./MovementValues.vue";
import DocumentsEndorsement from "../../components/DocumentsEndorsement.vue";
import CurrencyInput from "@/components/CurrencyInput/CurrencyInput.vue";
import InputDaysDiference from "../../components/DaysDiference.vue";
import ModalEndorsement from "../../components/ModalEndorsement.vue";
/* services */
import { getFiles } from "../../services/mock-files.service";
import netPremiumPRO from "../services/netpremium.service";
import EndorsementService from "../../services/endorsement.service";
import AccountCompleteService from "@/modules/home/services/account-complete.service";
import PaymentService from "@/modules/home/services/payments.service";
import {
  netPremiumInclusionRisk,
  netPremiumInclusionRiskAutoCalcs,
} from "../class/netPremiumInclusionRisk";

/* libs */
import Decimal from "@/lib/decimal";
/* utils */
import { removeDollarSign } from "../utils";
import EndorsementDocuments from "../../components/EndorsementDocuments.vue";

export default {
  name: "BiAdjustments",
  components: {
    AppFile,
    MovementValues,
    DocumentsEndorsement,
    CurrencyInput,
    InputDaysDiference,
    EndorsementDocuments,
    ModalEndorsement,
  },
  props: {
    type: { type: String, default: "Inclusion Risk" },
    backToCreateEndorsement: {
      type: Function,
    },
    accountComplete: { type: Object },
    changeDateEndorsementAndShare: {
      type: Function,
    },
    dateSaved: { type: String },
    showInfoEndorsement: {type: Boolean},
    newShare: {type: String},
    newExchangeRate: {type: String},
  },
  data() {
    return {
      newShareInTo: this.newShare,
      newExchangeRateInTo: this.newExchangeRate,
    result: {
      totalpremium:{
      bi: 0,
      damage: 0,
      stocks: 0,
      total: 0
      },
      premiumslu:{
      bi: 0,
      damage: 0,
      stocks: 0,
      total: 0
      },
      netpremium:{
      bi: 0,
      damage: 0,
      stocks: 0,
      total: 0
      }
    },
    resultUsd: {
      totalpremium:{
      bi: 0,
      damage: 0,
      stocks: 0,
      total: 0
      },
      premiumslu:{
      bi: 0,
      damage: 0,
      stocks: 0,
      total: 0
      },
      netpremium:{
      bi: 0,
      damage: 0,
      stocks: 0,
      total: 0
      }
    },
    checkedModifyTable: false,
    modalOpen: false,
    modal:{
      title: 'Changes admited premium',
      body: `If you continue, the data entered in the
        <br />
        admitted premium table will be taken.`,
      Button1: 'Accept',
      Button2: 'Cancel',
      includeFooter: true,
      includeCloseButton: false
    },
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
          netAllRisk:0,
          netAlop:0,
          netTotal:0,
        },
        {
          id: 2,
          name: "USD",
          premiumAllRisk: 0,
          premiumAlop: 0,
          premiumTotal:0,
          sluAllRisk: 0,
          sluAlop: 0,
          sluTotal:0,
          netAllRisk:0,
          netAlop:0,
          netTotal:0,
        },
      ],
      endorsementDateError: false,
      expiryDatetoCalc: this.accountComplete.deductibles.expiryDate,
      menu3: false,
      clause: this.accountComplete.cartera.clausula,
      clauseList: [],
      cartera: {},
      premiumPaymentDate: new Date().toISOString().substr(0, 10),
      on: true,
      biAdjustment: {
        rate: {},
      },
      movementValues: [],
      netPremium: {},
      subscriptionId: this.$route.params.id,
      e1: 1,
      menu: false,
      menu2: false,
      menu4: false,
      menu5: false,
      effectiveDate: this.dateSaved,
      inceptionDate:  new Date(this.accountComplete.deductibles.inceptionDate)
      .toISOString()
      .substr(0, 10),
      newEffectiveDate:  this.dateSaved,
      movementEndDate: new Date( this.accountComplete.deductibles.expiryDate)
        .toISOString()
        .substr(0, 10),
      newMovementEndDate: new Date(
        Date.now() + 31536000000 - new Date().getTimezoneOffset() * 60000
      )
        .toISOString()
        .substr(0, 10),
      rateBi: 0,
      detail: 20,
      files: [
        {
          fileId: 1,
          fileName: "Report Bi Adjustment",
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
      currencyOptions: {
        currency: "MXN",
        currencyDisplay: "narrowSymbol",
        locale: "en-US",
      },
      admittedPremium: 0,
      currentMovementEndDate: new Date(
        Date.now() + 31536000000 - new Date().getTimezoneOffset() * 60000
      )
        .toISOString()
        .substr(0, 10),
      effectiveDateError: false,
      endDateError: false,
      endorsmentReporData: {},
      enabledInputs: true,
      buttonTitle: 'Next',
      buttonTitleBack: 'Cancel',
    };
  },
  async beforeMount() {
    this.clauseList = await PaymentService.getClauses();
  },
  created() {
    console.log('this.accountComplete --->', this.accountComplete)
    const tiv = this.accountComplete.tiv;
    this.biAdjustment = {
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
    this.rateBi = tiv.premium.businessInterruptionRate;
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
      }
      if (this.e1 === 3) {
        this.buttonTitle = 'Finalize'
        this.buttonTitleBack = 'Return';
        if (this.admittedPremium !== 0) {
          this.detailValues[0].premiumTotal = this.admittedPremium;
        }
        const premiumOriginal = this.detailValues.find((el) => el.id === 1);
        const premiumUSD = this.detailValues.find((el) => el.id === 2);

        // Actualizando el premium
        this.accountComplete.tiv.premium.propertyDamage =
          premiumOriginal.sluDamage;
        this.accountComplete.tiv.premium.businessInterruption =
          premiumOriginal.sluBi;
        this.accountComplete.tiv.premium.stock = premiumOriginal.sluStocks;
        this.accountComplete.tiv.premium.total = premiumOriginal.sluTotal;

        this.accountComplete.tiv.premium.propertyDamageUsd =
          premiumUSD.sluDamage;
        this.accountComplete.tiv.premium.businessInterruptionUsd =
          premiumUSD.sluBi;
        this.accountComplete.tiv.premium.stockUsd = premiumUSD.sluStocks;
        this.accountComplete.tiv.premium.totalUsd = premiumUSD.sluTotal;

        // Obteniendo los calculos de Net premium
        const resultOriginalCurenncy = await netPremiumPRO(
          this.accountComplete?.tiv.premium,
          this.accountComplete.deductibles,
          this.accountComplete.tiv?.boundInsurableProp
        );
        const resultUSD = await netPremiumPRO(
          this.accountComplete?.tiv.premium,
          this.accountComplete.deductibles,
          this.accountComplete.tiv?.boundInsurableProp,
          true
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
        this.endorsmentReporData = {
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
          premium: this.accountComplete.tiv.premium,
          boundInsurableProp: this.accountComplete.tiv?.boundInsurableProp,
          deductibles: this.accountComplete.deductibles,
          netPremium: resultOriginalCurenncy.data,
          netPremiumUSD: resultUSD.data,
        };

        // Guardar los valores de netPremium
        this.netPremium = {
          originalValues: resultOriginalCurenncy.data,
          usdValues: resultUSD.data,
        };

        // Invoca el  servicio para generar el excel
        const fileLink = await EndorsementService.getEndorsmentReport({
          subscriptionId: this.subscriptionId,
          endorsmentType: 14,
          endorsmentReporData: this.endorsmentReporData,
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
    onChangeModifyTable(event){
      this.modalOpen = event.target.checked
      if(!event.target.checked){
        this.checkedModifyTable = false
      }
    },
    actionButton1() {
      this.modalOpen = false
      this.enabledInputs = false
    },
    actionButton2(){
      this.checkedModifyTable = !this.checkedModifyTable
      document.getElementById("checkbox").checked = false
      this.modalOpen = false
    },
    formatCurrency(amount) {
      if (isNaN(amount)) {
        return "Invalid data";
      }

      const formatter = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2,
      });
      return formatter.format(amount);
    },
    activarVistaDatos() {
      this.$refs.componente.reciboLllamada();
    },
    toUsd(value){
      const exchangeRate = this.accountComplete.deductibles.exchangeRate
      return Decimal.div(value, exchangeRate).toNumber()
    },

    unFormatCurrency(strAmount) {
      return +( ( strAmount ).replace('$','').replace(',','') );
    },
   async onResultados(datasMV) {
      // console.log("dataMV", datasMV);
      this.movementValues = datasMV;
      this.detailValues.map((value, index) => {
        value.premiumDamage =
          datasMV[index].totalDamage + datasMV[index].damage;
        value.premiumBi = datasMV[index].totalBi + datasMV[index].bi;
        value.premiumStocks =
          datasMV[index].totalStocks + datasMV[index].stocks;
        value.premiumTotal =
          value.premiumDamage + value.premiumBi + value.premiumStocks;
        value.sluDamage =
          (value.premiumDamage * this.biAdjustment.rate.property_damage_rate) /
          1000;
        value.sluBi =
          (value.premiumBi *
            this.biAdjustment.rate.business_interruption_rate) /
          1000;
        value.sluStocks =
          (value.premiumStocks * this.biAdjustment.rate.stock_rate) / 1000;
        value.sluTotal = value.sluDamage + value.sluBi + value.sluStocks;
      });

      const tivModificado =  {
        propertyDamageMovement: this.movementValues[0].damage,
        businessInterruptionMovement:this.movementValues[0].bi,
        stockMovement:this.movementValues[0].stocks,

        propertyDamageRate:this.accountComplete.tiv.premium.propertyDamageRate,
        businessInterruptionRate:this.accountComplete.tiv.premium.businessInterruptionRate,
        stockRate:this.accountComplete.tiv.premium.stockRate,
        stockPercentaje:(this.accountComplete.tiv.premium.stockPercentaje || this.accountComplete.tiv.insurable.porcentaje || 0) /100,
      }

      
      const dates = {
        effetiveDate:new Date(this.accountComplete.deductibles.inceptionDate).toISOString().substring(0,10),
        expiryDate:new Date(this.accountComplete.deductibles.expiryDate).toISOString().substring(0,10),
        endormenteffetiveDate: new Date (this.newEffectiveDate),
        movementEndDate:new Date(this.newMovementEndDate),
      }


      const totalPremium = new netPremiumInclusionRisk(
        tivModificado,
        this.accountComplete.deductibles,
        this.accountComplete.tiv?.boundInsurableProp.sluLine,
        false,
        dates
      );

      const retultTotalPremium = totalPremium.totalPremium();
      const premiumOriginal2 = this.totalPremium.find((el) => el.id === 1);

      this.result.totalpremium.bi = retultTotalPremium.biTotalPremium.toFixed(2);
      this.result.totalpremium.damage = retultTotalPremium.damageTotalPremium.toFixed(2);
      this.result.totalpremium.stocks = retultTotalPremium.stockTotalPremium.toFixed(2);
      this.result.totalpremium.total = retultTotalPremium.total.toFixed(2);

      this.result.premiumslu.bi = totalPremium.biPremiumSlu().toFixed(2),
      this.result.premiumslu.damage = totalPremium.damagePremiumSlu().toFixed(2),
      this.result.premiumslu.stocks = totalPremium.stocksPremiumSlu().toFixed(2)
      this.result.premiumslu.total = +(totalPremium.totalPremiumSlu().replace("$", "").replace(',',''))

      this.resultUsd.totalpremium.bi = this.toUsd(retultTotalPremium.biTotalPremium).toFixed(2);
      this.resultUsd.totalpremium.damage = this.toUsd(retultTotalPremium.damageTotalPremium).toFixed(2)
      this.resultUsd.totalpremium.stocks = this.toUsd(retultTotalPremium.stockTotalPremium).toFixed(2);
      this.resultUsd.totalpremium.total = this.toUsd(retultTotalPremium.total).toFixed(2);

      this.resultUsd.premiumslu.bi = this.toUsd(totalPremium.biPremiumSlu().toFixed(2)),
      this.resultUsd.premiumslu.damage = this.toUsd(totalPremium.damagePremiumSlu().toFixed(2)),
      this.resultUsd.premiumslu.stocks = this.toUsd(totalPremium.stocksPremiumSlu().toFixed(2))
      this.resultUsd.premiumslu.total = this.toUsd(+(totalPremium.totalPremiumSlu().replace("$", "").replace(',','')))

      const options = {
          isEdited:this.isEdited,
          dataEdited: {
            // totalPremium
            premiumDamage:this.totalPremium[0].premiumDamage,
            premiumBi:this.totalPremium[0].premiumBi,
            premiumStocks:this.totalPremium[0].premiumStocks,

            // premiumSlu
            sluDamage:this.totalPremium[0].sluDamage,
            sluBi:this.totalPremium[0].sluBi,
            sluStocks:this.totalPremium[0].sluStocks,

          },
        }

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

      this.result.netpremium.bi = resultOriginalCurenncy.data.biPremiumSlu.toFixed(2),
      this.result.netpremium.damage = resultOriginalCurenncy.data.damagePremiumSlu.toFixed(2),
      this.result.netpremium.stocks = resultOriginalCurenncy.data.stocksPremiumSlu.toFixed(2)
      this.result.netpremium.total =  resultOriginalCurenncy.data.totalPremiumSlu.toFixed(2)
      this.resultUsd.netpremium.bi = resultUSD.data.biPremiumSlu.toFixed(2),
      this.resultUsd.netpremium.damage =  resultUSD.data.damagePremiumSlu.toFixed(2),
      this.resultUsd.netpremium.stocks = resultUSD.data.stocksPremiumSlu.toFixed(2)
      this.resultUsd.netpremium.total =  resultUSD.data.totalPremiumSlu.toFixed(2)
    },
    changeTableData(){
      this.resultUsd.totalpremium.bi = this.toUsd(this.result.totalpremium.bi);
      this.resultUsd.totalpremium.damage = this.toUsd(this.result.totalpremium.damage)
      this.resultUsd.totalpremium.stocks = this.toUsd(this.result.totalpremium.stocks);
      this.result.totalpremium.total =  
      Number(this.result.totalpremium.bi) +
      Number(this.result.totalpremium.damage) +
      Number(this.result.totalpremium.stocks); 
      try {
        this.resultUsd.totalpremium.total =this.toUsd(+(this.result.totalpremium.total.replace("$", "").replace(',',''))) 
      } catch (error) {
        
      }

      this.resultUsd.premiumslu.bi = this.toUsd(this.result.premiumslu.bi),
      this.resultUsd.premiumslu.damage = this.toUsd(this.result.premiumslu.damage),
      this.resultUsd.premiumslu.stocks = this.toUsd(this.result.premiumslu.stocks)
      this.result.premiumslu.total =  
      Number(this.result.premiumslu.bi) +
      Number(this.result.premiumslu.damage) +
      Number(this.result.premiumslu.stocks); 
      try {
        this.resultUsd.premiumslu.total = this.toUsd(+(this.result.premiumslu.total.replace("$", "").replace(',','')))
      } catch (error) {
        
      }

      this.resultUsd.netpremium.bi = this.toUsd(this.result.netpremium.bi),
      this.resultUsd.netpremium.damage =  this.toUsd(this.result.netpremium.damage),
      this.resultUsd.netpremium.stocks = this.toUsd(this.result.netpremium.stocks),
      this.result.netpremium.total =  
      Number(this.result.netpremium.bi) +
      Number(this.result.netpremium.damage) +
      Number(this.result.netpremium.stocks); 
      try{
       this.resultUsd.netpremium.total =  this.toUsd(+(this.result.netpremium.total.replace("$", "").replace(',','')))
      }catch(e){

      }
    },
    async stepone() {
      this.e1 = 2;
      console.log(this.e1);
    },
    async endorsementDateValidation(event, incomingDate, newShareInTo, newExchangeRateInTo) {
      
      if (
        Date.parse(incomingDate) >=
        Date.parse(this.expiryDatetoCalc)
      ) {
        this.endorsementDateError = true;
      } else {
        await this.changeDateEndorsementAndShare(incomingDate, newShareInTo, newExchangeRateInTo)
        this.endorsementDateError = false;
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
    async downloadFile() {
      console.log("downloadFile");
    },

    setEndorsementDocuments({ files }) {
      this.endorsementDocuments = files
    },

    async submit() {
      this.e1 = 1;

      // Actualizando Share
      this.accountComplete.tiv.boundInsurableProp.sluLine = Number(this.newShareInTo);
      this.accountComplete.deductibles.exchangeRate = Number(this.newExchangeRateInTo);

      // Obteniendo el insurable
      const premiumOriginal = this.detailValues.find((el) => el.id === 1);
      const premiumUSD = this.detailValues.find((el) => el.id === 2);

      // actualizando tiv.insurable de account complete
      this.accountComplete.tiv.insurable.propertyDamage =
        premiumOriginal.premiumDamage;
      this.accountComplete.tiv.insurable.propertyDamageUsd =
        premiumUSD.premiumDamage;
      this.accountComplete.tiv.insurable.businessInterruption =
        premiumOriginal.premiumBi;
      this.accountComplete.tiv.insurable.businessInterruptionUsd =
        premiumUSD.premiumBi;
      this.accountComplete.tiv.insurable.stock = premiumOriginal.premiumStocks;
      this.accountComplete.tiv.insurable.stockUsd = premiumUSD.premiumStocks;
      this.accountComplete.tiv.insurable.total = premiumOriginal.premiumTotal;
      this.accountComplete.tiv.insurable.totalUsd = premiumUSD.premiumTotal;

      // calcular diferencia del net premium
      const originalNetPremium = removeDollarSign(
        this.accountComplete.net_premium.originalValues.netTotal
      );
      const newNetPremium = removeDollarSign(
        this.netPremium.originalValues.netTotal
      );
      const netPremiumDifference = Decimal(Decimal(newNetPremium))
        .sub(Decimal(originalNetPremium))
        .toNumber();

      // Actualizar netPremium
      this.accountComplete.net_premium = this.netPremium;
      // console.log("netPremium", this.accountComplete.net_premium);

      // guardar la cuenta actualizada en BD
      const accountCompleteResponse =
        await AccountCompleteService.addAccountComplete(this.subscriptionId, {
          ...this.accountComplete,
          deductibles: this.accountComplete.deductibles,
          tiv: this.accountComplete.tiv,
          netPremium: this.accountComplete.net_premium,
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
        endorsmentType: 14,
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
            admitedPremium: this.admitedPremium,
          },
        },
        files: this.endorsementDocuments,
      });

      await this.backToCreateEndorsement()
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
        this.activarVistaDatos()
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
  border-top: solid 1px #d2deed;
  padding-top: 50px;
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

.admited-premium {
  width: 91%;
  height: auto;
  margin: auto;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding: 20px 0 0;
}
.table-input-data{
  display: flex;
  width: 50%;
  align-items: center;
  justify-content: flex-start;
  padding: 0px 5px;
}
.space-between{
  display: flex;
  justify-content: space-between;
}
.container-modify-general{
  width: 100%;
  display: flex;
  justify-content: flex-end;
  padding: 10px;
}
.subcontainer-modify-general{
  display: flex;
  font-size: 18px;
  font-weight: 600;
  input{
    cursor: pointer;
    accent-color: #003d6d;
    margin-left: 10px;
    transform: scale(1.8)
  }
}
.detail-container-step2{
  font-size: 18px;
  font-weight: 600;
  display: flex;
  flex-direction: column;
  width: 80%;
  margin-left: 20px;
}

.detail-subcontainer-step2{
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
.container-table-subtitles{
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content:space-between;
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
</style>
