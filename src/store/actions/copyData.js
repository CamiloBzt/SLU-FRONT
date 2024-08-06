/* api */
import { apolloClient } from '../../lib/api';

/* mutaciones */
import COPY_SUBSCRIPTION_MUTATION from './mutations/copySubscription';
import RENEW_SUBSCRIPTION_MUTATION from './mutations/renewalSubscription';

/* queries */
import FIND_QUOTATION_QUERY from './queries/findQuotationBySubscription';

/* constantes */
import messages from '../../constants/messages';
import QUOTATION from '../../constants/quotation';

/* utils */
import { toSnakeCase, keysToCamel } from './utils';

/* store */
import $router from '../../router';

export default {
  async createCopyAccount({ commit, state }, section = 'submission') {
    try {
      const variables = { subscriptionId: state.subscription_id, section };
      const { data } = await apolloClient.mutate({
        mutation: COPY_SUBSCRIPTION_MUTATION,
        variables,
        fetchPolicy: 'no-cache',
      });

      const { statusCode, response } = data['copySubscription'];
      if (statusCode !== 200) throw new Error('Error Copy Account');

      const parsedResponse = JSON.parse(response);

      $router.push({
        name: 'Edit Subs submission',
        params: { subscriptionId: parsedResponse.submission.subscription_id }
      });

      commit('addNotification', {
        type: messages.SUCCESS,
        text: 'Copied Account!',
      });
    } catch ({ message }) {
      const messageToDisplay = 'createCopyAccount error: ' + message.replace('GraphQL error: ', '');
      commit('addNotification', {
        type: messages.DANGER,
        text: messageToDisplay,
      });
    }
  },
  async createRenewalAccount({ commit, state }, payload) {
    try {
      const { section = 'bound', id } = payload
      const variables = { subscriptionId: id, section };
      const { data } = await apolloClient.mutate({
        mutation: RENEW_SUBSCRIPTION_MUTATION,
        variables,
        fetchPolicy: 'no-cache',
      });

      const { statusCode, response } = data['renewalSubscription'];
      if (statusCode !== 200) throw new Error('Error on Renewal Account');

      const parsedResponse = JSON.parse(response);

      $router.push({
        name: 'Edit Subs submission',
        params: { subscriptionId: parsedResponse.submission.subscription_id }
      });

      commit('addNotification', {
        type: messages.SUCCESS,
        text: 'Renewal Account Success!',
      });
    } catch ({ message }) {
      const messageToDisplay = 'createRenewalAccount error: ' + message.replace('GraphQL error: ', '');
      commit('addNotification', {
        type: messages.DANGER,
        text: messageToDisplay,
      });
    }
  },
};
