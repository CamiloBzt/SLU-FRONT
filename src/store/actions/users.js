/* api */
import { apolloClient } from "../../lib/api";

/* queries */
import getUsersList from "./queries/getUsersList";
import getUserByNameQuery from "./queries/getUserByName";
import getSignatureByEmailQuery from './queries/getSignatureByEmail';
import GET_USER_BY_ID from "./queries/getUserById";

/* mutations */
import CREATE_SLU_USER_MUTATION from "./mutations/createSluUser";
import CREATE_SLU_USER_NEW_MUTATION from "./mutations/createUserNew";
import UPDATE_SLU_USER_NEW_MUTATION from "./mutations/updateUserNew";
import DELETE_SLU_USER from "./mutations/deleteUser";
import RESEND_MAIL_USER from "./mutations/resendMail";

/* contantes */
import messages from "../../constants/messages";

export default {
  async getAllUsers({ commit, dispatch }) {
    try {
      const {
        data: { getAllUsers },
      } = await apolloClient.query({
        query: allUserQuery,
      });
    } catch ({ message }) {
      const messageToDisplay = 'getAllUsers error: ' + message.replace("GraphQL error: ", "");
      commit("addNotification", {
        type: messages.DANGER,
        text: messageToDisplay,
      });
    }
  },

  async getListUsers({ commit, dispatch }) {
    try {
      console.log("Entrando")
      const { data } = await apolloClient.query({
        query: getUsersList,
      });
      commit('setUsersList', { users: data["getUsersList"] })
    } catch ({ message }) {
      console.log(message)
      const messageToDisplay = 'getListUsers error: ' + message.replace("GraphQL error: ", "");
      commit("addNotification", {
        type: messages.DANGER,
        text: messageToDisplay,
      });
    }
  },
  async resendMail({commit }, user) {
    try {
      console.log(user)
      const variables = {
        userId: user.id
      }
      const {
        data: { resendMail },
      } = await apolloClient.mutate({
        mutation: RESEND_MAIL_USER,
        variables,
        fetchPolicy: "no-cache",
      });
      commit("addNotification", {
        type: messages.SUCCESS,
        text: "Resend Mail for Activation!",
      });
    }catch({message}) {
      console.log(message)
      const messageToDisplay = 'resendMail error: ' + message.replace("GraphQL error: ", "");
      commit("addNotification", {
        type: messages.DANGER,
        text: messageToDisplay,
      });
    }
  },
  async deleteUser({ commit, dispatch }, {id}) {
    const variables = {
      userId: id
    }
    try {
      const {
        data: { deleteUser },
      } = await apolloClient.mutate({
        mutation: DELETE_SLU_USER,
        variables,
        fetchPolicy: "no-cache",
      });
      commit("deleteUser", id);
      commit("addNotification", {
        type: messages.SUCCESS,
        text: "SLU User Deleted!",
      });
    }catch ({ message }) {
      const messageToDisplay = 'deleteUser error: ' + message.replace("GraphQL error: ", "");
      commit("addNotification", {
        type: messages.DANGER,
        text: messageToDisplay,
      });
    }
    
  },
  async createUserTest({ commit }, userData) {
    const variables = {
      ...userData
    }
    try {
      const method = userData.id ? 'updateUser' : 'createUserNew'
      // console.log(userData.id ? UPDATE_SLU_USER_NEW_MUTATION : CREATE_SLU_USER_NEW_MUTATION)
        const {
          data,
        } = await apolloClient.mutate({
          mutation: userData.id ? UPDATE_SLU_USER_NEW_MUTATION : CREATE_SLU_USER_NEW_MUTATION,
          variables,
          fetchPolicy: "no-cache",
        });
      console.log(data, data[method])
      if (data[method].statusCode && data[method].statusCode == 400) {
        const messageToDisplay = 'createUserTestStatus error: ' + data[method].message.replace("GraphQL error: ", "");
        commit("addNotification", {
          type: messages.DANGER,
          text: messageToDisplay,
        });
      }
      else 
        commit("addNotification", {
          type: messages.SUCCESS,
          text: "SLU User Success!",
        });
    }catch({message}) {
      console.log(message)
      const messageToDisplay = 'createUserTest error: ' + message.replace("GraphQL error: ", "");
      commit("addNotification", {
        type: messages.DANGER,
        text: messageToDisplay,
      });
    }

  },
  async createUser({ commit }, { createUserData }) {
    try {
      commit('SAVE_CREATE_SLU_USER', createUserData)
      const variables = {
        role: createUserData.userRole,
        name: createUserData.userName,
        email: createUserData.userEmail,
        phone: createUserData.userPhone,
        company: createUserData.userCompany.id,
        country: createUserData.userCountry.id,
        address: createUserData.userAddress,
        lastName: createUserData.userLastName,
        signature: createUserData.userSignature,
      };
      const {
        data: { createSluUser },
      } = await apolloClient.mutate({
        mutation: CREATE_SLU_USER_MUTATION,
        variables,
        fetchPolicy: "no-cache",
      });

      const { statusCode, message } = createSluUser;
      if (statusCode !== 200) throw new Error(message);

      commit("addNotification", {
        type: messages.SUCCESS,
        text: "SLU User Created!",
      });

      commit("RESET_CREATE_SLU_USER");
    } catch ({ message }) {
      const messageToDisplay = 'createUser error: ' + message.replace("GraphQL error: ", "");
      commit("addNotification", {
        type: messages.DANGER,
        text: messageToDisplay,
      });
    }
  },
  async getUserById({commit}, userId) {
    try {
      const {
        data: { getUserById },
      } = await apolloClient.query({
        query: GET_USER_BY_ID,
        variables: {
          userId: parseFloat(userId),
        },
        fetchPolicy: "no-cache",
      });
      commit("setUserEdit", getUserById);
    } catch ({ message }) {
      const messageToDisplay = 'getUserById error: ' + message.replace("GraphQL error: ", "");
      commit("addNotification", {
        type: messages.DANGER,
        text: messageToDisplay,
      });
    }
  },
  async resetUserEdit({commit}) {
    try {
      commit("setUserEdit", {});
    } catch ({ message }) {
      const messageToDisplay = 'resetUserEdit error: ' + message.replace("GraphQL error: ", "");
      commit("addNotification", {
        type: messages.DANGER,
        text: messageToDisplay,
      });
    }
  },
  async usersName({ commit, dispatch }, { name }) {
    try {
      const {
        data: { getUsersByName },
      } = await apolloClient.query({
        query: getUserByNameQuery,
        variables: {
          name,
        },
        fetchPolicy: "no-cache",
      });

      const { statusCode, response } = getUsersByName;
      if (statusCode !== 200) throw new Error('Error getting Users');

      const parsedResponse = JSON.parse(response)
      const users = parsedResponse.map(value => {
        const { id, name, last_name } = value;
        return {
          id,
          name,
          last_name,
          value: `${name} ${last_name}`,
        };
      });
      commit("setMentionsObject", users);
    } catch ({ message }) {
      const messageToDisplay = 'usersName error: ' + message.replace("GraphQL error: ", "");
      commit("addNotification", {
        type: messages.DANGER,
        text: messageToDisplay,
      });
    }
  },
  async getSignatureByEmail({ commit, dispatch }, { email }) {
    try {
      const {
        data: { getSignatureByEmail },
      } = await apolloClient.query({
        query: getSignatureByEmailQuery,
        variables: {
          email
        },
        fetchPolicy: 'no-cache',
      })

      const { statusCode, signature } = getSignatureByEmail
      if (statusCode !== 200) throw new Error('Error getting signature by email')

      commit('setUserSignature', signature);
    } catch ({ message }) {
      const messageToDisplay = 'getSignatureByEmail error: ' + message.replace('GraphQL error: ', '')

      commit('addNotification', {
        type: messages.DANGER,
        text: messageToDisplay,
      })
    }
  },
};
