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
            <div class="SubExpansionTitle">Change Of Share</div>
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
                    v-model="$v.changeOfShare.effectiveDateMovement.$model"
                    label="Effective Date Movement"
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="$v.changeOfShare.effectiveDateMovement.$model"
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
                    v-model="$v.changeOfShare.movementEndDate.$model"
                    label="Movement End Date"
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="$v.changeOfShare.movementEndDate.$model"
                  @input="menu2 = false"
                ></v-date-picker>
              </v-menu>
            </div>
            <div class="InputCont">
              <v-text-field
                label="New Share"
                v-model.trim="$v.changeOfShare.newShare.$model"
                type="number"
                @blur="
                  setChangeOfShare({
                    index: currentIndex,
                    key: 'newShare',
                    value: $v.changeOfShare.newShare.$model,
                  });
                  checkField('newShare');
                "
                suffix="%"
              />
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
                    v-model="$v.changeOfShare.premiumPaymentDate.$model"
                    label="Premium Payment Date"
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="$v.changeOfShare.premiumPaymentDate.$model"
                  @input="menu3 = false"
                ></v-date-picker>
              </v-menu>
            </div>
          </div>

          <!--Reduction of insurable value / Risk exclusion-->
          <div
            class="TitleCont d-flex justify-start align-center flex-wrap mt-5"
          >
            <h5>Reduction of insurable value / Risk exclusion</h5>
          </div>

          <div
            class="
              TableGeneralStyle
              d-flex
              flex-wrap
              align-start
              justify-center
              smallTable
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
                <v-text-field v-model="damageRate" disabled />
              </div>
              <div class="Row">
                <v-text-field v-model="damageTivMovement" disabled />
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
                <v-text-field v-model="alopRate" disabled />
              </div>
              <div class="Row">
                <v-text-field v-model="alopTivMovement" disabled />
              </div>
            </div>

            <!--Total-->
            <div class="TotalLine mt-3">
              <div class="Label Bold">Total</div>
              <div class="Row Bold">{{ alopTivMovement }}</div>
              <div class="Row Bold">{{ tivTotal }}</div>
              <div class="MiniRow Bold">{{ rateTotal }}</div>
              <div class="Row Bold">{{ alopTivMovement }}</div>
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
                <v-text-field
                  v-model="damageBrokerage"
                  disabled
                  placeholder="-"
                />
              </div>
              <div class="Row">
                <v-text-field v-model="damageTaxes" disabled />
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
                <v-text-field
                  v-model="alopBrokerage"
                  disabled
                  placeholder="-"
                />
              </div>
              <div class="Row">
                <v-text-field v-model="alopTaxes" disabled />
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

          <!--Tercer tabla-->
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
              <div class="Row Bold">Engineering Fees</div>
              <div class="Row Bold">Reserve</div>
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
                <v-text-field v-model="alopEngFee" disabled />
              </div>
              <div class="Row">
                <v-text-field v-model="alopReserve" disabled />
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
import { mapActions, mapGetters, mapMutations } from 'vuex';
import { stateExpansiveManager } from '@/mixins/subscription.js';
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

