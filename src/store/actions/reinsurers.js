const DEFAULT_DELAY = 5000
import messages from '../../constants/messages';
import { apolloClient } from '../../lib/api';

import GET_ALL_REINSURERS from "./queries/getAllReinsurers";
import GET_REINSURERS_BY_ID from "./queries/getReinsurersById";

import UPDATE_REINSURER from "./mutations/updateReinsurer";
import CREATE_REINSURER from "./mutations/createReinsurer";
import DELETE_REINSURER from "./mutations/deleteReinsurer";
export default {
  async getAllReinsurers ({ commit, state }, id) {
    try {
      const variables = { id };
      const { data }  = await apolloClient.query({
        query: GET_ALL_REINSURERS,
        variables,
        fetchPolicy: 'no-cache'
      });
      commit('setReinsurersList', JSON.parse(data["getReinsurers"].response) )
    } catch ({ message }) {
      console.log(message)
      const messageToDisplay = 'getAllReinsurers error: ' + message.replace("GraphQL error: ", "");
      commit("addNotification", {
        type: messages.DANGER,
        text: messageToDisplay,
      });
    }
  },
  async getReinsurersById ({ state, commit }, reinsurerId) {
    try {
      const variables = { reinsurerId };
      const { data } = await apolloClient.query({
        query: GET_REINSURERS_BY_ID,
        variables
      });
      commit('setReinsurerSelected', JSON.parse(data["getReinsurersById"].response)[0] )
    } catch ({ message }) {
      const messageToDisplay = 'getReinsurersById error: ' + message.replace("GraphQL error: ", "");
      commit("addNotification", {
        type: messages.DANGER,
        text: messageToDisplay,
      });
    }
  },
  async createReinsurer ({ state, commit }, reinsurerInput) {
    try {
      const variables = { reinsurerInput };
      await apolloClient.mutate({
        mutation: CREATE_REINSURER,
        variables,
        fetchPolicy: 'no-cache'
      });
      commit('addNotification', {
        type: messages.SUCCESS,
        text: 'Reinsurer has been saved',
      });
    } catch ({ message }) {
      const messageToDisplay = 'createReinsurer error: ' + message.replace("GraphQL error: ", "");
      commit("addNotification", {
        type: messages.DANGER,
        text: messageToDisplay,
      });
    }
  },
  async updateReinsurer ({ state, commit }, reinsurerUpdate) {
    try {
      const variables = { reinsurerUpdate };
      await apolloClient.mutate({
        mutation: UPDATE_REINSURER,
        variables,
        fetchPolicy: 'no-cache'
      });
      commit('addNotification', {
        type: messages.SUCCESS,
        text: 'Reinsurer has been changed',
      });
    } catch ({ message }) {
      const messageToDisplay = 'updateReinsurer error: ' + message.replace("GraphQL error: ", "");
      commit("addNotification", {
        type: messages.DANGER,
        text: messageToDisplay,
      });
    }
  },

  async deleteReinsurer ({ state, commit }, reinsurerId) {
    try {
      const variables = { reinsurerId };
      await apolloClient.query({
        query: DELETE_REINSURER,
        variables,
        fetchPolicy: 'no-cache'
      });
      commit('addNotification', {
        type: messages.SUCCESS,
        text: 'Reinsurer has been deleted',
      });    } catch ({ message }) {
      const messageToDisplay = 'deleteReinsurer error: ' + message.replace("GraphQL error: ", "");
      commit("addNotification", {
        type: messages.DANGER,
        text: messageToDisplay,
      });
    }
  }
  
}