import {apolloClient} from '@/lib/api'
import getClaimsCount from './dtos/getclaimscont.dtos'

export default async function claims (){
    try {
        const makeRequest  = await apolloClient.query({
            query:getClaimsCount,
            fetchPolicy:'no-cache'
        })
        const {count } = JSON.parse(makeRequest.data['getClaimsCount'].response)
        return count
        
    } catch (error) {
        const message =  String(error)
        throw new Error(message)
    }
}
