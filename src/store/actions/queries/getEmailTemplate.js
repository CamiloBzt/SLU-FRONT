import { gql } from 'graphql-tag'

export default gql`
  query getEmailTemplate($id: ID) {
    getEmailTemplate(id: $id) {
      statusCode
      message
      error
      response
    }
  }
`
