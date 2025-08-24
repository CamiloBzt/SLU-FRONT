/* api */
import messages from "@/constants/messages";
import { apolloClient } from "../../lib/api";
import createNotificationFourEyeMutation from "./mutations/createNotificationFourEye";
import updateNotificationFourEyesDetail from "./mutations/updateNotificationFourEyeDetail";
import getNotificationsFourEyeQuery from "./queries/getNotificationsFourEye";
import getNotificationsFourEyeSuscriptor from "./queries/getNotificationsFourEyeSuscriptor";
import getSuscriptorNotificationsFourEye from "./queries/getSuscriptorNotificationsFourEye";
import getUnderwriters from "./queries/getUnderwriters";
import updateIsArchivedNotification from "./queries/updateIsArchivedNotification";

export default {
  async getListUnderwriters() {
    try {
      const { data } = await apolloClient.query({
        query: getUnderwriters,
      });

      return data["getUnderwriters"];
    } catch ({ message }) {
      const messageToDisplay = "getListUnderwriters error: " + message.replace("GraphQL error: ", "");
      commit("addNotification", {
        type: messages.DANGER,
        text: messageToDisplay,
      });
    }
  },

  async createNotificationFourEye({ commit, state }, { subscription_id, reviewer_user_id, notifying_user_id, status, commentary }) {
    try {
      const { data } = await apolloClient.mutate({
        mutation: createNotificationFourEyeMutation,
        variables: {
          subscription_id,
          reviewer_user_id,
          notifying_user_id,
          status,
          commentary,
        },
        fetchPolicy: "no-cache",
      });
      return data["createNotificationFourEye"];
    } catch ({ message }) {
      const messageToDisplay = "createNotificationFourEye error: " + message.replace("GraphQL error: ", "");
      commit("addNotification", {
        type: messages.DANGER,
        text: messageToDisplay,
      });
    }
  },

  async updateNotification({ commit }, { id, input }) {
    try {
      const { data } = await apolloClient.mutate({
        mutation: updateNotificationFourEyesDetail,
        variables: {
          id,
          input,
        },
      });
      return data["updateNotificationFourEyesDetail"];
    } catch ({ message }) {
      const messageToDisplay = "updateNotification error: " + message.replace("GraphQL error: ", "");
      commit("addNotification", {
        type: messages.DANGER,
        text: messageToDisplay,
      });
    }
  },
  async getNotificationsFourEye({ commit, state }, id) {
    try {
      const isUnderwriter = await getUserType(id);

      if (isUnderwriter) {
        const { data } = await apolloClient.query({
          query: getNotificationsFourEyeQuery,
          variables: {
            id,
          },
          fetchPolicy: "no-cache",
        });
        commit("setNotifications", data["getNotificationsFourEye"]);
      } else {
        const { data } = await apolloClient.query({
          query: getSuscriptorNotificationsFourEye,
          variables: {
            id,
          },
          fetchPolicy: "no-cache",
        });
        commit("setNotifications", data["getSuscriptorNotificationsFourEye"]);
      }
    } catch ({ message }) {
      const messageToDisplay = "getNotificationsFourEye error: " + message.replace("GraphQL error: --", "");
      commit("addNotification", {
        type: messages.DANGER,
        text: messageToDisplay,
      });
    }
  },
  async updateNotificationArchived({ commit }, { id, isArchived }) {
    try {
      const { data } = await apolloClient.mutate({
        mutation: updateIsArchivedNotification,
        variables: {
          id,
          is_archived: isArchived,
        },
      });

      return data["updateIsArchivedNotification"];
    } catch ({ message }) {
      const messageToDisplay = "updateNotificationArchived error: " + message.replace("GraphQL error: ", "");
      commit("addNotification", {
        type: messages.DANGER,
        text: messageToDisplay,
      });
    }
  },
  async getNotificationsFourEyeSuscriptor({ commit }, id) {
    try {
      const { data } = await apolloClient.query({
        query: getNotificationsFourEyeSuscriptor,
        variables: {
          id,
        },
        fetchPolicy: "no-cache",
      });
      return data["getNotificationsFourEyeSuscriptor"];
    } catch ({ message }) {
      const messageToDisplay = "getNotificationsFourEyeSuscriptor error: " + message.replace("GraphQL error: ", "");
      commit("addNotification", {
        type: messages.DANGER,
        text: messageToDisplay,
      });
    }
  },
};

export const getUserType = async (id) => {
  try {
    const { data } = await apolloClient.query({
      query: getUnderwriters,
      variables: {
        roleId: id,
      },
      fetchPolicy: "no-cache",
    });
    const underwriterList = data["getUnderwriters"]?.map((e) => Number(e.id));
    return underwriterList.includes(id);
  } catch (message) {
    const messageToDisplay = message.replace("GraphQL error: ", "");
    return messageToDisplay;
  }
};
