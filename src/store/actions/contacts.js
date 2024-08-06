/* api */
import { apolloClient } from "../../lib/api";

/* mutaciones */
import CREATE_CONTACT from "./mutations/createContact";
import DELETE_CONTACT from "./mutations/deleteContact";
/* ... */
import GET_CONTACTS_BY_ID from "./queries/getContactsById"


/* queries */
import GET_CONTACTS_QUERY from "./queries/getAllContacts";
import GET_CONTACTS_BY_QUERY from "./queries/getContactsBy";

/* constantes */
import messages from "../../constants/messages";

export default {
  async loadContacts({ commit }) {
    try {
      const { data } = await apolloClient.query({
        query: GET_CONTACTS_QUERY,
        fetchPolicy: "no-cache",
      });

      const { statusCode, response } = data.getAllContacts;
      if (statusCode !== 200) throw new Error("Load Contacts Error");

      const parsedResponse = JSON.parse(response);
      commit("SET_CONTACTS", parsedResponse);
    } catch ({ message }) {
      const messageToDisplay = 'loadContacts error: ' + message.replace("GraphQL error: ", "");
      commit("addNotification", {
        type: messages.DANGER,
        text: messageToDisplay,
      });
    }
  },
  async filterContactsByType({ commit }, { contact, query = '' }) {
    try {
      /**
       * type 1 - broker
       * type 2 - cedent
       * brokerOrCedent debe ser un array para el where del query
       */
      const variables = { contact, ...(query && { query }) };
      const { data: { getContactsBy } } = await apolloClient.query({
        query: GET_CONTACTS_BY_QUERY,
        variables,
        fetchPolicy: "no-cache",
      });

      const { statusCode, response } = getContactsBy;
      if (statusCode !== 200) throw new Error("Error while filtering contacts");

      const parsedResponse = JSON.parse(response);
      commit("SET_CONTACTS", parsedResponse);
    } catch ({ message }) {
      const messageToDisplay = 'filterContactsByType error: ' + message.replace("GraphQL error: ", "");
      commit("addNotification", {
        type: messages.DANGER,
        text: messageToDisplay,
      });
    }
  },
  async getContactsById({ commit }, {id, type}) {
    try {
      const variables = {
        id,
        type
      }
      const { data } = await apolloClient.query({
        query: GET_CONTACTS_BY_ID,
        variables
      });
      if(data["getContactsById"]["statusCode"] == 200)
        commit('SET_CONTACTS', data["getContactsById"]["response"])
    } catch ({ message }) {
      console.log(message)
      const messageToDisplay = 'getContactsById error: ' + message.replace("GraphQL error: ", "");
      commit("addNotification", {
        type: messages.DANGER,
        text: messageToDisplay,
      });
    }
  },
  async createContact({ commit, dispatch }, info) {
    try {
      const variables = {
        ...info
      }
      const { data } = await apolloClient.mutate({
        mutation: CREATE_CONTACT,
        variables,
        fetchPolicy: "no-cache",
      })

      const {
        createContact: { statusCode, message, error, response },
      } = data
      commit('SET_CONTACTS', response)
      if (statusCode !== 200) throw new Error(message)
      commit("addNotification", {
        type: messages.SUCCESS,
        text: "Contact created!",
      })
    } catch ({ message }) {
      const messageToDisplay = 'createContact error: ' + message.replace("GraphQL error: ", "")
      commit("addNotification", {
        type: messages.DANGER,
        text: messageToDisplay,
      })
    }
  },
  async deleteContact({ commit, dispatch }, info) {
    try {
      console.log(info)
      const variables = {
        brokerOrCedentId: info.brokerOrCedentId,
        contactId: info.id,
        type: info.type
      }
      const { data } = await apolloClient.mutate({
        mutation: DELETE_CONTACT,
        variables,
        fetchPolicy: "no-cache",
      })
      const {
        deleteContact: { statusCode, message, error, response },
      } = data
      commit('SET_CONTACTS', response)
      if (statusCode !== 200) throw new Error(message)
      commit("addNotification", {
        type: messages.SUCCESS,
        text: "Contact delete!",
      })
    } catch ({ message }) {
      const messageToDisplay = 'deleteContact error: ' + message.replace("GraphQL error: ", "")
      commit("addNotification", {
        type: messages.DANGER,
        text: messageToDisplay,
      })
    }
  },

};
