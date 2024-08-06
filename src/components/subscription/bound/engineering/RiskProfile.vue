<template>
  <v-expansion-panels class="SubExpansionComponent">
    <v-expansion-panel @change="deepDisabled">
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
            <div class="SubExpansionTitle">Risk Profile</div>
          </div>
        </template>
      </v-expansion-panel-header>

      <v-expansion-panel-content>
        <div class="ExpandContent">
          <div class="TitleTextArea">Offer Comments</div>

          <textarea
            v-model.trim="$v.boundEng.riskProfileComments.$model"
            @blur="
              SET_BOUND_ENG('riskProfileComments', this);
              checkField('riskProfileComments');
            "
          ></textarea>

          <div class="InputsCont d-flex justify-start align-center">
            <div class="InputCont">
              <v-select
                v-model.trim="$v.boundEng.riskProfileClause.$model"
                @blur="
                  SET_BOUND_ENG('riskProfileClause', this);
                  checkField('riskProfileClause');
                "
                :items="typeClause"
                label="Type of clause"
                item-text="data"
                item-value="id"
                clearable
                :disabled="typeClause.length === 0"
              ></v-select>
            </div>
            <div class="InputCont">
              <v-select
                v-model.trim="$v.boundEng.riskProfileExposure.$model"
                @blur="
                  SET_BOUND_ENG('riskProfileExposure', this);
                  checkField('riskProfileExposure');
                "
                :items="exposure"
                label="Exposure by neighborhood"
                item-text="data"
                item-value="id"
                clearable
                :disabled="exposure.length === 0"
              ></v-select>
            </div>
            <div class="InputCont">
              <v-select
                v-model.trim="$v.boundEng.riskProfileHousekeeping.$model"
                @blur="
                  SET_BOUND_ENG('riskProfileHousekeeping', this);
                  checkField('riskProfileHousekeeping');
                "
                :items="housekeeping"
                label="Housekeeping"
                item-text="data"
                item-value="id"
                clearable
                :disabled="housekeeping.length === 0"
              ></v-select>
            </div>
          </div>
        </div>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>
<script>
import { mapGetters, mapActions, mapMutations } from 'vuex';
import { stateExpansiveManager } from '@/mixins/subscription.js';
/* validations */
import { required } from 'vuelidate/lib/validators';

export default {
  name: 'RiskProfile',
  mixins: [stateExpansiveManager],
  inject: ['deepDisabled'],
  async beforeMount() {
    await this.getCatalogByName({ name: 'type_clause' });
    await this.getCatalogByName({ name: 'exposure' });
    await this.getCatalogByName({ name: 'housekeeping' });
  },
  computed: {
    ...mapGetters([
      'housekeeping',
      'exposure',
      'typeClause',
      'boundEng'
    ]),
  },
  methods: {
    ...mapActions([
      'saveBoundColumn',
      'getCatalogByName'
    ]),
    ...mapMutations(['SET_BOUND_ENG']),
    async checkField(column) {
      this.$v.boundEng[column].$touch();
      console.log(
        this.$v.boundEng[column].$invalid,
        this.$v.boundEng[column].$error
      );
      if (this.$v.boundEng[column].$invalid || this.$v.boundEng[column].$error)
        return;
      await this.saveBoundColumn({
        table: 'bound',
        parent: 'boundEng',
        column,
      });
    },
  },
  validations: {
    boundEng: {
      riskProfileComments: { required },
      riskProfileClause: { required },
      riskProfileExposure: { required },
      riskProfileHousekeeping: { required },
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
  margin-top: 25px;

  .InputCont {
    width: 18%;
    height: 100%;
    margin-right: 1%;
  }
}
</style>
