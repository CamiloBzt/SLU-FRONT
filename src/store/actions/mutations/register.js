import gql from 'graphql-tag';

export default gql`
  mutation createUser($email: String!, $password: String!, $name: String!, $lastName: String!) {
    createUser(email: $email, password: $password, name: $name, last_name: $lastName) {
      id
      name
      email
      last_name
      token
      roleId
    }
  }
`;
