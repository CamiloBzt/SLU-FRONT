import gql from 'graphql-tag'

/**Queries */

export const existTransaction = gql`
    query existTransaction($transactionId:ID!){
        existTransaction(transactionId:$transactionId){
            statusCode
            response
            message
        }
    }
`


/**Mutations */

export const startTransaction = gql`
    mutation {
        startTransaction{
            statusCode
            response
            message
        }
    }
`

export const commitTransaction = gql`
    mutation commitTransaction($transactionId:ID!){
        commitTransaction(transactionId:$transactionId){
            statusCode
            response
            message
        }
    }
`

export const rollbackTransaction = gql`
    mutation rollbackTransaction($transactionId:ID!){
        rollbackTransaction(transactionId:$transactionId){
            statusCode
            response
            message
        }
    }
`