/* api */
import { apolloClient } from "../../lib/api";

/* mutaciones */
import ADD_SUBSCRIPTION from "./mutations/addSubscription";
import ADD_SUBMISSION from "./mutations/addSubmission";
import UPDATE_SUBMISSION from "./mutations/updateSubmission";
import UPDATE_SUBSCRIPTION from "./mutations/updateSubscription";
import CREATE_CLOSE_REASON from "./mutations/createCloseReason";
import UPDATE_SUBSCRIPTION_STATUS from "./mutations/updateSubscriptionStatus";
import UPDATE_CHANGE_MUTATION from "./mutations/updateChange";
import UPDATE_CHANGE_JSON_MUTATION from "./mutations/updateJson";
import UPDATE_REFERENCE_SUBSCRIPTION_MUTATION from "./mutations/updateReferenceSubscription";
import setAnalysis from "./mutations/setAnalysisDto";

/* queries */
import catalogQuery from "./queries/getCatalog";
import subscriptionQuery from "./queries/getSubscription";
import subscriptionReportQuery from "./queries/getSubscriptionReport";
import getAllSubscriptionQuery from "./queries/getSubscriptionList";
import subscriptionExistsQuery from "./queries/subscriptionExists";
import FILTER_SUBSCRIPTION from "./queries/filterSubscription";
import SUBM_BY_SUBS_QUERY from "./queries/getSubmissionBySubscriptionId";
import getDocumentsSubscriptionRiskQuery from "./queries/getDocumentsSubscriptionRisk";
import GET_ANALYSIS_BY_ID from "./queries/getAnalysisByIdDto";
import GET_TOTAL_INSURABLE from "./queries/get-total-insurable-value-by-id.dto";
import GET_MAIN_LOCATION from "./queries/get-main-location-by-id.dto";

/* constantes */
import messages from "../../constants/messages";
import NEW_OR_RENEWAL_CONSTANT from "../../constants/newOrRenewal";

/* utils */
import { searchKeyInStorage, searchObjectInStorage, setItemInStorage, removeKeyFromStorage, toSnakeCase, keysToCamel } from "./utils";

/* vue imports */
import $router from "../../router";

