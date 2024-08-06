/* api */
import { apolloClient } from '../../lib/api';

/* mutations & queries */
import {
  getLayers as queryGetLayers,
  createLayer as mutationCreateLayer,
  checkLayer as mutationCheckLayer,
  updateLayer as mutationUpdateLayer,
} from './graphql/layers';

/* constantes */
import messages from '../../constants/messages';

/* utils */
import { toSnakeCase, keysToCamel } from './utils';

export default {
  async createLayer({ commit, state }) {
    try {
      const { subscription_id } = state;
      const create = await apolloClient.mutate({
        mutation: mutationCreateLayer,
        variables: {
          subscription_id,
        },
        fetchPolicy: 'no-cache',
      });

      const { data } = create;
      const { statusCode } = data['createLayer'];

      if (statusCode !== 200) throw new Error('Error creating new Layer');
    } catch (e) {
      console.error(e);
      const { message } = e;
      const messageToDisplay = 'createLayer error: ' + message.replace('GraphQL error: ', '');
      commit('addNotification', {
        type: messages.DANGER,
        text: messageToDisplay,
      });
    }
  },
  async getLayers({ commit, state }) {
    try {
      const { subscription_id } = state;
      const create = await apolloClient.query({
        query: queryGetLayers,
        variables: {
          subscription_id,
        },
        fetchPolicy: 'no-cache',
      });

      const { data } = create;
      const { statusCode, response: beforeParsing } = data['getLayers'];

      if (statusCode !== 200) throw new Error('Error fetching Layers');

      const response = JSON.parse(beforeParsing);
      commit('commitLayers', keysToCamel(response));
    } catch (e) {
      console.error(e);
      const { message } = e;
      const messageToDisplay = 'getLayers error: ' + message.replace('GraphQL error: ', '');
      commit('addNotification', {
        type: messages.DANGER,
        text: messageToDisplay,
      });
    }
  },
  async updateLayer({ commit, state }, { id, column }) {
    try {
      const snakeCasedColumn = toSnakeCase(column);
      const findItem = Array.from(state.layersArray).find(v => v.id === id);
      const comparison = column === 'active' ? false : findItem[column];

      const variables = {
        column: snakeCasedColumn,
        value: String(comparison),
        id,
      };

      const { data } = await apolloClient.mutate({
        mutation: mutationUpdateLayer,
        variables,
        fetchPolicy: 'no-cache',
      });

      const { statusCode } = data['updateLayer'];

      if (statusCode !== 200)
        throw new Error('Error updating Layer Column');
    } catch (e) {
      console.error(e);
      const { message } = e;
      const messageToDisplay = 'updateLayer error: ' + message.replace('GraphQL error: ', '');
      commit('addNotification', {
        type: messages.DANGER,
        text: messageToDisplay,
      });
    }
  },
  async checkLayer({ commit, state }, { id }) {
    try {
      const { subscription_id } = state;
      const { data } = await apolloClient.mutate({
        mutation: mutationCheckLayer,
        variables: { id, subscription_id },
        fetchPolicy: 'no-cache',
      });

      const { statusCode } = data['checkLayer'];

      if (statusCode !== 200) throw new Error('Error checking Layer');
    } catch (e) {
      console.error(e);
      const { message } = e;
      const messageToDisplay = 'checkLayer error: ' + message.replace('GraphQL error: ', '');
      commit('addNotification', {
        type: messages.DANGER,
        text: messageToDisplay,
      });
    }
  },
};
