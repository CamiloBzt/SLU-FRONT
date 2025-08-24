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
            <div class="SubExpansionTitle">Internal Adjustment</div>
          </div>
        </template>
      </v-expansion-panel-header>

      <v-expansion-panel-content>
        <div class="ExpandContent justify-start">
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
                  v-model="$v.internalAdjustment.effectiveDateMovement.$model"
                  label="Effective Date Movement"
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="$v.internalAdjustment.effectiveDateMovement.$model"
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
                  v-model="$v.internalAdjustment.movementEndDate.$model"
                  label="Movement End Date"
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="$v.internalAdjustment.movementEndDate.$model"
                @input="menu2 = false"
              ></v-date-picker>
            </v-menu>
          </div>

          <!--Description-->
          <div class="TitleTextArea">PML Comments</div>
          <textarea
            v-model.trim="$v.internalAdjustment.pmlComments.$model"
            @blur="
              setInternalAdjustment({
                index: currentIndex,
                key: 'pmlComments',
                value: $v.internalAdjustment.pmlComments.$model,
              });
              checkField('pmlComments');
            "
          ></textarea>
        </div>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>
<script>
import { mapActions, mapMutations, mapGetters } from "vuex";
import { stateExpansiveManager } from "@/mixins/subscription.js";
/* validations */
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";
import { DigitsAndDecimals, Percentage } from "@/constants/validations";
import { formValidations } from "@/mixins/formValidations";
/* libs & helpers */
import Decimal from "decimal.js";
import numeral from "numeral";
/* lodash */
import { debounce } from "lodash";

export default {
  name: "InternalAdjustment",
  mixins: [stateExpansiveManager, formValidations, validationMixin],
  data() {
    return {
      menu: false,
      menu2: false,

      model1: "",
      model2: "",
    };
  },
  props: {
    indexarr: {
      type: String | Number,
    },
  },
  async mounted() {
    await this.getEndorsementInformation("internalAdjustment");
  },
  computed: {
    ...mapGetters(["endorsements"]),
    ...mapGetters({
      IntAdjust: "internalAdjustment",
    }),
    internalAdjustment: {
      get() {
        const current = this.endorsements[this.indexarr];
        const id = current["movementId"];
        const item = this.IntAdjust.findIndex((v) => v.id === id);
        return this.IntAdjust[item];
      },
    },
    currentId: {
      get() {
        const current = this.endorsements[this.indexarr];
        const id = current["movementId"];
        return id;
      },
    },
    currentIndex: {
      get() {
        const current = this.endorsements[this.indexarr];
        const id = current["movementId"];
        const item = this.IntAdjust.findIndex((v) => v.id === id);
        return item;
      },
    },
  },
  watch: {
    "internalAdjustment.effectiveDateMovement": debounce(function (val) {
      this.$v.internalAdjustment.effectiveDateMovement.$model = val;
      this.setInternalAdjustment({
        index: this.currentIndex,
        key: "effectiveDateMovement",
        value: val,
      });
      this.checkField("effectiveDateMovement");
    }, 1000),
    "internalAdjustment.movementEndDate": debounce(function (val) {
      this.$v.internalAdjustment.movementEndDate.$model = val;
      this.setInternalAdjustment({
        index: this.currentIndex,
        key: "movementEndDate",
        value: val,
      });
      this.checkField("movementEndDate");
    }, 1000),
  },
  methods: {
    ...mapActions([
      "saveQuotationColumn",
      "saveEndorsementColumn",
      "getEndorsementInformation",
    ]),
    ...mapMutations(["setInternalAdjustment"]),
    async checkField(column) {
      this.$v.internalAdjustment[column].$touch();
      if (this.$v.internalAdjustment[column].$invalid) return;
      await this.saveEndorsementColumn({
        table: "internalAdjustment",
        parent: "internalAdjustment",
        column,
        id: this.currentId,
      });
    },
  },
  validations: {
    internalAdjustment: {
      effectiveDateMovement: { required },
      movementEndDate: { required },
      pmlComments: { required },
    },
  },
};
</script>
<style lang="less" scoped>
@import "~@/assets/style/AccordionStyle.less";
@import "~@/assets/style/Subscription/Bound.less";
.InputCont {
  margin-right: 1.5%;
  width: 18%;
  @media (max-width: 650px) {
    margin-right: 0%;
    width: 100%;
  }
}
</style>
