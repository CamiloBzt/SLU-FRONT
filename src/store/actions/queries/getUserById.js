import gql from 'graphql-tag';

export default gql`
  query getUserById($userId: Int!) {
    getUserById(userId: $userId) {
      id
      name
      email
      lastName
      celular
      countryId
      companyId
      role
      address
      signature
    }
  }
`;
