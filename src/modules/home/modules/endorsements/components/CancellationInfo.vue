<template>
  <div class="input-row w-100 d-flex flex-wrap pl-15">
    <div class="input-col">
      <div class="input-cont">
        <v-text-field v-model="accountComplete.reference" label="Reference number" v-on="on" readonly>
        </v-text-field>
      </div>

      <div class="input-cont">
        <v-text-field v-model="broker" label="Broker" v-on="on" readonly>
        </v-text-field>
      </div>
    </div>

    <div class="input-col">
      <div class="input-cont">
        <v-text-field v-model="insuredName" label="Insured name" v-on="on" readonly>
        </v-text-field>
      </div>

      <div class="input-cont">
        <v-text-field v-model="inceptionDate" label="Inception date" v-on="on" readonly>
        </v-text-field>
      </div>
    </div>

    <div class="input-col">
      <div class="input-cont">
        <v-text-field v-model="rateOfChange" label="Rate of change" v-on="on" readonly>
        </v-text-field>
      </div>

      <div class="input-cont">
        <v-text-field v-model="expiryDate" label="Expiry date" v-on="on" readonly>
        </v-text-field>
      </div>
    </div>

    <div class="input-col">
      <div class="input-cont">
        <v-text-field v-model="country" label="Country" v-on="on" readonly>
        </v-text-field>
      </div>
    </div>
  </div>
</template>
<script>
import { getCatalog } from '@/constants/catalogs/services/catalogs.service.js';
import catalogService from '../services/catalog.service';

export default {
  name: "CancellationInfo",
  props: { accountComplete: { type: Object } },
  data() {
    return {
      daysDiference: 0,
      on: {},
      inceptionDate: new Date(this.accountComplete.deductibles.inceptionDate)
        .toISOString()
        .substr(0, 10),
      expiryDate: new Date(this.accountComplete.deductibles.expiryDate)
        .toISOString()
        .substr(0, 10),
      insuredName: this.accountComplete.deductibles.insuredName,
      rateOfChange: this.accountComplete.deductibles.exchangeRate,
      country:'',
      broker:'',
    };
  },
  async beforeMount() {
    const catalogCountryId = this.accountComplete.deductibles.catalogCountryId;
    const countryCatalog = await getCatalog({ name: 'countries' });
    this.country = (countryCatalog.find(c => c.id === catalogCountryId)).description;

    const brokerId = this.accountComplete.deductibles.broker;
    const allBroker = await catalogService.getAllBrokers();
    this.broker = (allBroker.find(b => b.id === brokerId)).name;
    

  },
  async mounted() { },
  computed: {},
  watch: {},
  methods: {},
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
</style>
