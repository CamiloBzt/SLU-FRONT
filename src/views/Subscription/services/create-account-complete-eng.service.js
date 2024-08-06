import {apolloClient} from '@/lib/api'
import { formatInfo, mapObject } from '@/lib/utils'

//servicios
import AccountCompleteService from '@/modules/home/services/account-complete.service'
import TechnicalConditionsEngService from './technical-conditions-eng.service'
import TransactionsService from '@/application/services/transactions.service'

/**typeDefs */
import {
    findQuotationBySubscription,
    findBoundBySubscription,
    getNetPremiumByIdSubscription,
    getSubmissionBySubscriptionId,
} from './dtos/create-account-complete.dtos'

//adaptación para cambio de nombres de propiedades para una cuenta eng
const propertyEng = new Map(([
    ['business_interruption','alop'],
    ['business_interruption_usd','alopUsd'],
    ['business_interruption_rate','alopRate'],
    ['property_damage','allRisk'],
    ['property_damage_usd','allRiskUsd'],
    ['property_damage_rate','allRiskRate']
]))
  

/**
 * clase para obtener información de una cuenta engineering y aparir de esta hacer una copia de la misma
 *  - servicio
        - findQuotationBySubscription
        - findBoundBySubscription 
        - getNetPremiumByIdSubscription
        - addInitialRegister
 *       
 */

class AccountCompleteServiceEng {
    
   
    /**
     * @constructor
     * @template {typeof import('@/modules/home/services/account-complete.service').default} T
     * @template {typeof import('@/views/Subscription/services/technical-conditions-eng.service').default} TechnicalConditionsEngService
     * @template {typeof import('@/application/services/transactions.service').default} TransactionsService
     * @param  {T} accountCompleteService 
     * @param {TechnicalConditionsEngService} technicalConditionsEngService
     * @param  {TransactionsService} transactionsService 
     */
    constructor(accountCompleteService,technicalConditionsEngService,transactionsService){
        this.AccountCompleteService = accountCompleteService
        this.TechnicalConditionsEngService = technicalConditionsEngService
        this.TransactionsService = transactionsService
    }

    /**
     *  busca información necesaria de quotation para crear el account_complete  
     * @param {number} subscriptionId 
     * @returns {object} regresa la información con el formato adecuado 
     */
    async findQuotationBySubscription (subscriptionId){
        try {
            const variables = {
                id:subscriptionId,
                type:1
            } 

            const findResponse = await apolloClient.query({
                variables,
                query:findQuotationBySubscription,
                fetchPolicy:'no-cache'
            })

            let {insurable, quotation,  premium, tobe } = JSON.parse(findResponse.data['findQuotationBySubscription'].response)
            

            tobe = _.pick(tobe,[
                'limit_slu',
                'limit_slu_usd'
            ])

            tobe = formatInfo(tobe)

            //**obtenerlos las propiedades que se ban a usar de quotations, quotation_insurable y quotation_to_be */
            quotation =  _.pick(quotation, [
                'brokerage', 
                'deduction_type', 
                'eng', 
                'fronting', 
                'lta', 
                'others', 
                'premium_reserve' , 
                'taxes',
                'exchange_rate',
                'inception_date',
                'expiry_date',
            ])

            quotation = formatInfo(quotation)

            /**sacamos propiedades que van a usar de los cálculos de tiv */
            insurable = _.omit(insurable,[
                'active',
                'id',
                'updated_at',
                'created_at',
                'subscription_id',
                'stock',
                'stock_usd'
            ])

            insurable = formatInfo(insurable)

            ///sacamos la propiedades sacamos propiedades que van a usar de premium 
            premium = _.omit(premium,[
                'active',
                'id',
                'updated_at',
                'created_at',
                'subscription_id',
                'total',
                'stock',
                'stock_rate',
                'stock_usd'
            ])

            premium = formatInfo(premium)

            //cambiamos los nombre de las propiedades del objeto
            insurable = mapObject(insurable,(key) => {
                if(!propertyEng.has(key)) return key
                return propertyEng.get(key)
            })

            premium = mapObject(premium,(key) =>{
                if(!propertyEng.has(key)) return key
                return propertyEng.get(key)
            })
            
            const response  = {
                quotation,
                insurable,
                premium,
                tobe
            }

            return response
        } catch (error) {
            const message =  String(error)
            throw new Error(message)
        }
    }

    /**
     * busca información necesaria de bound insurable  para crear el account_complete
     * @param {number} subscriptionId 
     * @returns {object} regresa la información con el formato adecuado 
     */

