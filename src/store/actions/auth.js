import CryptoJS from 'crypto-js';

import { apolloClient, onLogin, onLogout } from '../../lib/api';
import loginMutation from './mutations/login';
import registerMutation from './mutations/register';
import messages from '../../constants/messages';
import router from '../../router';
import validateSession from './mutations/validateSession';
import activateUser from './mutations/activateUser';
import loginNewMutation from './mutations/loginNew';
import updateChangeMutation from './mutations/updateChange';

export default {
  /* (context) destructured */
  async register({ commit, dispatch }, { email, password, name, last_name }) {
    try {
      const {
        data: { createUser },
      } = await apolloClient.mutate({
        mutation: registerMutation,
        variables: {
          email,
          password,
          name,
          last_name,
        },
      });

      const { token } = createUser;
      commit('SET_TOKEN', token);

      localStorage.setItem('sessionToken', token);
      commit('LOGIN_USER', login);
    } catch (e) {
      console.error(e);
    }
  },
  async showMessageLogin({ commit }, message) {
    let messageToDisplay = '';

    if (message.indexOf('popup_window_error') > -1) {
      messageToDisplay = 'Browser blocked windows';
    } else if (message.indexOf('cancell') > -1) {
      messageToDisplay = 'User canceled login in pop-up window';
    } else if (message.indexOf('interaction_in_progress') > -1) {
      messageToDisplay = 'Please login in pop-up window';
    }

    commit('addNotification', {
      type: messages.DANGER,
      text: messageToDisplay,
    });
  },
  async loginNew({ commit, dispatch }, data) {
    try {
      const {
        data: { loginNew },
      } = await apolloClient.mutate({
        mutation: loginNewMutation,
        variables: {
          ...data
        }
      });
      const { token } = loginNew;
      commit('SET_TOKEN', token);

      commit('setMenuActions', loginNew);

      await onLogin(apolloClient, token);
      if (loginNew.menu.find(m => m.path.indexOf('subscription') > 0))
        router.push('/subscription');
      else
        router.push('/dashboard');
    } catch ({ message }) {
      console.log(message)
      const messageToDisplay = 'loginNew error: ' + message.replace('GraphQL error: ', '');
      commit('addNotification', {
        type: messages.DANGER,
        text: messageToDisplay,
      });
    }
  },
  /* (context) destructured */
  async login({ commit, dispatch }, { email, password, checkbox }) {
    try {
      const {
        data: { login },
      } = await apolloClient.mutate({
        mutation: loginMutation,
        variables: {
          email,
          password,
        },
        fetchPolicy: 'no-cache',
      });

      const { token } = login;

      commit('SET_TOKEN', token);
      await onLogin(apolloClient, token);
      // localStorage.setItem('sessionToken', token);

      if (checkbox) {
        const SECRET = process.env.VUE_APP_SECRET_KEY;
        const cypherText = CryptoJS.AES.encrypt(password, SECRET).toString();
        await dispatch('setCookie', { username: email, password: cypherText, exdays: 30 });
      } else {
        await dispatch('clearCookie');
      }

      // commit('LOGIN_USER', login);
      router.push('/subscription');
    } catch ({ message }) {
      const messageToDisplay = 'Login error: ' + message.replace('GraphQL error: ', '');
      commit('addNotification', {
        type: messages.DANGER,
        text: messageToDisplay,
      });
    }
  },
  async setUser({ commit }, login) {
    commit('LOGIN_USER', login);
  },
  /* (context) destructured */
  async logOut({ commit }) {
    commit('LOGOUT_USER');
    onLogout(apolloClient);
    router.push('/login');
  },
  setCookie({ commit }, { username, password, exdays }) {
    const exdate = new Date();
    exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdays);

    window.document.cookie = `userName=${username};path=/login;expires=${exdate.toGMTString()}`;
    window.document.cookie = `userPwd=${password};path=/login;expires=${exdate.toGMTString()}`;
  },
  clearCookie({ dispatch }) {
    dispatch('setCookie', { username: '', password: '', exdays: -1 });
  },
  async setToken({ commit, dispatch }, { token }) {
    try {
      commit('SET_TOKEN', token);
      const { data } = await apolloClient.mutate({
        mutation: validateSession,
        variables: {
          token
        },
      });

      commit('setMenuActions', data["validateSession"]);

      await onLogin(apolloClient, token);
    } catch ({ message }) {
      dispatch('logOut')
    }
  },
  async activateAccount({ commit }, data) {
    try {
      const dataA = await apolloClient.mutate({
        mutation: activateUser,
        variables: {
          ...data
        }

      });
      commit('setActivationSuccess')
    } catch ({ message }) {
      const messageToDisplay = 'activateAccount error: ' + message.replace('GraphQL error: ', '');
      commit('addNotification', {
        type: messages.DANGER,
        text: messageToDisplay,
      });
    }
  },
  async test({ commit }, data) {
    try {
      const dataA = await apolloClient.mutate({
        mutation: updateChangeMutation,
        variables: {
          tableName: 'subscription',
          column: 'reference',
          dataValue: 'COT-TEST-1237',
          id: 1237
        }

      });
      commit('setActivationSuccess')
    } catch ({ message }) {
      const messageToDisplay = 'test error: ' + message.replace('GraphQL error: ', '');
      commit('addNotification', {
        type: messages.DANGER,
        text: messageToDisplay,
      });
    }
  }
};
