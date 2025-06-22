/* api */
import { apolloClient } from "@/lib/api";
import store from "@/store";
/* mutaciones */
import CREATE_ACTIVITY_MUTATION from "@/store/actions/mutations/createActivity";
/* constantes */
import messages from "@/constants/messages";

export async function createActivity({ activityInformation }) {
  try {
    store.commit("SAVE_ACTIVITY_INFORMATION", activityInformation);
    const variables = { ...activityInformation };

    const { data } = await apolloClient.mutate({
      mutation: CREATE_ACTIVITY_MUTATION,
      variables,
      fetchPolicy: "no-cache",
    });

    const {
      createActivity: { statusCode, response, message, error },
    } = data;

    if (statusCode !== 200) throw new Error(message);

    const notificationMessage = {
      type: messages.SUCCESS,
      text: "Activity created!",
    };

    if (activityInformation.id && activityInformation.id !== 0)
      notificationMessage.text = "Activity Updated!";

    store.commit("addNotification", notificationMessage);
    store.commit("RESET_ACTIVITY_INFORMATION");
  } catch ({ message }) {
    const messageToDisplay =
      "createActivity error: " + message.replace("GraphQL error: ", "");
    store.commit("addNotification", {
      type: messages.DANGER,
      text: messageToDisplay,
    });
  }
}
