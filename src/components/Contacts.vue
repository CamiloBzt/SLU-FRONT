<template>
  <v-expansion-panels class="ExpansionBordered mt-6 MarginTopMovil" v-model="userPanel">
    <v-expansion-panel>
      <!--TITULO DEL ACORDEON-->
      <v-expansion-panel-header @click="changeStateExpansive()" class="ExpansionTitle header" expand-icon="">
        Contacts

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
      <v-expansion-panel-content class="content">
        <div class="ExpandContent">
          <!--LINEA DIVISORIA-->
          <div class="ExpansionLineTop"></div>
          <div class="ExpansionInputContent mb-2">
            <v-text-field v-model.trim="$v.contact.name.$model" autocomplete="new-password" @input="$v.contact.name.$touch()" @blur="$v.contact.name.$touch()" required :error-messages="requiredInputVuelidateParent('name', 'contact')" label="Names">
            </v-text-field>
          </div>
          <div class="ExpansionInputContent mb-2">
            <v-text-field v-model.trim="$v.contact.email.$model" @input="$v.contact.email.$touch()" @blur="$v.contact.email.$touch()" required :error-messages="requiredEmailVuelidateParent('email', 'contact')" label="E-mail"> </v-text-field>
          </div>
          <div class="ExpansionInputContent mb-2">
            <v-text-field v-model.trim="$v.contact.phone.$model" @input="$v.contact.phone.$touch()" @blur="$v.contact.phone.$touch()" required :error-messages="requiredInputVuelidateParent('phone', 'contact')" label="Cell Phone Number">
            </v-text-field>
          </div>
          <div class="ExpansionInputContent mb-2">
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

          <!-- <div class="ExpansionInputContent HideOnMovil"></div> -->

          <!-- <div class="WhiteSpace HideOnMovil" /> -->

          <div class="finishButtonCont mt-1 mb-4 d-flex justify-end align-center">
            <v-btn rounded outlined large class="secondaryBtn" :loading="loading" @click="submitForm()"> Create Contact </v-btn>
          </div>
          <div v-if="list.length > 0" class="SubscriptionTable mt-1">
            <div class="TableContent">
              <!--CABEZA DE LA TABLA-->
              <div class="TableHeadContent mt-5 pl-7 d-flex justify-start align-start">
                <!--NOMBRES DE LAS COLUMNAS-->
                <div class="TableHeadName row2 d-flex justify-start align-center">Name</div>
                <div class="TableHeadName row4 d-flex justify-start align-center">Email</div>
                <div class="TableHeadName row5 d-flex justify-start align-center">Phone</div>
                <div class="TableHeadName row6 d-flex justify-start align-center">Address</div>
                <div class="TableHeadName row8" />
              </div>

              <!--CUERPO DE LA TABLA-->
              <div class="TableBodyContent pl-7 mt-4">
                <!--
              AQUI EMPIEZA EL CICLO A ITERAR
              PARA MOSTRAR LAS FILAS DE LA TABLA
            -->
                <div class="TableContentInner scrollable">
                  <div v-for="(item, i) in list" :key="i" class="TableBodyContSn d-flex justify-start align-start">
                    <!--INFORMACIÓN DE LA TABLA-->
                    <div class="TableBodyText d-flex row2 justify-start align-center">
                      {{ item.name != undefined ? item.name : "N/D" }}
                    </div>
                    <div class="TableBodyText d-flex row4 justify-start align-center">
                      {{ item.email != undefined ? item.email : "N/D" }}
                    </div>
                    <div class="TableBodyText d-flex row5 justify-start align-center">
                      {{ item.phone != undefined ? item.phone : "N/D" }}
                    </div>
                    <div class="TableBodyText d-flex row6 justify-start align-center">
                      {{ item.address != undefined ? item.address : "N/D" }}
                    </div>
                    <div class="TableBodyText d-flex row8 justify-start align-center">
                      <v-btn @click="deleteContact(item)" icon>
                        <v-icon> mdi-delete-outline </v-icon>
                      </v-btn>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>
