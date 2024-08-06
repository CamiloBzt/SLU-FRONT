import gql from 'graphql-tag';

export default gql`
  query {
    getClaimsList {
      statusCode
      message
      error
      response
    }
  }
`;
