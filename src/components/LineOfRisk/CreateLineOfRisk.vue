<template>
  <div>
    <v-expansion-panels
      class="ExpansionComponent ExpansionBordered mt-6 MarginTopMovil"
      v-model="userPanel"
    >
      <v-expansion-panel>
        <!--TITULO DEL ACORDEON-->
        <v-expansion-panel-header
          @click="changeStateExpansive()"
          class="ExpansionTitle"
          expand-icon=""
        >
          Line of Business Information
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
                v-model.trim="$v.createLineOfRiskData.key.$model"
                autocomplete="new-password"
                @input="$v.createLineOfRiskData.key.$touch()"
                @blur="$v.createLineOfRiskData.key.$touch()"
                required
                :error-messages="
                  requiredInputVuelidateParent('key', 'createLineOfRiskData')
                "
                label="Key"
              >
              </v-text-field>
            </div>
            <div class="ExpansionInputContent mb-7">
              <v-text-field
                v-model.trim="$v.createLineOfRiskData.description.$model"
                @input="$v.createLineOfRiskData.description.$touch()"
                @blur="$v.createLineOfRiskData.description.$touch()"
                required
                :error-messages="
                  requiredInputVuelidateParent(
                    'description',
                    'createLineOfRiskData'
                  )
                "
                label="Description"
              >
              </v-text-field>
            </div>
            <div class="ExpansionInputContent">
              <v-switch
                v-model="createLineOfRiskData.active"
                label="Active"
                color="primary"
              ></v-switch>
            </div>
            <div class="ExpansionInputContent HideOnMovil"></div>
            <div class="WhiteSpace HideOnMovil" />

            <div class="finishButtonCont mt-8 d-flex justify-end align-center">
              <v-btn
                rounded
                large
                class="finishBtn"
                :loading="loading"
                depressed
                @click="cancel()"
                color="#003D6D"
                style="margin: 10px"
              >
                Cancel
              </v-btn>
              <v-btn
                rounded
                outlined
                large
                class="finishBtn"
                :loading="loading"
                @click="submitForm()"
              >
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
import { createLineOfRisk } from "./services/lineOfRisk.service";

export default {
  name: "LineOfRiskInformation",
  mixins: [stateExpansiveManager, formValidations, validationMixin],
  props: {
    lineOfRiskId: {
      required: true,
    },
  },
  data() {
    return {
      loading: false,
      userPanel: 0,
      isNew: true,
      labelButton: "Create Line of Business",
      createLineOfRiskData: {
        key: "",
        description: "",
        active: true,
      },
    };
  },
  beforeMount() {
    if (parseFloat(this.lineOfRiskId) !== 0) {
      this.isNew = false;
      this.labelButton = "Save";
      this.getLineOfRiskById(this.lineOfRiskId).then(() => {
        this.createLineOfRiskData = { ...this.info };
      });
    }
  },
  computed: {
    ...mapState({
      info: (state) => state.lineOfRisk.selected, // Ajustar según tu store
    }),
  },
  validations: {
    createLineOfRiskData: {
      key: { required, ValidChars },
      description: { required, ValidChars },
    },
  },
  methods: {
    ...mapActions(["getLineOfRiskById"]), // Ajustar según tus actions
    cancel() {
      this.$router.push({ name: "list-line-of-risk" });
    },
    async submitForm() {
      this.$v.createLineOfRiskData.$touch();
      const errorExists = this.$v.createLineOfRiskData.$invalid;
      if (errorExists) this.userPanel = 0;
      if (errorExists) return;

      const {
        key: { $model: key },
      } = this.$v.createLineOfRiskData;
      const {
        description: { $model: description },
      } = this.$v.createLineOfRiskData;
      const { active } = this.createLineOfRiskData;

      this.loading = true;
      const lineOfRiskInformation = {
        id: parseInt(this.lineOfRiskId),
        key,
        description,
        active,
      };

      if (parseInt(this.lineOfRiskId) === 0) delete lineOfRiskInformation.id;

      await createLineOfRisk({ lineOfRiskInformation });
      this.loading = false;
      this.createLineOfRiskData = {};
      this.$v.createLineOfRiskData.$reset();
      this.$router.push({ name: "list-line-of-risk" });
    },
  },
};
</script>

<style lang="less" scoped>
@import "~@/assets/style/AccordionStyle.less";
</style>
