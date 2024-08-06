const { gql } = require("graphql-tag");

export default gql`
  mutation setAnalysis($id_subscription: Int, $column: String, $data: String) {
    setAnalysis(
      id_subscription: $id_subscription
      column: $column
      data: $data
    ) {
      statusCode
      message
      response
      error
    }
  }
`;
