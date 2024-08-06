import gql from 'graphql-tag';

export default gql`
  query getNotificationsByUser($user_id: Int!) {
    getNotificationsByUser(user_id: $user_id) {
      statusCode
      message
      error
      response
    }
  }
`
