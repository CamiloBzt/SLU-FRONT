/* api */
import { apolloClient } from '../../lib/api';

/* mutaciones */
import UPDATE_CHANGE_MUTATION from './mutations/updateChange';
import FIELD_ENDORSEMENTS from './mutations/createEndorsementBySubscription';
import NEW_ENDORSEMENT from './mutations/createEndorsement';
import CREATE_ENDORSMENT from './mutations/createEndorsment';
import SAVE_DOCUMENTS from './mutations/saveNewDocument';
import SAVE_DOCUMENT from './mutations/saveDocument';
// addField

/* queries */
import FIND_ENDOSO_QUERY from './queries/findEndorsementBySubscription';
import GET_ENDORSEMENTS from './queries/getEndorsements';

/* constantes */
import messages from '../../constants/messages';
import ENDORSEMENTS from '../../constants/endorsements';

/* utils */
import { toSnakeCase, keysToCamel } from './utils';

export default {
  async saveEndorsementColumn({ commit, state }, payload) {
    try {
      const { table = 'newInsurance', parent, column, id } = payload;
      const tableConditions = {
        newInsurance: 'endorsements_new_insurance',
        increaseInsurable: 'endorsements_increase_insurable',
        reductionOfInsurable: 'endorsements_reduction_insurable',
        movementNoPremium: 'endorsements_movement_no_premium',
        changeOfShare: 'endorsements_change_of_share',
        internalAdjustment: 'endorsements_internal_adjustment',
        summary: 'endorsements_summary',
      };

      const snakeCasedColumn = toSnakeCase(column);
      const before = state[parent];
      const arrindex = before.findIndex((v) => v.id === id);
      const comparison = state[parent][arrindex];

      const variables = {
        tableName: tableConditions[table],
        column: snakeCasedColumn,
        dataValue: String(comparison[column]),
        id: comparison['id'],
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
      const messageToDisplay = 'saveEndorsementColumn error: ' + message.replace('GraphQL error: ', '');
      commit('addNotification', {
        type: messages.DANGER,
        text: messageToDisplay,
      });
    }
  },
  async saveMovement({ state, commit }, payload) {
    try {
      const { table = 'endorsements', parent, column, id } = payload;

      const snakeCasedColumn = toSnakeCase(column);
      const comparison = state[parent][id];
      console.log(comparison[column]);

      if (!comparison[column] && typeof comparison[column] !== 'boolean')
        return;

      const variables = {
        tableName: table,
        column: snakeCasedColumn,
        dataValue: String(comparison[column]),
        id: comparison['id'],
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
      const messageToDisplay = 'saveMovement error: ' + message.replace('GraphQL error: ', '');
      commit('addNotification', {
        type: messages.DANGER,
        text: messageToDisplay,
      });
    }
  },
  async getEndorsementInformation({ commit, state }, table = 'newInsurance') {
    try {
      const settings = {
        find: {
          query: FIND_ENDOSO_QUERY,
          variables: {
            id: state.subscription_id,
            table,
          },
          response: 'findEndorsementBySubscription',
        },
        saving: {
          newInsurance: {
            obj: ENDORSEMENTS.newInsurancePolicy,
            mutation: 'setStateCompleteNewInsurance',
          },
          increaseInsurable: {
            obj: ENDORSEMENTS.increaseInsurableRisk,
            mutation: 'setStateCompleteInsurableRisk',
          },
          reductionOfInsurable: {
            obj: ENDORSEMENTS.reductionOfInsurableValue,
            mutation: 'setStateCompleteReductionOfInsurableValue',
          },
          movementNoPremium: {
            obj: ENDORSEMENTS.movementWithoutPremium,
            mutation: 'setStateCompleteMovementWithoutPremium',
          },
          changeOfShare: {
            obj: ENDORSEMENTS.changeOfShare,
            mutation: 'setStateCompleteChangeOfShare',
          },
          internalAdjustment: {
            obj: ENDORSEMENTS.internalAdjustment,
            mutation: 'setStateCompleteInternalAdjustment',
          },
          summary: {
            obj: ENDORSEMENTS.endorsementsSummary,
            mutation: 'setStateCompleteEndorsementsSummary',
          },
        },
      };

      const findResponse = await apolloClient.query({
        query: settings.find.query,
        variables: settings.find.variables,
        fetchPolicy: 'no-cache',
      });

      const parsedResponse = JSON.parse(
        findResponse.data[settings.find.response].response
      );

      const config = settings.saving[table];
      const responseToCamel = keysToCamel(parsedResponse);
      const tableResponse = responseToCamel;

      const filter = Array.from(tableResponse).map((obj) => {
        if (obj['movementEndDate'])
          obj['movementEndDate'] = new Date(obj['movementEndDate'])
            .toISOString()
            .split('T')[0];
        if (obj['effectiveDateMovement'])
          obj['effectiveDateMovement'] = new Date(obj['effectiveDateMovement'])
            .toISOString()
            .split('T')[0];
        if (obj['premiumPaymentDate'])
          obj['premiumPaymentDate'] = new Date(obj['premiumPaymentDate'])
            .toISOString()
            .split('T')[0];

        return obj;
      });

      commit(config.mutation, filter);
    } catch ({ message }) {
      const messageToDisplay = 'getEndorsementInformation error: ' + message.replace('GraphQL error: ', '');
      commit('addNotification', {
        type: messages.DANGER,
        text: messageToDisplay,
      });
    }
  },
  async getEndorsements({ commit, state }) {
    try {
      const queryResponse = 'getEndorsements';
      const findResponse = await apolloClient.query({
        query: GET_ENDORSEMENTS,
        variables: { id: state.subscription_id },
        fetchPolicy: 'no-cache',
      });

      const { data } = findResponse;
      const { statusCode, response } = data[queryResponse];

      if (statusCode !== 200)
        throw new Error('Error while fetching endorsements');

      const parsedResponse = JSON.parse(response);
      commit('setEndorsements', keysToCamel(parsedResponse));
    } catch ({ message }) {
      const messageToDisplay = 'getEndorsements error: ' + message.replace('GraphQL error: ', '');
      commit('addNotification', {
        type: messages.DANGER,
        text: messageToDisplay,
      });
    }
  },
  async addFieldEndorsements({ commit, state, dispatch }) {
    try {
      await apolloClient.query({
        query: NEW_ENDORSEMENT,
        variables: { id: state.subscription_id },
        fetchPolicy: 'no-cache',
      });

      await dispatch('getEndorsements');
    } catch ({ message }) {
      const messageToDisplay = 'addFieldEndorsements error: ' + message.replace('GraphQL error: ', '');
      commit('addNotification', {
        type: messages.DANGER,
        text: messageToDisplay,
      });
    }
  },

 /**
 * The function takes an object with properties 
 * subscription_id, endorsment_type, damage, BI,
 * Stocks, exprired_date, percentaje
 * and returns an object with properties 
 * message, response and statusCode.
 * 
 * @param {object} object - The object with properties subscription_id, endorsment_type, damage, BI, Stocks, exprired_date, percentaje.
 * @returns {object} object - The response object with properties message, response and statusCode.
 */
  async createEndorsment(
		{ commit, state },
		{
      subscription_id,
      endorsment_type,
      damage,
      BI,
      Stocks,
      exprired_date,
      percentaje
		}
	) {
		try {
			const { data } = await apolloClient.mutate({
				mutation: CREATE_ENDORSMENT,
				variables: {
					data:{
            subscription_id,
            endorsment_type,
            damage,
            BI,
            Stocks,
            exprired_date,
            percentaje
          }
				},
				fetchPolicy: 'no-cache',
			});
			return data['createEndorsment'];
		} catch (message) {
			const messageToDisplay = 'createEndorsment error: ' + message.replace('GraphQL error: ', '');
			commit('addNotification', {
				type: messages.DANGER,
				text: messageToDisplay,
			});
		}
	},
  async saveNewDocumentEndorsement (
    { state, commit, dispatch },
    { document_id, subscription_id, type, docS3 }
  ) {
    try {
      const {
        data: { saveNewDocument },
      } = await apolloClient.mutate({
        mutation: SAVE_DOCUMENTS,
        variables: {
          document: {
            type: state.endorsmentType,
            doc_s3: docS3,
          },
        },
        fetchPolicy: 'no-cache',
      });
      const { statusCode, message, response } = saveNewDocument;
      if (statusCode != 200)
        throw new Error(`Failed upload document file: ${message}`);
      const parsedResponse = JSON.parse(response);
      const doc_s3 = parsedResponse.doc_s3;
      commit('set_upload_document', { document: doc_s3 });
    } catch ({ message }) {
      const messageToDisplay = 'Save new doc error: ' + message.replace('GraphQL error: ', '');
      commit('addNotification', {
        type: messages.DANGER,
        text: messageToDisplay,
      });
    }
  },
  async savedocumentEndorsement (
    { commit, dispatch },
    { document_id, subscription_id, type, docS3 }
  ) {
    try {
      const {
        data: { saveDocument },
      } = await apolloClient.mutate({
        mutation: SAVE_DOCUMENT,        
        variables: {
          document: {
            document_id: document_id,
            type: type,
            subscription_id: subscription_id,
            doc_s3: docS3,
          },
        },
        fetchPolicy: 'no-cache',
      });
      const { statusCode, message, response } = saveDocument;
      if (statusCode != 200)
        throw new Error(`Failed upload document file: ${message}`);
      const parsedResponse = JSON.parse(response);
      const doc_s3 = parsedResponse.doc_s3;
      commit('set_upload_document', { document: doc_s3 });
    } catch ({ message }) {
      const messageToDisplay = 'Save doc errorsss: ' + message.replace('GraphQL error: ', '');
      commit('addNotification', {
        type: messages.SUCCESS,
        text: messageToDisplay,
      });
    }
  },
  saveEndorsmentType ({state}, endorsmentType) {
    state.endorsmentType = endorsmentType
  }
};
