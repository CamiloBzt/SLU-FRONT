import { apolloClient } from '../../lib/api';
import uploadFile from './mutations/uploadFile';
import deleteFile from './mutations/deleteFile';
import singleDeleteEndorsement from './mutations/deleteFileEndosement'
import saveDocumentMutation from './mutations/saveDocument';
import catalogQueryDocuments from './queries/getCatalogDocuments';
import messages from '../../constants/messages';
import getDocumentsSubscriptionRiskQuery from './queries/getDocumentsSubscriptionRisk';
import getSlipDocumentsSubscriptionQuery from './queries/getSlipDocumentsSubscription';
import getDocumentsByCatalogQuery from './queries/getDocumentsByCatalog';
import getCatalogForDocumentsQuery from './queries/getCatalogForDocuments';
import getCorrespondenceDocumentsSubscriptionQuery from './queries/getCorrespondenceDocumentsSubscription';
import getDownloadDocQuery from './queries/getDownloadDoc';

export default {
  /* (context) destructured */
  async upload({ commit, dispatch }, { file, path }) {
    try {
      const { data } = await apolloClient.mutate({
        mutation: uploadFile,
        variables: {
          file,
          path,
        },
        fetchPolicy: 'no-cache',
      });
      return data;
    } catch (e) {
      console.error(e);
      return { error: true };
    }
  },
  async delete({ commit, dispatch }, documentName) {
    try {
      const {
        data: { singleDelete },
      } = await apolloClient.mutate({
        mutation: deleteFile,
        variables: {
          documentName: documentName,
        },
        fetchPolicy: 'no-cache',
      });
      return singleDelete;
    } catch (e) {
      const messageToDisplay = 'Doc delete error';
      commit('addNotification', {
        type: messages.DANGER,
        text: messageToDisplay,
      });
    }
  },
  async deleteEndorsement({ commit, dispatch }, documentName) {
    try {
      console.log(documentName)
      console.log(typeof documentName)
      const {
        data: { singleDelete },
      } = await apolloClient.mutate({
        mutation: singleDeleteEndorsement,
        variables: {
          documentName: documentName,
        },
        fetchPolicy: 'no-cache',
      });
      return singleDelete;
    } catch (e) {
      const messageToDisplay = 'Doc delete error';
      commit('addNotification', {
        type: messages.DANGER,
        text: messageToDisplay,
      });
    }
  },


  async save(
    { commit, dispatch },
    { document_id, subscription_id, type, docS3 }
  ) {
    try { 
      const {
        data: { saveDocument },
      } = await apolloClient.mutate({
        mutation: saveDocumentMutation,
        variables: {
          document: {
            document_id: document_id,
            type: type,
            subscription_id: subscription_id,
            doc_s3: docS3,
          },
        },
        fetchPolicy: 'no-cache',
      });
      const { statusCode, message, response } = saveDocument;
      if (statusCode != 200)
        throw new Error(`Failed upload document file: ${message}`);
      const parsedResponse = JSON.parse(response);
      const doc_s3 = parsedResponse.doc_s3;
      commit('set_upload_document', { document: doc_s3 });
    } catch ({ message }) {
      const messageToDisplay = 'Save doc error: ' + message.replace('GraphQL error: ', '');
      commit('addNotification', {
        type: messages.DANGER,
        text: messageToDisplay,
      });
    }
  },

  async getCatalogByDocuments({ commit, dispatch }, { name }) {
    try {
      const {
        data: { getCatalogDocuments },
      } = await apolloClient.query({
        query: catalogQueryDocuments,
        fetchPolicy: 'no-cache',
      });
      const { statusCode, message, response } = getCatalogDocuments;
      if (statusCode != 200)
        throw new Error(`Failed fetching documents data: ${message}`);

      commit('setCatalogByName', { name, response });
    } catch ({ message }) {
      const messageToDisplay = 'getCatalogByDocuments error: ' + message.replace('GraphQL error: ', '');
      commit('addNotification', {
        type: messages.DANGER,
        text: messageToDisplay,
      });
    }
  },
  setSlipDocument({ commit }, document) {
    commit('set_slip_document', document);
  },
  setCorrespondenceDocument({ commit }, document) {
    commit('set_correspondence_document', document);
  },

  downloadDocument({ commit }, value) {
    window.open(value, '_blank').focus();
  },

  async DocumentsSubscriptionRisk(
    { commit, dispatch },
    { subscription_id, documents, typeOfRisk }
  ) {
    const docs = [];
    const newDocs = [];
    documents.forEach(item => {
      if (item.idrisk === typeOfRisk) {
        let newItem = {};
        Object.assign(newItem, item);
        newItem.text = 'Upload the next document';
        newDocs.push(newItem);
        docs.push(item.id);
      }
    });
    commit('setDocuments', newDocs);
    try {
      const {
        data: { getDocumentsSubscriptionRisk },
      } = await apolloClient.query({
        query: getDocumentsSubscriptionRiskQuery,
        variables: {
          subscription_id,
          docs,
        },
        fetchPolicy: 'no-cache',
      });
      const { statusCode, message, response } = getDocumentsSubscriptionRisk;
      if (statusCode != 200)
        throw new Error(`Failed fetching data: ${message}`);
      const parsedResponse = JSON.parse(response);
      commit('setDocumentsLoader', parsedResponse);
    } catch ({ message }) {
      const messageToDisplay = 'DocumentsSubscriptionRisk error: ' + message.replace('GraphQL error: ', '');
      commit('addNotification', {
        type: messages.DANGER,
        text: messageToDisplay,
      });
    }
  },

  async SlipDocumentsSubscription({ commit, dispatch }, { subscription_id }) {
    try {
      const {
        data: { getSlipDocumentsSubscription },
      } = await apolloClient.query({
        query: getSlipDocumentsSubscriptionQuery,
        variables: {
          subscription_id,
        },
        fetchPolicy: 'no-cache',
      });
      const { statusCode, message, response } = getSlipDocumentsSubscription;
      if (statusCode != 200)
        throw new Error(`Failed fetching data: ${message}`);
      const parsedResponse = JSON.parse(response);
      commit('setSlipDocuments', parsedResponse);
    } catch ({ message }) {
      const messageToDisplay = 'SlipDocumentsSubscription error: ' + message.replace('GraphQL error: ', '');
      commit('addNotification', {
        type: messages.DANGER,
        text: messageToDisplay,
      });
    }
  },

  async CorrespondenceDocumentsSubscription(
    { commit, dispatch },
    { subscription_id }
  ) {
    try {
      const {
        data: { getCorrespondenceDocumentsSubscription },
      } = await apolloClient.query({
        query: getCorrespondenceDocumentsSubscriptionQuery,
        variables: {
          subscription_id,
        },
        fetchPolicy: 'no-cache',
      });
      const {
        statusCode,
        message,
        response,
      } = getCorrespondenceDocumentsSubscription;
      if (statusCode != 200)
        throw new Error(`Failed fetching data: ${message}`);
      const parsedResponse = JSON.parse(response);
      commit('setCorrespondenceDocuments', parsedResponse);
    } catch ({ message }) {
      const messageToDisplay = 'CorrespondenceDocumentsSubscription error: ' + message.replace('GraphQL error: ', '');
      commit('addNotification', {
        type: messages.DANGER,
        text: messageToDisplay,
      });
    }
  },
  async LoadDocumentsByCatalog({ commit, dispatch }, { subscription_id, catalog_document_id }) {
    try {
      const {
        data: { getDocumentsByCatalog },
      } = await apolloClient.query({
        query: getDocumentsByCatalogQuery,
        variables: {
          subscription_id,
          catalog_document_id,
        },
        fetchPolicy: 'no-cache',
      });
      const { statusCode, message, response } = getDocumentsByCatalog;
      if (statusCode != 200)
        throw new Error(`Failed fetching data: ${message}`);
      const parsedResponse = JSON.parse(response);
      console.log(parsedResponse);
      commit('setEndorsementDocuments', parsedResponse);
    } catch ({ message }) {
      const messageToDisplay = 'LoadDocumentsByCatalog error: ' + message.replace('GraphQL error: ', '');
      commit('addNotification', {
        type: messages.DANGER,
        text: messageToDisplay,
      });
    }
  },
  async LoadDocumentsCatalogForEndorsements({ commit, dispatch }, { catalog_document_id }) {
    try {
      const {
        data: { getCatalogForDocuments },
      } = await apolloClient.query({
        query: getCatalogForDocumentsQuery,
        variables: {
          catalog_document_id,
        },
        fetchPolicy: 'no-cache',
      });
      const { statusCode, message, response } = getCatalogForDocuments;
      if (statusCode != 200)
        throw new Error(`Failed fetching data: ${message}`);
      const parsedResponse = JSON.parse(response);
      console.log(parsedResponse);
      commit('setEndorsementDocuments', parsedResponse);
    } catch ({ message }) {
      const messageToDisplay = 'LoadDocumentsCatalogForEndorsements error: ' + message.replace('GraphQL error: ', '');
      commit('addNotification', {
        type: messages.DANGER,
        text: messageToDisplay,
      });
    }
  },
  async DownloadDoc({ commit, dispatch }, { path }) {
    try {
      const {
        data: { getDownloadDoc },
      } = await apolloClient.query({
        query: getDownloadDocQuery,
        variables: {
          path,
        },
        fetchPolicy: 'no-cache',
      });
      const { statusCode, message, response } = getDownloadDoc;
      if (statusCode != 200)
        throw new Error(`Failed fetching data: ${message}`);
      console.log(response);
      //const parsedResponse = JSON.parse(response);
      commit('setDownloadDocUrl', response);
    } catch ({ message }) {
      const messageToDisplay = 'DownloadDoc error: ' + message.replace('GraphQL error: ', '');
      commit('addNotification', {
        type: messages.DANGER,
        text: messageToDisplay,
      });
    }
  },
};
