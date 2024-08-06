import gql from "graphql-tag";

export default gql`
  mutation updateReinsurer($reinsurerUpdate: reinsurerUpdate!) {
    updateReinsurer(reinsurer: $reinsurerUpdate) {
      statusCode
      message
      response
    }
  }
`;