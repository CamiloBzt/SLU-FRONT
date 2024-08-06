/* api */
import { apolloClient } from '../../lib/api';
import { PublicClientApplication, InteractionType } from '@azure/msal-browser';
import { Client } from '@microsoft/microsoft-graph-client';
import { AuthCodeMSALBrowserAuthenticationProvider } from '@microsoft/microsoft-graph-client/authProviders/authCodeMsalBrowser';
/* constantes */
import messages from '../../constants/messages';

/* mutations */
import SEND_EMAIL_MUTATION from './mutations/sendEmail';
import ATTACH_FILE_MUTATION from './mutations/attachFile';
import DELETE_ATTACHED_MUTATION from './mutations/deleteAttached';
import CHANGE_TEMPLATE_LANG_MUTATION from './mutations/changeTemplateLang';

/* query */
import EMAIL_TEMPLATE_RISK_QUERY from './queries/getEmailTemplateByRisk';
import SUBSCRIPTION_TEMPLATE_LANG from './queries/getSubscriptionTemplateLang';
import GET_EMAIL_TEMPLATE_QUOTATION from './queries/getTemplateEmailQuotation';
import GET_CONTACT_SUBSCRIPTION from "./queries/getContactsBySubscription";

// Utils
import { getBase64FromFile } from '../../lib/utils'

