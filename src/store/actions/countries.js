/* api */
import { apolloClient } from "../../lib/api";
/* mutaciones */
import CREATE_COUNTRY_MUTATION from "./mutations/createCountry";
import DELETE_COUNTRY_ID from "./mutations/deleteCountry";
import UPDATE_COUNTRY from "./mutations/updateCountry";
/* queries */
import COUNTRIES_QUERY from "./queries/getCountries";
import GET_DATA_COUNTRY_BY_ID from "./queries/getDataCountryById";
import LIST_COUNTRIES_QUERY from "./queries/getCountriesList";
/* constantes */
import messages from "../../constants/messages";

export default {
  async createCountry({ commit, dispatch, state }, { countryInformation }) {
    try {
      commit("SAVE_COUNTRY_INFORMATION", countryInformation);
      const variables = { ...countryInformation };
      const { data } = await apolloClient.mutate({
        mutation: CREATE_COUNTRY_MUTATION,
        variables,
        fetchPolicy: "no-cache",
      });
      const {
        createCountry: { statusCode, response, message, error },
      } = data;
      if (statusCode !== 200) throw new Error(message);
      const notificationMessage = {
        type: messages.SUCCESS,
        text: "Country created!",
      };
      if (countryInformation.id !== 0)
        notificationMessage.text = "Country Updated!";
      commit("addNotification", notificationMessage);
      commit("RESET_COUNTRY_INFORMATION");
    } catch ({ message }) {
      const messageToDisplay =
        "createCountry error: " + message.replace("GraphQL error: ", "");
      commit("addNotification", {
        type: messages.DANGER,
        text: messageToDisplay,
      });
    }
  },

  async updateCountry({ commit, dispatch, state }, { countryId, countryInformation }) {
    try {
      console.log("updateCountry variables: ", countryInformation);
      const variables = { country: countryInformation };

      const { data } = await apolloClient.mutate({
        mutation: UPDATE_COUNTRY,
        variables,
        fetchPolicy: "no-cache",
      });
      const {
        updateCountry: { statusCode, response, message, error },
      } = data;
      if (statusCode !== 200) throw new Error(message);
      commit("addNotification", {
        type: messages.SUCCESS,
        text: "Country Updated!",
      });
      commit("RESET_COUNTRY_INFORMATION");
    } catch ({ message }) {
      const messageToDisplay = "updateCountry error: " + message.replace("GraphQL error: ", "");
      commit("addNotification", {
        type: messages.DANGER,
        text: messageToDisplay,
      });
    }
  },

  async getCountries({ commit }) {
    try {
      const config = { response: "getAllCountries" };
      const prefetch = await apolloClient.query({
        query: COUNTRIES_QUERY,
        fetchPolicy: "no-cache",
      });
      const data = prefetch["data"][config.response];
      const { statusCode, response, message, error } = data;
      if (statusCode !== 200) throw new Error(message || error);
      const parsedResponse = JSON.parse(response);
      commit("SET_AVAILABLE_COUNTRIES", {
        countries: Array.from(parsedResponse),
      });
    } catch ({ message }) {
      const messageToDisplay =
        "getCountries error: " + message.replace("GraphQL error: ", "");
      commit("addNotification", {
        type: messages.DANGER,
        text: messageToDisplay,
      });
    }
  },

  async resetCountryInformation({ commit }) {
    try {
      commit("RESET_COUNTRY_INFORMATION");
    } catch ({ message }) {
      const messageToDisplay =
        "resetCountryInformation error: " +
        message.replace("GraphQL error: ", "");
      commit("addNotification", {
        type: messages.DANGER,
        text: messageToDisplay,
      });
    }
  },

  async getCountryById({ commit }, countryId) {
    try {
      const variables = {
        countryId: parseFloat(countryId),
      };
      const { data } = await apolloClient.query({
        query: GET_DATA_COUNTRY_BY_ID,
        variables,
      });
      commit("SET_INFO_COUNTRY", { payload: data["getCountryDataById"] });
    } catch ({ message }) {
      const messageToDisplay =
        "getCountryById error: " + message.replace("GraphQL error: ", "");
      commit("addNotification", {
        type: messages.DANGER,
        text: messageToDisplay,
      });
    }
  },

  async getCountriesList({ commit }) {
    try {
      const { data } = await apolloClient.query({
        query: LIST_COUNTRIES_QUERY,
        fetchPolicy: "no-cache",
      });
      commit("SET_COUNTRY_LIST", { countries: data["getCountriesList"] });
    } catch ({ message }) {
      const messageToDisplay =
        "getCountriesList error: " + message.replace("GraphQL error: ", "");
      commit("addNotification", {
        type: messages.DANGER,
        text: messageToDisplay,
      });
    }
  },

  async deleteCountry({ commit }, info) {
    try {
      const variables = {
        countryId: parseFloat(info.id),
      };
      const { data } = await apolloClient.mutate({
        mutation: DELETE_COUNTRY_ID,
        variables,
      });
      commit("addNotification", {
        type: messages.SUCCESS,
        text: "Country deleted!",
      });
      commit("SET_COUNTRY_LIST", {
        countries: data["deleteCountry"]["response"],
      });
    } catch ({ message }) {
      const messageToDisplay =
        "deleteCountry error: " + message.replace("GraphQL error: ", "");
      commit("addNotification", {
        type: messages.DANGER,
        text: messageToDisplay,
      });
    }
  },
};
