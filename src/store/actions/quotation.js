/* api */
import { apolloClient } from '../../lib/api';

/* mutaciones */
import UPDATE_CHANGE_MUTATION from './mutations/updateChange';
import CREATE_TO_BE_DEFINED_MUTATION from './mutations/createToBeDefined';

/* queries */
import FIND_QUOTATION_QUERY from './queries/findQuotationBySubscription';
import QUOTATION_COLUMN_QUERY from './queries/getQuotationColumn';
import GET_INSURABLE from './queries/getInsurable';
import GET_TO_BE_DEFINED_QUERY from './queries/getToBeDefinedBySubscriptionId';

/* constantes */
import messages from '../../constants/messages';
import QUOTATION from '../../constants/quotation';

/* utils */
import { toSnakeCase, keysToCamel } from './utils';

export default {
  async saveQuotationColumn(
    { commit, state },
    { table = 'quotation', parent, column }
  ) {
    try {
      const tableConditions = {
        quotation: 'quotation',
        insurable: 'quotation_insurable',
        premium: 'quotation_premium',
        tobe: 'quotation_to_be_defined',
        insured: 'quotation_insured',
      };
      const findResponse = await apolloClient.query({
        query: FIND_QUOTATION_QUERY,
        variables: {
          id: state.subscription_id,
          type: state.quotation.typeQuotation,
        },
        fetchPolicy: 'no-cache',
      });

      const response = JSON.parse(
        findResponse.data['findQuotationBySubscription'].response
      );

      const { id } = response[table];
      const snakeCasedColumn = toSnakeCase(column);

      const comparison = state[parent][column];


      const variables = {
        tableName: tableConditions[table],
        column: snakeCasedColumn,
        dataValue: String(comparison),
        id,
      };

      const { data } = await apolloClient.mutate({
        mutation: UPDATE_CHANGE_MUTATION,
        variables,
        fetchPolicy: 'no-cache',
      });
      const { statusCode } = data['updateChange'];

      if (statusCode !== 200)
        throw new Error('Error creating/updating Quotation Column');
    } catch ({ message }) {
      const messageToDisplay = 'saveQuotationColumn error: ' + message.replace('GraphQL error: ', '');
      commit('addNotification', {
        type: messages.DANGER,
        text: messageToDisplay,
      });
    }
  },
  async getQuotationInformation({ commit, state }) {
    try {
      const findResponse = await apolloClient.query({
        query: FIND_QUOTATION_QUERY,
        variables: {
          id: state.subscription_id,
          type: state.quotation.typeQuotation,
        },
        fetchPolicy: 'no-cache',
      });

      const parsedResponse = JSON.parse(
        findResponse.data['findQuotationBySubscription'].response
      );
      const responseToCamel = keysToCamel(parsedResponse);

      const data = responseToCamel;
      const { quotation, insurable, premium, tobe, insured } = data;

      const quotationKeys = Object.keys(quotation);

      const filterFirst = Object.keys(QUOTATION.quotation)
        .filter(key => quotationKeys.includes(key))
        .reduce((obj, key) => {
          obj[key] = quotation[key];
          if (key === 'inceptionDate' || key === 'expiryDate')
            obj[key] = new Date(quotation[key]).toISOString().split('T')[0];
          return obj;
        }, {});

      /* special options */
      const item = state.currencies.find(
        item => item.id === state.accountInformation.currency
      );
      if (item) filterFirst['currency'] = item.key;

      const filterSecond = Object.keys(QUOTATION.deductions)
        .filter(key => quotationKeys.includes(key))
        .reduce((obj, key) => {
          obj[key] = quotation[key];
          return obj;
        }, {});

      commit('setStateCompleteQuotation', filterFirst);
      commit('setStateCompleteDeductions', filterSecond);

      const valids = [1, '1'];
      if (valids.includes(state.quotation.typeQuotation)) {
        const insurableKeys = Object.keys(insurable);
        const premiumKeys = Object.keys(premium);
        const tobeKeys = Object.keys(tobe);

        const filterThird = Object.keys(QUOTATION.premium)
          .filter(key => premiumKeys.includes(key))
          .reduce((obj, key) => {
            obj[key] = premium[key];
            return obj;
          }, {});

        const filterFourth = Object.keys(QUOTATION.tiv)
          .filter(key => insurableKeys.includes(key))
          .reduce((obj, key) => {
            obj[key] = insurable[key];
            return obj;
          }, {});

        const filterFifth = Object.keys(QUOTATION.toBeDefined)
          .filter(key => tobeKeys.includes(key))
          .reduce((obj, key) => {
            obj[key] = tobe[key];
            return obj;
          }, {});

        commit('setStateCompletePremium', filterThird);
        commit('setStateCompleteInsurable', filterFourth);
        commit('setStateCompleteTobe', filterFifth);
      } else {
        const insuredKeys = Object.keys(insured);

        const filterSixth = Object.keys(QUOTATION.tivNon)
          .filter(key => insuredKeys.includes(key))
          .reduce((obj, key) => {
            obj[key] = insured[key];
            return obj;
          }, {});

        const filterSeventh = Object.keys(QUOTATION.premiumNon)
          .filter(key => insuredKeys.includes(key))
          .reduce((obj, key) => {
            obj[key] = insured[key];
            return obj;
          }, {});

        const filterEight = Object.keys(QUOTATION.premium)
          .filter(key => insuredKeys.includes(key))
          .reduce((obj, key) => {
            obj[key] = insured[key];
            return obj;
          }, {});

        commit('setStateCompleteTIVNON', filterSixth);
        commit('setStateCompletePremiumNON', filterSeventh);
        commit('setStateCompletePremium', filterEight);
      }
    } catch (e) {
      const { message } = e;
      console.error(e);
      const messageToDisplay = 'getQuotationInformation error: ' + message.replace('GraphQL error: ', '');
      commit('addNotification', {
        type: messages.DANGER,
        text: messageToDisplay,
      });
    }
  },
  async getQuotationInformationById({ commit, state }, id) {
    try {
      const findResponse = await apolloClient.query({
        query: FIND_QUOTATION_QUERY,
        variables: {
          id: id,
          type: state.quotation.typeQuotation,
        },
        fetchPolicy: 'no-cache',
      });

      console.log('//////////////////////////', id, findResponse)

      const parsedResponse = JSON.parse(
        findResponse.data['findQuotationBySubscription'].response
      );
      const responseToCamel = keysToCamel(parsedResponse);

      const data = responseToCamel;
      const { quotation, insurable, premium, tobe, insured } = data;

      const quotationKeys = Object.keys(quotation);

      const filterFirst = Object.keys(QUOTATION.quotation)
        .filter(key => quotationKeys.includes(key))
        .reduce((obj, key) => {
          obj[key] = quotation[key];
          if (key === 'inceptionDate' || key === 'expiryDate')
            obj[key] = new Date(quotation[key]).toISOString().split('T')[0];
          return obj;
        }, {});

      /* special options */
      const item = state.currencies.find(
        item => item.id === state.accountInformation.currency
      );
      if (item) filterFirst['currency'] = item.key;

      const filterSecond = Object.keys(QUOTATION.deductions)
        .filter(key => quotationKeys.includes(key))
        .reduce((obj, key) => {
          obj[key] = quotation[key];
          return obj;
        }, {});

      commit('setStateCompleteQuotation', filterFirst);
      commit('setStateCompleteDeductions', filterSecond);

      const valids = [1, '1'];
      if (valids.includes(state.quotation.typeQuotation)) {
        const insurableKeys = Object.keys(insurable);
        const premiumKeys = Object.keys(premium);
        const tobeKeys = Object.keys(tobe);

        const filterThird = Object.keys(QUOTATION.premium)
          .filter(key => premiumKeys.includes(key))
          .reduce((obj, key) => {
            obj[key] = premium[key];
            return obj;
          }, {});

        const filterFourth = Object.keys(QUOTATION.tiv)
          .filter(key => insurableKeys.includes(key))
          .reduce((obj, key) => {
            obj[key] = insurable[key];
            return obj;
          }, {});

        const filterFifth = Object.keys(QUOTATION.toBeDefined)
          .filter(key => tobeKeys.includes(key))
          .reduce((obj, key) => {
            obj[key] = tobe[key];
            return obj;
          }, {});

        commit('setStateCompletePremium', filterThird);
        commit('setStateCompleteInsurable', filterFourth);
        commit('setStateCompleteTobe', filterFifth);
      } else {
        const insuredKeys = Object.keys(insured);

        const filterSixth = Object.keys(QUOTATION.tivNon)
          .filter(key => insuredKeys.includes(key))
          .reduce((obj, key) => {
            obj[key] = insured[key];
            return obj;
          }, {});

        const filterSeventh = Object.keys(QUOTATION.premiumNon)
          .filter(key => insuredKeys.includes(key))
          .reduce((obj, key) => {
            obj[key] = insured[key];
            return obj;
          }, {});

        const filterEight = Object.keys(QUOTATION.premium)
          .filter(key => insuredKeys.includes(key))
          .reduce((obj, key) => {
            obj[key] = insured[key];
            return obj;
          }, {});

        commit('setStateCompleteTIVNON', filterSixth);
        commit('setStateCompletePremiumNON', filterSeventh);
        commit('setStateCompletePremium', filterEight);
      }
    } catch (e) {
      const { message } = e;
      console.error(e);
      const messageToDisplay = 'getQuotationInformationById error: ' + message.replace('GraphQL error: ', '');
      commit('addNotification', {
        type: messages.DANGER,
        text: messageToDisplay,
      });
    }
  },

  async getToBeDefinedBySubscriptionId({ commit }, subscriptionId) {
    try {
      const findResponse = await apolloClient.query({
        query: GET_TO_BE_DEFINED_QUERY,
        variables: {
          subscriptionId
        },
        fetchPolicy: 'no-cache',
      });

      const parsedResponse = JSON.parse(
        findResponse.data['getToBeDefinedBySubscriptionId'].response
      );
      const responseToCamel = keysToCamel(parsedResponse);
      return responseToCamel
    } catch (e) {
      const { message } = e;
      console.error(e);
      const messageToDisplay = 'getToBeDefinedBySubscriptionId error: ' + message.replace('GraphQL error: ', '');
      commit('addNotification', {
        type: messages.DANGER,
        text: messageToDisplay,
      });
    }
  },
  
  async createToBeDefined({ commit, state }, payload) {
    try {
      const variables = {
        id: state.subscription_id,
        ...payload,
      };

      const { data } = await apolloClient.mutate({
        mutation: CREATE_TO_BE_DEFINED_MUTATION,
        variables,
        fetchPolicy: 'no-cache',
      });

      const { statusCode, response } = data['createToBeDefined'];
      if (statusCode !== 200)
        throw new Error('Error while creating To Be Defined');

      const parsedResponse = JSON.parse(response);
      /* comentario para pull request xd */

      commit('addNotification', {
        type: messages.SUCCESS,
        text: 'To Be Defined has been created',
      });

      /* reset commits */
    } catch ({ message }) {
      const messageToDisplay = 'createToBeDefined error: ' + message.replace('GraphQL error: ', '');
      commit('addNotification', {
        type: messages.DANGER,
        text: messageToDisplay,
      });
    }
  },
  async updateQuotationType({ commit, state }, type) {
    try {
      const findResponse = await apolloClient.query({
        query: FIND_QUOTATION_QUERY,
        variables: { id: state.subscription_id },
        fetchPolicy: 'no-cache',
      });

      const response = JSON.parse(
        findResponse.data['findQuotationBySubscription'].response
      );

      const column = 'typeQuotation';
      commit('setStateQuotation', { key: column, value: type });

      const { id } = response['quotation'];
      const snakeCasedColumn = toSnakeCase(column);
      const dataValue = state.quotation[column];

      const variables = {
        tableName: 'quotation',
        column: snakeCasedColumn,
        dataValue: String(dataValue),
        id,
      };

      const { data } = await apolloClient.mutate({
        mutation: UPDATE_CHANGE_MUTATION,
        variables,
        fetchPolicy: 'no-cache',
      });

      const { statusCode } = data['updateChange'];

      if (statusCode !== 200)
        throw new Error('Error creating/updating Quotation Column');
    } catch ({ message }) {
      const messageToDisplay = 'updateQuotationType error: ' + message.replace('GraphQL error: ', '');
      commit('addNotification', {
        type: messages.DANGER,
        text: messageToDisplay,
      });
    }
  },
  async getQuotationColumnData(
    { commit, state },
    { table = 'quotation', column, subscriptionId = state.subscription_id }
  ) {
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
        fetchPolicy: 'no-cache',
      });

      const { statusCode, response } = getQuotationColumn;
      if (statusCode !== 200)
        throw new Error('Error fetching quotation column');

      const parsedResponse = JSON.parse(response);
      return parsedResponse[column];
    } catch ({ message }) {
      const messageToDisplay = 'getQuotationColumnData error: ' + message.replace('GraphQL error: ', '');
      commit('addNotification', {
        type: messages.DANGER,
        text: messageToDisplay,
      });
    }
  },

  /**
 * The function takes an object with properties 
 * id (subscription's id) and type (endorsement type) 
 * and returns an object with properties 
 * message, response and statusCode.
 * 
 * @param {object} object - The object with properties id (subscription's id) and type (endorsement type).
 * @returns {object} object - The response object with properties message, response and statusCode.
 */
  async getInsurable({ commit }, {id, type}) {
		try {
			const { data } = await apolloClient.query({
				query: GET_INSURABLE,
				variables: {
					id,
          type
				},
			});

			return data['getInsurable'];
		} catch (message) {
			const messageToDisplay = 'getInsurable error: ' + message.replace('GraphQL error: ', '');
			commit('addNotification', {
				type: messages.DANGER,
				text: messageToDisplay,
			});
		}
	},

};
