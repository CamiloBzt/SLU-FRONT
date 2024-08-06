import gql from "graphql-tag";

export default gql`
  mutation addFacultative($risk_analisis: Int, $subscription_id: Int!) {
    addFacultative(
      newFacultative: {
        risk_analisis: $risk_analisis
        subscription_id: $subscription_id
      }
    ) {
      statusCode
      message
      response
    }
  }
`;
