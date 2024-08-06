import gql from 'graphql-tag';

export default gql`
  query getSublimits($id: ID, $type: String) {
    getSublimits(id: $id, type: $type) {
      statusCode
      message
      error
      response
    }
  }
`;
