import gql from 'graphql-tag';

export default gql`
  mutation singleDeleteEndorsement($documentName: Int!) {
    singleDeleteEndorsement(documentName: $documentName) {
      response
    }
  }
`;
