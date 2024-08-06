<template>
  <div>
    <AddCompanyModal :showModal="modalCreateCompany"/>

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
          User Information
  
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
                @input="$v.createUserData.name.$touch(), changeFirm($event)"
                @blur="$v.createUserData.name.$touch()"
                required
                :error-messages="
                  requiredInputVuelidateParent('name', 'createUserData')
                "
                label="First Name"
              >
              </v-text-field>
            </div>
  
            <div class="ExpansionInputContent mb-7">
              <v-text-field
                v-model.trim="$v.createUserData.lastName.$model"
                @input="
                  $v.createUserData.lastName.$touch(), changeFirm($event)
                "
                autocomplete="new-password"
                @blur="$v.createUserData.lastName.$touch()"
                required
                :error-messages="
                  requiredInputVuelidateParent('lastName', 'createUserData')
                "
                label="Last Name"
              >
              </v-text-field>
            </div>
  
            <div class="ExpansionInputContent mb-7">
              <v-text-field
                v-model.trim="$v.createUserData.email.$model"
                @input="$v.createUserData.email.$touch(), changeFirm($event)"
                @blur="$v.createUserData.email.$touch()"
                required
                :error-messages="
                  requiredEmailVuelidateParent('email', 'createUserData')
                "
                label="E-mail"
              >
              </v-text-field>
            </div>
  
            <div class="ExpansionInputContent mb-7">
              <v-text-field
                v-model.trim="$v.createUserData.celular.$model"
                @input="$v.createUserData.celular.$touch(), changeFirm($event)"
                @blur="$v.createUserData.celular.$touch()"
                required
                :error-messages="
                  requiredInputVuelidateParent('celular', 'createUserData')
                "
                label="Cell phone number"
              >
              </v-text-field>
            </div>
  
            <div class="ExpansionInputContent">
              <v-select
                v-model.trim="$v.createUserData.country.$model"
                @input="$v.createUserData.country.$touch()"
                @blur="$v.createUserData.country.$touch()"
                required
                :error-messages="
                  requiredInputVuelidateParent('country', 'createUserData')
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
                v-model.trim="$v.createUserData.company.$model"
                @input="$v.createUserData.company.$touch()"
                @blur="$v.createUserData.company.$touch()"
                required
                :error-messages="
                  requiredInputVuelidateParent('company', 'createUserData')
                "
                label="User Company"
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
             <v-select
                v-model.trim="$v.createUserData.role.$model"
                @input="$v.createUserData.role.$touch(), changeFirm()"
                @blur="$v.createUserData.role.$touch()"
                required
                :error-messages="
                  requiredInputVuelidateParent('role', 'createUserData')
                "
                label="Role"
                multiple
                :items="roles"
                :loading="loadingCompanies"
                item-text="role"
                item-value="id"
                return-object
              >
              </v-select>
            </div>
            <div class="ExpansionInputContent">
              <v-text-field
                v-model.trim="$v.createUserData.address.$model"
                @input="$v.createUserData.address.$touch()"
                @blur="$v.createUserData.address.$touch()"
                required
                :error-messages="
                  requiredInputVuelidateParent('address', 'createUserData')
                "
                label="Address"
              >
              </v-text-field>
            </div>
  
            <div class="ExpansionInputContent HideOnMovil"></div>
  
            <TextBox
              :textFirm="textFirm"
              @setFirm="setFirm"
            />
  
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
                Save
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

  // Componentes
import AddCompanyModal from "@/components/Create/AddCompanyModal.vue";
import TextBox from "@/components/Firm/TextBox.vue";

