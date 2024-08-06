/* api */
import { apolloClient } from '@/lib/api';
import store from '@/store';
/* mutaciones */
import { createBrokerDto } from './dtos/create-broker.dto';
/* constantes */
import messages from '@/constants/messages';

export async function createBroker({ brokerInformation }) {
  try {
    store.commit('SAVE_BROKER_INFORMATION', brokerInformation);
    const variables = { ...brokerInformation };

    const { data } = await apolloClient.mutate({
      mutation: createBrokerDto,
      variables,
      fetchPolicy: 'no-cache',
    });

    const {
      createBroker: { statusCode, response, message, error },
    } = data;

    if (statusCode !== 200) throw new Error(message);

    const notificationMessage = {
      type: messages.SUCCESS,
      text: 'Broker created!',
    };

    if (brokerInformation.id && brokerInformation.id !== 0)
      notificationMessage.text = 'Broker Updated!';

    store.commit('addNotification', notificationMessage);
    store.commit('RESET_BROKER_INFORMATION');
  } catch ({ message }) {
    const messageToDisplay = 'createBroker error: ' + message.replace('GraphQL error: ', '');
    store.commit('addNotification', {
      type: messages.DANGER,
      text: messageToDisplay,
    });
  }
}
