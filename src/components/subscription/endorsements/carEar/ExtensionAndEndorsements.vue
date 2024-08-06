<template>
  <div>
    <v-expansion-panels class="ExpansionComponent ExpansionBordered mt-6" v-model="opened" :disabled="loading">
      <v-expansion-panel @change="deepDisabled">
        <!--TITULO DEL ACORDEON-->
        <v-expansion-panel-header @click="changeStateExpansive()" class="ExpansionTitle" expand-icon="">
          Extensions and Endorsements
          <div class="ExpansionState HideOnMovil">
            {{ stateExpansiveMessage }}
          </div>
          <template v-slot:actions>
            <v-icon class="iconExpand">
              {{ iconExpansive }}
            </v-icon>
          </template>
        </v-expansion-panel-header>
        <!--CONTENIDO DEL ACORDEON-->
        <v-expansion-panel-content>
          <div class="ExpandContent">
            <Policies @updateSluShare="updateSluShare" />
            <Movement v-for="(item, index) in endorsements" :endorsementId="item.id" :movementType="item.movement_type"
              :movementId="item.movement_id" :componentTitle="getDescription(item)" :indexarr="index" :key="index"
              @movementValueChanged="valueChanged" @removeField="removeField"
              @changeMovementType="changeMovementType($event, index)"
              @changeMovementId="changeMovementId($event, index)" />
            <!--Add Movement-->
            <div class="ButtonCont mt-2 d-flex justify-start align-center">
              <v-btn rounded text class="Btn" @click="addNewField()" :disabled="!btnvalid">
                <v-icon class="mr-2"> mdi-plus-circle </v-icon>
                Add New Movement
              </v-btn>
            </div>
          </div>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>
<script>
/* components */
import Movement from '@/components/subscription/endorsements/carEar/Movement';
import Policies from './Policies.vue'
/* mixins */
import { stateExpansiveManager } from '@/mixins/subscription.js';
/* services */
import { getEndorsements, createEndorsement, updateEndorsement } from './services/endorsement.service'

export default {
  name: 'ExtensionAndEndorsements',
  inject: ['deepDisabled'],
  mixins: [stateExpansiveManager],
  components: { Movement, Policies },
  data () {
    return {
      opened: 1,
      loading: false,
      endorsements: [],
      subscriptionId: false,
      policy: {
        slu_share: 0
      }
    };
  },
  provide () {
    return {
      policy: this.policy
    }
  },
  computed: {
    btnvalid: {
      get () {
        if (this.endorsements.length < 5 && !this.loading) return true;
        return false;
      },
    },
  },
  async mounted () {
    this.subscriptionId = this.$route.params?.subscriptionId
    if (this.subscriptionId) {
      this.endorsements = await getEndorsements(this.subscriptionId)
    }
  },
  watch: {
    async opened (val) {
      if (val === 0) {
        try {
          this.loading = true;
          if (this.subscriptionId) {
            this.endorsements = await getEndorsements(this.subscriptionId)
          }
          this.loading = false;
        } catch (e) {
          console.error(e);
        }
      }
    },
  },
  methods: {
    getDescription (item) {
      return item?.CatalogEndorsement?.description || 'New Movement'
    },
    changeMovementType (id, index) {
      this.endorsements[index]['movement_type'] = id
    },
    changeMovementId (id, index) {
      this.endorsements[index]['movement_id'] = id
    },
    updateSluShare (value) {
      this.policy.slu_share = value
    },
    async addNewField () {
      if (this.btnvalid && this.subscriptionId) {
        this.endorsements = await createEndorsement(this.subscriptionId);
      }
    },
    async removeField (id) {
      await updateEndorsement(id, 'active', false)
      this.endorsements = await getEndorsements(this.subscriptionId);
    },
    async valueChanged () {
      this.opened = 1;
      this.loading = true;
      this.endorsements = await getEndorsements(this.subscriptionId);
      this.loading = false;
      this.opened = 0;
    },
  },
};
</script>
<style lang="less" scoped>
@import '~@/assets/style/AccordionStyle.less';
@import '~@/assets/style/Subscription/Bound.less';
</style>