/* api */
import { apolloClient } from "../../lib/api";
/* queries & mutations */
import { getSublimesProperty as queryGetSublimes, createSublimeProperty as mutationCreateSublimeProperty, updateSublimeProperty as mutationUpdateSublimeProperty, createSublimitProperty as mutationCreateSublimitProperty } from "./graphql/sublimes";
import { getBoundClaims as queryGetBoundClaims, updateBoundClaim as mutationUpdateClaim } from "./graphql/bound";
import { getDeductibles as queryGetDeductibles, createDeductibleProperty as mutationCreateDeductible, updateDeductibleProperty as mutationUpdateDeductible, createFireDeductible as mutationCreateFireDeductible } from "./graphql/deductibles";
/* mutaciones */
import UPDATE_CHANGE_MUTATION from "./mutations/updateChange";
import SAVE_RATE_AND_ALOP_CURRENCY_MUTATION from "./mutations/saveRateAndAlopCurrency";
import CREATE_FIELD_BOUND_MUTATION from "./mutations/addFieldBound";
/* queries */
import FIND_BOUND_QUERY from "./queries/findBoundBySubscription";
import ENG_DED_ID_QUERY from "./queries/getEngDeductibleById";
import ENG_DED_QUERY from "./queries/getEngDeductible";
import SUBLIMIT_ID_QUERY from "./queries/getSublimitById";
import SUBLIMITS_QUERY from "./queries/getSublimits";
/* constantes */
import messages from "../../constants/messages";
import BOUND from "../../constants/bound";
/* utils */
import { toSnakeCase, keysToCamel, cleanNumericValue } from "./utils";

