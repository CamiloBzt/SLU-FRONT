import gql from 'graphql-tag'

export default gql`
  mutation createCloseReason(
    $subscriptionId: Int!
    $reasonClosed: Int!
    $emailSendId: Int!
  ) {
    createCloseReason(reason: {
      subscriptionId: $subscriptionId,
      reasonClosed: $reasonClosed,
      emailSendId: $emailSendId
    }) {
      statusCode,
      message,
      error,
      response
    }
  }
`