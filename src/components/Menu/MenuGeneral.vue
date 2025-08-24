<template>
  <div>
    <confirmation-modal
      :showConfirmationModal="showConfirmationModal"
      :title="'Are you sure you want to log out?'"
      @closeConfirmationModal="closeConfirmationModal"
      @confirmAction="confirmLogOut"
    />
    <template>
      <v-navigation-drawer
        v-model="drawer"
        class="drawer"
        :class="{ 'drawer--mini': mini }"
        floating
        :mini-variant.sync="mini"
        :temporaly="temporary"
        :permanent="permanent"
        fixed
      >
        <v-list-item v-if="!isMobile" class="styletit">
          <v-list-item-avatar>
            <v-btn icon class="vicon styletit">
              <v-icon class="styletit">mdi-menu</v-icon>
            </v-btn>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title class="title styletit">SLU</v-list-item-title>
          </v-list-item-content>

          <v-btn icon @click="ToggleMenu">
            <v-icon class="styletit">mdi-chevron-left</v-icon>
          </v-btn>
        </v-list-item>

        <v-list class="List" dense>
          <div class="MiddleLinks">
            <!-- Render de cada ítem -->
            <!--div style="text-align: center">Menu Principal</div>-->
            <div v-for="item in items" :key="`item-${item.id}`">
              <!-- Ítem sin submenú -->
              <v-list-item
                v-if="!item.subMenu && item.path !== null"
                class="LinkMenu"
                :to="item.path"
                :class="{ 'v-list-item--active': isItemActive(item) }"
              >
                <v-list-item-icon>
                  <v-icon>{{ item.icon }}</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>{{ item.name }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>

              <!-- Ítem con submenú -->
              <v-list-group
                v-else-if="item.subMenu && item.name"
                class="LinkMenu"
                no-action
                append-icon=""
                :value="isGroupActive(item)"
                @click="toggleGroupExpansion(item.id)"
              >
                <template v-slot:activator>
                  <v-list-item
                    v-if="item.path !== null"
                    :class="[
                      {
                        'v-list-item--active': isItemActive(item),
                        'menu-parent-active': isItemActive(item),
                      },
                    ]"
                  >
                    <v-list-item-icon>
                      <v-icon class="iconos">{{ item.icon }}</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-title class="LinkName">{{
                        item.name
                      }}</v-list-item-title>
                    </v-list-item-content>
                    <v-icon
                      class="submenu-arrow"
                      :class="{ rotated: expandedGroups.includes(item.id) }"
                    >
                      mdi-chevron-down
                    </v-icon>
                  </v-list-item>
                </template>

                <v-list-item
                  v-for="sub in item.subMenuArray"
                  :key="`sub-${sub.id}`"
                  class="SubLink"
                  :to="sub.path"
                  exact
                >
                  <v-list-item-content>
                    <v-list-item-title>{{ sub.name }}</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list-group>
            </div>
            <!-- Botón cerrar sesión -->
            <v-list-item
              @click.native="closeConfirmationModal"
              class="LinkMenu"
            >
              <v-list-item-icon>
                <v-icon>mdi-exit-to-app</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>Close</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </div>
        </v-list>
      </v-navigation-drawer>
    </template>

    <!-- Menú móvil -->
    <div
      v-if="isMobile"
      class="MenuMovil d-flex justify-space-between align-items-center px-2"
    >
      <v-btn @click.stop="drawer = !drawer" icon>
        <v-icon>mdi-menu</v-icon>
      </v-btn>
      <div class="TitlePage">Accounts</div>
      <div class="ActionsButtons d-flex justify-space-between align-center">
        <Searcher />
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
      offset: true,
      io: undefined,
      expandedGroups: [],
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
      this.$router.push(url);
    },
    toggleGroupExpansion(itemId) {
      const index = this.expandedGroups.indexOf(itemId);
      if (index > -1) {
        this.expandedGroups.splice(index, 1);
      } else {
        this.expandedGroups.push(itemId);
      }
    },
    isItemActive(item) {
      if (!item.subMenu) {
        return this.$route.path === item.path;
      }
      return item.subMenuArray.some((subMenu) =>
        this.$route.path.includes(subMenu.path)
      );
    },
    isGroupActive(item) {
      const isActive = item.subMenuArray.some((subMenu) =>
        this.$route.path.includes(subMenu.path)
      );
      if (isActive && !this.expandedGroups.includes(item.id)) {
        this.expandedGroups.push(item.id);
      }
      return isActive;
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
.title {
  font-weight: 600;
}

.v-icon {
  transform: scale(1) !important;
  padding-top: 5px;
}

.drawer {
  box-shadow: 8px 8px 12px rgba(10, 63, 102, 0.15);
  z-index: 10000;
  min-width: 80px !important;
  padding-top: -1px;
  .List {
    height: calc(100% - 60px);
    margin-top: 10px;
    .MiddleLinks {
      height: auto;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      flex-wrap: wrap;
      gap: 0.5rem;
    }
  }
}

.List {
  max-width: 236px !important;
}

.LinkMenu {
  transition: background-color 0.2s ease;
  &:hover {
    background-color: rgba(0, 71, 109, 0.061);
    box-shadow: inset 0px 0px 0px 1px #78b0dd;
    border-radius: 10px !important;
    max-width: 236px;
  }
  .v-list-item__title {
    font-size: 0.875rem;
    font-weight: 500;
  }
}

.vicon {
  margin-left: 10px;
}

.MenuMovil {
  width: 100%;
  height: 60px;
  background: white;
  align-items: center;
  align-content: center;
  .TitlePage {
    width: calc(95% - 120px);
    height: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    font-weight: 600;
    font-size: 23px;
  }
  .ActionsButtons {
    width: 80px;
    height: 100%;
  }
}

/* Alinea los activadores del v-list-group igual que los list-items normales */
::v-deep .v-list-group__header {
  padding-left: 0px !important;
  margin-left: 0px !important;
}

::v-deep .v-list-group__header .v-list-item__icon {
  margin-left: 0 !important;
  min-width: 32px;
  justify-content: center;
}

/* Elimina indentación izquierda adicional que aplica Vuetify por defecto */
::v-deep .v-list-group {
  margin-left: 0 !important;
  padding-left: 0 !important;
}

.v-list-item {
  min-width: 236px !important;
  box-sizing: border-box;
}

/* Asegura que los íconos tengan espacio consistente */
.v-list-item__icon {
  min-width: 32px;
  justify-content: center;
}

/* Texto siempre con el mismo estilo */
.v-list-item__title {
  font-size: 0.875rem;
  font-weight: 500;
  white-space: nowrap;
}

/* Íconos alineados (incluye los de expansión si los usas) */
.v-icon {
  font-size: 20px;
  color: #444;
  transition: color 0.2s;
}

.submenu-arrow {
  transition: transform 0.3s ease;
  margin-left: auto;
  margin-right: 8px;
}

.rotated {
  transform: rotate(180deg);
}

.SubLink {
  height: 50px;
  transition: background-color 0.2s ease;
  color: #00aaff !important;
  font-weight: bold;
  border-radius: 10px !important;
  max-width: 236px;
  .v-list-item__title {
    transition: color 0.2s ease;
    color: #425568 !important;
  }
}

.menu-parent-active {
  background-color: rgba(206, 212, 215, 0.323) !important;
  font-weight: bold;
  border-radius: 10px !important;
  max-width: 236px;
}

.v-list-item--dense,
.v-list--dense .v-list-item {
  min-height: 50px;
}

* {
  color: #072c48 !important;
}

.v-application--is-ltr .v-list-item__avatar:first-child {
  margin-right: 5px;
}

.styletit {
  background-color: #003d6d;
  color: white !important;
  padding-top: 0px !important;
}

.v-list {
  padding: 0px 0 0 10px !important;
}

.v-list-item--link:before {
  border-radius: 10px !important;
}

.v-application--is-ltr
  .v-list-group--no-action
  > .v-list-group__items
  > .v-list-item {
  padding-left: 50px;
}

.v-application--is-ltr .v-list-item__action:first-child,
.v-application--is-ltr .v-list-item__icon:first-child {
  margin-right: 2px;
}

/* Personalización del scrollbar para un scroll más amigable */
::v-deep .v-navigation-drawer__content::-webkit-scrollbar {
  width: 6px;
}

::v-deep .v-navigation-drawer__content::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.05);
  border-radius: 10px;
}

