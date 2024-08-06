import gql from 'graphql-tag'

/**Queries */

export const getDeductibles = gql`
  query getDeductibles($id:ID!){
    getDeductibles(id:$id){
        statusCode
        response
        message
    }
  }
`

export const getEngDeductible = gql`
  query getEngDeductible($id:ID!){
    getEngDeductible(id:$id){
        statusCode
        response
        message
    }
  }
`

export const getSublimesProperty = gql`
  query getSublimesProperty($id:ID!){
    getSublimesProperty(subscription_id:$id){
        statusCode
        response
        message
    }
  }
`

export const getSublimits = gql`
  query getSublimits($id:ID!, $type: String){
    getSublimits(id:$id, type:$type){
        statusCode
        response
        message
    }
  }
`

export const getPayments = gql`
  query getPayments($id:ID!){
    getPayments(subscriptionId:$id){
        statusCode
        response
        message
    }
  }
`

export const getBoundClaims = gql`
  query getBoundClaims($id:ID!, $type: String!){
    getBoundClaims(subscription_id:$id, type:$type){
        statusCode
        response
        message
    }
  }
`

export const findBoundBySubscription = gql`
  query findBoundBySubscription($id:Int!, $type: Int){
    findBoundBySubscription(id:$id, type:$type){
        statusCode
        response
        message
    }
  }
`

export const getDeductiblesById = gql`
  query getDeductiblesById($id:ID){
    getDeductiblesById(id:$id){
        statusCode
        response
        message
    }
  }
`

export const getFireDeductible = gql`
  query getFireDeductible($id:ID){
    getFireDeductible(id:$id){
        statusCode
        response
        message
    }
  }
`

/**Mutations */