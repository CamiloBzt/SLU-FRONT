<template>
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
              v-model.trim="$v.createUserData.userName.$model"
              @input="$v.createUserData.userName.$touch(), changeFirm($event)"
              @blur="$v.createUserData.userName.$touch()"
              required
              :error-messages="
                requiredInputVuelidateParent('userName', 'createUserData')
              "
              label="First Name"
            >
            </v-text-field>
          </div>

          <div class="ExpansionInputContent mb-7">
            <v-text-field
              v-model.trim="$v.createUserData.userLastName.$model"
              @input="
                $v.createUserData.userLastName.$touch(), changeFirm($event)
              "
              @blur="$v.createUserData.userLastName.$touch()"
              required
              :error-messages="
                requiredInputVuelidateParent('userLastName', 'createUserData')
              "
              label="Last Name"
            >
            </v-text-field>
          </div>

          <div class="ExpansionInputContent mb-7">
            <v-text-field
              v-model.trim="$v.createUserData.userEmail.$model"
              @input="$v.createUserData.userEmail.$touch(), changeFirm($event)"
              @blur="$v.createUserData.userEmail.$touch()"
              required
              :error-messages="
                requiredEmailVuelidateParent('userEmail', 'createUserData')
              "
              label="E-mail"
            >
            </v-text-field>
          </div>

          <div class="ExpansionInputContent mb-7">
            <v-text-field
              v-model.trim="$v.createUserData.userPhone.$model"
              @input="$v.createUserData.userPhone.$touch(), changeFirm($event)"
              @blur="$v.createUserData.userPhone.$touch()"
              required
              :error-messages="
                requiredInputVuelidateParent('userPhone', 'createUserData')
              "
              label="Cell Phone Number"
            >
            </v-text-field>
          </div>

          <div class="ExpansionInputContent">
            <v-select
              v-model.trim="$v.createUserData.userCountry.$model"
              @input="$v.createUserData.userCountry.$touch()"
              @blur="$v.createUserData.userCountry.$touch()"
              required
              :error-messages="
                requiredInputVuelidateParent('userCountry', 'createUserData')
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
              v-model.trim="$v.createUserData.userCompany.$model"
              @input="$v.createUserData.userCompany.$touch()"
              @blur="$v.createUserData.userCompany.$touch()"
              required
              :error-messages="
                requiredInputVuelidateParent('userCompany', 'createUserData')
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
              v-model.trim="$v.createUserData.userRole.$model"
              @input="$v.createUserData.userRole.$touch(), changeFirm()"
              @blur="$v.createUserData.userRole.$touch()"
              required
              :error-messages="
                requiredInputVuelidateParent('userRole', 'createUserData')
              "
              label="Role"
              :items="roles"
              :loading="loadingCompanies"
              item-text="role"
              item-value="id"
            />
          </div>

          <div class="ExpansionInputContent">
            <v-text-field
              v-model.trim="$v.createUserData.userAddress.$model"
              @input="$v.createUserData.userAddress.$touch()"
              @blur="$v.createUserData.userAddress.$touch()"
              required
              :error-messages="
                requiredInputVuelidateParent('userAddress', 'createUserData')
              "
              label="Address"
            >
            </v-text-field>
          </div>

          <div class="ExpansionInputContent HideOnMovil"></div>

          <TextBox :TextFirm="TextFirm" />

          <div class="WhiteSpace HideOnMovil" />
        </div>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>
<script>
import { mapActions, mapGetters, mapMutations, mapState } from 'vuex';
/* vuelidate mixin & validations */
import { validationMixin } from 'vuelidate';
import { required, email, requiredIf } from 'vuelidate/lib/validators';
import { validPhone, OnlyText, ValidChars } from '@/constants/validations';
/* project validations (in some cases depends on vuelidate) */
import { formValidations } from '@/mixins/formValidations';
import { stateExpansiveManager } from '@/mixins/subscription.js';

import TextBox from '@/components/Firm/TextBox.vue';
export default {
  name: 'UserInformation',
  mixins: [stateExpansiveManager, formValidations, validationMixin],
  components: {
    TextBox,
  },
  data() {
    return {
      userPanel: 0,
      viewTitle: 'SLU User',
      loadingCompanies: false,
      loadingCountries: false,
    };
  },
  beforeMount() {
    this.$emit('changeViewTitle', this.viewTitle);
  },
  async mounted() {
    const lcom = 'loadingCountries';
    const lcou = 'loadingCompanies';

    this[lcom] = !this[lcom];
    this[lcou] = !this[lcou];

    await Promise.all([
      this.getCatalogByName({ name: 'countries' }),
      this.getCatalogByName({ name: 'companies' }),
      this.getAllRoles(),
    ]);

    this[lcom] = false;
    this[lcou] = false;
  },
  computed: {
    ...mapGetters(['createUserData', 'countries', 'companies']),
    ...mapState({
      roles: ({ roles }) => roles.list,
    }),
    rolefield: {
      get() {
        /** @type {Array} */
        const data = this.roles || [];
        const field = data.find((v) => v.id == this.createUserData.userRole);
        if (field && field.role) return field.role;
        return '';
      }
    },
    TextFirm: {
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
      userName: { required, OnlyText },
      userLastName: { required },
      userEmail: { required, email },
      userPhone: { required, validPhone },
      userAddress: { required, ValidChars },
      userCompany: { required },
      userCountry: { required },
      userRole: { required },
      userSignature: { required },
    },
  },
  methods: {
    ...mapActions(['getCatalogByName', 'createUser', 'getAllRoles']),
    ...mapMutations(['setModalCreateCompany']),
    submitForm() {
      this.$v.$touch(); // valida el formulario

      const errorExists = this.$v.createUserData.$invalid;
      if (errorExists) this.userPanel = 0;

      if (this.$v.$invalid) return;

      this.$emit('startLoading');

      const {
        userName: { $model: userName },
        userRole: { $model: userRole },
        userEmail: { $model: userEmail },
        userPhone: { $model: userPhone },
        userAddress: { $model: userAddress },
        userCompany: { $model: userCompany },
        userCountry: { $model: userCountry },
        userLastName: { $model: userLastName },
      } = this.$v.createUserData;

      // action && end loading
      this.createUser({
        createUserData: {
          userName,
          userRole,
          userEmail,
          userPhone,
          userAddress,
          userCompany,
          userCountry,
          userLastName,
        },
      })
        .then(() => {
          this.$v.$reset();
        })
        .finally(() => {
          this.$emit('finishLoading', 'loading');
        });
    },
    changeFirm(val) {
      /*
				Actualiza los valores que se
				ingresaron en los inputs
				para guardarlos en la firma
			*/
      var userLastName = this.createUserData.userLastName;

      if (userLastName == undefined) {
        userLastName = '';
      }
      const textValue =
        '' +
        '<b>' +
        "<span style='color:#547FA9'>" +
        this.createUserData.userName +
        ' </b>' +
        '</span>' +
        '<b>' +
        "<span style='color:#547FA9'>" +
        userLastName +
        '</span>' +
        ' </b> <br><br>' +
        this.rolefield +
        '<br><br>' +
        this.createUserData.userPhone +
        '<br><br> <br><br> <br><br>' +
        "<span style='color:#547FA9'>" +
        this.createUserData.userEmail +
        '</span>';
      this.TextFirm = textValue;
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
  bottom: 0;
  background-color: white;
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