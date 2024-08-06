import gql from "graphql-tag";

export default gql`
  mutation addReinsurer($reinsurerInput: reinsurerInput!) {
    addReinsurer(reinsurer: $reinsurerInput) {
      statusCode
      message
      response
    }
  }
`;