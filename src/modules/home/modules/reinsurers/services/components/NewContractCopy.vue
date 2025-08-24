<template>
  <div>
    <div class="reinsurers-wrapper">
      <div class="inner-title">New contract</div>
      <div class="reinsurers-inputs">
        <div class="input-width">
          <v-text-field label="Name contract" v-model="reinsuranceRegistry.nameContract"> </v-text-field>
        </div>
        <div class="input-width">
          <v-menu v-model="menu2" :close-on-content-click="false" :nudge-right="40" transition="scale-transition" offset-y min-width="auto">
            <template v-slot:activator="{ on, attrs }">
              <v-text-field v-model="reinsuranceRegistry.inceptionDate" label="Endorsement effective" v-bind="attrs" v-on="on"></v-text-field>
            </template>
            <v-date-picker v-model="reinsuranceRegistry.inceptionDate" @input="menu2 = false"></v-date-picker>
          </v-menu>
        </div>
        <div class="input-width">
          <v-text-field label="Expiry date" v-model="reinsuranceRegistry.expiryDate"> </v-text-field>
        </div>
      </div>
      <div class="reinsurers-inputs" v-for="(value, index) in broker" :key="index">
        <button class="plus" @click="deleteBroker(index)">-</button>
        <div class="input-width">
          <v-text-field label="Broker contract" v-model="value.brokerContract"> </v-text-field>
        </div>
        <div class="input-width">
          <v-text-field label="Comission broker" v-model="value.comissionBroker"> </v-text-field>
        </div>
        <button v-if="index === broker.length - 1" class="plus" @click="addBroker()">+</button>
      </div>
      <div class="reinsurers-inputs">
        <div class="input-width">
          <v-text-field label="Comission SLU" v-model="reinsuranceRegistry.comissionSlu"> </v-text-field>
        </div>
        <div class="input-width">
          <v-text-field label="Percentage amount to Re-insurance" v-model="reinsuranceRegistry.percentageAmountToReinsurance"> </v-text-field>
        </div>
      </div>
      <div class="inner-title">Distribution</div>
      <div class="reinsurers-label">
        <div class="column-title">Re-insurance of contract</div>
        <div class="column-title">Percentage</div>
      </div>
      <div class="reinsurers-distribution">
        <div class="plus2"></div>
        <div class="input-width">
          <v-text-field label="Name re-insurance" v-model="reinsuranceRegistry.nameReinsurance"> </v-text-field>
        </div>
        <div class="input-width">
          <v-text-field v-model="reinsuranceRegistry.nameReinsurancePercentage"> </v-text-field>
        </div>
      </div>
      <div class="reinsurers-distribution" v-for="(value, index) in parther" :key="index">
        <button class="plus" @click="deleteParther(index)">-</button>
        <div class="input-width">
          <v-text-field label="Parther Re" v-model="value.partherRe"> </v-text-field>
        </div>
        <div class="input-width">
          <v-text-field v-model="value.partherRePercentage"> </v-text-field>
        </div>
        <button v-if="index === parther.length - 1" class="plus" @click="addParther()">+</button>
      </div>
      <div class="reinsurers-distribution">
        <div class="plus2"></div>
        <div class="input-width"></div>
        <div class="input-width">
          <v-text-field v-model="reinsuranceRegistry.total"> </v-text-field>
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
          <v-text-field label="Maximum limit including BI" v-model="reinsuranceRegistry.maximumLimitIncludingBi"> </v-text-field>
        </div>
        <div class="input-width-Conditions">
          <v-text-field label="Maximum limit without BI" v-model="reinsuranceRegistry.maximumLimitWithoutBi"> </v-text-field>
        </div>
        <div class="input-width-Conditions">
          <v-text-field label="Deductions" v-model="reinsuranceRegistry.deductions"> </v-text-field>
        </div>
        <div class="input-width-Conditions">
          <v-text-field label="Maximum line" v-model="reinsuranceRegistry.maximumLine"> </v-text-field>
        </div>
      </div>
    </div>
    <!-- Prueba -->
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
      <button class="button-new-contract" @click="submit()">Create</button>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "NewContract",
  components: {},
  data() {
    return {
      reinsuranceRegistry: {
        nameContract: "",
        inceptionDate: "",
        expiryDate: "",
        comissionSlu: "",
        percentageAmountToReinsurance: "",
        nameReinsurance: "",
        nameReinsurancePercentage: "",
        total: "",
        maximumLimitIncludingBi: "",
        maximumLimitWithoutBi: "",
        deductions: "",
        maximumLine: "",
      },
      parther: [
        {
          partherRe: "",
          partherRePercentage: "",
        },
      ],
      broker: [
        {
          brokerContract: "",
          comissionBroker: "",
        },
      ],
      catalogCountries: [],
      catalogActivities: [],
      activitiesAndCountries: [
        {
          valueActivities: "",
          idActivities: 0,
          valueCountries: "",
          idCountries: 0,
        },
      ],
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
        brokerContract: "",
        comissionBroker: "",
      });
    },
    deleteBroker(index) {
      if (this.broker.length === 1) {
        this.broker = [
          {
            brokerContract: "",
            comissionBroker: "",
          },
        ];
        return;
      }

      this.broker.splice(index, 1);
    },
    addParther() {
      if (this.parther.length === 3) return;

      this.parther.push({
        partherRe: "",
        partherRePercentage: "",
      });
    },
    deleteParther(index) {
      if (this.parther.length === 1) {
        this.parther = [
          {
            partherRe: "",
            partherRePercentage: "",
          },
        ];
        return;
      }

      this.parther.splice(index, 1);
    },
    submit() {
      if (
        this.reinsuranceRegistry.nameContract === "" ||
        this.reinsuranceRegistry.inceptionDate === "" ||
        this.reinsuranceRegistry.expiryDate === "" ||
        this.reinsuranceRegistry.comissionSlu === "" ||
        this.reinsuranceRegistry.percentageAmountToReinsurance === "" ||
        this.reinsuranceRegistry.nameReinsurance === "" ||
        this.reinsuranceRegistry.nameReinsurancePercentage === "" ||
        this.reinsuranceRegistry.maximumLimitIncludingBi === "" ||
        this.reinsuranceRegistry.maximumLimitWithoutBi === "" ||
        this.reinsuranceRegistry.deductions === "" ||
        this.reinsuranceRegistry.maximumLine === "" ||
        this.activitiesAndCountries[0].valueActivities === "" ||
        this.activitiesAndCountries[0].valueCountries === "" ||
        this.parther[0].partherRe === "" ||
        this.parther[0].partherRePercentage === "" ||
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
          broker: e.brokerContract,
          brokerComission: e.comissionBroker,
        });
      });

      const restriction = [];

      this.activitiesAndCountries.forEach((e) => {
        restriction.push({ activityId: e.idActivities, countryId: e.idCountries });
      });

      const arrayParther = [];

      this.parther.forEach((e) => {
        arrayParther.push({
          parther: e.partherRe,
          partherPercentage: e.partherRePercentage,
        });
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
.plus2 {
  width: 1.5rem;
  height: 1.5rem;
  display: flex;
  font-weight: 500;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  opacity: 1;
}
.reinsurers-label {
  width: 80%;
  padding-left: 5rem;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1.5rem;
}
.column-title {
  width: 40%;
  font-size: 16px;
  font-weight: 800;
}
.reinsurers-distribution {
  width: 80%;
  padding-left: 7rem;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1.5rem;
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
.button-new-contract {
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
