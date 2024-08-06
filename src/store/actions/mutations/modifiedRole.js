import gql from 'graphql-tag';

export default gql`
  mutation modifiedRole($roleId: ID, $viewId: ID, $type: String, $value: Boolean) {
    modifiedRole(
      role: {
        roleId: $roleId,
        viewId: $viewId,
        type: $type,
        value: $value
      }
    ) {
      id,
      role,
      description,
      views,
      actions
    }
  }
`;
