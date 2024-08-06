import gql from 'graphql-tag';

export default gql`
  query getContactsById($id: ID, $type: Int) {
    getContactsById(id: $id, type:$type) {
      response
      message
      statusCode
    }
  }
`;
