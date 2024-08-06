import {apolloClient} from '@/lib/api'
import getSubscriptionCount from '../service/dtos/getsubscriptioncont.dtos'

export default async function subscription (){
    try {
        const makeRequest  = await apolloClient.query({
            query:getSubscriptionCount,
            fetchPolicy:'no-cache'
        })
        const {count } = JSON.parse(makeRequest.data['getSubscriptionCount'].response)
        return count
        
    } catch (error) {
        const message =  String(error)
        throw new Error(message)
    }
}
