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
          <currency-input
            :value="calculates.allRiskSluShare()"
            :options="currencyOptions"
            disabled
          />
        </div>
        <div class="input">
          <currency-input
            :value="calculates.alopSluShare()"
            :options="currencyOptions"
            disabled
          />
        </div>
        <div class="input input--total">{{ calculates.sluShareTotal() }}</div>
      </div>

      <!-- Brokerage -->
      <div class="table__column">
        <div class="input input--title">Brokerage</div>
        <div class="divider" />
        <div class="input">
          <currency-input
            :value="calculates.allRiskBrokerage()"
            :options="currencyOptions"
            disabled
          />
        </div>
        <div class="input">
          <currency-input
            :value="calculates.alopBrokerage()"
            :options="currencyOptions"
            disabled
          />
        </div>
        <div class="input input--total">{{ calculates.brokerageTotal() }}</div>
      </div>

      <!-- Taxes -->
      <div class="table__column">
        <div class="input input--title">Taxes</div>
        <div class="divider" />
        <div class="input">
          <currency-input
            :value="calculates.allRiskTaxes()"
            :options="currencyOptions"
            disabled
          />
        </div>
        <div class="input">
          <currency-input
            :value="calculates.alopTaxes()"
            :options="currencyOptions"
            disabled
          />
        </div>
        <div class="input input--total">{{ calculates.taxesTotal() }}</div>
      </div>

      <!-- Engineering Fees -->
      <div class="table__column">
        <div class="input input--title">Engineering Fees</div>
        <div class="divider" />
        <div class="input">
          <currency-input
            :value="calculates.allRiskEng()"
            :options="currencyOptions"
            disabled
          />
        </div>
        <div class="input">
          <currency-input
            :value="calculates.alopEng()"
            :options="currencyOptions"
            disabled
          />
        </div>
        <div class="input input--total">{{ calculates.engTotal() }}</div>
      </div>

      <!-- Fronting Fee -->
      <div class="table__column">
        <div class="input input--title">Fronting Fee</div>
        <div class="divider" />
        <div class="input">
          <currency-input
            :value="calculates.allRiskFronting()"
            :options="currencyOptions"
            disabled
          />
        </div>
        <div class="input">
          <currency-input
            :value="calculates.alopFronting()"
            :options="currencyOptions"
            disabled
          />
        </div>
        <div class="input input--total">{{ calculates.frontingTotal() }}</div>
      </div>

      <!-- Premium Reserve -->
      <div class="table__column">
        <div class="input input--title">Premium Reserve</div>
        <div class="divider" />
        <div class="input">
          <currency-input
            :value="calculates.allRiskColombia()"
            :options="currencyOptions"
            disabled
          />
        </div>
        <div class="input">
          <currency-input
            :value="calculates.alopColombia()"
            :options="currencyOptions"
            disabled
          />
        </div>
        <div class="input input--total">{{ calculates.colombiaTotal() }}</div>
      </div>

      <!-- Net premium -->
      <div class="table__column">
        <div class="input input--title">Net premium</div>
        <div class="divider" />
        <div class="input">
          <currency-input
            :value="calculates.allRiskNetSLU()"
            :options="currencyOptions"
            disabled
          />
        </div>
        <div class="input">
          <currency-input
            :value="calculates.alopNetSLU()"
            :options="currencyOptions"
            disabled
          />
        </div>
        <div class="input input--total">
          {{ calculates.netSLUTotal() }}
        </div>
      </div>
      <!-- Net premium excluding fronting -->
      <div class="table__column">
        <div class="input input--title">Net premium excluding fronting</div>
        <div class="divider" />
        <div class="input">
          <currency-input
            :value="calculates.allRiskNetSLUExcludingFronting()"
            :options="currencyOptions"
            disabled
          />
        </div>
        <div class="input">
          <currency-input
            :value="calculates.alopNetSLUExcludingFronting()"
            :options="currencyOptions"
            disabled
          />
        </div>
        <div class="input input--total">
          {{ calculates.netSLUExcludingFrontingTotal() }}
        </div>
      </div>
      <!-- Net to SLU excluding survey fees -->
      <div class="table__column">
        <div class="input input--title">Net to SLU excluding survey fees</div>
        <div class="divider" />
        <div class="input">
          <currency-input
            :value="calculates.allRiskNetSLUExcludingSurveyFees()"
            :options="currencyOptions"
            disabled
          />
        </div>
        <div class="input">
          <currency-input
            :value="calculates.alopNetSLUExcludingSurveyFees()"
            :options="currencyOptions"
            disabled
          />
        </div>
        <div class="input input--total">
          {{ calculates.netSLUExcludingSurveyFeesTotal() }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";

/* components */
import CurrencyInput from "@/components/CurrencyInput/CurrencyInput.vue";

//classes
import NetPremiumEng from "@/application/class/NetPremiumEng";

//servicios
import NetPremiumService from "@/modules/home/services/net-premium.service";

export default {
  name: "NetPremiumProperty",
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
    ...mapGetters([
      "deductions",
      "premium",
      "accountInformation",
      "risk_type",
      "toBeDefined",
      "quotation",
    ]),
    ...mapState({
      boundInsurableProp(state) {
        if (this.propEng) return state.boundInsurableProp;
        return state.boundInsurable;
      },
      tiv(state) {
        if (this.isNonProportional) return state.tivNon;
        return state.tiv;
      },
    }),
    isNonProportional() {
      const valids = [2, "2"];
      if (valids.includes(this.quotation.typeQuotation)) {
        return true;
      }
      return false;
    },
    // tipo de riesgo
    selectedRisk: {
      get() {
        if (
          this.accountInformation.typeOfRisk &&
          this.risk_type &&
          this.risk_type.length > 0
        ) {
          const typeObj = this.risk_type.find(
            (v) => v.id === this.accountInformation.typeOfRisk
          );
          return typeObj;
        }
        return 0;
      },
    },
    selectedRiskKey() {
      return this.selectedRisk.key || "";
    },
    typeSelect() {
      const valid = ["PRO", "CPE", "CECR"];
      if (valid.includes(this.selectedRiskKey)) return 1;
      return 2;
    },
    propEng() {
      const valid = ["PRO", "CPE", "CECR"];
      if (valid.includes(this.selectedRiskKey)) return true;
      return false;
    },
    // country
    isColombia() {
      const country = this.accountInformation.country;
      const valids = [13, "13"];
      if (valids.includes(country)) return true;
      return false;
    },
    calculates() {
      const allRisk = this.premium.propertyDamage;
      const allRiskUsd = this.premium.propertyDamageUsd;
      const alop = this.premium.businessInterruption;
      const alopUsd = this.premium.businessInterruptionUsd;
      const sluLine = this.boundInsurableProp.sluLine;

      return new NetPremiumEng(
        { allRisk, allRiskUsd, alop, alopUsd },
        this.deductions,
        sluLine,
        true
      );
    },
    // vuex aliases
    premiumDamage: {
      get() {
        return this.premium.propertyDamage || 0;
      },
    },
    premiumBi: {
      get() {
        return this.premium.businessInterruption || 0;
      },
    },
    premiumStocks: {
      get() {
        return this.premium.stock || 0;
      },
    },
  },
  methods: {
    ...mapActions(["getCatalogByName"]),
  },
  async updated() {
    const data = this.calculates.getData();
    await NetPremiumService.addOrUpdateNetPremium(
      this.subscriptionId,
      data,
      true
    );
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
        justify-content: center;
        align-items: center;
        padding: 0px 15px;
        margin-bottom: 5px;
        margin-top: 5px;
        &--title {
          font-weight: 700;
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
