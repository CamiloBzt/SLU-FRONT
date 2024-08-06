import gql from 'graphql-tag';

export default gql`
  mutation singleUpload($file: Upload!, $path: String!) {
    singleUpload(file: $file, path: $path) {
      filename
      mimetype
      encoding
      uri
    }
  }
`;
