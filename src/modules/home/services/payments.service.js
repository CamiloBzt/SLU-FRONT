import {apolloClient} from '@/lib/api'

/**typedDefs */
import {
/**queries */
getClauses,
getPayments,

/**mutations */
addOrUpdatedPayment,
deletePayment
} from './dtos/payments.dtos'


/**
 *  clase para manejar todos los datos de payments
 *  - services:
 *      - getClauses  regresa todo las clause de la base de datos que puede tener un payment
 *      - geyPayment  regresa todos los pagos de una cuenta guardados en la base de datos
 *      - addOrUpdatePayment edita o crea un nuevo payment a una cuenta dados la column y su valor
 *      - deletePayment desactiva el payment con el id enviado
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
}


export default new PaymentServices()