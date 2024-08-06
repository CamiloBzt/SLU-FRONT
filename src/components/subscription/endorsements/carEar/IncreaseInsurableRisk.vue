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
                    v-model="
                      $v.increaseInsurableRisk.effectiveDateMovement.$model
                    "
                    label="Effective Date Movement"
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="
                    $v.increaseInsurableRisk.effectiveDateMovement.$model
                  "
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
                    v-model="$v.increaseInsurableRisk.movementEndDate.$model"
                    label="Movement End Date"
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="$v.increaseInsurableRisk.movementEndDate.$model"
                  @input="menu2 = false"
                ></v-date-picker>
              </v-menu>
            </div>
            <div class="InputCont">
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
                    v-model="increaseInsurableRisk.premiumPaymentDate"
                    label="Premium Payment Date"
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="increaseInsurableRisk.premiumPaymentDate"
                  @input="menu3 = false"
                ></v-date-picker>
              </v-menu>
            </div>
          </div>

          <!--Movevement Value-->
          <h6 class="TitleInputs">Movement Value</h6>
          <div class="InputsCont d-flex justify-start flex-wrap">
            <div class="InputCont">
              <v-text-field
                label="Damage"
                prefix="$"
                v-model.trim="$v.increaseInsurableRisk.movementDamage.$model"
                @blur="
                  setIncreaseInsurableRisk({
                    index: currentIndex,
                    key: 'movementDamage',
                    value: $v.increaseInsurableRisk.movementDamage.$model,
                  });
                  checkField('movementDamage');
                "
                type="number"
              />
            </div>
            <div class="InputCont">
              <v-text-field
                label="ALOP"
                prefix="$"
                v-model.trim="$v.increaseInsurableRisk.movementAlop.$model"
                @blur="
                  setIncreaseInsurableRisk({
                    index: currentIndex,
                    key: 'movementAlop',
                    value: $v.increaseInsurableRisk.movementAlop.$model,
                  });
                  checkField('movementAlop');
                "
                type="number"
              />
            </div>
            <div class="InputCont">
              <v-text-field
                label="Stocks"
                prefix="$"
                v-model.trim="$v.increaseInsurableRisk.movementStocks.$model"
                @blur="
                  setIncreaseInsurableRisk({
                    index: currentIndex,
                    key: 'movementStocks',
                    value: $v.increaseInsurableRisk.movementStocks.$model,
                  });
                  checkField('movementStocks');
                "
                type="number"
              />
            </div>
          </div>

          <!--Total Values-->
          <h6 class="TitleInputs">Total Values</h6>
          <div class="InputsCont d-flex justify-start flex-wrap">
            <div class="InputCont">
              <v-text-field label="Damage" v-model="totalDamage" disabled />
            </div>
            <div class="InputCont">
              <v-text-field label="ALOP" v-model="totalAlop" disabled />
            </div>
            <div class="InputCont"></div>
          </div>

          <h6 class="TitleInputs mt-7">
            Increase insurable value / Inclusion risk Chart
          </h6>

          <!--PRIMER TABLA-->
          <div
            class="
              TableGeneralStyle
              d-flex
              flex-wrap
              align-start
              justify-center
            "
          >
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
                <v-text-field v-model="damageTivMovement" disabled />
              </div>
              <div class="Row">
                <v-text-field v-model="damageTiv" disabled />
              </div>
              <div class="MiniRow">
                <v-text-field v-model="damageRate" disabled placeholder="-" />
              </div>
              <div class="Row">
                <v-text-field v-model="damagePremium" disabled />
              </div>
            </div>

            <!--Valores de  Bi-->
            <div class="Line mt-2">
              <div class="Label">Alop</div>
              <div class="Row">
                <v-text-field v-model="alopTivMovement" disabled />
              </div>
              <div class="Row">
                <v-text-field v-model="alopTiv" disabled />
              </div>
              <div class="MiniRow">
                <v-text-field v-model="alopRate" disabled placeholder="-" />
              </div>
              <div class="Row">
                <v-text-field v-model="alopPremium" disabled />
              </div>
            </div>

            <!--Total-->
            <div class="TotalLine mt-3">
              <div class="Label Bold">Total</div>
              <div class="Row Bold">{{ tivMovementTotal }}</div>
              <div class="Row Bold">{{ tivTotal }}</div>
              <div class="MiniRow Bold">{{ rateTotal }}</div>
              <div class="Row Bold">{{ premiumTotal }}</div>
            </div>
          </div>

          <!--SEGUNDA TABLA-->
          <div
            class="
              TableGeneralStyle
              d-flex
              flex-wrap
              align-start
              justify-center
              mt-12
              Table3
            "
          >
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
                <v-text-field v-model="damagePremiumSlu" disabled />
              </div>
              <div class="Row">
                <v-text-field v-model="damageBrokerage" disabled />
              </div>
              <div class="Row">
                <v-text-field v-model="damageTaxes" disabled placeholder="-" />
              </div>
              <div class="Row">
                <v-text-field v-model="damageFrontingFee" disabled />
              </div>
            </div>

            <!--Valores de  Bi-->
            <div class="Line mt-2">
              <div class="Label">Alop</div>
              <div class="Row">
                <v-text-field v-model="alopPremiumSlu" disabled />
              </div>
              <div class="Row">
                <v-text-field v-model="alopBrokerage" disabled />
              </div>
              <div class="Row">
                <v-text-field v-model="alopTaxes" disabled placeholder="-" />
              </div>
              <div class="Row">
                <v-text-field v-model="alopFrontingFee" disabled />
              </div>
            </div>

            <!--Total-->
            <div class="TotalLine mt-3">
              <div class="Label Bold">Total</div>
              <div class="Row Bold">{{ premiumSluTotal }}</div>
              <div class="Row Bold">{{ brokerageTotal }}</div>
              <div class="Row Bold">{{ taxesTotal }}</div>
              <div class="Row Bold">{{ frontingFeeTotal }}</div>
            </div>
          </div>

          <!--TERCER TABLA-->
          <div
            class="
              TableGeneralStyle
              Table3
              d-flex
              flex-wrap
              align-start
              justify-center
              mt-12
            "
          >
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
                <v-text-field v-model="damageEngFee" disabled />
              </div>
              <div class="Row">
                <v-text-field v-model="damageReserve" disabled />
              </div>
              <div class="Row">
                <v-text-field v-model="damageNet" disabled placeholder="-" />
              </div>
              <div class="Row">
                <v-text-field v-model="damageNetPremium" disabled />
              </div>
            </div>

            <!--Valores de  Bi-->
            <div class="Line mt-2">
              <div class="Label">Alop</div>
              <div class="Row">
                <v-text-field v-model="alopEngFee" disabled />
              </div>
              <div class="Row">
                <v-text-field v-model="alopReserve" disabled />
              </div>
              <div class="Row">
                <v-text-field v-model="alopNet" disabled placeholder="-" />
              </div>
              <div class="Row">
                <v-text-field v-model="alopNetPremium" disabled />
              </div>
            </div>

            <!--Total-->
            <div class="TotalLine mt-3">
              <div class="Label Bold">Total</div>
              <div class="Row Bold">{{ engFeeTotal }}</div>
              <div class="Row Bold">{{ reserveTotal }}</div>
              <div class="Row Bold">{{ netTotal }}</div>
              <div class="Row Bold">{{ netPremiumTotal }}</div>
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
import { mapGetters, mapActions, mapMutations } from 'vuex';
/* mixins */
import { stateExpansiveManager } from '@/mixins/subscription.js';
/* components */
import FilesSubmission from '@/components/subscription/submission/FilesSubmission';
import EmailRichEditor from '@/components/Email/EmailRichEditor';
/* validations */
import { validationMixin } from 'vuelidate';
import { required } from 'vuelidate/lib/validators';
import { DigitsAndDecimals, Percentage } from '@/constants/validations';
import { formValidations } from '@/mixins/formValidations';
/* libs & helpers */
import Decimal from 'decimal.js';
import numeral from 'numeral';
/* lodash */
import { debounce } from 'lodash';
import * as moment from 'moment';

