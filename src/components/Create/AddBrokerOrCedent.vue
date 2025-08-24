<template>
  <div @click.self="setModalCreateBrokerOrCedent()" v-if="displayModal" class="Modal py-13 d-flex justify-center">
    <!--FORMULARIO-->
    <div class="Modal__Form">
      <!--BOTON CERRAR-->
      <div @click="setModalCreateBrokerOrCedent()" class="CloseModalBtn">
        <v-btn class="closeBtn" icon>
          <img class="iconClose" src="@/assets/img/icons/close.png" />
        </v-btn>
      </div>

      <!--Titulo-->
      <div class="Modal__Form__Title">Add New Contact</div>

      <!-- Tipo de nuevo contacto-->
      <v-tabs class="Modal__Form__Header" v-model="tab">
        <v-tab class="Tab" v-if="selectedBroker"> New Contact for {{ selectedBroker.name }} </v-tab>
        <v-tab class="Tab" v-if="selectedCedent"> New Contact for {{ selectedCedent.name }} </v-tab>
      </v-tabs>

      <!-- Inputs  -->
      <v-tabs-items class="Modal__Form__Body" v-model="tab">
        <v-tab-item class="TabContent" v-if="selectedBroker">
          <div class="FormContainer d-flex flex-wrap">
            <!-- <Contacts :fromModal="true" option="1" id="1" /> -->
            <div class="InputCont">
              <v-text-field v-model.trim="$v.contact.name.$model" autocomplete="new-password" @input="$v.contact.name.$touch()" @blur="$v.contact.name.$touch()" required :error-messages="requiredInputVuelidateParent('name', 'contact')" label="Names">
              </v-text-field>
            </div>
            <div class="InputCont">
              <v-text-field v-model.trim="$v.contact.email.$model" @input="$v.contact.email.$touch()" @blur="$v.contact.email.$touch()" required :error-messages="requiredEmailVuelidateParent('email', 'contact')" label="E-mail"> </v-text-field>
            </div>
            <div class="InputCont">
              <v-text-field v-model.trim="$v.contact.phone.$model" @input="$v.contact.phone.$touch()" @blur="$v.contact.phone.$touch()" required :error-messages="requiredInputVuelidateParent('phone', 'contact')" label="Cell Phone Number">
              </v-text-field>
            </div>
            <div class="InputCont">
              <v-text-field
                v-model.trim="$v.contact.address.$model"
                autocomplete="new-password"
                @input="$v.contact.address.$touch()"
                @blur="$v.contact.address.$touch()"
                required
                :error-messages="requiredInputVuelidateParent('address', 'contact')"
                label="Address"
              >
              </v-text-field>
            </div>
            <div class="finishButtonCont d-flex align-center">
              <v-btn class="Button" color="#003D6D" rounded large depressed :loading="loading" @click="submitForm(0)"> Create Contact </v-btn>
            </div>
          </div>
        </v-tab-item>

        <v-tab-item class="TabContent" v-if="selectedCedent">
          <div class="FormContainer d-flex flex-wrap">
            <!-- <Contacts :fromModal="true" option="1" id="1" /> -->
            <div class="InputCont">
              <v-text-field v-model.trim="$v.contact.name.$model" autocomplete="new-password" @input="$v.contact.name.$touch()" @blur="$v.contact.name.$touch()" required :error-messages="requiredInputVuelidateParent('name', 'contact')" label="Names">
              </v-text-field>
            </div>
            <div class="InputCont">
              <v-text-field v-model.trim="$v.contact.email.$model" @input="$v.contact.email.$touch()" @blur="$v.contact.email.$touch()" required :error-messages="requiredEmailVuelidateParent('email', 'contact')" label="E-mail"> </v-text-field>
            </div>
            <div class="InputCont">
              <v-text-field v-model.trim="$v.contact.phone.$model" @input="$v.contact.phone.$touch()" @blur="$v.contact.phone.$touch()" required :error-messages="requiredInputVuelidateParent('phone', 'contact')" label="Cell Phone Number">
              </v-text-field>
            </div>
            <div class="InputCont">
              <v-text-field
                v-model.trim="$v.contact.address.$model"
                autocomplete="new-password"
                @input="$v.contact.address.$touch()"
                @blur="$v.contact.address.$touch()"
                required
                :error-messages="requiredInputVuelidateParent('address', 'contact')"
                label="Address"
              >
              </v-text-field>
            </div>
            <div class="finishButtonCont d-flex align-center">
              <v-btn class="Button" rounded large depressed :loading="loading" color="#003D6D" @click="submitForm(1)"> Create Contact </v-btn>
            </div>
          </div>
        </v-tab-item>
      </v-tabs-items>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
/* vuelidate mixin & validations */
import { validationMixin } from "vuelidate";
import { required, email } from "vuelidate/lib/validators";
import { validPhone, OnlyText, ValidChars } from "@/constants/validations";
/* project validations (in some cases depends on vuelidate) */
import { formValidations } from "@/mixins/formValidations";
/* components */
import BrokerInformation from "@/components/Create/BrokerInformation.vue";
import CedentInformation from "@/components/Create/CedentInformation.vue";
import Contacts from "@/components/Contacts.vue";

