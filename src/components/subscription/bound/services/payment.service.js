import {apolloClient} from '@/lib/api'

/**typedDefs */
import {
/**queries */
getClauses,
getPayments,

/**mutations */
addOrUpdatedPayment,
deletePayment,
addOrUpdatedPayments,
} from './dtos/payment.dtos'


/**
 *  clase para manejar todos los datos de payments
 */

class PaymentServices  {
  async getClauses(){
      const findResponse  = await apolloClient.query({
        query:getClauses,
        fetchPolicy:'no-cache'
      })

      const response = JSON.parse(findResponse.data['getClauses'].response)
      return response
  }

  async getPayments (subscriptionId){
    const variables  = {
        subscriptionId:subscriptionId
    }
    const findResponse  = await apolloClient.query({
        query:getPayments,
        variables,
        fetchPolicy:'no-cache'
      })

      const response = JSON.parse(findResponse.data['getPayments'].response)
      return response
  }

  async addOrUpdatePayment({id, column , value}, index , subscriptionId){
     const variables = {
        id,
        column,
        value,
        index,
        subscriptionId
     }

     const makeRequest = await apolloClient.query({
        query:addOrUpdatedPayment,
        variables,
        fetchPolicy:'no-cache'
     })
     const response =  JSON.parse(makeRequest.data['addOrUpdatedPayment'].response)
     return response
  }

  async deletePayment(id ,subscriptionId){
    const variables = {
      id,
      subscriptionId
    }

    const makeRequest =  await apolloClient.query({
      query:deletePayment,
      variables,
      fetchPolicy:'no-cache'
    })

    const response = JSON.parse(makeRequest.data['deletePayment'].response)
    return response
  }

  async addOrUpdatePayments(installments, subscriptionId){
    const variables = {
      installments,
      subscriptionId
    }

    const makeRequest = await apolloClient.query({
       query:addOrUpdatedPayments,
       variables,
       fetchPolicy:'no-cache'
    })
    const response =  JSON.parse(makeRequest.data['addOrUpdatedPayments'].response)
    return response
 }
}


export default new PaymentServices()