export default {
  /* (context) destructured */
  async subscriptionSubmission({ commit, dispatch, state, getters }, { accountInformation, contactsInformation /* documentsInformation */ }) {
    try {
      // save data on store
      commit("saveAccountInformation", accountInformation);
      commit("saveContactsInformation", contactsInformation);
      // commit('saveDocumentsInformation', documentsInformation)
      const { name, country, activity, currency, typeOfRisk, insuredName, broker, cedent } = state.accountInformation;

      /* create or edit */
      const CREATE_OR_EDIT_CONFIG = {
        mutation: UPDATE_SUBMISSION,
        response: "updateSubmission",
      };

      if (!state.subscription_id || !!state.subscription_id === false) {
        CREATE_OR_EDIT_CONFIG.mutation = ADD_SUBMISSION;
        CREATE_OR_EDIT_CONFIG.response = "addSubmission";
        await dispatch("registerIdSubscription");
      }

      const variables = {
        insuredName,
        catalogTypeRiskId: typeOfRisk,
        name,
        catalogActivityId: activity,
        catalogCountryId: country,
        catalogCurrencyId: currency,
        broker: broker || null,
        cedent,
        contacts: state.contactsInformation || null,
        subscriptionId: state.subscription_id,
      };

      const { data } = await apolloClient.mutate({
        mutation: CREATE_OR_EDIT_CONFIG.mutation,
        variables,
        fetchPolicy: "no-cache",
      });

      /* create or update key - addSubmission | updateSubmission */
      const key = CREATE_OR_EDIT_CONFIG.response;
      const responseName = data[key];

      const { statusCode, response, message, error } = responseName;
      if (statusCode !== 200) throw new Error(`Account Information Save Error: ${message}, ${error}`);

      const parsedResponse = JSON.parse(response);

      if ("subscriptionId" in parsedResponse) {
        const { subscriptionId } = parsedResponse;
        commit("SET_SUBSCRIPTION_INFO", { subscription_id: subscriptionId });
        setItemInStorage("subscriptionData", "subscriptionId", subscriptionId);
      } else {
        const { subscription_id } = JSON.parse(response);
        commit("SET_SUBSCRIPTION_INFO", { subscription_id });
        setItemInStorage("subscriptionData", "subscriptionId", subscription_id);
      }

      commit("saveAccountInformation", {
        insuredName: parsedResponse.insured_name,
        name: parsedResponse.name,
        country: parsedResponse.catalog_country_id,
        typeOfRisk: parsedResponse.catalog_type_risk_id,
        activity: parsedResponse.catalog_activity_id,
        currency: parsedResponse.catalog_currency_id,
        broker: parsedResponse.broker,
        cedent: parsedResponse.cedent,
      });

      commit("saveContactsInformation", parsedResponse.contacts || []);

      await dispatch("newOrRenewal", { value: state.subscription_type });
    } catch ({ message }) {
      commit("RESET_ACCOUNT_INFORMATION");
      commit("RESET_CONTACTS_INFORMATION");
      const messageToDisplay = "subscriptionSubmission error: " + message.replace("GraphQL error: ", "");
      commit("addNotification", {
        type: messages.DANGER,
        text: messageToDisplay,
      });
    }
  },
  async updateSubscriptionStatus({ commit, state }, newStatus) {
    try {
      const variables = {
        subscriptionId: state.subscription_id,
        statusId: newStatus,
      };
      const { data } = await apolloClient.mutate({
        mutation: UPDATE_SUBSCRIPTION_STATUS,
        variables,
        fetchPolicy: "no-cache",
      });

      const { statusCode, response } = data.updateSubscriptionStatus;
      if (statusCode !== 200) throw new Error("Error updating Subscription status");

      const parsedResponse = JSON.parse(response);

      commit("SET_SUBSCRIPTION_STATUS", parsedResponse.status_id);
    } catch ({ message }) {
      const messageToDisplay = "updateSubscriptionStatus error: " + message.replace("GraphQL error: ", "");
      commit("addNotification", {
        type: messages.DANGER,
        text: messageToDisplay,
      });
    }
  },
  resetSubscriptionStatus({ commit }) {
    try {
      commit("RESET_SUBSCRIPTION_STATUS");
    } catch ({ message }) {
      const messageToDisplay = "resetSubscriptionStatus error: " + message.replace("GraphQL error: ", "");
      commit("addNotification", {
        type: messages.DANGER,
        text: messageToDisplay,
      });
    }
  },
  async getCatalogByName({ commit, dispatch }, { name }) {
    try {
      const {
        data: { getCatalog },
      } = await apolloClient.query({
        query: catalogQuery,
        variables: {
          name,
        },
        fetchPolicy: "no-cache",
      });
      const { statusCode, message, response } = getCatalog;
      if (statusCode != 200) throw new Error(`Failed fetching ${name} data: ${message}`);
      commit("setCatalogByName", { name, response });
    } catch ({ message }) {
      console.log(message);
      const messageToDisplay = "getCatalogByName error: " + message.replace("GraphQL error: ", "");
      commit("addNotification", {
        type: messages.DANGER,
        text: messageToDisplay,
      });
    }
  },
  async newOrRenewal({ commit, dispatch }, { value }) {
    try {
      const isValidForm = NEW_OR_RENEWAL_CONSTANT.some((item) => value == item);
      if (!isValidForm) throw new Error("Invalid Data on Type");
      commit("NEW_OR_RENEWAL", { value });
    } catch ({ message }) {
      const messageToDisplay = "newOrRenewal error: " + message.replace("GraphQL error: ", "");
      commit("addNotification", {
        type: messages.DANGER,
        text: messageToDisplay,
      });
    }
  },
  async getLastSubscription({ commit, dispatch }) {
    try {
      const {
        data: { getLastSubscription },
      } = await apolloClient.query({
        query: lastSubscriptionQuery,
      });

      const { statusCode, message, response } = getLastSubscription;
      if (statusCode != 200) throw new Error(`Failed fetching data: ${message}`);
      commit("setLastSubscription", { response });
    } catch ({ message }) {
      const messageToDisplay = "getLastSubscription error: " + message.replace("GraphQL error: ", "");
      commit("addNotification", {
        type: messages.DANGER,
        text: messageToDisplay,
      });
    }
  },

  async updateDataSubscription({ commit, dispatch, state }, { reference }) {
    try {
      const variables = { subscriptionId: state.subscription_id, reference };
      const {
        data: { updateSubscription },
      } = await apolloClient.mutate({
        mutation: UPDATE_SUBSCRIPTION,
        variables,
        fetchPolicy: "no-cache",
      });

      const { statusCode, message, response } = updateSubscription;
      if (statusCode != 200) throw new Error(`Failed fetching data: ${message}`);
      const parsedResponse = JSON.parse(response);
      const nameReference = parsedResponse.reference;
      commit("SET_SUBSCRIPTION_REFERENCE", { nameReference });
    } catch ({ message }) {
      const messageToDisplay = "updateDataSubscription error: " + message.replace("GraphQL error: ", "");
      commit("addNotification", {
        type: messages.DANGER,
        text: messageToDisplay,
      });
    }
  },

  async registerIdSubscription({ commit, dispatch }) {
    try {
      const {
        data: { addSubscription },
      } = await apolloClient.mutate({
        mutation: ADD_SUBSCRIPTION,
        fetchPolicy: "no-cache",
      });

      const { statusCode, message, response } = addSubscription;
      if (statusCode != 200) throw new Error(`Failed fetching data: ${message}`);
      const parsedResponse = JSON.parse(response);
      const subscription_id = parsedResponse.id;
      commit("SET_SUBSCRIPTION_INFO", { subscription_id });
      setItemInStorage("subscriptionData", "subscriptionId", subscription_id);
    } catch ({ message }) {
      const messageToDisplay = "registerIdSubscription error: " + message.replace("GraphQL error: ", "");
      commit("addNotification", {
        type: messages.DANGER,
        text: messageToDisplay,
      });
    }
  },
  async checkSubscriptionStored({ commit, dispatch, state, getters }) {
    try {
      /* temporal */
      if ($router.currentRoute.params && $router.currentRoute.params.subscriptionId) {
        const editID = $router.currentRoute.params.subscriptionId;
        setItemInStorage("subscriptionData", "subscriptionId", editID);
      } else {
        removeKeyFromStorage("subscriptionData", "subscriptionId");
        commit("RESET_SUBSCRIPTION_INFO");
      }
      const existsOnStorage = !!(searchObjectInStorage("subscriptionData") && searchKeyInStorage("subscriptionData", "subscriptionId"));
      if (existsOnStorage) {
        commit("SET_SUBSCRIPTION_INFO", {
          subscription_id: parseInt(searchKeyInStorage("subscriptionData", "subscriptionId")),
        });
        const { subscription_id } = state;
        const {
          data: { getSubscription },
        } = await apolloClient.query({
          query: subscriptionQuery,
          variables: {
            subscriptionId: subscription_id,
          },
          fetchPolicy: "no-cache",
        });

        const { statusCode, response, message, error } = getSubscription;

        if (statusCode !== 200) throw new Error(`msg: ${message} error: ${error}`);

        const { subscription, submission = false } = JSON.parse(response);

        if (submission) {
          await dispatch("newOrRenewal", { value: subscription.type });

          commit("saveAccountInformation", {
            insuredName: submission.insured_name || "",
            name: submission.name || "",
            country: submission.catalog_country_id || "",
            typeOfRisk: submission.catalog_type_risk_id || "",
            activity: submission.catalog_activity_id || "",
            currency: submission.catalog_currency_id || "",
            broker: submission.broker || "",
            cedent: submission.cedent || "",
          });

          /* set de lo datos de contactos */
          commit("saveContactsInformation", submission.contacts || []);
        }

        commit("SET_SUBSCRIPTION_REFERENCE", {
          nameReference: subscription.reference,
        });

        commit("SET_SUBSCRIPTION_STATUS", subscription.status_id);
      }
    } catch (e) {
      console.error(e);
      const { message } = e;
      const messageToDisplay = "checkSubscriptionStored error: " + message.replace("GraphQL error: ", "");
      commit("addNotification", {
        type: messages.DANGER,
        text: messageToDisplay,
      });
    }
  },
  async existsSubscription({ commit }, { id }) {
    try {
      const variables = { id };

      const { data } = await apolloClient.query({
        query: subscriptionExistsQuery,
        variables,
        fetchPolicy: "no-cache",
      });

      const { subscriptionExists } = data;
      const { statusCode } = subscriptionExists;

      if (statusCode !== 200) throw new Error("Subscription Not Found");
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  },
  async closeAccountAction({ commit, state, dispatch }, { closeAccount }) {
    try {
      const { subscription_id } = state;
      const variables = {
        subscriptionId: subscription_id,
        reasonClosed: closeAccount.id,
        emailSendId: closeAccount.email,
      };
      const {
        data: { createCloseReason },
      } = await apolloClient.mutate({
        mutation: CREATE_CLOSE_REASON,
        variables,
        fetchPolicy: "no-cache",
      });

      const { statusCode, response, message, error } = createCloseReason;

      if (statusCode !== 200) throw new Error(`msg: ${message} error: ${error}`);

      await dispatch("resetSubscription");

      $router.push("/subscription");

      commit("addNotification", {
        type: messages.SUCCESS,
        text: "Closed Account",
      });
    } catch ({ message }) {
      const messageToDisplay = "closeAccountAction error: " + message.replace("GraphQL error: ", "");
      commit("addNotification", {
        type: messages.DANGER,
        text: messageToDisplay,
      });
    }
  },
  async resetAccountInformation({ commit }) {
    commit("RESET_ACCOUNT_INFORMATION");
  },
  async resetCedentInformation({ commit }) {
    commit("RESET_CEDENT_INFORMATION");
  },
  async resetContactsInformation({ commit }) {
    commit("RESET_CONTACTS_INFORMATION");
  },
  async resetSubscription({ commit }) {
    commit("RESET_SUBSCRIPTION_INFO");
    commit("RESET_ACCOUNT_INFORMATION");
    commit("RESET_CEDENT_INFORMATION");
    commit("RESET_CONTACTS_INFORMATION");
    commit("RESET_SUBSCRIPTION_REFERENCE");
    /* agregar los resets de documentos si es necesario */
    removeKeyFromStorage("subscriptionData", "subscriptionId");
  },
  async getSubscriptionList({ commit, state }, payload) {
    try {
      const { limit, offset, query1, query2, query3, filterOrderBy = [["s.id", "desc"]], filterSearch1 = "s.reference", filterSearch2 = "s.reference", filterSearch3 = "s.reference" } = payload;

      const page = Math.ceil(offset / limit) + 1;

      if (state.subscriptionPages && state.subscriptionPages[page]) {
        commit("setSubscriptionList", state.subscriptionPages[page]);
      } else {
        const {
          data: { getSubscriptionList },
        } = await apolloClient.query({
          query: getAllSubscriptionQuery,
          variables: {
            limit,
            offset,
            query1,
            query2,
            query3,
            filterOrderBy,
            filterSearch1,
            filterSearch2,
            filterSearch3,
          },
          fetchPolicy: "no-cache",
        });

        const { statusCode, message, response } = getSubscriptionList;

        if (statusCode != 200) throw new Error(`Failed fetching data: ${message}`);

        commit("cacheSubscriptionPage", { page, data: response });

        commit("setSubscriptionList", response);
      }

      commit("setSubscriptionListPagination", payload);
    } catch ({ message }) {
      const messageToDisplay = "getSubscriptionList error: " + message.replace("GraphQL error: ", "");
      commit("addNotification", {
        type: messages.DANGER,
        text: messageToDisplay,
      });
    }
  },
  async filterSubscriptions({ commit }, payload) {
    try {
      const { query, filter, limit, offset } = payload;
      const variables = { query, filter, limit, offset };
      const {
        data: { filterSubscription },
      } = await apolloClient.query({
        query: FILTER_SUBSCRIPTION,
        variables,
        fetchPolicy: "no-cache",
      });
      const { statusCode, message, response } = filterSubscription;
      if (statusCode != 200) throw new Error(`Failed fetching data: ${message}`);
      commit("setSubscriptionList", response);
      commit("setSubscriptionListPagination", payload);
    } catch ({ message }) {
      const messageToDisplay = "filterSubscriptions error: " + message.replace("GraphQL error: ", "");
      commit("addNotification", {
        type: messages.DANGER,
        text: messageToDisplay,
      });
    }
  },
  async loadSubscription({ commit }, payload) {
    try {
      const { id, reference, catalog_type_risk_id, facultative_reference } = payload;
      commit("SET_SUBSCRIPTION_INFO", { subscription_id: id });
      setItemInStorage("subscriptionData", "subscriptionId", id);
      commit("SET_SUBSCRIPTION_REFERENCE", { nameReference: reference });
      commit("SET_FACULTATIVE_REFERENCE", {
        facultativeReference: facultative_reference,
      });
    } catch ({ message }) {
      const messageToDisplay = "loadSubscription error: " + message.replace("GraphQL error: ", "");
      commit("addNotification", {
        type: messages.DANGER,
        text: messageToDisplay,
      });
    }
  },
  async globalSaveColumn({ commit, state }, payload) {
    try {
      const { table = "submission", column, difname = column, id } = payload;
      const snakeCasedDifname = toSnakeCase(difname);

      const comparison = state[column];

      const variables = {
        tableName: table,
        column: snakeCasedDifname,
        dataValue: String(comparison),
        id,
      };

      const { data } = await apolloClient.mutate({
        mutation: UPDATE_CHANGE_MUTATION,
        variables,
        fetchPolicy: "no-cache",
      });

      const { statusCode } = data["updateChange"];

      if (statusCode !== 200) throw new Error("Error creating/updating Column");
    } catch ({ message }) {
      const messageToDisplay = "globalSaveColumn error: " + message.replace("GraphQL error: ", "");
      commit("addNotification", {
        type: messages.DANGER,
        text: messageToDisplay,
      });
    }
  },
  async saveColumn({ commit, state }, payload) {
    try {
      const { table = "submission", parent, column, difname = column } = payload;

      const settings = {
        submission: {
          table: "submission",
          query: SUBM_BY_SUBS_QUERY,
          variables: { subscriptionId: state.subscription_id },
          response: "getSubmissionBySubscriptionId",
        },
      };

      const findResponse = await apolloClient.query({
        query: settings[table].query,
        variables: settings[table].variables,
        fetchPolicy: "no-cache",
      });

      const response = JSON.parse(findResponse.data[settings[table].response].response);

      const { id } = response;
      const snakeCasedDifname = toSnakeCase(difname);

      const comparison = state[parent][column];

      const variables = {
        tableName: settings[table].table,
        column: snakeCasedDifname,
        dataValue: String(comparison),
        id,
      };

      const { data } = await apolloClient.mutate({
        mutation: UPDATE_CHANGE_MUTATION,
        variables,
        fetchPolicy: "no-cache",
      });

      const { statusCode } = data["updateChange"];

      if (statusCode !== 200) throw new Error("Error creating/updating Quotation Column");
    } catch ({ message }) {
      const messageToDisplay = "saveColumn error: " + message.replace("GraphQL error: ", "");
      commit("addNotification", {
        type: messages.DANGER,
        text: messageToDisplay,
      });
    }
  },
  async saveContactsSubmission({ commit, state }, payload) {
    try {
      const { table = "submission", column, difname = column } = payload;

      const settings = {
        submission: {
          table: "submission",
          query: SUBM_BY_SUBS_QUERY,
          variables: { subscriptionId: state.subscription_id },
          response: "getSubmissionBySubscriptionId",
        },
      };

      const findResponse = await apolloClient.query({
        query: settings[table].query,
        variables: settings[table].variables,
        fetchPolicy: "no-cache",
      });

      const response = JSON.parse(findResponse.data[settings[table].response].response);

      const { id } = response;
      const snakeCasedDifname = toSnakeCase(difname);

      const comparison = state[column];

      const variables = {
        tableName: settings[table].table,
        column: snakeCasedDifname,
        dataValue: JSON.stringify(comparison),
        id,
      };

      const { data } = await apolloClient.mutate({
        mutation: UPDATE_CHANGE_JSON_MUTATION,
        variables,
        fetchPolicy: "no-cache",
      });

      const { statusCode } = data["updateJson"];

      if (statusCode !== 200) throw new Error("Error creating/updating Quotation Column");
    } catch ({ message }) {
      const messageToDisplay = "saveContactsSubmission error: " + message.replace("GraphQL error: ", "");
      commit("addNotification", {
        type: messages.DANGER,
        text: messageToDisplay,
      });
    }
  },
  async subscriptionReport({ commit, state }) {
    try {
      const { subscription_id, accountInformation } = state;
      const variables = {
        subscriptionId: subscription_id,
        riskType: accountInformation.typeOfRisk,
      };

      const {
        data: { getSubscriptionReport },
      } = await apolloClient.query({
        query: subscriptionReportQuery,
        variables,
        fetchPolicy: "no-cache",
      });
      const { statusCode, response, message, error } = getSubscriptionReport;

      if (statusCode !== 200) throw new Error(`Cannot create general report: ${message}, ${error}`);
      return response;
    } catch ({ message }) {
      //const messageToDisplay = message.replace('GraphQL error: ', '');
      commit("addNotification", {
        type: messages.DANGER,
        text: "subscriptionReport error: Missing important information",
      });
    }
  },

  async updateReference({ commit, state }, payload) {
    try {
      const { dataValue, id } = payload;

      const variables = {
        dataValue: dataValue,
        id: id,
      };

      const { data } = await apolloClient.mutate({
        mutation: UPDATE_REFERENCE_SUBSCRIPTION_MUTATION,
        variables,
        fetchPolicy: "no-cache",
      });
      const { statusCode } = data["updateReferenceSubscription"];

      if (statusCode !== 200) throw new Error("Error creating/updating Reference Subscription");
    } catch ({ message }) {
      const messageToDisplay = "updateReference error: " + message.replace("GraphQL error: ", "");
      commit("addNotification", {
        type: messages.DANGER,
        text: messageToDisplay,
      });
    }
  },

  async getAnalysisById({ commit, state }, id_subscription) {
    const variables = {
      id_subscription: parseInt(id_subscription, 10),
    };
    const {
      data: { getAnalysisById },
    } = await apolloClient.query({
      query: GET_ANALYSIS_BY_ID,
      variables,
      fetchPolicy: "no-cache",
    });
    const res = JSON.parse(getAnalysisById.response);
    state.analysis = res;
  },

  async setAnalysis({ commit, state }, { id_subscription, column, data }) {
    const variables = {
      subscription_id,
      column,
      data,
    };
    const {
      data: { setAnalysis },
    } = await apolloClient.query({
      query: setAnalysis,
      variables,
      fetchPolicy: "no-cache",
    });
    const res = JSON.parse(setAnalysis.response);
    state.analysis = res;
  },

  async getTotalInsurableValue({ commit, state }, id_subscription) {
    const variables = { id_subscription };
    const { data } = await apolloClient.query({
      query: GET_TOTAL_INSURABLE,
      variables,
      fetchPolicy: "no-cache",
    });

    const { response } = data.getTotalInsurableValueById;
    const parsedResponse = JSON.parse(response);
    state.totalInsurableValue = parsedResponse;
  },

  async getMainLocation({ commit, state }, id_subscription) {
    const variables = { id_subscription };
    const { data } = await apolloClient.query({
      query: GET_MAIN_LOCATION,
      variables,
      fetchPolicy: "no-cache",
    });

    const { response } = data.getMainLocationById;
    const parsedResponse = JSON.parse(response);
    state.mainLocation = parsedResponse;
  },
};
