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
                        readonly
                        disabled
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
                        readonly
                        disabled
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
                        v-model="stockPercentagePMD"
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
                        v-model="stockPercentagePMDUSD"
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
              <!--Details -->
              <div class="details-container">
                <h3 class="inner-title">Detail</h3>

                <div class="details-input-container d-flex flex-wrap">
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
                          @input="
                            menuControllStepTwo.premiumPaymentDate = false
                          "
                        ></v-date-picker>
                      </v-menu>
                    </div>
                  </div>
                  <div class="input-col-details">
                    <div class="input-cont">
                      <v-autocomplete
                        :label="'Clause'"
                        v-model="clause"
                        :items="clauseList"
                        item-value="clause"
                        item-text="clause"
                        disabled
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div class="table-container input-row justify-center">
                <div class="table-title-space"></div>
                <div class="title-col">
                  <div class="col-subtitle">Damage</div>
                  <div class="col-subtitle">Bi</div>
                  <div class="col-subtitle">Stocks</div>
                  <div class="col-subtitle mt-4">Total</div>
                </div>

                <div class="table">
                  <div class="table-block-title">Total Premium</div>
                  <div class="inner-table justify-center">
                    <div class="table-col">
                      <div class="table-title">Original Currency</div>
                      <div class="input-row mt-4">
                        <div class="inner-col">
                          <div class="table-input blue-input">
                            {{
                              formatCurrency(
                                this.resultspremium.damage.toFixed(2)
                              )
                            }}
                          </div>

                          <div class="table-input blue-input">
                            {{
                              formatCurrency(this.resultspremium.bi.toFixed(2))
                            }}
                          </div>

                          <div class="table-input blue-input">
                            {{
                              formatCurrency(
                                this.resultspremium.stocks.toFixed(2)
                              )
                            }}
                          </div>

                          <div class="table-input mt-4">
                            {{
                              formatCurrency(
                                this.resultspremium.total.toFixed(2)
                              )
                            }}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="table-col">
                      <div class="table-title">USD</div>
                      <div class="input-row mt-4">
                        <div class="inner-col">
                          <div class="table-input blue-input">
                            {{
                              formatCurrency(
                                this.resultspremiumUSD.damage.toFixed(2)
                              )
                            }}
                          </div>

                          <div class="table-input blue-input">
                            {{
                              formatCurrency(
                                this.resultspremiumUSD.bi.toFixed(2)
                              )
                            }}
                          </div>

                          <div class="table-input blue-input">
                            {{
                              formatCurrency(
                                this.resultspremiumUSD.stocks.toFixed(2)
                              )
                            }}
                          </div>

                          <div class="table-input mt-4">
                            {{
                              formatCurrency(
                                this.resultspremiumUSD.total.toFixed(2)
                              )
                            }}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="table">
                  <div class="table-block-title">Premium SLU</div>
                  <div class="inner-table justify-center">
                    <div class="table-col">
                      <div class="table-title">Original Currency</div>
                      <div class="input-row mt-4">
                        <div class="inner-col">
                          <div class="table-input blue-input">
                            {{
                              formatCurrency(this.resultsSLU.damage.toFixed(2))
                            }}
                          </div>

                          <div class="table-input blue-input">
                            {{ formatCurrency(this.resultsSLU.bi.toFixed(2)) }}
                          </div>

                          <div class="table-input blue-input">
                            {{
                              formatCurrency(this.resultsSLU.stocks.toFixed(2))
                            }}
                          </div>

                          <div class="table-input mt-4">
                            {{ this.resultsSLU.total }}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="table-col">
                      <div class="table-title">USD</div>
                      <div class="input-row mt-4">
                        <div class="inner-col">
                          <div class="table-input blue-input">
                            {{
                              formatCurrency(
                                this.resultsSLUUSD.damage.toFixed(2)
                              )
                            }}
                          </div>

                          <div class="table-input blue-input">
                            {{
                              formatCurrency(this.resultsSLUUSD.bi.toFixed(2))
                            }}
                          </div>

                          <div class="table-input blue-input">
                            {{
                              formatCurrency(
                                this.resultsSLUUSD.stocks.toFixed(2)
                              )
                            }}
                          </div>

                          <div class="table-input mt-4">
                            {{ this.resultsSLUUSD.total }}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="table">
                  <div class="table-block-title">Net premium</div>
                  <div class="inner-table justify-center">
                    <div class="table-col">
                      <div class="table-title">Original Currency</div>
                      <div class="input-row mt-4">
                        <div class="inner-col">
                          <div class="table-input blue-input">
                            {{
                              formatCurrency(this.resultsNet.damage.toFixed(2))
                            }}
                          </div>

                          <div class="table-input blue-input">
                            {{ formatCurrency(this.resultsNet.bi.toFixed(2)) }}
                          </div>

                          <div class="table-input blue-input">
                            {{
                              formatCurrency(this.resultsNet.stocks.toFixed(2))
                            }}
                          </div>

                          <div class="table-input mt-4">
                            {{ this.resultsNet.total }}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="table-col">
                      <div class="table-title">USD</div>
                      <div class="input-row mt-4">
                        <div class="inner-col">
                          <div class="table-input blue-input">
                            {{
                              formatCurrency(
                                this.resultsNetUSD.damage.toFixed(2)
                              )
                            }}
                          </div>

                          <div class="table-input blue-input">
                            {{
                              formatCurrency(this.resultsNetUSD.bi.toFixed(2))
                            }}
                          </div>

                          <div class="table-input blue-input">
                            {{
                              formatCurrency(
                                this.resultsNetUSD.stocks.toFixed(2)
                              )
                            }}
                          </div>

                          <div class="table-input mt-4">
                            {{ this.resultsNetUSD.total }}
                          </div>
                        </div>
                      </div>
                    </div>
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
/* services */
import { getFiles } from "../../services/mock-files.service";
import PaymentService from "@/modules/home/services/payments.service";
import { formatCurrency } from "../../utils";
import {
  netPremiumInclusionRisk,
  netPremiumInclusionRiskAutoCalcs,
} from "../class/netPremiumInclusionRisk";
//Clases
import { ChangeofPeriodAutoCalcs } from "../models/ChangeOfPeriod";
import EndorsementService from "../../services/endorsement.service";
import AccountCompleteService from "@/modules/home/services/account-complete.service";
import EndorsementDocuments from "../../components/EndorsementDocuments.vue";
import TransactionsService from '@/application/services/transactions.service'


