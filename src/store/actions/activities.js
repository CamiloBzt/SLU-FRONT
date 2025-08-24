/* api */
import { apolloClient } from "../../lib/api";
/* mutaciones */
import CREATE_ACTIVITY_MUTATION from "./mutations/createActivity";
import DELETE_ACTIVITY_ID from "./mutations/deleteActivity";
/* queries */
import ACTIVITIES_QUERY from "./queries/getActivities";
import GET_DATA_ACTIVITY_BY_ID from "./queries/getDataActivityById";
import LIST_ACTIVITIES_QUERY from "./queries/getActivitiesList";
/* constantes */
import messages from "../../constants/messages";

export default {
  async createActivity({ commit, dispatch, state }, { activityInformation }) {
    try {
      commit("SAVE_ACTIVITY_INFORMATION", activityInformation);
      const variables = { activity: activityInformation };
      console.log("actions", variables);
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
      if (activityInformation.id !== 0) notificationMessage.text = "Activity Updated!";
      commit("addNotification", notificationMessage);
      commit("RESET_ACTIVITY_INFORMATION");
    } catch ({ message }) {
      const messageToDisplay = "createActivity error: " + message.replace("GraphQL error: ", "");
      commit("addNotification", {
        type: messages.DANGER,
        text: messageToDisplay,
      });
    }
  },

  async getActivities({ commit }) {
    try {
      const config = { response: "getAllActivities" };
      const prefetch = await apolloClient.query({
        query: ACTIVITIES_QUERY,
        fetchPolicy: "no-cache",
      });
      const data = prefetch["data"][config.response];
      const { statusCode, response, message, error } = data;
      if (statusCode !== 200) throw new Error(message || error);
      const parsedResponse = JSON.parse(response);
      commit("SET_AVAILABLE_ACTIVITIES", {
        activities: Array.from(parsedResponse),
      });
    } catch ({ message }) {
      const messageToDisplay = "getActivities error: " + message.replace("GraphQL error: ", "");
      commit("addNotification", {
        type: messages.DANGER,
        text: messageToDisplay,
      });
    }
  },

  async resetActivityInformation({ commit }) {
    try {
      commit("RESET_ACTIVITY_INFORMATION");
    } catch ({ message }) {
      const messageToDisplay = "resetActivityInformation error: " + message.replace("GraphQL error: ", "");
      commit("addNotification", {
        type: messages.DANGER,
        text: messageToDisplay,
      });
    }
  },

  async getActivityById({ commit }, activityId) {
    try {
      const variables = {
        activityId: parseFloat(activityId),
      };
      const { data } = await apolloClient.query({
        query: GET_DATA_ACTIVITY_BY_ID,
        variables,
      });
      commit("SET_INFO_ACTIVITY", { payload: data["getActivityDataById"] });
    } catch ({ message }) {
      const messageToDisplay = "getActivityById error: " + message.replace("GraphQL error: ", "");
      commit("addNotification", {
        type: messages.DANGER,
        text: messageToDisplay,
      });
    }
  },

  async getActivitiesList({ commit }) {
    try {
      const { data } = await apolloClient.query({
        query: LIST_ACTIVITIES_QUERY,
        fetchPolicy: "no-cache",
      });
      commit("SET_ACTIVITY_LIST", { activities: data["getActivitiesList"] });
    } catch ({ message }) {
      const messageToDisplay = "getActivitiesList error: " + message.replace("GraphQL error: ", "");
      commit("addNotification", {
        type: messages.DANGER,
        text: messageToDisplay,
      });
    }
  },

  async deleteActivity({ commit }, info) {
    try {
      const variables = {
        activityId: parseFloat(info.id),
      };
      const { data } = await apolloClient.mutate({
        mutation: DELETE_ACTIVITY_ID,
        variables,
      });
      commit("addNotification", {
        type: messages.SUCCESS,
        text: "Activity deleted!",
      });
      commit("SET_ACTIVITY_LIST", {
        activities: data["deleteActivity"]["response"],
      });
    } catch ({ message }) {
      const messageToDisplay = "deleteActivity error: " + message.replace("GraphQL error: ", "");
      commit("addNotification", {
        type: messages.DANGER,
        text: messageToDisplay,
      });
    }
  },
};
