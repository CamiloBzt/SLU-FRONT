import gql from 'graphql-tag'

/**Queries */
export const findQuotationBySubscription = gql`
  query findQuotationBySubscription($id:Int!, $type:Int){
    findQuotationBySubscription(id:$id, type:$type){
        statusCode
        response
        message
    }
  }
`

export const getNetPremiumByIdSubscription = gql`
 query getNetPremiumByIdSubscription($subscriptionId:ID!){
    getNetPremiumByIdSubscription(subscriptionId:$subscriptionId){
        statusCode
        response
        message
    }
 }
`

export const getBoundInsurablePropByIdSubscription = gql`
    query getBoundInsurablePropByIdSubscription($subscriptionId:ID!){
        getBoundInsurablePropByIdSubscription(subscriptionId:$subscriptionId){
            statusCode
            response
            message
        }
    }
`

export const findBoundBySubscription =  gql`
    query findBoundBySubscription($id:Int!){
        findBoundBySubscription(id:$id){
            statusCode
            response
            message
        }
    }
`


export const getTotalInsurableValueById = gql`
    query getTotalInsurableValueById($id_subscription:ID!){
        getTotalInsurableValueById(id_subscription:$id_subscription){
            statusCode
            response
            message
        }
    }
`

export const getNetPremiumOriginalCurrencyById  = gql`
    query getNetPremiumOriginalCurrencyById($id_subscription: Int!) {
        getNetPremiumOriginalCurrencyById(id_subscription:$id_subscription){
            statusCode
            message
            response
            error
        }
    }
`

export const getSubmissionBySubscriptionId = gql`
  query getSubmissionBySubscriptionId($id:ID!){
    getSubmissionBySubscriptionId(subscriptionId:$id){
        statusCode
        response
        message
    }
  }
`

/**Mutations */
