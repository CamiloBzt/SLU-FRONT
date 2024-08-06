import gql from 'graphql-tag';

export default gql`
  query getCatTableById($id: ID) {
    getCatTableById(id: $id) {
      statusCode
      message
      error
      response
    }
  }
`;
