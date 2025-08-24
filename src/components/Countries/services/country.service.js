/* api */
import { apolloClient } from "@/lib/api";
import store from "@/store";
/* mutaciones */
import { createCountryDto } from "./dtos/create-country.dto";

/* constantes */
import messages from "@/constants/messages";


export async function createCountry({ countryInformation }) {
  try {
    store.commit("SAVE_COUNTRY_INFORMATION", countryInformation);
    const variables = { country: countryInformation };

    const { data } = await apolloClient.mutate({
      mutation: createCountryDto,
      variables,
      fetchPolicy: "no-cache",
    });

    const {
      createCountry: { statusCode, message },
    } = data;

    if (statusCode !== 200) throw new Error(message);

    const notificationMessage = {
      type: messages.SUCCESS,
      text: "Country created!",
    };

    if (countryInformation.id && countryInformation.id !== 0)
      notificationMessage.text = "Country Updated!";

    store.commit("addNotification", notificationMessage);
    store.commit("RESET_COUNTRY_INFORMATION");
  } catch ({ message }) {
    const messageToDisplay =
      "createCountry error: " + message.replace("GraphQL error: ", "");
    store.commit("addNotification", {
      type: messages.DANGER,
      text: messageToDisplay,
    });
  }
}
