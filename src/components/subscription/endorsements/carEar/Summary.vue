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
            <div class="SubExpansionTitle">Summary</div>
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
                    v-model="$v.endorsementsSummary.effectiveDateMovement.$model"
                    label="Effective Date Movement"
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="$v.endorsementsSummary.effectiveDateMovement.$model"
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
                    v-model="$v.endorsementsSummary.movementEndDate.$model"
                    label="Movement End Date"
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="$v.endorsementsSummary.movementEndDate.$model"
                  @input="menu2 = false"
                ></v-date-picker>
              </v-menu>
            </div>
          </div>

          <!--Tabla-->
          <div class="TableSingle">
            <div class="Line">
              <div class="Label">Brokerage</div>
              <div class="Row">
                <v-text-field
                  v-model="reductionOfInsurableValue.brokerage"
                  disabled
                />
              </div>
              <div class="RightRow" />
            </div>

            <div class="Line">
              <div class="Label">Tax</div>
              <div class="Row">
                <v-text-field
                  v-model="reductionOfInsurableValue.taxes"
                  disabled
                />
              </div>
              <div class="RightRow" />
            </div>

            <div class="Line">
              <div class="Label">Fronting</div>
              <div class="Row">
                <v-text-field
                  v-model="reductionOfInsurableValue.frontingFee"
                  disabled
                />
              </div>
              <div class="RightRow" />
            </div>

            <div class="Line">
              <div class="Label">Engeneering Fee</div>
              <div class="Row">
                <v-text-field
                  v-model="reductionOfInsurableValue.engFee"
                  disabled
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
                  v-model.trim="$v.endorsementsSummary.reserve.$model"
                  @blur="
                    setEndorsementsSummary({ index: currentIndex, key: 'reserve', value: $v.endorsementsSummary.reserve.$model });
                    checkField('reserve');
                  "
                  type="number"
                />
              </div>
              <div class="RightRow" />
            </div>
          </div>

          <!--SummaryChart-->
          <div
            class="TitleCont d-flex justify-start align-center flex-wrap mt-12"
          >
            <h5>Summary Chart</h5>
          </div>
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
              <div class="Row Bold">TIV</div>
              <div class="MiniRow Bold">Rate</div>
              <div class="Row Bold">Premium 100%</div>
              <div class="Row Bold">
                SLU Share {{ changeOfShare.newShare || 0 }}%
              </div>
            </div>

            <!-- Valores Damage-->
            <div class="Line mt-3">
              <div class="Label">Damage</div>
              <div class="Row">
                <v-text-field v-model="damageTiv" disabled />
              </div>
              <div class="MiniRow">
                <v-text-field v-model="damageRate" disabled placeholder="-" />
              </div>
              <div class="Row">
                <v-text-field v-model="damagePremium" disabled />
              </div>
              <div class="Row">
                <v-text-field v-model="damageShare" disabled />
              </div>
            </div>

            <!--Valores de  Bi-->
            <div class="Line mt-2">
              <div class="Label">Alop</div>
              <div class="Row">
                <v-text-field v-model="alopTiv" disabled />
              </div>
              <div class="MiniRow">
                <v-text-field v-model="alopRate" disabled placeholder="-" />
              </div>
              <div class="Row">
                <v-text-field v-model="alopPremium" disabled />
              </div>
              <div class="Row">
                <v-text-field v-model="alopShare" disabled />
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
              <div class="Row Bold text-center">Brokerage 10%</div>
              <div class="Row Bold text-center">Taxes 2%</div>
              <div class="Row Bold text-center">
                Engineering Fees <br />2.5%
              </div>
              <div class="Row Bold text-center">Fronting Fee 5%</div>
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

            <!--Valores de  Bi-->
            <div class="Line mt-2">
              <div class="Label">Alop</div>
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
          <div
            class="
              MiniTableGeneralStyle
              d-flex
              flex-wrap
              align-start
              justify-center
              mt-12
            "
          >
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
                <v-text-field v-model="damagePremiumReserve" disabled />
              </div>
              <div class="Row">
                <v-text-field v-model="damageNet" disabled />
              </div>
              <div class="Row">
                <v-text-field v-model="damageNetPremium" disabled />
              </div>
            </div>

            <!--Valores de  Bi-->
            <div class="Line mt-2">
              <div class="Label">Alop</div>
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
import { mapActions, mapGetters, mapMutations } from 'vuex';
import { stateExpansiveManager } from '@/mixins/subscription.js';
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
export default {
  name: 'Summary',
  mixins: [stateExpansiveManager, formValidations, validationMixin],
  data() {
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
  props: {
    indexarr: {
      type: String | Number,
    },
  },
  computed: {
    ...mapGetters(['deductions', 'endorsements']),
    ...mapGetters({
      endSummary: 'endorsementsSummary',
      reductInsure: 'reductionOfInsurableValue',
      changeShare: 'changeOfShare',
      insurancePolicy: 'newInsurancePolicy',
      increaseInsure: 'increaseInsurableRisk',
    }),
    endorsementsSummary: {
      get() {
        const current = this.endorsements[this.indexarr];
        const id = current['movementId'];
        const item = this.endSummary.findIndex((v) => v.id === id);
        return this.endSummary[item];
      },
    },
    reductionOfInsurableValue: {
      get() {
        const index = this.endorsements.findIndex((v) => v.movementType === 3);
        const id = this.endorsements[index]['movementId'];
        const item = this.reductInsure.findIndex((v) => v.id === id);
        return this.reductInsure[item];
      },
    },
    changeOfShare: {
      get() {
        const index = this.endorsements.findIndex((v) => v.movementType === 5);
        const id = this.endorsements[index]['movementId'];
        const item = this.changeShare.findIndex((v) => v.id === id);
        return this.changeShare[item];
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
    increaseInsurableRisk: {
      get() {
        const index = this.endorsements.findIndex((v) => v.movementType === 2);
        const id = this.endorsements[index]['movementId'];
        const item = this.increaseInsure.findIndex((v) => v.id === id);
        return this.increaseInsure[item];
      },
    },
    currentId: {
      get() {
        const current = this.endorsements[this.indexarr];
        const id = current['movementId'];
        return id;
      }
    },
    currentIndex: {
      get() {
        const current = this.endorsements[this.indexarr];
        const id = current['movementId'];
        const item = this.endSummary.findIndex(v => v.id === id);
        return item;
      }
    },
    damageTiv: {
      get() {
        const op = Decimal(
          numeral(
            (this.changeOfShare.damageTiv || '$0').replace('$', '')
          ).value() || 0
        );

        return this.formatter.format(op);
      },
    },
    damageRate: {
      get() {
        const value = this.newInsurancePolicy.damageRate || 0;
        const op = Decimal(value);
        return op;
      },
    },
    damagePremium: {
      get() {
        const op = Decimal.sum(
          numeral(
            (this.newInsurancePolicy.damagePremium || '$0').replace('$', '')
          ).value() || 0,
          numeral(
            (this.changeOfShare.damagePremium || '$0').replace('$', '')
          ).value() || 0,
          numeral(
            (this.reductionOfInsurableValue.damagePremium || '$0').replace(
              '$',
              ''
            )
          ).value() || 0,
          numeral(
            (this.increaseInsurableRisk.damagePremium || '$0').replace('$', '')
          ).value() || 0
        );

        return this.formatter.format(op);
      },
    },
    alopPremium: {
      get() {
        const op = Decimal.sum(
          numeral(
            (this.newInsurancePolicy.alopPremium || '$0').replace('$', '')
          ).value() || 0,
          numeral(
            (this.changeOfShare.alopPremium || '$0').replace('$', '')
          ).value() || 0,
          numeral(
            (this.reductionOfInsurableValue.alopPremium || '$0').replace(
              '$',
              ''
            )
          ).value() || 0,
          numeral(
            (this.increaseInsurableRisk.alopPremium || '$0').replace('$', '')
          ).value() || 0
        );

        return this.formatter.format(op);
      },
    },
    damageShare: {
      get() {
        const percentage = new Decimal(this.changeOfShare.newShare || 0).div(
          100
        );
        const op = Decimal.mul(
          numeral((this.damagePremium || '$0').replace('$', '')).value(),
          percentage
        );

        return this.formatter.format(op);
      },
    },
    alopShare: {
      get() {
        const percentage = new Decimal(this.changeOfShare.newShare || 0).div(
          100
        );
        const op = Decimal.mul(
          numeral((this.alopPremium || '$0').replace('$', '')).value(),
          percentage
        );

        return this.formatter.format(op);
      },
    },
    damageBrokerage: {
      get() {
        const op = Decimal.sum(
          numeral(
            (this.newInsurancePolicy.damageBrokerage || '$0').replace('$', '')
          ).value() || 0,
          numeral(
            (this.changeOfShare.damageBrokerage || '$0').replace('$', '')
          ).value() || 0,
          numeral(
            (this.reductionOfInsurableValue.damageBrokerage || '$0').replace(
              '$',
              ''
            )
          ).value() || 0,
          numeral(
            (this.increaseInsurableRisk.damageBrokerage || '$0').replace(
              '$',
              ''
            )
          ).value() || 0
        );

        return this.formatter.format(op);
      },
    },
    alopBrokerage: {
      get() {
        const op = Decimal.sum(
          numeral(
            (this.newInsurancePolicy.alopBrokerage || '$0').replace('$', '')
          ).value() || 0,
          numeral(
            (this.changeOfShare.alopBrokerage || '$0').replace('$', '')
          ).value() || 0,
          numeral(
            (this.reductionOfInsurableValue.alopBrokerage || '$0').replace(
              '$',
              ''
            )
          ).value() || 0,
          numeral(
            (this.increaseInsurableRisk.alopBrokerage || '$0').replace('$', '')
          ).value() || 0
        );

        return this.formatter.format(op);
      },
    },
    damageTaxes: {
      get() {
        const op = Decimal.sum(
          numeral(
            (this.newInsurancePolicy.damageTaxes || '$0').replace('$', '')
          ).value() || 0,
          numeral(
            (this.changeOfShare.damageTaxes || '$0').replace('$', '')
          ).value() || 0,
          numeral(
            (this.reductionOfInsurableValue.damageTaxes || '$0').replace(
              '$',
              ''
            )
          ).value() || 0,
          numeral(
            (this.increaseInsurableRisk.damageTaxes || '$0').replace('$', '')
          ).value() || 0
        );

        return this.formatter.format(op);
      },
    },
    alopTaxes: {
      get() {
        const op = Decimal.sum(
          numeral(
            (this.newInsurancePolicy.alopTaxes || '$0').replace('$', '')
          ).value() || 0,
          numeral(
            (this.changeOfShare.alopTaxes || '$0').replace('$', '')
          ).value() || 0,
          numeral(
            (this.reductionOfInsurableValue.alopTaxes || '$0').replace('$', '')
          ).value() || 0,
          numeral(
            (this.increaseInsurableRisk.alopTaxes || '$0').replace('$', '')
          ).value() || 0
        );

        return this.formatter.format(op);
      },
    },
    damageEngFee: {
      get() {
        const op = Decimal.sum(
          numeral(
            (this.newInsurancePolicy.damageEngFee || '$0').replace('$', '')
          ).value() || 0,
          numeral(
            (this.changeOfShare.damageEngFee || '$0').replace('$', '')
          ).value() || 0,
          numeral(
            (this.reductionOfInsurableValue.damageEngFee || '$0').replace(
              '$',
              ''
            )
          ).value() || 0,
          numeral(
            (this.increaseInsurableRisk.damageEngFee || '$0').replace('$', '')
          ).value() || 0
        );

        return this.formatter.format(op);
      },
    },
    alopEngFee: {
      get() {
        const op = Decimal.sum(
          numeral(
            (this.newInsurancePolicy.alopEngFee || '$0').replace('$', '')
          ).value() || 0,
          numeral(
            (this.changeOfShare.alopEngFee || '$0').replace('$', '')
          ).value() || 0,
          numeral(
            (this.reductionOfInsurableValue.alopEngFee || '$0').replace('$', '')
          ).value() || 0,
          numeral(
            (this.increaseInsurableRisk.alopEngFee || '$0').replace('$', '')
          ).value() || 0
        );

        return this.formatter.format(op);
      },
    },
    damageFrontingFee: {
      get() {
        const op = Decimal.sum(
          numeral(
            (this.newInsurancePolicy.damageFrontingFee || '$0').replace('$', '')
          ).value() || 0,
          numeral(
            (this.changeOfShare.damageFrontingFee || '$0').replace('$', '')
          ).value() || 0,
          numeral(
            (this.reductionOfInsurableValue.damageFrontingFee || '$0').replace(
              '$',
              ''
            )
          ).value() || 0,
          numeral(
            (this.increaseInsurableRisk.damageFrontingFee || '$0').replace(
              '$',
              ''
            )
          ).value() || 0
        );

        return this.formatter.format(op);
      },
    },
    alopTiv: {
      get() {
        const op = Decimal(
          numeral(
            (this.changeOfShare.alopTiv || '$0').replace('$', '')
          ).value() || 0
        );

        return this.formatter.format(op);
      },
    },
    alopRate: {
      get() {
        const value = this.newInsurancePolicy.alopRate || 0;
        const op = Decimal(value);
        return op;
      },
    },
    alopFrontingFee: {
      get() {
        const op = Decimal.sum(
          numeral(
            (this.newInsurancePolicy.alopFrontingFee || '$0').replace('$', '')
          ).value() || 0,
          numeral(
            (this.changeOfShare.alopFrontingFee || '$0').replace('$', '')
          ).value() || 0,
          numeral(
            (this.reductionOfInsurableValue.alopFrontingFee || '$0').replace(
              '$',
              ''
            )
          ).value() || 0,
          numeral(
            (this.increaseInsurableRisk.alopFrontingFee || '$0').replace(
              '$',
              ''
            )
          ).value() || 0
        );

        return this.formatter.format(op);
      },
    },
    damagePremiumReserve: {
      get() {
        const op = Decimal.sum(
          numeral(
            (this.newInsurancePolicy.damagePremiumReserve || '$0').replace(
              '$',
              ''
            )
          ).value() || 0,
          numeral(
            (this.changeOfShare.damagePremiumReserve || '$0').replace('$', '')
          ).value() || 0,
          numeral(
            (
              this.reductionOfInsurableValue.damagePremiumReserve || '$0'
            ).replace('$', '')
          ).value() || 0,
          numeral(
            (this.increaseInsurableRisk.damagePremiumReserve || '$0').replace(
              '$',
              ''
            )
          ).value() || 0
        );

        return this.formatter.format(op);
      },
    },
    alopPremiumReserve: {
      get() {
        const op = Decimal.sum(
          numeral(
            (this.newInsurancePolicy.alopPremiumReserve || '$0').replace(
              '$',
              ''
            )
          ).value() || 0,
          numeral(
            (this.changeOfShare.alopPremiumReserve || '$0').replace('$', '')
          ).value() || 0,
          numeral(
            (this.reductionOfInsurableValue.alopPremiumReserve || '$0').replace(
              '$',
              ''
            )
          ).value() || 0,
          numeral(
            (this.increaseInsurableRisk.alopPremiumReserve || '$0').replace(
              '$',
              ''
            )
          ).value() || 0
        );

        return this.formatter.format(op);
      },
    },
    damageNet: {
      get() {
        const op = new Decimal(
          numeral((this.damageShare || '$0').replace('$', '')).value()
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
    alopNet: {
      get() {
        const op = new Decimal(
          numeral((this.alopShare || '$0').replace('$', '')).value()
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
    damageNetPremium: {
      get() {
        const op = new Decimal(
          numeral((this.damageShare || '$0').replace('$', '')).value()
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
    alopNetPremium: {
      get() {
        const op = new Decimal(
          numeral((this.alopShare || '$0').replace('$', '')).value()
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
    tivTotal: {
      get() {
        const op = Decimal.sum(
          numeral(
            (this.newInsurancePolicy.damageTiv || '$0').replace('$', '')
          ).value(),
          numeral(
            (this.newInsurancePolicy.alopTiv || '$0').replace('$', '')
          ).value()
        );

        return this.formatter.format(op);
      },
    },
    rateTotal: {
      get() {
        const op = Decimal.sum(
          numeral(
            (this.newInsurancePolicy.damageRate || '$0').replace('$', '')
          ).value(),
          numeral(
            (this.newInsurancePolicy.alopRate || '$0').replace('$', '')
          ).value()
        );

        return op;
      },
    },
    premiumTotal: {
      get() {
        const op = Decimal.sum(
          numeral((this.damagePremium || '$0').replace('$', '')).value(),
          numeral((this.alopPremium || '$0').replace('$', '')).value()
        );

        return this.formatter.format(op);
      },
    },
    shareTotal: {
      get() {
        const op = Decimal.sum(
          numeral((this.damageShare || '$0').replace('$', '')).value(),
          numeral((this.alopShare || '$0').replace('$', '')).value()
        );

        return this.formatter.format(op);
      },
    },
    brokerageTotal: {
      get() {
        const op = Decimal.sum(
          numeral((this.damageBrokerage || '$0').replace('$', '')).value(),
          numeral((this.alopBrokerage || '$0').replace('$', '')).value()
        );

        return this.formatter.format(op);
      },
    },
    taxesTotal: {
      get() {
        const op = Decimal.sum(
          numeral((this.damageTaxes || '$0').replace('$', '')).value(),
          numeral((this.alopTaxes || '$0').replace('$', '')).value()
        );

        return this.formatter.format(op);
      },
    },
    engFeeTotal: {
      get() {
        const op = Decimal.sum(
          numeral((this.damageEngFee || '$0').replace('$', '')).value(),
          numeral((this.alopEngFee || '$0').replace('$', '')).value()
        );

        return this.formatter.format(op);
      },
    },
    frontingFeeTotal: {
      get() {
        const op = Decimal.sum(
          numeral((this.damageFrontingFee || '$0').replace('$', '')).value(),
          numeral((this.alopFrontingFee || '$0').replace('$', '')).value()
        );

        return this.formatter.format(op);
      },
    },
    premiumReserveTotal: {
      get() {
        const op = Decimal.sum(
          numeral((this.damagePremiumReserve || '$0').replace('$', '')).value(),
          numeral((this.alopPremiumReserve || '$0').replace('$', '')).value()
        );

        return this.formatter.format(op);
      },
    },
    netTotal: {
      get() {
        const op = Decimal.sum(
          numeral((this.damageNet || '$0').replace('$', '')).value(),
          numeral((this.alopNet || '$0').replace('$', '')).value()
        );

        return this.formatter.format(op);
      },
    },
    netPremiumTotal: {
      get() {
        const op = Decimal.sum(
          numeral((this.damageNetPremium || '$0').replace('$', '')).value(),
          numeral((this.alopNetPremium || '$0').replace('$', '')).value()
        );

        return this.formatter.format(op);
      },
    },
  },
  watch: {
    damageTiv: debounce(function (val) {
      this.$v.endorsementsSummary.damageTiv.$model = val;
      this.setEndorsementsSummary({ index: this.currentIndex, key: 'damageTiv', value: val });
      this.checkField('damageTiv');
    }, 1000),
    damageRate: debounce(function (val) {
      this.$v.endorsementsSummary.damageRate.$model = val;
      this.setEndorsementsSummary({ index: this.currentIndex, key: 'damageRate', value: val });
      this.checkField('damageRate');
    }, 1000),
    damagePremium: debounce(function (val) {
      this.$v.endorsementsSummary.damagePremium.$model = val;
      this.setEndorsementsSummary({ index: this.currentIndex, key: 'damagePremium', value: val });
      this.checkField('damagePremium');
    }, 1000),
    alopPremium: debounce(function (val) {
      this.$v.endorsementsSummary.alopPremium.$model = val;
      this.setEndorsementsSummary({ index: this.currentIndex, key: 'alopPremium', value: val });
      this.checkField('alopPremium');
    }, 1000),
    damageShare: debounce(function (val) {
      this.$v.endorsementsSummary.damageShare.$model = val;
      this.setEndorsementsSummary({ index: this.currentIndex, key: 'damageShare', value: val });
      this.checkField('damageShare');
    }, 1000),
    alopShare: debounce(function (val) {
      this.$v.endorsementsSummary.alopShare.$model = val;
      this.setEndorsementsSummary({ index: this.currentIndex, key: 'alopShare', value: val });
      this.checkField('alopShare');
    }, 1000),
    damageBrokerage: debounce(function (val) {
      this.$v.endorsementsSummary.damageBrokerage.$model = val;
      this.setEndorsementsSummary({ index: this.currentIndex, key: 'damageBrokerage', value: val });
      this.checkField('damageBrokerage');
    }, 1000),
    alopBrokerage: debounce(function (val) {
      this.$v.endorsementsSummary.alopBrokerage.$model = val;
      this.setEndorsementsSummary({ index: this.currentIndex, key: 'alopBrokerage', value: val });
      this.checkField('alopBrokerage');
    }, 1000),
    damageTaxes: debounce(function (val) {
      this.$v.endorsementsSummary.damageTaxes.$model = val;
      this.setEndorsementsSummary({ index: this.currentIndex, key: 'damageTaxes', value: val });
      this.checkField('damageTaxes');
    }, 1000),
    alopTaxes: debounce(function (val) {
      this.$v.endorsementsSummary.alopTaxes.$model = val;
      this.setEndorsementsSummary({ index: this.currentIndex, key: 'alopTaxes', value: val });
      this.checkField('alopTaxes');
    }, 1000),
    damageEngFee: debounce(function (val) {
      this.$v.endorsementsSummary.damageEngFee.$model = val;
      this.setEndorsementsSummary({ index: this.currentIndex, key: 'damageEngFee', value: val });
      this.checkField('damageEngFee');
    }, 1000),
    alopEngFee: debounce(function (val) {
      this.$v.endorsementsSummary.alopEngFee.$model = val;
      this.setEndorsementsSummary({ index: this.currentIndex, key: 'alopEngFee', value: val });
      this.checkField('alopEngFee');
    }, 1000),
    damageFrontingFee: debounce(function (val) {
      this.$v.endorsementsSummary.damageFrontingFee.$model = val;
      this.setEndorsementsSummary({ index: this.currentIndex, key: 'damageFrontingFee', value: val });
      this.checkField('damageFrontingFee');
    }, 1000),
    alopTiv: debounce(function (val) {
      this.$v.endorsementsSummary.alopTiv.$model = val;
      this.setEndorsementsSummary({ index: this.currentIndex, key: 'alopTiv', value: val });
      this.checkField('alopTiv');
    }, 1000),
    alopRate: debounce(function (val) {
      this.$v.endorsementsSummary.alopRate.$model = val;
      this.setEndorsementsSummary({ index: this.currentIndex, key: 'alopRate', value: val });
      this.checkField('alopRate');
    }, 1000),
    alopFrontingFee: debounce(function (val) {
      this.$v.endorsementsSummary.alopFrontingFee.$model = val;
      this.setEndorsementsSummary({ index: this.currentIndex, key: 'alopFrontingFee', value: val });
      this.checkField('alopFrontingFee');
    }, 1000),
    damagePremiumReserve: debounce(function (val) {
      this.$v.endorsementsSummary.damagePremiumReserve.$model = val;
      this.setEndorsementsSummary({ index: this.currentIndex, key: 'damagePremiumReserve', value: val });
      this.checkField('damagePremiumReserve');
    }, 1000),
    alopPremiumReserve: debounce(function (val) {
      this.$v.endorsementsSummary.alopPremiumReserve.$model = val;
      this.setEndorsementsSummary({ index: this.currentIndex, key: 'alopPremiumReserve', value: val });
      this.checkField('alopPremiumReserve');
    }, 1000),
    damageNet: debounce(function (val) {
      this.$v.endorsementsSummary.damageNet.$model = val;
      this.setEndorsementsSummary({ index: this.currentIndex, key: 'damageNet', value: val });
      this.checkField('damageNet');
    }, 1000),
    alopNet: debounce(function (val) {
      this.$v.endorsementsSummary.alopNet.$model = val;
      this.setEndorsementsSummary({ index: this.currentIndex, key: 'alopNet', value: val });
      this.checkField('alopNet');
    }, 1000),
    damageNetPremium: debounce(function (val) {
      this.$v.endorsementsSummary.damageNetPremium.$model = val;
      this.setEndorsementsSummary({ index: this.currentIndex, key: 'damageNetPremium', value: val });
      this.checkField('damageNetPremium');
    }, 1000),
    alopNetPremium: debounce(function (val) {
      this.$v.endorsementsSummary.alopNetPremium.$model = val;
      this.setEndorsementsSummary({ index: this.currentIndex, key: 'alopNetPremium', value: val });
      this.checkField('alopNetPremium');
    }, 1000),
    tivTotal: debounce(function (val) {
      this.$v.endorsementsSummary.tivTotal.$model = val;
      this.setEndorsementsSummary({ index: this.currentIndex, key: 'tivTotal', value: val });
      this.checkField('tivTotal');
    }, 1000),
    rateTotal: debounce(function (val) {
      this.$v.endorsementsSummary.rateTotal.$model = val;
      this.setEndorsementsSummary({ index: this.currentIndex, key: 'rateTotal', value: val });
      this.checkField('rateTotal');
    }, 1000),
    premiumTotal: debounce(function (val) {
      this.$v.endorsementsSummary.premiumTotal.$model = val;
      this.setEndorsementsSummary({ index: this.currentIndex, key: 'premiumTotal', value: val });
      this.checkField('premiumTotal');
    }, 1000),
    shareTotal: debounce(function (val) {
      this.$v.endorsementsSummary.shareTotal.$model = val;
      this.setEndorsementsSummary({ index: this.currentIndex, key: 'shareTotal', value: val });
      this.checkField('shareTotal');
    }, 1000),
    brokerageTotal: debounce(function (val) {
      this.$v.endorsementsSummary.brokerageTotal.$model = val;
      this.setEndorsementsSummary({ index: this.currentIndex, key: 'brokerageTotal', value: val });
      this.checkField('brokerageTotal');
    }, 1000),
    taxesTotal: debounce(function (val) {
      this.$v.endorsementsSummary.taxesTotal.$model = val;
      this.setEndorsementsSummary({ index: this.currentIndex, key: 'taxesTotal', value: val });
      this.checkField('taxesTotal');
    }, 1000),
    engFeeTotal: debounce(function (val) {
      this.$v.endorsementsSummary.engFeeTotal.$model = val;
      this.setEndorsementsSummary({ index: this.currentIndex, key: 'engFeeTotal', value: val });
      this.checkField('engFeeTotal');
    }, 1000),
    frontingFeeTotal: debounce(function (val) {
      this.$v.endorsementsSummary.frontingFeeTotal.$model = val;
      this.setEndorsementsSummary({ index: this.currentIndex, key: 'frontingFeeTotal', value: val });
      this.checkField('frontingFeeTotal');
    }, 1000),
    premiumReserveTotal: debounce(function (val) {
      this.$v.endorsementsSummary.premiumReserveTotal.$model = val;
      this.setEndorsementsSummary({ index: this.currentIndex, key: 'premiumReserveTotal', value: val });
      this.checkField('premiumReserveTotal');
    }, 1000),
    netTotal: debounce(function (val) {
      this.$v.endorsementsSummary.netTotal.$model = val;
      this.setEndorsementsSummary({ index: this.currentIndex, key: 'netTotal', value: val });
      this.checkField('netTotal');
    }, 1000),
    netPremiumTotal: debounce(function (val) {
      this.$v.endorsementsSummary.netPremiumTotal.$model = val;
      this.setEndorsementsSummary({ index: this.currentIndex, key: 'netPremiumTotal', value: val });
      this.checkField('netPremiumTotal');
    }, 1000),
    'endorsementsSummary.effectiveDateMovement': debounce(function (val) {
      this.$v.endorsementsSummary.effectiveDateMovement.$model = val;
      this.setEndorsementsSummary({ index: this.currentIndex, key: 'effectiveDateMovement', value: val });
      this.checkField('effectiveDateMovement');
    }, 1000),
    'endorsementsSummary.movementEndDate': debounce(function (val) {
      this.$v.endorsementsSummary.movementEndDate.$model = val;
      this.setEndorsementsSummary({ index: this.currentIndex, key: 'movementEndDate', value: val });
      this.checkField('movementEndDate');
    }, 1000),
  },
  methods: {
    ...mapActions(['saveQuotationColumn', 'saveEndorsementColumn']),
    ...mapMutations(['setEndorsementsSummary', 'setStateDeductions']),
    async checkDeductionsColumn(column) {
      this.$v.deductions[column].$touch();
      if (this.$v.deductions[column].$invalid) return;
      await this.saveQuotationColumn({ parent: 'deductions', column });
    },
    async checkField(column) {
      this.$v.endorsementsSummary[column].$touch();
      if (this.$v.endorsementsSummary[column].$invalid) return;
      await this.saveEndorsementColumn({
        table: 'summary',
        parent: 'endorsementsSummary',
        column,
        id: this.currentId,
      });
    },
  },
  validations: {
    deductions: {
      deductionType: { required },
    },
    endorsementsSummary: {
      movementDamage: { required },
      movementAlop: { required },
      movementStocks: { required },
      newShare: { required },
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
      damageNet: { required },
      alopNet: { required },
      damageNetPremium: { required },
      alopNetPremium: { required },
      tivTotal: { required },
      tivMovementTotal: { required },
      rateTotal: { required },
      premiumTotal: { required },
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
      brokerage: { required },
      taxes: { required },
      frontingFee: { required },
      engFee: { required },
      reserve: { required },
    },
  },
};
</script>
<style lang="less" scoped>
@import '~@/assets/style/AccordionStyle.less';
@import '~@/assets/style/Subscription/Bound.less';
</style>