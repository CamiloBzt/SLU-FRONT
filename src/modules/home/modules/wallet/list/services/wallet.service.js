import {apolloClient} from '@/lib/api'

//TODO:Cambio de nombre del servicio

/**typeDefs */
import {
getWallets,
createWalletComment
} from './dtos/typeDefs'

/**
 * servicio para controlar la sección de wallet. 
 *  - servicios:
 *      - getWallets  
 *      - createWalletComment
 */
class WalletService {

    /**
     * método para traer todas las wallets activas
     */

    async getWallets(limit , offset){
        const variables = {
            limit,
            offset
        }

        const makeResponse = await apolloClient.query({
            query:getWallets,
            variables,
            fetchPolicy:'no-cache'
        })

        const response = JSON.parse(makeResponse.data['getWallets'].response)
        return response
    }

    /**
     * método para crear un comentario para una wallet
     */

    async createWalletComment(walletId,{text, all , roles = []}){
        try {
            const variables = {
                walletId,
                text,
                all,
                roles
            }
    
            const makeRequest = await apolloClient.query({
                query:createWalletComment,
                variables,
                fetchPolicy:'no-cache'
            })
    
            const response = JSON.parse(makeRequest.data['createWalletComment'].response)
            return response
        } catch ({message}) {
            throw new Error(message)
        }
       
    }


}


export default new WalletService()