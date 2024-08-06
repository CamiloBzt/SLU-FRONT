<template>
  <v-expansion-panels class="SubExpansionComponent">
    <v-expansion-panel>
      <v-expansion-panel-header @click="changeSubExpansion" class="ExpansionTitle d-flex justify-start" expand-icon="">
        <template v-slot:actions>
          <div class="subIconCont d-flex justify-start align-center">
            <v-icon class="iconExpand mr-1">
              {{ iconSubExpansion }}
            </v-icon>
            <div class="SubExpansionTitle">
              Increase insurable value / Inclusion risk
            </div>
          </div>
        </template>
      </v-expansion-panel-header>

      <v-expansion-panel-content>
        <div class="ExpandContent justify-center align-center">
          <!--Inputs-->
          <div class="InputsCont d-flex justify-start flex-wrap">
            <div class="InputCont">
              <v-menu v-model="menu" :close-on-content-click="false" :nudge-right="40" transition="scale-transition"
                offset-y min-width="auto">
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field v-model="
                    inclusionRisk.effective_date_movement
                  " label="Effective Date Movement" v-bind="attrs" v-on="on" />
                </template>
                <v-date-picker v-model="
                  inclusionRisk.effective_date_movement
                " @input="menu = false" :max="inclusionRisk.movement_end_date" />
              </v-menu>
            </div>
            <div class="InputCont">
              <v-menu v-model="menu2" :close-on-content-click="false" :nudge-right="40" transition="scale-transition"
                offset-y min-width="auto">
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field v-model="inclusionRisk.movement_end_date" label="Movement End Date" v-bind="attrs"
                    v-on="on" />
                </template>
                <v-date-picker v-model="inclusionRisk.movement_end_date" @input="menu2 = false" />
              </v-menu>
            </div>
          </div>

          <!--Movevement Value-->
          <h6 class="TitleInputs">Movement Value</h6>
          <div class="InputsCont d-flex justify-start flex-wrap">
            <div class="InputCont">
              <currency-input label="Damage" v-model.trim="inclusionRisk.movement_damage"
                @blur="checkField('movement_damage', inclusionRisk.movement_damage)" :options="currencyOptions" />
            </div>
            <div class="InputCont">
              <currency-input label="ALOP" v-model.trim="inclusionRisk.movement_alop"
                @blur="checkField('movement_alop', inclusionRisk.movement_alop)" :options="currencyOptions" />
            </div>
            <div class="InputCont">
              <currency-input label="Stocks" v-model.trim="inclusionRisk.movement_stocks"
                @blur="checkField('movement_stocks', inclusionRisk.movement_stocks)" :options="currencyOptions" />
            </div>
          </div>

          <!--Total Values-->
          <h6 class="TitleInputs">Total Values</h6>
          <div class="InputsCont d-flex justify-start flex-wrap">
            <div class="InputCont">
              <currency-input label="Damage" v-model.trim="totalDamage" :options="currencyOptions" disabled />
            </div>
            <div class="InputCont">
              <currency-input label="ALOP" v-model.trim="totalAlop" :options="currencyOptions" disabled />
            </div>
            <div class="InputCont">
              <currency-input label="Stocks" v-model.trim="totalStock" :options="currencyOptions" disabled />
            </div>
            <div class="InputCont"></div>
          </div>

          <h6 class="TitleInputs mt-7">
            Increase insurable value / Inclusion risk Chart
          </h6>

          <!--PRIMER TABLA-->
          <div class="
              TableGeneralStyle
              d-flex
              flex-wrap
              align-start
              justify-center
            ">
            <div class="Head d-flex justify-space-between align-center">
              <div class="Label" />
              <div class="Row Bold">TIV Movement</div>
              <div class="Row Bold">TIV Total</div>
              <div class="MiniRow Bold">Rate</div>
              <div class="Row Bold">Total Premium</div>
            </div>
            <!-- Valores Damage-->
            <div class="Line mt-3">
              <div class="Label">Damage</div>
              <div class="Row">
                <currency-input v-model.trim="damageTivMovement" :options="currencyOptions" disabled />
              </div>
              <div class="Row">
                <currency-input v-model.trim="damageTiv" :options="currencyOptions" disabled />
              </div>
              <div class="MiniRow">
                <v-text-field v-model="damageRate" disabled placeholder="-" />
              </div>
              <div class="Row">
                <currency-input v-model.trim="damagePremium" :options="currencyOptions" disabled />
              </div>
            </div>

            <!--Valores de  Bi-->
            <div class="Line mt-2">
              <div class="Label">Alop</div>
              <div class="Row">
                <currency-input v-model.trim="alopTivMovement" :options="currencyOptions" disabled />
              </div>
              <div class="Row">
                <currency-input v-model.trim="alopTiv" :options="currencyOptions" disabled />
              </div>
              <div class="MiniRow">
                <v-text-field v-model="alopRate" disabled placeholder="-" />
              </div>
              <div class="Row">
                <currency-input v-model.trim="alopPremium" :options="currencyOptions" disabled />
              </div>
            </div>

            <!--Valores de Stocks-->
            <div class="Line mt-2">
              <div class="Label">Stocks</div>
              <div class="Row">
                <currency-input v-model.trim="stockTivMovement" :options="currencyOptions" disabled />
              </div>
              <div class="Row">
                <currency-input v-model.trim="stockTiv" :options="currencyOptions" disabled />
              </div>
              <div class="MiniRow">
                <v-text-field v-model="stockRate" disabled placeholder="-" />
              </div>
              <div class="Row">
                <currency-input v-model.trim="stockPremium" :options="currencyOptions" disabled />
              </div>
            </div>

            <!--Total-->
            <div class="TotalLine mt-3">
              <div class="Label Bold">Total</div>
              <div class="Row Bold">{{ formatter.format(tivMovementTotal) }}</div>
              <div class="Row Bold">{{ formatter.format(tivTotal) }}</div>
              <div class="MiniRow Bold">{{ rateTotal }}</div>
              <div class="Row Bold">{{ formatter.format(premiumTotal) }}</div>
            </div>
          </div>

          <!--SEGUNDA TABLA-->
          <div class="
              TableGeneralStyle
              d-flex
              flex-wrap
              align-start
              justify-center
              mt-12
              Table3
            ">
            <div class="Head d-flex justify-space-between align-center">
              <div class="Label" />
              <div class="Row Bold">Premium SLU</div>
              <div class="Row Bold">Brokerage</div>
              <div class="Row Bold">Tax</div>
              <div class="Row Bold">Fronting</div>
            </div>
            <!-- Valores Damage-->
            <div class="Line mt-3">
              <div class="Label">Damage</div>
              <div class="Row">
                <currency-input v-model.trim="damagePremiumSlu" :options="currencyOptions" disabled />
              </div>
              <div class="Row">
                <currency-input v-model.trim="damageBrokerage" :options="currencyOptions" disabled />
              </div>
              <div class="Row">
                <currency-input v-model.trim="damageTaxes" :options="currencyOptions" disabled />
              </div>
              <div class="Row">
                <currency-input v-model.trim="damageFrontingFee" :options="currencyOptions" disabled />
              </div>
            </div>

            <!--Valores de  Bi-->
            <div class="Line mt-2">
              <div class="Label">Alop</div>
              <div class="Row">
                <currency-input v-model.trim="alopPremiumSlu" :options="currencyOptions" disabled />
              </div>
              <div class="Row">
                <currency-input v-model.trim="alopBrokerage" :options="currencyOptions" disabled />
              </div>
              <div class="Row">
                <currency-input v-model.trim="alopTaxes" :options="currencyOptions" disabled />
              </div>
              <div class="Row">
                <currency-input v-model.trim="alopFrontingFee" :options="currencyOptions" disabled />
              </div>
            </div>

            <!--Valores de Stocks-->
            <div class="Line mt-2">
              <div class="Label">Stocks</div>
              <div class="Row">
                <currency-input v-model.trim="stockPremiumSlu" :options="currencyOptions" disabled />
              </div>
              <div class="Row">
                <currency-input v-model.trim="stockBrokerage" :options="currencyOptions" disabled />
              </div>
              <div class="Row">
                <currency-input v-model.trim="stockTaxes" :options="currencyOptions" disabled />
              </div>
              <div class="Row">
                <currency-input v-model.trim="stockFrontingFee" :options="currencyOptions" disabled />
              </div>
            </div>

            <!--Total-->
            <div class="TotalLine mt-3">
              <div class="Label Bold">Total</div>
              <div class="Row Bold">{{ formatter.format(premiumSluTotal) }}</div>
              <div class="Row Bold">{{ formatter.format(brokerageTotal) }}</div>
              <div class="Row Bold">{{ formatter.format(taxesTotal) }}</div>
              <div class="Row Bold">{{ formatter.format(frontingFeeTotal) }}</div>
            </div>
          </div>

          <!--TERCER TABLA-->
          <div class="
              TableGeneralStyle
              Table3
              d-flex
              flex-wrap
              align-start
              justify-center
              mt-12
            ">
            <div class="Head d-flex justify-space-between align-center">
              <div class="Label" />
              <div class="Row Bold text-center">Engineering Fees</div>
              <div class="Row Bold text-center">Reserve</div>
              <div class="Row Bold text-center">
                Net to SLU Excluding<br />
                Survey Fees
              </div>
              <div class="Row Bold text-center">
                Prima Neta<br />
                Without Reserve
              </div>
            </div>
            <!-- Valores Damage-->
            <div class="Line mt-3">
              <div class="Label">Damage</div>
              <div class="Row">
                <currency-input v-model.trim="damageEngFee" :options="currencyOptions" disabled />
              </div>
              <div class="Row">
                <currency-input v-model.trim="damageReserve" :options="currencyOptions" disabled />
              </div>
              <div class="Row">
                <currency-input v-model.trim="damageNet" :options="currencyOptions" disabled />
              </div>
              <div class="Row">
                <currency-input v-model.trim="damageNetPremium" :options="currencyOptions" disabled />
              </div>
            </div>

            <!--Valores de  Bi-->
            <div class="Line mt-2">
              <div class="Label">Alop</div>
              <div class="Row">
                <currency-input v-model.trim="alopEngFee" :options="currencyOptions" disabled />
              </div>
              <div class="Row">
                <currency-input v-model.trim="alopReserve" :options="currencyOptions" disabled />
              </div>
              <div class="Row">
                <currency-input v-model.trim="alopNet" :options="currencyOptions" disabled />
              </div>
              <div class="Row">
                <currency-input v-model.trim="alopNetPremium" :options="currencyOptions" disabled />
              </div>
            </div>

            <!--Valores de Stock-->
            <div class="Line mt-2">
              <div class="Label">Stocks</div>
              <div class="Row">
                <currency-input v-model.trim="stockEngFee" :options="currencyOptions" disabled />
              </div>
              <div class="Row">
                <currency-input v-model.trim="stockReserve" :options="currencyOptions" disabled />
              </div>
              <div class="Row">
                <currency-input v-model.trim="stockNet" :options="currencyOptions" disabled />
              </div>
              <div class="Row">
                <currency-input v-model.trim="stockNetPremium" :options="currencyOptions" disabled />
              </div>
            </div>

            <!--Total-->
            <div class="TotalLine mt-3">
              <div class="Label Bold">Total</div>
              <div class="Row Bold">{{ formatter.format(engFeeTotal) }}</div>
              <div class="Row Bold">{{ formatter.format(reserveTotal) }}</div>
              <div class="Row Bold">{{ formatter.format(netTotal) }}</div>
              <div class="Row Bold">{{ formatter.format(netPremiumTotal) }}</div>
            </div>
          </div>

          <!--
            Documents
            <FilesSubmission />
            Email
            <EmailRichEditor />
          -->
        </div>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>
