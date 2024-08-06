import gql from 'graphql-tag';

export default gql`
  mutation validateSession($token: String!) {
    validateSession(token: $token) {
      id
      name
      email
      lastName,
      menu,
      action
    }
  }
`;
