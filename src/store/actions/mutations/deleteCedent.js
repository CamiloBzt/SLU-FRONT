import gql from 'graphql-tag'

export default gql`
  mutation deleteCedent(
    $cedentId: Int!,
  ) {
    deleteCedent(
      cedentId: $cedentId,
    ) {
      statusCode,
      message,
      error,
      response
    }
  }
`