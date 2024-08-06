import {apolloClient} from '@/lib/api'
import getSubscriptionCountBC from './dtos/getsubscriptioncontBC.dtos'

export default async function subscriptionBC (){
    try {
        const makeRequest  = await apolloClient.query({
            query:getSubscriptionCountBC,
            fetchPolicy:'no-cache'
        })
        const {count } = JSON.parse(makeRequest.data['getSubscriptionCountBC'].response)
        return count
        
    } catch (error) {
        const message =  String(error)
        throw new Error(message)
    }
}
