import {apolloClient} from '@/lib/api'
import numeral from 'numeral'
import { formatInfo, mapObject } from '@/lib/utils'
import Decimal from '@/lib/decimal'

// servicios de account_complete
import AccountCompleteService from '@/modules/home/services/account-complete.service'
import TechnicalConditionsNonPropService from './technical-conditions-non-prop.service'
import TransactionsService from '@/application/services/transactions.service'

/**typeDefs */
import {
    findQuotationBySubscription,
    getNetPremiumOriginalCurrencyById,
    getNetPremiumByIdSubscription,
    getTotalInsurableValueById,
    getSubmissionBySubscriptionId
} from './dtos/create-account-complete.dtos'


const properties = new Map(([
    ['stocksRate','porcentaje'],
    ['limit','limitedInsured'],
    ['limitUsd','limitedInsuredUsd'],
    ['excess','attachPoint'],
    ['excessUsd','attachPointUsd'],
    ['sluLimitUsd','sluExposure'],
    ['sluPremiumUsd','sluPremium']
]))


/**
 * clase para obtener información de una cuenta non prop y aparir de esta hacer una copia de la misma
 *  - servicio
        - findQuotationBySubscriptionId
        - getTotalInsurableValueBySubscriptionId 
        - getNetPremiumByIdSubscription
        - addInitialRegister
 *       
 */

class AccountCompleteServiceNonProp {

     /**
     * @constructor
     * @template {typeof import('@/modules/home/services/account-complete.service').default} T
     * @template {typeof import('@/views/Subscription/services/technical-conditions-non-prop.service').default} TechnicalConditionsNonPropService
     * @template {typeof import('@/application/services/transactions.service').default} TransactionsService
     * @param  {T} accountCompleteService 
     * @param  {TechnicalConditionsNonPropService} technicalConditionsNonPropService
     * @param  {TransactionsService} transactionsService 
     * 
     */
     constructor(accountCompleteService, technicalConditionsNonPropService, transactionsService){
        this.AccountCompleteService = accountCompleteService
        this.TechnicalConditionsNonPropService = technicalConditionsNonPropService
        this.TransactionsService = transactionsService
    }