export default {
  name: 'ChangeOfShare',
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
    await this.getEndorsementInformation('changeOfShare');
  },
  computed: {
    ...mapGetters(['deductions', 'endorsements']),
    ...mapGetters({
      changeShare: 'changeOfShare',
      reductInsure: 'reductionOfInsurableValue',
      insurancePolicy: 'newInsurancePolicy',
      increaseInsure: 'increaseInsurableRisk',
    }),
    changeOfShare: {
      get() {
        const current = this.endorsements[this.indexarr];
        const id = current['movementId'];
        const item = this.changeShare.findIndex((v) => v.id === id);
        return this.changeShare[item];
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
      },
    },
    currentIndex: {
      get() {
        const current = this.endorsements[this.indexarr];
        const id = current['movementId'];
        const item = this.changeShare.findIndex((v) => v.id === id);
        return item;
      },
    },
    share: {
      get() {
        const sluShare = 20;

        return Decimal.sub(this.changeOfShare.newShare || 0, sluShare);
      },
    },
    damageTivMovement: {
      get() {
        return 'N/A';
      },
    },
    damageTiv: {
      get() {
        const op = Decimal(
          numeral(
            (this.reductionOfInsurableValue.damageTiv || '$0').replace('$', '')
          ).value() || 0
        );

        return this.formatter.format(op);
      },
    },
    damageRate: {
      get() {
        const value = this.reductionOfInsurableValue.damageRate || 0;
        const op = Decimal(value);
        return op;
      },
    },
    damagePremiumSlu: {
      get() {
        const percentage = Decimal.div(this.share, 100);
        const sum = Decimal.sum(
          numeral(
            (this.newInsurancePolicy.damagePremium || '$0').replace('$', '')
          ).value() || 0,
          numeral(
            (this.increaseInsurableRisk.damagePremium || '$0').replace('$', '')
          ).value() || 0,
          numeral(
            (this.reductionOfInsurableValue.damagePremium || '$0').replace(
              '$',
              ''
            )
          ).value() || 0
        );
        const op = Decimal.mul(sum, percentage);

        return this.formatter.format(op);
      },
    },
    damageBrokerage: {
      get() {
        const percentage = Decimal.div(
          this.reductionOfInsurableValue.brokerage || 0,
          100
        );
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
        const percentage = Decimal.div(
          this.reductionOfInsurableValue.taxes || 0,
          100
        );
        const op = Decimal.mul(
          numeral((this.damagePremiumSlu || '$0').replace('$', '')).value() ||
            0,
          percentage
        );

        return this.formatter.format(op);
      },
    },
    damageEngFee: {
      get() {
        const percentage = Decimal.div(
          this.reductionOfInsurableValue.engFee || 0,
          100
        );
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
        const percentage = Decimal.div(
          this.reductionOfInsurableValue.frontingFee || 0,
          100
        ); // it can be raplced with .2
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
        return 'N/A';
      },
    },
    alopTiv: {
      get() {
        const op = Decimal(
          numeral(
            (this.reductionOfInsurableValue.alopTiv || '$0').replace('$', '')
          ).value() || 0
        );
        return this.formatter.format(op);
      },
    },
    alopRate: {
      get() {
        const value = this.reductionOfInsurableValue.alopRate || 0;
        const op = Decimal(value);
        return op;
      },
    },
    alopPremiumSlu: {
      get() {
        const percentage = Decimal.div(this.share, 100);
        const sum = Decimal.sum(
          numeral(
            (this.newInsurancePolicy.alopPremium || '$0').replace('$', '')
          ).value() || 0,
          numeral(
            (this.increaseInsurableRisk.alopPremium || '$0').replace('$', '')
          ).value() || 0,
          numeral(
            (this.reductionOfInsurableValue.alopPremium || '$0').replace(
              '$',
              ''
            )
          ).value() || 0
        );
        const op = Decimal.mul(sum, percentage);

        return this.formatter.format(op);
      },
    },
    alopBrokerage: {
      get() {
        const percentage = Decimal.div(
          this.reductionOfInsurableValue.brokerage || 0,
          100
        );
        const op = Decimal.mul(
          numeral((this.alopPremiumSlu || '$0').replace('$', '')).value() || 0,
          percentage
        );

        return this.formatter.format(op);
      },
    },
    alopTaxes: {
      get() {
        const percentage = Decimal.div(
          this.reductionOfInsurableValue.taxes || 0,
          100
        );
        const op = Decimal.mul(
          numeral((this.alopPremiumSlu || '$0').replace('$', '')).value() || 0,
          percentage
        );

        return this.formatter.format(op);
      },
    },
    alopEngFee: {
      get() {
        const percentage = Decimal.div(
          this.reductionOfInsurableValue.engFee || 0,
          100
        );
        const op = Decimal.mul(
          numeral((this.alopPremiumSlu || '$0').replace('$', '')).value() || 0,
          percentage
        );

        return this.formatter.format(op);
      },
    },
    alopFrontingFee: {
      get() {
        const percentage = Decimal.div(
          this.reductionOfInsurableValue.frontingFee || 0,
          100
        ); // it can be raplced with .2
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
          numeral((this.damageTivMovement || '$0').replace('$', '')).value() ||
            0,
          numeral((this.alopTivMovement || '$0').replace('$', '')).value() || 0
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
        return this.changeOfShare.signature || '';
      },
    },
    support: {
      get() {
        return this.changeOfShare.support || '';
      },
    },
  },
  watch: {
    damageTivMovement: debounce(function (val) {
      this.$v.changeOfShare.damageTivMovement.$model = val;
      this.setChangeOfShare({
        index: this.currentIndex,
        key: 'damageTivMovement',
        value: val,
      });
      this.checkField('damageTivMovement');
    }, 1000),
    damageTiv: debounce(function (val) {
      this.$v.changeOfShare.damageTiv.$model = val;
      this.setChangeOfShare({
        index: this.currentIndex,
        key: 'damageTiv',
        value: val,
      });
      this.checkField('damageTiv');
    }, 1000),
    damageRate: debounce(function (val) {
      this.$v.changeOfShare.damageRate.$model = val;
      this.setChangeOfShare({
        index: this.currentIndex,
        key: 'damageRate',
        value: val,
      });
      this.checkField('damageRate');
    }, 1000),
    damagePremiumSlu: debounce(function (val) {
      this.$v.changeOfShare.damagePremiumSlu.$model = val;
      this.setChangeOfShare({
        index: this.currentIndex,
        key: 'damagePremiumSlu',
        value: val,
      });
      this.checkField('damagePremiumSlu');
    }, 1000),
    damageBrokerage: debounce(function (val) {
      this.$v.changeOfShare.damageBrokerage.$model = val;
      this.setChangeOfShare({
        index: this.currentIndex,
        key: 'damageBrokerage',
        value: val,
      });
      this.checkField('damageBrokerage');
    }, 1000),
    damageTaxes: debounce(function (val) {
      this.$v.changeOfShare.damageTaxes.$model = val;
      this.setChangeOfShare({
        index: this.currentIndex,
        key: 'damageTaxes',
        value: val,
      });
      this.checkField('damageTaxes');
    }, 1000),
    damageEngFee: debounce(function (val) {
      this.$v.changeOfShare.damageEngFee.$model = val;
      this.setChangeOfShare({
        index: this.currentIndex,
        key: 'damageEngFee',
        value: val,
      });
      this.checkField('damageEngFee');
    }, 1000),
    damageFrontingFee: debounce(function (val) {
      this.$v.changeOfShare.damageFrontingFee.$model = val;
      this.setChangeOfShare({
        index: this.currentIndex,
        key: 'damageFrontingFee',
        value: val,
      });
      this.checkField('damageFrontingFee');
    }, 1000),
    damageReserve: debounce(function (val) {
      this.$v.changeOfShare.damageReserve.$model = val;
      this.setChangeOfShare({
        index: this.currentIndex,
        key: 'damageReserve',
        value: val,
      });
      this.checkField('damageReserve');
    }, 1000),
    damageNet: debounce(function (val) {
      this.$v.changeOfShare.damageNet.$model = val;
      this.setChangeOfShare({
        index: this.currentIndex,
        key: 'damageNet',
        value: val,
      });
      this.checkField('damageNet');
    }, 1000),
    damageNetPremium: debounce(function (val) {
      this.$v.changeOfShare.damageNetPremium.$model = val;
      this.setChangeOfShare({
        index: this.currentIndex,
        key: 'damageNetPremium',
        value: val,
      });
      this.checkField('damageNetPremium');
    }, 1000),
    alopTivMovement: debounce(function (val) {
      this.$v.changeOfShare.alopTivMovement.$model = val;
      this.setChangeOfShare({
        index: this.currentIndex,
        key: 'alopTivMovement',
        value: val,
      });
      this.checkField('alopTivMovement');
    }, 1000),
    alopTiv: debounce(function (val) {
      this.$v.changeOfShare.alopTiv.$model = val;
      this.setChangeOfShare({
        index: this.currentIndex,
        key: 'alopTiv',
        value: val,
      });
      this.checkField('alopTiv');
    }, 1000),
    alopRate: debounce(function (val) {
      this.$v.changeOfShare.alopRate.$model = val;
      this.setChangeOfShare({
        index: this.currentIndex,
        key: 'alopRate',
        value: val,
      });
      this.checkField('alopRate');
    }, 1000),
    alopPremiumSlu: debounce(function (val) {
      this.$v.changeOfShare.alopPremiumSlu.$model = val;
      this.setChangeOfShare({
        index: this.currentIndex,
        key: 'alopPremiumSlu',
        value: val,
      });
      this.checkField('alopPremiumSlu');
    }, 1000),
    alopBrokerage: debounce(function (val) {
      this.$v.changeOfShare.alopBrokerage.$model = val;
      this.setChangeOfShare({
        index: this.currentIndex,
        key: 'alopBrokerage',
        value: val,
      });
      this.checkField('alopBrokerage');
    }, 1000),
    alopTaxes: debounce(function (val) {
      this.$v.changeOfShare.alopTaxes.$model = val;
      this.setChangeOfShare({
        index: this.currentIndex,
        key: 'alopTaxes',
        value: val,
      });
      this.checkField('alopTaxes');
    }, 1000),
    alopEngFee: debounce(function (val) {
      this.$v.changeOfShare.alopEngFee.$model = val;
      this.setChangeOfShare({
        index: this.currentIndex,
        key: 'alopEngFee',
        value: val,
      });
      this.checkField('alopEngFee');
    }, 1000),
    alopFrontingFee: debounce(function (val) {
      this.$v.changeOfShare.alopFrontingFee.$model = val;
      this.setChangeOfShare({
        index: this.currentIndex,
        key: 'alopFrontingFee',
        value: val,
      });
      this.checkField('alopFrontingFee');
    }, 1000),
    alopReserve: debounce(function (val) {
      this.$v.changeOfShare.alopReserve.$model = val;
      this.setChangeOfShare({
        index: this.currentIndex,
        key: 'alopReserve',
        value: val,
      });
      this.checkField('alopReserve');
    }, 1000),
    alopNet: debounce(function (val) {
      this.$v.changeOfShare.alopNet.$model = val;
      this.setChangeOfShare({
        index: this.currentIndex,
        key: 'alopNet',
        value: val,
      });
      this.checkField('alopNet');
    }, 1000),
    alopNetPremium: debounce(function (val) {
      this.$v.changeOfShare.alopNetPremium.$model = val;
      this.setChangeOfShare({
        index: this.currentIndex,
        key: 'alopNetPremium',
        value: val,
      });
      this.checkField('alopNetPremium');
    }, 1000),
    tivMovementTotal: debounce(function (val) {
      this.$v.changeOfShare.tivMovementTotal.$model = val;
      this.setChangeOfShare({
        index: this.currentIndex,
        key: 'tivMovementTotal',
        value: val,
      });
      this.checkField('tivMovementTotal');
    }, 1000),
    tivTotal: debounce(function (val) {
      this.$v.changeOfShare.tivTotal.$model = val;
      this.setChangeOfShare({
        index: this.currentIndex,
        key: 'tivTotal',
        value: val,
      });
      this.checkField('tivTotal');
    }, 1000),
    rateTotal: debounce(function (val) {
      this.$v.changeOfShare.rateTotal.$model = val;
      this.setChangeOfShare({
        index: this.currentIndex,
        key: 'rateTotal',
        value: val,
      });
      this.checkField('rateTotal');
    }, 1000),
    premiumTotal: debounce(function (val) {
      this.$v.changeOfShare.premiumTotal.$model = val;
      this.setChangeOfShare({
        index: this.currentIndex,
        key: 'premiumTotal',
        value: val,
      });
      this.checkField('premiumTotal');
    }, 1000),
    premiumSluTotal: debounce(function (val) {
      this.$v.changeOfShare.premiumSluTotal.$model = val;
      this.setChangeOfShare({
        index: this.currentIndex,
        key: 'premiumSluTotal',
        value: val,
      });
      this.checkField('premiumSluTotal');
    }, 1000),
    brokerageTotal: debounce(function (val) {
      this.$v.changeOfShare.brokerageTotal.$model = val;
      this.setChangeOfShare({
        index: this.currentIndex,
        key: 'brokerageTotal',
        value: val,
      });
      this.checkField('brokerageTotal');
    }, 1000),
    taxesTotal: debounce(function (val) {
      this.$v.changeOfShare.taxesTotal.$model = val;
      this.setChangeOfShare({
        index: this.currentIndex,
        key: 'taxesTotal',
        value: val,
      });
      this.checkField('taxesTotal');
    }, 1000),
    frontingFeeTotal: debounce(function (val) {
      this.$v.changeOfShare.frontingFeeTotal.$model = val;
      this.setChangeOfShare({
        index: this.currentIndex,
        key: 'frontingFeeTotal',
        value: val,
      });
      this.checkField('frontingFeeTotal');
    }, 1000),
    engFeeTotal: debounce(function (val) {
      this.$v.changeOfShare.engFeeTotal.$model = val;
      this.setChangeOfShare({
        index: this.currentIndex,
        key: 'engFeeTotal',
        value: val,
      });
      this.checkField('engFeeTotal');
    }, 1000),
    reserveTotal: debounce(function (val) {
      this.$v.changeOfShare.reserveTotal.$model = val;
      this.setChangeOfShare({
        index: this.currentIndex,
        key: 'reserveTotal',
        value: val,
      });
      this.checkField('reserveTotal');
    }, 1000),
    netTotal: debounce(function (val) {
      this.$v.changeOfShare.netTotal.$model = val;
      this.setChangeOfShare({
        index: this.currentIndex,
        key: 'netTotal',
        value: val,
      });
      this.checkField('netTotal');
    }, 1000),
    netPremiumTotal: debounce(function (val) {
      this.$v.changeOfShare.netPremiumTotal.$model = val;
      this.setChangeOfShare({
        index: this.currentIndex,
        key: 'netPremiumTotal',
        value: val,
      });
      this.checkField('netPremiumTotal');
    }, 1000),
    'changeOfShare.effectiveDateMovement': debounce(function (val) {
      this.$v.changeOfShare.effectiveDateMovement.$model = val;
      this.setChangeOfShare({
        index: this.currentIndex,
        key: 'effectiveDateMovement',
        value: val,
      });
      this.checkField('effectiveDateMovement');
    }, 1000),
    'changeOfShare.movementEndDate': debounce(function (val) {
      this.$v.changeOfShare.movementEndDate.$model = val;
      this.setChangeOfShare({
        index: this.currentIndex,
        key: 'movementEndDate',
        value: val,
      });
      this.checkField('movementEndDate');
    }, 1000),
    'changeOfShare.premiumPaymentDate': debounce(function (val) {
      this.$v.changeOfShare.premiumPaymentDate.$model = val;
      this.setChangeOfShare({
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
    ...mapMutations(['setChangeOfShare']),
    async checkField(column) {
      this.$v.changeOfShare[column].$touch();
      if (this.$v.changeOfShare[column].$invalid) return;
      await this.saveEndorsementColumn({
        table: 'changeOfShare',
        parent: 'changeOfShare',
        column,
        id: this.currentId,
      });
    },
    async updateDoc(column, value) {
      this.$v.changeOfShare[column].$model = value;
      this.setChangeOfShare({ index: this.currentIndex, key: column, value });
      await this.checkField(column);
    },
  },
  validations: {
    changeOfShare: {
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
      brokerage: { required },
      taxes: { required },
      frontingFee: { required },
      engFee: { required },
      signature: { required },
      support: { required },
    },
  },
};
</script>
<style lang="less" scoped>
@import '~@/assets/style/AccordionStyle.less';
@import '~@/assets/style/Subscription/Bound.less';
.smallTable {
  width: 75%;
}
</style>