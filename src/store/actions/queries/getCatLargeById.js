import gql from 'graphql-tag';

export default gql`
  query getCatLargeById($id: ID) {
    getCatLargeById(id: $id) {
      statusCode
      message
      error
      response
    }
  }
`;
