import gql from 'graphql-tag';

export default gql`
  query {
    getLoggedUser {
      id
      name
      last_name
      email
    }
  }
`;
