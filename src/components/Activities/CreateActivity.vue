<template>
  <div>
    <v-expansion-panels class="ExpansionComponent ExpansionBordered mt-6 MarginTopMovil" v-model="userPanel">
      <v-expansion-panel>
        <!--TITULO DEL ACORDEON-->
        <v-expansion-panel-header @click="changeStateExpansive()" class="ExpansionTitle" expand-icon="">
          Activity Information
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
            <!--LINEA DIVISORIA-->
            <div class="ExpansionLineTop"></div>
            <!--INPUTS-->
            <div class="ExpansionInputContent mb-7">
              <v-text-field
                v-model.trim="$v.createActivityData.description.$model"
                autocomplete="new-password"
                @input="$v.createActivityData.description.$touch()"
                @blur="$v.createActivityData.description.$touch()"
                required
                :error-messages="requiredInputVuelidateParent('description', 'createActivityData')"
                label="Description"
              >
              </v-text-field>
            </div>
            <div class="ExpansionInputContent mb-7">
              <v-select
                v-model.trim="$v.createActivityData.category.$model"
                @input="$v.createActivityData.category.$touch()"
                @blur="$v.createActivityData.category.$touch()"
                required
                :error-messages="requiredInputVuelidateParent('category', 'createActivityData')"
                label="Category"
                :items="categoryOptions"
                item-text="text"
                item-value="value"
              >
              </v-select>
            </div>
            <div class="ExpansionInputContent mb-7">
              <v-text-field
                v-model.number="$v.createActivityData.rate.$model"
                @input="$v.createActivityData.rate.$touch()"
                @blur="$v.createActivityData.rate.$touch()"
                required
                type="number"
                :error-messages="requiredInputVuelidateParent('rate', 'createActivityData')"
                label="Rate"
              >
              </v-text-field>
            </div>
            <div class="ExpansionInputContent mb-7">
              <v-text-field
                v-model.number="$v.createActivityData.risk_type_id.$model"
                @input="$v.createActivityData.risk_type_id.$touch()"
                @blur="$v.createActivityData.risk_type_id.$touch()"
                required
                type="number"
                :error-messages="requiredInputVuelidateParent('risk_type_id', 'createActivityData')"
                label="Risk Type ID"
              >
              </v-text-field>
            </div>
            <div class="ExpansionInputContent">
              <v-switch v-model="createActivityData.active" label="Active" color="primary"></v-switch>
            </div>
            <div class="ExpansionInputContent HideOnMovil"></div>
            <div class="WhiteSpace HideOnMovil" />

            <div class="finishButtonCont mt-8 d-flex justify-end align-center">
              <v-btn rounded large class="finishBtn" :loading="loading" depressed @click="cancel()" color="#003D6D" style="margin: 10px"> Cancel </v-btn>
              <v-btn rounded outlined large class="finishBtn" :loading="loading" @click="submitForm()">
                {{ labelButton }}
              </v-btn>
            </div>
          </div>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
/* vuelidate mixin & validations */
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";
import { ValidChars } from "@/constants/validations";
/* project validations (in some cases depends on vuelidate) */
import { formValidations } from "@/mixins/formValidations";
import { stateExpansiveManager } from "@/mixins/subscription.js";
/* services */
import { createActivity } from "./services/activity.service";

export default {
  name: "ActivityInformation",
  mixins: [stateExpansiveManager, formValidations, validationMixin],
  props: {
    activityId: {
      required: true,
    },
  },
  data() {
    return {
      loading: false,
      userPanel: 0,
      isNew: true,
      labelButton: "Create Activity",
      categoryOptions: [
        { text: "Category 1", value: "1" },
        { text: "Category 2", value: "2" },
        { text: "Category 3", value: "3" },
        { text: "Category 4", value: "4" },
        { text: "Category 5", value: "5" },
      ],
      createActivityData: {
        description: "",
        category: "",
        rate: 1,
        risk_type_id: 2,
        active: true,
      },
    };
  },
  beforeMount() {
    if (parseFloat(this.activityId) !== 0) {
      this.isNew = false;
      this.labelButton = "Save";
      this.getActivityById(this.activityId).then(() => {
        this.createActivityData = { ...this.info };
      });
    }
  },
  computed: {
    ...mapState({
      info: (state) => state.activities.selected,
    }),
  },
  validations: {
    createActivityData: {
      description: { required, ValidChars },
      category: { required },
      rate: { required },
      risk_type_id: { required },
    },
  },
  methods: {
    ...mapActions(["getActivityById"]),
    cancel() {
      this.$router.push({ name: "list-activities" });
    },
    async submitForm() {
      this.$v.createActivityData.$touch();
      const errorExists = this.$v.createActivityData.$invalid;
      if (errorExists) this.userPanel = 0;
      if (errorExists) return;

      const {
        description: { $model: description },
      } = this.$v.createActivityData;
      const {
        category: { $model: category },
      } = this.$v.createActivityData;
      const {
        rate: { $model: rate },
      } = this.$v.createActivityData;
      const {
        risk_type_id: { $model: risk_type_id },
      } = this.$v.createActivityData;
      const { active } = this.createActivityData;

      this.loading = true;
      const activityInformation = {
        id: parseInt(this.activityId),
        description,
        category,
        rate,
        risk_type_id,
        active,
      };

      if (parseInt(this.activityId) === 0) delete activityInformation.id;
      await createActivity({ activityInformation });
      this.loading = false;
      this.createActivityData = {};
      this.$v.createActivityData.$reset();
      this.$router.push({ name: "list-activities" });
    },
  },
};
</script>

<style lang="less" scoped>
@import "~@/assets/style/AccordionStyle.less";
</style>
