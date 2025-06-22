import gql from "graphql-tag";

export default gql`
  mutation deleteCurrency($currencyId: Int!) {
    deleteCurrency(currencyId: $currencyId) {
      statusCode
      message
      error
      response
    }
  }
`;
