<template>
  <div>
    <!-- <AddCompanyModal :showModal="modalCreateCompany" /> -->

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
          Cedent Information

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
                v-model.trim="$v.cedentData.name.$model"
                autocomplete="new-password"
                @input="$v.cedentData.name.$touch()"
                @blur="$v.cedentData.name.$touch()"
                required
                :error-messages="
                  requiredInputVuelidateParent('name', 'cedentData')
                "
                label="Names"
              >
              </v-text-field>
            </div>

            <!-- <div class="ExpansionInputContent mb-7">
              <v-text-field
                v-model.trim="$v.cedentData.email.$model"
                @input="$v.cedentData.email.$touch()"
                @blur="$v.cedentData.email.$touch()"
                required
                :error-messages="
                  requiredEmailVuelidateParent('email', 'cedentData')
                "
                label="E-mail"
              >
              </v-text-field>
            </div> -->

            <!-- <div class="ExpansionInputContent mb-7">
              <v-text-field
                v-model.trim="$v.cedentData.phone.$model"
                @input="$v.cedentData.phone.$touch()"
                @blur="$v.cedentData.phone.$touch()"
                required
                :error-messages="
                  requiredInputVuelidateParent('phone', 'cedentData')
                "
                label="Cell Phone Number"
              >
              </v-text-field>
            </div> -->

            <div class="ExpansionInputContent">
              <v-select
                v-model.trim="$v.cedentData.country.$model"
                @input="$v.cedentData.country.$touch()"
                @blur="$v.cedentData.country.$touch()"
                required
                :error-messages="
                  requiredInputVuelidateParent('country', 'cedentData')
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

            <!-- <div class="ExpansionInputContent">
              <v-select
                v-model.trim="$v.cedentData.company.$model"
                @input="$v.cedentData.company.$touch()"
                @blur="$v.cedentData.company.$touch()"
                required
                :error-messages="
                  requiredInputVuelidateParent('company', 'cedentData')
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
                v-model.trim="$v.cedentData.roleCompany.$model"
                @input="$v.cedentData.roleCompany.$touch()"
                @blur="$v.cedentData.roleCompany.$touch()"
                required
                :error-messages="
                  requiredInputVuelidateParent('roleCompany', 'cedentData')
                "
                label="Role Company"
              >
              </v-text-field>
            </div> -->
            <div class="ExpansionInputContent">
              <v-text-field
                v-model.trim="$v.cedentData.address.$model"
                @input="$v.cedentData.address.$touch()"
                @blur="$v.cedentData.address.$touch()"
                required
                :error-messages="
                  requiredInputVuelidateParent('address', 'cedentData')
                "
                label="Address"
              >
              </v-text-field>
            </div>

            <div class="ExpansionInputContent HideOnMovil"></div>

            <div class="WhiteSpace HideOnMovil" />
            <Contacts
              option="2"
              :id="cedentId"
              v-if="!isNew"
            />
            <div class="finishButtonCont mt-8 d-flex justify-end align-center">
              <v-btn
                rounded
                large
                class="finishBtn"
                :loading="loading"
                depressed
                @click="cancel()"
                color="#003D6D"
                style="margin:10px"
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
                {{labelButton}}
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
import { createCedent } from './services/cedent.service'

// Componentes
// import AddCompanyModal from "@/components/Create/AddCompanyModal.vue";
import Contacts from "@/components/Contacts.vue";

export default {
  name: "CedentInformation",
  mixins: [stateExpansiveManager, formValidations, validationMixin],
  components: {
    Contacts,
    // AddCompanyModal
  },
  data () {
    return {
      loading: false,
      userPanel: 0,
      isNew: true,
      // loadingCompanies: false,
      loadingCountries: false,
      labelButton: 'Create',
      cedentData: {
        name: '',
        // company: 0,
        address: '',
        country: '',
        // phone: '',
        // celular: '',
        // email: '',
        // roleCompany: ''
      }
    };
  },
  props: {
    cedentId: {
      required: true,
    },
  },
  beforeMount () {
    if (parseFloat(this.cedentId) === 0) {
      Promise.all([
        this.getCatalogByName({ name: "countries" }),
        // this.getCatalogByName({ name: "companies" })
      ])
    } else {
      this.isNew = false;
      this.labelButton = 'Save';
      Promise.all([
        this.getCedentId(this.cedentId),
        this.getContactsById({ id: this.cedentId, type: 2 }),
        this.getCatalogByName({ name: "countries" }),
        // this.getCatalogByName({ name: "companies" })
      ]).then(() => {
        this.cedentData = this.info
        // this.cedentData.company = this.companies.find(x => x.id == this.info.catalogCompanyId)
        this.cedentData.country = this.countries.find(x => x.id == this.info.catalogCountryId)
      })
    }
  },
  async mounted () {
    const lcom = "loadingCountries";
    // const lcou = "loadingCompanies";

    this[lcom] = !this[lcom];
    // this[lcou] = !this[lcou];

    // await this.getCatalogByName({ name: "countries" });
    // await this.getCatalogByName({ name: "companies" });

    this[lcom] = false;
    // this[lcou] = false;
  },
  computed: {
    ...mapGetters([
      'countries',
      // 'companies',
      // 'modalCreateCompany'
    ]),
    ...mapState({
      roles: (state) => state.roles.list,
      info: (state) => state.cedents.selected
    }),
  },
  validations: {
    cedentData: {
      name: { required, ValidChars },
      // email: { required, email },
      // phone: { required, validPhone },
      address: { required, ValidChars },
      // company: { required },
      country: { required },
      // roleCompany: { required },
    },
  },
  methods: {
    ...mapActions(["getCatalogByName", "getCedentId", "getContactsById"]),
    ...mapMutations(["setModalCreateCompany"]),
    cancel () {
      this.$router.push({ name: 'list-cedents' })
    },
    async submitForm () {
      this.$v.cedentData.$touch(); // valida el formulario
      const errorExists = this.$v.cedentData.$invalid;
      if (errorExists) this.userPanel = 0;
      if (errorExists) return;

      const { name: { $model: name } } = this.$v.cedentData;
      // const { email: { $model: email } } = this.$v.cedentData;
      // const { phone: { $model: phone } } = this.$v.cedentData;
      const { address: { $model: address } } = this.$v.cedentData;
      // const { company: { $model: company } } = this.$v.cedentData;
      const { country: { $model: country } } = this.$v.cedentData;
      // const { roleCompany: { $model: roleCompany } } = this.$v.cedentData;

      this.loading = true;

      const cedentData = {
        id: parseInt(this.cedentId),
        name,
        email: null,
        phone: null,
        catalogCountryId: country.id,
        catalogCompanyId: null,
        address,
        roleCompany: null
      }

      if (parseInt(this.cedentId) === 0) delete cedentData.id
      await createCedent({ cedentData })

      this.loading = false;
      this.cedentData = {}
      this.$v.cedentData.$reset();
      this.$router.push({ name: 'list-cedents' })
    },
  },
};
</script>
<style lang="less" scoped>
@import '~@/assets/style/AccordionStyle.less';

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