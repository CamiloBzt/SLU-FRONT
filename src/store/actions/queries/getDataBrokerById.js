import gql from 'graphql-tag';

export default gql`
  query getBrokerDataById($brokerId: ID) {
    getBrokerDataById(brokerId: $brokerId) {
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
