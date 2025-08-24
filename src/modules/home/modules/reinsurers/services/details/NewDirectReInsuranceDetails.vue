<template>
  <div>
    <div class="reinsurers-wrapper">
      <div class="inner-title">New direct re-insurance</div>

      <div class="reinsurers-inputs">
        <div class="input-width">
          <v-text-field label="Re-insurance name" disabled v-model="detailsNewDirectReInsuranceDetails.reInsuranceNameNewDirectReInsurance" />
        </div>
        <div class="input-width">
          <v-text-field label="Inception date" disabled v-model="detailsNewDirectReInsuranceDetails.inceptionDateNewDirectReInsurance" />
        </div>
        <div class="input-width">
          <v-text-field label="Expiry date" disabled v-model="detailsNewDirectReInsuranceDetails.expiryDateNewDirectReInsurance" />
        </div>
      </div>

      <div class="reinsurers-inputs" v-for="(value, index) in brokerNewDirectReInsurance" :key="'broker-' + index">
        <div class="input-width">
          <v-text-field label="Re-insurance broker" disabled v-model="value.broker" />
        </div>
        <div class="input-width">
          <v-text-field label="Comission broker" disabled v-model="value.brokerComission" />
        </div>
      </div>

      <div class="reinsurers-inputs">
        <div class="input-width">
          <v-text-field label="Retrocession" disabled v-model="detailsNewDirectReInsuranceDetails.retrocession" />
        </div>
        <div class="input-width">
          <v-text-field label="Company" disabled v-model="detailsNewDirectReInsuranceDetails.companyNewDirectReInsurance" />
        </div>
        <div class="input-width">
          <v-text-field label="Comission" disabled v-model="detailsNewDirectReInsuranceDetails.comissionNewDirectReInsurance" />
        </div>
      </div>

      <div class="reinsurers-inputs">
        <div class="input-width">
          <v-text-field label="Comission SLU" disabled v-model="detailsNewDirectReInsuranceDetails.comissionSluNewDirectReInsurance" />
        </div>
        <div class="input-width">
          <v-text-field label="Percenntage amount to re-insurance" disabled v-model="detailsNewDirectReInsuranceDetails.percenntageAmountReInsurance" />
        </div>
      </div>

      <div class="inner-title">Restrictions</div>
      <div class="reinsurers-inputs" v-for="(value, index) in restrictionsNewDirectReInsurance" :key="'restriction-' + index">
        <div class="input-width">
          <v-text-field label="Activities" disabled v-model="value.activityName" />
        </div>
        <div class="input-width">
          <v-text-field label="Countries" disabled v-model="value.countryName" />
        </div>
      </div>

      <div class="inner-title">Conditions</div>
      <div class="reinsurers-Conditions">
        <div class="input-width-Conditions">
          <v-text-field label="Maximum limit including BI" disabled v-model="detailsNewDirectReInsuranceDetails.maximumLimitIncludingBiNewDirectReInsurance" />
        </div>
        <div class="input-width-Conditions">
          <v-text-field label="Maximum limit without BI" disabled v-model="detailsNewDirectReInsuranceDetails.maximumLimitWithoutBiNewDirectReInsurance" />
        </div>
        <div class="input-width-Conditions">
          <v-text-field label="Deductions" disabled v-model="detailsNewDirectReInsuranceDetails.deductionsNewDirectReInsurance" />
        </div>
        <div class="input-width-Conditions">
          <v-text-field label="Operate as" disabled v-model="detailsNewDirectReInsuranceDetails.operateAs" />
        </div>
      </div>

      <div class="title-checkbox">Which items are included in the deductions</div>
      <div class="reinsurers-checkbox">
        <div class="checkbox-width">
          <v-checkbox v-model="checkedDeductions" color="#003D6D" value="Brokerage" />
          <label for="Brokerage">Brokerage</label>
        </div>
        <div class="checkbox-width">
          <v-checkbox v-model="checkedDeductions" color="#003D6D" value="Fronting fee" />
          <label for="Fronting fee">Fronting fee</label>
        </div>
        <div class="checkbox-width">
          <v-checkbox v-model="checkedDeductions" color="#003D6D" value="Tax" />
          <label for="Tax">Tax</label>
        </div>
      </div>

      <div class="reinsurers-checkbox">
        <div class="checkbox-width">
          <v-checkbox v-model="checkedDeductions" color="#003D6D" value="Eng fee" />
          <label for="Eng fee">Eng fee</label>
        </div>
        <div class="checkbox-width">
          <v-checkbox v-model="checkedDeductions" color="#003D6D" value="LTA" />
          <label for="LTA">LTA</label>
        </div>
        <div class="checkbox-width">
          <v-checkbox v-model="checkedDeductions" color="#003D6D" value="Others" />
          <label for="Others">Others</label>
        </div>
      </div>

      <div class="title-checkbox">Does the deduction include the SLU commission</div>
      <div class="reinsurers-checkbox">
        <div class="checkbox-width">
          <v-checkbox v-model="checkedCommission" color="#003D6D" value="Yes" />
          <label for="Yes">Yes</label>
        </div>
        <div class="checkbox-width">
          <v-checkbox v-model="checkedCommission" color="#003D6D" value="No" />
          <label for="No">No</label>
        </div>
        <div class="checkbox-width"></div>
      </div>

      <div class="reinsurers-Conditions">
        <div class="input-width-Conditions">
          <v-text-field label="Maximum line" disabled v-model="detailsNewDirectReInsuranceDetails.maximumLineNewDirectReInsurance" />
        </div>
        <div class="input-width-Conditions">
          <v-text-field label="Fronting special conditions" disabled v-model="detailsNewDirectReInsuranceDetails.frontingSpecialConditions" />
        </div>
        <div class="input-width-Conditions">
          <v-text-field label="Fronting agreed with the reinsurer" disabled v-model="detailsNewDirectReInsuranceDetails.frontingAgreedWithTheReinsurer" />
        </div>
        <div class="input-width-Conditions">
          <v-text-field label="Applies" disabled v-model="detailsNewDirectReInsuranceDetails.applies" />
        </div>
      </div>
    </div>

    <div class="button-direction">
      <router-link class="direction-button" to="/reinsurers">
        <button class="button-new-direct">Return</button>
      </router-link>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "NewDirectReInsuranceDetails",
  components: {},
  props: {
    detailsNewDirectReInsuranceDetails: Object,
    brokerNewDirectReInsurance: Array,
    restrictionsNewDirectReInsurance: Array,
  },
  data() {
    return {
      catalogActivities: [],
      catalogCountries: [],
      checkedDeductions: [],
      checkedCommission: [],
    };
  },
  computed: {
    ...mapGetters(["countries", "activities"]),
  },
  methods: {
    ...mapActions(["getCatalogByName", "createReinsurer"]),
  },
  async mounted() {
    await this.getCatalogByName({ name: "activities" });
    await this.getCatalogByName({ name: "countries" });
    this.catalogCountries = this.countries.map((c) => c.description);
    this.catalogActivities = this.activities.map((a) => a.description);
  },
};
</script>
<style lang="less" scoped>
.reinsurers-wrapper {
  width: 100%;
  height: auto;
  border-radius: 5px;
  background: white;
  //box-shadow: 8px 8px 12px rgba(10, 63, 102, 0.15);
  margin-top: 2rem;
  margin-bottom: 2rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-content: center;
  padding: 0 2rem 2rem;
}
.inner-title {
  width: 100%;
  font-size: 20px;
  font-weight: 800;
  margin: 15px 0;
}
.reinsurers-inputs {
  width: 80%;
  padding-left: 5rem;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1.5rem;
}
.input-width {
  width: 31%;
}
.plus {
  width: 1.5rem;
  height: 1.5rem;
  display: flex;
  font-weight: 500;
  justify-content: center;
  align-items: center;
  background-color: #d2deed;
  border-radius: 5px;
  cursor: pointer;
}
.reinsurers-Conditions {
  width: 100%;
  padding-left: 5rem;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1.5rem;
}
.input-width-Conditions {
  width: 22%;
}
.title-checkbox {
  display: block;
  width: 100%;
  font-family: "Avenir";
  font-style: normal;
  font-size: 20px;
  font-weight: 400;
  margin-top: 1rem;
  margin-bottom: 1rem;
}
.reinsurers-checkbox {
  width: 55%;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1rem;
}
.checkbox-width {
  display: flex;
  align-items: center;
  width: 31.5%;
}

.checkbox-width label {
  font-family: "Avenir";
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
}
.button-direction {
  display: flex;
  flex-direction: row-reverse;
}
.button-new-direct {
  box-sizing: border-box;
  border: 1px solid #003d6d;
  border-radius: 5px;
  width: 12rem;
  height: 3rem;
  font-family: "Avenir";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 110%;
  text-align: center;
  color: #003d6d;
  margin-bottom: 2rem;
}
</style>
