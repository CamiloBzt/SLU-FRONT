const DEFAULT_DELAY = 5000;
import messages from "../../constants/messages";
import { apolloClient } from "../../lib/api";

import GET_ALL_ROLES from "./queries/getAllRoles";
import GET_ALL_PERMISSIONS from "./queries/getAllPermission";
import GET_ROLE_BY_ID from "./queries/getRoleById";
import MODIFIED_ROLE from "./mutations/modifiedRole";
import DELETE_ROLE from "./mutations/deleteRole";
import CREATE_ROLE from "./mutations/createRole";
export default {
  async getAllRoles({ commit, state }) {
    try {
      const { data } = await apolloClient.query({
        query: GET_ALL_ROLES,
        fetchPolicy: "no-cache",
      });
      commit("setRolesList", data["getAllRoles"]);
    } catch ({ message }) {
      console.log(message);
      const messageToDisplay = "getAllRoles error: " + message.replace("GraphQL error: ", "");
      commit("addNotification", {
        type: messages.DANGER,
        text: messageToDisplay,
      });
    }
  },
  async getAllPermissions({ commit, state }) {
    try {
      const { data } = await apolloClient.query({
        query: GET_ALL_PERMISSIONS,
        fetchPolicy: "no-cache",
      });
      commit("setPermissions", data["getGlobalViews"]);
    } catch ({ message }) {
      const messageToDisplay = "getAllPermissions error: " + message.replace("GraphQL error: ", "");
      commit("addNotification", {
        type: messages.DANGER,
        text: messageToDisplay,
      });
    }
  },
  async getRoleById({ state, commit }, roleId) {
    try {
      const variables = { roleId };
      const { data } = await apolloClient.query({
        query: GET_ROLE_BY_ID,
        variables,
      });
      commit("setRoleSelected", data["getRoleById"]);
    } catch ({ message }) {
      console.log(message);
      const messageToDisplay = "getRoleById error: " + message.replace("GraphQL error: ", "");
      commit("addNotification", {
        type: messages.DANGER,
        text: messageToDisplay,
      });
    }
  },
  async createInfoRole({ state, commit }) {
    try {
      const { id, role, description, views } = state.roles.item;
      const variables = {
        id: parseFloat(id),
        role,
        description,
        views,
      };
      const { data } = await apolloClient.mutate({
        mutation: CREATE_ROLE,
        variables,
        fetchPolicy: "no-cache",
      });
      commit("setRoleSelected", data["createRole"]);
      commit("addNotification", {
        type: messages.SUCCESS,
        text: "Role has been saved",
      });
    } catch ({ message }) {
      console.log(message);
      const messageToDisplay = "createInfoRole error: " + message.replace("GraphQL error: ", "");
      commit("addNotification", {
        type: messages.DANGER,
        text: messageToDisplay,
      });
    }
  },
  async saveInfoRole({ state, commit }, { roleId, viewId, type, value }) {
    try {
      if (parseFloat(roleId) === 0) roleId = state.roles.item.id;

      const variables = {
        roleId: roleId,
        viewId,
        type,
        value,
      };
      if (parseFloat(roleId) === 0 || !roleId) {
        commit("setRoleViews", {
          viewId,
          type,
          value,
        });
        return;
      }
      const { data } = await apolloClient.mutate({
        mutation: MODIFIED_ROLE,
        variables,
        fetchPolicy: "no-cache",
      });
      commit("addNotification", {
        type: messages.SUCCESS,
        text: "Permission has been assigned",
      });
      // commit('setRoleSelected', data["modifiedRole"] )
    } catch ({ message }) {
      console.log(message);
      const messageToDisplay = "saveInfoRole error: " + message.replace("GraphQL error: ", "");
      commit("addNotification", {
        type: messages.DANGER,
        text: messageToDisplay,
      });
    }
  },

  async deleteRole({ state, commit }, { id }) {
    try {
      const variables = {
        roleId: parseFloat(id),
      };
      const { data } = await apolloClient.mutate({
        mutation: DELETE_ROLE,
        variables,
        fetchPolicy: "no-cache",
      });
      commit("setRolesList", data["deleteRole"]);
      commit("addNotification", {
        type: messages.SUCCESS,
        text: "Role has been deleted",
      });
    } catch ({ message }) {
      console.log(message);
      const messageToDisplay = "deleteRole error: " + message.replace("GraphQL error: ", "");
      commit("addNotification", {
        type: messages.DANGER,
        text: messageToDisplay,
      });
    }
  },
};
