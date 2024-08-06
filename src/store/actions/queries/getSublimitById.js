import gql from 'graphql-tag';

export default gql`
  query getSublimitById($id: ID, $type: String) {
    getSublimitById(id: $id, type: $type) {
      statusCode
      message
      error
      response
    }
  }
`;