export default {
  name: "PmdAdjustment",
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
    showInfoEndorsement: { type: Boolean },
    backToCreateEndorsement: {
      type: Function,
    },
  },
  data() {
    return {
      endorsementDateError: false,
      loadingDocument: false,
      expiryDatetoCalc: this.accountComplete.deductibles.expiryDate,
      expiryDateReal: new Date(this.accountComplete.deductibles.expiryDate)
        .toISOString()
        .substr(0, 10),
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
      resultsNet: {
        damage: 0.0,
        bi: 0.0,
        stocks: 0.0,
        total: 0.0,
      },
      resultsNetUSD: {
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
      rateStock: this.accountComplete.tiv.premium.stockRate,
      stockInputValue: this.accountComplete.tiv.insurable.stock,
      stockInputValueUsd: this.accountComplete.tiv.insurable.stockUsd,
      PmdStock: this.accountComplete.tiv.insurable.porcentaje,
      stockPercentagePMD: 0,
      stockPercentagePMDUSD: 0,
      exchangeRate: this.accountComplete.deductibles.exchangeRate,
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
      premiumPaymentDate: new Date().toISOString().substr(0, 10),
      lastAccountInformacion: {},
      buttonTitle: 'Next',
      buttonTitleBack: 'Cancel',
    };
  },
  async beforeMount() {
    this.el = 1;
    this.files = await getFiles();
    this.clauseList = await PaymentService.getClauses();
    this.stockPercentagePMD = this.stockInputValue * (this.PmdStock / 100);
    this.stockPercentagePMDUSD = this.stockPercentagePMD / this.exchangeRate;
  },
  mounted() {
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
    formatCurrency(amount) {
      return formatCurrency(amount);
    },
    onChangeStockResult(event) {
      console.log(event);
      this.resultspremiumUSD.stocks = event / this.exchangeRate;

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
    async endorsementDateValidation(event, incomingDate) {
      if (Date.parse(incomingDate) >= Date.parse(this.expiryDate)) {
        this.endorsementDateError = true;
      } else {
        await this.changeDateEndorsement(incomingDate);
        this.endorsementDateError = false;
      }
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
      let transactionId;

      try {
        this.e1 = 1;

        transactionId = (await TransactionsService.startTransaction()).transactionId;

        const accountCompleteResponse = await AccountCompleteService.addAccountComplete(this.subscriptionId, {
          ...this.accountComplete,
          deductibles: this.accountComplete.deductibles,
          tiv: this.accountComplete.tiv,
          netPremium: this.accountComplete.net_premium,
          additionalInfo: this.accountComplete.additional_info,
          technicalConditions: this.accountComplete.technical_conditions,
          cartera: {
            ...this.accountComplete.cartera,
            ...this.cartera,
          },
        }, { transactionId });

        await EndorsementService.addEndorsment({
          subscriptionId: this.subscriptionId,
          endorsmentType: 13,
          idUser: this.$store.state.auth.user.id,
          accountId: accountCompleteResponse.id,
          effectiveDate: this.effectiveDate,
          report: {
            endorsmentReporData:{
              ...this.endorsmentReporData,
              additionalInfo:this.accountComplete.additional_info,
            },
            cartera: {
              ...this.accountComplete.cartera,
              ...this.cartera,
            },
          },
          files: this.endorsementDocuments,
          options: { transactionId }
        });

        const existTransaction = (await TransactionsService.existTransaction(transactionId)).exist;
        if (existTransaction) {
            await TransactionsService.commitTransaction(transactionId)
        }

        await this.backToCreateEndorsement()
        
      } catch (error) {
        const existTransaction = (await TransactionsService.existTransaction(transactionId)).exist;
        if (existTransaction) {
            await TransactionsService.rollbackTransaction(transactionId)
        }
        const message =  String(error)
        throw new Error(message)
      }


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
        this.buttonTitle = 'Next';
        this.buttonTitleBack = 'Cancel';
        this.accountComplete = this.tempAccountComplete;
      }

      if (this.e1 === 2) {
        this.buttonTitle = 'Next';
        this.buttonTitleBack = 'Return';
        const premium = this.accountComplete.tiv.premium;
        const deductibles = this.accountComplete.deductibles;
        const sluline = this.accountComplete.tiv.boundInsurableProp.sluLine;

        const damage = this.accountComplete.tiv.premium.propertyDamage;
        const bi = this.accountComplete.tiv.premium.businessInterruption;
        const stocks = this.accountComplete.tiv.premium.stock;

        const damageUsd = this.accountComplete.tiv.premium.propertyDamageUsd;
        const biUsd = this.accountComplete.tiv.premium.businessInterruptionUsd;
        const stocksUsd = this.accountComplete.tiv.premium.stockUsd;

        console.log(
          "propertyDamageOriginalTIV",
          this.accountComplete.tiv.insurable.propertyDamage
        );

        const tivModificado = {
          propertyDamageMovement:
            this.accountComplete.tiv.insurable.propertyDamage,
          businessInterruptionMovement:
            this.accountComplete.tiv.insurable.businessInterruption,
          stockMovement: this.accountComplete.tiv.insurable.stock,

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
          effetiveDate: new Date(this.accountComplete.deductibles.inceptionDate)
            .toISOString()
            .substring(0, 10),
          expiryDate: new Date(this.accountComplete.deductibles.expiryDate)
            .toISOString()
            .substring(0, 10),
          endormenteffetiveDate: new Date(this.effectiveDate),
          movementEndDate: new Date(this.expiryDateReal),
        };

        const options = {
          isEdited: {
            premiumDamage: false,
            premiumBi: false,
            premiumStocks: true,
          },
          dataEdited: {
            // totalPremium
            premiumStocks: this.tivStockReceivable,
          },
        };

        const totalPremium = new netPremiumInclusionRisk(
          tivModificado,
          this.accountComplete.deductibles,
          this.accountComplete.tiv?.boundInsurableProp.sluLine,
          false,
          dates,
          options
        );

        const totalPremiumUSD = new netPremiumInclusionRisk(
          tivModificado,
          this.accountComplete.deductibles,
          this.accountComplete.tiv?.boundInsurableProp.sluLine,
          true,
          dates,
          options
        );

        const resultTotalPremium = totalPremium.totalPremium();

        ///nueva forma de caculcar el net-premium origina currency
        const results = await ChangeofPeriodAutoCalcs(
          premium,
          deductibles,
          sluline,
          false,
          {
            effetiveDate: this.effectiveDate,
            expiryDate: this.expiryDate,
            endormenteffetiveDate: this.effectiveDate,
            movementEndDate: this.movementEndDate,
          }
        );

        /**para total SLU */
        this.resultsSLU.damage = totalPremium.damagePremiumSlu();
        this.resultsSLU.bi = totalPremium.biPremiumSlu();
        this.resultsSLU.stocks = totalPremium.stocksPremiumSlu();
        this.resultsSLU.total = totalPremium.totalPremiumSlu();
        /**para premium SLU */
        this.resultspremium.damage = resultTotalPremium.damageTotalPremium;
        this.resultspremium.bi = resultTotalPremium.biTotalPremium;
        this.resultspremium.stocks = resultTotalPremium.stockTotalPremium;
        this.resultspremium.total = resultTotalPremium.total;
        /**para net premium*/
        this.resultsNet.damage = totalPremium.damageNet();
        this.resultsNet.bi = totalPremium.biNet();
        this.resultsNet.stocks = totalPremium.stocksNet();
        this.resultsNet.total = totalPremium.netTotal();
        ///nueva forma de caculcar el net-premium  en dolares
        const resultsUSD = await ChangeofPeriodAutoCalcs(
          premium,
          deductibles,
          sluline,
          true,
          {
            effetiveDate: this.effectiveDate,
            expiryDate: this.expiryDate,
            endormenteffetiveDate: this.effectiveDate,
            movementEndDate: this.movementEndDate,
          }
        );

        /**para total SLU */
        this.resultsSLUUSD.damage = totalPremiumUSD.damagePremiumSlu();
        this.resultsSLUUSD.bi = totalPremiumUSD.biPremiumSlu();
        this.resultsSLUUSD.stocks = totalPremiumUSD.stocksPremiumSlu();
        this.resultsSLUUSD.total = totalPremiumUSD.totalPremiumSlu();
        /**para premium SLU */
        this.resultspremiumUSD.damage =
          resultTotalPremium.damageTotalPremiumUsd;
        this.resultspremiumUSD.bi = resultTotalPremium.biTotalPremiumUsd;
        this.resultspremiumUSD.stocks = resultTotalPremium.stockTotalPremiumUsd;
        this.resultspremiumUSD.total = resultTotalPremium.totalUsd;
        /**para net premium*/
        this.resultsNetUSD.damage = totalPremiumUSD.damageNet();
        this.resultsNetUSD.bi = totalPremiumUSD.biNet();
        this.resultsNetUSD.stocks = totalPremiumUSD.stocksNet();
        this.resultsNetUSD.total = totalPremiumUSD.netTotal();
        //premium que sera premiom Moment

        const totalPremiumMovement = damage + bi + stocks;
        this.originalValues.lastInformation.totalPremiumMovement =
          totalPremiumMovement;

        const totalPremiumMovementDamge = damage / results.daysResult.result;
        const totalPremiumMovementBi = bi / results.daysResult.result;
        const totalPremiumMovementStocks = stocks / results.daysResult.result;
        const newTotalPremiumMovement =
          totalPremiumMovementDamge +
          totalPremiumMovementBi +
          totalPremiumMovementStocks;
        this.originalValues.newInformation.totalPremiumMovement =
          newTotalPremiumMovement;

        //premum SLU
        this.originalValues.lastInformation.PremiumSlu =
          this.lastAccountInformacion.net_premium.originalValues.sluShareTotal;
        this.originalValues.newInformation.PremiumSlu =
          results.data.sluShareTotal;

        //informacion netPremium
        this.originalValues.lastInformation.netPremium =
          this.lastAccountInformacion.net_premium.originalValues.netTotal;
        this.originalValues.newInformation.netPremium = results.data.netTotal;

        //totales
        this.originalValues.lastInformation.total =
          newTotalPremiumMovement +
          this.lastAccountInformacion.net_premium.originalValues.sluShareTotal +
          this.lastAccountInformacion.net_premium.originalValues.netTotal;

        this.originalValues.newInformation.total =
          newTotalPremiumMovement +
          results.data.sluShareTotal +
          results.data.netTotal;

        //valres pasador pero ahora su valor en dolares

        //informacion pasada del  premium  que toma el lugar de totalPremiumMoment

        const totalPremiumMovementUsd = damageUsd + biUsd + stocksUsd;
        this.usdValues.lastInformation.totalPremiumMovement =
          totalPremiumMovementUsd;

        //la nueva informacion del  premium  que toma el lugar de totalPremiumMoment
        const totalPremiumMovementDamgeUsd =
          damageUsd / results.daysResult.result;
        const totalPremiumMovementBiUsd = biUsd / results.daysResult.result;
        const totalPremiumMovementStocksUsd =
          stocksUsd / results.daysResult.result;
        const newTotalPremiumMovementUsd =
          totalPremiumMovementDamgeUsd +
          totalPremiumMovementBiUsd +
          totalPremiumMovementStocksUsd;
        this.usdValues.newInformation.totalPremiumMovement =
          newTotalPremiumMovementUsd;

        //premum SLU
        /*
        this.usdValues.lastInformation.PremiumSlu =
          this.lastAccountInformacion.net_premium.usdValues.sluShareTotal;
        this.usdValues.newInformation.PremiumSlu =
          resultsUSD.data.sluShareTotal;

        //informacion netPremium
        this.usdValues.lastInformation.netPremium =
          this.lastAccountInformacion.net_premium.usdValues.netTotal;
        this.usdValues.newInformation.netPremium = resultsUSD.data.netTotal;

        //totales
        this.usdValues.lastInformation.total =
          totalPremiumMovementUsd +
          this.lastAccountInformacion.net_premium.usdValues.sluShareTotal +
          this.lastAccountInformacion.net_premium.usdValues.netTotal;

        this.usdValues.newInformation.total =
          newTotalPremiumMovementUsd +
          resultsUSD.data.sluShareTotal +
          resultsUSD.data.netTotal;
      */
        //sustitumimos los nuevos valores para generar el reporte
        this.accountComplete.net_premium.originalValues = results.data;
        this.accountComplete.net_premium.usdValues = resultsUSD.data;
        // this.accountComplete.tiv.premium = {
        //   ...this.accountComplete.tiv.premium.originalValues,
        //   propertyDamage: totalPremiumMovementDamge,
        //   businessInterruption: totalPremiumMovementBi,
        //   stock: totalPremiumMovementStocks,
        //   propertyDamageUsd: totalPremiumMovementDamgeUsd,
        //   businessInterruptionUsd: totalPremiumMovementBiUsd,
        //   stockUsd: totalPremiumMovementStocksUsd,
        // };
        this.cartera = {
          ...this.accountComplete.cartera,
          premiumPaymentDate: this.premiumPaymentDate,
          clause: this.clause,
        };

        this.accountComplete.deductibles = {
          ...this.accountComplete.deductibles,
          //TODO:estandarizar el guardado de las fechas
          expiryDate: this.movementEndDate,
          inceptionDate: this.effectiveDate,
        };

        this.endorsmentReporData = {
          boundInsurableProp: {
            ...this.accountComplete.tiv.boundInsurableProp,
          },
          deductibles: {
            ...this.accountComplete.deductibles,
          },
          netPremium: {
            ...results.data,
          },
          netPremiumUSD: {
            ...resultsUSD.data,
          },
          premium: {
            businessInterruption: this.resultspremium.bi,
            businessInterruptionRate: 0,
            businessInterruptionUsd: this.resultspremiumUSD.bi,
            propertyDamage: this.resultspremium.damage,
            propertyDamageRate: 0,
            propertyDamageUsd: this.resultspremiumUSD.damage,
            stock: this.resultspremium.stocks,
            stockRate: 0,
            stockUsd: this.resultspremiumUSD.stocks,
            totalInsured: this.resultspremium.total,
            totalUsd: this.resultspremiumUSD.total,
          },
          totalValues: {
            ...this.accountComplete.tiv.insurable,
          },
          cartera: {
            ...this.accountComplete.cartera,
            ...this.cartera,
          },
          // admintedPremium:45646464654545466,
          // this.resultsSLU.damage
          // this.resultsSLU.bi
          // this.resultsSLU.stocks
          // this.resultsSLU.total
          //
          //
          //
          //
          // this.resultsSLUUSD.damage
          // this.resultsSLUUSD.bi
          // this.resultsSLUUSD.stocks
          // this.resultsSLUUSD.total
          //
          //
          //
          //
          movementValues: {
            bi: 0,
            biUsd: 0,
            damage: 0,
            damageUsd: 0,
            stocks: 0,
            stocksUsd: 0,
            total: 0,
            totalUsd: 0,
          },
        };
      }

      if (this.e1 === 3) {
        this.buttonTitle = 'Finalize'
        this.buttonTitleBack = 'Return';
        this.loadingDocument = true;
        const premium = this.accountComplete.tiv.premium;
        const deductibles = this.accountComplete.deductibles;
        const sluline = this.accountComplete.tiv.boundInsurableProp.sluLine;
        ///nueva forma de caculcar el net-premium origina currency
        const results = await ChangeofPeriodAutoCalcs(
          premium,
          deductibles,
          sluline,
          false,
          {
            effetiveDate: this.effectiveDate,
            expiryDate: this.expiryDate,
            endormenteffetiveDate: this.effectiveDate,
            movementEndDate: this.movementEndDate,
          }
        );
        ///nueva forma de caculcar el net-premium  en dolares
        const resultsUSD = await ChangeofPeriodAutoCalcs(
          premium,
          deductibles,
          sluline,
          true,
          {
            effetiveDate: this.effectiveDate,
            expiryDate: this.expiryDate,
            endormenteffetiveDate: this.effectiveDate,
            movementEndDate: this.movementEndDate,
          }
        );

        this.endorsmentReporData = {
          cartera: {
            ...this.accountComplete.cartera,
            premiumPaymentDate: this.premiumPaymentDate,
            clausula: this.clause,
          },
          boundInsurableProp: {
            ...this.accountComplete.tiv.boundInsurableProp,
          },
          deductibles: {
            ...this.accountComplete.deductibles,
          },
          netPremium: {
            ...results.data,
          },
          netPremiumUSD: {
            ...resultsUSD.data,
          },
          premium: {
            businessInterruption: this.resultspremium.bi,
            businessInterruptionRate:
              this.accountComplete.tiv.premium.businessInterruptionRate,
            businessInterruptionUsd: this.resultspremiumUSD.bi,
            propertyDamage: this.resultspremium.damage,
            propertyDamageRate:
              this.accountComplete.tiv.premium.propertyDamageRate,
            propertyDamageUsd: this.resultspremiumUSD.damage,
            stock: this.resultspremium.stocks,
            stockRate: this.accountComplete.tiv.premium.stockRate,
            stockUsd: this.resultspremiumUSD.stocks,
            totalInsured: this.resultspremium.total,
            totalUsd: this.resultspremiumUSD.total,
          },
          totalValues: {
            bi: this.accountComplete.tiv.insurable.businessInterruption,
            biUsd: this.accountComplete.tiv.insurable.businessInterruptionUsd,
            damage: this.accountComplete.tiv.insurable.propertyDamage,
            damageUsd: this.accountComplete.tiv.insurable.propertyDamageUsd,
            stocks: this.accountComplete.tiv.insurable.stock,
            stocksUsd: this.accountComplete.tiv.insurable.stockUsd,
            total: this.accountComplete.tiv.insurable.total,
            totalUsd: this.accountComplete.tiv.insurable.totalUsd,
          },

          movementValues: {
            bi: 0,
            biUsd: 0,
            damage: 0,
            damageUsd: 0,
            stocks: 0,
            stocksUsd: 0,
            total: 0,
            totalUsd: 0,
          },
        };
        // Invoca el  servicio para generar el excel
        const fileLink = await EndorsementService.getEndorsmentReport({
          subscriptionId: this.subscriptionId,
          endorsmentType: 13,
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
        this.loadingDocument = false;
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
  gap: 20px;
  .title-col {
    width: 10%;
  }
}
.table {
  width: 26.6%;
}
.table-block-title {
  font-weight: 800;
  font-size: 24px;
  line-height: 110%;
  text-align: center;
  padding-bottom: 25px;
}
.inner-table {
  display: flex;
  flex-wrap: wrap;
  align-content: center;
  align-items: flex-end;
  justify-content: flex-start;
}
.table-col {
  width: 50%;
  .inner-col {
    width: 100%;
  }
}
.table-main-title {
  height: 50px;
  color: white;
  font-weight: 800;
  background-color: #547fa9;
  border-radius: 6px;
  margin: 2px;
  font-size: 18px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
.table-title {
  height: 50px;
  color: white;
  font-weight: 800;
  background-color: #547fa9;
  border-radius: 6px;
  margin: 2px;
  font-size: 14px;
  padding: 0 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
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
  width: 60%;
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
