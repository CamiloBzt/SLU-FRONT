import gql from 'graphql-tag'

/**Queries */

export const getEmailTemplatesWallet = gql`
    query getEmailTemplatesWallet{
        getEmailTemplatesWallet{
            statusCode
            response
            message
        }
    }
`

export const  getInfoInsurablePropBySubscriptionId = gql`
 query getInfoInsurablePropBySubscriptionId($subscriptionId:ID!){
    getInfoInsurablePropBySubscriptionId(subscriptionId:$subscriptionId){
        statusCode
        response
        message
    }
 }
`


/**Mutations */