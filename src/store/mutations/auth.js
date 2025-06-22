import state from "../state";
import VueJwtDecode from "vue-jwt-decode";

function transformMenuToGroupsDynamic(menuItems) {
  // Primero, actualizar los datos para que tengan los mainMenuId correctos
  const updatedItems = menuItems.map((item) => {
    const updates = getItemGroupUpdate(item.id);
    return { ...item, ...updates };
  });

  // Agrupar por mainMenuId y title
  const grouped = updatedItems.reduce((acc, item) => {
    const groupKey = `${item.mainMenuId}-${item.title}`;

    if (!acc[groupKey]) {
      acc[groupKey] = {
        id: item.mainMenuId,
        name: item.title,
        icon: getGroupIcon(item.title),
        path: "",
        subMenu: false,
        subMenuArray: [],
      };
    }

    acc[groupKey].subMenuArray.push({
      id: item.id,
      name: item.name,
      path: item.path,
      icon: item.icon,
      read: item.read,
      write: item.write,
    });

    return acc;
  }, {});

  // Agregar items estáticos para las páginas que creamos
  addStaticMenuItems(grouped);

  // Determinar si cada grupo debe tener subMenu: true
  const result = Object.values(grouped).map((group) => {
    if (group.subMenuArray.length === 1) {
      // Si solo tiene un item, no usar submenú
      const singleItem = group.subMenuArray[0];
      return {
        ...group,
        path: singleItem.path,
        icon: singleItem.icon,
        subMenu: false,
        subMenuArray: [],
      };
    } else {
      // Si tiene múltiples items, usar submenú
      return {
        ...group,
        subMenu: true,
      };
    }
  });

  return result;
}

function addStaticMenuItems(grouped) {
  // Agregar Line of Risk al grupo Underwriting
  const underwritingKey = "2-Underwriting";

  if (grouped[underwritingKey]) {
    // Agregar Line of Risk
    grouped[underwritingKey].subMenuArray.push({
      id: 9001, // ID único para evitar conflictos
      name: "Line of Risk",
      path: "/line-of-risk/list",
      icon: "mdi-format-list-bulleted",
      read: true,
      write: true,
    });

    // Agregar Activities
    grouped[underwritingKey].subMenuArray.push({
      id: 9002, // ID único para evitar conflictos
      name: "Activities",
      path: "/activities/list",
      icon: "mdi-clipboard-list",
      read: true,
      write: true,
    });

    // Agregar Currencies
    grouped[underwritingKey].subMenuArray.push({
      id: 9003, // ID único para evitar conflictos
      name: "Currencies",
      path: "/currencies/list",
      icon: "mdi-currency-usd",
      read: true,
      write: true,
    });

    // Agregar Countries
    grouped[underwritingKey].subMenuArray.push({
      id: 9004, // ID único para evitar conflictos
      name: "Countries",
      path: "/countries/list",
      icon: "mdi-earth",
      read: true,
      write: true,
    });

    // Agregar Contacts
    grouped[underwritingKey].subMenuArray.push({
      id: 9005, // ID único para evitar conflictos
      name: "Contacts",
      path: "/contacts/list",
      icon: "mdi-account-multiple",
      read: true,
      write: true,
    });

    // Ordenar los items del submenú alfabéticamente para mejor organización
    grouped[underwritingKey].subMenuArray.sort((a, b) => {
      // Mantener el orden original de los items del backend primero
      const originalItems = [3, 12, 8]; // Accounts, Brokers, Cedents
      const aIsOriginal = originalItems.includes(a.id);
      const bIsOriginal = originalItems.includes(b.id);

      if (aIsOriginal && !bIsOriginal) return -1;
      if (!aIsOriginal && bIsOriginal) return 1;
      if (aIsOriginal && bIsOriginal) {
        return originalItems.indexOf(a.id) - originalItems.indexOf(b.id);
      }

      // Para los items estáticos, ordenar alfabéticamente
      return a.name.localeCompare(b.name);
    });
  }
}

function getItemGroupUpdate(itemId) {
  const updates = {
    2: { mainMenuId: 1, title: "User's Home" },
    3: { mainMenuId: 2, title: "Underwriting" },
    12: { mainMenuId: 2, title: "Underwriting" },
    8: { mainMenuId: 2, title: "Underwriting" },
    6: { mainMenuId: 3, title: "Facultative" },
    15: { mainMenuId: 3, title: "Facultative" },
    4: { mainMenuId: 4, title: "Claims" },
    5: { mainMenuId: 5, title: "Portfolio" },
    14: { mainMenuId: 5, title: "Portfolio" },
    13: { mainMenuId: 6, title: "SLU User" },
    9: { mainMenuId: 6, title: "SLU User" },
    10: { mainMenuId: 6, title: "SLU User" },
    7: { mainMenuId: 7, title: "Reports" },
  };

  return updates[itemId] || {};
}

function getGroupIcon(title) {
  const icons = {
    "User's Home": "mdi-home-outline",
    Underwriting: "mdi-briefcase-outline",
    Facultative: "mdi-checkbox-multiple-blank-outline",
    Claims: "mdi-alert-outline",
    Portfolio: "mdi-folder-outline",
    "SLU User": "mdi-account-outline",
    Reports: "mdi-pulse",
  };

  return icons[title] || "mdi-menu";
}

export default {
  LOGIN_USER(state, user) {
    state.auth.authStatus = true;
    state.auth.user = { ...user };
  },

  SET_TOKEN(state, token) {
    const user = VueJwtDecode.decode(token);

    state.auth.user = {
      ...state.auth.user,
      id: user.id,
      name: user.name,
      email: user.email,
      lastName: user.lastName,
      roleId: user.roleId,
      token,
    };
  },

  SET_ROLES(state, roles) {
    state.auth.user = { ...state.auth.user, roles: roles };
  },

  setMenuActions(state, body) {
    const transformedMenu = transformMenuToGroupsDynamic(body.menu);
    state.ui.menu = transformedMenu;
  },

  setUsersList(state, users) {
    state.auth.list = users.users;
  },
  setUserEdit(state, item) {
    state.auth.item = item;
  },
  setUserSignature(state, signature) {
    state.auth.userSignature = signature;
  },
  deleteUser(state, id) {
    let { list } = state.auth;
    state.auth.list = list.filter((x) => x.id !== id);
  },
  setActivationSuccess(state) {
    state.auth.activationOk = true;
  },

  setTokenOutlook(state, token) {
    if (token !== null && token !== "") {
      state.auth.isSingingSuccesOutlook = true;
    }
    state.auth.tokenOutlook = token;
  },

  LOGOUT_USER(state) {
    state.auth.authStatus = "";
    state.auth.tokenOutlook = "";
    state.auth.isSingingSuccesOutlook = false;
    localStorage.removeItem("tokenOutlook");
    state.auth.token = "" && localStorage.removeItem("sessionToken");
    localStorage.removeItem("roles");
  },
};