<script>
import { mapActions, mapState } from "vuex";
/* vuelidate mixin & validations */
import { validationMixin } from "vuelidate";
import { required, email } from "vuelidate/lib/validators";
import { validPhone, OnlyText, ValidChars, OnlyDigits } from "@/constants/validations";
/* project validations (in some cases depends on vuelidate) */
import { formValidations } from "@/mixins/formValidations";
import { stateExpansiveManager } from "@/mixins/subscription.js";

export default {
  name: "ContactInformation",
  mixins: [stateExpansiveManager, formValidations, validationMixin],
  data() {
    return {
      loading: false,
      userPanel: 0,
      loadingCompanies: false,
      loadingCountries: false,
      contact: {
        name: "",
        address: "",
        phone: "",
        email: "",
      },
    };
  },
  props: {
    id: {
      type: String,
    },
    option: {
      type: String,
    },
  },
  computed: {
    ...mapState({
      list: (state) => state.contacts,
    }),
  },
  validations: {
    contact: {
      name: { required, OnlyText },
      email: { required, email },
      phone: { required, OnlyDigits },
      address: { required, ValidChars },
    },
  },
  methods: {
    ...mapActions(["deleteContact", "createContact"]),
    delete(item) {},
    submitForm() {
      this.$v.contact.$touch(); // valida el formulario
      const errorExists = this.$v.contact.$invalid;
      if (errorExists) this.userPanel = 0;
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
        brokerOrCedentId: this.id,
        type: this.option,
        name,
        email,
        phone,
        address,
      })
        .then((dato) => {
          this.contact = {};
          this.$v.contact.$reset();
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
  mounted() {
    document.querySelector(".content .v-expansion-panel-content__wrap").style.padding = "0px";
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
@WidthColTable: 12.5%; //ANCHO DE LAS COLUMNAS
@BorderTable: solid 1px black; //BORDES DE LAS TABLAS
//CONTENEDOR GENERAL DE LA TABLA
.SubscriptionTable {
  width: 100%;
  height: auto;

  //TITULO DE LA TABLA
  .TableTitle {
    width: 100%;
    height: 50px;
    .title {
      width: 250px;
      font-weight: 600;
      font-size: 1.5rem;
    }
  }

  //CONTENEDOR D ELA TABLA
  .TableContent {
    width: 100%;
    height: auto;
    overflow: auto;
    //CABEZA DE LA TABLA
    .TableHeadContent {
      width: 100%;
      height: 60px;
      border-radius: 100px;
      border: @BorderTable;

      //NOMBRES DE LAS TABLAS
      .TableHeadName {
        width: @WidthColTable;
        height: 100%;
        font-weight: bold;
      }
    }

    //CUERPO DE LA TABLA
    .TableBodyContent {
      width: 100%;
      height: 370px;
      //box-shadow: 8px 8px 12px rgba(10, 63, 102, 0.15);
      border-radius: 40px;
      border: @BorderTable;
      display: flex;
      justify-content: flex-start;
      align-items: flex-start;
      align-content: flex-start;
      flex-wrap: wrap;
      overflow-y: auto;

      //CONTENEDOR DE LAS FILAS DE LA TABLA
      .TableContentInner {
        width: 100%;
        height: 100%;
        overflow: auto;
        .TableBodyContSn {
          width: 100%;
          height: 50px;

          //INFORMACION DE LA TABLA
          .TableBodyText {
            width: @WidthColTable;
            height: 100%;
          }
          .TableBodyTextLink {
            width: @WidthColTable;
            height: 100%;
            font-weight: bold;
            cursor: pointer;
          }
        }
      }
    }

    /*
      Controla el ancho de cada columna empezando por ref number
    */
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
    /*
    .row7{
    }
    */
    .row8 {
      width: 6.5% !important;
    }
  }
}

.header {
  padding: 0px !important;
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
</style>
