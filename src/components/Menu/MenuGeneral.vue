<template>
  <div>
    <confirmation-modal
      :showConfirmationModal="showConfirmationModal"
      :title="'Are you sure you want to log out?'"
      @closeConfirmationModal="closeConfirmationModal"
      @confirmAction="confirmLogOut"
    />

    <v-navigation-drawer
      v-model="drawer"
      class="drawer"
      floating
      :mini-variant.sync="mini"
      :temporaly="temporary"
      :permanent="permanent"
      fixed
    >
      <v-list-item v-if="!isMobile">
        <v-list-item-avatar>
          <v-btn icon>
            <v-icon color="#003D6D"> mdi-menu </v-icon>
          </v-btn>
        </v-list-item-avatar>

        <v-list-item-title />

        <v-btn icon @click="ToggleMenu">
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
      </v-list-item>
      <v-list class="List" dense>
        <div class="MiddleLinks">
          <!--
            Importante
            Cuando se añadan las nuevas opciones cambiar :to="item.path" por
            :to="item.subMenu === false ? item.path : '' "
          -->
          <v-list-item
            class="LinkMenu"
            v-for="item in items"
            :key="item.id"
            :to="item.path"
          >
            <div class="LinkMenu__Link">
              <v-list-item-icon>
                <v-tooltip right :disabled="!mini" color="#003D6D">
                  <template v-slot:activator="{ on, attrs }">
                    <v-icon color="#003D6D" v-bind="attrs" v-on="on">
                      {{ item.icon }}
                    </v-icon>
                  </template>
                  <span class="white--text">{{ item.name }}</span>
                </v-tooltip>
              </v-list-item-icon>
            </div>

            <!--
              Evalua si  la opción del menu incluye submenus
            -->

            <!-- No tiene  submenus-->
            <v-list-item-content v-if="!item.subMenu">
              <v-list-item-title>
                {{ item.name }}
              </v-list-item-title>
            </v-list-item-content>

            <!--Si tiene submenus-->
            <v-list-group
              v-else
              :ripple="false"
              no-action
              class="GroupLinksCont"
              prepend-icon=""
            >
              <v-list-tile slot="activator">
                <v-list-tile-title class="LinkName">
                  {{ item.name }}
                </v-list-tile-title>
              </v-list-tile>

              <!--
                Itera los submenus
              -->
              <v-list-tile
                v-for="subMenu in item.subMenuArray"
                :key="subMenu.id"
                class="SubLink"
                @click="redirect(subMenu.path)"
              >
                <v-list-tile-title>
                  {{ subMenu.name }}
                </v-list-tile-title>
              </v-list-tile>
            </v-list-group>
          </v-list-item>

          <!--CERRAR SESIÓN-->
          <v-list-item @click.native="closeConfirmationModal" class="LinkMenu">
            <div class="LinkMenu__Link">
              <v-list-item-icon class="LinkIcon">
                <v-icon color="#003D6D"> mdi-exit-to-app </v-icon>
              </v-list-item-icon>
            </div>
            <v-list-item-content>
              <v-list-item-title> Close </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </div>
      </v-list>
    </v-navigation-drawer>

    <!--MENU MOVIL-->
    <div
      v-if="isMobile"
      class="MenuMovil d-flex justify-space-between align-items-center px-2"
    >
      <!--BOTON QUE ACTIVA EL MENU-->
      <v-btn @click.stop="drawer = !drawer" icon>
        <v-icon> mdi-menu </v-icon>
      </v-btn>

      <!--TITULO DE LA PÁGINA-->
      <div class="TitlePage">Accounts</div>
      <!--BUSQUEDA Y NOTIFICACIONES-->
      <div class="ActionsButtons d-flex justify-space-between align-center">
        <!--BUSCADOR-->
        <Searcher />
        <!--NOTIFICACIONES-->
        <Notifications />
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapState } from "vuex";
import Notifications from "./Notifications.vue";
import Searcher from "@/components/Filters/Searcher";
import ConfirmationModal from "@/components/ConfirmationModal";

