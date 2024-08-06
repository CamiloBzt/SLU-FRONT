import gql from "graphql-tag";

export default gql`
  query getAllContacts {
    getAllContacts {
      statusCode
      message
      error
      response
    }
  }
`;
