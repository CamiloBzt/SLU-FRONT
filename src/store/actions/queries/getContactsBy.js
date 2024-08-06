import gql from "graphql-tag";

export default gql`
  query getContactsBy($contact: JSON!, $query: String) {
    getContactsBy(contact: $contact, query: $query) {
      statusCode,
      message,
      error,
      response
    }
  }
`;