    async findBoundBySubscription(subscriptionId){
        try {
            const variables = {
                id:subscriptionId
            } 

            const findResponse = await apolloClient.query({
                variables,
                query:findBoundBySubscription,
                fetchPolicy:'no-cache'
            })

            let { boundInsurable } = JSON.parse(findResponse.data['findBoundBySubscription'].response)
            //sacamos las propiedades que no se van a usar de data
            boundInsurable = _.pick(boundInsurable,[
                'pml',
                'result_pml',
                'slu_premium',
                'slu_exposure',
                'type_select',
                'slu_line',
                'total'
            ])

            boundInsurable = formatInfo(boundInsurable)
            return boundInsurable
        } catch (error) {
            const message =  String(error)
            throw new Error(message)
        }
    }

    /**
     * busca información necesaria de net premium values para crear el account_complete
     * @param {number} subscriptionId 
     * @returns {object} regresa la información con el formato adecuado 
     */
    async getNetPremiumByIdSubscription (subscriptionId){
        try {
            const variables = {
                subscriptionId
            } 

            const findResponse = await apolloClient.query({
                variables,
                query:getNetPremiumByIdSubscription,
                fetchPolicy:'no-cache'
            })

            let {original_values, usd_values} = JSON.parse(findResponse.data['getNetPremiumByIdSubscription'].response)
            
            //formateamos los valores antes de enviarlos
            original_values = formatInfo(original_values)
            usd_values = formatInfo(usd_values)
            
            return {
                original_values,
                usd_values
            }
        } catch (error) {
            const message =  String(error)
            throw new Error(message)
        }
    }

    async getSubmissionBySubscriptionId(subscriptionId){
        try {
            const variables = {
                id:subscriptionId,
            } 

            const findResponse = await apolloClient.query({
                variables,
                query:getSubmissionBySubscriptionId,
                fetchPolicy:'no-cache'
            })

            let submission = JSON.parse(findResponse.data['getSubmissionBySubscriptionId'].response)

            submission = _.pick(submission, [
                'broker',
                'catalog_country_id',
                'insured_name',
            ])

            return submission
        } catch (error) {
            const message =  String(error)
            throw new Error(message)
        }
    }


    /**
     * implementación de todos lo método pasados para crear la nueva cuenta
     * @param {number} subscriptionId 
     */

    async addInitialRegister(subscriptionId){
        let transactionId;
        try {
            transactionId = (await this.TransactionsService.startTransaction()).transactionId;

        const {quotation, insurable , premium, tobe } = await this.findQuotationBySubscription(
        subscriptionId
        )

        const boundInsurable = await this.findBoundBySubscription(
        subscriptionId
        )

        const {original_values , usd_values }= await this.getNetPremiumByIdSubscription(
         subscriptionId
        )

        const deductibles = {...quotation}
        const tiv = {
         insurable:{...insurable},
         premium:{...premium},
         boundInsurableProp:{...boundInsurable , ...tobe}
        }
        const  netPremium = {
        original_values:{...original_values},
        usd_values:{...usd_values}
        }

        const submission = await this.getSubmissionBySubscriptionId(subscriptionId);

        const technicalConditions = {
            ...await this.TechnicalConditionsEngService.getData(subscriptionId)
        }

        const ifExistInitialRegister 
        = await this.AccountCompleteService.getLastAccountCompleteByIdSubscription(subscriptionId)
         

        if(ifExistInitialRegister) throw new Error('This account already has a initial register')

        await this.AccountCompleteService.updateToBoundCompleteByIdSubscription(subscriptionId, { transactionId })

        await this.AccountCompleteService.addAccountComplete(subscriptionId, {
            deductibles:{
                ...deductibles, 
                ...submission
            },
            tiv,
            netPremium,
            technicalConditions,
        }, { transactionId })
       
        const existTransaction = (await this.TransactionsService.existTransaction(transactionId)).exist;
        if (existTransaction) {
            await this.TransactionsService.commitTransaction(transactionId)
        }

        } catch (error) {
            const existTransaction = (await this.TransactionsService.existTransaction(transactionId)).exist;
            if (existTransaction) {
                await this.TransactionsService.rollbackTransaction(transactionId)
            }
            const message =  String(error)
            throw new Error(message)
        }
    }

}


export default new AccountCompleteServiceEng(AccountCompleteService, TechnicalConditionsEngService, TransactionsService)