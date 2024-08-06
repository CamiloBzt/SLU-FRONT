<template>
  <div class="ExchangeCalcCont d-flex justify-center flex-wrap align-center">
    <!--TITULO-->
    <div class="TitleComponent d-flex justify-start align-center">
      <h5>To be defined</h5>
    </div>

    <!--PARTE IZQUIERDA-->
    <div class="ExchangeCont d-flex justify-end align-content-start flex-wrap">
      <!--TITULO-->
      <div class="TitleCont d-flex justify-end align-content-center align-center">
        <h5>Original currency</h5>
      </div>

      <!--LINEA DIVISORIA-->
      <div class="ExpansionLineTop"></div>

      <!--INPUTS-->
      <div class="InputContent d-flex justify-end align-center mt-2">
        <span class="LabelInput"> Limited Insured</span>

        <div class="InputContainer">
          <!-- <v-text-field
            class="ml-3"
            v-model="$v.toBeDefined.limitedInsured.$model"
            :placeholder="limitedInsured"
            :suffix="currentCurrency.key"
            @blur="$v.toBeDefined.limitedInsured.$touch()"
            @input="$v.toBeDefined.limitedInsured.$touch()"
            :error-messages="quotationValids('toBeDefined', 'limitedInsured')"
          ></v-text-field> -->
          <currency-input
            class="ml-3"
            v-model="$v.toBeDefined.limitedInsured.$model"
            :placeholder="limitedInsured"
            :suffix="currentCurrency.key"
            :options="currencyOptions"
            @blur="
              $v.toBeDefined.limitedInsured.$touch();
              setStateTobe('limitedInsured', $v.toBeDefined.limitedInsured.$model);
              checkTobeColumn('limitedInsured');
            "
            @input="$v.toBeDefined.limitedInsured.$touch()"
            :errorMessages="quotationValids('toBeDefined', 'limitedInsured')"
            css="ml-3"
          ></currency-input>
        </div>
      </div>

      <div class="InputContent d-flex justify-end align-center">
        <span class="LabelInput"> SLU Share </span>

        <div class="InputContainer">
          <v-text-field
            class="ml-3"
            v-model="$v.toBeDefined.sluShare.$model"
            :placeholder="sluShare"
            type="number"
            suffix="%"
            @blur="
              $v.toBeDefined.sluShare.$touch();
              setStateTobe('sluShare', $v.toBeDefined.sluShare.$model);
              checkTobeColumn('sluShare');
            "
            @input="$v.toBeDefined.sluShare.$touch()"
            :error-messages="quotationValids('toBeDefined', 'sluShare')"
          ></v-text-field>
        </div>
      </div>

      <div class="InputContent d-flex justify-end align-center">
        <span class="LabelInput"> Limit SLU </span>

        <div class="InputContainer">
          <v-text-field
            class="ml-3"
            v-model="originalLimitSlu"
            :placeholder="limitSlu"
            :suffix="currentCurrency.key"
            readonly
            :error-messages="quotationValids('toBeDefined', 'limitSlu')"
          ></v-text-field>
        </div>
      </div>

      <div class="InputContent d-flex justify-end align-center">
        <span class="LabelInput"> Premium SLU </span>

        <div class="InputContainer">
          <v-text-field
            class="ml-3"
            v-model="originalPremiumSlu"
            :placeholder="premiumSlu"
            :suffix="currentCurrency.key"
            readonly
            :error-messages="quotationValids('toBeDefined', 'premiumSlu')"
          ></v-text-field>
        </div>
      </div>
    </div>

    <!--PARTE DERECHA-->
    <div class="ExchangeCont d-flex justify-start align-content-start flex-wrap">
      <!--TITULO-->
      <div class="TitleCont d-flex justify-start align-content-center align-center">
        <h5 class="TitleColRight">USD</h5>
      </div>

      <!--LINEA DIVISORIA-->
      <div class="ExpansionLineTop"></div>

      <!--INPUTS-->
      <div class="InputContent d-flex justify-start align-center mt-2">
        <span class="LabelInput ShowFlexOnMovil"> Limited insured: </span>

        <div class="InputContainer inputRight">
          <v-text-field
            class="ml-3"
            v-model="usdLimitedInsured"
            :placeholder="limitedInsured"
            suffix="USD"
            readonly
            :error-messages="quotationValids('toBeDefined', 'limitedInsuredUsd')"
          ></v-text-field>
        </div>
      </div>

      <div class="InputContent d-flex justify-start align-center">
        <span class="LabelInput ShowFlexOnMovil"> SLU Share: </span>

        <div class="InputContainer inputRight">
          <v-text-field
            class="ml-3"
            v-model="$v.toBeDefined.sluShare.$model"
            :placeholder="sluShare"
            suffix="%"
            readonly
            @blur="$v.toBeDefined.sluShare.$touch()"
            @input="$v.toBeDefined.sluShare.$touch()"
            :error-messages="quotationValids('toBeDefined', 'sluShare')"
          ></v-text-field>
        </div>
      </div>

      <div class="InputContent d-flex justify-start align-center">
        <span class="LabelInput ShowFlexOnMovil"> Limit SLU: </span>

        <div class="InputContainer inputRight">
          <v-text-field
            class="ml-3"
            v-model="usdLimitSlu"
            :placeholder="limitSlu"
            suffix="USD"
            readonly
            :error-messages="quotationValids('toBeDefined', 'limitSluUsd')"
          ></v-text-field>
        </div>
      </div>

      <div class="InputContent d-flex justify-start align-center">
        <span class="LabelInput ShowFlexOnMovil"> Premium SLU: </span>

        <div class="InputContainer inputRight">
          <v-text-field
            class="ml-3"
            v-model="usdPremiumSlu"
            :placeholder="premiumSlu"
            suffix="USD"
            readonly
            :error-messages="quotationValids('toBeDefined', 'premiumSluUsd')"
          ></v-text-field>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';
