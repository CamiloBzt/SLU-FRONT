import gql from 'graphql-tag';

export default gql`
  query getCatalog($name: String) {
    getCatalog(name: $name) {
      statusCode
      message
      error
      response
    }
  }
`;
