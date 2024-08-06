import gql from 'graphql-tag';

export default gql`
  mutation saveDocument($document: Document) {
    saveDocument(document: $document) {
      statusCode
      message
      error
      response
    }
  }
`;