export default {
  name: "UserInformation",
  mixins: [stateExpansiveManager, formValidations, validationMixin],
  props: {
    userId: {
      required: true,
    },
  },
  components: {
    TextBox,
    AddCompanyModal
  },
  data() {
    return {
      loading: false,
      userPanel: 0,
      loadingCompanies: false,
      loadingCountries: false,
      createUserData: {
        names: '',
        lastName: '',
        company: 0,
        address: '',
        country: '',
        celular: '',
        email: '',
        userSignature: '',
        role: []
      }
    };
  },
  async beforeMount() {
    await this.getCatalogByName({ name: "countries" });
    await this.getCatalogByName({ name: "companies" });
    await this.getAllRoles();
    if (parseFloat(this.userId) > 0) {
      await this.getUserById(this.userId).then(()=> {
        this.createUserData = this.item
        this.createUserData.company = this.companies.find(x => x.id == this.item.companyId)
        this.createUserData.country = this.countries.find(x => x.id == this.item.countryId)
        this.role = this.roles
        this.createUserData.role = this.roles.reduce((accum, item)=> {
          const i = this.item.role.find(x => x.id == item.id )
          if(i) {
            accum.push(item);
          }
          return accum;
        },[])

        this.createUserData.userSignature = this.item.signature
      })
    }
    const lcom = "loadingCountries";
    const lcou = "loadingCompanies";

    this[lcom] = !this[lcom];
    this[lcou] = !this[lcou];
    this[lcom] = false;
    this[lcou] = false;
  },
  async mount() {
  },
  computed: {
    ...mapGetters([
      'countries',
      'companies',
      'modalCreateCompany'
    ]),
    ...mapState({
      roles: (state) => state.roles.list,
      item: (state)=> state.auth.item
    }),
    textFirm: {
      set(val) {
        this.$v.createUserData.userSignature.$model = val || null;
      },
      get() {
        return this.$v.createUserData.userSignature.$model;
      },
    },
  },
  validations: {
    createUserData: {
      name: { required, OnlyText },
      lastName: { required, OnlyText },
      email: { required, email },
      celular: { required, validPhone },
      address: { required, ValidChars },
      company: { required },
      country: { required },
      role: { required },
      userSignature: { required },
    },
  },
  methods: {
    ...mapActions(["getCatalogByName", "createUserTest", "getAllRoles", "getUserById","resetUserEdit"]),
    ...mapMutations(["setModalCreateCompany"]),
    cancel() {
      this.$router.push({ name: 'list-users'})
    },
    submitForm() {
      this.$v.createUserData.$touch(); // valida el formulario
      const errorExists = this.$v.createUserData.$invalid;
      const {role: { $model: role }} = this.$v.createUserData;
      if (errorExists) this.userPanel = 0;
      if (errorExists) return;
      const { name: { $model: name }} = this.$v.createUserData;
      const { email: { $model: email }} = this.$v.createUserData;
      const {celular: { $model: celular }} = this.$v.createUserData;
      const {address: { $model: address }} = this.$v.createUserData;
      const {company: { $model: company }} = this.$v.createUserData;
      const {country: { $model: country }} = this.$v.createUserData;
      const { lastName: { $model: lastName }} = this.$v.createUserData;
      const { userSignature: { $model: userSignature }} = this.$v.createUserData;
      this.loading  = true;
      const roles = role.reduce((accum, item)=> {
        accum.push(parseFloat(item.id))
        return accum;
      },[]);
      this.createUserTest({
        id: this.item.id,
        name,
        lastName,
        email,
        celular,
        countryId: country.id,
        companyId: company.id,
        role: roles,
        signature: userSignature,
        address
      }).then (dato  => {
        this.resetUserEdit();
        this.$v.createUserData.$reset();
        setTimeout(() => {
          this.$router.back();
        }, 2500);
      }).finally(() => {
        this.loading = false;
      });
    },
    changeFirm(val) {
      /*
				Actualiza los valores que se
				ingresaron en los inputs
				para guardarlos en la firma
			*/
      const textValue =`
        <p>
          <b>
            <span style='color:#547FA9'>
          ${( this.createUserData.name ?? '' )} ${( this.createUserData.lastName ?? '' )}
            </span>
          </b>
        </p>
        
        <p>${(this.createUserData.role && Array.isArray(this.createUserData.role) && this.createUserData.role.length > 0 ?  this.createUserData.role[0].role : '' )}</p>

        <p>${(this.createUserData.celular ? this.createUserData.celular : '')}</p>

        <p>
          <span style='color:#547FA9'>
          ${(this.createUserData.email ? this.createUserData.email : '' )}
          </span>
        </p>`
      ;

      this.textFirm = textValue;
    },
    setFirm(newFirm) {
      this.$v.createUserData.userSignature.$model = newFirm
    }
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