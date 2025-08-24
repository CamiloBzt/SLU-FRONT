<template>
  <div class="SubscriptionTable mt-5">
    <!--TITULO DE LA TABLA-->
    <div class="TableTitle d-flex justify-space-between align-center">
      <!--TITULO-->
      <div class="title">SLU Users</div>
      <!-- Modal de add y update -->
      <div class="finishButtonCont mt-4 d-flex justify-end align-center">
        <v-dialog v-model="dialog" persistent width="1024">
          <template v-slot:activator="{ on, attrs }">
            <v-btn rounded outlined large class="finishBtn mb-4" v-bind="attrs" v-on="on"> Create User </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <div class="ExpansionInputContent mb-7">
                      <v-text-field
                        v-model.trim="$v.createUserData.name.$model"
                        autocomplete="new-password"
                        @input="$v.createUserData.name.$touch(), changeFirm($event)"
                        @blur="$v.createUserData.name.$touch()"
                        required
                        :error-messages="requiredInputVuelidateParent('name', 'createUserData')"
                        label="Name"
                      >
                      </v-text-field>
                    </div>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <div class="ExpansionInputContent mb-7">
                      <v-text-field
                        v-model.trim="$v.createUserData.lastName.$model"
                        @input="$v.createUserData.lastName.$touch(), changeFirm($event)"
                        autocomplete="new-password"
                        @blur="$v.createUserData.lastName.$touch()"
                        required
                        :error-messages="requiredInputVuelidateParent('lastName', 'createUserData')"
                        label="Last Name"
                      >
                      </v-text-field>
                    </div>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <div class="ExpansionInputContent mb-7">
                      <v-text-field
                        v-model.trim="$v.createUserData.email.$model"
                        @input="$v.createUserData.email.$touch(), changeFirm($event)"
                        @blur="$v.createUserData.email.$touch()"
                        required
                        :error-messages="requiredEmailVuelidateParent('email', 'createUserData')"
                        label="E-mail"
                      >
                      </v-text-field>
                    </div>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <div class="ExpansionInputContent mb-7">
                      <v-text-field
                        v-model.trim="$v.createUserData.celular.$model"
                        @input="$v.createUserData.celular.$touch(), changeFirm($event)"
                        @blur="$v.createUserData.celular.$touch()"
                        required
                        :error-messages="requiredInputVuelidateParent('celular', 'createUserData')"
                        label="Cell phone number"
                      >
                      </v-text-field>
                    </div>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
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
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <div class="ExpansionInputContent">
                      <v-select
                        v-model.trim="$v.createUserData.company.$model"
                        @input="$v.createUserData.company.$touch()"
                        @blur="$v.createUserData.company.$touch()"
                        required
                        :error-messages="requiredInputVuelidateParent('company', 'createUserData')"
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
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <div class="ExpansionInputContent">
                      <v-select
                        v-model.trim="$v.createUserData.role.$model"
                        @input="$v.createUserData.role.$touch(), changeFirm()"
                        @blur="$v.createUserData.role.$touch()"
                        required
                        :error-messages="requiredInputVuelidateParent('role', 'createUserData')"
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
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
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
                  </v-col>
                  <div class="ExpansionInputContent HideOnMovil"></div>

                  <TextBox :textFirm="textFirm" @setFirm="setFirm" />
                  <div class="WhiteSpace HideOnMovil" />
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn rounded large :loading="loading" depressed color="blue darken-1" text @click="close" style="margin: 10px"> Cancel </v-btn>
              <v-btn rounded outlined large class="finishBtn" :loading="loading" color="blue darken-1" text @click="submitForm()"> Save </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>
    </div>
    <v-data-table :headers="headers" :items="list" class="elevation-1" ref="TableContent">
      <template v-slot:item.id="{ item }">
        {{ item.id != undefined ? item.id : "N/D" }}
      </template>
      <template v-slot:item.name="{ item }">
        {{ item.name != undefined ? item.name : "N/D" }}
      </template>
      <template v-slot:item.lastName="{ item }">
        {{ item.lastName != undefined ? item.lastName : "N/D" }}
      </template>
      <template v-slot:item.email="{ item }">
        {{ item.email != undefined ? item.email : "N/D" }}
      </template>
      <template v-slot:item.country="{ item }">
        {{ item.country != undefined ? item.country : "N/D" }}
      </template>
      <template v-slot:item.company="{ item }">
        {{ item.company != undefined ? item.company : "N/D" }}
      </template>
      <template v-slot:item.createdAt="{ item }">
        {{ formatDateMoment(item.createdAt) }}
      </template>
      <template v-slot:item.status="{ item }">
        {{ Boolean(item.status) === true ? "Activated" : "" }}
      </template>
      <template v-slot:top>
        <v-toolbar flat>
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="text-h5">Are you sure you want to delete this user?</v-card-title>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
                <v-btn color="blue darken-1" text @click="deleteItemConfirm(user)">OK</v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.actions="{ item }">
        <div class="TableBodyText d-flex row9 justify-center align-center">
          <v-tooltip right color="#003D6D">
            <template v-slot:activator="{ on, attrs }">
              <div class="Button__Action" @click="editItem(item)" icon v-bind="attrs" v-on="on">
                <v-icon> mdi-pencil-outline </v-icon>
              </div>
            </template>
            <span class="white--text">Edit User</span>
          </v-tooltip>
          <v-tooltip right color="#003D6D">
            <template v-slot:activator="{ on, attrs }">
              <div class="Button__Action" @click="deleteItem(item), (user = item)" icon v-bind="attrs" v-on="on">
                <v-icon> mdi-delete-outline </v-icon>
              </div>
            </template>

            <span class="white--text">Delete User</span>
          </v-tooltip>
          <v-tooltip right color="#003D6D">
            <template v-slot:activator="{ on, attrs }">
              <div class="Button__Action" @click="resendMail(item)" v-bind="attrs" v-on="on" icon>
                <v-icon> mdi-email-alert </v-icon>
              </div>
            </template>

            <span class="white--text">Resend Mail</span>
          </v-tooltip>
        </div>
      </template>
    </v-data-table>
  </div>
