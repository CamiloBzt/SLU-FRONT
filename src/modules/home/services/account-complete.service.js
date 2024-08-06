import {apolloClient} from '@/lib/api'

/**typeDefs */
import {
    updateToBoundCompleteByIdSubscription,
    getLastAccountCompleteByIdSubscription,
    addAccountComplete,
    getAccountCompleteByIdSubscriptionDate,
    getFirstAccountCompleteByIdSubscription,
    getAllAccountComplete
} from './dtos/account-complete.dtos.js'



/**
 * servicio para crear o obtener información de una account_complete
 *  - servicio
 *      - updateToBoundCompleteByIdSubscription
        - getLastAccountCompleteByIdSubscription
        - addAccountComplete
 *       
 */

class AccountCompleteService {

    /**
     * actualiza el status_id de la cuenta a bound complete
     * @param {number} subscriptionId 
     */
    async updateToBoundCompleteByIdSubscription(subscriptionId, options={}){
        try {
            const variables = {
                subscriptionId,
                transactionId: options.transactionId || null
            }

            const makeRequest = apolloClient.mutate({
                variables,
                mutation:updateToBoundCompleteByIdSubscription
            })
            
            const response = JSON.parse((await makeRequest).data['updateToBoundCompleteByIdSubscription'].response)

            return response
        } catch (error) {
            const message =  String(error)
            throw new Error(message)
        }
    }


    /**
     * obtiene el ultimo registro agredo a la tabla de account_complete
     * @param {number} subscriptionId 
     * @returns {object} 
     */
    async getLastAccountCompleteByIdSubscription(subscriptionId){
        try {
            const variables = {
                subscriptionId
            } 

            const findResponse = await apolloClient.query({
                variables,
                query:getLastAccountCompleteByIdSubscription,
                fetchPolicy:'no-cache'
            })

            const response = JSON.parse(findResponse.data['getLastAccountCompleteByIdSubscription'].response)
            return response
        } catch (error) {
            const message =  String(error)
            throw new Error(message)
        }
    }


    /**
     *  @typedef {object} accountComplete
     *  @property {object} deductibles
     *  @property {object} tiv
     *  @property {object?} additionalInfo
     */

    /**
     * crean un nuevo registro en la base de datos
     * @param {number} subscriptionId 
     * @param {accountComplete} data
     * @returns {object}
    */

    async addAccountComplete (subscriptionId, {
        deductibles,
        tiv,
        netPremium,
        cartera,
        technicalConditions
    },options={}){
        try {
            const variables = {
                subscriptionId,
                tiv,
                deductibles,
                netPremium: netPremium || {},
                additionalInfo: {},
                cartera: cartera || {},
                technicalConditions:technicalConditions || {},
                transactionId: options.transactionId || null
            } 

            const makeRequest = await apolloClient.mutate({
                variables,
                mutation:addAccountComplete,
                fetchPolicy:'no-cache'
            })

            const response = JSON.parse(makeRequest.data['addAccountComplete'].response)
            return response
        } catch (error) {
            const message =  String(error)
            throw new Error(message)
        }
    }
        /**
     * obtiene un registro de la tabla de account_complete con filtro de fecha
     * @param {number} subscriptionId 
     * @param {string} selectedDate 
     * @returns {object} 
     */
        async getAccountCompleteByIdSubscriptionDate(subscriptionId, selectedDate){
            try {
                const variables = {
                    subscriptionId,
                    selectedDate
                } 
    
                const findResponse = await apolloClient.query({
                    variables,
                    query:getAccountCompleteByIdSubscriptionDate,
                    fetchPolicy:'no-cache'
                })
    
                const response = JSON.parse(findResponse.data['getAccountCompleteByIdSubscriptionDate'].response)
                return response
            } catch (error) {
                const message =  String(error)
                throw new Error(message)
            }
        }

    /**
     * obtiene el primer registro agredo a la tabla de account_complete
     * @param {number} subscriptionId 
     * @returns {object} 
     */
    
        async getFirstAccountCompleteByIdSubscription(subscriptionId){
            try {
                const variables = {
                    subscriptionId
                } 
    
                const findResponse = await apolloClient.query({
                    variables,
                    query:getFirstAccountCompleteByIdSubscription,
                    fetchPolicy:'no-cache'
                })
    
                const response = JSON.parse(findResponse.data['getFirstAccountCompleteByIdSubscription'].response)
                return response
            } catch (error) {
                const message =  String(error)
                throw new Error(message)
            }
        }
        
    /**
     * obtiene todos los registros de la tabla de account_complete
     * @param {number} subscriptionId 
     * @returns {object} 
     */
    
        async getAllAccountComplete(subscriptionId){
            try {
                const variables = {
                    subscriptionId
                } 
        
                const findResponse = await apolloClient.query({
                    variables,
                    query:getAllAccountComplete,
                    fetchPolicy:'no-cache'
                })
        
                const response = JSON.parse(findResponse.data['getAllAccountComplete'].response)
                return response
            } catch (error) {
                const message =  String(error)
                throw new Error(message)
            }
            }
    
}


export default new AccountCompleteService()