export default {
  name: "MenuGeneral",
  components: {
    Notifications,
    Searcher,
    ConfirmationModal,
  },
  data() {
    return {
      drawer: false,
      mini: true,
      temporary: false,
      showConfirmationModal: false,
      offset: true, //Opciones de los sub menus
      io: undefined,

      /*
      Ejemplo del array menú con los nuevos atributos itemspara los
      submenus
      items:[
        //Ejemplo sin submenus
        {
          //...
          id:1,
          name:'Prueba 1',
          icon: 'mdi-magnify',
          path:'/subscription/bound',

          //Nuevos elementos
          subMenu:false,
          subMenuArray:[]
        },
        //Ejemplo con submenus
        {
          //...
          id:2,
          name:'Prueba 2',
          icon: 'mdi-magnify',

          //Nuevos elementos
          subMenu:true,
          subMenuArray:[
            {
              id:5,
              name:'SubMenu 1',//Nombre que se muestra
              path:'/dashboard'//Ruta a donde redirige
            },
            {
              id:6,
              name:'Prueba 2',//Nombre que se muestra
              path:'/subscription'//Ruta a donde redirige
            }
          ]
        } 
      ]
      /**/
    };
  },
  computed: {
    ...mapState({
      items: (state) => state.ui.menu,
      socket: (state) => state.socket.socketClient,
    }),
    menu() {},
    isMobile() {
      return window.innerWidth > 600 ? false : true;
    },
    permanent() {
      return window.innerWidth > 600 ? true : false;
    },
  },
  methods: {
    ...mapActions(["logOut", "socketCloseSession"]),
    showDropMenu() {
      this.ShowDropMenu = !this.ShowDropMenu;
    },
    ToggleMenu() {
      this.mini = !this.mini;
    },
    closeConfirmationModal() {
      this.showConfirmationModal = !this.showConfirmationModal;
    },
    confirmLogOut() {
      this.socketCloseSession();
      this.logOut();
    },

    redirect(url) {
      //Redirige los sub links
      this.$router.push(url);
    },
  },
  mounted() {
    if (this.isMobile) {
      this.drawer = false;
      this.mini = false;
      this.temporary = true;
    }
  },
};
</script>
<style lang="less" scoped>
.drawer {
  box-shadow: 4px 4px 6px rgba(10, 63, 102, 0.15);
  border-top-right-radius: 10px !important;
  border-bottom-right-radius: 10px !important;
  z-index: 1000;
  min-width: 70px !important;

  .List {
    height: calc(100% - 60px);
    .MiddleLinks {
      height: auto;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      flex-wrap: wrap;
    }
  }
}
.LinkMenu {
  min-height: 54px;
  cursor: pointer;
  .LinkMenu__Link {
    display: flex;
    justify-content: center;
    align-items: center;
    width: auto;
    margin-left: 5px !important;
  }

  //Contenedor de sub-links
  .GroupLinksCont {
    width: 100%;
    height: 100%;
    padding: 0;
    ::before {
      background: white !important;
    }
    ::v-deep .v-list-group__header {
      height: 100%;
      padding: 0 !important;
      height: 54px;
      position: relative;
      .v-list-item__icon {
        margin-left: 0px !important;
        position: absolute;
        right: 0;
      }
    }
    .LinkName {
      font-size: 0.8125rem;
      font-weight: 500;
    }

    //Estilos de los sub links
    ::v-deep .v-list-group__items {
      display: flex;
      justify-content: flex-start;
      align-items: flex-start;
      align-content: flex-start;
      flex-wrap: wrap;
    }
    .SubLink {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      align-content: center;
      width: 100%;
      height: 35px;
      font-size: 0.8125rem !important;
    }
  }
}
.MenuMovil {
  width: 100%;
  height: 60px;
  background: white;
  align-items: center;
  align-content: center;

  //TITULO DE LA PÁGINA
  .TitlePage {
    width: calc(95% - 120px);
    height: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    font-weight: 600;
    font-size: 23px;
  }
  //ICONOS
  .ActionsButtons {
    width: 80px;
    height: 100%;
  }
}
</style>
