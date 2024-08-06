import gql from 'graphql-tag'

/**Queries */
export const isAccountComplete = gql`
  query isAccountComplete($subscriptionId:ID!){
        isAccountComplete(subscriptionId:$subscriptionId){
            statusCode
            response
            message
        }
    }
`

export const getTypeQuotationBySubscription = gql`
    query getTypeQuotationBySubscription($subscriptionId:ID!){
        getTypeQuotationBySubscription(subscriptionId:$subscriptionId){
            statusCode
            response
            message
        }
    }
`


/**Mutations */
export const updateToBoundCompleteByIdSubscription = gql `
   mutation updateToBoundCompleteByIdSubscription($subscriptionId:ID!){
        updateToBoundCompleteByIdSubscription(subscriptionId:$subscriptionId){
            statusCode
            response
            message
        }
    }
`