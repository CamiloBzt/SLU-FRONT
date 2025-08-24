import gql from "graphql-tag";

export const createActivityDto = gql`
  mutation createActivity($activity: ActivityInput!) {
    createActivity(activity: $activity) {
      statusCode
      message
      error
      response
    }
  }
`;
