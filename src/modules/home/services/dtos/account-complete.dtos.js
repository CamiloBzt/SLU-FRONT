import gql from 'graphql-tag'

/**Queries */

export const getLastAccountCompleteByIdSubscription = gql`
    query getLastAccountCompleteByIdSubscription($subscriptionId:ID!){
        getLastAccountCompleteByIdSubscription(subscriptionId:$subscriptionId){
            statusCode
            response
            message
        }
    }
`

export const getAccountCompleteByIdSubscriptionDate = gql`
    query getAccountCompleteByIdSubscriptionDate($subscriptionId:ID!, $selectedDate:String){
        getAccountCompleteByIdSubscriptionDate(subscriptionId:$subscriptionId, selectedDate:$selectedDate){
            statusCode
            response
            message
        }
    }
`
export const getFirstAccountCompleteByIdSubscription = gql`
    query getFirstAccountCompleteByIdSubscription($subscriptionId:ID!){
        getFirstAccountCompleteByIdSubscription(subscriptionId:$subscriptionId){
            statusCode
            response
            message
        }
    }
`
export const getAllAccountComplete = gql`
    query getAllAccountComplete($subscriptionId:ID!){
        getAllAccountComplete(subscriptionId:$subscriptionId){
            statusCode
            response
            message
        }
    }
`

/**Mutations */


export  const addAccountComplete =  gql`
    mutation addAccountComplete(
        $subscriptionId:ID!
        $deductibles:JSON! 
        $tiv:JSON!
        $netPremium:JSON!
        $additionalInfo:JSON!
        $cartera: JSON!
        $technicalConditions:JSON!
        $transactionId:ID
    ){
        addAccountComplete(
            subscriptionId:$subscriptionId,
            data:{
                deductibles:$deductibles
                tiv:$tiv
                netPremium:$netPremium
                additionalInfo:$additionalInfo
                cartera: $cartera
                technicalConditions: $technicalConditions
            },
            transactionId:$transactionId
        ){
            statusCode
            response
            message
        }
    }
`

export const updateToBoundCompleteByIdSubscription = gql`
    mutation updateToBoundCompleteByIdSubscription($subscriptionId:ID! $transactionId:ID){
        updateToBoundCompleteByIdSubscription(subscriptionId:$subscriptionId transactionId:$transactionId){
            statusCode
            response
            message
        }
    }
`