export default {
  async saveBoundColumn({ commit, state }, payload) {
    try {
      const { table = "bound", parent, column, type = "" } = payload;
      const tableConditions = {
        bound: "bound",
        boundInsurable: "bound_insurable",
        boundInsurableProp: "bound_insurable_prop",
        buced: "bound_underlying_cat_eng_deductibles",
        boundSublimesEng: "bound_sublimes",
        boundSublimesProp: "bound_sublimes_property",
        mainLocation: "bound_main_location",
        boundPml: "bound_pml",
      };
      const findResponse = await apolloClient.query({
        query: FIND_BOUND_QUERY,
        variables: {
          id: state.subscription_id,
          type: type || state.boundEng.typeBound,
        },
        fetchPolicy: "no-cache",
      });
      const response = JSON.parse(findResponse.data["findBoundBySubscription"].response);
      const { id } = response[table];
      const snakeCasedColumn = toSnakeCase(column);
      const comparison = state[parent][column];
      const rawValue = cleanNumericValue(comparison);
      const safeValue = rawValue == null || rawValue === "null" ? "0" : String(rawValue);
      const variables = {
        tableName: tableConditions[table],
        column: snakeCasedColumn,
        dataValue: safeValue,
        id,
      };
      const { data } = await apolloClient.mutate({
        mutation: UPDATE_CHANGE_MUTATION,
        variables,
        fetchPolicy: "no-cache",
      });
      const { statusCode } = data["updateChange"];
      if (statusCode !== 200) throw new Error("Error creating/updating Quotation Column");
    } catch (e) {
      console.error(e);
      const { message } = e;
      const messageToDisplay = "saveBoundColumn error: " + message.replace("GraphQL error: ", "");
      commit("addNotification", {
        type: messages.DANGER,
        text: messageToDisplay,
      });
    }
  },

  async saveBoundMultipleColumn({ commit, state }, payload) {
    try {
      const { table = "buced", parent, column, id } = payload;
      const tableConditions = {
        buced: "bound_underlying_cat_eng_deductibles",
      };
      const snakeCasedColumn = toSnakeCase(column);
      const comparison = state[parent][id];
      const rawValue = cleanNumericValue(comparison[column]);
      const safeValue = rawValue == null || rawValue === "null" ? "0" : String(rawValue);
      const variables = {
        tableName: tableConditions[table],
        column: snakeCasedColumn,
        dataValue: safeValue,
        id: comparison["id"],
      };
      const { data } = await apolloClient.mutate({
        mutation: UPDATE_CHANGE_MUTATION,
        variables,
        fetchPolicy: "no-cache",
      });
      const { statusCode } = data["updateChange"];
      if (statusCode !== 200) throw new Error("Error creating/updating Quotation Column");
    } catch (e) {
      console.error(e);
      const { message } = e;
      const messageToDisplay = "saveBoundMultipleColumn error: " + message.replace("GraphQL error: ", "");
      commit("addNotification", {
        type: messages.DANGER,
        text: messageToDisplay,
      });
    }
  },

  async getBoundInformation({ commit, state }, table = "bound") {
    try {
      const settings = {
        find: {
          query: FIND_BOUND_QUERY,
          variables: {
            id: state.subscription_id,
            type: state.boundEng.typeBound || 1,
          },
          response: "findBoundBySubscription",
        },
        saving: {
          bound: {
            obj: BOUND.boundEng,
            key: "bound",
            mutation: "setStateCompleteBound",
          },
          boundInsurable: {
            obj: BOUND.boundInsurable,
            key: "boundInsurable",
            mutation: "setStateCompleteBoundInsurable",
          },
          boundInsurableProp: {
            obj: BOUND.boundInsurableProp,
            key: "boundInsurableProp",
            mutation: "setStateCompleteBoundInsurableProp",
          },
          buced: {
            obj: BOUND.boundPropDeductibles,
            key: "buced",
            mutation: "setStateCompleteDeductiblesProp",
          },
          boundSublimesEng: {
            obj: BOUND.boundSublimes,
            key: "boundSublimesEng",
            mutation: "setStateCompleteSublimes",
          },
          boundSublimesProp: {
            obj: BOUND.boundSublimes,
            key: "boundSublimesProp",
            mutation: "setStateCompleteSublimes",
          },
          mainLocation: {
            obj: BOUND.mliv,
            key: "mainLocation",
            mutation: "setStateCompleteMainLocation",
          },
          boundPml: {
            obj: BOUND.boundPml,
            key: "boundPml",
            mutation: "setStateCompleteBoundPml",
          },
        },
      };

      const findResponse = await apolloClient.query({
        query: settings.find.query,
        variables: settings.find.variables,
        fetchPolicy: "no-cache",
      });

      const parsedResponse = JSON.parse(findResponse.data[settings.find.response].response);

      const config = settings.saving[table];
      const responseToCamel = keysToCamel(parsedResponse);
      const tableResponse = responseToCamel[config.key];
      const tableKeys = tableResponse ? Object.keys(tableResponse) : [];

      const filter = Object.keys(config.obj)
        .filter((key) => tableKeys.includes(key))
        .reduce((obj, key) => {
          obj[key] = tableResponse[key];
          if (key === "ppw1" || key === "ppw2" || key === "ppw3") obj[key] = new Date(tableResponse[key]).toISOString().split("T")[0];
          return obj;
        }, {});

      commit(config.mutation, filter);
    } catch (e) {
      console.error(e);
      const { message } = e;
      const messageToDisplay = "getBoundInformation error: " + message.replace("GraphQL error: ", "");
      commit("addNotification", {
        type: messages.DANGER,
        text: messageToDisplay,
      });
    }
  },

  async loadMultipleDeductiblesEng({ commit, state }, payload) {
    try {
      const { table = "boundEngDeductibles" } = payload;
      const id = state.subscription_id;

      const tableSettings = {
        boundEngDeductibles: {
          table: "bound_deductibles_eng",
          find: ENG_DED_QUERY,
          findResponse: "getEngDeductible",
          err: "Engineering Deductibles",
          filter: BOUND.boundEngDeductibles[0],
          commit: "SET_BOUND_ENG_DEDUCTIBLES",
          reset: "RESET_BOUND_ENG_DEDUCTIBLES",
          variables: { id },
        },
        boundSublimitsEng: {
          table: "bound_sublimits_eng",
          find: SUBLIMITS_QUERY,
          findResponse: "getSublimits",
          err: "Engineering Sublimits",
          filter: BOUND.boundSublimitsEng[0],
          commit: "SET_SUBLIMITS_ENG",
          reset: "RESET_SUBLIMITS_ENG",
          variables: { id, type: "eng" },
        },
        boundSublimitsProp: {
          table: "bound_sublimits_prop",
          find: SUBLIMITS_QUERY,
          findResponse: "getSublimits",
          err: "Property Sublimits",
          filter: BOUND.boundSublimitsProp[0],
          commit: "SET_SUBLIMITS_PROP",
          reset: "RESET_SUBLIMITS_PROP",
          variables: { id, type: "prop" },
        },
        boundSublimesProp: {
          table: "bound_sublimes_property",
          find: SUBLIMITS_QUERY,
          findResponse: "getSublimes",
          err: "Property Sublimes",
          filter: BOUND.boundSublimesProp[0],
          commit: "setStateCompleteSublimesProp",
          reset: "resetStateCompleteSublimesProp",
          variables: { id },
        },
        buced: {
          table: "bound_underlying_cat_eng_deductibles",
          find: queryGetDeductibles,
          findResponse: "getDeductibles",
          err: "Deductibles",
          filter: BOUND.boundEngCatDeductibles[0],
          commit: "setStateCompleteBUCED",
          reset: "resetStateCompleteBUCED",
          variables: { id },
        },
      };

      const { data } = await apolloClient.query({
        query: tableSettings[table].find,
        variables: tableSettings[table].variables,
        fetchPolicy: "no-cache",
      });

      const response = data[tableSettings[table].findResponse].response;
      const parsedResponse = JSON.parse(response);
      const responseKeys = keysToCamel(parsedResponse) || [];

      const mapResponse =
        responseKeys && responseKeys.length > 0
          ? responseKeys.map((sectionKeys) => {
              const keys = Object.keys(sectionKeys);
              const filter = Object.keys(tableSettings[table].filter)
                .filter((key) => keys.includes(key))
                .reduce((obj, key) => {
                  obj[key] = sectionKeys[key];
                  return obj;
                }, {});

              return filter;
            })
          : [];
      commit(tableSettings[table].commit, mapResponse);
    } catch (e) {
      console.error(e);
      const { message } = e;
      const messageToDisplay = "loadMultipleDeductiblesEng error: " + message.replace("GraphQL error: ", "");
      commit("addNotification", {
        type: messages.DANGER,
        text: messageToDisplay,
      });
    }
  },

  async updateBoundType({ commit, state }, type) {
    try {
      const tableName = "bound";
      const column = "typeBound";
      const query = FIND_BOUND_QUERY;
      const mutation = "SET_BOUND_ENG";
      const variablesFind = { id: state.subscription_id };
      const queryResponse = "findBoundBySubscription";
      const updateResponse = "updateChange";
      const findResponse = await apolloClient.query({
        query,
        variables: variablesFind,
        fetchPolicy: "no-cache",
      });
      const response = JSON.parse(findResponse.data[queryResponse].response);
      commit(mutation, { key: column, value: type });
      const { id } = response[tableName];
      const snakeCasedColumn = toSnakeCase(column);
      const comparison = state.boundEng[column];
      const rawValue = cleanNumericValue(comparison);
      const safeValue = rawValue == null || rawValue === "null" ? "0" : String(rawValue);
      const variables = {
        tableName,
        column: snakeCasedColumn,
        dataValue: safeValue,
        id,
      };
      const { data } = await apolloClient.mutate({
        mutation: UPDATE_CHANGE_MUTATION,
        variables,
        fetchPolicy: "no-cache",
      });
      const { statusCode } = data[updateResponse];
      if (statusCode !== 200) throw new Error("Error creating/updating Bound Column");
    } catch (e) {
      console.error(e);
      const { message } = e;
      const messageToDisplay = "updateBoundType error: " + message.replace("GraphQL error: ", "");
      commit("addNotification", {
        type: messages.DANGER,
        text: messageToDisplay,
      });
    }
  },

  async getBoundColumnData({ commit, state }, { table = "quotation", column, subscriptionId = state.subscription_id }) {
    try {
      const variables = {
        table,
        column,
        subscriptionId,
      };
      const {
        data: { getQuotationColumn },
      } = await apolloClient.query({
        query: QUOTATION_COLUMN_QUERY,
        variables,
        fetchPolicy: "no-cache",
      });
      const { statusCode, response } = getQuotationColumn;
      if (statusCode !== 200) throw new Error("Error fetching quotation column");
      const parsedResponse = JSON.parse(response);
      return parsedResponse[column];
    } catch (e) {
      console.error(e);
      const { message } = e;
      const messageToDisplay = "getBoundColumnData error: " + message.replace("GraphQL error: ", "");
      commit("addNotification", {
        type: messages.DANGER,
        text: messageToDisplay,
      });
    }
  },

  async saveEngDeductibleColumn({ commit, state }, payload) {
    try {
      const { table = "boundEngDeductibles", key, value, id = null } = payload;
      const tableSettings = {
        boundEngDeductibles: {
          table: "bound_deductibles_eng",
          find: ENG_DED_ID_QUERY,
          findResponse: "getEngDeductibleById",
          err: "Engineering Deductibles",
          variables: { id },
        },
        boundSublimitsEng: {
          table: "bound_sublimits_eng",
          find: SUBLIMIT_ID_QUERY,
          findResponse: "getSublimitById",
          err: "Engineering Deductibles",
          variables: { id, type: "eng" },
        },
        boundSublimitsProp: {
          table: "bound_sublimits_prop",
          find: SUBLIMIT_ID_QUERY,
          findResponse: "getSublimitById",
          err: "Property Deductibles",
          variables: { id, type: "prop" },
        },
      };
      const column = toSnakeCase(key);
      const findResponse = await apolloClient.query({
        query: tableSettings[table].find,
        variables: tableSettings[table].variables,
        fetchPolicy: "no-cache",
      });
      const response = findResponse.data[tableSettings[table].findResponse].response;
      const parsedResponse = JSON.parse(response);
      const variables = {
        tableName: tableSettings[table].table,
        column,
        dataValue: cleanNumericValue(value),
        id: parsedResponse[0].id,
      };
      const { data } = await apolloClient.mutate({
        mutation: UPDATE_CHANGE_MUTATION,
        variables,
        fetchPolicy: "no-cache",
      });
      const { statusCode } = data["updateChange"];
      if (statusCode !== 200) throw new Error(`Error creating/updating ${tableSettings[table].err} Column`);
    } catch (e) {
      console.error(e);
      const { message } = e;
      const messageToDisplay = "saveEngDeductibleColumn error: " + message.replace("GraphQL error: ", "");
      commit("addNotification", {
        type: messages.DANGER,
        text: messageToDisplay,
      });
    }
  },

  async addNewFieldBound({ commit, dispatch, state }, payload) {
    try {
      const { table = "boundEngDeductibles" } = payload;
      const id = state.subscription_id;
      const tableSettings = {
        boundEngDeductibles: {
          table: "bound_deductibles_eng",
          find: CREATE_FIELD_BOUND_MUTATION,
          findResponse: "addFieldBound",
          err: "Bound Deductibles Engineering",
          filter: BOUND.boundEngDeductibles[0],
          commit: "SET_BOUND_ENG_DEDUCTIBLES",
          reset: "RESET_BOUND_ENG_DEDUCTIBLES",
        },
        buced: {
          table: "bound_underlying_cat_eng_deductibles",
          find: CREATE_FIELD_BOUND_MUTATION,
          findResponse: "addFieldBound",
          err: "Bound Deductibles",
          filter: BOUND.boundEngCatDeductibles[0],
          commit: "SET_BOUND_ENG_CAT_DED",
          reset: "RESET_BOUND_ENG_CAT_DED",
        },
        boundSublimitsEng: {
          table: "bound_sublimits_eng",
          find: CREATE_FIELD_BOUND_MUTATION,
          findResponse: "addFieldBound",
          err: "Bound Sublimits Engineering",
          filter: BOUND.boundSublimitsEng[0],
          commit: "SET_SUBLIMITS_ENG",
          reset: "RESET_SUBLIMITS_ENG",
        },
        boundSublimitsProp: {
          table: "bound_sublimits_prop",
          find: CREATE_FIELD_BOUND_MUTATION,
          findResponse: "addFieldBound",
          err: "Bound Sublimits Property",
          filter: BOUND.boundSublimitsProp[0],
          commit: "SET_SUBLIMITS_PROP",
          reset: "RESET_SUBLIMITS_PROP",
        },
        boundSublimesProp: {
          table: "bound_sublimes_property",
          find: CREATE_FIELD_BOUND_MUTATION,
          findResponse: "addFieldBound",
          err: "Bound Sublimes Property",
          filter: BOUND.boundSublimesProp[0],
          commit: "setStateCompleteSublimesProp",
          reset: "resetStateCompleteSublimesProp",
        },
      };
      const variables = {
        table: tableSettings[table].table,
        id,
      };
      const { data } = await apolloClient.mutate({
        mutation: tableSettings[table].find,
        variables,
        fetchPolicy: "no-cache",
      });
      const { statusCode } = data[tableSettings[table].findResponse];
      if (statusCode !== 200) throw new Error(`Error creating/updating ${tableSettings[table].err} Column`);
      await dispatch("loadMultipleDeductiblesEng", { table });
    } catch (e) {
      console.error(e);
      const { message } = e;
      const messageToDisplay = "addNewFieldBound error: " + message.replace("GraphQL error: ", "");
      commit("addNotification", {
        type: messages.DANGER,
        text: messageToDisplay,
      });
    }
  },

  async getSublimesProperty({ commit, state }) {
    try {
      const { subscription_id } = state;
      const create = await apolloClient.query({
        query: queryGetSublimes,
        variables: {
          subscription_id,
        },
        fetchPolicy: "no-cache",
      });
      const { data } = create;
      const { statusCode, response: beforeParsing } = data["getSublimesProperty"];
      if (statusCode !== 200) throw new Error("Error fetching Sublimes");
      const response = JSON.parse(beforeParsing);
      commit("setStateCompleteSublimesProp", keysToCamel(response));
    } catch (e) {
      console.error(e);
      const { message } = e;
      const messageToDisplay = "getSublimesProperty error: " + message.replace("GraphQL error: ", "");
      commit("addNotification", {
        type: messages.DANGER,
        text: messageToDisplay,
      });
    }
  },

  async createSublimeProperty({ commit, state }) {
    try {
      const { subscription_id } = state;
      const { data } = await apolloClient.mutate({
        mutation: mutationCreateSublimeProperty,
        variables: { subscription_id },
        fetchPolicy: "no-cache",
      });
      const { statusCode } = data["createSublimeProperty"];
      if (statusCode !== 200) throw new Error("Error fetching Sublime");
    } catch (e) {
      console.error(e);
      const { message } = e;
      const messageToDisplay = "createSublimeProperty error: " + message.replace("GraphQL error: ", "");
      commit("addNotification", {
        type: messages.DANGER,
        text: messageToDisplay,
      });
    }
  },

  async createSublimitProperty({ commit, state }, sublime_id) {
    try {
      const { subscription_id } = state;
      const { data } = await apolloClient.mutate({
        mutation: mutationCreateSublimitProperty,
        variables: { sublime_id, subscription_id },
        fetchPolicy: "no-cache",
      });
      const { statusCode } = data["createSublimitProperty"];
      if (statusCode !== 200) throw new Error("Error fetching Sublime");
    } catch (e) {
      console.error(e);
      const { message } = e;
      const messageToDisplay = "createSublimitProperty error: " + message.replace("GraphQL error: ", "");
      commit("addNotification", {
        type: messages.DANGER,
        text: messageToDisplay,
      });
    }
  },

  async updateSublimeProperty({ commit, state }, { id, column }) {
    try {
      const snakeCasedColumn = toSnakeCase(column);
      const findItem = Array.from(state.boundSublimesProp).find((v) => v.id === id);
      const comparison = column === "active" ? false : findItem[column];
      const variables = {
        id,
        column: snakeCasedColumn,
        value: String(cleanNumericValue(comparison)),
      };
      const { data } = await apolloClient.mutate({
        mutation: mutationUpdateSublimeProperty,
        variables,
        fetchPolicy: "no-cache",
      });

      const { statusCode } = data["updateSublimeProperty"];
      if (statusCode !== 200) throw new Error("Error updating Sublime");
    } catch (e) {
      console.error(e);
      const { message } = e;
      const messageToDisplay = "updateSublimeProperty error: " + message.replace("GraphQL error: ", "");
      commit("addNotification", {
        type: messages.DANGER,
        text: messageToDisplay,
      });
    }
  },

  async getBoundClaims({ commit, state }, payload) {
    try {
      const subscription_id = state.subscription_id;
      const variables = {
        subscription_id,
        type: payload,
      };
      const { data } = await apolloClient.query({
        query: queryGetBoundClaims,
        variables,
        fetchPolicy: "no-cache",
      });
      const fetched = data["getBoundClaims"];
      const { statusCode, response } = fetched;
      if (statusCode !== 200) throw new Error("Error fetching Bound Claims");
      const parsedResponse = JSON.parse(response);
      commit("setBoundClaims", keysToCamel(parsedResponse));
    } catch (e) {
      console.error(e);
      const { message } = e;
      const messageToDisplay = "getBoundClaims error: " + message.replace("GraphQL error: ", "");
      commit("addNotification", {
        type: messages.DANGER,
        text: messageToDisplay,
      });
    }
  },

  async updateBoundClaim({ commit }, { id, column, value, type }) {
    try {
      const snakeCasedColumn = toSnakeCase(column);
      const variables = {
        id,
        column: snakeCasedColumn,
        value: cleanNumericValue(value),
        type,
      };
      const { data } = await apolloClient.mutate({
        mutation: mutationUpdateClaim,
        variables,
        fetchPolicy: "no-cache",
      });
      const { statusCode } = data["updateBoundClaim"];
      if (statusCode !== 200) throw new Error("Error updating Claim");
    } catch (e) {
      console.error(e);
      const { message } = e;
      const messageToDisplay = "updateBoundClaim error: " + message.replace("GraphQL error: ", "");
      commit("addNotification", {
        type: messages.DANGER,
        text: messageToDisplay,
      });
    }
  },

  async getDeductiblesProperty({ commit, state }) {
    try {
      const { subscription_id } = state;
      const create = await apolloClient.query({
        query: queryGetDeductibles,
        variables: {
          id: subscription_id,
        },
        fetchPolicy: "no-cache",
      });
      const { data } = create;
      const { statusCode, response: beforeParsing } = data["getDeductibles"];
      if (statusCode !== 200) throw new Error("Error fetching Deductibles");
      const response = JSON.parse(beforeParsing);
      const camelized = keysToCamel(response);
      const parsedValues = camelized.map((data) => {
        return {
          ...data,
          underlyingCatAplicaSelect: parseInt(data.underlyingCatAplicaSelect, 10) || 0,
          underlyingCatValuesSelect: parseInt(data.underlyingCatValuesSelect, 10) || 0,
          underlyingCatValuesSelectTwo: parseInt(data.underlyingCatValuesSelectTwo, 10) || 0,
          underlyingHidroAplicaSelect: parseInt(data.underlyingHidroAplicaSelect, 10) || 0,
          underlyingHidroValuesSelect: parseInt(data.underlyingHidroValuesSelect, 10) || 0,
          underlyingHidroValuesSelectTwo: parseInt(data.underlyingHidroValuesSelectTwo, 10) || 0,
        };
      });

      commit("setStateCompleteDeductiblesProp", parsedValues);
    } catch (e) {
      console.error(e);
      const { message } = e;
      const messageToDisplay = "getDeductiblesProperty error: " + message.replace("GraphQL error: ", "");
      commit("addNotification", {
        type: messages.DANGER,
        text: messageToDisplay,
      });
    }
  },

  async createDeductibleProperty({ commit, state }) {
    try {
      const { subscription_id } = state;
      const { data } = await apolloClient.mutate({
        mutation: mutationCreateDeductible,
        variables: { subscription_id },
        fetchPolicy: "no-cache",
      });
      const { statusCode } = data["createDeductibleProperty"];
      if (statusCode !== 200) throw new Error("Error creating Deductible");
    } catch (e) {
      console.error(e);
      const { message } = e;
      const messageToDisplay = "createDeductibleProperty error: " + message.replace("GraphQL error: ", "");
      commit("addNotification", {
        type: messages.DANGER,
        text: messageToDisplay,
      });
    }
  },

  async updateDeductibleProperty({ commit }, { id, column, value, type }) {
    try {
      const snakeCasedColumn = toSnakeCase(column);
      const variables = {
        id,
        column: snakeCasedColumn,
        value: cleanNumericValue(value),
        type,
      };
      const { data } = await apolloClient.mutate({
        mutation: mutationUpdateDeductible,
        variables,
        fetchPolicy: "no-cache",
      });
      const { statusCode } = data["updateDeductibleProperty"];
      if (statusCode !== 200) throw new Error("Error updating Deductible");
    } catch (e) {
      console.error(e);
      const { message } = e;
      const messageToDisplay = "updateDeductibleProperty error: " + message.replace("GraphQL error: ", "");
      commit("addNotification", {
        type: messages.DANGER,
        text: messageToDisplay,
      });
    }
  },

  async createFireDeductible({ commit, state }, deductible_id) {
    try {
      const { subscription_id } = state;
      const variables = {
        deductible_id,
        subscription_id,
      };
      const { data } = await apolloClient.mutate({
        mutation: mutationCreateFireDeductible,
        variables,
        fetchPolicy: "no-cache",
      });
      const { statusCode } = data["createFireDeductible"];
      if (statusCode !== 200) throw new Error("Error creating Fire Deductible");
    } catch (e) {
      console.error(e);
      const { message } = e;
      const messageToDisplay = "createFireDeductible error: " + message.replace("GraphQL error: ", "");
      commit("addNotification", {
        type: messages.DANGER,
        text: messageToDisplay,
      });
    }
  },

  async saveRateAndAlopCurrency({ commit, state }, { subscription_id, newVal, column = "rate" }) {
    try {
      // column -> 'rate' || 'alop_currency_rate'
      const variables = {
        subscription_id,
        column,
        newVal,
      };
      const { data } = await apolloClient.mutate({
        mutation: SAVE_RATE_AND_ALOP_CURRENCY_MUTATION,
        variables,
        fetchPolicy: "no-cache",
      });
      const { statusCode } = data["updateChange"];
      if (statusCode !== 200) throw new Error("Error creating/updating Bound Insurable Column");
    } catch (e) {
      const { message } = e;
      const messageToDisplay = "saveRateAndAlopCurrency error: " + message.replace("GraphQL error: ", "");
      commit("addNotification", {
        type: messages.DANGER,
        text: messageToDisplay,
      });
    }
  },
};
