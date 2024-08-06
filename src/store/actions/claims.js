/* api */
import { apolloClient } from '../../lib/api';

/* gql */
import { closeClaim as closeClaimMutation } from './graphql/claims';

/* mutaciones */
import UPDATE_CHANGE_MUTATION from './mutations/updateClaim';
import CREATE_CLAIM_MUTATION from './mutations/createClaim';

/* queries */
import FIND_BOUND_QUERY from './queries/findInformationByBoundId';
import FIND_CLAIM_QUERY from './queries/getClaimSelected';
import GET_CLAIMS_QUERY from './queries/getClaimsList';
import getAllClaimsHistoryQuery from './queries/getClaimsHistoryList';

/* constantes */
import messages from '../../constants/messages';

/* utils */
import { setItemInStorage } from './utils';

export default {
  async getClaims({ commit }) {
    try {
      const config = { response: 'getClaimsList' };
      const prefetch = await apolloClient.query({
        query: GET_CLAIMS_QUERY,
        fetchPolicy: 'no-cache',
      });
      const data = prefetch['data'][config.response];
      const { statusCode, response, message, error } = data;
      if (statusCode !== 200) throw new Error(message || error);

      const parsedResponse = response;
      commit('SET_CLAIMS_LIST', { payload: Array.from(parsedResponse) });
    } catch ({ message }) {
      const messageToDisplay = 'getClaims error: ' + message.replace('GraphQL error: ', '');
      commit('addNotification', {
        type: messages.DANGER,
        text: messageToDisplay,
      });
    }
  },
  async getBoundInformationA({ commit }, boundId) {
    try {
      const { data: findInformationByBoundId } = await apolloClient.query({
        query: FIND_BOUND_QUERY,
        variables: {
          boundId,
        },
        fetchPolicy: 'no-cache',
      });
      if (
        findInformationByBoundId['findInformationByBoundId']['statusCode'] ===
        200
      ) {
        commit(
          'setClaimInformation',
          findInformationByBoundId['findInformationByBoundId']['response']
        );
      }
    } catch ({ message }) {
      const messageToDisplay = 'getBoundInformationA error: ' + message.replace('GraphQL error: ', '');
      commit('addNotification', {
        type: messages.DANGER,
        text: messageToDisplay,
      });
    }
  },
  async getBoundSelected({ commit }, item) {
    try {
      const { data: findInformationByBoundId } = await apolloClient.query({
        query: FIND_BOUND_QUERY,
        variables: {
          boundId: item.referenceSub,
        },
        fetchPolicy: 'no-cache',
      });
      if (
        findInformationByBoundId['findInformationByBoundId']['statusCode'] ===
        200
      ) {
        commit(
          'setClaimInformation',
          findInformationByBoundId['findInformationByBoundId']['response']
        );
        commit('setSelectedBound', {
          ...item,
          ...findInformationByBoundId['findInformationByBoundId'][
            'response'
          ][0],
        });
      }
    } catch ({ message }) {
      const messageToDisplay = 'getBoundSelected error: ' + message.replace('GraphQL error: ', '');
      commit('addNotification', {
        type: messages.DANGER,
        text: messageToDisplay,
      });
    }
  },
  async getClaimSelected({ commit, state }, claimId) {
    try {
      const { data: getClaimSelected } = await apolloClient.query({
        query: FIND_CLAIM_QUERY,
        variables: {
          id: claimId,
        },
        fetchPolicy: 'no-cache',
      });

      if (getClaimSelected['getClaimSelected']['statusCode'] === 200) {
        commit(
          'setSelectedBound',
          getClaimSelected['getClaimSelected']['response']
        );
      }

      const { subscriptionId } = getClaimSelected['getClaimSelected'][
        'response'
      ];
      commit('SET_SUBSCRIPTION_INFO', { subscription_id: subscriptionId });
      setItemInStorage('subscriptionData', 'subscriptionId', subscriptionId);
    } catch ({ message }) {
      const messageToDisplay = 'getClaimSelected error: ' + message.replace('GraphQL error: ', '');
      commit('addNotification', {
        type: messages.DANGER,
        text: messageToDisplay,
      });
    }
  },
  async createNewClaim({ state, commit }, body) {
    try {
      const variables = {
        ...body,
        subscriptionId: state.claims.selected.subscriptionId,
        referenceSub: state.claims.selected.reference,
        dateSubscription: state.claims.selected.createdAt,
      };
      const { data } = await apolloClient.mutate({
        mutation: CREATE_CLAIM_MUTATION,
        variables,
        fetchPolicy: 'no-cache',
      });
      commit('SET_CLAIM_CREATED', data.createNewClaim.response);
      commit('addNotification', {
        type: messages.SUCCESS,
        text: 'Claim created!',
      });
    } catch ({ message }) {
      const messageToDisplay = 'createNewClaim error: ' + message.replace('GraphQL error: ', '');
      commit('addNotification', {
        type: messages.DANGER,
        text: messageToDisplay,
      });
    }
  },
  async updateClaim({ state, commit }, body) {
    try {
      const variables = {
        ...body,
      };
      const { data } = await apolloClient.mutate({
        mutation: UPDATE_CHANGE_MUTATION,
        variables,
        fetchPolicy: 'no-cache',
      });
    } catch ({ message }) {
      const messageToDisplay = 'updateClaim error: ' + message.replace('GraphQL error: ', '');
      commit('addNotification', {
        type: messages.DANGER,
        text: messageToDisplay,
      });
    }
  },
  async closeClaim({ commit }, { subscription_id, reason }) {
    try {
      await apolloClient.mutate({
        mutation: closeClaimMutation,
        variables: { subscription_id, reason },
        fetchPolicy: 'no-cache',
      });
    } catch ({ message }) {
      const messageToDisplay = 'closeClaim error: ' + message.replace('GraphQL error: ', '');
      commit('addNotification', {
        type: messages.DANGER,
        text: messageToDisplay,
      });
    }
  },
  async getClaimsHistoryList({ commit }, payload) {
    try {
      const { limit, offset, query1, query2, filterOrderBy = [['s.id', 'desc']], filterSearch1 = 's.reference', filterSearch2 = 's.reference' } = payload;

      const {
        data: { getClaimsHistoryList },
      } = await apolloClient.query({
        query: getAllClaimsHistoryQuery,
        variables: {
          limit,
          offset,
          query1,
          query2,
          filterOrderBy,
          filterSearch1,
          filterSearch2,
        },
        fetchPolicy: 'no-cache',
      });
      const { statusCode, message, response } = getClaimsHistoryList;

      if (statusCode != 200) throw new Error(`Failed fetching data: ${message}`);

      commit('setClaimsHistory', response);
      commit('setClaimsHistoryPagination', payload);
    } catch ({ message }) {
      const messageToDisplay = 'getClaimsHistoryList error: ' + message.replace('GraphQL error: ', '');
      commit('addNotification', {
        type: messages.DANGER,
        text: messageToDisplay,
      });
    }
  },
};
