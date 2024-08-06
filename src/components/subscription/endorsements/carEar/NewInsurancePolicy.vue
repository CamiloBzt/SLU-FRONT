<template>
  <v-expansion-panels class="SubExpansionComponent">
    <v-expansion-panel>
      <v-expansion-panel-header
        @click="changeSubExpansion"
        class="ExpansionTitle d-flex justify-start"
        expand-icon=""
      >
        <template v-slot:actions>
          <div class="subIconCont d-flex justify-start align-center">
            <v-icon class="iconExpand mr-1">
              {{ iconSubExpansion }}
            </v-icon>
            <div class="SubExpansionTitle">New Insurance Policy</div>
          </div>
        </template>
      </v-expansion-panel-header>

      <v-expansion-panel-content>
        <div class="ExpandContent justify-center">
          <!--INPUTS-->
          <div class="InputsCont d-flex justify-start flex-wrap">
            <div class="InputCont">
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
                    v-model="$v.newInsurancePolicy.effectiveDateMovement.$model"
                    label="Effective Date Movement"
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="$v.newInsurancePolicy.effectiveDateMovement.$model"
                  @input="menu = false"
                ></v-date-picker>
              </v-menu>
            </div>
            <div class="InputCont">
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
                    v-model="$v.newInsurancePolicy.movementEndDate.$model"
                    label="Movement End Date"
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="$v.newInsurancePolicy.movementEndDate.$model"
                  @input="menu2 = false"
                ></v-date-picker>
              </v-menu>
            </div>
          </div>

          <!--Deductions-->
          <div class="TitleCont d-flex justify-start align-center flex-wrap">
            <h5>Deductions</h5>
          </div>
          <div class="TableSingle">
            <div class="Line">
              <div class="Label">Brokerage</div>
              <div class="Row">
                <v-text-field
                  v-model="deductions.brokerage"
                  label="Brokerage"
                  type="number"
                  suffix="%"
                  min="0"
                  max="100"
                  @blur="
                    setStateDeductions('brokerage', this);
                    checkDeductionsColumn('brokerage');
                    sumDeductions();
                  "
                  :error-messages="quotationValids('deductions', 'brokerage')"
                />
              </div>
              <div class="RightRow" />
            </div>

            <div class="Line">
              <div class="Label">Tax</div>
              <div class="Row">
                <v-text-field
                  v-model="deductions.taxes"
                  label="Taxes"
                  type="number"
                  suffix="%"
                  min="0"
                  max="100"
                  @blur="
                    setStateDeductions('taxes', this);
                    checkDeductionsColumn('taxes');
                    sumDeductions();
                  "
                  :error-messages="quotationValids('deductions', 'taxes')"
                />
              </div>
              <div class="RightRow" />
            </div>

            <div class="Line">
              <div class="Label">Fronting</div>
              <div class="Row">
                <v-text-field
                  v-model="deductions.fronting"
                  label="Fronting Fee"
                  type="number"
                  suffix="%"
                  min="0"
                  max="100"
                  @blur="
                    setStateDeductions('fronting', this);
                    checkDeductionsColumn('fronting');
                    sumDeductions();
                  "
                  :error-messages="quotationValids('deductions', 'fronting')"
                />
              </div>
              <div class="RightRow" />
            </div>

            <div class="Line">
              <div class="Label">Engeneering Fee</div>
              <div class="Row">
                <v-text-field
                  v-model="deductions.eng"
                  label="Eng Fee"
                  type="number"
                  min="0"
                  max="100"
                  suffix="%"
                  @blur="
                    setStateDeductions('eng', this);
                    checkDeductionsColumn('eng');
                    sumDeductions();
                  "
                  :error-messages="quotationValids('deductions', 'eng')"
                />
              </div>
              <div class="RightRow">
                <v-select
                  v-model.trim="deductions.deductionType"
                  required
                  label="Type"
                  :items="type"
                  item-text="type"
                  item-value="type"
                  min="0"
                  max="100"
                  :disabled="type.length === 0"
                  @input="
                    setStateDeductions('deductionType', this);
                    checkDeductionsColumn('deductionType');
                  "
                />
              </div>
            </div>

            <div class="Line">
              <div class="Label">Reserve Colombia</div>
              <div class="Row">
                <v-text-field
                  v-model="deductions.premiumReserve"
                  label="Premium Reserve Only Colombia"
                  type="number"
                  min="0"
                  max="100"
                  suffix="%"
                  @blur="
                    setStateDeductions('premiumReserve', this);
                    checkDeductionsColumn('premiumReserve');
                  "
                  :error-messages="quotationValids('deductions', 'premiumReserve')"
                />
              </div>
              <div class="RightRow" />
            </div>
          </div>

          <!--SummaryChart-->
          <div class="TitleCont d-flex justify-start align-center flex-wrap mt-5">
            <h5>Damage & ALOP Chart</h5>
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
              <div class="Row Bold">SLU Share 20%</div>
            </div>

            <!-- Valores Damage-->
            <div class="Line mt-3">
              <div class="Label">Damage</div>
              <div class="Row">
                <v-text-field
                  prefix="$"
                  v-model.trim="$v.newInsurancePolicy.damageTiv.$model"
                  @blur="
                    setInsurancePolicy({ index: currentIndex, key: 'damageTiv', value: $v.newInsurancePolicy.damageTiv.$model });
                    checkField('damageTiv');
                  "
                  type="number"
                />
              </div>
              <div class="MiniRow">
                <v-text-field
                  placeholder="-"
                  v-model.trim="$v.newInsurancePolicy.damageRate.$model"
                  @blur="
                    setInsurancePolicy({ index: currentIndex, key: 'damageRate', value: $v.newInsurancePolicy.damageRate.$model });
                    checkField('damageRate');
                  "
                  type="number"
                />
              </div>
              <div class="Row">
                <v-text-field
                  v-model="damagePremium"
                  disabled
                />
              </div>
              <div class="Row">
                <v-text-field
                  v-model="damageShare"
                  disabled
                />
              </div>
            </div>

            <!--Valores de  Bi-->
            <div class="Line mt-2">
              <div class="Label">Alop</div>
              <div class="Row">
                <v-text-field
                  prefix="$"
                  v-model.trim="$v.newInsurancePolicy.alopTiv.$model"
                  @blur="
                    setInsurancePolicy({ index: currentIndex, key: 'alopTiv', value: $v.newInsurancePolicy.alopTiv.$model });
                    checkField('alopTiv');
                  "
                  type="number"
                />
              </div>
              <div class="MiniRow">
                <v-text-field
                  v-model.trim="$v.newInsurancePolicy.alopRate.$model"
                  @blur="
                    setInsurancePolicy({ index: currentIndex, key: 'alopRate', value: $v.newInsurancePolicy.alopRate.$model });
                    checkField('alopRate');
                  "
                  type="number"
                  placeholder="-"
                />
              </div>
              <div class="Row">
                <v-text-field
                  v-model="alopPremium"
                  disabled
                />
              </div>
              <div class="Row">
                <v-text-field
                  v-model="alopShare"
                  disabled
                />
              </div>
            </div>

            <!--Total-->
            <div class="TotalLine mt-3">
              <div class="Label Bold">Total</div>
              <div class="Row Bold">{{ tivTotal }}</div>
              <div class="MiniRow Bold">{{ rateTotal }}</div>
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
              <div class="Row Bold text-center">Brokerage 10%</div>
              <div class="Row Bold text-center">Taxes 2%</div>
              <div class="Row Bold text-center">Engineering <br />Fees 2.5%</div>
              <div class="Row Bold text-center">Fronting Fee 5%</div>
            </div>

            <!-- Valores Damage-->
            <div class="Line mt-3">
              <div class="Label">Damage</div>
              <div class="Row">
                <v-text-field
                  v-model="damageBrokerage"
                  disabled
                />
              </div>
              <div class="Row">
                <v-text-field
                  v-model="damageTaxes"
                  disabled
                  placeholder="-"
                />
              </div>
              <div class="Row">
                <v-text-field
                  v-model="damageEngFee"
                  disabled
                />
              </div>
              <div class="Row">
                <v-text-field
                  v-model="damageFrontingFee"
                  disabled
                />
              </div>
            </div>

            <!--Valores de  Bi-->
            <div class="Line mt-2">
              <div class="Label">Alop</div>
              <div class="Row">
                <v-text-field
                  v-model="alopBrokerage"
                  disabled
                />
              </div>
              <div class="Row">
                <v-text-field
                  v-model="alopTaxes"
                  disabled
                  placeholder="-"
                />
              </div>
              <div class="Row">
                <v-text-field
                  v-model="alopEngFee"
                  disabled
                />
              </div>
              <div class="Row">
                <v-text-field
                  v-model="alopFrontingFee"
                  disabled
                />
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
                (Only Colombia) 0%
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
                <v-text-field
                  v-model="damagePremiumReserve"
                  disabled
                />
              </div>
              <div class="Row">
                <v-text-field
                  v-model="damageNet"
                  disabled
                />
              </div>
              <div class="Row">
                <v-text-field
                  v-model="damageNetPremium"
                  disabled
                />
              </div>
            </div>

            <!--Valores de  Bi-->
            <div class="Line mt-2">
              <div class="Label">Alop</div>
              <div class="Row">
                <v-text-field
                  v-model="alopPremiumReserve"
                  disabled
                />
              </div>
              <div class="Row">
                <v-text-field
                  v-model="alopNet"
                  disabled
                />
              </div>
              <div class="Row">
                <v-text-field
                  v-model="alopNetPremium"
                  disabled
                />
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
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>
<script>
import { mapActions, mapGetters, mapMutations, mapState } from 'vuex';
/* validations */
import { validationMixin } from 'vuelidate';
import { required } from 'vuelidate/lib/validators';
import { DigitsAndDecimals, Percentage } from '@/constants/validations';
import { formValidations } from '@/mixins/formValidations';
/* libs & helpers */
import Decimal from 'decimal.js';
import numeral from 'numeral';
/* mixins */
import { stateExpansiveManager } from '@/mixins/subscription.js';
/* components */
import Deductions from '@/components/subscription/quotation/Deductions';
/* lodash */
import { debounce } from 'lodash';

