import {apolloClient} from '@/lib/api'

/**typeDefs */
import {
    updateToBoundCompleteByIdSubscription,
    isAccountComplete,
    getTypeQuotationBySubscription
} from './dtos/subscription.dtos'

/**
 *  servicio para obtención de información de una subscription 
 *  - services
 *      - updateToBoundCompleteByIdSubscription
 *      - isAccountComplete
 */

class SubscriptionService {
 
    /**
     * actualiza el estado (status_id) de la subscription a bound_complete 
     * @param {number} subscriptionId 
     * @returns {object} 
     */

    async updateToBoundCompleteByIdSubscription(subscriptionId){
        try {
            const variables = {
                subscriptionId
            }
    
            const makeRequest = await apolloClient.mutate({
                variables,
                mutation:updateToBoundCompleteByIdSubscription,
                fetchPolicy:'no-cache'
            })
    
            const response  =  JSON.parse(makeRequest.data['updateToBoundCompleteByIdSubscription'].response)
            return response
            
        } catch (error) {
            const message =  String(error)
            throw new Error(message)
        }
    }

    /**
     * regresa un true si el cuenta esta en estado bound_Complete
     * @param {number} subscriptionId 
     * @returns {boolean}
     */
    
    async isAccountComplete(subscriptionId){
        try {
            const variables = {
                subscriptionId
            }
    
            const makeRequest  = await apolloClient.query({
                variables,
                query:isAccountComplete,
                fetchPolicy:'no-cache'
            })
    
            const {isAccountComplete:isBoundComplete } = JSON.parse(makeRequest.data['isAccountComplete'].response)
            return isBoundComplete
            
        } catch (error) {
            const message =  String(error)
            throw new Error(message)
        }
    }

    /**
     * regresa el tipo de la quotation si este es prop o non prop 
     * 1 == prop y  2 == non prp
     * @param {number|string} subscriptionId 
     * @returns 
     */
    async getTypeQuotationBySubscription(subscriptionId){
        try {
            const variables = {
                subscriptionId
            }
    
            const makeRequest  = await apolloClient.query({
                variables,
                query:getTypeQuotationBySubscription,
                fetchPolicy:'no-cache'
            })
    
            const tyeQuotation = JSON.parse(
                makeRequest.data['getTypeQuotationBySubscription'].response
            )

            return tyeQuotation
            
        } catch (error) {
            const message =  String(error)
            throw new Error(message)
        }
    }
}


export default new SubscriptionService()