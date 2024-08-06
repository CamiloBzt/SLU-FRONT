<template>
  <div class="input-row w-100 d-flex flex-wrap">

    <div class="table-container input-row justify-center">
      <div class="title-col">
        <div class="table-title-space"></div>
        <div v-for="subtitle in subtitleList">
          <div class="col-subtitle">{{ subtitle }}</div>
        </div>
      </div>

      <div class="table-col">
        <div class="table-title leftStyle">Original Currency</div>
        <div class="input-row">
          <div class="inner-col wide-col">
            <div v-for="(value, index) in originalCurrencyDatas">
              <div class="table-input blue-input">
                {{ index == 'totalPremium' || index == 'premiumSLU' || index == 'netPremium' ? formatCurrency(value) :
                  formatPercent(value) }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="table-col">
        <div class="table-title rightStyle">USD</div>
        <div class="input-row">
          <div class="inner-col wide-col">
            <div v-for="(value, index) in usdDatas">
              <div class="table-input blue-input">
                {{ index == 'totalPremium' || index == 'premiumSLU' || index == 'netPremium' ? formatCurrency(value) :
                  formatPercent(value) }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
/* utils */
import { formatCurrency } from "../utils";

export default {
  name: "CancellationTable",
  props: { accountComplete: { type: Object } },
  data() {
    return {
      originalCurrencyDatas: {
        brokerage: this.accountComplete.deductibles.brokerage,
        tax: this.accountComplete.deductibles.taxes,
        LTA: this.accountComplete.deductibles.lta,
        others: this.accountComplete.deductibles.others,
        engFee: this.accountComplete.deductibles.eng,
        fronting: this.accountComplete.deductibles.fronting,
        totalPremium: 0,
        premiumSLU: 0,
        netPremium: 0,
      },
      usdDatas:
      {
        brokerage: 0,
        tax: 0,
        LTA: 0,
        others: 0,
        engFee: 0,
        fronting: 0,
        totalPremium: 0,
        premiumSLU: 0,
        netPremium: 0,
      },
      subtitleList: ['Brokerage', 'Tax', 'LTA', 'Others', 'Eng fee', 'Fronting', 'Total premium', 'Premium SLU', 'Net premium'],
    };
  },
  async beforeMount() { },
  async mounted() {
    console.log('this.accountComplete --->', this.accountComplete)
  },
  computed: {},
  watch: {},
  methods: {
    formatCurrency(amount) {
      return formatCurrency(amount);
    },
    formatPercent(amount) {
      return '% ' + amount
    },
  },
};
</script>
<style lang="less" scoped>
@import "~@/assets/style/AccordionStyle.less";

.input-col {
  width: 20%;
  display: block;
  margin-right: 30px;
}

.input-cont {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  align-content: center;
  margin: 5px 0;
}

.input-row {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-content: center;
  align-items: flex-start;
  justify-content: flex-start;
}

.table-container {
  margin-top: 30px;
}

.title-col {
  width: 15%;
}

.table-title-space {
  height: 54px;
}

.col-subtitle {
  min-height: 40px;
  font-weight: 800;
  display: flex;
  align-items: center;
}

.table-col {
  width: 35%;

  .inner-col {
    width: 50%;
  }
}

.table-title {
  height: 50px;
  color: white;
  font-weight: 800;
  background-color: #547fa9;
  margin: 2px;
  font-size: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.leftStyle {
  border-top-left-radius: 6px;
  border-bottom-left-radius: 6px;
}

.rightStyle {
  border-top-right-radius: 6px;
  border-bottom-right-radius: 6px;
}

.wide-col {
  width: 100% !important;
}

.table-input {
  min-height: 40px;
  padding: 0 10px;
  display: flex;
  align-items: center;
}

.blue-input {
  border: 1px solid #547fa9;
}
</style>
