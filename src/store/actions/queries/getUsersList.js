import gql from 'graphql-tag';

export default gql`
  query {
    getUsersList {
      id,
      email,
      name,
      lastName,
      country,
      company,
      status,
      createdAt
    }
  }
`;
