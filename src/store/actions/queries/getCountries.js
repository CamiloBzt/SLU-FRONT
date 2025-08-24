import gql from "graphql-tag";

export default gql`
  query getAllCountries {
    getAllCountries {
      statusCode
      message
      error
      response
    }
  }
`;
