import {apolloClient} from '@/lib/api'

import {
	getEmailTemplatesWallet,
	getInfoInsurablePropBySubscriptionId
} from './dtos/wallet-payment-request.dtos'


/**
 *  Servicios para la vista  PaymentRequestView
 *  - services:
 * 		- getEmailTemplatesWallet
 * 		- getInfoInsurablePropBySubscriptionId
 */

class WalletPaymentRequestService{
	
	/**
	 * regresa todos información de todos los template que tiene que ver notificaciones de wallet 
	*/

    async getEmailTemplatesWallet(){
		
		const makeResponse =  await apolloClient.query({
			query:getEmailTemplatesWallet,
			fetchPolicy:'no-cache'
		})

		const response = JSON.parse(makeResponse.data['getEmailTemplatesWallet'].response)
		return response
	}

	/**
	 * regresa la información necesaria de bound_insurable_prop 
	 * @param {number} id de la cuenta 
	 */

	async getInfoInsurablePropBySubscriptionId(subscriptionId){
		const variables = {
			subscriptionId
		}

		const makeResponse = await apolloClient.query({
			variables,
			query:getInfoInsurablePropBySubscriptionId,
			fetchPolicy:'no-cache'
		})

		const response =  JSON.parse(makeResponse.data['getInfoInsurablePropBySubscriptionId'].response)
		return response

	}
}


export default new WalletPaymentRequestService()