<template>
  <div>
    <!--INPUTS-->
    <div class="InputsCont d-flex justify-start flex-wrap">
      <div class="InputCont">
        <v-menu v-model="menu" :close-on-content-click="false" :nudge-right="40" transition="scale-transition" offset-y
          min-width="auto">
          <template v-slot:activator="{ on, attrs }">
            <v-text-field v-model="policy.effective_date_movement" label="Effective Date Movement" v-bind="attrs"
              v-on="on" disabled></v-text-field>
          </template>
          <v-date-picker v-model="policy.effective_date_movement" @input="menu = false" disabled></v-date-picker>
        </v-menu>
      </div>
      <div class="InputCont">
        <v-menu v-model="menu2" :close-on-content-click="false" :nudge-right="40" transition="scale-transition" offset-y
          min-width="auto">
          <template v-slot:activator="{ on, attrs }">
            <v-text-field v-model="policy.movement_end_date" label="Movement End Date" v-bind="attrs" v-on="on"
              disabled></v-text-field>
          </template>
          <v-date-picker v-model="policy.movement_end_date" @input="menu2 = false" disabled></v-date-picker>
        </v-menu>
      </div>
      <div class="InputCont">
        <v-text-field placeholder="Slu Share" label="Slu Share" v-model.trim="policy.slu_share" type="number" suffix="%"
          @blur="saveField('slu_share', policy.slu_share)" min="0" max="100" />
      </div>
    </div>

    <!--Deductions-->
    <div class="TitleCont d-flex justify-start align-center flex-wrap">
      <h5>Deductions</h5>
    </div>
    <v-row>
      <v-col cols="2">
        <div class="Line">
          <div class="Row">
            <v-text-field v-model="quotation.brokerage" label="Brokerage" type="number" suffix="%" disabled />
          </div>
        </div>
      </v-col>
      <v-col cols="2">
        <div class="Line">
          <div class="Row">
            <v-text-field v-model="quotation.taxes" label="Taxes" type="number" suffix="%" disabled />
          </div>
        </div>
      </v-col>
      <v-col cols="2">
        <div class="Line">
          <div class="Row">
            <v-text-field v-model="quotation.fronting" label="Fronting Fee" type="number" suffix="%" disabled />
          </div>
        </div>
      </v-col>
      <v-col cols="2">
        <div class="Line">
          <div class="Row">
            <v-text-field v-model="quotation.eng" label="Eng Fee" type="number" suffix="%" disabled />
          </div>
        </div>
      </v-col>
      <v-col cols="2">
        <div class="Line">
          <div class="Row">
            <v-select v-model.trim="quotation.deduction_type" label="Type" :items="catalog" item-text="type"
              item-value="type" disabled />
          </div>
        </div>
      </v-col>
      <v-col cols="2">
        <div class="Line">
          <div class="Row">
            <v-text-field v-model="quotation.premium_reserve" label="Premium Reserve Only Colombia" type="number"
              suffix="%" disabled />
          </div>
        </div>
      </v-col>
    </v-row>

    <!--SummaryChart-->
    <div class="TitleCont d-flex justify-start align-center flex-wrap mt-5">
      <h5>Damage, BI & Stocks Chart</h5>
    </div>
    <div class="
              TableGeneralStyle
              d-flex
              flex-wrap
              align-start
              justify-center
            ">
      <div class="Head d-flex justify-space-between align-center">
        <div class="Label" />
        <div class="Row Bold">TIV</div>
        <div class="MiniRow Bold">Rate</div>
        <div class="Row Bold">Premium 100%</div>
        <div class="Row Bold">SLU Share {{ policy.slu_share || 0 }}%</div>
      </div>

      <!-- Valores Damage-->
      <div class="Line mt-3">
        <div class="Label">Damage</div>
        <div class="Row">
          <currency-input v-model.trim="quotationInsured.propertyDamage" :options="currencyOptions" disabled />
        </div>
        <div class="MiniRow">
          <v-text-field placeholder="-" v-model.trim="quotationInsured.rate" type="number" suffix="%" disabled />
        </div>
        <div class="Row">
          <v-text-field v-model="damagePremium" disabled />
        </div>
        <div class="Row">
          <v-text-field v-model="damageShare" disabled />
        </div>
      </div>

      <!-- Valores de BI -->
      <div class="Line mt-2">
        <div class="Label">BI</div>
        <div class="Row">
          <currency-input v-model.trim="quotationInsured.businessInterruption" :options="currencyOptions" disabled />
        </div>
        <div class="MiniRow">
          <v-text-field placeholder="-" v-model.trim="quotationInsured.rate" type="number" suffix="%" disabled />
        </div>
        <div class="Row">
          <v-text-field v-model="alopPremium" disabled />
        </div>
        <div class="Row">
          <v-text-field v-model="alopShare" disabled />
        </div>
      </div>

      <!-- Valores de Stocks -->
      <div class="Line mt-2">
        <div class="Label">Stocks</div>
        <div class="Row">
          <currency-input v-model.trim="quotationInsured.stock" :options="currencyOptions" disabled />
        </div>
        <div class="MiniRow">
          <v-text-field placeholder="-" v-model.trim="quotationInsured.rate" type="number" suffix="%" disabled />
        </div>
        <div class="Row">
          <v-text-field v-model="stockPremium" disabled />
        </div>
        <div class="Row">
          <v-text-field v-model="stockShare" disabled />
        </div>
      </div>

      <!--Total-->
      <div class="TotalLine mt-3">
        <div class="Label Bold">Total</div>
        <div class="Row Bold">{{ tivTotal }}</div>
        <div class="MiniRow Bold">{{ rateTotal }}%</div>
        <div class="Row Bold">{{ premiumTotal }}</div>
        <div class="Row Bold">{{ shareTotal }}</div>
      </div>
    </div>

    <!--Segunda tabla-->
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
        <div class="Row Bold text-center">Brokerage {{ parseFloat(quotation.brokerage || 0) }}%</div>
        <div class="Row Bold text-center">Taxes {{ parseFloat(quotation.taxes || 0) }}%</div>
        <div class="Row Bold text-center">Engineering <br />Fees {{ parseFloat(quotation.eng || 0) }}%</div>
        <div class="Row Bold text-center">Fronting Fee {{ parseFloat(quotation.fronting || 0) }}%</div>
      </div>

      <!-- Valores Damage-->
      <div class="Line mt-3">
        <div class="Label">Damage</div>
        <div class="Row">
          <v-text-field v-model="damageBrokerage" disabled />
        </div>
        <div class="Row">
          <v-text-field v-model="damageTaxes" disabled placeholder="-" />
        </div>
        <div class="Row">
          <v-text-field v-model="damageEngFee" disabled />
        </div>
        <div class="Row">
          <v-text-field v-model="damageFrontingFee" disabled />
        </div>
      </div>

      <!-- Valores de Bi -->
      <div class="Line mt-2">
        <div class="Label">BI</div>
        <div class="Row">
          <v-text-field v-model="alopBrokerage" disabled />
        </div>
        <div class="Row">
          <v-text-field v-model="alopTaxes" disabled placeholder="-" />
        </div>
        <div class="Row">
          <v-text-field v-model="alopEngFee" disabled />
        </div>
        <div class="Row">
          <v-text-field v-model="alopFrontingFee" disabled />
        </div>
      </div>

      <!-- Valores de Stocks -->
      <div class="Line mt-2">
        <div class="Label">Stocks</div>
        <div class="Row">
          <v-text-field v-model="stockBrokerage" disabled />
        </div>
        <div class="Row">
          <v-text-field v-model="stockTaxes" disabled placeholder="-" />
        </div>
        <div class="Row">
          <v-text-field v-model="stockEngFee" disabled />
        </div>
        <div class="Row">
          <v-text-field v-model="stockFrontingFee" disabled />
        </div>
      </div>

      <!--Total-->
      <div class="TotalLine mt-3">
        <div class="Label Bold">Total</div>
        <div class="Row Bold">{{ brokerageTotal }}</div>
        <div class="Row Bold">{{ taxesTotal }}</div>
        <div class="Row Bold">{{ engFeeTotal }}</div>
        <div class="Row Bold">{{ frontingFeeTotal }}</div>
      </div>
    </div>

    <!--Tercer tabla-->
    <div class="
      MiniTableGeneralStyle
      d-flex
      flex-wrap
      align-start
      justify-center
      mt-12
    ">
      <div class="Head d-flex justify-space-between align-center">
        <div class="Label" />
        <div class="Row Bold text-center">
          Premium Reserve<br />
          (Only Colombia) {{ parseFloat(quotation.premiumReserve || 0) }}%
        </div>
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
          <v-text-field v-model="damagePremiumReserve" disabled />
        </div>
        <div class="Row">
          <v-text-field v-model="damageNet" disabled />
        </div>
        <div class="Row">
          <v-text-field v-model="damageNetPremium" disabled />
        </div>
      </div>

      <!-- Valores de Bi -->
      <div class="Line mt-2">
        <div class="Label">BI</div>
        <div class="Row">
          <v-text-field v-model="alopPremiumReserve" disabled />
        </div>
        <div class="Row">
          <v-text-field v-model="alopNet" disabled />
        </div>
        <div class="Row">
          <v-text-field v-model="alopNetPremium" disabled />
        </div>
      </div>

      <!-- Valores de Stocks -->
      <div class="Line mt-2">
        <div class="Label">Stocks</div>
        <div class="Row">
          <v-text-field v-model="stockPremiumReserve" disabled />
        </div>
        <div class="Row">
          <v-text-field v-model="stockNet" disabled />
        </div>
        <div class="Row">
          <v-text-field v-model="stockNetPremium" disabled />
        </div>
      </div>

      <!--Total-->
      <div class="TotalLine mt-3">
        <div class="Label Bold">Total</div>
        <div class="Row Bold">{{ premiumReserveTotal }}</div>
        <div class="Row Bold">{{ netTotal }}</div>
        <div class="Row Bold">{{ netPremiumTotal }}</div>
      </div>
    </div>
  </div>
