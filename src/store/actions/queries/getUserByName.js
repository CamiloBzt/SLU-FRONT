import gql from 'graphql-tag';

export default gql`
  query getUsersByName($name: String!) {
    getUsersByName(name: $name) {
      statusCode
      response
      message
      error
    }
  }
`;
