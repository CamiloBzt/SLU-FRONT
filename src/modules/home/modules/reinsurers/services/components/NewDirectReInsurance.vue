<template>
  <div>
    <div class="reinsurers-wrapper">
      <div class="inner-title">New direct re-insurance</div>
      <div class="reinsurers-inputs">
        <div class="input-width">
          <v-text-field label="Re-insurance name" v-model="reinsuranceRegistry.reInsuranceNameNewDirectReInsurance"> </v-text-field>
        </div>
        <div class="input-width">
          <v-menu v-model="menu2" :close-on-content-click="false" :nudge-right="40" transition="scale-transition" offset-y min-width="auto">
            <template v-slot:activator="{ on, attrs }">
              <v-text-field v-model="reinsuranceRegistry.inceptionDateNewDirectReInsurance" label="Endorsement effective" v-bind="attrs" v-on="on"></v-text-field>
            </template>
            <v-date-picker v-model="reinsuranceRegistry.inceptionDateNewDirectReInsurance" @input="menu2 = false"></v-date-picker>
          </v-menu>
        </div>
        <div class="input-width">
          <v-text-field label="Expiry date" v-model="reinsuranceRegistry.expiryDateNewDirectReInsurance"> </v-text-field>
        </div>
      </div>
      <div class="reinsurers-inputs" v-for="(value, index) in broker" :key="index">
        <button class="plus" @click="deleteBroker(index)">-</button>
        <div class="input-width">
          <v-text-field label="Re-insurance broker" v-model="value.reInsuranceBroker"> </v-text-field>
        </div>
        <div class="input-width">
          <v-text-field label="Comission broker" v-model="value.comissionBroker"> </v-text-field>
        </div>
        <button class="plus" @click="addBroker()">+</button>
      </div>
      <div class="reinsurers-inputs">
        <div class="input-width">
          <v-text-field label="Retrocession" v-model="reinsuranceRegistry.retrocession"> </v-text-field>
        </div>
        <div class="input-width">
          <v-text-field label="Company" v-model="reinsuranceRegistry.companyNewDirectReInsurance"> </v-text-field>
        </div>
        <div class="input-width">
          <v-text-field label="Comission" v-model="reinsuranceRegistry.comissionNewDirectReInsurance"> </v-text-field>
        </div>
      </div>
      <div class="reinsurers-inputs">
        <div class="input-width">
          <v-text-field label="Comission SLU" v-model="reinsuranceRegistry.comissionSluNewDirectReInsurance"> </v-text-field>
        </div>
        <div class="input-width">
          <v-text-field label="Percenntage amount to re-insurance" v-model="reinsuranceRegistry.percenntageAmountReInsurance"> </v-text-field>
        </div>
      </div>
      <div class="inner-title">Restrictions</div>
      <div class="reinsurers-inputs" v-for="(value, index) in activitiesAndCountries" :key="index">
        <button class="plus" @click="deleteSelects(index)">-</button>
        <div class="input-width">
          <v-autocomplete label="Activities" v-model="value.valueActivities" :items="catalogActivities" item-value="id" item-text="type" />
        </div>
        <div class="input-width">
          <v-autocomplete label="Countries" v-model="value.valueCountries" :items="catalogCountries" item-value="id" item-text="type" />
        </div>
        <button v-if="index === activitiesAndCountries.length - 1" class="plus" @click="addSelects()">+</button>
      </div>
      <div class="inner-title">Conditions</div>
      <div class="reinsurers-Conditions">
        <div class="input-width-Conditions">
          <v-text-field label="Maximum limit including BI" v-model="reinsuranceRegistry.maximumLimitIncludingBiNewDirectReInsurance"> </v-text-field>
        </div>
        <div class="input-width-Conditions">
          <v-text-field label="Maximum limit without BI" v-model="reinsuranceRegistry.maximumLimitWithoutBiNewDirectReInsurance"> </v-text-field>
        </div>
        <div class="input-width-Conditions">
          <v-text-field label="Deductions" v-model="reinsuranceRegistry.deductionsNewDirectReInsurance"> </v-text-field>
        </div>
        <div class="input-width-Conditions">
          <v-text-field label="Operate as" v-model="reinsuranceRegistry.operateAs"> </v-text-field>
        </div>
      </div>
      <div class="title-checkbox">Which items are included in the deductions</div>
      <div class="reinsurers-checkbox">
        <div class="checkbox-width">
          <v-checkbox v-model="checkedDeductions" color="#003D6D" value="Brokerage"></v-checkbox>
          <label for="Brokerage">Brokerage</label>
        </div>
        <div class="checkbox-width">
          <v-checkbox v-model="checkedDeductions" color="#003D6D" value="Fronting fee"></v-checkbox>
          <label for="Fronting fee">Fronting fee</label>
        </div>
        <div class="checkbox-width">
          <v-checkbox v-model="checkedDeductions" color="#003D6D" value="Tax"></v-checkbox>
          <label for="Tax">Tax</label>
        </div>
      </div>
      <div class="reinsurers-checkbox">
        <div class="checkbox-width">
          <v-checkbox v-model="checkedDeductions" color="#003D6D" value="Eng fee"></v-checkbox>
          <label for="Eng fee">Eng fee</label>
        </div>
        <div class="checkbox-width">
          <v-checkbox v-model="checkedDeductions" color="#003D6D" value="LTA"></v-checkbox>
          <label for="LTA">LTA</label>
        </div>
        <div class="checkbox-width">
          <v-checkbox v-model="checkedDeductions" color="#003D6D" value="Others"></v-checkbox>
          <label for="Others">Others</label>
        </div>
        <!-- <h4>checkedDeductions: {{ checkedDeductions }} </h4> -->
      </div>
      <div class="title-checkbox">Does the deduction include the SLU commission</div>
      <div class="reinsurers-checkbox">
        <div class="checkbox-width">
          <v-checkbox v-model="checkedCommission" color="#003D6D" value="Yes"></v-checkbox>
          <label for="Yes">Yes</label>
        </div>
        <div class="checkbox-width">
          <v-checkbox v-model="checkedCommission" color="#003D6D" value="No"></v-checkbox>
          <label for="No">No</label>
        </div>
        <div class="checkbox-width"></div>
      </div>
      <div class="reinsurers-Conditions">
        <div class="input-width-Conditions">
          <v-text-field label="Maximum line" v-model="reinsuranceRegistry.maximumLineNewDirectReInsurance"> </v-text-field>
        </div>
        <div class="input-width-Conditions">
          <v-text-field label="Fronting special conditions" v-model="reinsuranceRegistry.frontingSpecialConditions"> </v-text-field>
        </div>
        <div class="input-width-Conditions">
          <v-text-field label="Fronting agreed with the reinsurer" v-model="reinsuranceRegistry.frontingAgreedWithTheReinsurer"> </v-text-field>
        </div>
        <div class="input-width-Conditions">
          <v-text-field label="Applies" v-model="reinsuranceRegistry.applies"> </v-text-field>
        </div>
      </div>
    </div>
    <transition name="fade">
      <div class="modal-overly" v-if="showModal"></div>
    </transition>

    <transition name="fade">
      <div class="modal" v-if="showModal">
        <p class="title-modal">Create</p>
        <hr class="line" />
        <div class="text-modal">
          <div>Your reinsurer has been successfully created.</div>
        </div>
        <div class="button-modal-direction">
          <button class="button-modal" @click="closeModal()">Close</button>
        </div>
      </div>
    </transition>
    <div class="button-direction">
      <button class="button-new-direct" @click="submit()">Create</button>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "NewDirectReInsurance",
  components: {},
  data() {
    return {
      reinsuranceRegistry: {
        reInsuranceNameNewDirectReInsurance: "",
        inceptionDateNewDirectReInsurance: "",
        expiryDateNewDirectReInsurance: "",
        retrocession: "",
        companyNewDirectReInsurance: "",
        comissionNewDirectReInsurance: "",
        comissionSluNewDirectReInsurance: "",
        percenntageAmountReInsurance: "",
        maximumLimitIncludingBiNewDirectReInsurance: "",
        maximumLimitWithoutBiNewDirectReInsurance: "",
        deductionsNewDirectReInsurance: "",
        operateAs: "",
        maximumLineNewDirectReInsurance: "",
        frontingSpecialConditions: "",
        frontingAgreedWithTheReinsurer: "",
        applies: "",
      },
      broker: [
        {
          reInsuranceBroker: "",
          comissionBroker: "",
        },
      ],
      activitiesAndCountries: [
        {
          valueActivities: "",
          idActivities: 0,
          valueCountries: "",
          idCountries: 0,
        },
      ],
      catalogActivities: [],
      catalogCountries: [],
      checkedDeductions: [],
      checkedCommission: [],
      menu2: false,
      showModal: false,
    };
  },
  computed: {
    ...mapGetters(["countries", "activities"]),
  },
  methods: {
    ...mapActions(["getCatalogByName", "createReinsurer"]),
    closeModal() {
      this.showModal = false;
    },
    addSelects() {
      this.activitiesAndCountries.push({
        valueActivities: "",
        idActivities: 0,
        valueCountries: "",
        idCountries: 0,
      });
    },
    deleteSelects(index) {
      if (this.activitiesAndCountries.length === 1) {
        this.activitiesAndCountries = [
          {
            valueActivities: "",
            idActivities: 0,
            valueCountries: "",
            idCountries: 0,
          },
        ];
        return;
      }

      this.activitiesAndCountries.splice(index, 1);
    },
    addBroker() {
      if (this.broker.length === 3) return;

      this.broker.push({
        reInsuranceBroker: "",
        comissionBroker: "",
      });
    },
    deleteBroker(index) {
      if (this.broker.length === 1) {
        this.broker = [
          {
            reInsuranceBroker: "",
            comissionBroker: "",
          },
        ];
        return;
      }

      this.broker.splice(index, 1);
    },
    submit() {
      if (
        this.reinsuranceRegistry.reInsuranceNameNewDirectReInsurance === "" ||
        this.reinsuranceRegistry.inceptionDateNewDirectReInsurance === "" ||
        this.reinsuranceRegistry.expiryDateNewDirectReInsurance === "" ||
        this.reinsuranceRegistry.retrocession === "" ||
        this.reinsuranceRegistry.companyNewDirectReInsurance === "" ||
        this.reinsuranceRegistry.comissionNewDirectReInsurance === "" ||
        this.reinsuranceRegistry.comissionSluNewDirectReInsurance === "" ||
        this.reinsuranceRegistry.percenntageAmountReInsurance === "" ||
        this.reinsuranceRegistry.maximumLimitIncludingBiNewDirectReInsurance === "" ||
        this.reinsuranceRegistry.maximumLimitWithoutBiNewDirectReInsurance === "" ||
        this.reinsuranceRegistry.deductionsNewDirectReInsurance === "" ||
        this.reinsuranceRegistry.operateAs === "" ||
        this.reinsuranceRegistry.maximumLineNewDirectReInsurance === "" ||
        this.reinsuranceRegistry.frontingSpecialConditions === "" ||
        this.reinsuranceRegistry.frontingAgreedWithTheReinsurer === "" ||
        this.reinsuranceRegistry.applies === "" ||
        this.activitiesAndCountries[0].valueActivities === "" ||
        this.activitiesAndCountries[0].valueCountries === "" ||
        this.broker[0].brokerContract === "" ||
        this.broker[0].comissionBroker === ""
      ) {
        alert("Te falta información por llenar");
        return;
      }

      this.showModal = true;

      this.activitiesAndCountries.map((elem) => {
        elem.idActivities = this.activities.find((val) => val.description == elem.valueActivities).id;
        elem.idCountries = this.countries.find((val) => val.description == elem.valueCountries).id;
      });

      const arrayBroker = [];

      this.broker.forEach((e) => {
        arrayBroker.push({
          broker: e.reInsuranceBroker,
          brokerComission: e.comissionBroker,
        });
      });

      const restriction = [];

      this.activitiesAndCountries.forEach((e) => {
        restriction.push({ activityId: e.idActivities, countryId: e.idCountries });
      });

      this.createReinsurer({
        name: this.reinsuranceRegistry.reInsuranceNameNewDirectReInsurance,
        inceptionDate: this.reinsuranceRegistry.inceptionDateNewDirectReInsurance,
        expiryDate: this.reinsuranceRegistry.expiryDateNewDirectReInsurance,
        comissionSlu: this.reinsuranceRegistry.comissionSluNewDirectReInsurance,
        maximumWith: this.reinsuranceRegistry.maximumLimitIncludingBiNewDirectReInsurance,
        maximumWithout: this.reinsuranceRegistry.maximumLimitWithoutBiNewDirectReInsurance,
        deductions: this.reinsuranceRegistry.deductionsNewDirectReInsurance,
        contractType: 3,
        restriction: restriction,
        broker: arrayBroker,
        directRe: {
          brokerage: true,
          frontingFee: false,
          tax: true,
          engFee: false,
          lta: false,
          others: false,
          sluCommissionDeduction: true,
          maximumLineDeduction: this.reinsuranceRegistry.maximumLineNewDirectReInsurance,
          frontingSpecialCondition: this.reinsuranceRegistry.frontingSpecialConditions,
          frontingAgreed: this.reinsuranceRegistry.frontingAgreedWithTheReinsurer,
          applies: this.reinsuranceRegistry.applies,
          retrocession: this.reinsuranceRegistry.retrocession,
          company: this.reinsuranceRegistry.companyNewDirectReInsurance,
          comission: this.reinsuranceRegistry.comissionNewDirectReInsurance,
          amountToReinsurance: this.reinsuranceRegistry.percenntageAmountReInsurance,
          operateAs: this.reinsuranceRegistry.operateAs,
        },
      });
    },
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
.modal-overly {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 100;
  background: rgba(0, 0, 0, 0.4);
}
.modal {
  width: 25rem;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #ffffff;
  padding: 1rem;
  border-radius: 5px;
  box-shadow: 3px, 3px, rgba(0, 0, 0, 0.4);
  z-index: 101;
}
.title-modal {
  font-family: "Avenir";
  font-style: normal;
  font-weight: 600;
  font-size: 26px;
  line-height: 110%;
}
.line {
  width: 100%;
  height: 1px;
  margin-top: 0.5rem;
  margin-bottom: 1rem;
  border: none;
  background-color: #a8bfd9;
}
.text-modal {
  width: 100%;
  height: 6rem;
  box-sizing: border-box;
  border: 1px solid #a8bfd9;
  border-radius: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  /* text-align: center; */
}
.text-modal div {
  font-family: "Avenir";
  font-style: normal;
  font-weight: 800;
  font-size: 16px;
  line-height: 110%;
  text-align: center;
  color: #547fa9;
}
.button-modal-direction {
  display: flex;
  justify-content: center;
}
.button-modal {
  background-color: #f59607;
  margin-top: 15px;
  width: 10rem;
  height: 3rem;
  border-radius: 16px;
  font-family: "Avenir";
  font-style: normal;
  font-weight: 800;
  font-size: 16px;
  line-height: 110%;
  text-align: center;
  color: #fff;
}
</style>
