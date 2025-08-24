import gql from "graphql-tag";

export default gql`
  mutation deleteActivity($activityId: Int!) {
    deleteActivity(activityId: $activityId) {
      statusCode
      message
      error
      response
    }
  }
`;
