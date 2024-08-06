import gql from "graphql-tag";

export default gql`
  query getMainLocationById($id_subscription: ID!) {
    getMainLocationById(id_subscription: $id_subscription) {
      statusCode
      message
      error
      response
    }
  }
`;