</template>
<script>
import { mapActions, mapGetters, mapMutations, mapState } from "vuex";
import moment from "moment";
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
  name: "UsersTable",
  mixins: [stateExpansiveManager, formValidations, validationMixin],
  props: {
    userId: {
      required: true,
    },
  },
  components: {
    TextBox,
    AddCompanyModal,
  },
  data() {
    return {
      headers: [
        { text: "ID", value: "id" },
        { text: "Name", value: "name" },
        { text: "Last Name", value: "lastName" },
        { text: "Email", value: "email" },
        { text: "Country", value: "country" },
        { text: "Company", value: "company" },
        { text: "Created", value: "createdAt" },
        { text: "Status", value: "status" },
        { text: "Actions", value: "actions" },
      ],
      pagination: {
        limit: 10,
        offset: 0,
      },
      user: {},
      dialog: false,
      columsArray: [
        {
          refNumber: "Ref number",
          country: "Country",
          typeOfRisk: "Type of Risk ",
          Broker: "Broker",
          inceptionDate: "Inception date",
          expiringDate: "Expiring date",
          status: "status",
        },
      ],
      tableBodyContSnWidth: 0,
      editedIndex: -1,
      createUserData: {
        name: "",
        calories: 0,
        fat: 0,
        carbs: 0,
        protein: 0,
      },
      defaultItem: {
        name: "",
        calories: 0,
        fat: 0,
        carbs: 0,
        protein: 0,
      },
      dialog: false,
      dialogDelete: false,
      loading: false,
      userPanel: 0,
      loadingCompanies: false,
      loadingCountries: false,
      createUserData: {
        names: "",
        lastName: "",
        company: 0,
        address: "",
        country: "",
        celular: "",
        email: "",
        userSignature: "",
        role: [],
      },
    };
  },
  computed: {
    ...mapGetters(["countries", "companies", "modalCreateCompany"]),
    ...mapState({
      list: (state) => state.auth.list,
      roles: (state) => state.roles.list,
      item: (state) => state.auth.item,
    }),
    formTitle() {
      return this.editedIndex === -1 ? "New User" : "Edit User";
    },
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
    ...mapActions(["getListUsers", "resendMail", "deleteUser", "getCatalogByName", "createUserTest", "getAllRoles", "getUserById", "resetUserEdit"]),
    ...mapMutations(["setModalCreateCompany"]),
    moveRightTable() {
      this.sideScroll("right", 25, 100, 10);
    },
    moveLeftTable() {
      this.sideScroll("left", 25, 100, 10);
    },
    goToCreate(item) {
      console.log(item);
      this.$router.push({ name: "create-user", query: { userId: item ? item.id : 0 } });
    },
    sideScroll(direction, speed, distance, step) {
      var container = document.querySelector(".TableContent");
      var scrollAmount = 0;
      var slideTimer = setInterval(function () {
        if (direction == "left") {
          container.scrollLeft -= step;
        } else {
          container.scrollLeft += step;
        }
        scrollAmount += step;
        if (scrollAmount >= distance) {
          window.clearInterval(slideTimer);
        }
      }, speed);
    },
    formatDateMoment(dateToFormat) {
      if (dateToFormat) {
        const date = moment(dateToFormat);
        const day = date.format("DD");
        const month = date.format("MM");
        const year = date.format("YYYY");
        const hour = date.format("HH:mm").toUpperCase();
        return `${day} - ${month} - ${year}`;
      } else {
        return dateToFormat;
      }
    },
    editItem(item) {
      console.log(item);
      this.getUser(item.id);
      this.editedIndex = this.list.indexOf(item);
      this.createUserData = Object.assign({}, item);
      this.dialog = true;
    },
    async getUser(id) {
      console.log(id);
      if (parseFloat(id) > 0) {
        console.log("yes");
        await this.getUserById(id).then(() => {
          this.createUserData = this.item;
          this.createUserData.company = this.companies.find((x) => x.id == this.item.companyId);
          this.createUserData.country = this.countries.find((x) => x.id == this.item.countryId);
          this.role = this.roles;
          this.createUserData.role = this.roles.reduce((accum, item) => {
            const i = this.item.role.find((x) => x.id == item.id);
            if (i) {
              accum.push(item);
            }
            return accum;
          }, []);

          this.createUserData.userSignature = this.item.signature;
        });
        console.log(this.createUserData);
      }
    },
    deleteItem(item) {
      this.editedIndex = this.list.indexOf(item);
      this.createUserData = Object.assign({}, item);
      this.dialogDelete = true;
    },
    deleteItemConfirm(item) {
      this.deleteUser(item);
      this.list.splice(this.editedIndex, 1);
      this.closeDelete();
    },
    close() {
      this.$router.push({ name: "list-users" });
      this.dialog = false;
      this.$nextTick(() => {
        this.createUserData = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.createUserData = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
    submitForm() {
      this.$v.createUserData.$touch(); // valida el formulario
      const errorExists = this.$v.createUserData.$invalid;
      const {
        role: { $model: role },
      } = this.$v.createUserData;
      if (errorExists) this.userPanel = 0;
      if (errorExists) return;
      const {
        name: { $model: name },
      } = this.$v.createUserData;
      const {
        email: { $model: email },
      } = this.$v.createUserData;
      const {
        celular: { $model: celular },
      } = this.$v.createUserData;
      const {
        address: { $model: address },
      } = this.$v.createUserData;
      const {
        company: { $model: company },
      } = this.$v.createUserData;
      const {
        country: { $model: country },
      } = this.$v.createUserData;
      const {
        lastName: { $model: lastName },
      } = this.$v.createUserData;
      const {
        userSignature: { $model: userSignature },
      } = this.$v.createUserData;
      console.log(this.$v.createUserData);
      this.loading = true;
      const roles = role.reduce((accum, item) => {
        accum.push(parseFloat(item.id));
        return accum;
      }, []);
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
        address,
      })
        .then((dato) => {
          this.resetUserEdit();
          this.$v.createUserData.$reset();
          setTimeout(() => {
            this.$router.back();
          }, 2500);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    changeFirm(val) {
      /*
        Actualiza los valores que se
        ingresaron en los inputs
        para guardarlos en la firma
      */
      const textValue = `
        <p>
          <b>
            <span style='color:#547FA9'>
          ${this.createUserData.name ?? ""} ${this.createUserData.lastName ?? ""}
            </span>
          </b>
        </p>

        <p>${this.createUserData.role && Array.isArray(this.createUserData.role) && this.createUserData.role.length > 0 ? this.createUserData.role[0].role : ""}</p>

        <p>${this.createUserData.celular ? this.createUserData.celular : ""}</p>

        <p>
          <span style='color:#547FA9'>
          ${this.createUserData.email ? this.createUserData.email : ""}
          </span>
        </p>`;
      this.textFirm = textValue;
    },
    setFirm(newFirm) {
      this.$v.createUserData.userSignature.$model = newFirm;
    },
  },
  async beforeMount() {
    this.$emit("startLoading");

    this.getListUsers().then(() => {
      this.$emit("finishLoading", "loading");
    });
    await this.getCatalogByName({ name: "countries" });
    await this.getCatalogByName({ name: "companies" });
    await this.getAllRoles();
    const lcom = "loadingCountries";
    const lcou = "loadingCompanies";

    this[lcom] = !this[lcom];
    this[lcou] = !this[lcou];
    this[lcom] = false;
    this[lcou] = false;
  },
  mounted() {
    console.log(this.list);
  },
  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },
};
</script>

<style lang="less" scoped>
@import "~@/assets/style/Subscription/Table.less";
@import "~@/assets/style/AccordionStyle.less";

//CONTENEDOR GENERAL DE LA TABLA
.SubscriptionTable {
  width: 100%;
  height: auto;

  //TITULO DE LA TABLA
  .TableTitle {
    width: 100%;
    height: 50px;

    .title {
      width: 200px;
      font-weight: 600;
      font-size: 1.5rem;
    }
  }

  //CONTENEDOR D ELA TABLA
  .TableContent {
    width: 100%;
    height: auto;

    //CUERPO DE LA TABLA
    .TableBodyContent {
      //box-shadow: 8px 8px 12px rgba(10, 63, 102, 0.15);
      padding: 0 !important;

      //CONTENEDOR DE LAS FILAS DE LA TABLA
      .TableContentInner {
        margin-top: 0.5rem;

        .TableBodyContSn {
          padding-left: 16px;
        }
      }
    }

    .not-scrollable {
      overflow: hidden;
    }

    // Controla el ancho de cada columna empezando por ref number
    .row1 {
      width: 5% !important;
    }

    .row2 {
      width: 14.5% !important;
    }

    .row3 {
      width: 14.5% !important;
    }

    .row4 {
      width: 23% !important;
    }

    .row5 {
      width: 12% !important;
    }

    .row6 {
      width: 12% !important;
    }

    // .row7{}
    .row8 {
      width: 6.5% !important;
    }

    .row9 {
      i {
        color: #d2deed;
      }
    }
  }
}

.Button__Action {
  height: 100%;
  width: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

@media (max-width: 600px) {
  .SubscriptionTable {
    overflow-y: auto;

    //TITULO DE LA TABLA
    .TableTitle {
      height: 30px;
      font-size: 17px;
    }

    //CONTROLES DE LA TABLA EN MOVILES
    .TableControlsCont {
      width: 65px;
      height: 30px;
      border: solid 1px black;
      border-radius: 5px;

      .ControlBtn {
        width: 45%;
        height: 100%;
      }
    }

    .TableContent {
      //CABEZA DE LA TABLE
      .TableHeadContent {
        width: 750px;
      }

      //CUERPO DE LA TABLA
      .TableBodyContent {
        width: 750px;
      }
    }

    //CARGAR MAS
    .LoadMoreContent {
      .loadMoreButton {
        width: 100%;
      }
    }
  }
}

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
