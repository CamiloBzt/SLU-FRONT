<template>
  <div class="Cont d-flex justify-center align-start flex-wrap">
    <div class="TitleCont d-flex justify-start align-center">
      <h5>Net Premium (USD))</h5>
    </div>
    <!--TABLA-->
    <div class="table horizontal-scroll">
      <!-- Labels -->
      <div class="table__column table__column--label">
        <div class="input input--title"></div>
        <div class="divider" />
        <div class="input input--label">All Risk</div>
        <div class="input input--label">ALOP</div>
        <div class="input input--label">Total</div>
      </div>

      <!-- SLU Share -->
      <div class="table__column">
        <div class="input input--title">SLU Share</div>
        <div class="divider" />
        <div class="input">
          <currency-input :value="calculates.allRiskSluShare()" :options="currencyOptions" disabled />
        </div>
        <div class="input">
          <currency-input :value="calculates.alopSluShare()" :options="currencyOptions" disabled />
        </div>
        <div class="input input--total">{{ calculates.sluShareTotal() }}</div>
      </div>

      <!-- Brokerage -->
      <div class="table__column">
        <div class="input input--title">Brokerage</div>
        <div class="divider" />
        <div class="input">
          <currency-input :value="calculates.allRiskBrokerage()" :options="currencyOptions" disabled />
        </div>
        <div class="input">
          <currency-input :value="calculates.alopBrokerage()" :options="currencyOptions" disabled />
        </div>
        <div class="input input--total">{{ calculates.brokerageTotal() }}</div>
      </div>

      <!-- Taxes -->
      <div class="table__column">
        <div class="input input--title">Taxes</div>
        <div class="divider" />
        <div class="input">
          <currency-input :value="calculates.allRiskTaxes()" :options="currencyOptions" disabled />
        </div>
        <div class="input">
          <currency-input :value="calculates.alopTaxes()" :options="currencyOptions" disabled />
        </div>
        <div class="input input--total">{{ calculates.taxesTotal() }}</div>
      </div>

      <!-- Engineering Fees -->
      <div class="table__column">
        <div class="input input--title">Engineering Fees</div>
        <div class="divider" />
        <div class="input">
          <currency-input :value="calculates.allRiskEng()" :options="currencyOptions" disabled />
        </div>
        <div class="input">
          <currency-input :value="calculates.alopEng()" :options="currencyOptions" disabled />
        </div>
        <div class="input input--total">{{ calculates.engTotal() }}</div>
      </div>

      <!-- Fronting Fee -->
      <div class="table__column">
        <div class="input input--title">Fronting Fee</div>
        <div class="divider" />
        <div class="input">
          <currency-input :value="calculates.allRiskFronting()" :options="currencyOptions" disabled />
        </div>
        <div class="input">
          <currency-input :value="calculates.alopFronting()" :options="currencyOptions" disabled />
        </div>
        <div class="input input--total">{{ calculates.frontingTotal() }}</div>
      </div>

      <!-- Premium Reserve -->
      <div class="table__column">
        <div class="input input--title">Premium Reserve</div>
        <div class="divider" />
        <div class="input">
          <currency-input :value="calculates.allRiskColombia()" :options="currencyOptions" disabled />
        </div>
        <div class="input">
          <currency-input :value="calculates.alopColombia()" :options="currencyOptions" disabled />
        </div>
        <div class="input input--total">{{ calculates.colombiaTotal() }}</div>
      </div>

      <!-- LTA -->
      <div class="table__column">
        <div class="input input--title">LTA</div>
        <div class="divider" />
        <div class="input">
          <currency-input :value="calculates.allRiskLta()" :options="currencyOptions" disabled />
        </div>
        <div class="input">
          <currency-input :value="calculates.alopLta()" :options="currencyOptions" disabled />
        </div>
        <div class="input input--total">{{ calculates.ltaTotal() }}</div>
      </div>

      <!-- Others -->
      <div class="table__column">
        <div class="input input--title">Others</div>
        <div class="divider" />
        <div class="input">
          <currency-input :value="calculates.allRiskOthers()" :options="currencyOptions" disabled />
        </div>
        <div class="input">
          <currency-input :value="calculates.alopOthers()" :options="currencyOptions" disabled />
        </div>
        <div class="input input--total">{{ calculates.OthersTotal() }}</div>
      </div>

      <!-- Net premium -->
      <div class="table__column">
        <div class="input input--title">Net Premium</div>
        <div class="divider" />
        <div class="input">
          <currency-input :value="calculates.allRiskNetSLU()" :options="currencyOptions" disabled />
        </div>
        <div class="input">
          <currency-input :value="calculates.alopNetSLU()" :options="currencyOptions" disabled />
        </div>
        <div class="input input--total">
          {{ calculates.netSLUTotal() }}
        </div>
      </div>
      <!-- Net premium excluding fronting -->
      <div class="table__column">
        <div class="input input--title">Net Premium excluding fronting</div>
        <div class="divider" />
        <div class="input">
          <currency-input :value="calculates.allRiskNetSLUExcludingFronting()" :options="currencyOptions" disabled />
        </div>
        <div class="input">
          <currency-input :value="calculates.alopNetSLUExcludingFronting()" :options="currencyOptions" disabled />
        </div>
        <div class="input input--total">
          {{ calculates.netSLUExcludingFrontingTotal() }}
        </div>
      </div>
      <!-- Net to SLU excluding survey fees -->
      <div class="table__column">
        <div class="input input--title">SLU Premium to be invoiced</div>
        <div class="divider" />
        <div class="input">
          <currency-input :value="calculates.allRiskToBeInvoiced()" :options="currencyOptions" disabled />
        </div>
        <div class="input">
          <currency-input :value="calculates.alopToBeInvoiced()" :options="currencyOptions" disabled />
        </div>
        <div class="input input--total">
          {{ calculates.SluPremiumToBeInvoicedTotal() }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";
/* components */
import CurrencyInput from "@/components/CurrencyInput/CurrencyInput.vue";
// classes
import NetPremiumEng from "@/application/class/NetPremiumEng";
// servicios
import NetPremiumService from "@/modules/home/services/net-premium.service";

export default {
  name: "NetPremiumUsdProperty",
  components: { CurrencyInput },
  data() {
    return {
      subscriptionId: this.$route.params.subscriptionId,
      currencyOptions: {
        currency: "MXN",
        currencyDisplay: "narrowSymbol",
        locale: "en-US",
      },
      formatter: new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }),
    };
  },
  async beforeMount() {
    await this.getCatalogByName({ name: "type_coverages" });
    await this.getCatalogByName({ name: "apply_sir" });
  },
  computed: {
    ...mapGetters(["deductions", "premium", "accountInformation", "risk_type", "toBeDefined", "quotation"]),
    ...mapState({
      boundInsurableProp(state) {
        return this.propEng ? state.boundInsurableProp : state.boundInsurable;
      },
      tiv(state) {
        return this.isNonProportional ? state.tivNon : state.tiv;
      },
    }),

    isNonProportional() {
      return ["2", 2].includes(this.quotation?.typeQuotation);
    },

    selectedRisk() {
      const { typeOfRisk } = this.accountInformation;
      return this.risk_type?.find((v) => v.id === typeOfRisk) || {};
    },

    selectedRiskKey() {
      return this.selectedRisk.key || "";
    },

    typeSelect() {
      return ["PRO", "CPE", "CECR"].includes(this.selectedRiskKey) ? 1 : 2;
    },

    propEng() {
      return ["PRO", "CPE", "CECR"].includes(this.selectedRiskKey);
    },

    isColombia() {
      return [13, "13"].includes(this.accountInformation?.country);
    },

    calculates() {
      const toDecimalSafe = (val) => (val === null || val === undefined || isNaN(val) ? 0 : val);

      const premium = {
        allRisk: toDecimalSafe(this.premium?.propertyDamage),
        allRiskUsd: toDecimalSafe(this.premium?.propertyDamageUsd),
        alop: toDecimalSafe(this.premium?.businessInterruption),
        alopUsd: toDecimalSafe(this.premium?.businessInterruptionUsd),
      };

      const sluLine = toDecimalSafe(this.boundInsurableProp?.sluLine);
      const deductions = this.deductions || {};

      return new NetPremiumEng(premium, deductions, sluLine, true);
    },

    premiumDamage() {
      return this.premium?.propertyDamage || 0;
    },
    premiumBi() {
      return this.premium?.businessInterruption || 0;
    },
    premiumStocks() {
      return this.premium?.stock || 0;
    },
  },
  methods: {
    ...mapActions(["getCatalogByName"]),
  },
  async updated() {
    const data = this.calculates.getData();
    await NetPremiumService.addOrUpdateNetPremium(this.subscriptionId, data, true);
  },
};
</script>

<style lang="less" scoped>
@import "~@/assets/style/Subscription/Bound.less";
.back {
  background: red;
}
.Cont {
  width: 100%;
  height: auto;
  margin-top: 25px;
  .TitleCont {
    h5 {
      font-size: 20px;
      font-weight: 600;
    }
  }

  .table {
    width: 100%;
    height: auto;
    display: flex;
    overflow: auto;
    padding-bottom: 10px;

    &__column {
      min-height: min-content;
      flex: 0 0 18%;
      box-sizing: border-box;
      display: flex;
      justify-content: center;
      align-items: flex-start;
      align-content: flex-start;
      flex-wrap: wrap;

      &--label {
        width: 150px;
        flex: initial;
        * {
          color: #547fa9;
        }
      }

      .input {
        width: 100%;
        height: 60px;
        display: flex;
        justify-content: left;
        padding: 0px 15px;
        margin-bottom: 5px;
        margin-top: 5px;
        &--title {
          font-weight: 600;
        }
        &--label {
          justify-content: flex-end;
        }
        &--total {
          font-weight: 600;
        }
      }

      .divider {
        width: 100%;
        height: 1px;
        background: #d2deed;
      }
    }
  }
}
</style>
