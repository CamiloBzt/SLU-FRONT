import gql from "graphql-tag";

export default gql`
  mutation updateCurrency($currency: CurrencyInput!) {
    updateCurrency(currency: $currency) {
      statusCode
      message
      error
      response
    }
  }
`;
