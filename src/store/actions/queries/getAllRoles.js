import gql from 'graphql-tag';

export default gql`
  query {
    getAllRoles {
      id,
      role,
      description
    }
  }
`;
