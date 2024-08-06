import gql from 'graphql-tag';

export default gql`
  query getCatTable($id: ID) {
    getCatTable(id: $id) {
      statusCode
      message
      error
      response
    }
  }
`;
