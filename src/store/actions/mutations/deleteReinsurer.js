import gql from "graphql-tag";

export default gql`
  mutation deleteReinsurer($reinsurerId: ID!) {
    deleteReinsurer(reinsurerId: $reinsurerId) {
      statusCode
      message
      response
    }
  }
`;