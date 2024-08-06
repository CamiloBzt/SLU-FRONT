import gql from 'graphql-tag'

export default gql`
  query getAllTemplateEmail {
    getAllTemplateEmail {
      statusCode,
      message,
      error,
      response
    }
  }
`