</template>
<script>
/* validations */
import { validationMixin } from 'vuelidate';
import { formValidations } from '@/mixins/formValidations';
/* libs & helpers */
import Decimal from 'decimal.js';
import numeral from 'numeral';
/* mixins */
import { stateExpansiveManager } from '@/mixins/subscription.js';
/* components */
import CurrencyInput from "@/components/CurrencyInput/CurrencyInput.vue";
/* utils */
import { simpleDateFormat } from '@/lib/utils'
/* lodash */
import { debounce } from 'lodash';
/* services */
import { getEndorsements, getPolicy, getCatalog, getTotalInsurableValue, savePolicy } from './services/endorsement.service'

export default {
  name: 'NewInsurancePolicy',
  mixins: [stateExpansiveManager, formValidations, validationMixin],
  components: { CurrencyInput },
  data () {
    return {
      menu: false,
      menu2: false,

      model1: '',
      model2: '',

      catalog: [],
      endorsements: [],

      quotation: {
        brokerage: "",
        taxes: "",
        eng: "",
        deduction_type: "",
        fronting: "",
        premium_reserve: "",
        lta: "",
        others: "",
      },
      quotationInsured: {
        propertyDamage: "",
        propertyDamageUsd: "",
        businessInterruption: "",
        businessInterruptionUsd: "",
        stock: "",
        stockUsd: "",
        rate: "",
        total: ""
      },
      policy: {
        movement_end_date: new Date().toISOString().split('T')[0],
        effective_date_movement: new Date().toISOString().split('T')[0],
        slu_share: ''
      },

      currencyOptions: {
        currency: 'MXN',
        currencyDisplay: 'narrowSymbol',
        locale: 'en-US',
      },
      formatter: new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }),
      percentFormatter: new Intl.NumberFormat('en-US', {
        style: 'percent',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }),
    };
  },
  async mounted () {
    this.subscriptionId = this.$route.params?.subscriptionId
    if (this.subscriptionId) {
      const [data, policy, catalog, insurable] = await Promise.all([
        getEndorsements(this.subscriptionId),
        getPolicy(this.subscriptionId),
        getCatalog('deductions_type'),
        getTotalInsurableValue(this.subscriptionId)
      ])
      this.catalog = catalog
      this.endorsements = data?.boundNonPropMainLocation
      this.quotation = policy?.Quotation
      this.quotationInsured = insurable?.quotationInsured
      this.policy.effective_date_movement = simpleDateFormat(this.quotation.inception_date?.split?.('T')?.[0]) || ''
      this.policy.movement_end_date = simpleDateFormat(this.quotation.expiry_date.split?.('T')?.[0]) || ''
      if (insurable?.layers?.sluShare) {
        if (policy?.EndorsementPolicy?.slu_share) {
          this.policy.slu_share = policy?.EndorsementPolicy?.slu_share || ''
        } else {
          this.policy.slu_share = insurable?.layers?.sluShare || ''
        }
      }
    }
  },
  computed: {
    ShowRateBtn () {
      return this.$route.name;
    },
    damagePremium: {
      get () {
        const op = Decimal.mul(this.quotationInsured.propertyDamage || 0, this.quotationInsured.rate || 0).div(1000);
        return this.formatter.format(op);
      },
    },
    alopPremium: {
      get () {
        const op = Decimal.mul(this.quotationInsured.businessInterruption || 0, this.quotationInsured.rate || 0).div(1000);
        return this.formatter.format(op);
      },
    },
    stockPremium: {
      get () {
        const op = Decimal.mul(this.quotationInsured.stock || 0, this.quotationInsured.rate || 0).div(1000);
        return this.formatter.format(op);
      },
    },
    damageShare: {
      get () {
        const percentage = new Decimal(this.policy.slu_share || 0).div(100); // it can be raplced with .2
        const op = Decimal.mul(numeral((this.damagePremium || '$0').replace('$', '')).value(), percentage);

        return this.formatter.format(op);
      },
    },
    alopShare: {
      get () {
        const percentage = new Decimal(this.policy.slu_share || 0).div(100); // it can be raplced with .2
        const op = Decimal.mul(numeral((this.alopPremium || '$0').replace('$', '')).value(), percentage);

        return this.formatter.format(op);
      },
    },
    stockShare: {
      get () {
        const percentage = new Decimal(this.policy.slu_share || 0).div(100); // it can be raplced with .2
        const op = Decimal.mul(numeral((this.stockPremium || '$0').replace('$', '')).value(), percentage);

        return this.formatter.format(op);
      },
    },
    damageBrokerage: {
      get () {
        const percentage = new Decimal(this.quotation.brokerage || 0).div(100); // it can be raplced with .2
        const op = Decimal.mul(numeral((this.damageShare || '$0').replace('$', '')).value(), percentage);
        return this.formatter.format(op);
      },
    },
    alopBrokerage: {
      get () {
        const percentage = new Decimal(this.quotation.brokerage || 0).div(100); // it can be raplced with .2
        const op = Decimal.mul(numeral((this.alopShare || '$0').replace('$', '')).value(), percentage);
        return this.formatter.format(op);
      },
    },
    stockBrokerage: {
      get () {
        const percentage = new Decimal(this.quotation.brokerage || 0).div(100); // it can be raplced with .2
        const op = Decimal.mul(numeral((this.stockShare || '$0').replace('$', '')).value(), percentage);
        return this.formatter.format(op);
      },
    },
    damageTaxes: {
      get () {
        const percentage = new Decimal(this.quotation.taxes || 0).div(100); // it can be raplced with .2
        const op = Decimal.mul(numeral((this.damageShare || '$0').replace('$', '')).value(), percentage);
        return this.formatter.format(op);
      },
    },
    alopTaxes: {
      get () {
        const percentage = new Decimal(this.quotation.taxes || 0).div(100); // it can be raplced with .2
        const op = Decimal.mul(numeral((this.alopShare || '$0').replace('$', '')).value(), percentage);
        return this.formatter.format(op);
      },
    },
    stockTaxes: {
      get () {
        const percentage = new Decimal(this.quotation.taxes || 0).div(100); // it can be raplced with .2
        const op = Decimal.mul(numeral((this.stockShare || '$0').replace('$', '')).value(), percentage);
        return this.formatter.format(op);
      },
    },
    damageEngFee: {
      get () {
        const percentage = new Decimal(this.quotation.eng || 0).div(100); // it can be raplced with .2
        const op = Decimal.mul(numeral((this.damageShare || '$0').replace('$', '')).value(), percentage);
        return this.formatter.format(op);
      },
    },
    alopEngFee: {
      get () {
        const percentage = new Decimal(this.quotation.eng || 0).div(100); // it can be raplced with .2
        const op = Decimal.mul(numeral((this.alopShare || '$0').replace('$', '')).value(), percentage);
        return this.formatter.format(op);
      },
    },
    stockEngFee: {
      get () {
        const percentage = new Decimal(this.quotation.eng || 0).div(100); // it can be raplced with .2
        const op = Decimal.mul(numeral((this.stockShare || '$0').replace('$', '')).value(), percentage);
        return this.formatter.format(op);
      },
    },
    damageFrontingFee: {
      get () {
        const percentage = new Decimal(this.quotation.fronting || 0).div(100); // it can be raplced with .2
        const op = new Decimal(numeral((this.damageShare || '$0').replace('$', '')).value())
          .sub(numeral((this.damageBrokerage || '$0').replace('$', '')).value())
          .sub(numeral((this.damageTaxes || '$0').replace('$', '')).value())
          .sub(numeral((this.damageEngFee || '$0').replace('$', '')).value());

        const mul = Decimal.mul(op, percentage);
        return this.formatter.format(mul);
      },
    },
    alopFrontingFee: {
      get () {
        const percentage = new Decimal(this.quotation.fronting || 0).div(100); // it can be raplced with .2
        const op = new Decimal(numeral((this.alopShare || '$0').replace('$', '')).value())
          .sub(numeral((this.alopBrokerage || '$0').replace('$', '')).value())
          .sub(numeral((this.alopTaxes || '$0').replace('$', '')).value())
          .sub(numeral((this.alopEngFee || '$0').replace('$', '')).value());

        const mul = Decimal.mul(op, percentage);
        return this.formatter.format(mul);
      },
    },
    stockFrontingFee: {
      get () {
        const percentage = new Decimal(this.quotation.fronting || 0).div(100); // it can be raplced with .2
        const op = new Decimal(numeral((this.stockPremium || '$0').replace('$', '')).value())
          .sub(numeral((this.stockBrokerage || '$0').replace('$', '')).value())
          .sub(numeral((this.stockTaxes || '$0').replace('$', '')).value())
          .sub(numeral((this.stockEngFee || '$0').replace('$', '')).value());

        const mul = Decimal.mul(op, percentage);
        return this.formatter.format(mul);
      },
    },
    damagePremiumReserve: {
      get () {
        // if colombia selected add value
        const value = this.quotation.premiumReserve || 0;
        const percentage = new Decimal(value).div(100); // it can be raplced with .2
        const op = Decimal.mul(numeral((this.damageShare || '$0').replace('$', '')).value(), percentage);
        return this.formatter.format(op);
      },
    },
    alopPremiumReserve: {
      get () {
        // if colombia selected add value
        const value = this.quotation.premiumReserve || 0;
        const percentage = new Decimal(value).div(100); // it can be raplced with .2
        const op = Decimal.mul(numeral((this.alopShare || '$0').replace('$', '')).value(), percentage);
        return this.formatter.format(op);
      },
    },
    stockPremiumReserve: {
      get () {
        // if colombia selected add value
        const value = this.quotation.premiumReserve || 0;
        const percentage = new Decimal(value).div(100); // it can be raplced with .2
        const op = Decimal.mul(numeral((this.stockShare || '$0').replace('$', '')).value(), percentage);
        return this.formatter.format(op);
      },
    },
    damageNet: {
      get () {
        const op = new Decimal(
          numeral(
            (`${this.damageShare}` || '$0').replace(/[^0-9.]/g, '')
          ).value() || 0
        )
          .sub(
            numeral(
              (`${this.damageBrokerage}` || '$0').replace(/[^0-9.]/g, '')
            ).value() || 0)
          .sub(
            numeral(
              (`${this.damageTaxes}` || '$0').replace(/[^0-9.]/g, '')
            ).value() || 0
          )

        const result = this.quotation.deduction_type === 'At inception' ? op.sub(numeral((this.damageEngFee || '$0').replace('$', '')).value()) : op;
        return this.formatter.format(result);
      },
    },
    alopNet: {
      get () {
        const op = new Decimal(
          numeral(
            (`${this.alopShare}` || '$0').replace(/[^0-9.]/g, '')
          ).value() || 0
        )
          .sub(
            numeral(
              (`${this.alopBrokerage}` || '$0').replace(/[^0-9.]/g, '')
            ).value() || 0)
          .sub(
            numeral(
              (`${this.alopTaxes}` || '$0').replace(/[^0-9.]/g, '')
            ).value() || 0
          )

        const result = this.quotation.deduction_type === 'At inception' ? op.sub(numeral((this.alopEngFee || '$0').replace('$', '')).value()) : op;
        return this.formatter.format(result);
      },
    },
    stockNet: {
      get () {
        const op = new Decimal(
          numeral(
            (`${this.stockShare}` || '$0').replace(/[^0-9.]/g, '')
          ).value() || 0
        )
          .sub(
            numeral(
              (`${this.stockBrokerage}` || '$0').replace(/[^0-9.]/g, '')
            ).value() || 0)
          .sub(
            numeral(
              (`${this.stockTaxes}` || '$0').replace(/[^0-9.]/g, '')
            ).value() || 0
          )

        const result = this.quotation.deduction_type === 'At inception' ? op.sub(numeral((this.stockEngFee || '$0').replace('$', '')).value()) : op;
        return this.formatter.format(result);
      },
    },
    damageNetPremium: {
      get () {
        const op = new Decimal(
          numeral(
            (`${this.damageShare}` || '$0').replace(/[^0-9.]/g, '')
          ).value() || 0
        )
          .sub(
            numeral(
              (`${this.damageBrokerage}` || '$0').replace(/[^0-9.]/g, '')
            ).value() || 0)
          .sub(
            numeral(
              (`${this.damageTaxes}` || '$0').replace(/[^0-9.]/g, '')
            ).value() || 0
          )
          .sub(
            numeral(
              (`${this.damagePremiumReserve}` || '$0').replace(/[^0-9.]/g, '')
            ).value() || 0
          )

        const result = this.quotation.deduction_type === 'At inception' ? op.sub(numeral((this.damageEngFee || '$0').replace('$', '')).value()) : op;
        return this.formatter.format(result);
      },
    },
    alopNetPremium: {
      get () {
        const op = new Decimal(
          numeral(
            (`${this.alopShare}` || '$0').replace(/[^0-9.]/g, '')
          ).value() || 0
        )
          .sub(
            numeral(
              (`${this.alopBrokerage}` || '$0').replace(/[^0-9.]/g, '')
            ).value() || 0)
          .sub(
            numeral(
              (`${this.alopTaxes}` || '$0').replace(/[^0-9.]/g, '')
            ).value() || 0
          )
          .sub(
            numeral(
              (`${this.alopPremiumReserve}` || '$0').replace(/[^0-9.]/g, '')
            ).value() || 0
          )

        const result = this.quotation.deduction_type === 'At inception' ? op.sub(numeral((this.alopEngFee || '$0').replace('$', '')).value()) : op;
        return this.formatter.format(result);
      },
    },
    stockNetPremium: {
      get () {
        const op = new Decimal(
          numeral(
            (`${this.stockShare}` || '$0').replace(/[^0-9.]/g, '')
          ).value() || 0
        )
          .sub(
            numeral(
              (`${this.stockBrokerage}` || '$0').replace(/[^0-9.]/g, '')
            ).value() || 0)
          .sub(
            numeral(
              (`${this.stockTaxes}` || '$0').replace(/[^0-9.]/g, '')
            ).value() || 0
          )
          .sub(
            numeral(
              (`${this.stockPremiumReserve}` || '$0').replace(/[^0-9.]/g, '')
            ).value() || 0
          )

        const result = this.quotation.deduction_type === 'At inception' ? op.sub(numeral((this.stockEngFee || '$0').replace('$', '')).value()) : op;
        return this.formatter.format(result);
      },
    },
    tivTotal: {
      get () {
        const op = Decimal.sum(
          this.quotationInsured.propertyDamage || 0,
          this.quotationInsured.businessInterruption || 0,
          this.quotationInsured.stock || 0,
        );

        return this.formatter.format(op);
      },
    },
    rateTotal: {
      get () {
        const op = Decimal.div(
          numeral((this.premiumTotal || '$0').replace('$', '')).value(),
          numeral((this.tivTotal || '$0').replace('$', '')).value()
        ).mul(1000);

        return op;
      },
    },
    premiumTotal: {
      get () {
        const op = Decimal.sum(numeral((this.damagePremium || '$0').replace('$', '')).value(), numeral((this.alopPremium || '$0').replace('$', '')).value(), numeral((this.stockPremium || '$0').replace('$', '')).value());
        return this.formatter.format(op);
      },
    },
    shareTotal: {
      get () {
        const op = Decimal.sum(numeral((this.damageShare || '$0').replace('$', '')).value(), numeral((this.alopShare || '$0').replace('$', '')).value(), numeral((this.stockShare || '$0').replace('$', '')).value());
        return this.formatter.format(op);
      },
    },
    brokerageTotal: {
      get () {
        const op = Decimal.sum(
          numeral((this.damageBrokerage || '$0').replace('$', '')).value(),
          numeral((this.alopBrokerage || '$0').replace('$', '')).value(),
          numeral((this.stockBrokerage || '$0').replace('$', '')).value(),
        );

        return this.formatter.format(op);
      },
    },
    taxesTotal: {
      get () {
        const op = Decimal.sum(numeral((this.damageTaxes || '$0').replace('$', '')).value(), numeral((this.alopTaxes || '$0').replace('$', '')).value(), numeral((this.stockTaxes || '$0').replace('$', '')).value());
        return this.formatter.format(op);
      },
    },
    engFeeTotal: {
      get () {
        const op = Decimal.sum(numeral((this.damageEngFee || '$0').replace('$', '')).value(), numeral((this.alopEngFee || '$0').replace('$', '')).value(), numeral((this.stockEngFee || '$0').replace('$', '')).value());
        return this.formatter.format(op);
      },
    },
    frontingFeeTotal: {
      get () {
        const op = Decimal.sum(
          numeral((this.damageFrontingFee || '$0').replace('$', '')).value(),
          numeral((this.alopFrontingFee || '$0').replace('$', '')).value(),
          numeral((this.stockFrontingFee || '$0').replace('$', '')).value(),
        );

        return this.formatter.format(op);
      },
    },
    premiumReserveTotal: {
      get () {
        const op = Decimal.sum(
          numeral((this.damagePremiumReserve || '$0').replace('$', '')).value(),
          numeral((this.alopPremiumReserve || '$0').replace('$', '')).value(),
          numeral((this.stockPremiumReserve || '$0').replace('$', '')).value(),
        );

        return this.formatter.format(op);
      },
    },
    netTotal: {
      get () {
        const op = Decimal.sum(numeral((this.damageNet || '$0').replace('$', '')).value(), numeral((this.alopNet || '$0').replace('$', '')).value(), numeral((this.stockNet || '$0').replace('$', '')).value());
        return this.formatter.format(op);
      },
    },
    netPremiumTotal: {
      get () {
        const op = Decimal.sum(
          numeral((this.damageNetPremium || '$0').replace('$', '')).value(),
          numeral((this.alopNetPremium || '$0').replace('$', '')).value(),
          numeral((this.stockNetPremium || '$0').replace('$', '')).value(),
        );

        return this.formatter.format(op);
      },
    },
  },
  methods: {
    async saveField (column, value) {
      await savePolicy(this.subscriptionId, column, value)
    }
  },
  watch: {
    damagePremium: {
      handler: debounce(function (value) {
        this.saveField('damage_premium', value)
      }, 1200),
    },
    alopPremium: {
      handler: debounce(function (value) {
        this.saveField('alop_premium', value)
      }, 1200),
    },
    stockPremium: {
      handler: debounce(function (value) {
        this.saveField('stock_premium', value)
      }, 1200),
    },
    damageShare: {
      handler: debounce(function (value) {
        this.saveField('damage_share', value)
      }, 1200),
    },
    alopShare: {
      handler: debounce(function (value) {
        this.saveField('alop_share', value)
      }, 1200),
    },
    stockShare: {
      handler: debounce(function (value) {
        this.saveField('stock_share', value)
      }, 1200),
    },
    damageBrokerage: {
      handler: debounce(function (value) {
        this.saveField('damage_brokerage', value)
      }, 1200),
    },
    alopBrokerage: {
      handler: debounce(function (value) {
        this.saveField('alop_brokerage', value)
      }, 1200),
    },
    stockBrokerage: {
      handler: debounce(function (value) {
        this.saveField('stock_brokerage', value)
      }, 1200),
    },
    damageTaxes: {
      handler: debounce(function (value) {
        this.saveField('damage_taxes', value)
      }, 1200),
    },
    alopTaxes: {
      handler: debounce(function (value) {
        this.saveField('alop_taxes', value)
      }, 1200),
    },
    stockTaxes: {
      handler: debounce(function (value) {
        this.saveField('stock_taxes', value)
      }, 1200),
    },
    damageEngFee: {
      handler: debounce(function (value) {
        this.saveField('damage_eng_fee', value)
      }, 1200),
    },
    alopEngFee: {
      handler: debounce(function (value) {
        this.saveField('alop_eng_fee', value)
      }, 1200),
    },
    stockEngFee: {
      handler: debounce(function (value) {
        this.saveField('stock_eng_fee', value)
      }, 1200),
    },
    damageFrontingFee: {
      handler: debounce(function (value) {
        this.saveField('damage_fronting_fee', value)
      }, 1200),
    },
    alopFrontingFee: {
      handler: debounce(function (value) {
        this.saveField('alop_fronting_fee', value)
      }, 1200),
    },
    stockFrontingFee: {
      handler: debounce(function (value) {
        this.saveField('stock_fronting_fee', value)
      }, 1200),
    },
    damagePremiumReserve: {
      handler: debounce(function (value) {
        this.saveField('damage_premium_reserve', value)
      }, 1200),
    },
    alopPremiumReserve: {
      handler: debounce(function (value) {
        this.saveField('alop_premium_reserve', value)
      }, 1200),
    },
    stockPremiumReserve: {
      handler: debounce(function (value) {
        this.saveField('stock_premium_reserve', value)
      }, 1200),
    },
    damageNet: {
      handler: debounce(function (value) {
        this.saveField('damage_net', value)
      }, 1200),
    },
    alopNet: {
      handler: debounce(function (value) {
        this.saveField('alop_net', value)
      }, 1200),
    },
    stockNet: {
      handler: debounce(function (value) {
        this.saveField('stock_net', value)
      }, 1200),
    },
    damageNetPremium: {
      handler: debounce(function (value) {
        this.saveField('damage_net_premium', value)
      }, 1200),
    },
    alopNetPremium: {
      handler: debounce(function (value) {
        this.saveField('alop_net_premium', value)
      }, 1200),
    },
    stockNetPremium: {
      handler: debounce(function (value) {
        this.saveField('stock_net_premium', value)
      }, 1200),
    },
    tivTotal: {
      handler: debounce(function (value) {
        this.saveField('tiv_total', value)
      }, 1200),
    },
    rateTotal: {
      handler: debounce(function (value) {
        this.saveField('rate_total', value)
      }, 1200),
    },
    premiumTotal: {
      handler: debounce(function (value) {
        this.saveField('premium_total', value)
      }, 1200),
    },
    shareTotal: {
      handler: debounce(function (value) {
        this.saveField('share_total', value)
      }, 1200),
    },
    brokerageTotal: {
      handler: debounce(function (value) {
        this.saveField('brokerage_total', value)
      }, 1200),
    },
    taxesTotal: {
      handler: debounce(function (value) {
        this.saveField('taxes_total', value)
      }, 1200),
    },
    engFeeTotal: {
      handler: debounce(function (value) {
        this.saveField('eng_fee_total', value)
      }, 1200),
    },
    frontingFeeTotal: {
      handler: debounce(function (value) {
        this.saveField('fronting_fee_total', value)
      }, 1200),
    },
    premiumReserveTotal: {
      handler: debounce(function (value) {
        this.saveField('premium_reserve_total', value)
      }, 1200),
    },
    netTotal: {
      handler: debounce(function (value) {
        this.saveField('net_total', value)
      }, 1200),
    },
    netPremiumTotal: {
      handler: debounce(function (value) {
        this.saveField('net_premium_total', value)
      }, 1200),
    },
    'policy.slu_share': function (value) {
      this.$emit('updateSluShare', value)
    }
  }
};
</script>
<style lang="less" scoped>
@import '~@/assets/style/AccordionStyle.less';
@import '~@/assets/style/Subscription/Bound.less';

.TableSingle {
  margin-top: 0px;
}
</style>
