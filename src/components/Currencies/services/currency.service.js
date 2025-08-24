/* api */
import { apolloClient } from "@/lib/api";
import store from "@/store";
/* mutaciones */
//import CREATE_CURRENCY_MUTATION from "@/store/actions/mutations/createCurrency";
import { createCurrencyDto } from "./dtos/create-currency.dto";
/* constantes */
import messages from "@/constants/messages";

export async function createCurrency({ currencyInformation }) {
  try {
    store.commit("SAVE_CURRENCY_INFORMATION", currencyInformation);
    const variables = { currency: currencyInformation };
    const { data } = await apolloClient.mutate({
      mutation: createCurrencyDto,
      variables,
      fetchPolicy: "no-cache",
    });

    const {
      createCurrency: { statusCode, response, message, error },
    } = data;

    if (statusCode !== 200) throw new Error(message);

    const notificationMessage = {
      type: messages.SUCCESS,
      text: "Currency created!",
    };

    if (currencyInformation.id && currencyInformation.id !== 0) notificationMessage.text = "Currency Updated!";

    store.commit("addNotification", notificationMessage);
    store.commit("RESET_CURRENCY_INFORMATION");
  } catch ({ message }) {
    const messageToDisplay = "createCurrency error: " + message.replace("GraphQL error: ", "");
    store.commit("addNotification", {
      type: messages.DANGER,
      text: messageToDisplay,
    });
  }
}
