const { gql } = require('graphql-tag')

export default gql`
  mutation sendEmail($description: String, $cc: String, $cco: String, $attachedFiles: String) {
    sendEmail(email: { description: $description, cc: $cc, cco: $cco, attachedFiles: $attachedFiles }) {
      response
      statusCode
      message
      error
    }
  }
`