export default {
  name: "AddCompanyModal",
  mixins: [formValidations, validationMixin],
  components: { BrokerInformation, CedentInformation, Contacts },
  data() {
    return {
      loader: null,
      loading: false,
      loadingCountries: false,
      loadingCompanies: false,
      viewName: "Broker",
      brokerName: "Dan B",
      cedentName: "Dan C",
      tab: null,
      type: [
        { id: 1, description: "type 1" },
        { id: 2, description: "type 2" },
        { id: 3, description: "type 3" },
      ],
      contact: {
        name: "",
        address: "",
        phone: "",
        email: "",
      },
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

    await Promise.all([this.getCatalogByName({ name: "countries" }), this.getCatalogByName({ name: "companies" })]);

    this[lcom] = false;
    this[lcou] = false;
  },
  props: {
    displayModal: Boolean,
  },
  computed: {
    ...mapGetters(["countries", "companies", "brokerInformation", "cedentData", "accountInformation", "availableBrokers", "availableCedents"]),
    selectedBroker: {
      get() {
        const id = this.accountInformation.broker;
        const broker = Array.from(this.availableBrokers).find((v) => v.id == id);
        return broker;
      },
    },
    selectedCedent: {
      get() {
        const id = this.accountInformation.cedent;
        const cedent = Array.from(this.availableCedents).find((v) => v.id == id);
        return cedent;
      },
    },
  },
  validations: {
    contact: {
      name: { required, OnlyText },
      email: { required, email },
      phone: { required, validPhone },
      address: { required, ValidChars },
    },
  },
  methods: {
    ...mapActions(["resetBrokerInformation", "resetCedentData", "getCatalogByName", "createBroker", "createCedent", "deleteContact", "createContact"]),
    ...mapMutations(["setModalCreateBrokerOrCedent"]),
    submitForm(index) {
      const settings = [
        {
          type: "1",
          id: this.selectedBroker && this.selectedBroker.id ? this.selectedBroker.id : null,
        },
        {
          type: "2",
          id: this.selectedCedent && this.selectedCedent.id ? this.selectedCedent.id : null,
        },
      ];

      this.$v.contact.$touch(); // valida el formulario

      const errorExists = this.$v.contact.$invalid;
      if (errorExists) return;

      const {
        name: { $model: name },
      } = this.$v.contact;
      const {
        email: { $model: email },
      } = this.$v.contact;
      const {
        phone: { $model: phone },
      } = this.$v.contact;
      const {
        address: { $model: address },
      } = this.$v.contact;

      this.loading = true;

      this.createContact({
        brokerOrCedentId: String(settings[index].id),
        type: settings[index].type,
        name,
        email,
        phone,
        address,
      })
        .then(() => {
          this.contact = {
            name: "",
            address: "",
            phone: "",
            email: "",
          };
          this.$v.$reset();
        })
        .finally(() => {
          this.setModalCreateBrokerOrCedent();
          this.loading = false;
        });
    },
    startLoad() {
      this.loader = "loading";
      const l = this.loader;
      this[l] = !this[l];
    },
    endLoad(l) {
      this[l] = false;
      this.loader = null;
    },
  },
};
</script>
<style lang="less" scoped>
.Modal {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 10000000;
  position: absolute;
  top: 0;
  left: 0;

  &__Form {
    width: 90%;
    height: 350px;
    background: white;
    border-radius: 10px;
    position: relative;
    padding: 15px 16px;

    //Titulo
    &__Title {
      width: 100%;
      height: 35px;
      padding: 0 16px;
      display: flex;
      justify-content: flex-start;
      font-weight: 600;
      font-size: 20px;
    }
    //Elegir el tipo de contacto
    &__Header {
      width: 100%;
      height: 50px;
      .Tab {
        text-align: left;
        text-transform: none;
        font-weight: normal;
        font-weight: 500;
        max-width: 450px;
        font-size: 16px;
        letter-spacing: normal;
        text-transform: capitalize;
        position: relative;
      }
      .v-tab--active {
        color: black !important;
        font-weight: 600;
        &::after {
          content: "";
          width: 20px;
          height: 2px;
          background: #547fa9;
          position: absolute;
          left: 16px;
          bottom: 5px;
        }
      }
    }

    //Inputs
    &__Body {
      width: 100%;
      height: calc(100% - 85px);
      padding: 0 16px;
      .TabContent {
        padding-top: 15px;

        .FormContainer {
          width: 100%;
          height: auto;
          align-content: flex-start;
          align-items: flex-start;

          //Inputs
          .InputCont {
            width: 20%;
          }

          //Boton crear contacto
          .finishButtonCont {
            width: 100%;
            height: auto;
            margin-top: 10px;
            .Button {
              border-radius: 5px;
              width: 200px;
              height: 40px;
              color: white;
              text-transform: none;
              font-weight: normal;
            }
          }
        }
      }
    }

    //CERRAR MODAL
    .CloseModalBtn {
      width: auto;
      height: auto;
      position: absolute;
      right: -15px;
      top: -15px;
      z-index: 1000;
      border-radius: 25px;
      cursor: pointer;

      .closeBtn {
        width: 30px !important;
        height: 30px !important;
        .iconClose {
          width: 34px;
          height: 34px;
        }
      }
    }
  }
}

//Quita el border-bottom de los tabs
::v-deep .v-tabs-slider-wrapper {
  display: none;
}
.theme--light.v-tabs > .v-tabs-bar .v-tab:not(.v-tab--active) {
  color: #547fa9;
}
</style>
