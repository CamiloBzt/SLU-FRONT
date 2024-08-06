import gql from 'graphql-tag'

export default gql`
  mutation attachFile($file: Upload!, $path: String!, $name: String!) {
    attachFile(file: $file, path: $path, name: $name) {
      filename
      mimetype
      encoding
      name
      uri
    }
  }
`
