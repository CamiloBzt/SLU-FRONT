import gql from "graphql-tag";

/**Queries */
export const hasInitialRegister = gql`
  query hasInitialRegister($subscriptionId:ID!){
    hasInitialRegister(subscriptionId:$subscriptionId){
      statusCode
      response
      message
    }
  }
`

/**Mutations */
export const addOrUpdateNetPremium = gql`
  mutation addOrUpdateNetPremium($subscriptionId:ID!, $data:JSON!,  $usd:Boolean! ){
    addOrUpdateNetPremium(subscriptionId:$subscriptionId, data:$data, usd:$usd ){
        statusCode
        response
        message
    }
  }
`
