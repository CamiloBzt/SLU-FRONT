import gql from 'graphql-tag';

export default gql`
  query {
    getBrokersList {
      id,
      name,
      country
    }
  }
`;
