<template>
  <div>
    <v-expansion-panels class="ExpansionComponent ExpansionBordered mt-6 MarginTopMovil" v-model="userPanel">
      <v-expansion-panel>
        <!--TITULO DEL ACORDEON-->
        <v-expansion-panel-header @click="changeStateExpansive()" class="ExpansionTitle" expand-icon="">
          Currency Information
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
              <v-text-field v-model.trim="createCurrencyData.key" required label="Currency Key (e.g., USD, EUR)"> </v-text-field>
            </div>
            <div class="ExpansionInputContent mb-7">
              <v-text-field v-model.trim="createCurrencyData.description" required label="Description"> </v-text-field>
            </div>
            <div class="ExpansionInputContent mb-7">
              <v-select v-model.trim="createCurrencyData.region" required :error-messages="requiredInputVuelidateParent('region', 'createCurrencyData')" label="Region" :items="regionOptions" item-text="text" item-value="value"> </v-select>
            </div>
            <div class="ExpansionInputContent">
              <v-switch v-model="createCurrencyData.active" label="Active" color="primary"></v-switch>
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
import { createCurrency } from "./services/currency.service";

export default {
  name: "CurrencyInformation",
  mixins: [stateExpansiveManager, formValidations, validationMixin],
  props: {
    currencyId: {
      required: true,
    },
  },
  data() {
    return {
      loading: false,
      userPanel: 0,
      isNew: true,
      labelButton: "Create Currency",
      regionOptions: [
        { text: "North America", value: "North America" },
        { text: "Europe", value: "Europe" },
        { text: "Central America", value: "Central America" },
        { text: "South America", value: "South America" },
        { text: "Caribbean", value: "Caribeean" },
        { text: "Asia", value: "Asia" },
        { text: "Africa", value: "Africa" },
        { text: "Oceania", value: "Oceania" },
      ],
      createCurrencyData: {
        key: "",
        description: "",
        region: "",
        active: true,
      },
      isEditMode: false,
    };
  },
  async mounted() {
    const currencyId = this.$route.query.currencyId;
    if (currencyId && currencyId != 0) {
      this.isEditMode = true;
      // obtener datos y rellenar el form
      await this.$store.dispatch("getCurrencyById", currencyId);
      this.currencyForm = { ...this.$store.state.currencies.currencyInformation };
    }
  },
  beforeMount() {
    if (parseFloat(this.currencyId) !== 0) {
      this.isNew = false;
      this.labelButton = "Save";
      this.getCurrencyById(this.currencyId).then(() => {
        this.createCurrencyData = { ...this.info };
      });
    }
  },
  computed: {
    ...mapState({
      info: (state) => state.currencies.selected,
    }),
  },
  validations: {
    createCurrencyData: {
      key: { required, ValidChars },
      description: { required, ValidChars },
      region: { required },
      active: {}, // aunque no tenga reglas, debe existir
    },
  },
  methods: {
    ...mapActions(["getCurrencyById"]),
    cancel() {
      this.$router.push({ name: "list-currencies" });
    },
    async submitForm() {
      this.$v.createCurrencyData.$touch();
      if (this.$v.createCurrencyData.$invalid) {
        this.userPanel = 0;
        return;
      }

      const {
        key: { $model: key },
        description: { $model: description },
        region: { $model: region },
        active: { $model: active },
      } = this.$v.createCurrencyData;

      this.loading = true;

      const currencyInformation = {
        id: parseInt(this.currencyId),
        key,
        description,
        region,
        active,
      };

      const currencyId = this.$route.query.currencyId; // 🔹 aquí sí lo declaras
      if (this.isEditMode) {
        // edit
        await this.$store.dispatch("updateCurrency", {
          currencyId,
          currencyInformation: currencyInformation,
        });
      } else {
        // crear
        if (parseInt(this.currencyId) === 0) delete currencyInformation.id;
        await createCurrency({ currencyInformation });
      }

      this.loading = false;
      this.createCurrencyData = {};
      this.$v.createCurrencyData.$reset();
      this.$router.push({ name: "list-currencies" });
    },
  },
};
</script>

<style lang="less" scoped>
@import "~@/assets/style/AccordionStyle.less";

.textcolor {
  color: white !important;
  font-weight: bold;
}
</style>
