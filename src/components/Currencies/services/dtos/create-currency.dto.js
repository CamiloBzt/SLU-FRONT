import gql from "graphql-tag";

export const createCurrencyDto = gql`
  mutation createCurrency($currency: CurrencyInput!) {
    createCurrency(currency: $currency) {
      statusCode
      message
      error
      response
    }
  }
`;
