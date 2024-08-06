import gql from 'graphql-tag';
export default gql`
  query {
    getLastSubscription {
      statusCode
      message
      error
      response
    }
  }
`;
