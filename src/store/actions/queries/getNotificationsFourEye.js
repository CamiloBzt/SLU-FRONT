import gql from "graphql-tag";

export default gql`
  query getNotificationsFourEye($id: ID!) {
    getNotificationsFourEye(id: $id) {
      id
      is_archived
      subscription_id
      reviewer_user_id
      notifying_user_id
      creation_date
      reference
      NotifyingUser {
        id
        name
        last_name
      }
      status
      commentary
      reviewer_user {
        id
        name
        last_name
      }
      history {
        id
        creation_date
        reviewer_user {
          id
          name
          last_name
        }
        commentary
        status
      }
    }
  }
`;
