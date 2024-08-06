import gql from "graphql-tag";

export default gql`
  query getTotalInsurableValueById($id_subscription: ID!) {
    getTotalInsurableValueById(id_subscription: $id_subscription) {
      statusCode
      message
      error
      response
    }
  }
`;
