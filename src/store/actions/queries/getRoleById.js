import gql from 'graphql-tag';

export default gql`
  query getRoleById($roleId: ID) {
    getRoleById(roleId: $roleId) {
      id,
      role,
      description,
      views,
      actions
    }
  }
`;
