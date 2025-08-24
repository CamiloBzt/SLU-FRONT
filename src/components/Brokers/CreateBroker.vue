<template>
  <div>
    <!-- <AddCompanyModal :showModal="modalCreateCompany" /> -->

    <v-expansion-panels class="ExpansionComponent ExpansionBordered mt-6 MarginTopMovil" v-model="userPanel">
      <v-expansion-panel>
        <!--TITULO DEL ACORDEON-->
        <v-expansion-panel-header @click="changeStateExpansive()" class="ExpansionTitle" expand-icon="">
          Broker Information

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
                v-model.trim="$v.createUserData.name.$model"
                autocomplete="new-password"
                @input="$v.createUserData.name.$touch()"
                @blur="$v.createUserData.name.$touch()"
                required
                :error-messages="requiredInputVuelidateParent('name', 'createUserData')"
                label="Names"
              >
              </v-text-field>
            </div>

            <!-- <div class="ExpansionInputContent mb-7">
              <v-text-field
                v-model.trim="$v.createUserData.email.$model"
                @input="$v.createUserData.email.$touch()"
                @blur="$v.createUserData.email.$touch()"
                required
                :error-messages="
                  requiredEmailVuelidateParent('email', 'createUserData')
                "
                label="E-mail"
              >
              </v-text-field>
            </div> -->

            <!-- <div class="ExpansionInputContent mb-7">
              <v-text-field
                v-model.trim="$v.createUserData.phone.$model"
                @input="$v.createUserData.phone.$touch()"
                @blur="$v.createUserData.phone.$touch()"
                required
                :error-messages="
                  requiredInputVuelidateParent('phone', 'createUserData')
                "
                label="Cell Phone Number"
              >
              </v-text-field>
            </div> -->

            <div class="ExpansionInputContent">
              <v-select
                v-model.trim="$v.createUserData.country.$model"
                @input="$v.createUserData.country.$touch()"
                @blur="$v.createUserData.country.$touch()"
                required
                :error-messages="requiredInputVuelidateParent('country', 'createUserData')"
                label="Country"
                :items="countries"
                :loading="loadingCountries"
                item-text="description"
                item-value="id"
                return-object
              >
              </v-select>
            </div>

            <!-- <div class="ExpansionInputContent">
              <v-select
                v-model.trim="$v.createUserData.company.$model"
                @input="$v.createUserData.company.$touch()"
                @blur="$v.createUserData.company.$touch()"
                required
                :error-messages="
                  requiredInputVuelidateParent('company', 'createUserData')
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
                    <v-btn
                      text
                      @click="setModalCreateCompany()"
                      class="AddBtn"
                    >
                      <v-icon> mdi-plus-circle-outline </v-icon>
                      Add new company
                    </v-btn>
                  </div>
                </template>
              </v-select>
            </div>
            <div class="ExpansionInputContent mb-7">
              <v-text-field
                v-model.trim="$v.createUserData.roleCompany.$model"
                @input="$v.createUserData.roleCompany.$touch()"
                @blur="$v.createUserData.roleCompany.$touch()"
                required
                :error-messages="
                  requiredInputVuelidateParent('roleCompany', 'createUserData')
                "
                label="Role Company"
              >
              </v-text-field>
            </div> -->

            <div class="ExpansionInputContent">
              <v-text-field
                v-model.trim="$v.createUserData.address.$model"
                @input="$v.createUserData.address.$touch()"
                @blur="$v.createUserData.address.$touch()"
                required
                :error-messages="requiredInputVuelidateParent('address', 'createUserData')"
                label="Address"
              >
              </v-text-field>
            </div>

            <div class="ExpansionInputContent HideOnMovil"></div>

            <div class="WhiteSpace HideOnMovil" />
            <Contacts option="1" :id="brokerId" v-if="!isNew" />
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
import { mapActions, mapGetters, mapMutations, mapState } from "vuex";
/* vuelidate mixin & validations */
import { validationMixin } from "vuelidate";
import { required, email } from "vuelidate/lib/validators";
import { validPhone, OnlyText, ValidChars } from "@/constants/validations";
/* project validations (in some cases depends on vuelidate) */
import { formValidations } from "@/mixins/formValidations";
import { stateExpansiveManager } from "@/mixins/subscription.js";
/* services */
import { createBroker } from "./services/broker.service";

