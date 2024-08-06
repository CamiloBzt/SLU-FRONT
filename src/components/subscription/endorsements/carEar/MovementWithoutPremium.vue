<template>
  <v-expansion-panels class="SubExpansionComponent">
    <v-expansion-panel>
      <v-expansion-panel-header
        @click="changeSubExpansion"
        class="ExpansionTitle d-flex justify-start"
        expand-icon=""
      >
        <template v-slot:actions>
          <div class="subIconCont d-flex justify-start align-center">
            <v-icon class="iconExpand mr-1">
              {{ iconSubExpansion }}
            </v-icon>
            <div class="SubExpansionTitle">Movement Without Premium</div>
          </div>
        </template>
      </v-expansion-panel-header>

      <v-expansion-panel-content>
        <div class="ExpandContent justify-center">
          <!--INPUTS-->
          <div class="InputsCont d-flex justify-start flex-wrap">
            <div class="InputCont">
              <v-menu
                v-model="menu"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="$v.movementWithoutPremium.effectiveDateMovement.$model"
                    label="Effective Date Movement"
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="$v.movementWithoutPremium.effectiveDateMovement.$model"
                  @input="menu = false"
                ></v-date-picker>
              </v-menu>
            </div>
            <div class="InputCont">
              <v-menu
                v-model="menu2"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="$v.movementWithoutPremium.movementEndDate.$model"
                    label="Movement End Date"
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="$v.movementWithoutPremium.movementEndDate.$model"
                  @input="menu2 = false"
                ></v-date-picker>
              </v-menu>
            </div>
          </div>

          <!--Description-->
          <div class="TitleTextArea">PML Comments</div>
          <textarea
            v-model.trim="$v.movementWithoutPremium.pmlComments.$model"
            @blur="
              setMovementWithoutPremium({ index: currentIndex, key: 'pmlComments', value: $v.movementWithoutPremium.pmlComments.$model });
              checkField('pmlComments');
            "
          ></textarea>

          <!--
            Documents
            <FilesSubmission />
            Email
            <EmailRichEditor />
          -->
        </div>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>
<script>
import { mapActions, mapMutations, mapGetters } from 'vuex';
import { stateExpansiveManager } from '@/mixins/subscription.js';
import FilesSubmission from '@/components/subscription/submission/FilesSubmission';
import EmailRichEditor from '@/components/Email/EmailRichEditor';
/* validations */
import { validationMixin } from 'vuelidate';
import { required } from 'vuelidate/lib/validators';
import { DigitsAndDecimals, Percentage } from '@/constants/validations';
import { formValidations } from '@/mixins/formValidations';
/* libs & helpers */
import Decimal from 'decimal.js';
import numeral from 'numeral';
/* lodash */
import { debounce } from 'lodash';

export default {
  name: 'MovementWithoutPremium',
  mixins: [stateExpansiveManager, formValidations, validationMixin],
  props: {
    indexarr: {
      type: String | Number,
    },
  },
  data() {
    return {
      menu: false,
      menu2: false,

      model1: '',
      model2: '',
    };
  },
  components: {
    FilesSubmission,
    EmailRichEditor,
  },
  async mounted() {
    await this.getEndorsementInformation('movementNoPremium');
  },
  computed: {
    ...mapGetters(['endorsements']),
    ...mapGetters({
      withoutPremium: 'movementWithoutPremium',
    }),
    movementWithoutPremium: {
      get() {
        const current = this.endorsements[this.indexarr];
        const id = current['movementId'];
        const item = this.withoutPremium.findIndex((v) => v.id === id);
        return this.withoutPremium[item];
      },
    },
    currentId: {
      get() {
        const current = this.endorsements[this.indexarr];
        const id = current['movementId'];
        return id;
      },
    },
    currentIndex: {
      get() {
        const current = this.endorsements[this.indexarr];
        const id = current['movementId'];
        const item = this.withoutPremium.findIndex((v) => v.id === id);
        return item;
      },
    },
    signature: {
      get() {
        return this.movementWithoutPremium.signature || '';
      },
    },
    support: {
      get() {
        return this.movementWithoutPremium.support || '';
      },
    },
  },
  watch: {
    'movementWithoutPremium.effectiveDateMovement': debounce(function (val) {
      this.$v.movementWithoutPremium.effectiveDateMovement.$model = val;
      this.setMovementWithoutPremium({ index: this.currentIndex, key: 'effectiveDateMovement', value: val });
      this.checkField('effectiveDateMovement');
    }, 1000),
    'movementWithoutPremium.movementEndDate': debounce(function (val) {
      this.$v.movementWithoutPremium.movementEndDate.$model = val;
      this.setMovementWithoutPremium({ index: this.currentIndex, key: 'movementEndDate', value: val });
      this.checkField('movementEndDate');
    }, 1000),
  },
  methods: {
    ...mapActions(['saveQuotationColumn', 'saveEndorsementColumn', 'getEndorsementInformation']),
    ...mapMutations(['setMovementWithoutPremium']),
    async checkField(column) {
      this.$v.movementWithoutPremium[column].$touch();
      if (this.$v.movementWithoutPremium[column].$invalid) return;
      await this.saveEndorsementColumn({
        table: 'movementNoPremium',
        parent: 'movementWithoutPremium',
        column,
        id: this.currentId,
      });
    },
    async updateDoc(column, value) {
      this.$v.movementWithoutPremium[column].$model = value;
      this.setMovementWithoutPremium({ index: this.currentIndex, key: column, value });
      await this.checkField(column);
    },
  },
  validations: {
    movementWithoutPremium: {
      effectiveDateMovement: { required },
      movementEndDate: { required },
      pmlComments: { required },
      signature: { required },
      support: { required },
    },
  },
};
</script>
<style lang="less" scoped>
@import '~@/assets/style/AccordionStyle.less';
@import '~@/assets/style/Subscription/Bound.less';
.InputsCont {
  width: 100%;
  height: auto;
  align-items: flex-start;
  align-content: flex-start;
  .InputCont {
    margin-right: 1.5%;
    width: 18%;
    @media (max-width: 650px) {
      margin-right: 0%;
      width: 100%;
    }
  }
}
</style>