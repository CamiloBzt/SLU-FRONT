import gql from "graphql-tag";

export default gql`
  query getCurrenciesList {
    getCurrenciesList {
      id
      key
      description
      region
      active
      created_at
      updated_at
    }
  }
`;
