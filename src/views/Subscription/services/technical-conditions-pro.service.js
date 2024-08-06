import {apolloClient} from '@/lib/api'

/**typeDefs */
import {
    getDeductibles,
    getEngDeductible,
    getSublimesProperty,
    getSublimits,
    getPayments,
    getBoundClaims,
    findBoundBySubscription,
} from './dtos/technical-conditions.dtos'



/**
 * clase para obtener los technical conditions de una cuenta pro 
 *  - servicio

 *       
 */

class TechnicalConditionsServicePro {


     /**
     * @constructor
     */
     constructor(){
        
    }


    async getDeductibles(subscriptionId){
        try {
            const variables = {
                id:subscriptionId,
            } 

            const findResponse = await apolloClient.query({
                variables,
                query:getDeductibles,
                fetchPolicy:'no-cache'
            })

            const response = JSON.parse(findResponse.data['getDeductibles'].response)
            return response
        } catch (error) {
            const message =  String(error)
            throw new Error(message)
        }
    }

    async getEngDeductible(subscriptionId){
        try {
            const variables = {
                id:subscriptionId,
            } 

            const findResponse = await apolloClient.query({
                variables,
                query:getEngDeductible,
                fetchPolicy:'no-cache'
            })

            const response = JSON.parse(findResponse.data['getEngDeductible'].response)
            return response
        } catch (error) {
            const message =  String(error)
            throw new Error(message)
        }
    }

    async getSublimesProperty(subscriptionId){
        try {
            const variables = {
                id:subscriptionId,
            } 

            const findResponse = await apolloClient.query({
                variables,
                query:getSublimesProperty,
                fetchPolicy:'no-cache'
            })

            const response = JSON.parse(findResponse.data['getSublimesProperty'].response)
            return response
        } catch (error) {
            const message =  String(error)
            throw new Error(message)
        }
    }

    async getSublimits(subscriptionId){
        try {
            const variables = {
                id:subscriptionId,
                // Solo para cuentas de tipo Pro
                type: 'prop',
            } 

            const findResponse = await apolloClient.query({
                variables,
                query:getSublimits,
                fetchPolicy:'no-cache'
            })

            const response = JSON.parse(findResponse.data['getSublimits'].response)
            return response
        } catch (error) {
            const message =  String(error)
            throw new Error(message)
        }
    }

    async getPayments(subscriptionId){
        try {
            const variables = {
                id:subscriptionId,
            } 

            const findResponse = await apolloClient.query({
                variables,
                query:getPayments,
                fetchPolicy:'no-cache'
            })

            const response = JSON.parse(findResponse.data['getPayments'].response)
            return response
        } catch (error) {
            const message =  String(error)
            throw new Error(message)
        }
    }

    async getBoundClaims(subscriptionId){
        try {
            const variables = {
                id:subscriptionId,

                // Solo para cuentas de tipo Property
                type: 'property',
            } 

            const findResponse = await apolloClient.query({
                variables,
                query:getBoundClaims,
                fetchPolicy:'no-cache'
            })

            const response = JSON.parse(findResponse.data['getBoundClaims'].response)
            return response
        } catch (error) {
            const message =  String(error)
            throw new Error(message)
        }
    }

    async findBoundBySubscription(subscriptionId){
        try {
            const variables = {
                id:subscriptionId,

                // Solo para cuentas de tipo Property
                type: 1,
            } 

            const findResponse = await apolloClient.query({
                variables,
                query:findBoundBySubscription,
                fetchPolicy:'no-cache'
            })

            const response = JSON.parse(findResponse.data['findBoundBySubscription'].response)
            return response
        } catch (error) {
            const message =  String(error)
            throw new Error(message)
        }
    }

    async getData(subscriptionId){
        try {
            const UnderlyingCatDeductibles = await this.getDeductibles(subscriptionId) || []
            const UnderlyingFireECDeductibles = await this.getEngDeductible(subscriptionId) || []

            const catSublimes = await this.getSublimesProperty(subscriptionId) || []
            const allOtherSublimits = await this.getSublimits(subscriptionId) || []

            const deductibles = UnderlyingCatDeductibles.map(u => {
                return {
                    UnderlyingCatDeductibles: u,
                    UnderlyingFireECDeductibles: UnderlyingFireECDeductibles.filter(uF => uF.deductible_id === u.id)
                }
            })

            const sublime = catSublimes.map(s => {
                return {
                    catSublimes: s,
                    allOtherSublimits: allOtherSublimits.filter(aOS => aOS.sublime_id === s.id)
                }
            })

            const findBoundBySubscription = await this.findBoundBySubscription(subscriptionId)

            const response = {
                deductibles,
                sublime,
                premiumPayment: await this.getPayments(subscriptionId),
                claims: await this.getBoundClaims(subscriptionId),
                rational:{
                    offerComment: findBoundBySubscription.bound.rational_comments,
                },
                riskProfile:{
                    offerComment:findBoundBySubscription.bound.risk_profile_comments,
                    typeOfClause: findBoundBySubscription.bound.risk_profile_clause,
                    exposureByNeighborhood: findBoundBySubscription.bound.risk_profile_exposure,
                    riskProfileHousekeeping: findBoundBySubscription.bound.risk_profile_housekeeping,
                },
            }


            return response
        } catch (error) {
            const message =  String(error)
            throw new Error(message)
        }
    }

    
}


export default new TechnicalConditionsServicePro()