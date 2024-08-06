import {apolloClient} from '@/lib/api'


/**typeDefs */
import {
    getAllRoles
} from '@/modules/home/services/dtos/role.dtos'

/**
 *  Servicio para mutations y quieres para los roles
 */

class RoleService {
    async getAllRoles(){
        
        try {
            const makeResponse =  await apolloClient.query({
                query:getAllRoles,
                fetchPolicy:'no-cache'
            })
    
            const response = makeResponse.data['getAllRoles']
            return response
            
        } catch ({message}) {
            throw new Error(message)
        }
    }
}


export default  new RoleService()