// Componentes
// import AddCompanyModal from "@/components/Create/AddCompanyModal.vue";
import Contacts from "@/components/Contacts.vue";

export default {
  name: "BrokerInformation",
  mixins: [stateExpansiveManager, formValidations, validationMixin],
  components: {
    Contacts,
    // AddCompanyModal
  },
  props: {
    brokerId: {
      required: true,
    },
  },
  data() {
    return {
      loading: false,
      userPanel: 0,
      // loadingCompanies: false,
      loadingCountries: false,
      isNew: true,
      labelButton: "Create Broker",
      createUserData: {
        name: "",
        // company: 0,
        address: "",
        country: "",
        // phone: '',
        // celular: '',
        // email: '',
        // roleCompany: ''
      },
    };
  },
  beforeMount() {
    //console.log(this.brokerId)
    if (parseFloat(this.brokerId) === 0) {
      Promise.all([
        this.getCatalogByName({ name: "countries" }),
        // this.getCatalogByName({ name: "companies" })
      ]);
    } else {
      this.isNew = false;
      this.labelButton = "Save";
      Promise.all([
        this.getBrokerId(this.brokerId),
        this.getContactsById({ id: this.brokerId, type: 1 }),
        this.getCatalogByName({ name: "countries" }),
        // this.getCatalogByName({ name: "companies" })
      ]).then(() => {
        this.createUserData = this.info;
        // this.createUserData.company = this.companies.find(x => x.id == this.info.catalogCompanyId)
        this.createUserData.country = this.countries.find((x) => x.id == this.info.catalogCountryId);
      });
    }
  },
  computed: {
    ...mapGetters([
      "countries",
      // 'companies',
      // 'modalCreateCompany'
    ]),
    ...mapState({
      contacts: (state) => state.contacts,
      info: (state) => state.brokers.selected,
    }),
  },
  validations: {
    createUserData: {
      name: { required, OnlyText },
      // email: { required, email },
      // phone: { required, validPhone },
      address: { required, ValidChars },
      // company: { required },
      country: { required },
      // roleCompany: { required },
    },
  },
  methods: {
    ...mapActions(["getCatalogByName", "getBrokerId", "getContactsById"]),
    ...mapMutations(["setModalCreateCompany"]),
    cancel() {
      this.$router.push({ name: "list-brokers" });
    },
    async submitForm() {
      this.$v.createUserData.$touch(); // valida el formulario
      const errorExists = this.$v.createUserData.$invalid;
      if (errorExists) this.userPanel = 0;
      if (errorExists) return;

      const {
        name: { $model: name },
      } = this.$v.createUserData;
      // const { email: { $model: email } } = this.$v.createUserData;
      // const { phone: { $model: phone } } = this.$v.createUserData;
      const {
        address: { $model: address },
      } = this.$v.createUserData;
      // const { company: { $model: company } } = this.$v.createUserData;
      const {
        country: { $model: country },
      } = this.$v.createUserData;
      // const { roleCompany: { $model: roleCompany } } = this.$v.createUserData;

      this.loading = true;

      const brokerInformation = {
        id: parseInt(this.brokerId),
        name,
        email: null,
        phone: null,
        catalogCountryId: country.id,
        catalogCompanyId: null,
        address,
        roleCompany: null,
      };

      if (parseInt(this.brokerId) === 0) delete brokerInformation.id;
      await createBroker({ brokerInformation });

      this.loading = false;
      this.createUserData = {};
      this.$v.createUserData.$reset();
      this.$router.push({ name: "list-brokers" });
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
  bottom: 8px;
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
</style>
