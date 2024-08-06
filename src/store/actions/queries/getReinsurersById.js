import gql from "graphql-tag";

export default gql`
  query getReinsurersById($reinsurerId: ID!) {
    getReinsurersById(reinsurerId: $reinsurerId) {
      statusCode
      message
      response
    }
  }
`;