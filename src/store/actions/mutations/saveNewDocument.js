import gql from 'graphql-tag';

export default gql`
  mutation saveNewDocument($document: NewDocument) {
    saveNewDocument(document: $document) {
      statusCode
      message
      error
      response
    }
  }
`;
