import gql from "graphql-tag";

export default gql`
  mutation createActivity($id: Int, $description: String!, $category: String!, $rate: Int!, $risk_type_id: Int!, $active: Boolean!) {
    createActivity(activity: { id: $id, description: $description, category: $category, rate: $rate, risk_type_id: $risk_type_id, active: $active }) {
      statusCode
      message
      error
      response
    }
  }
`;
