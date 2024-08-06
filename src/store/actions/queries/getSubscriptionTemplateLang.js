import gql from 'graphql-tag'

export default gql`
  query getSubscriptionTemplateLang($id: ID) {
    getSubscriptionTemplateLang(id: $id) {
      statusCode,
      message,
      error,
      response
    }
  }
`
