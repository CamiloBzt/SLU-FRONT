/* api */
import { apolloClient } from "@/lib/api";
import store from "@/store";
/* mutaciones */
import CREATE_LINE_OF_RISK_MUTATION from "@/store/actions/mutations/createLineOfRisk";
/* constantes */
import messages from "@/constants/messages";

export async function createLineOfRisk({ lineOfRiskInformation }) {
  try {
    store.commit("SAVE_LINE_OF_RISK_INFORMATION", lineOfRiskInformation);
    const variables = { ...lineOfRiskInformation };

    const { data } = await apolloClient.mutate({
      mutation: CREATE_LINE_OF_RISK_MUTATION,
      variables,
      fetchPolicy: "no-cache",
    });

    const {
      createLineOfRisk: { statusCode, response, message, error },
    } = data;

    if (statusCode !== 200) throw new Error(message);

    const notificationMessage = {
      type: messages.SUCCESS,
      text: "Line of Risk created!",
    };

    if (lineOfRiskInformation.id && lineOfRiskInformation.id !== 0)
      notificationMessage.text = "Line of Risk Updated!";

    store.commit("addNotification", notificationMessage);
    store.commit("RESET_LINE_OF_RISK_INFORMATION");
  } catch ({ message }) {
    const messageToDisplay =
      "createLineOfRisk error: " + message.replace("GraphQL error: ", "");
    store.commit("addNotification", {
      type: messages.DANGER,
      text: messageToDisplay,
    });
  }
}
