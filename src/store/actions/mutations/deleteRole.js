import gql from 'graphql-tag'

export default gql`
  mutation deleteRole(
    $roleId: Int
  ) {
    deleteRole(
      roleId: $roleId,
    ) {
      id,
      role,
      description
    }
  }
`