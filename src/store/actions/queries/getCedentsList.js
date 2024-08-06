import gql from 'graphql-tag';

export default gql`
  query {
    getCedentsList {
      id,
      name,
      country
    }
  }
`;
