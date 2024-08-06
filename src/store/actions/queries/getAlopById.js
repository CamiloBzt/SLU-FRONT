import gql from 'graphql-tag';

export default gql`
  query getAlopById($id: ID) {
    getAlopById(id: $id) {
      statusCode
      message
      error
      response
    }
  }
`;