export default {
  name: 'IncreaseInsurableRisk',
  mixins: [stateExpansiveManager, formValidations, validationMixin],
  data() {
    return {
      menu: false,
      menu2: false,
      menu3: false,

      model1: '',
      model2: '',
      model3: '',

      formatter: new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }),
    };
  },
  props: {
    indexarr: {
      type: String | Number,
    },
  },
  components: {
    FilesSubmission,
    EmailRichEditor,
  },
  async mounted() {
    await this.getEndorsementInformation('increaseInsurable');
  },
  computed: {
    ...mapGetters(['deductions', 'endorsements']),
    ...mapGetters({
      increaseInsure: 'increaseInsurableRisk',
      insurancePolicy: 'newInsurancePolicy',
    }),
    increaseInsurableRisk: {
      get() {
        const current = this.endorsements[this.indexarr];
        const id = current['movementId'];
        const item = this.increaseInsure.findIndex((v) => v.id === id);
        return this.increaseInsure[item];
      },
    },
    newInsurancePolicy: {
      get() {
        const index = this.endorsements.findIndex((v) => v.movementType === 1);
        const id = this.endorsements[index]['movementId'];
        const item = this.insurancePolicy.findIndex((v) => v.id === id);
        return this.insurancePolicy[item];
      },
    },
    currentId: {
      get() {
        const current = this.endorsements[this.indexarr];
        const id = current['movementId'];
        return id;
      },
    },
    currentIndex: {
      get() {
        const current = this.endorsements[this.indexarr];
        const id = current['movementId'];
        const item = this.increaseInsure.findIndex((v) => v.id === id);
        return item;
      },
    },
    totalDamage: {
      get() {
        const op = Decimal.sum(
          numeral(
            (this.increaseInsurableRisk.movementDamage || '$0').replace('$', '')
          ).value(),
          numeral(
            (this.newInsurancePolicy.damageTiv || '$0').replace('$', '')
          ).value()
        );

        return this.formatter.format(op);
      },
    },
    totalAlop: {
      get() {
        const op = Decimal.sum(
          numeral(
            (this.increaseInsurableRisk.movementAlop || '$0').replace('$', '')
          ).value(),
          numeral(
            (this.newInsurancePolicy.alopTiv || '$0').replace('$', '')
          ).value()
        );

        return this.formatter.format(op);
      },
    },
    damageTivMovement: {
      get() {
        const value = numeral(
          (this.increaseInsurableRisk.movementDamage || '$0').replace('$', '')
        ).value();

        const op = Decimal(value);
        return this.formatter.format(op);
      },
    },
    damageTiv: {
      get() {
        const value = numeral(
          (this.totalDamage || '$0').replace('$', '')
        ).value();

        const op = Decimal(value);
        return this.formatter.format(op);
      },
    },
    damageRate: {
      get() {
        const value = numeral(
          (this.newInsurancePolicy.damageRate || '$0').replace('$', '')
        ).value();

        const op = Decimal(value);
        return op;
      },
    },
    damagePremium: {
      get() {
        const percentage = new Decimal(this.damageRate || 0);
        const op = Decimal.mul(
          percentage,
          numeral((this.damageTivMovement || '$0').replace('$', '')).value()
        ).div(1000);

        const effectiveDate = new Date(
          this.newInsurancePolicy.effectiveDateMovement || 0
        );
        const endDate = new Date(this.newInsurancePolicy.movementEndDate || 0);

        const effectiveDateIncrease = new Date(
          this.increaseInsurableRisk.effectiveDateMovement || 0
        );
        const endDateIncrease = new Date(
          this.increaseInsurableRisk.movementEndDate || 0
        );

        const dateSubs1 =
          (endDate.getTime() - effectiveDate.getTime()) / (1000 * 60 * 60 * 24);
        const dateSubs2 =
          (endDateIncrease.getTime() - effectiveDateIncrease.getTime()) /
          (1000 * 60 * 60 * 24);

        const div = Decimal.div(op, dateSubs1);
        const result = Decimal.mul(div, dateSubs2);

        return this.formatter.format(result);
      },
    },
    damagePremiumSlu: {
      get() {
        const percentage = Decimal.div(20, 100);
        const op = Decimal.mul(
          numeral((this.damagePremium || '$0').replace('$', '')).value() || 0,
          percentage
        );

        return this.formatter.format(op);
      },
    },
    damageBrokerage: {
      get() {
        const percentage = Decimal.div(10, 100);
        const op = Decimal.mul(
          numeral((this.damagePremiumSlu || '$0').replace('$', '')).value() ||
            0,
          percentage
        );

        return this.formatter.format(op);
      },
    },
    damageTaxes: {
      get() {
        const percentage = Decimal.div(2, 100);
        const op = Decimal.mul(
          numeral((this.damagePremiumSlu || '$0').replace('$', '')).value() ||
            0,
          percentage
        );

        return this.formatter.format(op);
      },
    },
    damageFrontingFee: {
      get() {
        const percentage = new Decimal(5).div(100); // it can be raplced with .2
        const op = new Decimal(
          numeral((this.damagePremiumSlu || '$0').replace('$', '')).value() || 0
        )
          .sub(
            numeral((this.damageBrokerage || '$0').replace('$', '')).value() ||
              0
          )
          .sub(
            numeral((this.damageTaxes || '$0').replace('$', '')).value() || 0
          )
          .sub(
            numeral((this.damageEngFee || '$0').replace('$', '')).value() || 0
          );

        const mul = Decimal.mul(op, percentage);
        return this.formatter.format(mul);
      },
    },
    damageEngFee: {
      get() {
        const percentage = Decimal.div(2.5, 100);
        const op = Decimal.mul(
          numeral((this.damagePremiumSlu || '$0').replace('$', '')).value() ||
            0,
          percentage
        );

        return this.formatter.format(op);
      },
    },
    damageReserve: {
      get() {
        const percentage = 0;
        const op = Decimal.mul(
          numeral((this.damagePremiumSlu || '$0').replace('$', '')).value() ||
            0,
          percentage
        );

        return this.formatter.format(op);
      },
    },
    damageNet: {
      get() {
        const op = new Decimal(
          numeral((this.damagePremiumSlu || '$0').replace('$', '')).value()
        )
          .sub(numeral((this.damageBrokerage || '$0').replace('$', '')).value())
          .sub(numeral((this.damageTaxes || '$0').replace('$', '')).value())
          .sub(
            numeral((this.damageFrontingFee || '$0').replace('$', '')).value()
          );

        const result =
          this.deductions.deductionType === 'At inception'
            ? op.minus(
                numeral((this.damageEngFee || '$0').replace('$', '')).value()
              )
            : op;

        return this.formatter.format(result);
      },
    },
    damageNetPremium: {
      get() {
        const op = new Decimal(
          numeral((this.damagePremiumSlu || '$0').replace('$', '')).value()
        )
          .sub(numeral((this.damageBrokerage || '$0').replace('$', '')).value())
          .sub(numeral((this.damageTaxes || '$0').replace('$', '')).value())
          .sub(
            numeral((this.damageFrontingFee || '$0').replace('$', '')).value()
          );

        const result =
          this.deductions.deductionType === 'At inception'
            ? op.minus(
                numeral((this.damageEngFee || '$0').replace('$', '')).value()
              )
            : op;

        return this.formatter.format(result);
      },
    },
    alopTivMovement: {
      get() {
        const value = numeral(
          (this.increaseInsurableRisk.movementAlop || '$0').replace('$', '')
        ).value();

        const op = Decimal(value);
        return this.formatter.format(op);
      },
    },
    alopTiv: {
      get() {
        const value = numeral(
          (this.totalAlop || '$0').replace('$', '')
        ).value();

        const op = Decimal(value);
        return this.formatter.format(op);
      },
    },
    alopRate: {
      get() {
        const value = numeral(
          (this.newInsurancePolicy.alopRate || '$0').replace('$', '')
        ).value();

        const op = Decimal(value);
        return op;
      },
    },
    alopPremium: {
      get() {
        const percentage = new Decimal(this.alopRate || 0);
        const op = Decimal.mul(
          percentage,
          numeral((this.alopTivMovement || '$0').replace('$', '')).value()
        ).div(1000);

        const effectiveDate = new Date(
          this.newInsurancePolicy.effectiveDateMovement || 0
        );
        const endDate = new Date(this.newInsurancePolicy.movementEndDate || 0);

        const effectiveDateIncrease = new Date(
          this.increaseInsurableRisk.effectiveDateMovement || 0
        );
        const endDateIncrease = new Date(
          this.increaseInsurableRisk.movementEndDate || 0
        );

        const dateSubs1 =
          (endDate.getTime() - effectiveDate.getTime()) / (1000 * 60 * 60 * 24);
        const dateSubs2 =
          (endDateIncrease.getTime() - effectiveDateIncrease.getTime()) /
          (1000 * 60 * 60 * 24);

        const div = Decimal.div(op, dateSubs1);
        const result = Decimal.mul(div, dateSubs2);

        return this.formatter.format(result);
      },
    },
    alopPremiumSlu: {
      get() {
        const percentage = Decimal.div(20, 100);
        const op = Decimal.mul(
          numeral((this.alopPremium || '$0').replace('$', '')).value() || 0,
          percentage
        );

        return this.formatter.format(op);
      },
    },
    alopBrokerage: {
      get() {
        const percentage = Decimal.div(10, 100);
        const op = Decimal.mul(
          numeral((this.alopPremiumSlu || '$0').replace('$', '')).value() || 0,
          percentage
        );

        return this.formatter.format(op);
      },
    },
    alopTaxes: {
      get() {
        const percentage = Decimal.div(2, 100);
        const op = Decimal.mul(
          numeral((this.alopPremiumSlu || '$0').replace('$', '')).value() || 0,
          percentage
        );

        return this.formatter.format(op);
      },
    },
    alopFrontingFee: {
      get() {
        const percentage = new Decimal(5).div(100); // it can be raplced with .2
        const op = new Decimal(
          numeral((this.alopPremiumSlu || '$0').replace('$', '')).value() || 0
        )
          .sub(
            numeral((this.alopBrokerage || '$0').replace('$', '')).value() || 0
          )
          .sub(numeral((this.alopTaxes || '$0').replace('$', '')).value() || 0)
          .sub(
            numeral((this.alopEngFee || '$0').replace('$', '')).value() || 0
          );

        const mul = Decimal.mul(op, percentage);
        return this.formatter.format(mul);
      },
    },
    alopEngFee: {
      get() {
        const percentage = Decimal.div(2.5, 100);
        const op = Decimal.mul(
          numeral((this.alopPremiumSlu || '$0').replace('$', '')).value() || 0,
          percentage
        );

        return this.formatter.format(op);
      },
    },
    alopReserve: {
      get() {
        const percentage = 0;
        const op = Decimal.mul(
          numeral((this.alopPremiumSlu || '$0').replace('$', '')).value() || 0,
          percentage
        );

        return this.formatter.format(op);
      },
    },
    alopNet: {
      get() {
        const op = new Decimal(
          numeral((this.alopPremiumSlu || '$0').replace('$', '')).value()
        )
          .sub(numeral((this.alopBrokerage || '$0').replace('$', '')).value())
          .sub(numeral((this.alopTaxes || '$0').replace('$', '')).value())
          .sub(
            numeral((this.alopFrontingFee || '$0').replace('$', '')).value()
          );

        const result =
          this.deductions.deductionType === 'At inception'
            ? op.minus(
                numeral((this.alopEngFee || '$0').replace('$', '')).value()
              )
            : op;

        return this.formatter.format(result);
      },
    },
    alopNetPremium: {
      get() {
        const op = new Decimal(
          numeral((this.alopPremiumSlu || '$0').replace('$', '')).value()
        )
          .sub(numeral((this.alopBrokerage || '$0').replace('$', '')).value())
          .sub(numeral((this.alopTaxes || '$0').replace('$', '')).value())
          .sub(
            numeral((this.alopFrontingFee || '$0').replace('$', '')).value()
          );

        const result =
          this.deductions.deductionType === 'At inception'
            ? op.minus(
                numeral((this.alopEngFee || '$0').replace('$', '')).value()
              )
            : op;

        return this.formatter.format(result);
      },
    },
    tivMovementTotal: {
      get() {
        const op = Decimal.sum(
          numeral((this.damageTivMovement || '$0').replace('$', '')).value(),
          numeral((this.alopTivMovement || '$0').replace('$', '')).value()
        );
        return this.formatter.format(op);
      },
    },
    tivTotal: {
      get() {
        const op = Decimal.sum(
          numeral((this.damageTiv || '$0').replace('$', '')).value(),
          numeral((this.alopTiv || '$0').replace('$', '')).value()
        );
        return this.formatter.format(op);
      },
    },
    rateTotal: {
      get() {
        const op = Decimal.sum(this.damageRate || 0, this.alopRate || 0);
        return op;
      },
    },
    premiumTotal: {
      get() {
        const op = Decimal.sum(
          numeral((this.damagePremium || '$0').replace('$', '')).value() || 0,
          numeral((this.alopPremium || '$0').replace('$', '')).value() || 0
        );
        return this.formatter.format(op);
      },
    },
    premiumSluTotal: {
      get() {
        const op = Decimal.sum(
          numeral((this.damagePremiumSlu || '$0').replace('$', '')).value() ||
            0,
          numeral((this.alopPremiumSlu || '$0').replace('$', '')).value() || 0
        );
        return this.formatter.format(op);
      },
    },
    brokerageTotal: {
      get() {
        const op = Decimal.sum(
          numeral((this.damageBrokerage || '$0').replace('$', '')).value() || 0,
          numeral((this.alopBrokerage || '$0').replace('$', '')).value() || 0
        );
        return this.formatter.format(op);
      },
    },
    taxesTotal: {
      get() {
        const op = Decimal.sum(
          numeral((this.damageTaxes || '$0').replace('$', '')).value() || 0,
          numeral((this.alopTaxes || '$0').replace('$', '')).value() || 0
        );
        return this.formatter.format(op);
      },
    },
    frontingFeeTotal: {
      get() {
        const op = Decimal.sum(
          numeral((this.damageFrontingFee || '$0').replace('$', '')).value() ||
            0,
          numeral((this.alopFrontingFee || '$0').replace('$', '')).value() || 0
        );
        return this.formatter.format(op);
      },
    },
    engFeeTotal: {
      get() {
        const op = Decimal.sum(
          numeral((this.damageEngFee || '$0').replace('$', '')).value() || 0,
          numeral((this.alopEngFee || '$0').replace('$', '')).value() || 0
        );
        return this.formatter.format(op);
      },
    },
    reserveTotal: {
      get() {
        const op = Decimal.sum(
          numeral((this.damageReserve || '$0').replace('$', '')).value() || 0,
          numeral((this.alopReserve || '$0').replace('$', '')).value() || 0
        );
        return this.formatter.format(op);
      },
    },
    netTotal: {
      get() {
        const op = Decimal.sum(
          numeral((this.damageNet || '$0').replace('$', '')).value() || 0,
          numeral((this.alopNet || '$0').replace('$', '')).value() || 0
        );
        return this.formatter.format(op);
      },
    },
    netPremiumTotal: {
      get() {
        const op = Decimal.sum(
          numeral((this.damageNetPremium || '$0').replace('$', '')).value() ||
            0,
          numeral((this.alopNetPremium || '$0').replace('$', '')).value() || 0
        );
        return this.formatter.format(op);
      },
    },
    signature: {
      get() {
        return this.increaseInsurableRisk.signature || '';
      },
    },
    support: {
      get() {
        return this.increaseInsurableRisk.support || '';
      },
    },
  },
  watch: {
    totalDamage: debounce(function (val) {
      this.$v.increaseInsurableRisk.totalDamage.$model = val;
      this.setIncreaseInsurableRisk({
        index: this.currentIndex,
        key: 'totalDamage',
        value: val,
      });
      this.checkField('totalDamage');
    }, 1000),
    totalAlop: debounce(function (val) {
      this.$v.increaseInsurableRisk.totalAlop.$model = val;
      this.setIncreaseInsurableRisk({
        index: this.currentIndex,
        key: 'totalAlop',
        value: val,
      });
      this.checkField('totalAlop');
    }, 1000),
    damageTivMovement: debounce(function (val) {
      this.$v.increaseInsurableRisk.damageTivMovement.$model = val;
      this.setIncreaseInsurableRisk({
        index: this.currentIndex,
        key: 'damageTivMovement',
        value: val,
      });
      this.checkField('damageTivMovement');
    }, 1000),
    damageTiv: debounce(function (val) {
      this.$v.increaseInsurableRisk.damageTiv.$model = val;
      this.setIncreaseInsurableRisk({
        index: this.currentIndex,
        key: 'damageTiv',
        value: val,
      });
      this.checkField('damageTiv');
    }, 1000),
    damageRate: debounce(function (val) {
      this.$v.increaseInsurableRisk.damageRate.$model = val;
      this.setIncreaseInsurableRisk({
        index: this.currentIndex,
        key: 'damageRate',
        value: val,
      });
      this.checkField('damageRate');
    }, 1000),
    damagePremium: debounce(function (val) {
      this.$v.increaseInsurableRisk.damagePremium.$model = val;
      this.setIncreaseInsurableRisk({
        index: this.currentIndex,
        key: 'damagePremium',
        value: val,
      });
      this.checkField('damagePremium');
    }, 1000),
    damagePremiumSlu: debounce(function (val) {
      this.$v.increaseInsurableRisk.damagePremiumSlu.$model = val;
      this.setIncreaseInsurableRisk({
        index: this.currentIndex,
        key: 'damagePremiumSlu',
        value: val,
      });
      this.checkField('damagePremiumSlu');
    }, 1000),
    damageBrokerage: debounce(function (val) {
      this.$v.increaseInsurableRisk.damageBrokerage.$model = val;
      this.setIncreaseInsurableRisk({
        index: this.currentIndex,
        key: 'damageBrokerage',
        value: val,
      });
      this.checkField('damageBrokerage');
    }, 1000),
    damageTaxes: debounce(function (val) {
      this.$v.increaseInsurableRisk.damageTaxes.$model = val;
      this.setIncreaseInsurableRisk({
        index: this.currentIndex,
        key: 'damageTaxes',
        value: val,
      });
      this.checkField('damageTaxes');
    }, 1000),
    damageFrontingFee: debounce(function (val) {
      this.$v.increaseInsurableRisk.damageFrontingFee.$model = val;
      this.setIncreaseInsurableRisk({
        index: this.currentIndex,
        key: 'damageFrontingFee',
        value: val,
      });
      this.checkField('damageFrontingFee');
    }, 1000),
    damageEngFee: debounce(function (val) {
      this.$v.increaseInsurableRisk.damageEngFee.$model = val;
      this.setIncreaseInsurableRisk({
        index: this.currentIndex,
        key: 'damageEngFee',
        value: val,
      });
      this.checkField('damageEngFee');
    }, 1000),
    damageReserve: debounce(function (val) {
      this.$v.increaseInsurableRisk.damageReserve.$model = val;
      this.setIncreaseInsurableRisk({
        index: this.currentIndex,
        key: 'damageReserve',
        value: val,
      });
      this.checkField('damageReserve');
    }, 1000),
    damageNet: debounce(function (val) {
      this.$v.increaseInsurableRisk.damageNet.$model = val;
      this.setIncreaseInsurableRisk({
        index: this.currentIndex,
        key: 'damageNet',
        value: val,
      });
      this.checkField('damageNet');
    }, 1000),
    damageNetPremium: debounce(function (val) {
      this.$v.increaseInsurableRisk.damageNetPremium.$model = val;
      this.setIncreaseInsurableRisk({
        index: this.currentIndex,
        key: 'damageNetPremium',
        value: val,
      });
      this.checkField('damageNetPremium');
    }, 1000),
    alopTivMovement: debounce(function (val) {
      this.$v.increaseInsurableRisk.alopTivMovement.$model = val;
      this.setIncreaseInsurableRisk({
        index: this.currentIndex,
        key: 'alopTivMovement',
        value: val,
      });
      this.checkField('alopTivMovement');
    }, 1000),
    alopTiv: debounce(function (val) {
      this.$v.increaseInsurableRisk.alopTiv.$model = val;
      this.setIncreaseInsurableRisk({
        index: this.currentIndex,
        key: 'alopTiv',
        value: val,
      });
      this.checkField('alopTiv');
    }, 1000),
    alopRate: debounce(function (val) {
      this.$v.increaseInsurableRisk.alopRate.$model = val;
      this.setIncreaseInsurableRisk({
        index: this.currentIndex,
        key: 'alopRate',
        value: val,
      });
      this.checkField('alopRate');
    }, 1000),
    alopPremium: debounce(function (val) {
      this.$v.increaseInsurableRisk.alopPremium.$model = val;
      this.setIncreaseInsurableRisk({
        index: this.currentIndex,
        key: 'alopPremium',
        value: val,
      });
      this.checkField('alopPremium');
    }, 1000),
    alopPremiumSlu: debounce(function (val) {
      this.$v.increaseInsurableRisk.alopPremiumSlu.$model = val;
      this.setIncreaseInsurableRisk({
        index: this.currentIndex,
        key: 'alopPremiumSlu',
        value: val,
      });
      this.checkField('alopPremiumSlu');
    }, 1000),
    alopBrokerage: debounce(function (val) {
      this.$v.increaseInsurableRisk.alopBrokerage.$model = val;
      this.setIncreaseInsurableRisk({
        index: this.currentIndex,
        key: 'alopBrokerage',
        value: val,
      });
      this.checkField('alopBrokerage');
    }, 1000),
    alopTaxes: debounce(function (val) {
      this.$v.increaseInsurableRisk.alopTaxes.$model = val;
      this.setIncreaseInsurableRisk({
        index: this.currentIndex,
        key: 'alopTaxes',
        value: val,
      });
      this.checkField('alopTaxes');
    }, 1000),
    alopFrontingFee: debounce(function (val) {
      this.$v.increaseInsurableRisk.alopFrontingFee.$model = val;
      this.setIncreaseInsurableRisk({
        index: this.currentIndex,
        key: 'alopFrontingFee',
        value: val,
      });
      this.checkField('alopFrontingFee');
    }, 1000),
    alopEngFee: debounce(function (val) {
      this.$v.increaseInsurableRisk.alopEngFee.$model = val;
      this.setIncreaseInsurableRisk({
        index: this.currentIndex,
        key: 'alopEngFee',
        value: val,
      });
      this.checkField('alopEngFee');
    }, 1000),
    alopReserve: debounce(function (val) {
      this.$v.increaseInsurableRisk.alopReserve.$model = val;
      this.setIncreaseInsurableRisk({
        index: this.currentIndex,
        key: 'alopReserve',
        value: val,
      });
      this.checkField('alopReserve');
    }, 1000),
    alopNet: debounce(function (val) {
      this.$v.increaseInsurableRisk.alopNet.$model = val;
      this.setIncreaseInsurableRisk({
        index: this.currentIndex,
        key: 'alopNet',
        value: val,
      });
      this.checkField('alopNet');
    }, 1000),
    alopNetPremium: debounce(function (val) {
      this.$v.increaseInsurableRisk.alopNetPremium.$model = val;
      this.setIncreaseInsurableRisk({
        index: this.currentIndex,
        key: 'alopNetPremium',
        value: val,
      });
      this.checkField('alopNetPremium');
    }, 1000),
    tivMovementTotal: debounce(function (val) {
      this.$v.increaseInsurableRisk.tivMovementTotal.$model = val;
      this.setIncreaseInsurableRisk({
        index: this.currentIndex,
        key: 'tivMovementTotal',
        value: val,
      });
      this.checkField('tivMovementTotal');
    }, 1000),
    tivTotal: debounce(function (val) {
      this.$v.increaseInsurableRisk.tivTotal.$model = val;
      this.setIncreaseInsurableRisk({
        index: this.currentIndex,
        key: 'tivTotal',
        value: val,
      });
      this.checkField('tivTotal');
    }, 1000),
    rateTotal: debounce(function (val) {
      this.$v.increaseInsurableRisk.rateTotal.$model = val;
      this.setIncreaseInsurableRisk({
        index: this.currentIndex,
        key: 'rateTotal',
        value: val,
      });
      this.checkField('rateTotal');
    }, 1000),
    premiumTotal: debounce(function (val) {
      this.$v.increaseInsurableRisk.premiumTotal.$model = val;
      this.setIncreaseInsurableRisk({
        index: this.currentIndex,
        key: 'premiumTotal',
        value: val,
      });
      this.checkField('premiumTotal');
    }, 1000),
    premiumSluTotal: debounce(function (val) {
      this.$v.increaseInsurableRisk.premiumSluTotal.$model = val;
      this.setIncreaseInsurableRisk({
        index: this.currentIndex,
        key: 'premiumSluTotal',
        value: val,
      });
      this.checkField('premiumSluTotal');
    }, 1000),
    brokerageTotal: debounce(function (val) {
      this.$v.increaseInsurableRisk.brokerageTotal.$model = val;
      this.setIncreaseInsurableRisk({
        index: this.currentIndex,
        key: 'brokerageTotal',
        value: val,
      });
      this.checkField('brokerageTotal');
    }, 1000),
    taxesTotal: debounce(function (val) {
      this.$v.increaseInsurableRisk.taxesTotal.$model = val;
      this.setIncreaseInsurableRisk({
        index: this.currentIndex,
        key: 'taxesTotal',
        value: val,
      });
      this.checkField('taxesTotal');
    }, 1000),
    frontingFeeTotal: debounce(function (val) {
      this.$v.increaseInsurableRisk.frontingFeeTotal.$model = val;
      this.setIncreaseInsurableRisk({
        index: this.currentIndex,
        key: 'frontingFeeTotal',
        value: val,
      });
      this.checkField('frontingFeeTotal');
    }, 1000),
    engFeeTotal: debounce(function (val) {
      this.$v.increaseInsurableRisk.engFeeTotal.$model = val;
      this.setIncreaseInsurableRisk({
        index: this.currentIndex,
        key: 'engFeeTotal',
        value: val,
      });
      this.checkField('engFeeTotal');
    }, 1000),
    reserveTotal: debounce(function (val) {
      this.$v.increaseInsurableRisk.reserveTotal.$model = val;
      this.setIncreaseInsurableRisk({
        index: this.currentIndex,
        key: 'reserveTotal',
        value: val,
      });
      this.checkField('reserveTotal');
    }, 1000),
    netTotal: debounce(function (val) {
      this.$v.increaseInsurableRisk.netTotal.$model = val;
      this.setIncreaseInsurableRisk({
        index: this.currentIndex,
        key: 'netTotal',
        value: val,
      });
      this.checkField('netTotal');
    }, 1000),
    netPremiumTotal: debounce(function (val) {
      this.$v.increaseInsurableRisk.netPremiumTotal.$model = val;
      this.setIncreaseInsurableRisk({
        index: this.currentIndex,
        key: 'netPremiumTotal',
        value: val,
      });
      this.checkField('netPremiumTotal');
    }, 1000),
    'increaseInsurableRisk.effectiveDateMovement': debounce(function (val) {
      this.$v.increaseInsurableRisk.effectiveDateMovement.$model = val;
      this.setIncreaseInsurableRisk({
        index: this.currentIndex,
        key: 'effectiveDateMovement',
        value: val,
      });
      this.checkField('effectiveDateMovement');
    }, 1000),
    'increaseInsurableRisk.movementEndDate': debounce(function (val) {
      this.$v.increaseInsurableRisk.movementEndDate.$model = val;
      this.setIncreaseInsurableRisk({
        index: this.currentIndex,
        key: 'movementEndDate',
        value: val,
      });
      this.checkField('movementEndDate');
    }, 1000),
    'increaseInsurableRisk.premiumPaymentDate': debounce(function (val) {
      this.$v.increaseInsurableRisk.premiumPaymentDate.$model = val;
      this.setIncreaseInsurableRisk({
        index: this.currentIndex,
        key: 'premiumPaymentDate',
        value: val,
      });
      this.checkField('premiumPaymentDate');
    }, 1000),
  },
  methods: {
    ...mapActions([
      'saveQuotationColumn',
      'saveEndorsementColumn',
      'getEndorsementInformation',
    ]),
    ...mapMutations(['setIncreaseInsurableRisk']),
    async checkField(column) {
      this.$v.increaseInsurableRisk[column].$touch();
      if (this.$v.increaseInsurableRisk[column].$invalid) return;
      await this.saveEndorsementColumn({
        table: 'increaseInsurable',
        parent: 'increaseInsurableRisk',
        column,
        id: this.currentId,
      });
    },
    async updateDoc(column, value) {
      this.$v.increaseInsurableRisk[column].$model = value;
      this.setIncreaseInsurableRisk({
        index: this.currentIndex,
        key: column,
        value,
      });
      await this.checkField(column);
    },
    dateValue(value) {
      const valid = moment(value, 'YYYY-MM-DD', true).isValid();
      if (valid) return value;
      return 0;
    },
  },
  validations: {
    increaseInsurableRisk: {
      movementDamage: { required },
      movementAlop: { required },
      movementStocks: { required },
      totalDamage: { required },
      totalAlop: { required },
      damageTiv: { required },
      damageTivMovement: { required },
      damageRate: { required },
      damageReserve: { required },
      alopTiv: { required },
      alopTivMovement: { required },
      alopRate: { required },
      alopReserve: { required },
      damagePremium: { required },
      damagePremiumSlu: { required },
      alopPremium: { required },
      alopPremiumSlu: { required },
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
      damageNet: { required },
      alopNet: { required },
      damageNetPremium: { required },
      alopNetPremium: { required },
      tivTotal: { required },
      tivMovementTotal: { required },
      rateTotal: { required },
      premiumTotal: { required },
      premiumSluTotal: { required },
      shareTotal: { required },
      brokerageTotal: { required },
      taxesTotal: { required },
      engFeeTotal: { required },
      frontingFeeTotal: { required },
      reserveTotal: { required },
      netTotal: { required },
      netPremiumTotal: { required },
      effectiveDateMovement: { required },
      movementEndDate: { required },
      premiumPaymentDate: { required },
      signature: { required },
      support: { required },
    },
  },
};
</script>
<style lang="less" scoped>
@import '~@/assets/style/AccordionStyle.less';
@import '~@/assets/style/Subscription/Bound.less';
/*Tablas*/
/*
  Validar don Yesi si se deben usar estos estilos
  de ser asi cambiar clase TableGeneralStyle por Table
.Table {
  width: 70%;
  height: auto;

  //Cabecera
  .Head {
    width: 100%;
    height: 70px;
    border-bottom: solid 1px #d2deed;
  }

  //Valores
  .Line {
    .flex();
    justify-content: space-between;
    width: 100%;
    height: auto;

    .Row,
    .MiniRow {
      align-content: flex-end !important;
      align-items: flex-end !important;
    }
  }

  //Total
  .TotalLine {
    .flex();
    justify-content: space-between;
    width: 100%;
    height: 70px;
    border-top: solid 1px #d2deed;
    border-bottom: solid 1px #d2deed;
    .Row,
    .MiniRow {
      justify-content: flex-start;
      text-align: left;
    }
  }

  .Label {
    .flex();
    width: 8%;
    height: 100%;
    justify-content: flex-end;
    text-align: right;
    color: #547fa9;
  }

  .Row {
    .flex();
    width: 24.33%;
    height: 100%;
  }

  .MiniRow {
    .flex();
    width: 11%;
    height: 100%;
  }

  .Bold {
    font-weight: 700;
  }
}
*/
</style>
