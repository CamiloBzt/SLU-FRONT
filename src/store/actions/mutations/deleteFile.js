import gql from 'graphql-tag';

export default gql`
  mutation singleDelete($documentName: String!) {
    singleDelete(documentName: $documentName) {
      response
    }
  }
`;
