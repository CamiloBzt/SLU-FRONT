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
            <div class="SubExpansionTitle">Rational</div>
          </div>
        </template>
      </v-expansion-panel-header>

      <v-expansion-panel-content>
        <div class="ExpandContent">
          <div class="TitleTextArea">Offer Comments*</div>

          <v-textarea
            v-model.trim="$v.boundEng.rationalComments.$model"
            @blur="
              SET_BOUND_ENG('rationalComments', this);
              checkField('rationalComments');
            "
            hint="Required field"
            persistent-hint
          />
        </div>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>
<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
import { stateExpansiveManager } from "@/mixins/subscription.js";
/* validations */
import { required } from "vuelidate/lib/validators";

export default {
  name: "Rational",
  mixins: [stateExpansiveManager],
  inject: ["deepDisabled"],
  computed: {
    ...mapGetters(["boundEng"]),
    rationalCommentsCompleted() {
      return (
        this.boundEng.rationalComments &&
        this.boundEng.rationalComments.trim().length > 0
      );
    },
  },
  watch: {
    rationalCommentsCompleted: {
      handler(newValue) {
        this.$emit("rational-comments-change", newValue);
      },
      immediate: true,
    },
  },

  methods: {
    ...mapActions(["saveBoundColumn"]),
    ...mapMutations(["SET_BOUND_ENG"]),
    async checkField(column) {
      this.$v.boundEng[column].$touch();
      /*console.log(
        this.$v.boundEng[column].$invalid,
        this.$v.boundEng[column].$error
      );*/
      if (this.$v.boundEng[column].$invalid || this.$v.boundEng[column].$error)
        return;
      await this.saveBoundColumn({
        table: "bound",
        parent: "boundEng",
        column,
      });
    },
  },
  validations: {
    boundEng: {
      rationalComments: { required },
    },
  },
};
</script>
<style lang="less" scoped>
@import "~@/assets/style/AccordionStyle.less";
@import "~@/assets/style/Subscription/Bound.less";
</style>
