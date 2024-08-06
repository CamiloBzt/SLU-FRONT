import gql from "graphql-tag";

export default gql`
  query getReinsurers($id: ID) {
    getReinsurers(id: $id) {
      statusCode
      message
      response
    }
  }
`;