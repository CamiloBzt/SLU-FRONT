<template>
  <v-expansion-panels class="ExpansionComponent ExpansionBordered mt-6 MarginTopMovil" v-model="userPanel">
    <v-expansion-panel>
      <!--TITULO DEL ACORDEON-->
      <v-expansion-panel-header @click="changeStateExpansive()" class="ExpansionTitle" expand-icon="">
        <b class="BoldTitle"> Role Information </b>

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
          <!--Inputs-->
          <div class="InputsCont d-flex flex-wrap justify-space-between">
            <div class="InputCont">
              <v-text-field
                :value="item.role"
                id="role"
                name="role"
                v-model.trim="$v.roleData.role.$model"
                @input="$v.roleData.role.$touch(), onEditRole({ key: 'role', value: $event })"
                @blur="$v.roleData.role.$touch()"
                autocomplete="new-password"
                required
                :error-messages="requiredInputVuelidateParent('role', 'roleData')"
                label="Role"
              >
              </v-text-field>
            </div>
            <div class="InputCont">
              <v-text-field
                v-model.trim="$v.roleData.description.$model"
                @input="$v.roleData.description.$touch(), onEditRole({ key: 'description', value: $event })"
                @blur="$v.roleData.description.$touch()"
                :value="item.description"
                autocomplete="new-password"
                required
                :error-messages="requiredInputVuelidateParent('description', 'roleData')"
                label="Description"
              >
              </v-text-field>
            </div>
          </div>

          <!--Permisos-->
          <div class="PermissionsCont d-flex flex-wrap justify-space-between">
            <!--Menu-->
            <div class="MenuPermissions d-flex flex-wrap justify-center">
              <div class="TitleArea d-flex justify-start align-center">Menu</div>
              <div class="TableContent">
                <base-table class="" :columns="columnsForView" :data="formattedViews" :loading="loading">
                  <div class="Small" slot="read" slot-scope="scope">
                    <!-- <div> -->
                    <input :id="`${scope.row.id}`" class="is-checkradio" :key="`${scope.row.id}.input`" type="checkbox" :name="`${scope.row.id}`" :checked="scope.row.read" @click="onUpdate($event, scope.row.id, 'read', scope.row.read)" />
                    <!-- <v-checkbox
                        color="#0069BA"
                        :id="`${scope.row.id}`"
                        :key="`${scope.row.id}.input`"
                        :checked="scope.row.read"
                        :name="`${scope.row.id}`"
                        @click="onUpdate($event, scope.row.id, 'read', scope.row.read)"
                      ></v-checkbox> -->
                    <!-- </div> -->
                  </div>
                  <div class="Small" slot="write" slot-scope="scope">
                    <div class="field">
                      <input :id="`${scope.row.id}`" class="is-checkradio" :key="`${scope.row.id}.input`" type="checkbox" :name="`${scope.row.id}`" :checked="scope.row.write" @click="onUpdate($event, scope.row.id, 'write', scope.row.write)" />
                      <label :for="`${scope.row.id}.write`" />
                    </div>
                  </div>
                </base-table>
              </div>
            </div>

            <!--Actions-->
            <div class="MenuActions d-flex flex-wrap justify-center">
              <div class="TitleArea d-flex justify-start align-center">Actions</div>
              <base-table :columns="columnsForAction" :data="formattedActions" :loading="loading">
                <div slot="read" slot-scope="scope">
                  <div class="field">
                    <input :id="`${scope.row.id}`" class="is-checkradio" :key="`${scope.row.id}.input`" type="checkbox" :name="`${scope.row.id}`" :checked="scope.row.read" @click="onUpdate($event, scope.row.id, 'read', scope.row.read)" />
                    <label :for="`${scope.row.id}`" />
                  </div>
                </div>
              </base-table>

              <!--Button-->
              <div class="ButtonCont d-flex justify-end align-center" s>
                <v-btn rounded large class="Btn btn-secondary" :loading="loading" depressed @click="cancel()" style="margin: 10px"> Cancel </v-btn>

                <v-btn rounded large class="Btn" :loading="loading" depressed @click="submitForm()" color="#003D6D"> Create Role </v-btn>
              </div>
            </div>
          </div>

          <div class="WhiteSpace HideOnMovil" />
        </div>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>
<script>
import { mapActions, mapGetters, mapState, mapMutations } from "vuex";
/* vuelidate mixin & validations */
import { validationMixin } from "vuelidate";
import { required, email } from "vuelidate/lib/validators";
import { validPhone, OnlyText, ValidChars } from "@/constants/validations";
/* project validations (in some cases depends on vuelidate) */
import { formValidations } from "@/mixins/formValidations";
import { stateExpansiveManager } from "@/mixins/subscription.js";
import isEmpty from "lodash/isEmpty";

