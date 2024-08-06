<template>
  <v-expansion-panels
    class="ExpansionComponent ExpansionBordered mt-6 MarginTopMovil"
    v-model="cedentPanel"
  >
    <v-expansion-panel>
      <!--TITULO DEL ACORDEON-->
      <v-expansion-panel-header
        @click="changeStateExpansive()"
        class="ExpansionTitle"
        expand-icon=""
      >
        {{ viewTitle }} Information

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
          <!--INPUTS-->
          <div class="ExpansionInputContent mb-7">
            <v-text-field
              v-model.trim="$v.cedentData.cedentName.$model"
              @input="$v.cedentData.cedentName.$touch()"
              @blur="$v.cedentData.cedentName.$touch()"
              required
              :error-messages="
                requiredInputVuelidateParent('cedentName', 'cedentData')
              "
              label="Name"
            >
            </v-text-field>
          </div>
          <div class="ExpansionInputContent mb-7">
            <v-text-field
              v-model.trim="$v.cedentData.cedentEmail.$model"
              @input="$v.cedentData.cedentEmail.$touch()"
              @blur="$v.cedentData.cedentEmail.$touch()"
              required
              :error-messages="
                requiredEmailVuelidateParent('cedentEmail', 'cedentData')
              "
              label="E-mail"
            >
            </v-text-field>
          </div>

          <div class="ExpansionInputContent mb-7">
            <v-text-field
              v-model.trim="$v.cedentData.cedentPhone.$model"
              @input="$v.cedentData.cedentPhone.$touch()"
              @blur="$v.cedentData.cedentPhone.$touch()"
              required
              :error-messages="
                requiredInputVuelidateParent('cedentPhone', 'cedentData')
              "
              label="Cell Phone Number"
            >
            </v-text-field>
          </div>

          <div class="ExpansionInputContent">
            <v-select
              v-model.trim="$v.cedentData.cedentCountry.$model"
              @input="$v.cedentData.cedentCountry.$touch()"
              @blur="$v.cedentData.cedentCountry.$touch()"
              required
              :error-messages="
                requiredInputVuelidateParent('cedentCountry', 'cedentData')
              "
              label="Country"
              :items="countries"
              :loading="loadingCountries"
              item-text="description"
              item-value="id"
              return-object
            >
            </v-select>
          </div>

          <div class="ExpansionInputContent">
            <v-select
              v-model.trim="$v.cedentData.cedentCompany.$model"
              @input="$v.cedentData.cedentCompany.$touch()"
              @blur="$v.cedentData.cedentCompany.$touch()"
              required
              :error-messages="
                requiredInputVuelidateParent('cedentCompany', 'cedentData')
              "
              label="Cedent Company"
              :items="companies"
              :loading="loadingCompanies"
              item-text="name"
              item-value="id"
              return-object
            >
              <template #append-item>
                <div class="AddCompanyCont">
                  <v-btn text @click="setModalCreateCompany()" class="AddBtn">
                    <v-icon> mdi-plus-circle-outline </v-icon>
                    Add new company
                  </v-btn>
                </div>
              </template>
            </v-select>
          </div>

          <div class="ExpansionInputContent">
            <v-text-field
              v-model.trim="$v.cedentData.cedentRole.$model"
              @input="$v.cedentData.cedentRole.$touch()"
              @blur="$v.cedentData.cedentRole.$touch()"
              required
              :error-messages="
                requiredInputVuelidateParent('cedentRole', 'cedentData')
              "
              label="Role In Company"
            >
            </v-text-field>
          </div>

          <div class="ExpansionInputContent">
            <v-text-field
              v-model.trim="$v.cedentData.cedentAddress.$model"
              @input="$v.cedentData.cedentAddress.$touch()"
              @blur="$v.cedentData.cedentAddress.$touch()"
              required
              :error-messages="
                requiredInputVuelidateParent('cedentAddress', 'cedentData')
              "
              label="Address"
            >
            </v-text-field>
          </div>

          <div class="ExpansionInputContent HideOnMovil"></div>

          <div class="WhiteSpace HideOnMovil"></div>
        </div>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>
<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
/* vuelidate mixin & validations */
import { validationMixin } from "vuelidate";
import { required, email } from "vuelidate/lib/validators";
import { validPhone, OnlyText, ValidChars } from "@/constants/validations";
/* project validations (in some cases depends on vuelidate) */
import { formValidations } from "@/mixins/formValidations";

import { stateExpansiveManager } from "@/mixins/subscription.js";

export default {
  name: "CedentInformation",
  mixins: [stateExpansiveManager, formValidations, validationMixin],
  data() {
    return {
      cedentPanel: 0,
      viewTitle: "Cedent",
      loadingCountries: false,
      loadingCompanies: false,
    };
  },
  beforeMount() {
    this.$emit("changeViewTitle", this.viewTitle);
  },
  async mounted() {
    const lcom = "loadingCountries";
    const lcou = "loadingCompanies";

    this[lcom] = !this[lcom];
    this[lcou] = !this[lcou];

    await this.getCatalogByName({ name: "countries" });
    await this.getCatalogByName({ name: "companies" });

    this[lcom] = false;
    this[lcou] = false;
  },
  computed: {
    ...mapGetters(["cedentData", "companies", "countries"]),
  },
  destroyed() {
    this.resetCedentData();
  },
  validations: {
    cedentData: {
      cedentName: { required, OnlyText },
      cedentEmail: { required, email },
      cedentPhone: { required, validPhone },
      cedentAddress: { required, ValidChars },
      cedentCompany: { required },
      cedentCountry: { required },
      cedentRole: { required, ValidChars },
    },
  },
  methods: {
    ...mapActions(["getCatalogByName", "resetCedentData", "createCedent"]),
    ...mapMutations(["setModalCreateCompany"]),
    submitForm() {
      this.$v.$touch(); // valida el formulario

      const errorExists = this.$v.cedentData.$invalid;
      if (errorExists) this.cedentPanel = 0;

      if (this.$v.$invalid) return;

      this.$emit("startLoading");

      const {
        cedentName: { $model: cedentName },
        cedentRole: { $model: cedentRole },
        cedentEmail: { $model: cedentEmail },
        cedentPhone: { $model: cedentPhone },
        cedentAddress: { $model: cedentAddress },
        cedentCompany: { $model: cedentCompany },
        cedentCountry: { $model: cedentCountry },
      } = this.$v.cedentData;

      // action && end loading
      this.createCedent({
        cedentData: {
          cedentName,
          cedentRole,
          cedentEmail,
          cedentPhone,
          cedentAddress,
          cedentCompany,
          cedentCountry,
        },
      })
        .then(() => {
          this.$v.$reset();
        })
        .finally(() => {
          this.$emit("finishLoading", "loading");
        });
    },
  },
};
</script>
<style lang="less" scoped>
@import "~@/assets/style/AccordionStyle.less";

.AddCompanyCont {
  height: 50px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  position: sticky;
  background-color: white;
  bottom: 0;
  width: 100%;
  .AddBtn {
    width: 100%;
    height: 100%;
    padding-left: 10px !important;
    text-align: left !important;
    border-radius: 0 !important;
    justify-content: flex-start !important;
    text-transform: capitalize;
    i {
      margin-right: 7px;
      font-size: 22px;
    }
  }
}

.WhiteSpace {
  width: 100%;
  height: 20px;
}
</style>