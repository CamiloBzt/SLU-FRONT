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
              Reduction of insurable value / Risk exclusion
            </div>
          </div>
        </template>
      </v-expansion-panel-header>

      <v-expansion-panel-content>
        <div class="ExpandContent justify-center">
          <div class="InputsCont d-flex justify-start align-center flex-wrap">
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
                    v-model="$v.reductionOfInsurableValue.effectiveDateMovement.$model"
                    label="Effective Date Movement"
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="$v.reductionOfInsurableValue.effectiveDateMovement.$model"
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
                    v-model="$v.reductionOfInsurableValue.movementEndDate.$model"
                    label="Movement End Date"
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="$v.reductionOfInsurableValue.movementEndDate.$model"
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
                    v-model="$v.reductionOfInsurableValue.premiumPaymentDate.$model"
                    label="Premium Payment Date"
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="$v.reductionOfInsurableValue.premiumPaymentDate.$model"
                  @input="menu3 = false"
                ></v-date-picker>
              </v-menu>
            </div>
          </div>

          <h6 class="TitleInputs">Movement Value</h6>
          <div class="InputsCont d-flex justify-start flex-wrap">
            <div class="InputCont">
              <v-text-field
                label="Damage"
                prefix="$"
                v-model.trim="
                  $v.reductionOfInsurableValue.movementDamage.$model
                "
                @blur="
                  setReductionOfInsurableValue({ index: currentIndex, key: 'movementDamage', value: $v.reductionOfInsurableValue.movementDamage.$model });
                  checkField('movementDamage');
                "
                type="number"
              />
            </div>
            <div class="InputCont">
              <v-text-field
                label="ALOP"
                prefix="$"
                v-model.trim="$v.reductionOfInsurableValue.movementAlop.$model"
                @blur="
                  setReductionOfInsurableValue({ index: currentIndex, key: 'movementAlop', value: $v.reductionOfInsurableValue.movementAlop.$model });
                  checkField('movementAlop');
                "
                type="number"
              />
            </div>
            <div class="InputCont">
              <v-text-field
                label="Stocks"
                prefix="$"
                v-model.trim="
                  $v.reductionOfInsurableValue.movementStocks.$model
                "
                @blur="
                  setReductionOfInsurableValue({ index: currentIndex, key: 'movementStocks', value: $v.reductionOfInsurableValue.movementStocks.$model });
                  checkField('movementStocks');
                "
                type="number"
              />
            </div>
          </div>

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
            Reduction of insurable value / Risk exclusion
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

          <!--Deductions change-->
          <div class="TitleCont d-flex justify-start align-center flex-wrap">
            <h5>Deductions Change</h5>
          </div>
          <div class="InputsCont d-flex justify-start flex-wrap">
            <div class="InputCont">
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
                    v-model="$v.reductionOfInsurableValue.effectiveDateMovement.$model"
                    label="Effective Date Movement"
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="$v.reductionOfInsurableValue.effectiveDateMovement.$model"
                  @input="menu4 = false"
                ></v-date-picker>
              </v-menu>
            </div>
            <div class="InputCont">
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
                    v-model="$v.reductionOfInsurableValue.movementEndDate.$model"
                    label="Movement End Date"
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="$v.reductionOfInsurableValue.movementEndDate.$model"
                  @input="menu5 = false"
                ></v-date-picker>
              </v-menu>
            </div>
            <div class="InputCont">
              <v-menu
                v-model="menu6"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="$v.reductionOfInsurableValue.premiumPaymentDate.$model"
                    label="Premium Payment Date"
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="$v.reductionOfInsurableValue.premiumPaymentDate.$model"
                  @input="menu6 = false"
                ></v-date-picker>
              </v-menu>
            </div>
            <div class="MiniInputCont">
              <v-text-field
                label="Brokerage"
                prefix="$"
                v-model.trim="$v.reductionOfInsurableValue.brokerage.$model"
                @blur="
                  setReductionOfInsurableValue({ index: currentIndex, key: 'brokerage', value: $v.reductionOfInsurableValue.brokerage.$model });
                  checkField('brokerage');
                "
                type="number"
              />
            </div>
            <div class="MiniInputCont">
              <v-text-field
                label="Tax"
                prefix="$"
                v-model.trim="$v.reductionOfInsurableValue.taxes.$model"
                @blur="
                  setReductionOfInsurableValue({ index: currentIndex, key: 'taxes', value: $v.reductionOfInsurableValue.taxes.$model });
                  checkField('taxes');
                "
                type="number"
              />
            </div>
            <div class="MiniInputCont">
              <v-text-field
                label="Fronting"
                prefix="$"
                v-model.trim="$v.reductionOfInsurableValue.frontingFee.$model"
                @blur="
                  setReductionOfInsurableValue({ index: currentIndex, key: 'frontingFee', value: $v.reductionOfInsurableValue.frontingFee.$model });
                  checkField('frontingFee');
                "
                type="number"
              />
            </div>
            <div class="MiniInputCont">
              <v-text-field
                label="Engineering Fee"
                prefix="$"
                v-model.trim="$v.reductionOfInsurableValue.engFee.$model"
                @blur="
                  setReductionOfInsurableValue({ index: currentIndex, key: 'engFee', value: $v.reductionOfInsurableValue.engFee.$model });
                  checkField('engFee');
                "
                type="number"
              />
            </div>
          </div>

          <!--Reduction of insurable value / Risk exclusion-->
          <div
            class="TitleCont d-flex justify-start align-center flex-wrap mt-5"
          >
            <h5>Extension</h5>
          </div>
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
                <v-text-field v-model="damageTivMovementSecond" disabled />
              </div>
              <div class="Row">
                <v-text-field v-model="damageTiv" disabled />
              </div>
              <div class="MiniRow">
                <v-text-field v-model="damageRate" disabled placeholder="-" />
              </div>
              <div class="Row">
                <v-text-field v-model="damageTivMovementSecond" disabled />
              </div>
            </div>

            <!--Valores de  Bi-->
            <div class="Line mt-2">
              <div class="Label">Alop</div>
              <div class="Row">
                <v-text-field v-model="alopTivMovementSecond" disabled />
              </div>
              <div class="Row">
                <v-text-field v-model="alopTiv" disabled />
              </div>
              <div class="MiniRow">
                <v-text-field v-model="alopRate" disabled placeholder="-" />
              </div>
              <div class="Row">
                <v-text-field v-model="alopTivMovementSecond" disabled />
              </div>
            </div>

            <!--Total-->
            <div class="TotalLine mt-3">
              <div class="Label Bold">Total</div>
              <div class="Row Bold">{{ damageTivMovementSecond }}</div>
              <div class="Row Bold">{{ tivTotal }}</div>
              <div class="MiniRow Bold">{{ rateTotal }}</div>
              <div class="Row Bold">{{ damageTivMovementSecond }}</div>
            </div>
          </div>
          <!--SEGUNDA TABLA-->
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
              <div class="Row Bold">Premium SLU</div>
              <div class="Row Bold">Brokerage</div>
              <div class="Row Bold">Tax</div>
              <div class="Row Bold">Fronting</div>
            </div>
            <!-- Valores Damage-->
            <div class="Line mt-3">
              <div class="Label">Damage</div>
              <div class="Row">
                <v-text-field v-model="damageTivMovementSecond" disabled />
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
                <v-text-field v-model="alopTivMovementSecond" disabled />
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
import * as moment from 'moment';

