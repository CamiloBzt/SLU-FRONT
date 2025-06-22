import gql from "graphql-tag";

export default gql`
  query getActivitiesList {
    getActivitiesList {
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
