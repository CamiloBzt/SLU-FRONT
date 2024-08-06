/* api */
import { apolloClient } from '../../lib/api';

/* mutaciones */
import ADD_FACULTATIVE_MUTATION from './mutations/addFacultative';

/* queries */
/* ... */

/* constantes */
import messages from '../../constants/messages';

export default {
  async addFacultative({ commit }, { subscription_id, risk_analisis }) {
    try {
      const variables = {
        risk_analisis,
        subscription_id
      }

      const { data } = await apolloClient.mutate({
        mutation: ADD_FACULTATIVE_MUTATION,
        variables,
        fetchPolicy: 'no-cache',
      })

      const { statusCode, response } = data.addFacultative
      const res = JSON.parse(response)

      if (statusCode !== 200) throw new Error('Error')
      // No enviar mensaje ya que se crea junto con bound
      // if (res.reference) {
      //   commit('addNotification', {
      //     type: messages.SUCCESS,
      //     text: `${res.reference} created!`,
      //   })
      // } else {
      //   commit('addNotification', {
      //     type: messages.WARNING,
      //     text: res.message,
      //   })
      // }

      return res
    } catch ({ message }) {
      const messageToDisplay = 'addFacultative error: ' + message.replace('GraphQL error: ', '')

      commit('addNotification', {
        type: messages.DANGER,
        text: messageToDisplay,
      })
    }
  },
};
