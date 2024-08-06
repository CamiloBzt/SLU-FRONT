import gql from 'graphql-tag'

export default gql`
  mutation deleteBroker(
    $brokerId: Int!,
  ) {
    deleteBroker(
      brokerId: $brokerId,
    ) {
      statusCode,
      message,
      error,
      response
    }
  }
`