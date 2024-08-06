import gql from 'graphql-tag';

export default gql`
  query getCatRateById($id: ID) {
    getCatRateById(id: $id) {
      statusCode
      message
      error
      response
    }
  }
`;
