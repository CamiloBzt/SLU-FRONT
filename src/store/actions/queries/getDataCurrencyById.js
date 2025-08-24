import gql from "graphql-tag";

export default gql`
  query getCurrencyDataById($currencyId: ID!) {
    getCurrencyDataById(currencyId: $currencyId) {
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
