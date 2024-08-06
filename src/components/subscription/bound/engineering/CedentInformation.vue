<template>
  <v-expansion-panels class="SubExpansionComponent">
    <v-expansion-panel>
      <v-expansion-panel-header @click="changeSubExpansion" class="ExpansionTitle d-flex justify-start" expand-icon="">
        <template v-slot:actions>
          <div class="subIconCont d-flex justify-start align-center">
            <v-icon class="iconExpand mr-1">
              {{ iconSubExpansion }}
            </v-icon>
            <div class="SubExpansionTitle">Cedent Information</div>
          </div>
        </template>
      </v-expansion-panel-header>

      <v-expansion-panel-content>
        <div class="ExpandContent">
          <div class="inputCont">
            <v-select
              v-model.trim="accountInformation.cedent"
              label="Name"
              :items="availableCedents"
              item-text="name"
              item-value="id"
              hint="Select Cedent"
              disabled
            ></v-select>
          </div>
          <div class="inputCont">
            <v-select
              v-model.trim="accountInformation.cedent"
              label="Email"
              :items="availableCedents"
              item-text="email"
              item-value="id"
              hint="Select Cedent"
              :disabled="true"
            ></v-select>
          </div>
          <div class="inputCont">
            <v-select
              v-model.trim="accountInformation.cedent"
              label="Contact Number"
              :items="availableCedents"
              item-text="phone"
              item-value="id"
              hint="Select Cedent"
              :disabled="true"
            ></v-select>
          </div>
          <div class="inputCont">
            <v-select
              v-model.trim="accountInformation.cedent"
              label="Address"
              :items="availableCedents"
              item-text="address"
              item-value="id"
              hint="Select Cedent"
              :disabled="true"
            ></v-select>
          </div>
          <div class="inputCont HideOnMovil" />
        </div>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>
<script>
import { stateExpansiveManager } from '@/mixins/subscription.js';
import { mapActions, mapGetters, mapMutations } from 'vuex';
export default {
  name: 'CedentInformation',
  mixins: [stateExpansiveManager],
  computed: {
    ...mapGetters(['availableCedents', 'accountInformation', 'activities', 'activitiesById']),
  },
  mounted() {
    console.log(this.availableCedents);
  },
};
</script>
<style lang="less" scoped>
@import '~@/assets/style/AccordionStyle.less';
.ExpandContent {
  @media (max-width: 650px) {
    width: calc(100% + 24px) !important;
  }
}
</style>
