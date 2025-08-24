<template>
  <div>
    <v-expansion-panels class="ExpansionComponent ExpansionBordered mt-6 MarginTopMovil" v-model="userPanel">
      <v-expansion-panel>
        <!--TITULO DEL ACORDEON-->
        <v-expansion-panel-header @click="changeStateExpansive()" class="ExpansionTitle" expand-icon="">
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
              <v-text-field v-model.trim="createCountryData.description" required label="Country Name"></v-text-field>
            </div>
            <div class="ExpansionInputContent">
              <v-switch v-model="createCountryData.active" label="Active" color="primary"></v-switch>
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
      isEditMode: false,
    };
  },
  async mounted() {
    const countryId = this.$route.query.countryId;
    if (countryId && countryId !== 0) {
      this.isEditMode = true;
      await this.$store.dispatch("getCountryById", countryId);
      this.countryForm = {...this.$store.state.countries.countryInformation};
    }
  },
  beforeMount() {
    // console.log(this.countryId);
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
      active: {},
    },
  },
  methods: {
    ...mapActions(["getCountryById"]),
    cancel() {
      this.$router.push({ name: "list-countries" });
    },
    async submitForm() {
      this.$v.createCountryData.$touch();
      if (this.$v.createCountryData.$invalid) {
      this.userPanel = 0;
      return;
      }

      const {
        description: { $model: description },
        active: {$model: active},
      } = this.$v.createCountryData;

      this.loading = true;
      const countryInformation = {
        id: parseInt(this.countryId),
        description,
        active,
      };
      console.log(countryInformation);
      console.log(this.isEditMode);
      

      const countryId = this.$route.query.countryId;
      console.log(countryId);
      if (this.isEditMode){
        //Edit Mode
        
        await this.$store.dispatch("updateCountry", {
          countryId, 
          countryInformation: countryInformation,
        });
      } else {
        //Create Mode
      if (parseInt(this.countryId) === 0) delete countryInformation.id;
      await createCountry({ countryInformation });
      }

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
