import gql from "graphql-tag";

export default gql`
  query getAllCurrencies {
    getAllCurrencies {
      statusCode
      message
      error
      response
    }
  }
`;