export default {
  async getEmailTemplate({ commit, dispatch }, { id, lang = 'en' }) {
    try {
      const queryInfo = {
        response: 'getEmailTemplateByRisk',
        query: EMAIL_TEMPLATE_RISK_QUERY,
      };

      const variables = { riskId: id, lang };

      const { data } = await apolloClient.query({
        query: queryInfo.query,
        variables,
        fetchPolicy: 'no-cache',
      });

      const { response, statusCode } = data[queryInfo.response];
      if (statusCode !== 200) throw new Error('Invalid Template');

      const parsedResponse = JSON.parse(response);
      /* set email ID & template */
      await dispatch('setEmailTemplate', {
        description: parsedResponse.description,
      });
    } catch ({ message }) {
      const messageToDisplay = 'getEmailTemplate error: ' + message.replace('GraphQL error: ', '');
      commit('addNotification', {
        type: messages.DANGER,
        text: messageToDisplay,
      });
    }
  },
  async getCurrentTemplateLanguage({ commit, getters }) {
    try {
      const settings = {
        response: 'getSubscriptionTemplateLang',
        query: SUBSCRIPTION_TEMPLATE_LANG,
      };

      const variables = {
        id: getters.subscription_id,
      };

      const { data } = await apolloClient.query({
        query: settings.query,
        variables,
        fetchPolicy: 'no-cache',
      });

      const { statusCode, response } = data[settings.response];
      if (statusCode !== 200) throw new Error('Template Lang Error');

      const parsedResponse = JSON.parse(response);
      commit('SET_SELECTED_TEMPLATE_LANG', parsedResponse.lang);
    } catch ({ message }) {
      const messageToDisplay = 'getCurrentTemplateLanguage error: ' + message.replace('GraphQL error: ', '');
      commit('addNotification', {
        type: messages.DANGER,
        text: messageToDisplay,
      });
    }
  },
  async setCurrentTemplateLanguage({ commit }, { langId, id }) {
    try {
      const variables = {
        langId,
        id,
      };
      const {
        data: { changeTemplateLang },
      } = await apolloClient.mutate({
        mutation: CHANGE_TEMPLATE_LANG_MUTATION,
        variables,
        fetchPolicy: 'no-cache',
      });

      const { statusCode, response } = changeTemplateLang;
      if (statusCode !== 200) throw new Error('Lang not saved on change');

      const parsedResponse = JSON.parse(response);

      commit('SET_SELECTED_TEMPLATE_LANG', parsedResponse.lang);
    } catch ({ message }) {
      const messageToDisplay = 'setCurrentTemplateLanguage error: ' + message.replace('GraphQL error: ', '');
      commit('addNotification', {
        type: messages.DANGER,
        text: messageToDisplay,
      });
    }
  },
  async resetTemplateLang({ commit }) {
    try {
      commit('SET_SELECTED_TEMPLATE_LANG', 'en');
    } catch ({ message }) {
      const messageToDisplay = 'resetTemplateLang error: ' + message.replace('GraphQL error: ', '');
      commit('addNotification', {
        type: messages.DANGER,
        text: messageToDisplay,
      });
    }
  },
  async setEmailTemplate({ commit }, { description }) {
    try {
      commit('SET_CURRENT_EMAIL_TEMPLATE', {
        currentEmailTemplate: description,
      });
    } catch ({ message }) {
      const messageToDisplay = 'setEmailTemplate error: ' + message.replace('GraphQL error: ', '');
      commit('addNotification', {
        type: messages.DANGER,
        text: messageToDisplay,
      });
    }
  },
  async setEmailRiskID({ commit }, { id }) {
    try {
      commit('SET_CURRENT_EMAIL_RISK_ID', { id });
    } catch ({ message }) {
      const messageToDisplay = 'setEmailRiskID error: ' + message.replace('GraphQL error: ', '');
      commit('addNotification', {
        type: messages.DANGER,
        text: messageToDisplay,
      });
    }
  },
  async sendEmailAction({ commit, dispatch, getters, state }, { emailData }) {
    this.$msalInstance = new PublicClientApplication(state.outlook.config);
    const authProvider = new AuthCodeMSALBrowserAuthenticationProvider(
      this.$msalInstance,
      {
        account: JSON.parse(localStorage.getItem('accountOutlook')),
        scopes: state.outlook.params.scopes,
        interactionType: InteractionType.Popup,
      }
    );
    const graphClient = Client.initWithMiddleware({
      authProvider: authProvider,
    });
    let toRecipients = [], ccoRecipients = [], attachmentFiles = [];

    if (emailData.cc !== null) {
      toRecipients = emailData.cc.reduce((accum, item) => {
        accum.push({
          emailAddress: {
            address: item,
          },
        });
        return accum;
      }, []);
    }

    if (emailData.cco != null) {
      ccoRecipients = emailData.cco.reduce((accum, item) => {
        accum.push({
          emailAddress: {
            address: item,
          },
        });
        return accum;
      }, []);
    }

    if (emailData.attachmentFiles) attachmentFiles = await Promise.all(emailData.attachmentFiles.map(async file => {
      const contentBytes = await getBase64FromFile(file)

      return {
        '@odata.type': '#microsoft.graph.fileAttachment',
        name: file.name,
        contentType: file.type,
        contentBytes: contentBytes.split(',')[1]
      }
    }))

    const bodyContent = `${emailData.body} <div style="max-height: 200px;"><img src="cid:sluLogo" alt="sluLogo" style="width: 200px;"></div>`
    const logoFile = async () => {
      const sluLogo = require('@/assets/logo-slu.png')
      const sluBlob = await fetch(sluLogo).then(r => r.blob())

      const contentBytes = await getBase64FromFile(sluBlob)

      return {
        '@odata.type': '#microsoft.graph.fileAttachment',
        name: 'SLU',
        contentType: sluBlob.type,
        contentBytes: contentBytes.split(',')[1],
        contentId: 'sluLogo'
      }
    }
    const attachmentLogoFile = await logoFile()
    
    const mail = {
      subject: emailData.subject,
      toRecipients: toRecipients,
      ccRecipients: ccoRecipients,
      body: {
        content: bodyContent,
        contentType: 'html',
      },
      attachments: [
        attachmentLogoFile
      ]
    }

    if (attachmentFiles.length > 0) mail.attachments = [
      ...mail.attachments,
      ...attachmentFiles
    ]

    try {
      const response = await graphClient
        .api('/me/sendMail')
        .post({ message: mail });
        
      if (emailData.closeAccount) dispatch('storeEmail', { emailData });

      commit('addNotification', {
        type: messages.SUCCESS,
        text: 'SEND MAIL SUCCESSFUL',
      });
    } catch (error) {
      throw error;
    }
  },
  async attachFile({ commit }, { file, path, name }) {
    try {
      const { data } = await apolloClient.mutate({
        mutation: ATTACH_FILE_MUTATION,
        variables: {
          file,
          path,
          name,
        },
        fetchPolicy: 'no-cache',
      });

      return data.attachFile;
    } catch (e) {
      console.error(e);
      return { error: true };
    }
  },
  async resetEmail({ commit }) {
    try {
      commit('RESET_SEND_EMAIL');
    } catch ({ message }) {
      const messageToDisplay = 'resetEmail error: ' + message.replace('GraphQL error: ', '');
      commit('addNotification', {
        type: messages.DANGER,
        text: messageToDisplay,
      });
    }
  },
  async getTemplateEmail({ state, commit, dispatch }, id = 1) {
    try {
      const language = state.selectedLang;
      const settings = {
        en: 'htmlTemplate',
        es: 'htmlTemplateEs'
      };
      const {
        data: { getAllTemplateEmail },
      } = await apolloClient.query({
        query: GET_EMAIL_TEMPLATE_QUOTATION,
        fetchPolicy: 'no-cache',
      });
      const { statusCode, response } = getAllTemplateEmail;
      if (statusCode !== 200) throw new Error('Template Lang Error');
      const parsedResponse = JSON.parse(response);
      const getId = parsedResponse.find(v => v.id === id)
      commit('SET_TEMPLATE_EMAIL_ALL_QUOTATION', parsedResponse);
      await dispatch('setEmailTemplate', {
        description: getId[settings[language]],
      });
    } catch ({ message }) {
      const messageToDisplay = 'getTemplateEmail error: ' + message.replace('GraphQL error: ', '');
      commit('addNotification', {
        type: messages.DANGER,
        text: messageToDisplay,
      });
    }
  },
  async storeEmail({ commit, getters, dispatch }, { emailData }) {
    try {
      const variables = {
        attachedFiles: emailData.attachedFiles,
        description: emailData.body,
        cco: Array.isArray(emailData.cco) ? emailData.cco.join(',') : null,
        cc: Array.isArray(emailData.cc) ? emailData.cc.join(',') : null,
      };

      const { data } = await apolloClient.mutate({
        mutation: SEND_EMAIL_MUTATION,
        variables,
        fetchPolicy: 'no-cache',
      });

      const { sendEmail } = data;
      const { statusCode, response, message, error } = sendEmail;

      if (statusCode !== 200)
        throw new Error(`msg: ${message} error: ${error}`);

      const parsedResponse = JSON.parse(response);

      await dispatch('closeAccountAction', {
        closeAccount: {
          email: parsedResponse.id,
          id: getters.currentTemplateRiskID,
        },
      });

      await dispatch('resetEmail');
    } catch ({ message }) {
      const messageToDisplay = 'storeEmail error: ' + message.replace('GraphQL error: ', '');
      commit('addNotification', {
        type: messages.DANGER,
        text: messageToDisplay,
      });
    }
  },
  async getContactsBySubscriptionId({commit}, body) {
    try {
      const variables = {
        subscriptionId: parseFloat(body.subscriptionId)
      }      
      const { data } = await apolloClient.query({
        query: GET_CONTACT_SUBSCRIPTION,
        variables,
        fetchPolicy: "no-cache",
      });
      if (data.getContactsBySubscription.statusCode) {
        commit('SET_MAIL_CC_PARTICIPANTS', data.getContactsBySubscription.response)
        console.log('ResponseContactoas:', data.getContactsBySubscription.response)
      }
      
    } catch ({ message}) {
      const messageToDisplay = 'getContactsBySubscriptionId error: ' + message.replace('GraphQL error: ', '');
      commit('addNotification', {
        type: messages.DANGER,
        text: messageToDisplay,
      });
    }
  },
};
