/* api */
import { apolloClient } from "../../lib/api";
/* mutaciones */
import CREATE_LINE_OF_RISK_MUTATION from "./mutations/createLineOfRisk";
import DELETE_LINE_OF_RISK_ID from "./mutations/deleteLineOfRisk";
/* queries */
import LINE_OF_RISK_QUERY from "./queries/getLineOfRisk";
import GET_DATA_LINE_OF_RISK_BY_ID from "./queries/getDataLineOfRiskById";
import LIST_LINE_OF_RISK_QUERY from "./queries/getLineOfRiskList";
/* constantes */
import messages from "../../constants/messages";

export default {
  async createLineOfRisk(
    { commit, dispatch, state },
    { lineOfRiskInformation }
  ) {
    try {
      commit("SAVE_LINE_OF_RISK_INFORMATION", lineOfRiskInformation);
      const variables = { ...lineOfRiskInformation };
      const { data } = await apolloClient.mutate({
        mutation: CREATE_LINE_OF_RISK_MUTATION,
        variables,
        fetchPolicy: "no-cache",
      });
      const {
        createLineOfRisk: { statusCode, response, message, error },
      } = data;
      if (statusCode !== 200) throw new Error(message);
      const notificationMessage = {
        type: messages.SUCCESS,
        text: "Line of Business created!",
      };
      if (lineOfRiskInformation.id !== 0)
        notificationMessage.text = "Line of Business Updated!";
      commit("addNotification", notificationMessage);
      commit("RESET_LINE_OF_RISK_INFORMATION");
    } catch ({ message }) {
      const messageToDisplay =
        "createLineOfRisk error: " + message.replace("GraphQL error: ", "");
      commit("addNotification", {
        type: messages.DANGER,
        text: messageToDisplay,
      });
    }
  },

  async getLineOfRisk({ commit }) {
    try {
      const config = { response: "getAllLineOfRisk" };
      const prefetch = await apolloClient.query({
        query: LINE_OF_RISK_QUERY,
        fetchPolicy: "no-cache",
      });
      const data = prefetch["data"][config.response];
      const { statusCode, response, message, error } = data;
      if (statusCode !== 200) throw new Error(message || error);
      const parsedResponse = JSON.parse(response);
      commit("SET_AVAILABLE_LINE_OF_RISK", {
        lineOfRisk: Array.from(parsedResponse),
      });
    } catch ({ message }) {
      const messageToDisplay =
        "getLineOfRisk error: " + message.replace("GraphQL error: ", "");
      commit("addNotification", {
        type: messages.DANGER,
        text: messageToDisplay,
      });
    }
  },

  async resetLineOfRiskInformation({ commit }) {
    try {
      commit("RESET_LINE_OF_RISK_INFORMATION");
    } catch ({ message }) {
      const messageToDisplay =
        "resetLineOfRiskInformation error: " +
        message.replace("GraphQL error: ", "");
      commit("addNotification", {
        type: messages.DANGER,
        text: messageToDisplay,
      });
    }
  },

  async getLineOfRiskId({ commit }, lineOfRiskId) {
    try {
      const variables = {
        lineOfRiskId: parseFloat(lineOfRiskId),
      };
      const { data } = await apolloClient.query({
        query: GET_DATA_LINE_OF_RISK_BY_ID,
        variables,
      });
      commit("SET_INFO_LINE_OF_RISK", {
        payload: data["getLineOfRiskDataById"],
      });
    } catch ({ message }) {
      const messageToDisplay =
        "getLineOfRiskId error: " + message.replace("GraphQL error: ", "");
      commit("addNotification", {
        type: messages.DANGER,
        text: messageToDisplay,
      });
    }
  },

  async getLineOfRiskList({ commit }) {
    try {
      const { data } = await apolloClient.query({
        query: LIST_LINE_OF_RISK_QUERY,
        fetchPolicy: "no-cache",
      });
      commit("SET_LINE_OF_RISK_LIST", {
        lineOfRisk: data["getLineOfRiskList"],
      });
    } catch ({ message }) {
      const messageToDisplay =
        "getLineOfRiskList error: " + message.replace("GraphQL error: ", "");
      commit("addNotification", {
        type: messages.DANGER,
        text: messageToDisplay,
      });
    }
  },

  async deleteLineOfRisk({ commit }, info) {
    try {
      const variables = {
        lineOfRiskId: parseFloat(info.id),
      };
      const { data } = await apolloClient.mutate({
        mutation: DELETE_LINE_OF_RISK_ID,
        variables,
      });
      commit("addNotification", {
        type: messages.SUCCESS,
        text: "Line of Business deleted!",
      });
      commit("setUsersList", {
        users: data["deleteLineOfBusiness"]["response"],
      });
    } catch ({ message }) {
      const messageToDisplay =
        "deleteLineOfBusiness error: " + message.replace("GraphQL error: ", "");
      commit("addNotification", {
        type: messages.DANGER,
        text: messageToDisplay,
      });
    }
  },
};