    /**
     *  busca información necesaria de quotation para crear el account_complete  
     * @param {number} subscriptionId 
     * @returns {object} regresa la información con el formato adecuado 
     */
    async findQuotationBySubscriptionId (subscriptionId){
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

            let { quotation } = JSON.parse(findResponse.data['findQuotationBySubscription'].response)
            
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

            return quotation
        } catch (error) {
            const message =  String(error)
            throw new Error(message)
        }
    }

    /**
     * método para hacer los cálculos del net-premium del apartado tiv
     * @param {number} subscriptionId 
     * @returns 
     */

    async calculatePremium(subscriptionId){
        try {
            const variables = {
                id_subscription:subscriptionId
            }

            const findResponse = await apolloClient.query({
                variables,
                query:getNetPremiumOriginalCurrencyById,
                fetchPolicy:'no-cache'
            })

            const {
                QuotationInsured, 
                Layers, 
                Quotation:quotation
            } = JSON.parse(findResponse.data['getNetPremiumOriginalCurrencyById'].response)
            
            const selectedLayer = Layers[0]
            const premium = numeral(selectedLayer.premium).value() || 0
            const total = numeral(QuotationInsured.total).value() || 0
            const propertyDamage = numeral(QuotationInsured.property_damage).value() || 0
            const businessInterruption = numeral(QuotationInsured.business_interruption).value() || 0
            const stock = numeral(QuotationInsured.stock).value() || 0
            const porcentaje = numeral(QuotationInsured.stock_percentaje).value() || 0

            const rate = Decimal.div(premium,total).mul(1000).toNumber() || 0 
            const rateStock = Decimal.div(premium,total).mul(10).mul(porcentaje).toNumber()

            const premiumDamage = Decimal.mul(propertyDamage , rate).div(1000).toNumber() || 0
            const premiumBI = Decimal.mul(businessInterruption , rate).div(1000).toNumber() || 0
            const premiumStock = Decimal.mul(stock , rateStock).div(1000).toNumber() || 0
            const exchange = numeral(quotation.exchange_rate).value() || 0
            const premiumDamageUsd = Decimal.div(premiumDamage, exchange).toNumber() || 0
            const premiumBIUsd = Decimal.div(premiumBI, exchange).toNumber() || 0
            const premiumStockUsd = Decimal.div(premiumStock, exchange).toNumber() || 0
            const totalInsured = Decimal.sum(premiumDamage, premiumBI ,premiumStock).toNumber()
            const  totalUsd = Decimal.sum(premiumDamageUsd, premiumBIUsd ,premiumStockUsd).toNumber()
            
            return{
                propertyDamage: premiumDamage,
                propertyDamageUsd:premiumDamageUsd,
                propertyDamageRate:rate,
                businessInterruption:premiumBI,
                businessInterruptionUsd:premiumBIUsd,
                businessInterruptionRate:rate ,
                stock:premiumStock,
                stockUsd:premiumStockUsd,
                stockRate:rateStock,
                stockPercentaje: porcentaje,
                totalInsured,
                totalUsd,

            }
        
        } catch (error) {
            const message =  String(error)
            throw new Error(message)   
        }
    }

    /**
     * método para obtener información de los aparatados de layers, quotationInsure y quotation 
     * @param {number} subscriptionId 
     * @returns {object} regresa la información con el formato adecuado 
     */

    async getTotalInsurableValueBySubscriptionId(subscriptionId){
        try {
            const variables = {
                id_subscription:subscriptionId
            } 

            const findResponse = await apolloClient.query({
                variables,
                query:getTotalInsurableValueById,
                fetchPolicy:'no-cache'
            })

            let {
                layers,
                boundNonPropTotalInsurableValue,
                quotationInsured,
            } = JSON.parse(findResponse.data['getTotalInsurableValueById'].response)
        

           layers = _.omit(layers,[
            'active',
            'checked',
            'createdAt',
            'deductions',
            'layer',
            'updatedAt',
            'subscriptionId',
            'id',
            'sluPremium'
           ])

           layers = formatInfo(layers)
           layers = mapObject(layers, (key) => {
            if(!properties.has(key)) return key
            return properties.get(key)
           })

           boundNonPropTotalInsurableValue= _.pick(boundNonPropTotalInsurableValue,[
            'stocksRate'
           ])

           boundNonPropTotalInsurableValue = formatInfo(boundNonPropTotalInsurableValue)

           quotationInsured = _.omit(quotationInsured,[
            'active',
            'id',
            'subscriptionId',
            'updatedAt',
            'createdAt',
            'rateUsd',
            'rate',
            'stockPercentaje',
            'pml',
            'pmlUsd'
           ])

           quotationInsured = formatInfo(quotationInsured)
       
            const response = {
                boundInsurableProp:layers,
                insurable:{ 
                    ...quotationInsured,
                    ...boundNonPropTotalInsurableValue
                },   
            }

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

        const deductibles = await this.findQuotationBySubscriptionId(
        subscriptionId
        )

        const {boundInsurableProp, insurable } = await this.getTotalInsurableValueBySubscriptionId(
        subscriptionId
        )

        const premium = await this.calculatePremium(subscriptionId)

        const {original_values , usd_values }= await this.getNetPremiumByIdSubscription(
         subscriptionId
        )

        const tiv = {
         insurable:{...insurable},
         premium:{...premium},
         boundInsurableProp: (boundInsurableProp.sluShare && !boundInsurableProp.sluLine) 
            ? {...boundInsurableProp, sluLine: boundInsurableProp.sluShare} 
            : {...boundInsurableProp}
        }

        if (tiv.boundInsurableProp.sluShare && tiv.boundInsurableProp.sluLine) {
            delete tiv.boundInsurableProp.sluShare
        }

        if (tiv.insurable.stocksRate) {
            delete tiv.insurable.stocksRate
        }

        const  netPremium = {
        original_values:{...original_values},
        usd_values:{...usd_values}
        }

        const submission = await this.getSubmissionBySubscriptionId(subscriptionId);

        const technicalConditions = await this.TechnicalConditionsNonPropService.getData(subscriptionId)
        
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


export default new AccountCompleteServiceNonProp(AccountCompleteService, TechnicalConditionsNonPropService, TransactionsService)