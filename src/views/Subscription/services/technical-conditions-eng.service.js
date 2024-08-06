import {apolloClient} from '@/lib/api'

/**typeDefs */
import {
    getDeductibles,
    getEngDeductible,
    getSublimits,
    getPayments,
    getBoundClaims,
    findBoundBySubscription,
} from './dtos/technical-conditions.dtos'


/**
 * clase para obtener los technical conditions de una cuenta eng 
 *  - servicio

 *       
 */

class TechnicalConditionsServiceEng {


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

   async getSublimits(subscriptionId){
       try {
           const variables = {
               id:subscriptionId,
               // Solo para cuentas de tipo Eng
               type: 'eng',
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
               // Solo para cuentas de tipo Engineering
               type: 'engineering',
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


            //boundSublimesEng
           const findBoundBySubscription = await this.findBoundBySubscription(subscriptionId)

           const response = {
               deductibles: {
                   UnderlyingCatDeductibles: await this.getDeductibles(subscriptionId)  || [],
                   UnderlyingFireECDeductibles: await this.getEngDeductible(subscriptionId) || [],
               },
               sublime:{
                   catSublimes: findBoundBySubscription.boundSublimesEng || [],
                   allOtherSublimits: await this.getSublimits(subscriptionId) || [],
               },
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

export default new TechnicalConditionsServiceEng()