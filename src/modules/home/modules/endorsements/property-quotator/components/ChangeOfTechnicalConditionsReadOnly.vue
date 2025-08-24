<template>
  <div class="endorsement-wrapper">
    <!-- Endorsement Information -->
    <div class="input-row">
      <div class="inner-title">Endorsement Information</div>

      <div class="input-col">
        <v-text-field
          v-model="data.endorsementEffectiveDate"
          label="Endorsement effective date"
          readonly
        />
      </div>

      <div class="input-col">
        <v-text-field v-model="data.expiryDate" label="Expiry date" readonly />
      </div>

      <div class="input-col-days">
        <v-text-field :value="data.days" label="Days" readonly />
      </div>
    </div>

    <!-- Technical Conditions Changes -->
    <div v-if="data.technicalConditionsChanges">
      <!-- Deductibles Section -->
      <div
        v-if="
          data.technicalConditionsChanges.deductibles &&
          data.technicalConditionsChanges.deductibles.length > 0
        "
        class="technical-conditions-section"
      >
        <div class="section-title">
          <v-icon class="mr-2">mdi-shield-outline</v-icon>
          Modified Deductibles
        </div>

        <div
          v-for="deductible in data.technicalConditionsChanges.deductibles"
          :key="deductible.id"
          class="condition-item"
        >
          <div class="condition-header">
            <strong>Location:</strong>
            {{ deductible.location || "Not specified" }}
          </div>

          <div class="condition-details">
            <div
              v-if="deductible.volcanic_eruption !== undefined"
              class="detail-row"
            >
              <span class="detail-label">Volcanic Eruption:</span>
              <span class="detail-value">{{
                formatValue(deductible.volcanic_eruption)
              }}</span>
            </div>

            <div
              v-if="deductible.hidrometeorological !== undefined"
              class="detail-row"
            >
              <span class="detail-label">Hydrometeorological:</span>
              <span class="detail-value">{{
                formatValue(deductible.hidrometeorological)
              }}</span>
            </div>

            <div v-if="deductible.minimum_volcanic" class="detail-row">
              <span class="detail-label">Minimum Volcanic:</span>
              <span class="detail-value">{{
                formatCurrency(deductible.minimum_volcanic)
              }}</span>
            </div>

            <div v-if="deductible.maximum_volcanic" class="detail-row">
              <span class="detail-label">Maximum Volcanic:</span>
              <span class="detail-value">{{
                formatCurrency(deductible.maximum_volcanic)
              }}</span>
            </div>

            <div
              v-if="deductible.minimum_hidrometeorological"
              class="detail-row"
            >
              <span class="detail-label">Minimum Hydrometeorological:</span>
              <span class="detail-value">{{
                formatCurrency(deductible.minimum_hidrometeorological)
              }}</span>
            </div>

            <div
              v-if="deductible.maximum_hidrometeorological"
              class="detail-row"
            >
              <span class="detail-label">Maximum Hydrometeorological:</span>
              <span class="detail-value">{{
                formatCurrency(deductible.maximum_hidrometeorological)
              }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Sublimits Section -->
      <div
        v-if="
          data.technicalConditionsChanges.sublimits &&
          data.technicalConditionsChanges.sublimits.length > 0
        "
        class="technical-conditions-section"
      >
        <div class="section-title">
          <v-icon class="mr-2">mdi-format-list-numbered</v-icon>
          Modified Sublimits
        </div>

        <div
          v-for="sublimit in data.technicalConditionsChanges.sublimits"
          :key="sublimit.id"
          class="condition-item"
        >
          <div class="condition-header">
            <strong>Location:</strong>
            {{ sublimit.location || "Not specified" }}
          </div>

          <div class="condition-details">
            <div v-if="sublimit.sublimits1" class="detail-row">
              <span class="detail-label">{{ sublimit.sublimits1 }}:</span>
              <span class="detail-value">{{
                formatCurrency(sublimit.sublimits_value1)
              }}</span>
            </div>

            <div v-if="sublimit.sublimits2" class="detail-row">
              <span class="detail-label">{{ sublimit.sublimits2 }}:</span>
              <span class="detail-value">{{
                formatCurrency(sublimit.sublimits_value2)
              }}</span>
            </div>
          </div>
        </div>
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
          label="Premium payment date"
          readonly
        />
      </div>
    </div>

    <!-- Premium Calculations Table -->
    <div class="table-container input-row justify-center">
      <div class="table-title-space"></div>
      <div class="title-col">
        <div class="col-subtitle">Total Premium Movement</div>
        <div class="col-subtitle">Premium SLU</div>
        <div class="col-subtitle">Net Premium</div>
        <div class="col-subtitle mt-4">Total</div>
      </div>

      <div class="table-col">
        <div class="table-title">Original Currency</div>
        <div class="input-row mt-4">
          <div class="inner-col">
            <div class="table-input blue-input">
              ${{ formatCurrency(data.originalValues.totalPremiumMovement) }}
            </div>

            <div class="table-input blue-input">
              ${{ formatCurrency(data.originalValues.premiumSlu) }}
            </div>

            <div class="table-input blue-input">
              ${{ formatCurrency(data.originalValues.netPremium) }}
            </div>

            <div class="table-input mt-4">
              ${{ formatCurrency(data.originalValues.total) }}
            </div>
          </div>
        </div>
      </div>

      <div class="table-col">
        <div class="table-title">USD</div>
        <div class="input-row mt-4">
          <div class="inner-col">
            <div class="table-input blue-input">
              ${{ formatCurrency(data.usdValues.totalPremiumMovement) }}
            </div>

            <div class="table-input blue-input">
              ${{ formatCurrency(data.usdValues.premiumSlu) }}
            </div>

            <div class="table-input blue-input">
              ${{ formatCurrency(data.usdValues.netPremium) }}
            </div>

            <div class="table-input mt-4">
              ${{ formatCurrency(data.usdValues.total) }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ChangeOfTechnicalConditionsReadOnly",
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

    formatValue(value) {
      if (value == null || value === "") return "Not specified";
      return value;
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

.technical-conditions-section {
  width: 100%;
  margin: 30px 0;
  padding: 20px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background-color: #fafafa;
}

.section-title {
  font-size: 18px;
  font-weight: 700;
  color: #003d6d;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
}

.condition-item {
  background: white;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  padding: 15px;
  margin: 10px 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.condition-header {
  font-size: 16px;
  margin-bottom: 10px;
  color: #003d6d;
  border-bottom: 1px solid #eee;
  padding-bottom: 8px;
}

.condition-details {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.detail-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 3px 0;
}

.detail-label {
  font-weight: 600;
  color: #666;
  min-width: 200px;
}

.detail-value {
  font-weight: 500;
  color: #333;
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
