import {apolloClient} from '@/lib/api'

//**typeDefs */
import {
    getEmailTemplateById,
    getContactsBySubscription
} from './dtos/mailTemplates.dtos'


/**
 *  Servicio para el editor de mail 
 *  - Servicios:
 *      - getEmailTemplateById
 *      - getContactsBySubscription
 */

class EmailTemplateService {
    /**
     * regresa un template por medio de si id
     * @param {number} id del template 
     */
    async getEmailTemplateById(id){
        const variables = {
            id
        }

        const makeResponse = await apolloClient.query({
            variables,
            query:getEmailTemplateById,
            fetchPolicy:'no-cache'
        })

        const response = JSON.parse(makeResponse.data['getEmailTemplateById'].response)
        return response
    }

    /**
     * trae todos los  contactos de la cuenta
     * @param {number} subscriptionId del usuario
     */
    async getContactsBySubscription(subscriptionId){
        const variables = {
            subscriptionId
        }

        const makeResponse = await apolloClient.query({
            variables,
            query:getContactsBySubscription,
            fetchPolicy:'no-cache'
        })

        const response =  makeResponse.data['getContactsBySubscription'].response
        return response
    }
}


export default new EmailTemplateService()