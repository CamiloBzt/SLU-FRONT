import gql from 'graphql-tag';

export default gql`
  query getDownloadDoc($path: String!) {
    getDownloadDoc(path: $path) {
      statusCode
      message
      error
      response
    }
  }
`;
