<template>
  <v-expansion-panels class="ExpansionComponent ExpansionBordered mt-7">
    <v-expansion-panel>
      <v-expansion-panel-header @click="changeStateExpansive()" class="ExpansionTitle" expand-icon="">
        <!--Titulo del acordeon-->
        Information
        <div class="ExpansionState HideOnMovil">
          {{ stateExpansiveMessage }}
        </div>
        <template v-slot:actions>
          <v-icon class="iconExpand">
            {{ iconExpansive }}
          </v-icon>
        </template>
      </v-expansion-panel-header>

      <v-expansion-panel-content>
        <div class="ExpandContent justify-center">
          <div class="InputsCont d-flex flex-wrap align-start mt-3">
            <div class="InputCont">
              <v-text-field label="Reference Number" v-model.trim="nameReference" :readonly="true" />
            </div>
            <div class="InputCont">
              <v-text-field label="Status" />
            </div>
            <div class="InputCont">
              <v-text-field v-model.trim="accountInformation.insuredName" :readonly="true" label="Insured Name"></v-text-field>
            </div>
            <div class="InputCont">
              <v-text-field label="Rate of Change" v-model="quotation.exchangeRate" />
            </div>
            <div class="InputCont">
              <v-select
                v-model.trim="accountInformation.country"
                label="Country"
                :items="countries"
                item-text="description"
                item-value="id"
                :readonly="true"
                :disabled="countries.length === 0"
              ></v-select>
            </div>
            <div class="InputCont">
              <v-text-field label="Layer" />
            </div>
            <div class="InputCont">
              <v-select
                v-model.trim="accountInformation.broker"
                label="Broker"
                :items="availableBrokers"
                item-text="name"
                item-value="id"
                :disabled="availableBrokers.length === 0"
                :readonly="true"
              ></v-select>
            </div>
          </div>
        </div>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>
<script>
import { stateExpansiveManager } from '@/mixins/subscription.js';
import { mapActions, mapGetters, mapMutations } from 'vuex';
export default {
  name: 'InformationWallet',
  mixins: [stateExpansiveManager],
  methods: {
    ...mapActions(['getCatalogByName', 'getBrokers', 'getQuotationInformation', 'getCedents', 'checkSubscriptionStored', 'loadSubscription']),
  },
  async mounted() {
    await this.getCatalogByName({ name: 'activities' });
    await this.getCatalogByName({ name: 'countries' });
    await this.getCatalogByName({ name: 'risk_type' });
    await this.getCatalogByName({ name: 'currencies' });
    await this.getBrokers();
    await this.getCedents();
    await this.checkSubscriptionStored();
    await this.getQuotationInformation();
  },
  computed: { ...mapGetters(['countries', 'subscription_id', 'availableBrokers', 'accountInformation', 'quotation', 'nameReference']) },
};
</script>
<style lang="less" scoped>
@import '~@/assets/style/AccordionStyle.less';
@import '~@/assets/style/Subscription/Bound.less';
/*
Tomamos de base  las clases del archivo /assets/style/Subscription/Bound.less
en el apartado 'Estilos generales de los inputs'
también de allí se controla la versión móvil
*/
.InputsCont {
  .InputCont {
    width: 23%;
  }
}
</style>
