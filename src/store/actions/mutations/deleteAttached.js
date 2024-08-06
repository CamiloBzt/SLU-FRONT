import gql from 'graphql-tag';

export default gql`
  mutation deleteAttached($fileName: String!) {
    deleteAttached(fileName: $fileName) {
      statusCode
      message
      error
      response
    }
  }
`;
