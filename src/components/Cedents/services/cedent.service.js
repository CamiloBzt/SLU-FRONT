/* api */
import { apolloClient } from '@/lib/api';
import store from '@/store';
/* mutaciones */
import { createCedentDto } from './dtos/create-cedent.dto';
/* constantes */
import messages from '@/constants/messages';

export async function createCedent({ cedentData }) {
  try {
    store.commit('SAVE_CEDENT_DATA', cedentData);
    const variables = { ...cedentData };

    const { data } = await apolloClient.mutate({
      mutation: createCedentDto,
      variables,
      fetchPolicy: 'no-cache',
    });

    const {
      createCedent: { statusCode, response, message, error },
    } = data;

    if (statusCode !== 200) throw new Error(message);

    const notificationMessage = {
      type: messages.SUCCESS,
      text: 'Cedent created!',
    };

    if (cedentData.id && cedentData.id !== 0)
      notificationMessage.text = 'Cedent Updated!';

    store.commit('addNotification', notificationMessage);
    store.commit('RESET_CEDENT_DATA');
  } catch ({ message }) {
    const messageToDisplay = 'createCedent error: ' + message.replace('GraphQL error: ', '');
    store.commit('addNotification', {
      type: messages.DANGER,
      text: messageToDisplay,
    });
  }
}
