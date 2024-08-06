import gql from 'graphql-tag'

export default gql`
  mutation createContact(
    $id: Int,
    $brokerOrCedentId: String!,
    $type: String!,
    $email: String!
    $name: String!
    $phone: String!
    $address: String!
  ) {
    createContact(contact: {
      id: $id,
      email: $email,
      type: $type,
      brokerOrCedentId: $brokerOrCedentId,
      name: $name,
      phone: $phone,
      address: $address
    }) {
      statusCode,
      message,
      error,
      response
    }
  }
`