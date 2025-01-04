<template>
  <table class="table-container">
    <thead>
      <tr class="header-row">
        <th class="title-table" colspan="30">Admitted premium</th>
      </tr>
      <tr class="sub-header">
        <th class="subtitle-table">Original Currency</th>
        <th colspan="7"></th>
        <th class="table-header">Share</th>
        <th class="table-header">Brokerage</th>
        <th class="table-header">tax</th>
        <th class="table-header">fronting</th>
        <th class="table-header" colspan="2">ENG fee</th>
        <th class="table-header">Reserve</th>
      </tr>
    </thead>
    <tbody>
      <tr class="data-row">
        <td colspan="8"></td>
        <td class="table-info">
          {{ formatPercentage(boundInsurableProp.sluLine) }}
        </td>
        <td class="table-info">
          {{ formatPercentage(deductibles.brokerage) }}
        </td>
        <td class="table-info">{{ formatPercentage(deductibles.taxes) }}</td>
        <td class="table-info">{{ formatPercentage(deductibles.fronting) }}</td>
        <td class="table-info" colspan="2">
          {{ formatPercentage(deductibles.eng) }}
        </td>
        <td class="table-info">
          {{ formatPercentage(deductibles.premiumReserve) }}
        </td>
      </tr>
      <tr class="data-row">
        <td colspan="30"></td>
      </tr>
    </tbody>
    <thead>
      <tr class="sub-header">
        <th rowspan="2"></th>
        <th colspan="2">TIV MOVEMENT</th>
        <th colspan="2">TIV TOTAL</th>
        <th colspan="2">Rate</th>
        <th class="table-header" colspan="2">Total Premium</th>
        <th class="table-header" colspan="2">Premium SLU</th>
        <th class="table-header" colspan="2">Brokerage</th>
        <th class="table-header" colspan="2">tax</th>
        <th class="table-header" colspan="2">fronting</th>
        <th class="table-header" colspan="2">ENG</th>
        <th class="table-header" colspan="2">Reserve</th>
        <th class="table-header" colspan="2">
          Net to SLU excluding survey fees
        </th>
      </tr>
    </thead>
    <tbody>
      <tr class="data-row highlight">
        <td class="table-header currency">All Risk</td>
        <td colspan="2">{{ formatCurrency(movementValues.allRisk) }}</td>
        <td colspan="2">{{ formatCurrency(totalValues.allRisk) }}</td>
        <td colspan="2">{{ formatCurrency(premium.allRiskRate) }}</td>
        <td colspan="2">{{ formatCurrency(premium.allRisk) }}</td>
        <td colspan="2">{{ formatCurrency(netPremium.allRiskSluShare) }}</td>
        <td colspan="2">{{ formatCurrency(netPremium.allRiskBrokerage) }}</td>
        <td colspan="2">{{ formatCurrency(netPremium.allRiskTaxes) }}</td>
        <td colspan="2">{{ formatCurrency(netPremium.allRiskFronting) }}</td>
        <td colspan="2">{{ formatCurrency(netPremium.allRiskEng) }}</td>
        <td colspan="2">{{ formatCurrency(netPremium.allRiskColombia) }}</td>
        <td colspan="2">
          {{ formatCurrency(netPremium.allRiskNetSLUExcludingSurveyFees) }}
        </td>
      </tr>
      <tr class="data-row highlight">
        <td class="table-header currency">ALOP</td>
        <td colspan="2">{{ formatCurrency(movementValues.alop) }}</td>
        <td colspan="2">{{ formatCurrency(totalValues.alop) }}</td>
        <td colspan="2">
          {{ formatCurrency(premium.alopRate) }}
        </td>
        <td colspan="2">{{ formatCurrency(premium.alop) }}</td>
        <td colspan="2">{{ formatCurrency(netPremium.alopSluShare) }}</td>
        <td colspan="2">{{ formatCurrency(netPremium.alopBrokerage) }}</td>
        <td colspan="2">{{ formatCurrency(netPremium.alopTaxes) }}</td>
        <td colspan="2">{{ formatCurrency(netPremium.alopFronting) }}</td>
        <td colspan="2">{{ formatCurrency(netPremium.alopEng) }}</td>
        <td colspan="2">{{ formatCurrency(netPremium.alopColombia) }}</td>
        <td colspan="2">
          {{ formatCurrency(netPremium.alopNetSLUExcludingSurveyFees) }}
        </td>
      </tr>
      <tr class="totals-row">
        <td class="table-header currency">Total</td>
        <td class="highlight" colspan="2">
          {{ formatCurrency(movementValues.total) }}
        </td>
        <td colspan="2">{{ formatCurrency(totalValues.total) }}</td>
        <td colspan="2"></td>
        <td colspan="2">{{ formatCurrency(premium.totalInsured) }}</td>
        <td colspan="2">{{ formatCurrency(netPremium.sluShareTotal) }}</td>
        <td colspan="2">{{ formatCurrency(netPremium.brokerageTotal) }}</td>
        <td colspan="2">{{ formatCurrency(netPremium.taxesTotal) }}</td>
        <td colspan="2">{{ formatCurrency(netPremium.frontingTotal) }}</td>
        <td colspan="2">{{ formatCurrency(netPremium.engTotal) }}</td>
        <td colspan="2">{{ formatCurrency(netPremium.colombiaTotal) }}</td>
        <td colspan="2">
          {{ formatCurrency(netPremium.netSLUExcludingSurveyFeesTotal) }}
        </td>
      </tr>
    </tbody>
    <thead>
      <tr class="header-row">
        <th class="title-table" colspan="30"></th>
      </tr>
      <tr class="sub-header">
        <th class="subtitle-table">USD</th>
        <th colspan="7"></th>
        <th class="table-header">Share</th>
        <th class="table-header">Brokerage</th>
        <th class="table-header">tax</th>
        <th class="table-header">fronting</th>
        <th class="table-header" colspan="2">ENG fee</th>
        <th class="table-header">Reserve</th>
      </tr>
    </thead>
    <tbody>
      <tr class="data-row">
        <td colspan="8"></td>
        <td class="table-info">
          {{ formatPercentage(boundInsurableProp.sluLine) }}
        </td>
        <td class="table-info">
          {{ formatPercentage(deductibles.brokerage) }}
        </td>
        <td class="table-info">{{ formatPercentage(deductibles.taxes) }}</td>
        <td class="table-info">{{ formatPercentage(deductibles.fronting) }}</td>
        <td class="table-info" colspan="2">
          {{ formatPercentage(deductibles.eng) }}
        </td>
        <td class="table-info">
          {{ formatPercentage(deductibles.premiumReserve) }}
        </td>
      </tr>
      <tr class="data-row">
        <td colspan="30"></td>
      </tr>
    </tbody>
    <thead>
      <tr class="sub-header">
        <th rowspan="2"></th>
        <th colspan="2">TIV MOVEMENT</th>
        <th colspan="2">TIV TOTAL</th>
        <th colspan="2">Rate</th>
        <th class="table-header" colspan="2">Total Premium</th>
        <th class="table-header" colspan="2">Premium SLU</th>
        <th class="table-header" colspan="2">Brokerage</th>
        <th class="table-header" colspan="2">tax</th>
        <th class="table-header" colspan="2">fronting</th>
        <th class="table-header" colspan="2">ENG</th>
        <th class="table-header" colspan="2">Reserve</th>
        <th class="table-header" colspan="2">
          Net to SLU excluding survey fees
        </th>
      </tr>
    </thead>
    <tbody>
      <tr class="data-row highlight">
        <td class="table-header currency">All Risk</td>
        <td colspan="2">{{ formatCurrency(movementValues.allRiskUsd) }}</td>
        <td colspan="2">{{ formatCurrency(totalValues.allRiskUsd) }}</td>
        <td colspan="2">{{ formatCurrency(premium.allRiskRate) }}</td>
        <td colspan="2">{{ formatCurrency(premium.allRiskUsd) }}</td>
        <td colspan="2">{{ formatCurrency(netPremiumUSD.allRiskSluShare) }}</td>
        <td colspan="2">
          {{ formatCurrency(netPremiumUSD.allRiskBrokerage) }}
        </td>
        <td colspan="2">{{ formatCurrency(netPremiumUSD.allRiskTaxes) }}</td>
        <td colspan="2">{{ formatCurrency(netPremiumUSD.allRiskFronting) }}</td>
        <td colspan="2">{{ formatCurrency(netPremiumUSD.allRiskEng) }}</td>
        <td colspan="2">{{ formatCurrency(netPremiumUSD.allRiskColombia) }}</td>
        <td colspan="2">
          {{ formatCurrency(netPremiumUSD.allRiskNetSLUExcludingSurveyFees) }}
        </td>
      </tr>
      <tr class="data-row highlight">
        <td class="table-header currency">ALOP</td>
        <td colspan="2">{{ formatCurrency(movementValues.alopUsd) }}</td>
        <td colspan="2">{{ formatCurrency(totalValues.alopUsd) }}</td>
        <td colspan="2">
          {{ formatCurrency(premium.alopRate) }}
        </td>
        <td colspan="2">
          {{ formatCurrency(premium.alopUsd) }}
        </td>
        <td colspan="2">{{ formatCurrency(netPremiumUSD.alopSluShare) }}</td>
        <td colspan="2">{{ formatCurrency(netPremiumUSD.alopBrokerage) }}</td>
        <td colspan="2">{{ formatCurrency(netPremiumUSD.alopTaxes) }}</td>
        <td colspan="2">{{ formatCurrency(netPremiumUSD.alopFronting) }}</td>
        <td colspan="2">{{ formatCurrency(netPremiumUSD.alopEng) }}</td>
        <td colspan="2">{{ formatCurrency(netPremiumUSD.alopColombia) }}</td>
        <td colspan="2">
          {{ formatCurrency(netPremiumUSD.alopNetSLUExcludingSurveyFees) }}
        </td>
      </tr>
      <tr class="totals-row">
        <td class="table-header currency">Total</td>
        <td class="highlight" colspan="2">
          {{ formatCurrency(movementValues.totalUsd) }}
        </td>
        <td colspan="2">{{ formatCurrency(totalValues.totalUsd) }}</td>
        <td colspan="2"></td>
        <td colspan="2">{{ formatCurrency(premium.totalUsd) }}</td>
        <td colspan="2">{{ formatCurrency(netPremiumUSD.sluShareTotal) }}</td>
        <td colspan="2">{{ formatCurrency(netPremiumUSD.brokerageTotal) }}</td>
        <td colspan="2">{{ formatCurrency(netPremiumUSD.taxesTotal) }}</td>
        <td colspan="2">{{ formatCurrency(netPremiumUSD.frontingTotal) }}</td>
        <td colspan="2">{{ formatCurrency(netPremiumUSD.engTotal) }}</td>
        <td colspan="2">{{ formatCurrency(netPremiumUSD.colombiaTotal) }}</td>
        <td colspan="2">
          {{ formatCurrency(netPremiumUSD.netSLUExcludingSurveyFeesTotal) }}
        </td>
      </tr>
    </tbody>
    <thead>
      <tr class="sub-header">
        <th rowspan="30"></th>
      </tr>
    </thead>
    <tbody>
      <tr class="data-row highlight">
        <td class="currency" colspan="3">Premium payment warranty</td>
        <td colspan="2">{{ formattedDate() }}</td>
      </tr>
      <tr class="data-row highlight">
        <td class="currency" colspan="3">Clausula</td>
        <td colspan="2">{{ report.cartera.clausula }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: "EndorsementReportCompleteTable",
  components: {},
  data() {
    return {};
  },
  props: {
    report: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    boundInsurableProp() {
      return this.report.endorsmentReporData.boundInsurableProp || {};
    },
    deductibles() {
      return this.report.endorsmentReporData.deductibles || {};
    },
    movementValues() {
      return this.report.endorsmentReporData.movementValues || {};
    },
    premium() {
      return this.report.endorsmentReporData.premium || {};
    },
    netPremium() {
      return this.report.endorsmentReporData.netPremium || {};
    },
    netPremiumUSD() {
      return this.report.endorsmentReporData.netPremiumUSD || {};
    },
    totalValues() {
      return this.report.endorsmentReporData.totalValues || {};
    },
  },
  async mounted() {
    console.log("report", this.report.endorsmentReporData);
  },
  methods: {
    formattedDate() {
      if (this.report.cartera && this.report.cartera.premiumPaymentDate) {
        const date = new Date(this.report.cartera.premiumPaymentDate);
        return `${date.getUTCDate().toString().padStart(2, "0")}/${(
          date.getUTCMonth() + 1
        )
          .toString()
          .padStart(2, "0")}/${date.getUTCFullYear()}`;
      }
      return "";
    },
    formatCurrency(value) {
      return value
        ? new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 2,
          }).format(value)
        : "";
    },
    formatPercentage(value) {
      return value ? `${value.toFixed(2)}%` : "";
    },
  },
  watch: {},
};
</script>

<style lang="scss" scoped>
th,
td {
  padding: 12px 15px;
  border: 1px solid #ddd;
}
th {
  text-align: center;
}
td {
  text-align: right;
}
.table-container {
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  text-align: left;
}
.table-header {
  background-color: #376092;
  color: white;
}
.table-info {
  background-color: #d7e4bd;
}
.title-table {
  color: #376092;
  font-weight: bold;
}
.subtitle-table {
  color: #376092;
}
.currency {
  font-weight: bold;
  text-align: left;
}
.totals-row {
  font-weight: bold;
}
.highlight {
  background-color: #dce6f2;
}
</style>
