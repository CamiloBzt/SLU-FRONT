<template>
  <v-expansion-panels
    class="ExpansionComponent ExpansionBordered mt-6 MarginTopMovil"
    v-model="brokerPanel"
  >
    <v-expansion-panel>
      <!--TITULO DEL ACORDEON-->
      <v-expansion-panel-header
        @click="changeStateExpansive()"
        class="ExpansionTitle"
        expand-icon=""
        >
        {{ viewName }} Information

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
              v-model.trim="$v.brokerInformation.brokerName.$model"
              @input="$v.brokerInformation.brokerName.$touch()"
              @blur="$v.brokerInformation.brokerName.$touch()"
              required
              :error-messages="
                requiredInputVuelidateParent('brokerName', 'brokerInformation')
              "
              label="Name"
            >
            </v-text-field>
          </div>

          <div class="ExpansionInputContent mb-7">
            <v-text-field
              v-model.trim="$v.brokerInformation.brokerEmail.$model"
              @input="$v.brokerInformation.brokerEmail.$touch()"
              @blur="$v.brokerInformation.brokerEmail.$touch()"
              required
              :error-messages="
                requiredEmailVuelidateParent('brokerEmail', 'brokerInformation')
              "
              label="E-mail"
            >
            </v-text-field>
          </div>

          <div class="ExpansionInputContent mb-7">
            <v-text-field
              v-model.trim="$v.brokerInformation.brokerPhone.$model"
              @input="$v.brokerInformation.brokerPhone.$touch()"
              @blur="$v.brokerInformation.brokerPhone.$touch()"
              required
              :error-messages="
                requiredInputVuelidateParent('brokerPhone', 'brokerInformation')
              "
              label="Cell Phone Number"
            >
            </v-text-field>
          </div>

          <div class="ExpansionInputContent">
            <v-select
              v-model.trim="$v.brokerInformation.brokerCountry.$model"
              @input="$v.brokerInformation.brokerCountry.$touch()"
              @blur="$v.brokerInformation.brokerCountry.$touch()"
              required
              :error-messages="
                requiredInputVuelidateParent(
                  'brokerCountry',
                  'brokerInformation'
                )
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
              v-model.trim="$v.brokerInformation.brokerCompany.$model"
              @input="$v.brokerInformation.brokerCompany.$touch()"
              @blur="$v.brokerInformation.brokerCompany.$touch()"
              required
              :error-messages="
                requiredInputVuelidateParent(
                  'brokerCompany',
                  'brokerInformation'
                )
              "
              label="Broker Company"
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
              v-model.trim="$v.brokerInformation.brokerRole.$model"
              @input="$v.brokerInformation.brokerRole.$touch()"
              @blur="$v.brokerInformation.brokerRole.$touch()"
              required
              :error-messages="
                requiredInputVuelidateParent('brokerRole', 'brokerInformation')
              "
              label="Role In Company"
            >
            </v-text-field>
          </div>

          <div class="ExpansionInputContent">
            <v-text-field
              v-model.trim="$v.brokerInformation.brokerAddress.$model"
              @input="$v.brokerInformation.brokerAddress.$touch()"
              @blur="$v.brokerInformation.brokerAddress.$touch()"
              required
              :error-messages="
                requiredInputVuelidateParent(
                  'brokerAddress',
                  'brokerInformation'
                )
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
/* project validations (in some cases depends on vuelidate) */
import { formValidations } from "@/mixins/formValidations";
import { validPhone, OnlyText, ValidChars } from "@/constants/validations";

import { stateExpansiveManager } from "@/mixins/subscription.js";

export default {
  name: "BrokerInformation",
  mixins: [stateExpansiveManager, formValidations, validationMixin],
  data() {
    return {
      brokerPanel: 0,
      viewName: "Broker",
      loadingCountries: false,
      loadingCompanies: false,
    };
  },
  beforeMount() {
    this.$emit("changeViewTitle", this.viewName);
  },
  async mounted() {
    const lcom = "loadingCountries";
    const lcou = "loadingCompanies";

    this[lcom] = !this[lcom];
    this[lcou] = !this[lcou];

    await Promise.all([
      this.getCatalogByName({ name: 'countries' }),
      this.getCatalogByName({ name: 'companies' }),
    ]);

    this[lcom] = false;
    this[lcou] = false;
  },
  computed: {
    ...mapGetters(["brokerInformation", "companies", "countries"]),
  },
  destroyed() {
    this.resetBrokerInformation();
  },
  validations: {
    brokerInformation: {
      brokerName: { required, OnlyText },
      brokerEmail: { required, email },
      brokerPhone: { required, validPhone },
      brokerAddress: { required, ValidChars },
      brokerCompany: { required },
      brokerCountry: { required },
      brokerRole: { required, ValidChars },
    },
  },
  methods: {
    ...mapActions([
      "resetBrokerInformation",
      "getCatalogByName",
      "createBroker",
    ]),
    ...mapMutations(["setModalCreateCompany"]),
    submitForm() {
      this.$v.$touch(); // valida el formulario

      const errorExists = this.$v.brokerInformation.$invalid;
      if (errorExists) this.brokerPanel = 0;

      if (this.$v.$invalid) return;

      this.$emit("startLoading");

      const {
        brokerName: { $model: brokerName },
        brokerRole: { $model: brokerRole },
        brokerEmail: { $model: brokerEmail },
        brokerPhone: { $model: brokerPhone },
        brokerAddress: { $model: brokerAddress },
        brokerCompany: { $model: brokerCompany },
        brokerCountry: { $model: brokerCountry },
      } = this.$v.brokerInformation;

      // action && end loading
      this.createBroker({
        brokerInformation: {
          brokerName,
          brokerRole,
          brokerEmail,
          brokerPhone,
          brokerAddress,
          brokerCompany,
          brokerCountry,
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