export default {
  name: "CreateRole",
  mixins: [stateExpansiveManager, formValidations, validationMixin],
  components: {
    BaseTable: () => import("@/components/BaseTable"),
  },
  props: {
    roleId: {
      required: true,
    },
  },
  data() {
    const columnsForView = [
      {
        id: "view",
        header: "View",
        class: "Large",
      },
      {
        id: "read",
        name: "read",
        header: "Read",
        class: "Small",
      },
      {
        id: "write",
        name: "write",
        header: "Write",
        class: "Small",
      },
    ];
    const columnsForAction = [
      {
        id: "view",
        header: "Action",
        class: "width-column",
      },
      {
        id: "read",
        name: "read",
        header: "Permission",
      },
    ];
    return {
      loading: false,
      data: [],
      userPanel: 0,
      loadingCompanies: false,
      loadingCountries: false,
      columnsForView,
      columnsForAction,
      roleData: {
        role: "",
        description: "",
      },
    };
  },
  computed: {
    ...mapGetters(["countries", "companies"]),
    ...mapState({
      item: (state) => state.roles.item,
      isNew: (state) => state.roles.isNew,
      views: (state) => state.roles.views,
      actions: (state) => state.roles.actions,
    }),
    formattedViews() {
      if (!this.views) return [];
      const formattedViews = this.views.reduce((array, viewDetails) => {
        const viewOfUser = this.item.views ? this.item.views.find((x) => x.id === viewDetails.id) : {};
        const validateObjView = isEmpty(viewOfUser) ? this.defaultFormatterView(viewDetails) : this.defaultFormatterView(viewOfUser);
        array.push(validateObjView);
        return array;
      }, []);
      return formattedViews;
    },
    formattedActions() {
      const formattedActions = this.actions.reduce((array, actionDetails) => {
        const validateObjAction = this.defaultFormatterAction(actionDetails);
        array.push(validateObjAction);
        return array;
      }, []);
      return formattedActions;
    },
  },
  validations: {
    roleData: {
      role: { required, OnlyText },
      description: { required },
    },
  },
  methods: {
    ...mapActions(["getAllPermissions", "getRoleById", "saveInfoRole", "createInfoRole"]),
    ...mapMutations(["onEditRole", "setActionRole"]),
    defaultFormatterView({ id, idMenu, nameMenu, read, write, name }) {
      return {
        id: id,
        read,
        write,
        view: name,
        menu: "Menu",
      };
    },
    defaultFormatterAction({ id, idMenu, read, name }) {
      return {
        id: id,
        read,
        view: name,
        menu: "Acciones",
      };
    },
    async onUpdate(event, viewId, type, value) {
      this.saveInfoRole({ roleId: this.roleId, viewId, type, value: event.target.checked });
    },
    submitForm() {
      this.$v.roleData.$touch(); // valida el formulario
      const errorExists = this.$v.roleData.$invalid;
      if (errorExists) this.userPanel = 0;
      if (errorExists) return;
      this.loading = true;
      this.createInfoRole()
        .then(() => {
          this.loading = false;
        })
        .then(() => {
          this.roleData = this.item;
        });
    },
    cancel() {
      this.$router.push({ name: "list-roles" });
    },
  },
  beforeMount() {
    if (parseFloat(this.roleId) === 0) {
      this.setActionRole({ isNew: true });
      Promise.all([this.getAllPermissions()]);
    } else {
      Promise.all([this.getRoleById(this.roleId), this.getAllPermissions()]).then(() => {
        this.roleData = this.item;
      });
    }
  },
};
</script>
<style lang="less" scoped>
@import "~@/assets/style/AccordionStyle.less";
.BoldTitle {
  font-weight: 600;
  font-size: 20px;
}
//Primeros inputs
.InputsCont {
  width: 70%;
  height: auto;
  align-content: flex-start;
  align-items: flex-start;

  @media (max-width: 650px) {
    width: 100%;
  }

  .InputCont {
    width: 45%;

    @media (max-width: 650px) {
      width: 100%;
      height: 50px;
      margin-bottom: 10px;
    }
  }
}

//Permisos
.PermissionsCont {
  width: 70%;
  height: auto;
  align-content: flex-start;
  align-items: flex-start;

  @media (max-width: 650px) {
    width: 100%;
  }
  //Menu Area
  .MenuPermissions {
    width: 45%;
    height: auto;
    align-content: flex-start;
    align-items: flex-start;

    @media (max-width: 650px) {
      width: 100%;
    }
  }

  //Actions Area
  .MenuActions {
    width: 45%;
    height: auto;
    align-content: flex-start;
    align-items: flex-start;
    @media (max-width: 650px) {
      width: 100%;
    }

    //Boton
    .ButtonCont {
      margin-top: 15px;
      padding: 10px;
      width: 100%;
      height: auto;

      .Btn {
        border-radius: 5px;
        width: 50%;
        height: 40px;
        color: white;
        text-transform: none;
        letter-spacing: normal;
      }

      .btn-secondary {
        color: #547fa9;
      }
    }
  }

  //Nombres de las areas
  .TitleArea {
    width: 100%;
    height: 50px;
    font-weight: 600;
    font-size: 20px;
  }

  //Contenedor de las tablas
  .TableContent {
    width: 100%;
    height: auto;
  }
}

//Espacio en blanco
.WhiteSpace {
  width: 100%;
  height: 30px !important;
}
</style>
