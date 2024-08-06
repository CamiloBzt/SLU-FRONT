import gql from 'graphql-tag'

export default gql`
  mutation deleteContact(
    $contactId: Int,
    $brokerOrCedentId: Int,
    $type: Int,
  ) {
    deleteContact(
      contactId: $contactId,
      type: $type,
      brokerOrCedentId: $brokerOrCedentId,
    ) {
      statusCode,
      message,
      error,
      response
    }
  }
`