import {apolloClient} from '@/lib/api'

import { 
    startTransaction,
    commitTransaction,
    rollbackTransaction,
    existTransaction,
 } from './dtos/transactions.dtos'

class TransactionsService {

    async startTransaction(){
        try {

            const makeRequest = apolloClient.mutate({
                mutation:startTransaction
            })
            
            const response = JSON.parse((await makeRequest).data['startTransaction'].response)

            return response
        } catch (error) {
            const message =  String(error)
            throw new Error(message)
        }
    }

    async commitTransaction(transactionId){
        
        try {
            const variables = {
                transactionId
            }

            const makeRequest = apolloClient.mutate({
                variables,
                mutation:commitTransaction
            })
            
            const response = JSON.parse((await makeRequest).data['commitTransaction'].response)

            return response
        } catch (error) {
            const message =  String(error)
            throw new Error(message)
        }
        
    }

    async rollbackTransaction(transactionId){

        try {
            const variables = {
                transactionId
            }

            const makeRequest = apolloClient.mutate({
                variables,
                mutation:rollbackTransaction
            })
            
            const response = JSON.parse((await makeRequest).data['rollbackTransaction'].response)

            return response
        } catch (error) {
            const message =  String(error)
            throw new Error(message)
        }

    }

    async existTransaction(transactionId){

        try {
            const variables = {
                transactionId
            }

            const makeRequest = apolloClient.query({
                variables,
                query:existTransaction
            })
            
            const response = JSON.parse((await makeRequest).data['existTransaction'].response)

            return response
        } catch (error) {
            const message =  String(error)
            throw new Error(message)
        }

    }

}

export default new TransactionsService;