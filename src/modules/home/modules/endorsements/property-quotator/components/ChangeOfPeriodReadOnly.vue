<template>
  <div class="endorsement-wrapper">
    <!-- Endorsement Info -->
    <div class="input-row">
      <div class="inner-title">Endorsement Information</div>

      <div class="input-col">
        <v-text-field
          v-model="data.endorsementEffectiveDate"
          label="Endorsement effective date"
          readonly
        />
      </div>
    </div>

    <!-- Current Period -->
    <div class="input-row">
      <div class="inner-title">Current Period</div>

      <div class="input-col">
        <v-text-field
          v-model="data.currentInceptionDate"
          label="Current Inception date"
          readonly
          disabled
        />
      </div>

      <div class="input-col">
        <v-text-field
          v-model="data.currentExpiryDate"
          label="Current Expiry date"
          readonly
          disabled
        />
      </div>

      <div class="input-col-days">
        <v-text-field
          :value="data.currentPolicyDays"
          label="Days"
          readonly
          disabled
        />
      </div>
    </div>

    <!-- New Period -->
    <div class="input-row">
      <div class="inner-title">New Period</div>

      <div class="input-col">
        <v-text-field
          v-model="data.newInceptionDate"
          label="New Inception date"
          readonly
        />
      </div>

      <div class="input-col">
        <v-text-field
          v-model="data.newExpiryDate"
          label="New Expiry date"
          readonly
        />
      </div>

      <div class="input-col-days">
        <v-text-field :value="data.newPolicyDays" label="Days" readonly />
      </div>
    </div>

    <!-- Additional Information -->
    <div class="input-row">
      <div class="inner-title">Additional Information</div>

      <div class="input-col">
        <v-text-field v-model="data.clause" label="Clause" readonly />
      </div>

      <div class="input-col">
        <v-text-field
          v-model="data.premiumPaymentDate"
          label="Premium payment warranty"
          readonly
        />
      </div>
    </div>

    <!-- Premium Calculations Table -->
    <div class="table-container input-row justify-center">
      <div class="table-title-space"></div>
      <div class="title-col">
        <div class="col-subtitle">Total Premium Moment</div>
        <div class="col-subtitle">Premium SLU</div>
        <div class="col-subtitle">Net Premium</div>
        <div class="col-subtitle mt-4">Total</div>
      </div>

      <div class="table-col">
        <div class="table-title">Original Currency</div>
        <div class="input-row mt-4">
          <div class="inner-col">
            <div class="table-input blue-input">
              ${{
                formatCurrency(
                  data.originalValues.lastInformation.totalPremiumMovement
                )
              }}
            </div>

            <div class="table-input blue-input">
              ${{
                formatCurrency(data.originalValues.lastInformation.PremiumSlu)
              }}
            </div>

            <div class="table-input blue-input">
              ${{
                formatCurrency(data.originalValues.lastInformation.netPremium)
              }}
            </div>

            <div class="table-input mt-4">
              ${{ formatCurrency(data.originalValues.lastInformation.total) }}
            </div>
          </div>

          <div class="inner-col">
            <div class="table-input blue-input">
              ${{
                formatCurrency(
                  data.originalValues.newInformation.totalPremiumMovement
                )
              }}
            </div>

            <div class="table-input blue-input">
              ${{
                formatCurrency(data.originalValues.newInformation.PremiumSlu)
              }}
            </div>

            <div class="table-input blue-input">
              ${{
                formatCurrency(data.originalValues.newInformation.netPremium)
              }}
            </div>

            <div class="table-input mt-4">
              ${{ formatCurrency(data.originalValues.newInformation.total) }}
            </div>
          </div>
        </div>
      </div>

      <div class="table-col">
        <div class="table-title">USD</div>
        <div class="input-row mt-4">
          <div class="inner-col">
            <div class="table-input blue-input">
              ${{
                formatCurrency(
                  data.usdValues.lastInformation.totalPremiumMovement
                )
              }}
            </div>

            <div class="table-input blue-input">
              ${{ formatCurrency(data.usdValues.lastInformation.PremiumSlu) }}
            </div>

            <div class="table-input blue-input">
              ${{ formatCurrency(data.usdValues.lastInformation.netPremium) }}
            </div>

            <div class="table-input mt-4">
              ${{ formatCurrency(data.usdValues.lastInformation.total) }}
            </div>
          </div>

          <div class="inner-col">
            <div class="table-input blue-input">
              ${{
                formatCurrency(
                  data.usdValues.newInformation.totalPremiumMovement
                )
              }}
            </div>

            <div class="table-input blue-input">
              ${{ formatCurrency(data.usdValues.newInformation.PremiumSlu) }}
            </div>

            <div class="table-input blue-input">
              ${{ formatCurrency(data.usdValues.newInformation.netPremium) }}
            </div>

            <div class="table-input mt-4">
              ${{ formatCurrency(data.usdValues.newInformation.total) }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ChangeOfPeriodReadOnly",
  props: {
    data: {
      type: Object,
      required: true,
    },
  },

  methods: {
    formatCurrency(value) {
      if (value == null || isNaN(value)) return "0.00";
      return Number(value).toFixed(2);
    },
  },
};
</script>

<style lang="less" scoped>
.endorsement-wrapper {
  width: 100%;
  height: auto;
  border-radius: 15px;
  background: white;
  box-shadow: 8px 8px 12px rgba(10, 63, 102, 0.15);
  margin-top: 28px;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-content: center;
  padding: 0 20px;
  padding-bottom: 20px;
}

.input-row {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-content: center;
  align-items: flex-start;
  justify-content: flex-start;
  margin-bottom: 20px;
}

.input-col {
  width: 20%;
  display: block;
  margin-right: 30px;
}

.input-col-days {
  width: 15%;
  min-width: 120px;
}

.inner-title {
  width: 100%;
  font-size: 20px;
  font-weight: 800;
  margin: 15px 0;
}

.table-container {
  margin-top: 30px;
  width: 100%;
}

.title-col {
  width: 10%;
}

.table-col {
  width: 40%;
}

.inner-col {
  width: 50%;
}

.table-title {
  height: 50px;
  color: white;
  font-weight: 800;
  background-color: #547fa9;
  border-radius: 6px;
  margin: 2px;
  font-size: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.table-title-space {
  height: 50px;
}

.col-subtitle {
  min-height: 40px;
  font-weight: 800;
  display: flex;
  align-items: center;
}

.table-input {
  min-height: 40px;
  padding: 0 10px;
  display: flex;
  align-items: center;
}

.blue-input {
  background-color: #dce5fc;
}
</style>
