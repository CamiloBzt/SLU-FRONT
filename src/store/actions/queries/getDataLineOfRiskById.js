import gql from "graphql-tag";

export default gql`
  query getLineOfRiskDataById($lineOfRiskId: Int!) {
    getLineOfRiskDataById(lineOfRiskId: $lineOfRiskId) {
      id
      key
      description
      active
      created_at
      updated_at
    }
  }
`;
