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
          Country Information
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
                v-model.trim="$v.createCountryData.description.$model"
                autocomplete="new-password"
                @input="$v.createCountryData.description.$touch()"
                @blur="$v.createCountryData.description.$touch()"
                required
                :error-messages="
                  requiredInputVuelidateParent(
                    'description',
                    'createCountryData'
                  )
                "
                label="Country Name"
              >
              </v-text-field>
            </div>
            <div class="ExpansionInputContent">
              <v-switch
                v-model="createCountryData.active"
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
import { createCountry } from "./services/country.service";

export default {
  name: "CountryInformation",
  mixins: [stateExpansiveManager, formValidations, validationMixin],
  props: {
    countryId: {
      required: true,
    },
  },
  data() {
    return {
      loading: false,
      userPanel: 0,
      isNew: true,
      labelButton: "Create Country",
      createCountryData: {
        description: "",
        active: true,
      },
    };
  },
  beforeMount() {
    console.log(this.countryId);
    if (parseFloat(this.countryId) !== 0) {
      this.isNew = false;
      this.labelButton = "Save";
      this.getCountryById(this.countryId).then(() => {
        this.createCountryData = { ...this.info };
      });
    }
  },
  computed: {
    ...mapState({
      info: (state) => state.countries.selected,
    }),
  },
  validations: {
    createCountryData: {
      description: { required, ValidChars },
    },
  },
  methods: {
    ...mapActions(["getCountryById"]),
    cancel() {
      this.$router.push({ name: "list-countries" });
    },
    async submitForm() {
      this.$v.createCountryData.$touch();
      const errorExists = this.$v.createCountryData.$invalid;
      if (errorExists) this.userPanel = 0;
      if (errorExists) return;

      const {
        description: { $model: description },
      } = this.$v.createCountryData;
      const { active } = this.createCountryData;

      this.loading = true;
      const countryInformation = {
        id: parseInt(this.countryId),
        description,
        active,
      };

      if (parseInt(this.countryId) === 0) delete countryInformation.id;

      await createCountry({ countryInformation });
      this.loading = false;
      this.createCountryData = {};
      this.$v.createCountryData.$reset();
      this.$router.push({ name: "list-countries" });
    },
  },
};
</script>

<style lang="less" scoped>
@import "~@/assets/style/AccordionStyle.less";
</style>
