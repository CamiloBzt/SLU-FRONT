import gql from "graphql-tag";

export default gql`
  query getLineOfRiskList {
    getLineOfRiskList {
      id
      key
      description
      active
      created_at
      updated_at
    }
  }
`;
