import gql from 'graphql-tag';

export default gql`
  mutation addNote($note: Note) {
    addNote(note: $note) {
      statusCode
      message
      error
      response
    }
  }
`;
