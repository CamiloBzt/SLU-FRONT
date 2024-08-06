import gql from 'graphql-tag';

export default gql`
  mutation createEndorsementBySubscription($id: ID!) {
    createEndorsementBySubscription(id: $id) {
      statusCode
      message
      error
      response
    }
  }
`;
