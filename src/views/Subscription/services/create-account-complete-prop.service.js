import {apolloClient} from '@/lib/api'
import { formatInfo } from '@/lib/utils'


// servicios de account_complete
import AccountCompleteService from '@/modules/home/services/account-complete.service'
import TechnicalConditionsServicePro from './technical-conditions-pro.service'
import TransactionsService from '@/application/services/transactions.service'



/**typeDefs */
import {
    findQuotationBySubscription,
    getBoundInsurablePropByIdSubscription,
    getNetPremiumByIdSubscription,
    getSubmissionBySubscriptionId,
} from './dtos/create-account-complete.dtos'




/**
 * clase para obtener información de una cuenta prop y aparir de esta hacer una copia de la misma
 *  - servicio
        - findQuotationBySubscription
        - getBoundInsurablePropByIdSubscription 
        - getNetPremiumByIdSubscription
        - addAccountComplete
 *       
 */

class AccountCompleteServiceProp {


     /**
     * @constructor
     * @template {typeof import('@/modules/home/services/account-complete.service').default} T
     * @template {typeof import('@/views/Subscription/services/technical-conditions-pro.service').default} TechnicalConditionsServicePro
     * @template {typeof import('@/application/services/transactions.service').default} TransactionsService
     * @param  {T} accountCompleteService 
     * @param  {TechnicalConditionsServicePro} technicalConditionsServicePro 
     * @param  {TransactionsService} transactionsService 
     */
     constructor(accountCompleteService, technicalConditionsServicePro, transactionsService){
        this.AccountCompleteService = accountCompleteService
        this.TechnicalConditionsServicePro = technicalConditionsServicePro
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

            let {insurable, quotation,  premium} = JSON.parse(findResponse.data['findQuotationBySubscription'].response)
            
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
            ])

            insurable = formatInfo(insurable)

            ///sacamos la propiedades sacamos propiedades que van a usar de premium 
            premium = _.omit(premium,[
                'active',
                'id',
                'updated_at',
                'created_at',
                'subscription_id',
                'total'
            ])

            premium = formatInfo(premium)

            const response  = {
                quotation,
                insurable,
                premium
            }

            return response
        } catch (error) {
            const message =  String(error)
            throw new Error(message)
        }
    }

    /**
     * busca información necesaria de bound insurable prop para crear el account_complete
     * @param {number} subscriptionId 
     * @returns {object} regresa la información con el formato adecuado 
     */

    async getBoundInsurablePropByIdSubscription(subscriptionId){
        try {
            const variables = {
                subscriptionId
            } 

            const findResponse = await apolloClient.query({
                variables,
                query:getBoundInsurablePropByIdSubscription,
                fetchPolicy:'no-cache'
            })

            let response = JSON.parse(findResponse.data['getBoundInsurablePropByIdSubscription'].response)
            
            //sacamos las propiedades que no se van a usar de data
            response = _.omit(response,[
                'id',
                'active',
                'subscription_id',
                'created_at',
            ])

            response = formatInfo(response)
            return response
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

            const {quotation, insurable , premium } = await this.findQuotationBySubscription(
            subscriptionId
            )

            const boundInsurableProp = await this.getBoundInsurablePropByIdSubscription(
            subscriptionId
            )

            const {original_values , usd_values }= await this.getNetPremiumByIdSubscription(
                subscriptionId
            )

            const deductibles = {...quotation}
            const tiv = {
                insurable:{...insurable},
                premium:{...premium},
                boundInsurableProp:{...boundInsurableProp}
            }
            const  netPremium = {
            original_values:{...original_values},
            usd_values:{...usd_values}
            }

            const submission = await this.getSubmissionBySubscriptionId(subscriptionId);
            
            const technicalConditions = await this.TechnicalConditionsServicePro.getData(subscriptionId)

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
                technicalConditions
            },
            { transactionId })

            const existTransaction = (await this.TransactionsService.existTransaction(transactionId)).exist;
            if (existTransaction) {
                await this.TransactionsService.commitTransaction(transactionId)
            }
        } catch (error) {
            console.log(error);
            const existTransaction = (await this.TransactionsService.existTransaction(transactionId)).exist;
            if (existTransaction) {
                await this.TransactionsService.rollbackTransaction(transactionId)
            }
            const message =  String(error)
            throw new Error(message)
        }
    }
    
}


export default new AccountCompleteServiceProp(AccountCompleteService, TechnicalConditionsServicePro, TransactionsService)