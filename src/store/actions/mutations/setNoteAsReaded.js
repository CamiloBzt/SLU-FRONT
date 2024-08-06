import gql from 'graphql-tag';

export default gql`
  mutation setNoteAsReaded($noteAsReaded: NoteAsReaded!) {
    setNoteAsReaded(noteAsReaded: $noteAsReaded) {
      statusCode
      message
      error
      response
    }
  }
`
