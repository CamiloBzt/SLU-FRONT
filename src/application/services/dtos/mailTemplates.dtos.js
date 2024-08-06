import gql  from 'graphql-tag'

/**Queries */

export const getEmailTemplateById = gql`
  query getEmailTemplateById($id:ID!){
    getEmailTemplateById(id:$id){
        statusCode
        response
        message
    }
  }
`

export const getContactsBySubscription = gql`
  query getContactsBySubscription($subscriptionId: ID!) {
    getContactsBySubscription(subscriptionId: $subscriptionId) {
      statusCode,
      message,
      error,
      response
    }
  }
`;



/**Mutations */