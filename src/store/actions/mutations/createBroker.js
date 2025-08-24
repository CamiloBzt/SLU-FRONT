import gql from "graphql-tag";

export default gql`
  mutation createBroker($id: Int, $email: String!, $name: String!, $roleCompany: String!, $catalogCompanyId: Int!, $catalogCountryId: Int!, $phone: String!, $address: String!) {
    createBroker(broker: { id: $id, email: $email, name: $name, roleCompany: $roleCompany, catalogCompanyId: $catalogCompanyId, catalogCountryId: $catalogCountryId, phone: $phone, address: $address }) {
      statusCode
      message
      error
      response
    }
  }
`;
