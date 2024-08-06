import gql from 'graphql-tag';

export default gql`
  query getCedentDataById($cedentId: Int!) {
    getCedentDataById(cedentId: $cedentId) {
      id
      name
      email
      phone
      address
      catalogCountryId
      catalogCompanyId
      roleCompany
    }
  }
`;
