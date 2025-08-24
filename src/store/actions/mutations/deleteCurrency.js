import gql from "graphql-tag";

export default gql`
  mutation deleteCurrency($currencyId: ID!) {
    deleteCurrency(currencyId: $currencyId) {
      statusCode
      message
      error
      response
    }
  }
`;
