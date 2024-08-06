import gql from "graphql-tag";

export default gql`
  query getAnalysisById($id_subscription: Int) {
    getAnalysisById(id_subscription: $id_subscription) {
      statusCode
      message
      response
      error
    }
  }
`;
