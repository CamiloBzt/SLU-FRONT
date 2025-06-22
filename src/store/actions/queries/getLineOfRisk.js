import gql from "graphql-tag";

export default gql`
  query getAllLineOfRisk {
    getAllLineOfRisk {
      statusCode
      message
      error
      response
    }
  }
`;
