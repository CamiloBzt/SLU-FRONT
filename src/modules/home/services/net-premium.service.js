import {apolloClient} from '@/lib/api'

/**typeDefs */
import {
    addOrUpdateNetPremium,
    hasInitialRegister
} from './dtos/net-premium.dtos'

/**
 * servicio de la para obtener información y crear registros en la tabla net_premium_values
 *  -servicios
 *      - addOrUpdateNetPremium
 *      - hasInitialRegister  
 */
class NetPremiumServices { 

    /**
     * crea o actualiza registros de la tabla en base de datos
     * @param {number|string} subscriptionId 
     * @param {object} data información a guardar 
     * @param {boolean} usd especifica en que columna de base de datos se va a guardar
     * @returns regresa el objeto si este se creo o regresa 'success' si se actualizo 
     */
    async addOrUpdateNetPremium(subscriptionId ,data , usd){
        try {
            const variables = {
                subscriptionId,
                data,
                usd
            }
    
            const makeRequest = await apolloClient.query({
                query:addOrUpdateNetPremium,
                variables,
                fetchPolicy:'no-cache'
            })
    
            const response = JSON.parse(makeRequest.data['addOrUpdateNetPremium'].response)
            return response 
            
        } catch (error) {
            const message =  String(error)
            throw new Error(message)
        }
    }  
    
    /**
     * regresa true o false si ya tiene un registro existente 
     * @param {number|string} subscriptionId 
     * @return {boolean} 
     */
    async hasInitialRegister(subscriptionId){
        try {
            const  variables = {
                subscriptionId
            }
    
            const findResponse = await apolloClient.query({
                variables,
                query:hasInitialRegister,
                fetchPolicy:'no-cache'
            })
    
            const {exist} = JSON.parse(findResponse.data['hasInitialRegister'].response)
            return exist
        } catch (error) {
            const message =  String(error)
            throw new Error(message)
        }
    }
}


export default new NetPremiumServices()