<template>
  <div>
    <div class="AppMain d-flex flex-wrap">
      <!--MENU LATERAL IZQUIERDO-->
      <div class="LateralMenuContent HideOnMovil">
        <MenuGeneral></MenuGeneral>
      </div>

      <AddCompanyModal :showModal="modalCreateCompany" />

      <!--CONTENEDOR GENERAL-->
      <div class="GeneralContent FullOnMovil pl-10 pr-10">
        <!--TITULO DE LA PÁGINA-->
        <!-- <TitlePage title="Subscription" /> -->

        <NavBar />
        <TypeCreate :viewTitle="title" />
        <router-view
          ref="createUserForm"
          v-on:startLoading="startLoad()"
          v-on:finishLoading="endLoad"
          @changeViewTitle="setViewTitle"
        ></router-view>

        <!--BOTON PARA FINALIZAR-->
        <div class="finishButtonCont mt-8 d-flex justify-end align-center">
          <v-btn
            rounded
            outlined
            large
            class="finishBtn"
            :loading="loading"
            @click="$refs.createUserForm.submitForm()"
          >
            Create {{ title }}
          </v-btn>
        </div>

        <!--ESPACIO EN BLANCO-->
        <WhiteSpace></WhiteSpace>
      </div>
    </div>
  </div>
</template>

<script>
import TitlePage from "@/components/TitlePage.vue";
import MenuGeneral from "@/components/Menu/MenuGeneral.vue";
import NavBar from "@/components/Create/NavBar.vue";
import TypeCreate from "@/components/Create/TypeCreate.vue";
import UserInformation from "@/components/Create/UserInformation.vue";
import AddCompanyModal from "@/components/Create/AddCompanyModal.vue";
import WhiteSpace from "@/components/WhiteSpace.vue";
import { mapGetters } from "vuex";

export default {
  name: "Home",
  data() {
    return {
      loader: null,
      loading: false,
      title: "Contact"
    };
  },
  components: {
    TitlePage,
    MenuGeneral,

    NavBar,
    AddCompanyModal,
    TypeCreate,
    UserInformation,

    WhiteSpace,
  },
  computed: {
    ...mapGetters(["modalCreateCompany"]),
  },
  watch: {
    modalCreateCompany(value, oldValue) {
      console.log(value, oldValue)
    }
  },
  methods: {
    startLoad() {
      this.loader = "loading";
      const l = this.loader;
      this[l] = !this[l];
    },
    endLoad(l) {
      this[l] = false;
      this.loader = null;
    },
    setViewTitle(name) {
      this.title = name;
    },
  },
};
</script>