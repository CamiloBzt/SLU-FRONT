import gql from "graphql-tag";

export default gql`
  query getActivityDataById($activityId: Int!) {
    getActivityDataById(activityId: $activityId) {
      id
      description
      category
      rate
      risk_type_id
      active
      created_at
      updated_at
    }
  }
`;
