/* api */
import { apolloClient } from "../../lib/api";
/* mutaciones */
import CREATE_CURRENCY_MUTATION from "./mutations/createCurrency";
import DELETE_CURRENCY_ID from "./mutations/deleteCurrency";
/* queries */
import CURRENCIES_QUERY from "./queries/getCurrencies";
import GET_DATA_CURRENCY_BY_ID from "./queries/getDataCurrencyById";
import LIST_CURRENCIES_QUERY from "./queries/getCurrenciesList";
/* constantes */
import messages from "../../constants/messages";

export default {
  async createCurrency({ commit, dispatch, state }, { currencyInformation }) {
    try {
      commit("SAVE_CURRENCY_INFORMATION", currencyInformation);
      const variables = { ...currencyInformation };
      const { data } = await apolloClient.mutate({
        mutation: CREATE_CURRENCY_MUTATION,
        variables,
        fetchPolicy: "no-cache",
      });
      const {
        createCurrency: { statusCode, response, message, error },
      } = data;
      if (statusCode !== 200) throw new Error(message);
      const notificationMessage = {
        type: messages.SUCCESS,
        text: "Currency created!",
      };
      if (currencyInformation.id !== 0)
        notificationMessage.text = "Currency Updated!";
      commit("addNotification", notificationMessage);
      commit("RESET_CURRENCY_INFORMATION");
    } catch ({ message }) {
      const messageToDisplay =
        "createCurrency error: " + message.replace("GraphQL error: ", "");
      commit("addNotification", {
        type: messages.DANGER,
        text: messageToDisplay,
      });
    }
  },

  async getCurrencies({ commit }) {
    try {
      const config = { response: "getAllCurrencies" };
      const prefetch = await apolloClient.query({
        query: CURRENCIES_QUERY,
        fetchPolicy: "no-cache",
      });
      const data = prefetch["data"][config.response];
      const { statusCode, response, message, error } = data;
      if (statusCode !== 200) throw new Error(message || error);
      const parsedResponse = JSON.parse(response);
      commit("SET_AVAILABLE_CURRENCIES", {
        currencies: Array.from(parsedResponse),
      });
    } catch ({ message }) {
      const messageToDisplay =
        "getCurrencies error: " + message.replace("GraphQL error: ", "");
      commit("addNotification", {
        type: messages.DANGER,
        text: messageToDisplay,
      });
    }
  },

  async resetCurrencyInformation({ commit }) {
    try {
      commit("RESET_CURRENCY_INFORMATION");
    } catch ({ message }) {
      const messageToDisplay =
        "resetCurrencyInformation error: " +
        message.replace("GraphQL error: ", "");
      commit("addNotification", {
        type: messages.DANGER,
        text: messageToDisplay,
      });
    }
  },

  async getCurrencyById({ commit }, currencyId) {
    try {
      const variables = {
        currencyId: parseFloat(currencyId),
      };
      const { data } = await apolloClient.query({
        query: GET_DATA_CURRENCY_BY_ID,
        variables,
      });
      commit("SET_INFO_CURRENCY", { payload: data["getCurrencyDataById"] });
    } catch ({ message }) {
      const messageToDisplay =
        "getCurrencyById error: " + message.replace("GraphQL error: ", "");
      commit("addNotification", {
        type: messages.DANGER,
        text: messageToDisplay,
      });
    }
  },

  async getCurrenciesList({ commit }) {
    try {
      const { data } = await apolloClient.query({
        query: LIST_CURRENCIES_QUERY,
        fetchPolicy: "no-cache",
      });
      commit("SET_CURRENCY_LIST", { currencies: data["getCurrenciesList"] });
    } catch ({ message }) {
      const messageToDisplay =
        "getCurrenciesList error: " + message.replace("GraphQL error: ", "");
      commit("addNotification", {
        type: messages.DANGER,
        text: messageToDisplay,
      });
    }
  },

  async deleteCurrency({ commit }, info) {
    try {
      const variables = {
        currencyId: parseFloat(info.id),
      };
      const { data } = await apolloClient.mutate({
        mutation: DELETE_CURRENCY_ID,
        variables,
      });
      commit("addNotification", {
        type: messages.SUCCESS,
        text: "Currency deleted!",
      });
      commit("SET_CURRENCY_LIST", {
        currencies: data["deleteCurrency"]["response"],
      });
    } catch ({ message }) {
      const messageToDisplay =
        "deleteCurrency error: " + message.replace("GraphQL error: ", "");
      commit("addNotification", {
        type: messages.DANGER,
        text: messageToDisplay,
      });
    }
  },
};
