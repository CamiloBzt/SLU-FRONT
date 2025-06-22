import gql from "graphql-tag";

export default gql`
  mutation deleteLineOfRisk($lineOfRiskId: Int!) {
    deleteLineOfRisk(lineOfRiskId: $lineOfRiskId) {
      statusCode
      message
      error
      response
    }
  }
`;
