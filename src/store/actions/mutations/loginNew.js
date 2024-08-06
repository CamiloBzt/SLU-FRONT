import gql from 'graphql-tag';

export default gql`
  mutation loginNew($email: String!, $token: String!) {
    loginNew(email: $email, token: $token) {
      id
      name
      email
      lastName
      token
      roleId,
      menu,
      action
    }
  }
`;