/* vuelidate mixin & validations */
import { validationMixin } from 'vuelidate';
import { required, requiredIf } from 'vuelidate/lib/validators';
/* project validations (in some cases depends on vuelidate) */
import { formValidations } from '@/mixins/formValidations';
import { Percentage } from '@/constants/validations';
/* currency component */
import CurrencyInput from '@/components/CurrencyInput/CurrencyInput.vue';
/* lodash */
import { debounce } from 'lodash';
/* libs */
import Decimal from 'decimal.js';

export default {
  name: 'ToBe',
  components: { CurrencyInput },
  mixins: [formValidations, validationMixin],
  data() {
    return {
      limitedInsured: '0',
      sluShare: '0',
      limitSlu: '0',
      premiumSlu: '0',
      usdCurrency: 'USD',
      totalPremiumUsd: '0',
      currencyOptions: {
        currency: 'MXN',
        currencyDisplay: 'narrowSymbol',
        locale: 'en-US',
      },
      roe: 0.2,
      value: 1234,
      isOptional: true,
      usdPremiumSlu: 0,
      originalPremiumSlu: 0,
    };
  },
  computed: {
    ...mapGetters(['toBeDefined', 'quotation', 'accountInformation', 'currencies', 'premium']),
    currentCurrency: {
      get() {
        if (this.accountInformation.currency && this.currencies && this.currencies.length > 0) {
          const currencyObj = this.currencies.find((v) => v.id === this.accountInformation.currency);
          return currencyObj;
        }
        return 0;
      },
    },
    usdLimitedInsured: {
      get() {
        const op = (Decimal.div(this.toBeDefined.limitedInsured || 0, this.quotation.exchangeRate || 0)).toNumber() || 0;

        const formatter = new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
        });
        return op === Infinity ? formatter.format(0) : formatter.format(op);
      },
    },
    usdLimitSlu: {
      get() {
        const fracc = this.$v.toBeDefined.sluShare.$model / 100;
        const curr = Number(this.usdLimitedInsured.replace(/[^0-9.-]+/g, ''));
        const op = curr * fracc || 0;

        const formatter = new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
        });

        return op === Infinity ? formatter.format(0) : formatter.format(op);
      },
    },
    originalLimitSlu: {
      get() {
        const fracc = this.$v.toBeDefined.sluShare.$model / 100;
        const op = this.toBeDefined.limitedInsured * fracc;
        const formatter = new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
        });

        return formatter.format(op);
      },
    },
  },
  mounted() {
    this.calculatePremium();
  },
  watch: {
    originalPremiumSlu: debounce(function (val) {
      this.$v.toBeDefined.premiumSlu.$model = val;
      this.setStateTobe('premiumSlu', val);
      this.checkTobeColumn('premiumSlu');
    }, 1000),
    usdPremiumSlu: debounce(function (val) {
      this.$v.toBeDefined.premiumSluUsd.$model = val;
      this.setStateTobe('premiumSluUsd', val);
      this.checkTobeColumn('premiumSluUsd');
    }, 1000),
    originalLimitSlu: debounce(function (val) {
      this.$v.toBeDefined.limitSlu.$model = val;
      this.setStateTobe('limitSlu', val);
      this.checkTobeColumn('limitSlu');
    }, 1000),
    usdLimitSlu: debounce(function (val) {
      this.$v.toBeDefined.limitSluUsd.$model = val;
      this.setStateTobe('limitSluUsd', val);
      this.checkTobeColumn('limitSluUsd');
    }, 1000),
    usdLimitedInsured: debounce(function (val) {
      this.$v.toBeDefined.limitedInsuredUsd.$model = val;
      this.setStateTobe('limitedInsuredUsd', val);
      this.checkTobeColumn('limitedInsuredUsd');
    }, 1000),
    'toBeDefined.sluShare': debounce(function (val) {
      this.calculatePremium();
    }, 1),
  },
  validations: {
    toBeDefined: {
      limitSluUsd: {
        required: requiredIf(function () {
          return !this.isOptional;
        }),
      },
      premiumSluUsd: {
        required: requiredIf(function () {
          return !this.isOptional;
        }),
      },
      limitedInsuredUsd: {
        required: requiredIf(function () {
          return !this.isOptional;
        }),
      },
      limitSlu: {
        required: requiredIf(function () {
          return !this.isOptional;
        }),
      },
      premiumSlu: {
        required: requiredIf(function () {
          return !this.isOptional;
        }),
      },
      sluShare: { required, Percentage },
      limitedInsured: { required },
    },
  },
  methods: {
    ...mapMutations(['setStateTobe']),
    ...mapActions(['saveQuotationColumn', 'createToBeDefined']),
    async submitForm() {
      try {
        this.$v.$touch();

        const isValid = !this.$v.$invalid;
        if (!isValid) return;

        const toBe = {
          limitSluUsd: this.$v.toBeDefined.limitSluUsd.$model,
          premiumSluUsd: this.$v.toBeDefined.premiumSluUsd.$model,
          limitedInsuredUsd: this.$v.toBeDefined.limitedInsuredUsd.$model,
          limitSlu: this.$v.toBeDefined.limitSlu.$model,
          sluShare: this.$v.toBeDefined.sluShare.$model,
          premiumSlu: this.$v.toBeDefined.premiumSlu.$model,
          limitedInsured: this.$v.toBeDefined.limitedInsured.$model.toString(),
        };

        await this.createToBeDefined(toBe);
      } catch (e) {
        console.error(e);
      }
    },
    async checkTobeColumn(column) {
      this.$v.toBeDefined[column].$touch();
      if (this.$v.toBeDefined[column].$invalid) return;
      await this.saveQuotationColumn({
        table: 'tobe',
        parent: 'toBeDefined',
        column,
      });
    },
    calculatePremium() {
      const fracc = this.toBeDefined.sluShare / 100;
      const curr1 = this.toBeDefined.limitedInsuredUsd ? (this.premium.totalUsd ? this.premium.totalUsd.replace(/[^0-9.-]+/g, '') : 0) : 0;
      const op1 = curr1 * fracc;
      const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      });

      const curr = this.premium.totalInsured ? Number(this.premium.totalInsured.replace(/[^0-9.-]+/g, '')) : 0;
      const op = curr * fracc;
      this.usdPremiumSlu = formatter.format(op1);
      this.originalPremiumSlu = formatter.format(op);

      this.setStateTobe('premiumSlu', this.originalPremiumSlu);
      this.checkTobeColumn('premiumSlu');
      this.setStateTobe('premiumSluUsd', this.usdPremiumSlu);
      this.checkTobeColumn('premiumSluUsd');
    },
  },
};
</script>
<style lang="less" scoped>
@weightTitle: 600;
@sizeTitle: 20px;
@sizeTitleMovil: 14px;
.ExchangeCalcCont {
  width: 100%;
  height: auto;

  //TITULO DEL COMPONENTE
  .TitleComponent {
    width: 100%;
    height: 50px;
    margin-top: 15px;
    h5 {
      font-size: 20px;
      color: black;
      font-weight: 600;
      text-transform: capitalize;
    }
  }

  .ExchangeCont {
    width: 35%;
    height: auto;
    padding-bottom: 40px;
    //TITULO
    .TitleCont {
      width: 100%;
      height: 60px;
      h5 {
        font-size: @sizeTitle;
        font-weight: @weightTitle;
        text-transform: capitalize;
        color: black;
        width: 40%;
        text-align: center;
        @media (max-width: 650px) {
          font-size: @sizeTitleMovil;
        }
      }
      .TitleColRight {
        text-align: center;
        margin-left: 7.5%;
      }
    }

    //INPUTS
    .InputContent {
      width: 100%;
      height: 50px;

      //LABEL
      .LabelInput {
        color: #547fa9;
        width: 40%;
        text-align: right;
        font-size: 16px;
      }

      .InputContainer {
        width: 40%;
      }
      .inputRight {
        margin-left: 5%;
      }
      .MiniInputContainer {
        width: 20%;
      }
    }

    .Total {
      font-size: 19px;
    }
  }

  //DIVISION VERTICAL
  .VerticalDiver {
    width: 1px;
    height: 490px;
    background: black;
    margin-left: 2.5%;
    margin-right: 2.5%;
  }
}

@media (max-width: 640px) {
  .ExchangeCalcCont {
    .ExchangeCont {
      width: 100%;
      padding: 0 !important;
      //TITULO
      .TitleCont {
        justify-content: flex-start !important;
      }

      //INPUTS
      .InputContent {
        .LabelInput {
          font-size: 14px;
          height: 55%;
          display: flex;
          justify-content: flex-end;
          align-items: flex-end;
          width: 38%;
          @media (max-width: 650px) {
            font-size: 12px;
          }
        }

        .InputContainer {
          width: 55%;
        }
      }

      //TOTAL
      .Total {
        font-size: 14px;
      }
    }
  }
}
</style>
