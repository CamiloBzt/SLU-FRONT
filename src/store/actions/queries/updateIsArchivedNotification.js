import gql from "graphql-tag";

export default gql`
  mutation updateIsArchivedNotification($id: ID!, $is_archived: Boolean!) {
    updateIsArchivedNotification(id: $id, is_archived: $is_archived) {
      statusCode
      message
      notification {
        id
        is_archived
      }
    }
  }
`;
