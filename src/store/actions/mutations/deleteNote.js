import gql from 'graphql-tag';

export default gql`
  mutation delNote($idnote: Int!) {
    delNote(idnote: $idnote) {
      statusCode
      message
      error
      response
    }
  }
`;