export default {
  name: 'NewInsurancePolicy',
  mixins: [stateExpansiveManager, formValidations, validationMixin],
  components: { Deductions },
  props: {
    fieldid: {
      type: String | Number,
    },
    indexarr: {
      type: String | Number,
    },
  },
  data () {
    return {
      menu: false,
      menu2: false,

      model1: '',
      model2: '',

      type: [
        { id: 1, type: 'As incurred' },
        { id: 2, type: 'At inception' },
      ],

      formatter: new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }),
    };
  },
  async mounted () {
    await this.getEndorsementInformation('newInsurance');
  },
  computed: {
    ...mapGetters(['deductions', 'endorsements']),
    ...mapGetters({
      insurancePolicy: 'newInsurancePolicy',
    }),
    newInsurancePolicy: {
      get () {
        const current = this.endorsements[this.indexarr];
        const id = current['movementId'];
        const item = this.insurancePolicy.findIndex((v) => v.id === id);
        return this.insurancePolicy[item];
      },
    },
    currentId: {
      get () {
        const current = this.endorsements[this.indexarr];
        const id = current['movementId'];
        return id;
      },
    },
    currentIndex: {
      get () {
        const current = this.endorsements[this.indexarr];
        const id = current['movementId'];
        const item = this.insurancePolicy.findIndex((v) => v.id === id);
        return item;
      },
    },
    damagePremium: {
      get () {
        const op = Decimal.mul(this.newInsurancePolicy.damageTiv || 0, this.newInsurancePolicy.damageRate || 0).div(1000);

        return this.formatter.format(op);
      },
    },
    alopPremium: {
      get () {
        const op = Decimal.mul(this.newInsurancePolicy.alopTiv || 0, this.newInsurancePolicy.alopRate || 0).div(1000);

        return this.formatter.format(op);
      },
    },
    damageShare: {
      get () {
        const percentage = new Decimal(20).div(100); // it can be raplced with .2
        const op = Decimal.mul(numeral((this.damagePremium || '$0').replace('$', '')).value(), percentage);

        return this.formatter.format(op);
      },
    },
    alopShare: {
      get () {
        const percentage = new Decimal(20).div(100); // it can be raplced with .2
        const op = Decimal.mul(numeral((this.alopPremium || '$0').replace('$', '')).value(), percentage);

        return this.formatter.format(op);
      },
    },
    damageBrokerage: {
      get () {
        const percentage = new Decimal(10).div(100); // it can be raplced with .2
        const op = Decimal.mul(numeral((this.damageShare || '$0').replace('$', '')).value(), percentage);

        return this.formatter.format(op);
      },
    },
    alopBrokerage: {
      get () {
        const percentage = new Decimal(10).div(100); // it can be raplced with .2
        const op = Decimal.mul(numeral((this.alopShare || '$0').replace('$', '')).value(), percentage);

        return this.formatter.format(op);
      },
    },
    damageTaxes: {
      get () {
        const percentage = new Decimal(2).div(100); // it can be raplced with .2
        const op = Decimal.mul(numeral((this.damageShare || '$0').replace('$', '')).value(), percentage);

        return this.formatter.format(op);
      },
    },
    alopTaxes: {
      get () {
        const percentage = new Decimal(2).div(100); // it can be raplced with .2
        const op = Decimal.mul(numeral((this.alopShare || '$0').replace('$', '')).value(), percentage);

        return this.formatter.format(op);
      },
    },
    damageEngFee: {
      get () {
        const percentage = new Decimal(2.5).div(100); // it can be raplced with .2
        const op = Decimal.mul(numeral((this.damageShare || '$0').replace('$', '')).value(), percentage);

        return this.formatter.format(op);
      },
    },
    alopEngFee: {
      get () {
        const percentage = new Decimal(2.5).div(100); // it can be raplced with .2
        const op = Decimal.mul(numeral((this.alopShare || '$0').replace('$', '')).value(), percentage);

        return this.formatter.format(op);
      },
    },
    damageFrontingFee: {
      get () {
        const percentage = new Decimal(5).div(100); // it can be raplced with .2
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
        const percentage = new Decimal(5).div(100); // it can be raplced with .2
        const op = new Decimal(numeral((this.alopShare || '$0').replace('$', '')).value())
          .sub(numeral((this.alopBrokerage || '$0').replace('$', '')).value())
          .sub(numeral((this.alopTaxes || '$0').replace('$', '')).value())
          .sub(numeral((this.alopEngFee || '$0').replace('$', '')).value());

        const mul = Decimal.mul(op, percentage);
        return this.formatter.format(mul);
      },
    },
    damagePremiumReserve: {
      get () {
        // if colombia selected add value
        const value = 0;
        const percentage = new Decimal(value).div(100); // it can be raplced with .2
        const op = Decimal.mul(numeral((this.damageShare || '$0').replace('$', '')).value(), percentage);

        return this.formatter.format(op);
      },
    },
    alopPremiumReserve: {
      get () {
        // if colombia selected add value
        const value = 0;
        const percentage = new Decimal(value).div(100); // it can be raplced with .2
        const op = Decimal.mul(numeral((this.damageShare || '$0').replace('$', '')).value(), percentage);

        return this.formatter.format(op);
      },
    },
    damageNet: {
      get () {
        const op = new Decimal(numeral((this.damageShare || '$0').replace('$', '')).value())
          .sub(numeral((this.damageBrokerage || '$0').replace('$', '')).value())
          .sub(numeral((this.damageTaxes || '$0').replace('$', '')).value())
          .sub(numeral((this.damageFrontingFee || '$0').replace('$', '')).value());

        const result = this.deductions.deductionType === 'At inception' ? op.minus(numeral((this.damageEngFee || '$0').replace('$', '')).value()) : op;

        return this.formatter.format(result);
      },
    },
    alopNet: {
      get () {
        const op = new Decimal(numeral((this.alopShare || '$0').replace('$', '')).value())
          .sub(numeral((this.alopBrokerage || '$0').replace('$', '')).value())
          .sub(numeral((this.alopTaxes || '$0').replace('$', '')).value())
          .sub(numeral((this.alopFrontingFee || '$0').replace('$', '')).value());

        const result = this.deductions.deductionType === 'At inception' ? op.minus(numeral((this.alopEngFee || '$0').replace('$', '')).value()) : op;

        return this.formatter.format(result);
      },
    },
    damageNetPremium: {
      get () {
        const op = new Decimal(numeral((this.damageShare || '$0').replace('$', '')).value())
          .sub(numeral((this.damageBrokerage || '$0').replace('$', '')).value())
          .sub(numeral((this.damageTaxes || '$0').replace('$', '')).value())
          .sub(numeral((this.damageFrontingFee || '$0').replace('$', '')).value());

        const result = this.deductions.deductionType === 'At inception' ? op.minus(numeral((this.damageEngFee || '$0').replace('$', '')).value()) : op;

        return this.formatter.format(result);
      },
    },
    alopNetPremium: {
      get () {
        const op = new Decimal(numeral((this.alopShare || '$0').replace('$', '')).value())
          .sub(numeral((this.alopBrokerage || '$0').replace('$', '')).value())
          .sub(numeral((this.alopTaxes || '$0').replace('$', '')).value())
          .sub(numeral((this.alopFrontingFee || '$0').replace('$', '')).value());

        const result = this.deductions.deductionType === 'At inception' ? op.minus(numeral((this.alopEngFee || '$0').replace('$', '')).value()) : op;

        return this.formatter.format(result);
      },
    },
    tivTotal: {
      get () {
        const op = Decimal.sum(
          numeral((this.newInsurancePolicy.damageTiv || '$0').replace('$', '')).value(),
          numeral((this.newInsurancePolicy.alopTiv || '$0').replace('$', '')).value()
        );

        return this.formatter.format(op);
      },
    },
    rateTotal: {
      get () {
        const op = Decimal.sum(
          numeral((this.newInsurancePolicy.damageRate || '$0').replace('$', '')).value(),
          numeral((this.newInsurancePolicy.alopRate || '$0').replace('$', '')).value()
        );

        return op;
      },
    },
    premiumTotal: {
      get () {
        const op = Decimal.sum(numeral((this.damagePremium || '$0').replace('$', '')).value(), numeral((this.alopPremium || '$0').replace('$', '')).value());

        return this.formatter.format(op);
      },
    },
    shareTotal: {
      get () {
        const op = Decimal.sum(numeral((this.damageShare || '$0').replace('$', '')).value(), numeral((this.alopShare || '$0').replace('$', '')).value());

        return this.formatter.format(op);
      },
    },
    brokerageTotal: {
      get () {
        const op = Decimal.sum(
          numeral((this.damageBrokerage || '$0').replace('$', '')).value(),
          numeral((this.alopBrokerage || '$0').replace('$', '')).value()
        );

        return this.formatter.format(op);
      },
    },
    taxesTotal: {
      get () {
        const op = Decimal.sum(numeral((this.damageTaxes || '$0').replace('$', '')).value(), numeral((this.alopTaxes || '$0').replace('$', '')).value());

        return this.formatter.format(op);
      },
    },
    engFeeTotal: {
      get () {
        const op = Decimal.sum(numeral((this.damageEngFee || '$0').replace('$', '')).value(), numeral((this.alopEngFee || '$0').replace('$', '')).value());

        return this.formatter.format(op);
      },
    },
    frontingFeeTotal: {
      get () {
        const op = Decimal.sum(
          numeral((this.damageFrontingFee || '$0').replace('$', '')).value(),
          numeral((this.alopFrontingFee || '$0').replace('$', '')).value()
        );

        return this.formatter.format(op);
      },
    },
    premiumReserveTotal: {
      get () {
        const op = Decimal.sum(
          numeral((this.damagePremiumReserve || '$0').replace('$', '')).value(),
          numeral((this.alopPremiumReserve || '$0').replace('$', '')).value()
        );

        return this.formatter.format(op);
      },
    },
    netTotal: {
      get () {
        const op = Decimal.sum(numeral((this.damageNet || '$0').replace('$', '')).value(), numeral((this.alopNet || '$0').replace('$', '')).value());

        return this.formatter.format(op);
      },
    },
    netPremiumTotal: {
      get () {
        const op = Decimal.sum(
          numeral((this.damageNetPremium || '$0').replace('$', '')).value(),
          numeral((this.alopNetPremium || '$0').replace('$', '')).value()
        );

        return this.formatter.format(op);
      },
    },
    ShowRateBtn () {
      return this.$route.name;
    },
  },
  watch: {
    damagePremium: debounce(function (val) {
      this.$v.newInsurancePolicy.damagePremium.$model = val;
      this.setInsurancePolicy({ index: this.currentIndex, key: 'damagePremium', value: val });
      this.checkField('damagePremium');
    }, 1000),
    alopPremium: debounce(function (val) {
      this.$v.newInsurancePolicy.alopPremium.$model = val;
      this.setInsurancePolicy({ index: this.currentIndex, key: 'alopPremium', value: val });
      this.checkField('alopPremium');
    }, 1000),
    damageShare: debounce(function (val) {
      this.$v.newInsurancePolicy.damageShare.$model = val;
      this.setInsurancePolicy({ index: this.currentIndex, key: 'damageShare', value: val });
      this.checkField('damageShare');
    }, 1000),
    alopShare: debounce(function (val) {
      this.$v.newInsurancePolicy.alopShare.$model = val;
      this.setInsurancePolicy({ index: this.currentIndex, key: 'alopShare', value: val });
      this.checkField('alopShare');
    }, 1000),
    damageBrokerage: debounce(function (val) {
      this.$v.newInsurancePolicy.damageBrokerage.$model = val;
      this.setInsurancePolicy({ index: this.currentIndex, key: 'damageBrokerage', value: val });
      this.checkField('damageBrokerage');
    }, 1000),
    alopBrokerage: debounce(function (val) {
      this.$v.newInsurancePolicy.alopBrokerage.$model = val;
      this.setInsurancePolicy({ index: this.currentIndex, key: 'alopBrokerage', value: val });
      this.checkField('alopBrokerage');
    }, 1000),
    damageTaxes: debounce(function (val) {
      this.$v.newInsurancePolicy.damageTaxes.$model = val;
      this.setInsurancePolicy({ index: this.currentIndex, key: 'damageTaxes', value: val });
      this.checkField('damageTaxes');
    }, 1000),
    alopTaxes: debounce(function (val) {
      this.$v.newInsurancePolicy.alopTaxes.$model = val;
      this.setInsurancePolicy({ index: this.currentIndex, key: 'alopTaxes', value: val });
      this.checkField('alopTaxes');
    }, 1000),
    damageEngFee: debounce(function (val) {
      this.$v.newInsurancePolicy.damageEngFee.$model = val;
      this.setInsurancePolicy({ index: this.currentIndex, key: 'damageEngFee', value: val });
      this.checkField('damageEngFee');
    }, 1000),
    alopEngFee: debounce(function (val) {
      this.$v.newInsurancePolicy.alopEngFee.$model = val;
      this.setInsurancePolicy({ index: this.currentIndex, key: 'alopEngFee', value: val });
      this.checkField('alopEngFee');
    }, 1000),
    damageFrontingFee: debounce(function (val) {
      this.$v.newInsurancePolicy.damageFrontingFee.$model = val;
      this.setInsurancePolicy({ index: this.currentIndex, key: 'damageFrontingFee', value: val });
      this.checkField('damageFrontingFee');
    }, 1000),
    alopFrontingFee: debounce(function (val) {
      this.$v.newInsurancePolicy.alopFrontingFee.$model = val;
      this.setInsurancePolicy({ index: this.currentIndex, key: 'alopFrontingFee', value: val });
      this.checkField('alopFrontingFee');
    }, 1000),
    damagePremiumReserve: debounce(function (val) {
      this.$v.newInsurancePolicy.damagePremiumReserve.$model = val;
      this.setInsurancePolicy({ index: this.currentIndex, key: 'damagePremiumReserve', value: val });
      this.checkField('damagePremiumReserve');
    }, 1000),
    alopPremiumReserve: debounce(function (val) {
      this.$v.newInsurancePolicy.alopPremiumReserve.$model = val;
      this.setInsurancePolicy({ index: this.currentIndex, key: 'alopPremiumReserve', value: val });
      this.checkField('alopPremiumReserve');
    }, 1000),
    damageNet: debounce(function (val) {
      this.$v.newInsurancePolicy.damageNet.$model = val;
      this.setInsurancePolicy({ index: this.currentIndex, key: 'damageNet', value: val });
      this.checkField('damageNet');
    }, 1000),
    alopNet: debounce(function (val) {
      this.$v.newInsurancePolicy.alopNet.$model = val;
      this.setInsurancePolicy({ index: this.currentIndex, key: 'alopNet', value: val });
      this.checkField('alopNet');
    }, 1000),
    damageNetPremium: debounce(function (val) {
      this.$v.newInsurancePolicy.damageNetPremium.$model = val;
      this.setInsurancePolicy({ index: this.currentIndex, key: 'damageNetPremium', value: val });
      this.checkField('damageNetPremium');
    }, 1000),
    alopNetPremium: debounce(function (val) {
      this.$v.newInsurancePolicy.alopNetPremium.$model = val;
      this.setInsurancePolicy({ index: this.currentIndex, key: 'alopNetPremium', value: val });
      this.checkField('alopNetPremium');
    }, 1000),
    tivTotal: debounce(function (val) {
      this.$v.newInsurancePolicy.tivTotal.$model = val;
      this.setInsurancePolicy({ index: this.currentIndex, key: 'tivTotal', value: val });
      this.checkField('tivTotal');
    }, 1000),
    rateTotal: debounce(function (val) {
      this.$v.newInsurancePolicy.rateTotal.$model = val;
      this.setInsurancePolicy({ index: this.currentIndex, key: 'rateTotal', value: val });
      this.checkField('rateTotal');
    }, 1000),
    premiumTotal: debounce(function (val) {
      this.$v.newInsurancePolicy.premiumTotal.$model = val;
      this.setInsurancePolicy({ index: this.currentIndex, key: 'premiumTotal', value: val });
      this.checkField('premiumTotal');
    }, 1000),
    shareTotal: debounce(function (val) {
      this.$v.newInsurancePolicy.shareTotal.$model = val;
      this.setInsurancePolicy({ index: this.currentIndex, key: 'shareTotal', value: val });
      this.checkField('shareTotal');
    }, 1000),
    brokerageTotal: debounce(function (val) {
      this.$v.newInsurancePolicy.brokerageTotal.$model = val;
      this.setInsurancePolicy({ index: this.currentIndex, key: 'brokerageTotal', value: val });
      this.checkField('brokerageTotal');
    }, 1000),
    taxesTotal: debounce(function (val) {
      this.$v.newInsurancePolicy.taxesTotal.$model = val;
      this.setInsurancePolicy({ index: this.currentIndex, key: 'taxesTotal', value: val });
      this.checkField('taxesTotal');
    }, 1000),
    engFeeTotal: debounce(function (val) {
      this.$v.newInsurancePolicy.engFeeTotal.$model = val;
      this.setInsurancePolicy({ index: this.currentIndex, key: 'engFeeTotal', value: val });
      this.checkField('engFeeTotal');
    }, 1000),
    frontingFeeTotal: debounce(function (val) {
      this.$v.newInsurancePolicy.frontingFeeTotal.$model = val;
      this.setInsurancePolicy({ index: this.currentIndex, key: 'frontingFeeTotal', value: val });
      this.checkField('frontingFeeTotal');
    }, 1000),
    premiumReserveTotal: debounce(function (val) {
      this.$v.newInsurancePolicy.premiumReserveTotal.$model = val;
      this.setInsurancePolicy({ index: this.currentIndex, key: 'premiumReserveTotal', value: val });
      this.checkField('premiumReserveTotal');
    }, 1000),
    netTotal: debounce(function (val) {
      this.$v.newInsurancePolicy.netTotal.$model = val;
      this.setInsurancePolicy({ index: this.currentIndex, key: 'netTotal', value: val });
      this.checkField('netTotal');
    }, 1000),
    netPremiumTotal: debounce(function (val) {
      this.$v.newInsurancePolicy.netPremiumTotal.$model = val;
      this.setInsurancePolicy({ index: this.currentIndex, key: 'netPremiumTotal', value: val });
      this.checkField('netPremiumTotal');
    }, 1000),
    'newInsurancePolicy.effectiveDateMovement': debounce(function (val) {
      this.$v.newInsurancePolicy.effectiveDateMovement.$model = val;
      this.setInsurancePolicy({ index: this.currentIndex, key: 'effectiveDateMovement', value: val });
      this.checkField('effectiveDateMovement');
    }, 1000),
    'newInsurancePolicy.movementEndDate': debounce(function (val) {
      this.$v.newInsurancePolicy.movementEndDate.$model = val;
      this.setInsurancePolicy({ index: this.currentIndex, key: 'movementEndDate', value: val });
      this.checkField('movementEndDate');
    }, 1000),
  },
  methods: {
    ...mapActions(['saveQuotationColumn', 'saveEndorsementColumn', 'getEndorsementInformation']),
    ...mapMutations(['setStateDeductions', 'setInsurancePolicy']),
    changeBrokerage (value) {
      console.log(value);
    },
    async checkDeductionsColumn (column) {
      this.$v.deductions[column].$touch();
      if (this.$v.deductions[column].$invalid) return;
      await this.saveQuotationColumn({ parent: 'deductions', column });
      this.sumDeductions();
    },
    async checkField (column) {
      this.$v.newInsurancePolicy[column].$touch();
      if (this.$v.newInsurancePolicy[column].$invalid) return;
      await this.saveEndorsementColumn({
        parent: 'newInsurancePolicy',
        column,
        id: this.currentId,
      });
    },
    sumDeductions () {
      const op =
        (!this.deductions.brokerage ? 0 : parseFloat(this.deductions.brokerage)) +
        (!this.deductions.fronting ? 0 : parseFloat(this.deductions.fronting)) +
        (!this.deductions.eng ? 0 : parseFloat(this.deductions.eng)) +
        (!this.deductions.taxes ? 0 : parseFloat(this.deductions.taxes)) +
        (!this.deductions.lta ? 0 : parseFloat(this.deductions.lta)) +
        (!this.deductions.others ? 0 : parseFloat(this.deductions.others));
      this.deductions.sum = op.toFixed(2);
    },
  },
  validations: {
    deductions: {
      brokerage: { required, DigitsAndDecimals, Percentage },
      taxes: { required, DigitsAndDecimals, Percentage },
      eng: { required, DigitsAndDecimals, Percentage },
      deductionType: { required },
      fronting: { required, DigitsAndDecimals, Percentage },
      premiumReserve: { required, DigitsAndDecimals, Percentage },
      lta: { required, DigitsAndDecimals, Percentage },
      others: { required, DigitsAndDecimals, Percentage },
    },
    newInsurancePolicy: {
      damageTiv: { required },
      damageRate: { required },
      alopTiv: { required },
      alopRate: { required },
      damagePremium: { required },
      alopPremium: { required },
      damageShare: { required },
      alopShare: { required },
      damageBrokerage: { required },
      alopBrokerage: { required },
      damageTaxes: { required },
      alopTaxes: { required },
      damageEngFee: { required },
      alopEngFee: { required },
      damageFrontingFee: { required },
      alopFrontingFee: { required },
      damagePremiumReserve: { required },
      alopPremiumReserve: { required },
      damageNet: { required },
      alopNet: { required },
      damageNetPremium: { required },
      alopNetPremium: { required },
      tivTotal: { required },
      rateTotal: { required },
      premiumTotal: { required },
      shareTotal: { required },
      brokerageTotal: { required },
      taxesTotal: { required },
      engFeeTotal: { required },
      frontingFeeTotal: { required },
      premiumReserveTotal: { required },
      netTotal: { required },
      netPremiumTotal: { required },
      effectiveDateMovement: { required },
      movementEndDate: { required },
    },
  },
};
</script>
<style lang="less" scoped>
@import '~@/assets/style/AccordionStyle.less';
@import '~@/assets/style/Subscription/Bound.less';
.TableSingle {
  margin-top: 0px;
}
</style>
