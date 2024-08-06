/* api */
import { apolloClient } from "../../lib/api";

/* mutaciones */
import CREATE_BROKER_MUTATION from "./mutations/createBroker";
import CREATE_CEDENT_MUTATION from "./mutations/createCedent";
import DELETE_BROKER_ID from "./mutations/deleteBroker";
import DELETE_CEDENT_ID from "./mutations/deleteCedent";
// import CREATE_CEDENT_MUTATION from "./mutations/createCedent"

/* queries */
import BROKERS_CEDENTS_QUERY from "./queries/getAllBrokersCedents";
import BROKERS_QUERY from "./queries/getBrokers";
import GET_DATA_BROKER_BY_ID from "./queries/getDataBrokerById";
import GET_DATA_CEDENT_BY_ID from "./queries/getDataCedentById";
import LIST_BROKERS_QUERY from "./queries/getBrokersList";
import LIST_CEDENT_QUERY from "./queries/getCedentsList";
import CEDENTS_QUERY from "./queries/getCedents";

/* constantes */
import messages from "../../constants/messages";

export default {
  /* (context) destructured */
  async getInfoUsers({ commit, dispatch }) {
    try {
      const { data } = await apolloClient.query({
        query: getUsersList,
        fetchPolicy: "no-cache",
      });
      commit("setUsersList", { users: data["getUsersList"] });
    } catch ({ message }) {
      const messageToDisplay =
        "getInfoUsers error: " + message.replace("GraphQL error: ", "");
      commit("addNotification", {
        type: messages.DANGER,
        text: messageToDisplay,
      });
    }
  },
  async createBroker({ commit, dispatch, state }, { brokerInformation }) {
    try {
      commit("SAVE_BROKER_INFORMATION", brokerInformation);
      const variables = { ...brokerInformation };

      const { data } = await apolloClient.mutate({
        mutation: CREATE_BROKER_MUTATION,
        variables,
        fetchPolicy: "no-cache",
      });

      const {
        createBroker: { statusCode, response, message, error },
      } = data;

      if (statusCode !== 200) throw new Error(message);

      const notificationMessage = {
        type: messages.SUCCESS,
        text: "Broker created!",
      };

      if (brokerInformation.id !== 0)
        notificationMessage.text = "Broker Updated!";

      commit("addNotification", notificationMessage);
      commit("RESET_BROKER_INFORMATION");
    } catch ({ message }) {
      const messageToDisplay =
        "createBroker error: " + message.replace("GraphQL error: ", "");
      commit("addNotification", {
        type: messages.DANGER,
        text: messageToDisplay,
      });
    }
  },
  async createCedent({ commit, dispatch, state }, { cedentData }) {
    try {
      commit("SAVE_CEDENT_DATA", cedentData);
      const variables = { ...cedentData };

      const { data } = await apolloClient.mutate({
        mutation: CREATE_CEDENT_MUTATION,
        variables,
        fetchPolicy: "no-cache",
      });

      const {
        createCedent: { statusCode, response, message, error },
      } = data;

      if (statusCode !== 200) throw new Error(message);

      const notificationMessage = {
        type: messages.SUCCESS,
        text: "Cedent created!",
      };

      if (cedentData.id !== 0) notificationMessage.text = "Cedent Updated!";

      commit("addNotification", notificationMessage);
      commit("RESET_CEDENT_DATA");
    } catch ({ message }) {
      const messageToDisplay =
        "createCedent error: " + message.replace("GraphQL error: ", "");
      commit("addNotification", {
        type: messages.DANGER,
        text: messageToDisplay,
      });
    }
  },
  async getBrokers({ commit }) {
    try {
      const config = { response: "getAllBrokers" };
      const prefetch = await apolloClient.query({
        query: BROKERS_QUERY,
        fetchPolicy: "no-cache",
      });
      const data = prefetch["data"][config.response];

      const { statusCode, response, message, error } = data;
      if (statusCode !== 200) throw new Error(message || error);

      const parsedResponse = JSON.parse(response);
      commit("SET_AVAILABLE_BROKERS", { brokers: Array.from(parsedResponse) });
    } catch ({ message }) {
      const messageToDisplay =
        "getBrokers error: " + message.replace("GraphQL error: ", "");
      commit("addNotification", {
        type: messages.DANGER,
        text: messageToDisplay,
      });
    }
  },
  async getCedents({ commit }) {
    try {
      const config = { response: "getAllCedents" };
      const prefetch = await apolloClient.query({
        query: CEDENTS_QUERY,
        fetchPolicy: "no-cache",
      });
      const data = prefetch["data"][config.response];

      const { statusCode, response, message, error } = data;
      if (statusCode !== 200) throw new Error(message || error);

      const parsedResponse = JSON.parse(response);
      commit("SET_AVAILABLE_CEDENTS", { cedents: Array.from(parsedResponse) });
    } catch ({ message }) {
      const messageToDisplay =
        "getCedents error: " + message.replace("GraphQL error: ", "");
      commit("addNotification", {
        type: messages.DANGER,
        text: messageToDisplay,
      });
    }
  },
  async getBrokersAndCedents({ commit, dispatch }) {
    try {
      const {
        data: { getAllBrokersCedents },
      } = await apolloClient.query({
        query: BROKERS_CEDENTS_QUERY,
        fetchPolicy: "no-cache",
      });

      const { statusCode, response, message, error } = getAllBrokersCedents;

      if (statusCode !== 200) throw new Error(message);

      const brokerCedentData = JSON.parse(response);

      commit("SET_AVAILABLE_BROKERS", { brokers: brokerCedentData.brokers });
      commit("SET_AVAILABLE_CEDENTS", { cedents: brokerCedentData.cedents });
    } catch ({ message }) {
      const messageToDisplay =
        "getBrokersAndCedents error: " + message.replace("GraphQL error: ", "");
      commit("addNotification", {
        type: messages.DANGER,
        text: messageToDisplay,
      });
    }
  },
  async resetBrokerInformation({ commit }) {
    try {
      commit("RESET_BROKER_INFORMATION");
    } catch ({ message }) {
      const messageToDisplay =
        "resetBrokerInformation error: " +
        message.replace("GraphQL error: ", "");
      commit("addNotification", {
        type: messages.DANGER,
        text: messageToDisplay,
      });
    }
  },
  async resetCedentData({ commit }) {
    try {
      commit("RESET_CEDENT_DATA");
    } catch ({ message }) {
      const messageToDisplay =
        "resetCedentData error: " + message.replace("GraphQL error: ", "");
      commit("addNotification", {
        type: messages.DANGER,
        text: messageToDisplay,
      });
    }
  },
  async getBrokerId({ commit }, brokerId) {
    try {
      const variables = {
        brokerId: parseFloat(brokerId),
      };
      const { data } = await apolloClient.query({
        query: GET_DATA_BROKER_BY_ID,
        variables,
      });
      commit("SET_INFO_BROKER", { payload: data["getBrokerDataById"] });
    } catch ({ message }) {
      const messageToDisplay =
        "getBrokerId error: " + message.replace("GraphQL error: ", "");
      commit("addNotification", {
        type: messages.DANGER,
        text: messageToDisplay,
      });
    }
  },
  async getCedentId({ commit }, cedentId) {
    try {
      const variables = {
        cedentId: parseFloat(cedentId),
      };
      const { data } = await apolloClient.query({
        query: GET_DATA_CEDENT_BY_ID,
        variables,
      });
      commit("SET_INFO_CEDENT", { payload: data["getCedentDataById"] });
    } catch ({ message }) {
      const messageToDisplay =
        "getCedentId error: " + message.replace("GraphQL error: ", "");
      commit("addNotification", {
        type: messages.DANGER,
        text: messageToDisplay,
      });
    }
  },
  async getBrokersList({ commit }) {
    try {
      const { data } = await apolloClient.query({
        query: LIST_BROKERS_QUERY,
        fetchPolicy: "no-cache",
      });

      commit("setUsersList", { users: data["getBrokersList"] });
    } catch ({ message }) {
      const messageToDisplay =
        "getBrokersList error: " + message.replace("GraphQL error: ", "");
      commit("addNotification", {
        type: messages.DANGER,
        text: messageToDisplay,
      });
    }
  },
  async getCedentsList({ commit }) {
    try {
      const { data } = await apolloClient.query({
        query: LIST_CEDENT_QUERY,
        fetchPolicy: "no-cache",
      });
      commit("setUsersList", { users: data["getCedentsList"] });
    } catch ({ message }) {
      const messageToDisplay =
        "getCedentsList error: " + message.replace("GraphQL error: ", "");
      commit("addNotification", {
        type: messages.DANGER,
        text: messageToDisplay,
      });
    }
  },

  async deleteBroker({ commit }, info) {
    try {
      const variables = {
        brokerId: parseFloat(info.id),
      };
      const { data } = await apolloClient.mutate({
        mutation: DELETE_BROKER_ID,
        variables,
      });
      commit("addNotification", {
        type: messages.SUCCESS,
        text: "Broker delete!",
      });
      commit("setUsersList", { users: data["deleteBroker"]["response"] });
    } catch ({ message }) {
      const messageToDisplay =
        "deleteBroker error: " + message.replace("GraphQL error: ", "");
      commit("addNotification", {
        type: messages.DANGER,
        text: messageToDisplay,
      });
    }
  },
  async deleteCedent({ commit }, info) {
    try {
      const variables = {
        cedentId: parseFloat(info.id),
      };
      const { data } = await apolloClient.mutate({
        mutation: DELETE_CEDENT_ID,
        variables,
      });
      commit("addNotification", {
        type: messages.SUCCESS,
        text: "Cedent delete!",
      });
      commit("setUsersList", { users: data["deleteCedent"]["response"] });
    } catch ({ message }) {
      const messageToDisplay =
        "deleteCedent error: " + message.replace("GraphQL error: ", "");
      commit("addNotification", {
        type: messages.DANGER,
        text: messageToDisplay,
      });
    }
  },
};
