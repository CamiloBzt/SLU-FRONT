<template>
  <div class="outter-wrapper" ref="targetRef">
    <div class="endorsement-title">PMD Adjustment</div>
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
                  <div class="input-cont">
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
                          v-model="effectiveDate"
                          label="Endorsement effective date"
                          readonly
                          v-bind="attrs"
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        v-model="effectiveDate"
                        @input="
                          menuControllStepOne.endorsementEffectiveDate = false
                        "
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
                          disabled
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        v-model="movementEndDate"
                        @input="menuControllStepOne.movementEndDate = false"
                      ></v-date-picker>
                    </v-menu>
                    <div
                      v-if="this.errorsDates['movementEndDate'] && sent"
                      class="error-message"
                    >
                      The new Movement end date must be later than Endorsement
                      effective date.
                    </div>
                  </div>
                </div>
              </div>
              <div v-if="showInfoEndorsement">
                <div class="input-row w-50 d-flex flex-wrap">
                  <div class="input-col">
                    <div class="input-cont">
                      <v-menu
                        v-model="menuControllStepOne.InceptionDate"
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
                            disabled
                            v-bind="attrs"
                            v-on="on"
                          ></v-text-field>
                        </template>
                        <v-date-picker
                          v-model="inceptionDate"
                          @input="menuControllStepOne.InceptionDate = false"
                          @change="
                            endorsementDateValidation($event, inceptionDate)
                          "
                        ></v-date-picker>
                      </v-menu>
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
                            label="Movement end date"
                            readonly
                            v-bind="attrs"
                            v-on="on"
                            disabled
                          ></v-text-field>
                        </template>
                        <v-date-picker
                          v-model="movementEndDate"
                          @input="menuControllStepOne.movementEndDate = false"
                        ></v-date-picker>
                      </v-menu>
                      <div
                        v-if="this.errorsDates['movementEndDate'] && sent"
                        class="error-message"
                      >
                        The new Movement end date must be later than Endorsement
                        effective date.
                      </div>
                    </div>
                  </div>
                  <InputDaysDiference
                    :endorsementDate="effectiveDate"
                    :expiryDate="expiryDatetoCalc"
                    :key="effectiveDate"
                  />
                </div>
                <div class="input-row w-50 d-flex flex-wrap">
                  <div class="input-col">
                    <div class="input-cont">
                      <currency-input
                        v-model="newShare"
                        label="New share"
                        :options="currencyOptions"
                        @blur="
                          ($event) => {
                            one = changeHandler('currentMonth', 99, 'damage');
                          }
                        "
                      />
                    </div>
                  </div>
                  <div class="input-col">
                    <div class="input-cont">
                      <currency-input
                        v-model="PmdStock"
                        label="PMD Stocks"
                        disbled
                        readonly
                        :options="currencyOptions"
                        @blur="
                          ($event) => {
                            one = changeHandler('currentMonth', 99, 'damage');
                          }
                        "
                      />
                    </div>
                  </div>
                </div>
                <div class="input-row w-50 d-flex flex-wrap">
                  <div class="input-col">
                    <div class="inner-title">Total value</div>
                    <div class="input-cont">
                      <div class="inner-title">Original currency</div>
                      <currency-input
                        v-model="stockInputValue"
                        label="Stocks"
                        :options="currencyOptions"
                        :readonly="true"
                      />
                      <div
                        v-if="
                          this.errorsDates['endorsementEffectiveDate'] && sent
                        "
                        class="error-message"
                      >
                        The new Endorment effective date must be lower than
                        Inception date date .
                      </div>
                    </div>
                  </div>

                  <div class="input-col">
                    <div class="input-cont">
                      <div class="inner-title">USD</div>
                      <currency-input
                        v-model="stockInputValueUsd"
                        label="Stocks"
                        :options="currencyOptions"
                        :readonly="true"
                      />
                      <div
                        v-if="this.errorsDates['movementEndDate'] && sent"
                        class="error-message"
                      >
                        The new Movement end date must be later than Endorsement
                        effective date.
                      </div>
                    </div>
                  </div>
                </div>
                <div class="input-row w-50 d-flex flex-wrap">
                  <div class="input-col">
                    <div class="input-cont">
                      <currency-input
                        v-model="newShare"
                        label="Stocks percentaje PDM"
                        readonly
                        :options="currencyOptions"
                        @blur="
                          ($event) => {
                            one = changeHandler(
                              'currentMonth',
                              index,
                              'damage'
                            );
                          }
                        "
                      />
                    </div>
                  </div>

                  <div class="input-col">
                    <div class="input-cont">
                      <currency-input
                        v-model="newShare"
                        label="Stocks percentaje PDM"
                        readonly
                        :options="currencyOptions"
                        @blur="
                          ($event) => {
                            one = changeHandler(
                              'currentMonth',
                              index,
                              'damage'
                            );
                          }
                        "
                      />
                    </div>
                  </div>
                </div>
                <div class="input-row w-50 d-flex flex-wrap">
                  <div class="input-col">
                    <div class="input-cont">
                      <v-text-field
                        v-model="rateStock"
                        label="Rate stocks"
                        readonly
                        suffix="%"
                        :readonly="true"
                      />
                    </div>
                  </div>
                </div>
                <div class="input-row w-50 d-flex flex-wrap">
                  <div class="input-col">
                    <div class="input-cont">
                      <currency-input
                        v-model="newShare"
                        label="Share SLU"
                        readonly
                        :options="currencyOptions"
                        @blur="
                          ($event) => {
                            one = changeHandler(
                              'currentMonth',
                              index,
                              'damage'
                            );
                          }
                        "
                      />
                    </div>
                  </div>
                </div>
                <div class="input-row w-50 d-flex flex-wrap">
                  <div class="inner-title">
                    {{ periodLabel }}
                  </div>

                  <div class="catalog-select">
                    <v-autocomplete
                      label="Movement Type"
                      v-model="periodValue"
                      :items="catalogPeriodo"
                      @change="
                        ($event) => {
                          changePeriod($event);
                        }
                      "
                      item-value="id"
                      item-text="type"
                    />
                  </div>
                </div>
                <div class="container-period" v-if="periodValue === '1'">
                  <div class="container-rows-periods">
                    <div class="input-name-period-subtitle-month">Month</div>
                    <div class="input-name-period-subtitle">
                      Stock original currency
                    </div>
                    <div class="input-name-period-subtitle">Stock USD</div>
                  </div>
                  <div
                    class="container-rows-periods"
                    v-for="(item, index) in isMonthly"
                    :key="index"
                  >
                    <div class="input-name-period">{{ item }}</div>
                    <div class="input-col">
                      <div class="input-cont">
                        <currency-input
                          v-model="currentMonth[index]"
                          label=""
                          :options="currencyOptions"
                          v-on:input="normalCurrency($event, index)"
                        />
                      </div>
                    </div>
                    <div class="input-col">
                      <div class="input-cont">
                        <currency-input
                          v-model="currentMonthUSD[index]"
                          label=""
                          :options="currencyOptions"
                          :readonly="true"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="container-rows-periods">
                    <div class="input-name-period">Monthly average</div>
                    <div class="input-col">
                      <div class="input-cont">
                        <currency-input
                          v-model="monthlyAverage"
                          label=""
                          :options="currencyOptions"
                          :readonly="true"
                        />
                      </div>
                    </div>
                    <div class="input-col">
                      <div class="input-cont">
                        <currency-input
                          v-model="monthlyAverageUsd"
                          label=""
                          :options="currencyOptions"
                          :readonly="true"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div class="container-period" v-if="periodValue === '2'">
                  <div class="container-rows-periods">
                    <div class="input-name-period-subtitle-month">Month</div>
                    <div class="input-name-period-subtitle">
                      Stock original currency
                    </div>
                    <div class="input-name-period-subtitle">Stock USD</div>
                  </div>
                  <div
                    class="container-rows-periods"
                    v-for="(item, index) in isTrimester"
                    :key="index"
                  >
                    <div class="input-name-period">{{ item }}</div>
                    <div class="input-col">
                      <div class="input-cont">
                        <currency-input
                          v-model="currentMonth[index]"
                          label=""
                          :options="currencyOptions"
                          v-on:input="normalCurrency($event, index)"
                        />
                      </div>
                    </div>
                    <div class="input-col">
                      <div class="input-cont">
                        <currency-input
                          v-model="currentMonthUSD[index]"
                          label=""
                          :options="currencyOptions"
                          :readonly="true"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="container-rows-periods">
                    <div class="input-name-period">Quarterly Average</div>
                    <div class="input-col">
                      <div class="input-cont">
                        <currency-input
                          v-model="quarterlyAverage"
                          label=""
                          :options="currencyOptions"
                          :readonly="true"
                        />
                      </div>
                    </div>
                    <div class="input-col">
                      <div class="input-cont">
                        <currency-input
                          v-model="quarterlyAverageUsd"
                          label=""
                          :options="currencyOptions"
                          :readonly="true"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div class="container-period" v-if="periodValue === '3'">
                  <div class="container-rows-periods">
                    <div class="input-name-period-subtitle-month">Month</div>
                    <div class="input-name-period-subtitle">
                      Stock original currency
                    </div>
                    <div class="input-name-period-subtitle">Stock USD</div>
                  </div>
                  <div
                    class="container-rows-periods"
                    v-for="(item, index) in isCustomer"
                    :key="index"
                  >
                    <div class="input-name-period">{{ item }}</div>
                    <div class="input-col">
                      <div class="input-cont">
                        <currency-input
                          v-model="currentMonth[index]"
                          label=""
                          :options="currencyOptions"
                          v-on:input="normalCurrency($event, index)"
                        />
                      </div>
                    </div>
                    <div class="input-col">
                      <div class="input-cont">
                        <currency-input
                          v-model="currentMonthUSD[index]"
                          label=""
                          :options="currencyOptions"
                          :readonly="true"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="container-rows-periods">
                    <div class="input-name-period">Agree average</div>
                    <div class="input-col">
                      <div class="input-cont">
                        <currency-input
                          v-model="agreeAverage"
                          label=""
                          :options="currencyOptions"
                          :readonly="true"
                        />
                      </div>
                    </div>
                    <div class="input-col">
                      <div class="input-cont">
                        <currency-input
                          v-model="agreeAverageUsd"
                          label=""
                          :options="currencyOptions"
                          :readonly="true"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div class="input-row w-50 d-flex flex-wrap">
                  <div class="inner-title">Standar premium calculation</div>
                  <div class="input-col">
                    <div class="input-cont">
                      <div class="inner-title">Original currency</div>
                      <currency-input
                        v-model="tivStockReceivable"
                        label="TIV stock receivable"
                        :options="currencyOptions"
                        :readonly="true"
                      />
                      <div
                        v-if="this.errors['tivStockReceivable'] && sent"
                        class="error-message"
                      >
                        message error
                      </div>
                    </div>
                  </div>

                  <div class="input-col">
                    <div class="input-cont">
                      <div class="inner-title">USD</div>
                      <currency-input
                        v-model="tivStockReceivableUsd"
                        label="TIV stock receivable"
                        :options="currencyOptions"
                        :readonly="true"
                      />
                      <div
                        v-if="this.errors['tivStockReceivable'] && sent"
                        class="error-message"
                      >
                        message error
                      </div>
                    </div>
                  </div>
                </div>
                <div class="input-row w-50 d-flex flex-wrap">
                  <div class="input-col">
                    <div class="input-cont">
                      <currency-input
                        v-model="totalPremium"
                        label="Total premium"
                        :options="currencyOptions"
                        :readonly="true"
                      />
                      <div
                        v-if="this.errors['totalPremium'] && sent"
                        class="error-message"
                      >
                        message error
                      </div>
                    </div>
                  </div>

                  <div class="input-col">
                    <div class="input-cont">
                      <currency-input
                        v-model="totalPremiumUsd"
                        label="Total premium"
                        :options="currencyOptions"
                        :readonly="true"
                      />
                      <div
                        v-if="this.errors['totalPremium'] && sent"
                        class="error-message"
                      >
                        message error
                      </div>
                    </div>
                  </div>
                </div>
                <div class="input-row w-50 d-flex flex-wrap">
                  <div class="inner-title">PPW</div>
                  <div class="input-col">
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
                            label="Premium payment date"
                            readonly
                            v-bind="attrs"
                            v-on="on"
                          ></v-text-field>
                        </template>
                        <v-date-picker
                          v-model="premiumPaymentDate"
                          @input="
                            menuControllStepOne.premiumPaymentDate = false
                          "
                        ></v-date-picker>
                      </v-menu>
                      <div
                        v-if="
                          this.errorsDates['endorsementEffectiveDate'] && sent
                        "
                        class="error-message"
                      >
                        The new Endorment effective date must be lower than
                        Inception date date .
                      </div>
                    </div>
                  </div>

                  <div class="input-col">
                    <div class="input-cont">
                      <v-autocomplete
                        :label="'Clause'"
                        v-model="clause"
                        :items="clauseList"
                        item-value="clause"
                        item-text="clause"
                      />
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
                <div class="table-title-detail table-title-detail--large">
                  Detail
                </div>
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
                          v-model="premiumPaymentDate"
                          label="Premium payment date"
                          readonly
                          v-bind="attrs"
                          v-on="on"
                          disabled
                        ></v-text-field>
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
                  <div class="inner-title" style="opacity: 0">|</div>
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
            </v-stepper-content>

            <v-stepper-content step="3">
              <div v-if="loadingDocument">cargando documento ..</div>
              <div v-if="!loadingDocument" class="inner-title">
                Admitted premium
              </div>
              <div
                v-if="!loadingDocument"
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
import Table from './../modules/deductions-change/detail/components/Table.vue';
/* services */
import { getFiles } from "../../services/mock-files.service";
import PaymentService from "@/modules/home/services/payments.service";
import { netPremiumInclusionRiskEng } from "../class/netPremiumInclusionRiskEng";
import {netPremiumInclusionRiskAutoCalcs} from "@/modules/home/modules/endorsements/engineering/class/netPremiumInclusionRiskEng";

