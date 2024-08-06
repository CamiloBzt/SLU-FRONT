import gql from 'graphql-tag';

export default gql`
  mutation createRole($id: Int, $role: String, $description: String, $views: JSON) {
    createRole(
      role: { 
        id: $id,
        role: $role,
        description: $description,
        views:$views

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
