import gql from 'graphql-tag';

export default gql`
  query {
    getAllUsers {
      id
      name
    }
  }
`;
