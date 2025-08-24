<template>
  <div>
    <div class="reinsurers-wrapper">
      <div class="inner-title">New re-insurance DIC</div>

      <div class="reinsurers-inputs">
        <div class="input-width">
          <v-text-field class="disabled" label="Re-insurance name" disabled v-model="detailsNewReinsurandeDic.reInsuranceName" />
        </div>
        <div class="input-width">
          <v-text-field label="Inception date" disabled v-model="detailsNewReinsurandeDic.inceptionDateNewReInsuranceDic" />
        </div>
        <div class="input-width">
          <v-text-field label="Expiry date" disabled v-model="detailsNewReinsurandeDic.expiryDateNewReInsuranceDic" />
        </div>
      </div>

      <div class="reinsurers-inputs" v-for="(value, index) in brokerNewReinsurandeDic" :key="'broker-dic-' + index">
        <div class="input-width">
          <v-text-field label="Re-insurance broker" disabled v-model="value.broker" />
        </div>
        <div class="input-width">
          <v-text-field label="Comission broker" disabled v-model="value.brokerComission" />
        </div>
      </div>

      <div class="reinsurers-Conditions">
        <div class="input-width-Conditions">
          <v-text-field label="Comission SLU" disabled v-model="detailsNewReinsurandeDic.comissionSluNewReInsuranceDic" />
        </div>
        <div class="input-width-Conditions">
          <v-text-field label="To everglades re 1 DIC%" disabled v-model="detailsNewReinsurandeDic.evergladesRe1Dic" />
        </div>
        <div class="input-width-Conditions">
          <v-text-field label="Everglades re 2 DIC%" disabled v-model="detailsNewReinsurandeDic.evergladesRe2Dic" />
        </div>
        <div class="input-width-Conditions">
          <v-text-field label="Associated to" disabled v-model="detailsNewReinsurandeDic.associated" />
        </div>
      </div>

      <div class="inner-title">Restrictions</div>
      <div class="reinsurers-inputs" v-for="(value, index) in restrictionsNewReinsurandeDic" :key="'restriction-dic-' + index">
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
          <v-text-field label="Maximum limit including BI" disabled v-model="detailsNewReinsurandeDic.maximumLimitIncludingBiNewReInsuranceDic" />
        </div>
        <div class="input-width-Conditions">
          <v-text-field label="Maximum limit without BI" disabled v-model="detailsNewReinsurandeDic.maximumLimitWithoutBiNewReInsuranceDic" />
        </div>
        <div class="input-width-Conditions">
          <v-text-field label="Deductions" disabled v-model="detailsNewReinsurandeDic.deductionsNewReInsuranceDic" />
        </div>
        <div class="input-width-Conditions">
          <v-text-field label="Maximum line" disabled v-model="detailsNewReinsurandeDic.maximumLineNewReInsuranceDic" />
        </div>
      </div>
    </div>

    <div class="button-direction">
      <router-link class="direction-button" to="/reinsurers">
        <button class="button-dic">Return</button>
      </router-link>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "NewReinsurandeDicDetails",
  components: {},
  props: {
    detailsNewReinsurandeDic: Object,
    brokerNewReinsurandeDic: Array,
    restrictionsNewReinsurandeDic: Array,
  },
  data() {
    return {
      catalogActivities: [],
      catalogCountries: [],
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
  padding: 0 2rem;
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
.disabled {
  color: #000;
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
.button-direction {
  display: flex;
  flex-direction: row-reverse;
}
.button-dic {
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