//Clases
import { ChangeofPeriodAutoCalcs } from "../models/ChangeOfPeriod";
import EndorsementService from "../../services/endorsement.service";
import AccountCompleteService from "@/modules/home/services/account-complete.service";
import EndorsementDocuments from "../../components/EndorsementDocuments.vue";

/* libs */
import Decimal from '@/lib/decimal';
import { unFormatCurrency,formatCurrency } from "../../utils";

export default {
  name: "PmdAdjustment",
  components: {
    AppFile,
    CurrencyInput,
    DocumentsEndorsement,
    InputDaysDiference,
    EndorsementDocuments,
    Table
  },
  props: {
    type: { type: String, default: "Inclusion Risk" },
    accountComplete: { type: Object },
    changeDateEndorsement: {
      type: Function,
    },
    dateSaved: { type: String },
    showInfoEndorsement: { type: Boolean },
    backToCreateEndorsement: {
      type: Function,
    }
  },
  data() {
    return {
      menu3: false,
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
          }
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
          }
        },
      },
      endorsementDateError: false,
      loadingDocument: false,
      expiryDatetoCalc: this.accountComplete.deductibles.expiryDate,
      loadingdocument: false,
      tempAccountComplete: this.accountComplete,
      resultspremium: {
        damage: 0.0,
        bi: 0.0,
        stocks: 0.0,
        total: 0.0,
      },
      resultspremiumUSD: {
        damage: 0.0,
        bi: 0.0,
        stocks: 0.0,
        total: 0.0,
      },
      resultsSLU: {
        damage: 0.0,
        bi: 0.0,
        stocks: 0.0,
        total: 0.0,
      },
      resultsSLUUSD: {
        damage: 0.0,
        bi: 0.0,
        stocks: 0.0,
        total: 0.0,
      },
      periodLabel: "Report monthly statement",
      monthlyAverage: 0,
      monthlyAverageUsd: 0,
      quarterlyAverage: 0,
      quarterlyAverageUsd: 0,
      agreeAverage: 0,
      agreeAverageUsd: 0,
      tivStockReceivable: 0,
      tivStockReceivableUsd: 0,
      totalPremium: 0,
      totalPremiumUsd: 0,
      newShare: this.accountComplete.tiv.boundInsurableProp.sluLine,
      rateStock: this.accountComplete.tiv.premium.allRiskRate,
      stockInputValue: this.accountComplete.tiv.insurable.stock,
      stockInputValueUsd: this.accountComplete.tiv.insurable.stockUsd,
      PmdStock: this.accountComplete.tiv.insurable.porcentaje,
      stock: this.accountComplete.tiv.insurable.stock,
      clauseList: [],
      currentMonth: [],
      currentMonthUSD: [],
      currencyOptions: {
        currency: "MXN",
        currencyDisplay: "narrowSymbol",
        locale: "en-US",
      },
      periodValue: "1",
      catalogPeriodo: [
        { id: "1", type: "Report monthly statement" },
        { id: "2", type: "Report quarterly statement" },
        { id: "3", type: "Report average sent by customer" },
      ],
      isMonthly: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "Octuber",
        "November",
        "December",
      ],
      isTrimester: [
        "First trimester",
        "Second trimester",
        "Third trimester",
        "Fourth trimester",
      ],
      isCustomer: ["Agree average"],
      attrs: {},
      on: {},
      e1: 1,
      sent: false,
      subscriptionId: this.$route.params.id,
      errors: {
        tivStockReceivable: true,
        totalPremium: true,
        endorsementEffectiveDate: false,
      },
      errorsDates: {
        endorsementEffectiveDate: false,
        movementEndDate: false,
      },
      menuControllStepOne: {
        movementEndDate: false,
        endorsementEffectiveDate: false,
        InceptionDate: false,
        premiumPaymentDate: false,
      },
      menuControllStepTwo: {
        movementEndDate: false,
        endorsementEffectiveDate: false,
        InceptionDate: false,
        premiumPaymentDate: false,
        clause: false,
      },
      originalValues: {
        lastInformation: {
          totalPremiumMovement: 0,
          PremiumSlu: 0,
          netPremium: 0,
          total: 0,
        },
        newInformation: {
          totalPremiumMovement: 0,
          PremiumSlu: 0,
          netPremium: 0,
          total: 0,
        },
      },
      usdValues: {
        lastInformation: {
          totalPremiumMovement: 0,
          PremiumSlu: 0,
          netPremium: 0,
          total: 0,
        },
        newInformation: {
          totalPremiumMovement: 0,
          PremiumSlu: 0,
          netPremium: 0,
          total: 0,
        },
      },
      detail: 20,
      clauseList: [],
      files: [
        {
          fileId: 1,
          fileName: "Change of period",
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
      endDateError: false,
      clause: this.accountComplete.cartera.clausula,
      effectiveDateError: false,
      // effectiveDate: undefined,
      effectiveDate: this.dateSaved,

      expiryDate: undefined,
      //nuevo valor para guardar el expiry date
      movementEndDate: this.initialDateValue(),
      currentMovementEndDate: this.initialDateValue(),
      inceptionDate: this.initialDateValue(),
      premiumPaymentDate: this.initialDateValue(),
      lastAccountInformacion: {},
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
      totalPremium2: [
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
      sharePorcent:0,
      buttonTitle: 'Next',
      buttonTitleBack: 'Cancel',
    };
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
  async beforeMount() {
    this.el = 1;
    this.files = await getFiles();
    this.clauseList = await PaymentService.getClauses();
    //TODO: BORRAR
    // this.showInfoEndorsement = true;
  },
  mounted() {
    console.log("PmdStock", this.accountComplete);

    this.lastAccountInformacion = { ...this.accountComplete };
    const effective = new Date(this.accountComplete.deductibles.expiryDate)
      .toISOString()
      .substring(0, 10);
    const expiry = new Date(this.accountComplete.deductibles.expiryDate)
      .toISOString()
      .substring(0, 10);

    // //inicializacion de la fechas de las fechas a cambiar
    // this.effectiveDate = effective;
    this.expiryDate = expiry;
    this.inceptionDate = effective;
    this.movementEndDate = expiry;
  },
  methods: {
    calcPremium(){

const tiv = this.accountComplete.tiv;
const tivMovement = {
  allRisk: tiv.insurable.allRisk || 25,
  alop:tiv.insurable.alop || 25,

  allRiskRate: tiv.premium.allRiskRate,
  alopRate: tiv.premium.alopRate,
}

const dates = {
  effetiveDate:new Date(this.accountComplete.deductibles.inceptionDate).toISOString().substring(0,10),
  expiryDate:new Date(this.accountComplete.deductibles.expiryDate).toISOString().substring(0,10),
  endormenteffetiveDate: new Date (this.effectiveDate).toISOString().substring(0,10),
  movementEndDate:new Date(this.expiryDate).toISOString().substring(0,10),
}

const calcTotalPremium = new netPremiumInclusionRiskEng(
  tivMovement,
  this.accountComplete.deductibles,
  this.accountComplete.tiv?.boundInsurableProp.sluLine,
  false,
  dates
);

const totalPremiumResult = calcTotalPremium.calculateTotalPremium();
const totalPremium = this.totalPremium2.find((el) => el.id === 1);
totalPremium.premiumAllRisk = totalPremiumResult.allRiskTotalPremium;
totalPremium.premiumAlop = totalPremiumResult.alopTotalPremium;
totalPremium.premiumTotal = totalPremiumResult.total;

totalPremium.sluAllRisk =  calcTotalPremium.allRiskPremiumSlu();
totalPremium.sluAlop =  calcTotalPremium.alopPremiumSlu();
totalPremium.sluTotal =  calcTotalPremium.totalPremiumSlu();


const netTotal = unFormatCurrency(calcTotalPremium.netSLUExcludingSurveyFeesTotal())
this.tableData.currency.total_premium.total_premium_movement = totalPremiumResult.total.toFixed(2);
this.tableData.currency.total_premium.premium_slu = totalPremium.sluTotal.toFixed(2);
this.tableData.currency.total_premium.net_premium = netTotal;
//this.tableData.currency.total_premium.total = c_t_t_movement + c_t_t_slu + c_t_t_premium;


//   tableData.usd.total_premium.total_premium_movement
this.tableData.usd.total_premium.total_premium_movement = this.toUsd(totalPremiumResult.total).toFixed(2);
this.tableData.usd.total_premium.premium_slu = this.toUsd(totalPremium.sluTotal).toFixed(2);
this.tableData.usd.total_premium.net_premium = this.toUsd(netTotal);
//this.tableData.usd.total_premium.total = u_t_t_movement + u_t_t_slu + u_t_t_premium;

},

setTotalPremium({id, value, concept}){
const totalPremium = this.totalPremium2.find((el) => el.id === id);
totalPremium[concept] = value;

if (concept !== 'premiumTotal' & concept !== 'sluTotal') {
  this.isEdited[concept] = true;
}
},
toUsd(value){
const exchangeRate = this.accountComplete.deductibles.exchangeRate
return Decimal.div(value, exchangeRate).toNumber()
},
    onChangeStockResult(event) {
      console.log(event);
      this.resultspremiumUSD.stocks = event / 25;

      this.resultspremium.total =
        this.resultspremium.damage +
        this.resultspremium.bi +
        this.resultspremium.stocks;
      this.resultspremiumUSD.total =
        this.resultspremiumUSD.damage +
        this.resultspremiumUSD.bi +
        this.resultspremiumUSD.stocks;
    },
    onCompletedInfo() {
      if (this.periodValue == 1 && this.monthlyAverage > this.newShare) {
        this.tivStockReceivable = this.monthlyAverage - this.newShare;
        this.errors.tivStockReceivable = false;
        this.errors.totalPremium = false;
      } else if (
        this.periodValue == 2 &&
        this.quarterlyAverage > this.newShare
      ) {
        this.tivStockReceivable = this.quarterlyAverage - this.newShare;
        this.errors.tivStockReceivable = false;
        this.errors.totalPremium = false;
      } else if (this.periodValue == 3 && this.agreeAverage > this.newShare) {
        this.tivStockReceivable = this.agreeAverage - this.newShare;
        this.errors.tivStockReceivable = false;
        this.errors.totalPremium = false;
      }
      this.tivStockReceivableUsd = this.tivStockReceivable / 25;
      this.totalPremium =
        (this.tivStockReceivable * (this.rateStock * 0.1)) / 1000;
      this.totalPremiumUsd =
        (this.tivStockReceivableUsd * (this.rateStock * 0.1)) / 1000;
    },
    onNoCompletedInfo() {
      this.tivStockReceivable = 0;
      this.tivStockReceivableUsd = 0;
      this.totalPremium = 0;
      this.totalPremiumUsd = 0;
    },
    normalCurrency(event, index) {
      this.currentMonthUSD[index] = this.currentMonth[index] / 25;
      const currentMonthplus = this.currentMonth.reduce((a, b) => a + b, 0);
      const currentMonthUSDplus = this.currentMonthUSD.reduce(
        (a, b) => a + b,
        0
      );
      if (this.periodValue == 1) {
        this.monthlyAverage = currentMonthplus / 12;
        this.monthlyAverageUsd = currentMonthUSDplus / 12;
      } else if (this.periodValue == 2) {
        this.monthlyAverage = currentMonthplus / 4;
        this.monthlyAverageUsd = currentMonthUSDplus / 4;
      } else if (this.periodValue == 3) {
        this.monthlyAverage = currentMonthplus;
        this.monthlyAverageUsd = currentMonthUSDplus;
      }

      this.quarterlyAverage = currentMonthplus / 4;
      this.quarterlyAverageUsd = currentMonthUSDplus / 4;

      this.agreeAverage = currentMonthplus;
      this.agreeAverageUsd = currentMonthUSDplus;
      let count = 0;
      let limit = this.periodValue == 1 ? 12 : this.periodValue == 2 ? 4 : 1;
      for (let i = 0; i < limit; i++) {
        if (this.currentMonth[i]) {
          count += 1;
        }
      }

      if (count == limit) {
        this.onCompletedInfo();
      } else {
        this.onNoCompletedInfo();
      }
    },
    changePeriod(event) {
      event == 1 && (this.periodLabel = "Report monthly statement");
      event == 2 && (this.periodLabel = "Report quarterly statement");
      event == 3 && (this.periodLabel = "Report average sent by customer");
      this.monthlyAverage = 0;
      this.monthlyAverageUsd = 0;
      this.quarterlyAverage = 0;
      this.quarterlyAverageUsd = 0;
      this.agreeAverage = 0;
      this.agreeAverageUsd = 0;
      this.currentMonth = [];
      this.currentMonthUSD = [];
      this.tivStockReceivable = 0;
      this.totalPremium = 0;
      this.totalPremiumUsd = 0;
      this.tivStockReceivableUsd = 0;
    },
    changeHandler(id, value, concept) {
      // switch (id) {
      //   case 1: // Original currency action
      //     switch (concept) {
      //       case "damage":
      //         this.movementValuesComputed[1].damage = Decimal(
      //           !value ? 0 : Decimal(value)
      //         ).div(Decimal(this.exchangeRate || 0));
      //         return value;
      //       case "bi":
      //         this.movementValuesComputed[1].bi = Decimal(
      //           !value ? 0 : Decimal(value)
      //         ).div(Decimal(this.exchangeRate || 0));
      //         return value;
      //       case "stocks":
      //         this.movementValuesComputed[1].stocks = Decimal(
      //           !value ? 0 : Decimal(value)
      //         ).div(Decimal(this.exchangeRate || 0));
      //         return value;
      //     }
      //   case 2: // USD action
      //     return 29;
      //   case 3: // Rate action
      //     this.movementValues = this.values.slice(1, 2);
      //     break;
      //   case 4: //
      //     this.movementValues = this.values.slice(1, 2);
      //     break;
      //   case 5:
      //     this.movementValues = this.values.slice(1, 2);
      //     break;
      //   default:
      //     this.movementValues = this.values;
      // }
    },
    initialDateValue() {
      const newDate = new Date(
        Date.now() + 31536000000 - new Date().getTimezoneOffset() * 60000
      )
        .toISOString()
        .substr(0, 10);

      return newDate;
    },
    async endorsementDateValidation(event, incomingDate) {
      if (Date.parse(incomingDate) >= Date.parse(this.movementEndDate)) {
        this.endorsementDateError = true;
      } else {
        await this.changeDateEndorsement(incomingDate);
        this.endorsementDateError = false;
      }
    },
    nextStep() {
      if (this.e1 === 1) {
        this.sent = true;
        let changeStep = true;
        for (const property in this.errors) {
          if (this.errors[property] === true) changeStep = false;
        }
        if (changeStep === true) {
          this.e1 = 2;
          this.sent = false;
        }
        return;
      }
    },

    calcualteTotalPremiumMoments() {},
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
        endorsmentType: 13,
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
            // netPremiumDifference,
            admitedPremium: this.admitedPremium,
          },
        },
        files: this.endorsementDocuments,
      });

      await this.backToCreateEndorsement()
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
    validateDates(event, { lowerDate, higherDate, error }) {
      this.effectiveDate = lowerDate;
      if (Date.parse(lowerDate) < Date.parse(higherDate)) {
        this.errors[error] = false;
      } else {
        this.errors[error] = true;
      }
    },
    validfields(event) {
      return 0;
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
  watch: {
    e1: async function () {
      if (this.e1 === 1) {
        this.accountComplete = this.tempAccountComplete;
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
            allRisk:this.totalPremium2[0].premiumAllRisk,
            alop:this.totalPremium2[0].premiumAlop,
            totalInsured:this.totalPremium2[0].premiumTotal,
            allRiskRate: this.accountComplete.tiv.premium.allRiskRate,
            alopRate: this.accountComplete.tiv.premium.alopRate,
            allRiskUsd:this.toUsd(this.totalPremium2[0].premiumAllRisk),
            alopUsd:this.toUsd(this.totalPremium2[0].premiumAlop),
            totalUsd:this.toUsd(this.totalPremium2[0].premiumTotal),
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
          
        }

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
.container-subtitles {
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
}
.table-subtitle {
  width: 50%;
  color: rgb(0, 0, 0);
  font-weight: 800;
  border-radius: 6px;
  margin: 2px;
  font-size: 18px;
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
  height: 1px;
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
.input-col-month {
  width: 20%;
  display: block;
  margin-right: 30px;
}

.input-col-lg {
  width: 50%;
  display: block;
  margin-right: 30px;
}

.input-cont-lg {
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
.details-input-container {
  justify-content: center;
  align-items: center;
}

.input-col-details {
  flex-grow: 1;
  margin-inline-end: 20px;
}
.catalog-select {
  width: 25%;
}
.container-rows-periods {
  display: flex;
  flex-direction: row;
  .input-name-period {
    width: 15%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }
  .input-name-period-subtitle {
    width: 20%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    font-weight: 700;
    font-family: avenir;
    margin-right: 30px;
  }
  .input-name-period-subtitle-month {
    width: 15%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    font-weight: 700;
    font-family: avenir;
  }
}

.editAccount {
  width: auto;
  color: #f59607;
  font-weight: 600;
  font-size: 19px;
}
</style>
