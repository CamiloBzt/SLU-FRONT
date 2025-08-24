import gql from "graphql-tag";

export default gql`
  mutation createCountry($id: Int, $description: String!, $active: Boolean!) {
    createCountry(
      country: { id: $id, description: $description, active: $active }
    ) {
      statusCode
      message
      error
      response
    }
  }
`;
