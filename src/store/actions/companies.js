/* api */
import { apolloClient } from "../../lib/api";

/* mutaciones */
import ADD_COMPANY_MUTATION from "./mutations/addCompany";

/* queries */
/* ... */

/* constantes */
import messages from "../../constants/messages";

export default {
  async createCompany({ commit }, { addCompany }) {
    try {
      commit("SAVE_ADD_COMPANY", addCompany);
      const { name, address, phone, type, country } = addCompany
      const variables = {
        name,
        type,
        phone,
        address,
        country,
      }

      const { data } = await apolloClient.mutate({
        mutation: ADD_COMPANY_MUTATION,
        variables,
        fetchPolicy: 'no-cache',
      })

      const { statusCode, response } = data.addCompany
      if (statusCode !== 200) throw new Error('Create Company Error')

      commit("addNotification", {
        type: messages.SUCCESS,
        text: "Company created!",
      })

      commit("RESET_ADD_COMPANY")
    } catch ({ message }) {
      const messageToDisplay = 'createCompany error: ' + message.replace("GraphQL error: ", "")
      commit("addNotification", {
        type: messages.DANGER,
        text: messageToDisplay,
      })
    }
  },
};
