import gql from "graphql-tag";

export default gql`
  mutation updateIsArchivedNotificationDetail(
    $id: ID!
    $is_archived: Boolean!
  ) {
    updateIsArchivedNotificationDetail(id: $id, is_archived: $is_archived) {
      statusCode
      message
      notificationDetail {
        id
        is_archived
      }
    }
  }
`;
