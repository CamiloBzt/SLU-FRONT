<template>
  <v-expansion-panels class="SubExpansionComponent" v-model="currentPanel" :disabled="disabledPanel">
    <v-expansion-panel>
      <v-expansion-panel-header @click="changeSubExpansion" class="ExpansionTitle d-flex justify-start" expand-icon="">
        <template v-slot:actions>
          <div class="subIconCont d-flex justify-start align-center">
            <v-icon class="iconExpand mr-1">
              {{ iconSubExpansion }}
            </v-icon>
            <div class="SubExpansionTitle">{{ componentTitle }}</div>
          </div>
        </template>
      </v-expansion-panel-header>

      <v-expansion-panel-content>
        <div class="ExpandContent">
          <div class="InputsCont d-flex justify-start flex-wrap">
            <v-autocomplete label="Movement Type" v-model="movementsValue" :items="catalogEndorsements" item-value="id"
              item-text="description" :disabled="disabledSelect" />
            <v-btn rounded text class="btn ml-5" color="#003D6D" @click="$emit('removeField', endorsementId)">
              Delete Movement
            </v-btn>
          </div>
          <component v-bind:is="dynamicComponent" v-if="showComponent" :movementId="movementId" ref="componente" />
          <!-- <EmailButtons /> -->
          <!-- <EmailEndorsments /> -->
          <!-- <EmailRichEditor /> -->
          <!-- <FilesEndorsements v-if="enableFileComponent" :movementsValue="movementsValue"
            :endorsementData="endorsementData" :currentDocs="currentDocs" :movementId="movementId"
            @updateDocs="updateDocs" /> -->
        </div>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>
<script>
import { stateExpansiveManager } from '@/mixins/subscription.js';
import InclusionRisk from '@/components/subscription/endorsements/carEar/InclusionRisk.vue';
import ExclusionRisk from '@/components/subscription/endorsements/carEar/ExclusionRisk.vue';
import NewInsurancePolicy from '@/components/subscription/endorsements/carEar/NewInsurancePolicy';
import IncreaseInsurableRisk from '@/components/subscription/endorsements/carEar/IncreaseInsurableRisk';
import ReductionOfInsurable from '@/components/subscription/endorsements/carEar/ReductionOfInsurable';
import MovementWithoutPremium from '@/components/subscription/endorsements/carEar/MovementWithoutPremium';
import ChangeOfShare from '@/components/subscription/endorsements/carEar/ChangeOfShare';
import InternalAdjustment from '@/components/subscription/endorsements/carEar/InternalAdjustment';
import EmailEndorsments from '@/components/subscription/endorsements/carEar/EmailEndorsments';
import FilesEndorsements from '@/components/subscription/endorsements/carEar/FilesEndorsements.vue';
import EmailRichEditor from '@/components/Email/EmailRichEditor';
import Summary from '@/components/subscription/endorsements/carEar/Summary';
import EmailButtons from '@/components/subscription/endorsements/carEar/EmailButtons.vue';
import { mapActions, mapGetters } from 'vuex';
/* services */
import { updateEndorsementMovement, getCatalog } from './services/endorsement.service'
import { getInclusionRisk } from './services/inclusion-risk.service'

export default {
  name: 'Movement',
  mixins: [stateExpansiveManager],
  components: {
    InclusionRisk,
    ExclusionRisk,
    NewInsurancePolicy,
    IncreaseInsurableRisk,
    ReductionOfInsurable,
    MovementWithoutPremium,
    ChangeOfShare,
    InternalAdjustment,
    Summary,
    EmailEndorsments,
    FilesEndorsements,
    EmailRichEditor,
    EmailButtons,
  },
  props: {
    movementId: { type: [String, Number] },
    endorsementId: { type: [String, Number] },
    movementType: { type: [String, Number] },
    componentTitle: { type: String },
  },
  data: () => ({
    settings: {
      1: InclusionRisk,
      2: ExclusionRisk,
      3: MovementWithoutPremium,
      4: ChangeOfShare,
      5: InternalAdjustment,
      6: Summary,
    },
    docsSettings: {
      1: 'inclusion_risk_',
      2: 'risk_exclusion_',
      3: 'movement_without_premium_',
      4: 'change_of_share_',
    },
    showComponent: false,
    currentPanel: 1,
    disabledPanel: false,
    currentMovementId: 0,
    subscriptionId: false,
    catalogEndorsements: [],
    movementsValue: ''
  }),
  async mounted () {
    this.subscriptionId = this.$route.params?.subscriptionId
    this.catalogEndorsements = await getCatalog('endorsement')
    if (this.movementType) this.movementsValue = this.movementType
    // if (this.movementId) {
    //   const data = await getInclusionRisk(this.movementId);
    //   this.$emit('changeMovementId', data?.EndorsementsIncreaseInsurableValue?.id || false)
    // }
    this.LoadDocumentsCatalogForEndorsements({
      catalog_document_id: [22, 23, 24, 25, 26, 27, 28, 29],
    });
  },
  computed: {
    ...mapGetters(['endorsementsDocuments']),
    dynamicComponent: {
      get () {
        const value = this.settings[this.movementType || this.movementsValue];
        return value;
      },
    },
    disabledSelect: {
      get () {
        if (!!this.movementsValue) return true;
        return false;
      },
    },
    enableFileComponent: {
      get () {
        if (this.movementsValue && ![6, 7].includes(this.movementsValue)) return true;
        return false;
      },
    },
    currentDocs: {
      get () {
        const data = this.endorsementsDocuments.filter((v) => v.key.startsWith(this.docsSettings[this.movementsValue]));
        console.log('curr', data);
        const docs = [];
        const newDocs = [];
        data.forEach((item) => {
          let newItem = {};
          Object.assign(newItem, item);
          newItem.text = 'Upload the next document';
          newDocs.push(newItem);
          docs.push(item.id);
        });
        console.log(newDocs);
        return newDocs;
      },
    },
  },
  watch: {
    async movementsValue (value) {
      console.log(value)
      this.disabledPanel = true;
      await this.saveMovement(value);
      this.disabledPanel = false;
    },
  },
  methods: {
    ...mapActions(['LoadDocumentsCatalogForEndorsements']),
    async saveMovement (value) {
      this.showComponent = false;
      const data = await updateEndorsementMovement(this.endorsementId, value)
      if (data?.[0]?.movement_type)
        this.$emit('changeMovementType', data?.[0]?.movement_type)
      if (data?.[0]?.movement_id)
        this.$emit('changeMovementId', data?.[0]?.movement_id)
      this.showComponent = true;
    },
    async defineQuotation (event, id) {
      //alert(event)
      const current = this.lang.find((v) => v.lang === this.selectedLang);
      await this.setCurrentTemplateLanguage({
        langId: current.id,
        id: this.subscriptionId,
      });
      this.reason = event.description;
      this.item = id;
      this.SET_MAIL_TEMPLATE(event);
      this.$refs.emailModal.showModal = true;
    },
    async loadData () {
      this.showComponent = false;
      // load component
      this.showComponent = true;
    },
    updateDocs (column, value) {
      this.$refs.componente.updateDoc(column, value);
    },
  },
};
</script>
<style lang="less" scoped>
@import '~@/assets/style/AccordionStyle.less';

.ExpandContent {
  width: 97%;
  margin-left: 1.5%;
}
</style>
