import gql from 'graphql-tag';

export default gql`
  mutation {
    addSubscription {
      statusCode
      message
      error
      response
    }
  }
`;