export default {
  name: 'ReductionOfInsurable',
  mixins: [stateExpansiveManager, formValidations, validationMixin],
  data() {
    return {
      menu: false,
      menu2: false,
      menu3: false,
      menu4: false,
      menu5: false,
      menu6: false,

      model1: '',
      model2: '',
      model3: '',

      formatter: new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }),
    };
  },
  components: {
    FilesSubmission,
    EmailRichEditor,
  },
  props: {
    indexarr: {
      type: String | Number,
    },
  },
  async mounted() {
    await this.getEndorsementInformation('reductionOfInsurable');
  },
  computed: {
    ...mapGetters(['deductions', 'endorsements']),
    ...mapGetters({
      reductInsure: 'reductionOfInsurableValue',
      increaseInsure: 'increaseInsurableRisk',
      insurancePolicy: 'newInsurancePolicy',
    }),
    reductionOfInsurableValue: {
      get() {
        const current = this.endorsements[this.indexarr];
        const id = current['movementId'];
        const item = this.reductInsure.findIndex((v) => v.id === id);
        return this.reductInsure[item];
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
      }
    },
    currentIndex: {
      get() {
        const current = this.endorsements[this.indexarr];
        const id = current['movementId'];
        const item = this.reductInsure.findIndex(v => v.id === id);
        return item;
      }
    },
    totalDamage: {
      get() {
        const op = Decimal.sum(
          numeral(
            (this.reductionOfInsurableValue.movementDamage || '$0').replace(
              '$',
              ''
            )
          ).value(),
          numeral(
            (this.increaseInsurableRisk.movementDamage || '$0').replace('$', '')
          ).value()
        );

        return this.formatter.format(op);
      },
    },
    totalAlop: {
      get() {
        const op = Decimal.sum(
          numeral(
            (this.reductionOfInsurableValue.movementAlop || '$0').replace(
              '$',
              ''
            )
          ).value(),
          numeral(
            (this.increaseInsurableRisk.movementAlop || '$0').replace('$', '')
          ).value()
        );

        return this.formatter.format(op);
      },
    },
    damageTivMovement: {
      get() {
        const value = numeral(
          (this.reductionOfInsurableValue.movementDamage || '$0').replace(
            '$',
            ''
          )
        ).value();

        const op = Decimal(value);
        return this.formatter.format(op);
      },
    },
    damageTivMovementSecond: {
      get() {
        return 'N/A';
      },
    },
    damageTiv: {
      get() {
        const op = Decimal.sum(
          numeral((this.damageTivMovement || '$0').replace('$', '')).value() ||
            0,
          numeral(
            (this.increaseInsurableRisk.damageTiv || '$0').replace('$', '')
          ).value() || 0
        );

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
          this.reductionOfInsurableValue.effectiveDateMovement || 0
        );
        const endDateIncrease = new Date(
          this.reductionOfInsurableValue.movementEndDate || 0
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
          (this.reductionOfInsurableValue.movementAlop || '$0').replace('$', '')
        ).value();

        const op = Decimal(value);
        return this.formatter.format(op);
      },
    },
    alopTivMovementSecond: {
      get() {
        return 'N/A';
      },
    },
    alopTiv: {
      get() {
        const op = Decimal.sum(
          numeral((this.alopTivMovement || '$0').replace('$', '')).value() || 0,
          numeral(
            (this.increaseInsurableRisk.alopTiv || '$0').replace('$', '')
          ).value() || 0
        );
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
          this.reductionOfInsurableValue.effectiveDateMovement || 0
        );
        const endDateIncrease = new Date(
          this.reductionOfInsurableValue.movementEndDate || 0
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
        return this.reductionOfInsurableValue.signature || '';
      },
    },
    support: {
      get() {
        return this.reductionOfInsurableValue.support || '';
      },
    },
  },
  watch: {
    totalDamage: debounce(function (val) {
      this.$v.reductionOfInsurableValue.totalDamage.$model = val;
      this.setReductionOfInsurableValue({ index: this.currentIndex, key: 'totalDamage', value: val });
      this.checkField('totalDamage');
    }, 1000),
    totalAlop: debounce(function (val) {
      this.$v.reductionOfInsurableValue.totalAlop.$model = val;
      this.setReductionOfInsurableValue({ index: this.currentIndex, key: 'totalAlop', value: val });
      this.checkField('totalAlop');
    }, 1000),
    damageTivMovement: debounce(function (val) {
      this.$v.reductionOfInsurableValue.damageTivMovement.$model = val;
      this.setReductionOfInsurableValue({ index: this.currentIndex, key: 'damageTivMovement', value: val });
      this.checkField('damageTivMovement');
    }, 1000),
    damageTivMovementSecond: debounce(function (val) {
      this.$v.reductionOfInsurableValue.damageTivMovementSecond.$model = val;
      this.setReductionOfInsurableValue({ index: this.currentIndex, key: 'damageTivMovementSecond', value: val });
      this.checkField('damageTivMovementSecond');
    }, 1000),
    damageTiv: debounce(function (val) {
      this.$v.reductionOfInsurableValue.damageTiv.$model = val;
      this.setReductionOfInsurableValue({ index: this.currentIndex, key: 'damageTiv', value: val });
      this.checkField('damageTiv');
    }, 1000),
    damageRate: debounce(function (val) {
      this.$v.reductionOfInsurableValue.damageRate.$model = val;
      this.setReductionOfInsurableValue({ index: this.currentIndex, key: 'damageRate', value: val });
      this.checkField('damageRate');
    }, 1000),
    damagePremium: debounce(function (val) {
      this.$v.reductionOfInsurableValue.damagePremium.$model = val;
      this.setReductionOfInsurableValue({ index: this.currentIndex, key: 'damagePremium', value: val });
      this.checkField('damagePremium');
    }, 1000),
    damagePremiumSlu: debounce(function (val) {
      this.$v.reductionOfInsurableValue.damagePremiumSlu.$model = val;
      this.setReductionOfInsurableValue({ index: this.currentIndex, key: 'damagePremiumSlu', value: val });
      this.checkField('damagePremiumSlu');
    }, 1000),
    damageBrokerage: debounce(function (val) {
      this.$v.reductionOfInsurableValue.damageBrokerage.$model = val;
      this.setReductionOfInsurableValue({ index: this.currentIndex, key: 'damageBrokerage', value: val });
      this.checkField('damageBrokerage');
    }, 1000),
    damageTaxes: debounce(function (val) {
      this.$v.reductionOfInsurableValue.damageTaxes.$model = val;
      this.setReductionOfInsurableValue({ index: this.currentIndex, key: 'damageTaxes', value: val });
      this.checkField('damageTaxes');
    }, 1000),
    damageEngFee: debounce(function (val) {
      this.$v.reductionOfInsurableValue.damageEngFee.$model = val;
      this.setReductionOfInsurableValue({ index: this.currentIndex, key: 'damageEngFee', value: val });
      this.checkField('damageEngFee');
    }, 1000),
    damageFrontingFee: debounce(function (val) {
      this.$v.reductionOfInsurableValue.damageFrontingFee.$model = val;
      this.setReductionOfInsurableValue({ index: this.currentIndex, key: 'damageFrontingFee', value: val });
      this.checkField('damageFrontingFee');
    }, 1000),
    damageReserve: debounce(function (val) {
      this.$v.reductionOfInsurableValue.damageReserve.$model = val;
      this.setReductionOfInsurableValue({ index: this.currentIndex, key: 'damageReserve', value: val });
      this.checkField('damageReserve');
    }, 1000),
    damageNet: debounce(function (val) {
      this.$v.reductionOfInsurableValue.damageNet.$model = val;
      this.setReductionOfInsurableValue({ index: this.currentIndex, key: 'damageNet', value: val });
      this.checkField('damageNet');
    }, 1000),
    damageNetPremium: debounce(function (val) {
      this.$v.reductionOfInsurableValue.damageNetPremium.$model = val;
      this.setReductionOfInsurableValue({ index: this.currentIndex, key: 'damageNetPremium', value: val });
      this.checkField('damageNetPremium');
    }, 1000),
    alopTivMovement: debounce(function (val) {
      this.$v.reductionOfInsurableValue.alopTivMovement.$model = val;
      this.setReductionOfInsurableValue({ index: this.currentIndex, key: 'alopTivMovement', value: val });
      this.checkField('alopTivMovement');
    }, 1000),
    alopTivMovementSecond: debounce(function (val) {
      this.$v.reductionOfInsurableValue.alopTivMovementSecond.$model = val;
      this.setReductionOfInsurableValue({ index: this.currentIndex, key: 'alopTivMovementSecond', value: val });
      this.checkField('alopTivMovementSecond');
    }, 1000),
    alopTiv: debounce(function (val) {
      this.$v.reductionOfInsurableValue.alopTiv.$model = val;
      this.setReductionOfInsurableValue({ index: this.currentIndex, key: 'alopTiv', value: val });
      this.checkField('alopTiv');
    }, 1000),
    alopRate: debounce(function (val) {
      this.$v.reductionOfInsurableValue.alopRate.$model = val;
      this.setReductionOfInsurableValue({ index: this.currentIndex, key: 'alopRate', value: val });
      this.checkField('alopRate');
    }, 1000),
    alopPremium: debounce(function (val) {
      this.$v.reductionOfInsurableValue.alopPremium.$model = val;
      this.setReductionOfInsurableValue({ index: this.currentIndex, key: 'alopPremium', value: val });
      this.checkField('alopPremium');
    }, 1000),
    alopPremiumSlu: debounce(function (val) {
      this.$v.reductionOfInsurableValue.alopPremiumSlu.$model = val;
      this.setReductionOfInsurableValue({ index: this.currentIndex, key: 'alopPremiumSlu', value: val });
      this.checkField('alopPremiumSlu');
    }, 1000),
    alopBrokerage: debounce(function (val) {
      this.$v.reductionOfInsurableValue.alopBrokerage.$model = val;
      this.setReductionOfInsurableValue({ index: this.currentIndex, key: 'alopBrokerage', value: val });
      this.checkField('alopBrokerage');
    }, 1000),
    alopTaxes: debounce(function (val) {
      this.$v.reductionOfInsurableValue.alopTaxes.$model = val;
      this.setReductionOfInsurableValue({ index: this.currentIndex, key: 'alopTaxes', value: val });
      this.checkField('alopTaxes');
    }, 1000),
    alopEngFee: debounce(function (val) {
      this.$v.reductionOfInsurableValue.alopEngFee.$model = val;
      this.setReductionOfInsurableValue({ index: this.currentIndex, key: 'alopEngFee', value: val });
      this.checkField('alopEngFee');
    }, 1000),
    alopFrontingFee: debounce(function (val) {
      this.$v.reductionOfInsurableValue.alopFrontingFee.$model = val;
      this.setReductionOfInsurableValue({ index: this.currentIndex, key: 'alopFrontingFee', value: val });
      this.checkField('alopFrontingFee');
    }, 1000),
    alopReserve: debounce(function (val) {
      this.$v.reductionOfInsurableValue.alopReserve.$model = val;
      this.setReductionOfInsurableValue({ index: this.currentIndex, key: 'alopReserve', value: val });
      this.checkField('alopReserve');
    }, 1000),
    alopNet: debounce(function (val) {
      this.$v.reductionOfInsurableValue.alopNet.$model = val;
      this.setReductionOfInsurableValue({ index: this.currentIndex, key: 'alopNet', value: val });
      this.checkField('alopNet');
    }, 1000),
    alopNetPremium: debounce(function (val) {
      this.$v.reductionOfInsurableValue.alopNetPremium.$model = val;
      this.setReductionOfInsurableValue({ index: this.currentIndex, key: 'alopNetPremium', value: val });
      this.checkField('alopNetPremium');
    }, 1000),
    tivMovementTotal: debounce(function (val) {
      this.$v.reductionOfInsurableValue.tivMovementTotal.$model = val;
      this.setReductionOfInsurableValue({ index: this.currentIndex, key: 'tivMovementTotal', value: val });
      this.checkField('tivMovementTotal');
    }, 1000),
    tivTotal: debounce(function (val) {
      this.$v.reductionOfInsurableValue.tivTotal.$model = val;
      this.setReductionOfInsurableValue({ index: this.currentIndex, key: 'tivTotal', value: val });
      this.checkField('tivTotal');
    }, 1000),
    rateTotal: debounce(function (val) {
      this.$v.reductionOfInsurableValue.rateTotal.$model = val;
      this.setReductionOfInsurableValue({ index: this.currentIndex, key: 'rateTotal', value: val });
      this.checkField('rateTotal');
    }, 1000),
    premiumTotal: debounce(function (val) {
      this.$v.reductionOfInsurableValue.premiumTotal.$model = val;
      this.setReductionOfInsurableValue({ index: this.currentIndex, key: 'premiumTotal', value: val });
      this.checkField('premiumTotal');
    }, 1000),
    premiumSluTotal: debounce(function (val) {
      this.$v.reductionOfInsurableValue.premiumSluTotal.$model = val;
      this.setReductionOfInsurableValue({ index: this.currentIndex, key: 'premiumSluTotal', value: val });
      this.checkField('premiumSluTotal');
    }, 1000),
    brokerageTotal: debounce(function (val) {
      this.$v.reductionOfInsurableValue.brokerageTotal.$model = val;
      this.setReductionOfInsurableValue({ index: this.currentIndex, key: 'brokerageTotal', value: val });
      this.checkField('brokerageTotal');
    }, 1000),
    taxesTotal: debounce(function (val) {
      this.$v.reductionOfInsurableValue.taxesTotal.$model = val;
      this.setReductionOfInsurableValue({ index: this.currentIndex, key: 'taxesTotal', value: val });
      this.checkField('taxesTotal');
    }, 1000),
    frontingFeeTotal: debounce(function (val) {
      this.$v.reductionOfInsurableValue.frontingFeeTotal.$model = val;
      this.setReductionOfInsurableValue({ index: this.currentIndex, key: 'frontingFeeTotal', value: val });
      this.checkField('frontingFeeTotal');
    }, 1000),
    engFeeTotal: debounce(function (val) {
      this.$v.reductionOfInsurableValue.engFeeTotal.$model = val;
      this.setReductionOfInsurableValue({ index: this.currentIndex, key: 'engFeeTotal', value: val });
      this.checkField('engFeeTotal');
    }, 1000),
    reserveTotal: debounce(function (val) {
      this.$v.reductionOfInsurableValue.reserveTotal.$model = val;
      this.setReductionOfInsurableValue({ index: this.currentIndex, key: 'reserveTotal', value: val });
      this.checkField('reserveTotal');
    }, 1000),
    netTotal: debounce(function (val) {
      this.$v.reductionOfInsurableValue.netTotal.$model = val;
      this.setReductionOfInsurableValue({ index: this.currentIndex, key: 'netTotal', value: val });
      this.checkField('netTotal');
    }, 1000),
    netPremiumTotal: debounce(function (val) {
      this.$v.reductionOfInsurableValue.netPremiumTotal.$model = val;
      this.setReductionOfInsurableValue({ index: this.currentIndex, key: 'netPremiumTotal', value: val });
      this.checkField('netPremiumTotal');
    }, 1000),
    'reductionOfInsurableValue.effectiveDateMovement': debounce(function (val) {
      this.$v.reductionOfInsurableValue.effectiveDateMovement.$model = val;
      this.setReductionOfInsurableValue({ index: this.currentIndex, key: 'effectiveDateMovement', value: val });
      this.checkField('effectiveDateMovement');
    }, 1000),
    'reductionOfInsurableValue.movementEndDate': debounce(function (val) {
      this.$v.reductionOfInsurableValue.movementEndDate.$model = val;
      this.setReductionOfInsurableValue({ index: this.currentIndex, key: 'movementEndDate', value: val });
      this.checkField('movementEndDate');
    }, 1000),
    'reductionOfInsurableValue.premiumPaymentDate': debounce(function (val) {
      this.$v.reductionOfInsurableValue.premiumPaymentDate.$model = val;
      this.setReductionOfInsurableValue({ index: this.currentIndex, key: 'premiumPaymentDate', value: val });
      this.checkField('premiumPaymentDate');
    }, 1000),
  },
  methods: {
    ...mapActions(['saveQuotationColumn', 'saveEndorsementColumn', 'getEndorsementInformation']),
    ...mapMutations(['setReductionOfInsurableValue']),
    async checkField(column) {
      this.$v.reductionOfInsurableValue[column].$touch();
      if (this.$v.reductionOfInsurableValue[column].$invalid) return;
      await this.saveEndorsementColumn({
        table: 'reductionOfInsurable',
        parent: 'reductionOfInsurableValue',
        column,
        id: this.currentId,
      });
    },
    async updateDoc(column, value) {
      this.$v.reductionOfInsurableValue[column].$model = value;
      this.setReductionOfInsurableValue({ index: this.currentIndex, key: column, value });
      await this.checkField(column);
    },
  },
  validations: {
    reductionOfInsurableValue: {
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

.InputsCont {
  width: 100%;
  height: auto;

  .TitleInputs {
    .flex();
    width: 100%;
    height: auto;
    justify-content: flex-start;
    font-size: 16px;
    margin-bottom: 5px;
  }
  .InputLine {
    .flex();
    width: 100%;
    height: auto;
    justify-content: flex-start;
    align-items: flex-start;
    align-content: flex-start;
    flex-wrap: wrap;
    .InputCont {
      width: 18%;
      margin-right: 1%;
      @media (max-width: 650px) {
        width: 100%;
        margin-right: 0%;
      }
    }
    .MiniInputCont {
      margin-right: 1%;
      width: 9%;
      @media (max-width: 650px) {
        width: 100%;
        margin-right: 0%;
      }
    }
  }
}
</style>
