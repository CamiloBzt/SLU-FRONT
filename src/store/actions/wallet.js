/* api */
import { apolloClient } from '../../lib/api';
import addWalletPayment from './mutations/addWalletPayment';
import getWalletSubscriptionQuery from './queries/getWalletSubscription';
export default {
  async fieldWalletPayment({ state, commit }, { pay, field }) {
    try {
      const variables = {
        pay: pay,
        field: field,
        subscriptionId: state.subscription_id,
      };

      const { data } = await apolloClient.mutate({
        mutation: addWalletPayment,
        variables,
        fetchPolicy: 'no-cache',
      });
    } catch ({ message }) {
      console.log(message);
      const messageToDisplay = 'fieldWalletPayment error: ' + message.replace('GraphQL error: ', '');
      commit('addNotification', {
        type: messages.DANGER,
        text: messageToDisplay,
      });
    }
  },
  async getInstallment({ commit, state }) {
    try {
      const { subscription_id } = state;
      const variables = {
        subscriptionId: subscription_id,
      };

      const {
        data: { getWalletSubscription },
      } = await apolloClient.query({
        query: getWalletSubscriptionQuery,
        variables,
        fetchPolicy: 'no-cache',
      });

      const { statusCode, response, message, error } = getWalletSubscription;
      if (statusCode !== 200) throw new Error(`Cannot get wallet payment: ${message}, ${error}`);
      const checkPayment = JSON.parse(response);
      commit('saveCheckPaymentInformation', checkPayment[0] || []);
      return response;
    } catch ({ message }) {
      const messageToDisplay = 'getInstallment error: ' + message.replace('GraphQL error: ', '');
      commit('addNotification', {
        type: messages.DANGER,
        text: messageToDisplay,
      });
    }
  },
};
