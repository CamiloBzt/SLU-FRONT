import gql from 'graphql-tag'

export default gql`
query {
        getClaimsCount{
          message,
          statusCode,
          response
        }
    }
`