<script>
/* mixins */
import { stateExpansiveManager } from '@/mixins/subscription.js';
/* components */
import FilesSubmission from '@/components/subscription/submission/FilesSubmission';
import EmailRichEditor from '@/components/Email/EmailRichEditor';
import CurrencyInput from "@/components/CurrencyInput/CurrencyInput.vue";
/* validations */
import { validationMixin } from 'vuelidate';
import { formValidations } from '@/mixins/formValidations';
/* libs & helpers */
import Decimal from 'decimal.js';
import numeral from 'numeral';
/* lodash */
import { debounce } from 'lodash';
/* services */
import { getInclusionRisk, saveInclusionRisk } from './services/inclusion-risk.service'
import { getTotalInsurableValue } from './services/endorsement.service'
/* utils */
import { simpleDateFormat } from '@/lib/utils'

export default {
  name: 'InclusionRisk',
  mixins: [stateExpansiveManager, formValidations, validationMixin],
  data () {
    return {
      menu: false,
      menu2: false,
      menu3: false,

      model1: '',
      model2: '',
      model3: '',

      insured: {},
      quotation: {},
      inclusionRisk: {
        movement_end_date: new Date().toISOString?.().split?.('T')?.[0],
        effective_date_movement: new Date().toISOString?.().split?.('T')?.[0],
      },

      subscriptionId: false,

      formatter: new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }),
      currencyOptions: {
        currency: 'MXN',
        currencyDisplay: 'narrowSymbol',
        locale: 'en-US',
      },
    };
  },
  props: {
    movementId: {
      type: [String, Number],
    },
  },
  inject: {
    injectedPolicy: {
      from: 'policy'
    },
    injectedTotalInsurableValue: {
      from: 'totalInsurableValue'
    },
  },
  components: {
    FilesSubmission,
    EmailRichEditor,
    CurrencyInput
  },
  async mounted () {
    this.subscriptionId = this.$route.params?.subscriptionId
    if (this.subscriptionId) {
      const [data, insured] = await Promise.all([getInclusionRisk(this.movementId), getTotalInsurableValue(this.subscriptionId)])
      this.insured = insured?.quotationInsured
      this.quotation = data?.Quotation
      this.inclusionRisk = data?.EndorsementsIncreaseInsurableValue
      if (!this.inclusionRisk?.effective_date_movement) {
        this.inclusionRisk.effective_date_movement = this.quotation?.inception_date?.split?.('T')?.[0] || 0
      } else {
        this.inclusionRisk.effective_date_movement = this.inclusionRisk?.effective_date_movement?.split?.('T')?.[0] || 0
      }
      if (!this.inclusionRisk?.movement_end_date) {
        this.inclusionRisk.movement_end_date = this.quotation?.expiry_date?.split?.('T')?.[0] || 0
      } else {
        this.inclusionRisk.movement_end_date = this.inclusionRisk?.movement_end_date?.split?.('T')?.[0] || 0
      }
      // this.inclusionRisk.effective_date_movement = new Date(1621487155000).toISOString()
      // this.inclusionRisk.movement_end_date = new Date(1646888755000).toISOString()
    }
  },
  computed: {
    totalDamage: {
      get () {
        const op = Decimal.sum(
          this.inclusionRisk?.movement_damage || 0,
          this.insured?.propertyDamage || 0
        );

        return op;
      }, set () { }
    },
    totalAlop: {
      get () {
        const op = Decimal.sum(
          this.inclusionRisk?.movement_alop || 0,
          this.insured?.businessInterruption || 0,
        );

        return op;
      }, set () { }
    },
    totalStock: {
      get () {
        const op = Decimal.sum(
          this.inclusionRisk?.movement_stocks || 0,
          this.insured?.stock || 0
        );

        return op;
      }, set () { }
    },
    damageTivMovement: {
      get () {
        const op = Decimal(this.inclusionRisk?.movement_damage || 0);
        return op;
      }, set () { }
    },
    damageTiv: {
      get () {
        const op = Decimal(this.totalDamage || 0);
        return op;
      }, set () { }
    },
    damageRate: {
      get () {
        const op = Decimal(this.insured?.rate || 0);
        return op;
      }, set () { }
    },
    damagePremium: {
      get () {
        const percentage = Decimal(this.damageRate || 0);
        const op = Decimal.mul(percentage, this.damageTivMovement || 0).div(1000);

        const effectiveDate = new Date(
          this.quotation?.inception_date || 0
        );
        const endDate = new Date(this.quotation?.expiry_date || 0);

        const effectiveDateIncrease = new Date(
          this.inclusionRisk?.effective_date_movement || 0
        );
        const endDateIncrease = new Date(
          this.inclusionRisk?.movement_end_date || 0
        );

        const dateSubs1 =
          (endDate.getTime() - effectiveDate.getTime()) / (1000 * 60 * 60 * 24);
        const dateSubs2 =
          (endDateIncrease.getTime() - effectiveDateIncrease.getTime()) /
          (1000 * 60 * 60 * 24);

        const div = Decimal.div(op, dateSubs1);
        const result = Decimal.mul(div, dateSubs2);

        return result;
      }, set () { }
    },
    damagePremiumSlu: {
      get () {
        const percentage = Decimal.div(this.injectedPolicy?.slu_share || 0, 100);
        const op = Decimal.mul(this.damagePremium || 0, percentage);
        return op;
      }, set () { }
    },
    damageBrokerage: {
      get () {
        const percentage = Decimal.div(this.quotation?.brokerage || 0, 100);
        const op = Decimal.mul(this.damagePremiumSlu || 0, percentage);
        return op;
      }, set () { }
    },
    damageTaxes: {
      get () {
        const percentage = Decimal.div(this.quotation?.taxes || 0, 100);
        const op = Decimal.mul(this.damagePremiumSlu || 0, percentage);
        return op;
      }, set () { }
    },
    damageFrontingFee: {
      get () {
        const percentage = Decimal.div(this.quotation?.fronting || 0, 100); // it can be raplced with .2
        const op = Decimal(this.damagePremiumSlu || 0)
          .sub(this.damageBrokerage || 0)
          .sub(this.damageTaxes || 0)
          .sub(this.damageEngFee || 0);

        const mul = Decimal.mul(op, percentage);
        return mul;
      }, set () { }
    },
    damageEngFee: {
      get () {
        const percentage = Decimal.div(this.quotation?.eng || 0, 100);
        const op = Decimal.mul(this.damagePremiumSlu || 0, percentage);
        return op;
      }, set () { }
    },
    damageReserve: {
      get () {
        const percentage = 0;
        const op = Decimal.mul(this.damagePremiumSlu || 0, percentage);
        return op;
      }, set () { }
    },
    damageNet: {
      get () {
        const op = Decimal(this.damagePremiumSlu || 0)
          .sub(this.damageBrokerage || 0)
          .sub(this.damageTaxes || 0)

        const result =
          this.quotation?.deduction_type === 'At inception'
            ? op.minus(this.damageEngFee || 0)
            : op;

        return result;
      }, set () { }
    },
    damageNetPremium: {
      get () {
        const op = Decimal(this.damagePremiumSlu || 0)
          .sub(this.damageBrokerage || 0)
          .sub(this.damageTaxes || 0)

        const result =
          this.quotation?.deduction_type === 'At inception'
            ? op.minus(this.damageEngFee || 0)
            : op;

        return result;
      }, set () { }
    },
    alopTivMovement: {
      get () {
        const op = Decimal(this.inclusionRisk?.movement_alop || 0);
        return op;
      }, set () { }
    },
    alopTiv: {
      get () {
        const op = Decimal(this.totalAlop);
        return op;
      }, set () { }
    },
    alopRate: {
      get () {
        const op = Decimal(this.insured?.rate || 0);
        return op;
      }, set () { }
    },
    alopPremium: {
      get () {
        const percentage = Decimal(this.alopRate || 0);
        const op = Decimal.mul(percentage, this.alopTivMovement || 0).div(1000);

        const effectiveDate = new Date(
          this.quotation?.inception_date || 0
        );
        const endDate = new Date(this.quotation?.expiry_date || 0);

        const effectiveDateIncrease = new Date(
          this.inclusionRisk?.effective_date_movement || 0
        );
        const endDateIncrease = new Date(
          this.inclusionRisk?.movement_end_date || 0
        );

        const dateSubs1 =
          (endDate.getTime() - effectiveDate.getTime()) / (1000 * 60 * 60 * 24);
        const dateSubs2 =
          (endDateIncrease.getTime() - effectiveDateIncrease.getTime()) /
          (1000 * 60 * 60 * 24);

        const div = Decimal.div(op, dateSubs1);
        const result = Decimal.mul(div, dateSubs2);

        return result;
      }, set () { }
    },
    alopPremiumSlu: {
      get () {
        const percentage = Decimal.div(this.injectedPolicy?.slu_share || 0, 100);
        const op = Decimal.mul(this.alopPremium || 0, percentage);
        return op;
      }, set () { }
    },
    alopBrokerage: {
      get () {
        const percentage = Decimal.div(this.quotation?.brokerage || 0, 100);
        const op = Decimal.mul(this.alopPremiumSlu || 0, percentage);
        return op;
      }, set () { }
    },
    alopTaxes: {
      get () {
        const percentage = Decimal.div(this.quotation?.taxes || 0, 100);
        const op = Decimal.mul(this.alopPremiumSlu || 0, percentage);
        return op;
      }, set () { }
    },
    alopFrontingFee: {
      get () {
        const percentage = Decimal.div(this.quotation?.fronting || 0, 100); // it can be raplced with .2
        const op = Decimal(this.alopPremiumSlu || 0)
          .sub(this.alopBrokerage || 0)
          .sub(this.alopTaxes || 0)
          .sub(this.alopEngFee || 0);

        const mul = Decimal.mul(op, percentage);
        return mul;
      }, set () { }
    },
    alopEngFee: {
      get () {
        const percentage = Decimal.div(this.quotation?.eng || 0, 100);
        const op = Decimal.mul(this.alopPremiumSlu || 0, percentage);
        return op;
      }, set () { }
    },
    alopReserve: {
      get () {
        const percentage = 0;
        const op = Decimal.mul(this.alopPremiumSlu || 0, percentage);
        return op;
      }, set () { }
    },
    alopNet: {
      get () {
        const op = Decimal(this.alopPremiumSlu || 0)
          .sub(this.alopBrokerage || 0)
          .sub(this.alopTaxes || 0)

        const result =
          this.quotation?.deduction_type === 'At inception'
            ? op.minus(this.alopEngFee || 0)
            : op;

        return result;
      }, set () { }
    },
    alopNetPremium: {
      get () {
        const op = Decimal(this.alopPremiumSlu || 0)
          .sub(this.alopBrokerage || 0)
          .sub(this.alopTaxes || 0)

        const result =
          this.quotation?.deduction_type === 'At inception'
            ? op.minus(this.alopEngFee || 0)
            : op;

        return result;
      }, set () { }
    },
    stockTivMovement: {
      get () {
        const op = Decimal(this.inclusionRisk?.movement_stocks || 0);
        return op;
      }, set () { }
    },
    stockTiv: {
      get () {
        const op = Decimal(this.totalStock);
        return op;
      }, set () { }
    },
    stockRate: {
      get () {
        const op = Decimal(this.insured?.rate || 0);
        return op;
      }, set () { }
    },
    stockPremium: {
      get () {
        const percentage = Decimal(this.stockRate || 0);
        const op = Decimal.mul(percentage, this.stockTivMovement || 0).div(1000);

        const effectiveDate = new Date(
          this.quotation?.inception_date || 0
        );
        const endDate = new Date(this.quotation?.expiry_date || 0);

        const effectiveDateIncrease = new Date(
          this.inclusionRisk?.effective_date_movement || 0
        );
        const endDateIncrease = new Date(
          this.inclusionRisk?.movement_end_date || 0
        );

        const dateSubs1 =
          (endDate.getTime() - effectiveDate.getTime()) / (1000 * 60 * 60 * 24);
        const dateSubs2 =
          (endDateIncrease.getTime() - effectiveDateIncrease.getTime()) /
          (1000 * 60 * 60 * 24);

        const div = Decimal.div(op, dateSubs1);
        const divTwo = Decimal.mul(div, dateSubs2);
        const stockPercent = Decimal.div(this.injectedTotalInsurableValue?.stocksRate || 0, 100);
        const result = Decimal.mul(divTwo, stockPercent);

        return result;
      }, set () { }
    },
    stockPremiumSlu: {
      get () {
        const percentage = Decimal.div(this.injectedPolicy?.slu_share || 0, 100);
        const op = Decimal.mul(this.stockPremium || 0, percentage);
        return op;
      }, set () { }
    },
    stockBrokerage: {
      get () {
        const percentage = Decimal.div(this.quotation?.brokerage || 0, 100);
        const op = Decimal.mul(this.stockPremiumSlu || 0, percentage);
        return op;
      }, set () { }
    },
    stockTaxes: {
      get () {
        const percentage = Decimal.div(this.quotation?.taxes || 0, 100);
        const op = Decimal.mul(this.stockPremiumSlu || 0, percentage);
        return op;
      }, set () { }
    },
    stockFrontingFee: {
      get () {
        const percentage = Decimal.div(this.quotation?.fronting || 0, 100); // it can be raplced with .2
        const op = Decimal(this.stockPremiumSlu || 0)
          .sub(this.stockBrokerage || 0)
          .sub(this.stockTaxes || 0)
          .sub(this.stockEngFee || 0);

        const mul = Decimal.mul(op, percentage);
        return mul;
      }, set () { }
    },
    stockEngFee: {
      get () {
        const percentage = Decimal.div(this.quotation?.eng || 0, 100);
        const op = Decimal.mul(this.stockPremiumSlu || 0, percentage);
        return op;
      }, set () { }
    },
    stockReserve: {
      get () {
        const percentage = 0;
        const op = Decimal.mul(this.stockPremiumSlu || 0, percentage);
        return op;
      }, set () { }
    },
    stockNet: {
      get () {
        const op = Decimal(this.stockPremiumSlu || 0)
          .sub(this.stockBrokerage || 0)
          .sub(this.stockTaxes || 0)

        const result =
          this.quotation?.deduction_type === 'At inception'
            ? op.minus(this.stockEngFee || 0)
            : op;

        return result;
      }, set () { }
    },
    stockNetPremium: {
      get () {
        const op = Decimal(this.stockPremiumSlu || 0)
          .sub(this.stockBrokerage || 0)
          .sub(this.stockTaxes || 0)

        const result =
          this.quotation?.deduction_type === 'At inception'
            ? op.minus(this.stockEngFee || 0)
            : op;

        return result;
      }, set () { }
    },
    tivMovementTotal: {
      get () {
        const op = Decimal.sum(this.damageTivMovement || 0, this.alopTivMovement || 0, this.stockTivMovement || 0);
        return op;
      }, set () { }
    },
    tivTotal: {
      get () {
        const op = Decimal.sum(this.damageTiv || 0, this.alopTiv || 0, this.stockTiv || 0);
        return op;
      }, set () { }
    },
    rateTotal: {
      get () {
        const op = Decimal.sum(this.damageRate || 0, this.alopRate || 0);
        return op;
      }, set () { }
    },
    premiumTotal: {
      get () {
        const op = Decimal.sum(this.damagePremium || 0, this.alopPremium || 0, this.stockPremium || 0);
        return op;
      }, set () { }
    },
    premiumSluTotal: {
      get () {
        const op = Decimal.sum(this.damagePremiumSlu || 0, this.alopPremiumSlu || 0, this.stockPremiumSlu || 0);
        return op;
      }, set () { }
    },
    brokerageTotal: {
      get () {
        const op = Decimal.sum(this.damageBrokerage || 0, this.alopBrokerage || 0, this.stockBrokerage || 0);
        return op;
      }, set () { }
    },
    taxesTotal: {
      get () {
        const op = Decimal.sum(this.damageTaxes || 0, this.alopTaxes, this.stockTaxes || 0);
        return op;
      }, set () { }
    },
    frontingFeeTotal: {
      get () {
        const op = Decimal.sum(this.damageFrontingFee || 0, this.alopFrontingFee || 0, this.stockFrontingFee || 0);
        return op;
      }, set () { }
    },
    engFeeTotal: {
      get () {
        const op = Decimal.sum(this.damageEngFee || 0, this.alopEngFee || 0, this.stockEngFee || 0);
        return op;
      }, set () { }
    },
    reserveTotal: {
      get () {
        const op = Decimal.sum(this.damageReserve || 0, this.alopReserve || 0, this.stockReserve || 0);
        return op;
      }, set () { }
    },
    netTotal: {
      get () {
        const op = Decimal.sum(this.damageNet || 0, this.alopNet, this.stockNet || 0);
        return op;
      }, set () { }
    },
    netPremiumTotal: {
      get () {
        const op = Decimal.sum(this.damageNetPremium || 0, this.alopNetPremium || 0, this.stockNetPremium || 0);
        return op;
      }, set () { }
    },
    signature: {
      get () {
        return this.inclusionRisk?.signature || '';
      }, set () { }
    },
    support: {
      get () {
        return this.inclusionRisk?.support || '';
      }, set () { }
    },
  },
  watch: {
    totalDamage: debounce(function (value) {
      this.checkField('total_damage', value);
    }, 1000),
    totalAlop: debounce(function (value) {
      this.checkField('total_alop', value);
    }, 1000),
    totalStock: debounce(function (value) {
      this.checkField('total_stock', value);
    }, 1000),
    damageTivMovement: debounce(function (value) {
      this.checkField('damage_tiv_movement', value);
    }, 1000),
    damageTiv: debounce(function (value) {
      this.checkField('damage_tiv', value);
    }, 1000),
    damageRate: debounce(function (value) {
      this.checkField('damage_rate', value);
    }, 1000),
    damagePremium: debounce(function (value) {
      this.checkField('damage_premium', value);
    }, 1000),
    damagePremiumSlu: debounce(function (value) {
      this.checkField('damage_premium_slu', value);
    }, 1000),
    damageBrokerage: debounce(function (value) {
      this.checkField('damage_brokerage', value);
    }, 1000),
    damageTaxes: debounce(function (value) {
      this.checkField('damage_taxes', value);
    }, 1000),
    damageFrontingFee: debounce(function (value) {
      this.checkField('damage_fronting_fee', value);
    }, 1000),
    damageEngFee: debounce(function (value) {
      this.checkField('damage_eng_fee', value);
    }, 1000),
    damageReserve: debounce(function (value) {
      this.checkField('damage_reserve', value);
    }, 1000),
    damageNet: debounce(function (value) {
      this.checkField('damage_net', value);
    }, 1000),
    damageNetPremium: debounce(function (value) {
      this.checkField('damage_net_premium', value);
    }, 1000),
    alopTivMovement: debounce(function (value) {
      this.checkField('alop_tiv_movement', value);
    }, 1000),
    alopTiv: debounce(function (value) {
      this.checkField('alop_tiv', value);
    }, 1000),
    alopRate: debounce(function (value) {
      this.checkField('alop_rate', value);
    }, 1000),
    alopPremium: debounce(function (value) {
      this.checkField('alop_premium', value);
    }, 1000),
    alopPremiumSlu: debounce(function (value) {
      this.checkField('alop_premium_slu', value);
    }, 1000),
    alopBrokerage: debounce(function (value) {
      this.checkField('alop_brokerage', value);
    }, 1000),
    alopTaxes: debounce(function (value) {
      this.checkField('alop_taxes', value);
    }, 1000),
    alopFrontingFee: debounce(function (value) {
      this.checkField('alop_fronting_fee', value);
    }, 1000),
    alopEngFee: debounce(function (value) {
      this.checkField('alop_eng_fee', value);
    }, 1000),
    alopReserve: debounce(function (value) {
      this.checkField('alop_reserve', value);
    }, 1000),
    alopNet: debounce(function (value) {
      this.checkField('alop_net', value);
    }, 1000),
    alopNetPremium: debounce(function (value) {
      this.checkField('alop_net_premium', value);
    }, 1000),
    stockTivMovement: debounce(function (value) {
      this.checkField('stock_tiv_movement', value);
    }, 1000),
    stockTiv: debounce(function (value) {
      this.checkField('stock_tiv', value);
    }, 1000),
    stockRate: debounce(function (value) {
      this.checkField('stock_rate', value);
    }, 1000),
    stockPremium: debounce(function (value) {
      this.checkField('stock_premium', value);
    }, 1000),
    stockPremiumSlu: debounce(function (value) {
      this.checkField('stock_premium_slu', value);
    }, 1000),
    stockBrokerage: debounce(function (value) {
      this.checkField('stock_brokerage', value);
    }, 1000),
    stockTaxes: debounce(function (value) {
      this.checkField('stock_taxes', value);
    }, 1000),
    stockFrontingFee: debounce(function (value) {
      this.checkField('stock_fronting_fee', value);
    }, 1000),
    stockEngFee: debounce(function (value) {
      this.checkField('stock_eng_fee', value);
    }, 1000),
    stockReserve: debounce(function (value) {
      this.checkField('stock_reserve', value);
    }, 1000),
    stockNet: debounce(function (value) {
      this.checkField('stock_net', value);
    }, 1000),
    stockNetPremium: debounce(function (value) {
      this.checkField('stock_net_premium', value);
    }, 1000),
    tivMovementTotal: debounce(function (value) {
      this.checkField('tiv_movement_total', value);
    }, 1000),
    tivTotal: debounce(function (value) {
      this.checkField('tiv_total', value);
    }, 1000),
    rateTotal: debounce(function (value) {
      this.checkField('rate_total', value);
    }, 1000),
    premiumTotal: debounce(function (value) {
      this.checkField('premium_total', value);
    }, 1000),
    premiumSluTotal: debounce(function (value) {
      this.checkField('premium_slu_total', value);
    }, 1000),
    brokerageTotal: debounce(function (value) {
      this.checkField('brokerage_total', value);
    }, 1000),
    taxesTotal: debounce(function (value) {
      this.checkField('taxes_total', value);
    }, 1000),
    frontingFeeTotal: debounce(function (value) {
      this.checkField('fronting_fee_total', value);
    }, 1000),
    engFeeTotal: debounce(function (value) {
      this.checkField('eng_fee_total', value);
    }, 1000),
    reserveTotal: debounce(function (value) {
      this.checkField('reserve_total', value);
    }, 1000),
    netTotal: debounce(function (value) {
      this.checkField('net_total', value);
    }, 1000),
    netPremiumTotal: debounce(function (value) {
      this.checkField('net_premium_total', value);
    }, 1000),
    'inclusionRisk.effective_date_movement': debounce(function (value) {
      this.checkField('effective_date_movement', value);
    }, 1000),
    'inclusionRisk.movement_end_date': debounce(function (value) {
      this.checkField('movement_end_date', value);
    }, 1000),
  },
  methods: {
    async checkField (column, value) {
      await saveInclusionRisk(this.movementId, column, value)
    },
  },
};
</script>
<style lang="less" scoped>
@import '~@/assets/style/AccordionStyle.less';
@import '~@/assets/style/Subscription/Bound.less';
</style>
