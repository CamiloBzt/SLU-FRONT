/* api */
import { apolloClient } from "../../lib/api";

/* mutaciones */
import UPDATE_CHANGE_MUTATION from "./mutations/updateChange";
import CREATE_FIELD_MUTATION from "./mutations/addFieldRate";

/* queries */
import ALOP_QUERY from "./queries/getAlopById";
import CAT_TABLE_QUERY from "./queries/getCatTable";
import CAT_RATE_QUERY from "./queries/getCatRateById";
import CAT_LARGE_QUERY from "./queries/getCatLargeById";
import CAT_TABLE_ID_QUERY from "./queries/getCatTableById";
import NON_CAT_RATE_PRO_QUERY from "./queries/getNonCatRatesPro";
import NON_CAT_RATE_PRO_ID_QUERY from "./queries/getNonCatRateProById";

/* constantes */
import messages from "../../constants/messages";
import RATES from "../../constants/rates";

/* utils */
import { toSnakeCase, keysToCamel } from "./utils";

export default {
  async saveRatesModalColumn({ commit, state }, payload) {
    try {
      const { table = "catRates", key, value, id = null } = payload;

      const tableSettings = {
        catRates: {
          table: "quotation_cat_rates",
          find: CAT_RATE_QUERY,
          findResponse: "getCatRateById",
          err: "Cat Rates",
          variables: { id: state.subscription_id },
        },
        catTable: {
          table: "quotation_cat_table",
          find: CAT_TABLE_ID_QUERY,
          findResponse: "getCatTableById",
          err: "Cat Table",
          variables: { id },
        },
        catLarge: {
          table: "quotation_cat_large",
          find: CAT_LARGE_QUERY,
          findResponse: "getCatLargeById",
          err: "Non Cat Rates",
          variables: { id: state.subscription_id },
        },
        nonCatRatesPro: {
          table: "quotation_non_cat_rates_pro",
          find: NON_CAT_RATE_PRO_ID_QUERY,
          findResponse: "getNonCatRateProById",
          err: "Cat Rates Pro",
          variables: { id },
        },
        alopTable: {
          table: "quotation_alop_rates",
          find: ALOP_QUERY,
          findResponse: "getAlopById",
          err: "Alop Rates",
          variables: { id: state.subscription_id },
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
        dataValue: String(value),
        id: parsedResponse[0].id,
      };

      const { data } = await apolloClient.mutate({
        mutation: UPDATE_CHANGE_MUTATION,
        variables,
        fetchPolicy: "no-cache",
      });

      const { statusCode } = data["updateChange"];

      if (statusCode !== 200) throw new Error(`Error creating/updating ${tableSettings[table].err} Column`);
    } catch ({ message }) {
      const messageToDisplay = "saveRatesModalColumn error: " + message.replace("GraphQL error: ", "");
      commit("addNotification", {
        type: messages.DANGER,
        text: messageToDisplay,
      });
    }
  },
  async loadSectionRatesModal({ commit, state }, payload) {
    try {
      const { table = "catRates" } = payload;
      const id = state.subscription_id;

      const tableSettings = {
        catRates: {
          table: "quotation_cat_rates",
          find: CAT_RATE_QUERY,
          findResponse: "getCatRateById",
          err: "Cat Rates",
          filter: RATES.ratesObj,
          commit: "SET_RATES_OBJ",
          reset: "RESET_RATES_OBJ",
        },
        alopTable: {
          table: "quotation_alop_rates",
          find: ALOP_QUERY,
          findResponse: "getAlopById",
          err: "Alop Rates",
          filter: RATES.alopRates,
          commit: "SET_ALOP_OBJ",
          reset: "RESET_ALOP_OBJ",
        },
        catLarge: {
          table: "quotation_cat_large",
          find: CAT_LARGE_QUERY,
          findResponse: "getCatLargeById",
          err: "Cat Large",
          filter: RATES.nonCatLarge,
          commit: "SET_CAT_LARGE_OBJ",
          reset: "RESET_CAT_LARGE_OBJ",
        },
      };

      const { data } = await apolloClient.query({
        query: tableSettings[table].find,
        variables: { id },
        fetchPolicy: "no-cache",
      });

      const response = data[tableSettings[table].findResponse].response;
      const parsedResponse = JSON.parse(response);

      const responseKeys = keysToCamel(parsedResponse[0]);

      const keys = Object.keys(responseKeys);
      const filter = Object.keys(tableSettings[table].filter)
        .filter((key) => keys.includes(key))
        .reduce((obj, key) => {
          obj[key] = responseKeys[key];
          return obj;
        }, {});

      commit(tableSettings[table].commit, filter);
    } catch ({ message }) {
      const messageToDisplay = "loadSectionRatesModal error: " + message.replace("GraphQL error: ", "");
      commit("addNotification", {
        type: messages.DANGER,
        text: messageToDisplay,
      });
    }
  },
  async loadMultipleSectionRatesModal({ commit, state }, payload) {
    try {
      const { table = "catTable" } = payload;
      const id = state.subscription_id;

      const tableSettings = {
        catTable: {
          table: "quotation_cat_table",
          find: CAT_TABLE_QUERY,
          findResponse: "getCatTable",
          err: "Cat Table",
          filter: RATES.catRatesGroup[0],
          commit: "SET_CAT_RATES_GROUP",
          reset: "RESET_CAT_RATES_GROUP",
        },
        nonCatRatesPro: {
          table: "quotation_non_cat_rates_pro",
          find: NON_CAT_RATE_PRO_QUERY,
          findResponse: "getNonCatRatesPro",
          err: "Non Cat Rates",
          filter: RATES.nonRates[0],
          commit: "SET_NON_CAT_RATES_OBJ",
          reset: "RESET_NON_CAT_RATES_OBJ",
        },
      };

      const { data } = await apolloClient.query({
        query: tableSettings[table].find,
        variables: { id },
        fetchPolicy: "no-cache",
      });

      const response = data[tableSettings[table].findResponse].response;
      const parsedResponse = JSON.parse(response);
      const responseKeys = keysToCamel(parsedResponse);

      const mapResponse = responseKeys.map((sectionKeys) => {
        const keys = Object.keys(sectionKeys);
        const filter = Object.keys(tableSettings[table].filter)
          .filter((key) => keys.includes(key))
          .reduce((obj, key) => {
            obj[key] = sectionKeys[key];
            return obj;
          }, {});

        return filter;
      });

      console.log(mapResponse);

      commit(tableSettings[table].commit, mapResponse);
    } catch ({ message }) {
      const messageToDisplay = "loadMultipleSectionRatesModal error: " + message.replace("GraphQL error: ", "");
      commit("addNotification", {
        type: messages.DANGER,
        text: messageToDisplay,
      });
    }
  },
  async addNewFieldModal({ commit, dispatch, state }, payload) {
    try {
      const { table = "catTable" } = payload;
      const id = state.subscription_id;

      const tableSettings = {
        catTable: {
          table: "quotation_cat_table",
          find: CREATE_FIELD_MUTATION,
          findResponse: "addFieldRate",
          err: "Cat Table",
          filter: RATES.catRatesGroup[0],
          commit: "SET_CAT_RATES_GROUP",
          reset: "RESET_CAT_RATES_GROUP",
        },
        nonCatRatesPro: {
          table: "quotation_non_cat_rates_pro",
          find: CREATE_FIELD_MUTATION,
          findResponse: "addFieldRate",
          err: "Non Cat Rates",
          filter: RATES.nonRates[0],
          commit: "SET_NON_CAT_RATES_OBJ",
          reset: "RESET_NON_CAT_RATES_OBJ",
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

      await dispatch("loadMultipleSectionRatesModal", { table });
    } catch ({ message }) {
      const messageToDisplay = "addNewFieldModal error: " + message.replace("GraphQL error: ", "");
      commit("addNotification", {
        type: messages.DANGER,
        text: messageToDisplay,
      });
    }
  },
};
