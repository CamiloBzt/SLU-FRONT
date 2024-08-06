import {apolloClient} from '@/lib/api'

/**typeDefs */
import { 
    getQuotation
} from './dtos/quotation.dtos'



/**
 * servicio para obtener información de una quotation
 *       
 */

class Quotation {

    /**
     * Obtiene una quotation a partir de un ID de suscripción.
     * @param {string} id - El ID de suscripción de la quotation.
     * @returns {Object} - Un objeto con los datos de la quotation.
     * @throws {Error} - Lanza un error si no se encuentra una cotización o si ocurre algún otro error.
     */
    async getQuotation(id){
        try {
            const variables = {
                id,
                type: 1
              }

            const findResponse = await apolloClient.query({
                variables,
                query:getQuotation,
                fetchPolicy:'no-cache'
            })

            const response = JSON.parse(findResponse.data['findQuotationBySubscription'].response)

            if (response && response.quotation) {
                return response.quotation
            }
            throw new Error('Hubo un error al recuperar la cuenta')
            
        } catch (error) {
            const message =  String(error)
            throw new Error(message)
        }
    }
    
}


export default new Quotation()