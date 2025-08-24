<template>
  <div @click.self="setModalCreateCompany()" v-if="showModal" class="Modal py-13 d-flex justify-center">
    <!--FORMULARIO-->
    <div class="Form px-6">
      <!--BOTON CERRAR-->
      <div @click="setModalCreateCompany()" class="CloseModalBtn">
        <v-btn class="closeBtn" icon>
          <img class="iconClose" src="@/assets/img/icons/close.png" />
        </v-btn>
      </div>

      <!--HEADER-->
      <div class="Header">New Company</div>

      <!--FORMULARIO-->
      <v-form class="Form d-flex justify-space-between">
        <div class="InputCont">
          <v-text-field
            v-model.trim="$v.addCompany.name.$model"
            @input="$v.addCompany.name.$touch()"
            @blur="$v.addCompany.name.$touch()"
            :error-messages="requiredInputVuelidateParent('name', 'addCompany')"
            placeholder="Name"
            label="Name"
            required
          ></v-text-field>
        </div>

        <div class="InputCont">
          <v-select
            v-model.trim="$v.addCompany.country.$model"
            @input="$v.addCompany.country.$touch()"
            @blur="$v.addCompany.country.$touch()"
            :error-messages="requiredInputVuelidateParent('country', 'addCompany')"
            placeholder="Country"
            label="Country"
            required
            :items="countries"
            item-text="description"
            item-value="id"
          >
          </v-select>
        </div>

        <div class="InputCont">
          <v-select
            v-model.trim="$v.addCompany.type.$model"
            @input="$v.addCompany.type.$touch()"
            @blur="$v.addCompany.type.$touch()"
            :error-messages="requiredInputVuelidateParent('type', 'addCompany')"
            placeholder="Type"
            label="Type"
            required
            :items="type"
            item-text="description"
            item-value="id"
          ></v-select>
        </div>

        <div class="InputCont">
          <v-text-field
            v-model.trim="$v.addCompany.address.$model"
            @input="$v.addCompany.address.$touch()"
            @blur="$v.addCompany.address.$touch()"
            :error-messages="requiredInputVuelidateParent('address', 'addCompany')"
            placeholder="Address"
            label="Address"
            required
          ></v-text-field>
        </div>

        <div class="InputCont">
          <v-text-field v-model.trim="$v.addCompany.phone.$model" @input="$v.addCompany.phone.$touch()" @blur="$v.addCompany.phone.$touch()" type="number" placeholder="Phone" label="Phone" required></v-text-field>
        </div>
      </v-form>

      <v-btn class="btn" rounded depressed @click="submitForm" :loading="loading"> Save Company </v-btn>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
/* vuelidate mixin & validations */
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";
import { validPhone, OnlyText, ValidChars } from "@/constants/validations";
/* project validations (in some cases depends on vuelidate) */
import { formValidations } from "@/mixins/formValidations";

export default {
  name: "AddCompanyModal",
  mixins: [formValidations, validationMixin],
  data() {
    return {
      loader: null,
      loading: false,
      type: [
        { id: 1, description: "type 1" },
        { id: 2, description: "type 2" },
        { id: 3, description: "type 3" },
      ],
    };
  },
  props: {
    showModal: Boolean,
  },
  computed: {
    ...mapGetters(["countries", "addCompany"]),
  },
  validations: {
    addCompany: {
      name: { required, OnlyText },
      type: { required },
      phone: { required },
      country: { required },
      address: { required, ValidChars },
    },
  },
  methods: {
    ...mapActions(["createCompany", "getCatalogByName"]),
    ...mapMutations(["setModalCreateCompany"]),
    submitForm() {
      this.$v.$touch(); // valida el formulario
      const errorExists = this.$v.addCompany.$invalid;
      if (this.$v.$invalid || errorExists) return;

      this.startLoad();

      const {
        name: { $model: name },
        type: { $model: type },
        phone: { $model: phone },
        address: { $model: address },
        country: { $model: country },
      } = this.$v.addCompany;

      // action && end loading
      this.createCompany({
        addCompany: {
          name,
          type,
          phone,
          address,
          country,
        },
      })
        .then(async () => {
          this.$v.$reset();

          await this.getCatalogByName({ name: "companies" });

          this.setModalCreateCompany(false);
        })
        .finally(() => {
          this.endLoad("loading");
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
<style lang="less" none>
.Modal {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 10000000;
  position: absolute;
  top: 0;
  left: 0;

  .Form {
    width: 90%;
    height: 350px;
    background: white;
    border-radius: 10px;
    position: relative;

    .Header {
      width: 100%;
      height: 50px;
      border-bottom: none;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      font-weight: 600;
      margin-bottom: 10px;
    }

    .Form {
      width: 100%;
      height: auto;
      position: relative;
      .InputCont {
        width: 19%;
      }
    }
    .btn {
      border-radius: 5px;
      width: 190px;
      height: 40px;
      position: absolute;
      right: 30px;
      margin-top: 35px;
      text-transform: none;
      background: var(--mainColor2);
      color: white;
      text-transform: none !important;
      font-style: normal !important;
      font-weight: 500 !important;
      letter-spacing: normal !important;
      i {
        padding-right: 0px;
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
</style>
