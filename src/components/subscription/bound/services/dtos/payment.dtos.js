import gql from 'graphql-tag'


/**Queries*/
export const getClauses = gql`
   query getClauses{
    getClauses{
      statusCode
        response
        message
    }
   }  
`

export const getPayments = gql`
 query getPayments($subscriptionId:ID!){
  getPayments(subscriptionId:$subscriptionId){
    statusCode
    response
    message
  }
 }
`


/**Mutations */

export  const addOrUpdatedPayment = gql`
  mutation addOrUpdatedPayment($id: Int,
   $column: String! 
   $value: String! 
   $index:Int!
   $subscriptionId:ID!
 ){
  addOrUpdatedPayment(
    request:{
      id:$id
      column: $column
      value: $value
    },
    index: $index
    subscriptionId: $subscriptionId
  ){
    statusCode
    response
    message
  }
 }
`

export const deletePayment = gql`
 mutation deletePayment($id:ID!, $subscriptionId:ID!){
  deletePayment(id:$id, subscriptionId:$subscriptionId ){
    statusCode
    response
    message
  }
 }
`

export const addOrUpdatedPayments = gql`
 mutation addOrUpdatedPayments($subscriptionId:ID!,$installments:JSON!){
  addOrUpdatedPayments(subscriptionId:$subscriptionId, installments:$installments ){
    statusCode
    response
    message
  }
 }
`