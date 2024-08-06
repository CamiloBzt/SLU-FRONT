import { apolloClient } from '../../lib/api';
import saveNoteMutation from './mutations/saveNote';
import setNoteAsReadedMutation from './mutations/setNoteAsReaded'
import deleteNoteMutation from './mutations/deleteNote';
import messages from '../../constants/messages';
import notesSubscriptionQuery from './queries/getNotes';
import getNotificationsByUserQuery from './queries/getNotificationsByUser'

export default {
  /* (context) destructured */
  async saveNote({ commit, dispatch }, { description, subscription_id, users_ids }) {
    try {
      const {
        data: { addNote },
      } = await apolloClient.mutate({
        mutation: saveNoteMutation,
        variables: {
          note: {
            description: description,
            subscription_id: subscription_id,
            parent_note_id: 0,
            users_ids
          },
        },
        fetchPolicy: 'no-cache',
      });
      const { statusCode, message, response } = addNote;
      if (statusCode != 200) throw new Error(`Failed send note: ${message}`);
      dispatch('noteSubscription', { subscription_id });
      return 'success';
    } catch ({ message }) {
      const messageToDisplay = 'saveNote error: ' + message.replace('GraphQL error: ', '');
      commit('addNotification', {
        type: messages.DANGER,
        text: messageToDisplay,
      });
    }
  },
  async deleteNote({ commit, dispatch }, idnote) {
    try {
      const {
        data: { delNote },
      } = await apolloClient.mutate({
        mutation: deleteNoteMutation,
        variables: {
          idnote,
        },
        fetchPolicy: 'no-cache',
      });
      const { statusCode, message, response } = delNote;
      if (statusCode != 200) throw new Error(`Failed upload document file: ${message}`);
    } catch ({ message }) {
      const messageToDisplay = 'deleteNote error: ' + message.replace('GraphQL error: ', '');
      commit('addNotification', {
        type: messages.DANGER,
        text: messageToDisplay,
      });
    }
  },
  async noteSubscription({ commit, dispatch }, { subscription_id }) {
    try {
      const {
        data: { getNotesSubscription },
      } = await apolloClient.query({
        query: notesSubscriptionQuery,
        variables: {
          subscription_id,
        },
        fetchPolicy: 'no-cache',
      });
      const { statusCode, message, response } = getNotesSubscription;
      if (statusCode != 200) throw new Error(`Failed fetching data: ${message}`);
      const parsedResponse = JSON.parse(response);
      var hideNotes = [];
      parsedResponse.forEach((value, index) => {
        value.showRes = false;
        var date = value.created_at.split('T', 2);
        value.date = date[0];
        value.arrayResponse = [];
        var result = parsedResponse.find((item) => item.id === value.parent_note_id);
        if (result) {
          if (result.arrayResponse) result.arrayResponse.push(value);

          var i = parsedResponse.indexOf(value);
          if (i !== -1) {
            hideNotes.push(i);
          }
        }
      });
      for (var i = hideNotes.length - 1; i >= 0; i--) {
        parsedResponse.splice(hideNotes[i], 1);
      }
      commit('setArrayNotes', parsedResponse);
    } catch ({ message }) {
      const messageToDisplay = 'noteSubscription error: ' + message.replace('GraphQL error: ', '');
      commit('addNotification', {
        type: messages.DANGER,
        text: messageToDisplay,
      });
    }
  },
  async responseNote({ commit, dispatch }, { description, subscription_id, parent_note_id, users_ids }) {
    try {
      const {
        data: { addNote },
      } = await apolloClient.mutate({
        mutation: saveNoteMutation,
        variables: {
          note: {
            description: description,
            subscription_id: subscription_id,
            parent_note_id: parent_note_id,
            users_ids
          },
        },
        fetchPolicy: 'no-cache',
      });
      const { statusCode, message, response } = addNote;
      if (statusCode != 200) throw new Error(`Failed send note: ${message}`);
      dispatch('noteSubscription', { subscription_id });
      return 'success';
    } catch ({ message }) {
      const messageToDisplay = 'responseNote error: ' + message.replace('GraphQL error: ', '');
      commit('addNotification', {
        type: messages.DANGER,
        text: messageToDisplay,
      });
    }
  },
  async getNotificationsByUser({ commit, dispatch }, { user_id }) {
    try {
      const {
        data: { getNotificationsByUser },
      } = await apolloClient.query({
        query: getNotificationsByUserQuery,
        variables: {
          user_id
        },
        fetchPolicy: 'no-cache',
      })

      const { statusCode, message, response } = getNotificationsByUser

      if (statusCode != 200) throw new Error(`Failed fetching data: ${message}`)

      const parsedResponse = JSON.parse(response)
      
      return parsedResponse
    } catch ({ message }) {
      const messageToDisplay = 'getNotificationsByUser error: ' + message.replace('GraphQL error: ', '')

      commit('addNotification', {
        type: messages.DANGER,
        text: messageToDisplay,
      })
    }
  },
  async setNoteAsReaded({ commit, dispatch }, { idNote, idUsuario }) {
    try {
      const {
        data: { setNoteAsReaded },
      } = await apolloClient.mutate({
        mutation: setNoteAsReadedMutation,
        variables: {
          noteAsReaded: {
            idNote,
            idUsuario
          },
        },
        fetchPolicy: 'no-cache',
      })

      const { statusCode, message, response } = setNoteAsReaded

      if (statusCode != 200) throw new Error(`Failed send note: ${message}`)

      commit('addNotification', {
        type: messages.SUCCESS,
        text: 'Note readed',
      })
    } catch ({ message }) {
      const messageToDisplay = 'setNoteAsReaded error: ' + message.replace('GraphQL error: ', '')

      commit('addNotification', {
        type: messages.DANGER,
        text: messageToDisplay,
      })
    }
  },
};
