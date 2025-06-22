import gql from "graphql-tag";

export default gql`
  query getAllActivities {
    getAllActivities {
      statusCode
      message
      error
      response
    }
  }
`;