::v-deep .v-navigation-drawer__content::-webkit-scrollbar-thumb {
  background: rgba(0, 61, 109, 0.3);
  border-radius: 10px;
  transition: background 0.2s ease;
}

::v-deep .v-navigation-drawer__content::-webkit-scrollbar-thumb:hover {
  background: rgba(0, 61, 109, 0.5);
}

/* Para Firefox */
.List {
  scrollbar-width: thin;
  scrollbar-color: rgba(0, 61, 109, 0.3) rgba(0, 0, 0, 0.05);
}

/* Control del scroll en el contenido del navigation drawer */
::v-deep .v-navigation-drawer__content {
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
}

/* Cuando el menú está colapsado (mini), ajustar el ancho de los elementos */
.drawer--mini {
  .LinkMenu {
    max-width: 4rem !important;

    &:hover {
      background-color: rgba(0, 71, 109, 0.061);
      box-shadow: inset 0px 0px 0px 1px #78b0dd;
      border-radius: 10px !important;
      max-width: 4rem !important;
    }
  }

  .v-list-item--active {
    max-width: 4rem !important;
    background-color: rgba(206, 212, 215, 0.323) !important;
    border-radius: 10px !important;
  }

  .menu-parent-active {
    max-width: 4rem !important;
    background-color: rgba(206, 212, 215, 0.323) !important;
    border-radius: 10px !important;
  }

  .SubLink {
    max-width: 4rem !important;

    &:hover {
      max-width: 4rem !important;
    }
  }

  .v-list {
    .v-list-item {
      max-width: 4rem !important;
      min-width: 4rem !important;
    }
  }
}

/* Cuando el menú está colapsado, ocultar el scroll del contenido */
.drawer--mini ::v-deep .v-navigation-drawer__content {
  overflow: hidden !important;
}

.vicon.styletit.v-btn {
  &:hover {
    background-color: transparent !important;
    box-shadow: none !important;
  }

  &:before {
    background-color: transparent !important;
    opacity: 0 !important;
  }

  /* Asegurar que el ícono mantenga su estilo */
  .v-icon.styletit {
    transition: color 0.2s ease, transform 0.2s ease;

    &:hover {
      color: rgba(255, 255, 255, 0.8) !important;
      transform: scale(1.1);
    }
  }
}
::v-deep .theme--light.v-list-item--active::before,
::v-deep .theme--light.v-list-item--active:hover::before {
  display: none;
  content: none;
}
::v-deep .theme--light.v-list-item--active::after,
::v-deep .theme--light.v-list-item--active:hover::after {
  display: none;
  content: none;
}
::v-deep .theme--light.v-list-item::before,
::v-deep .theme--light.v-list-item:hover::before {
  display: none;
  content: none;
}
::v-deep .theme--light.v-list-item::after,
::v-deep .theme--light.v-list-item:hover::after {
  display: none;
  content: none;
}
</style>
