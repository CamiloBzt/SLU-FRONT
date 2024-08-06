import gql from 'graphql-tag';

export default gql`
  query getClaimSelected($id: ID) {
    getClaimSelected(id: $id) {
      statusCode
      message
      error
      response
    }
  }
`;
