import gql from 'graphql-tag';

export default gql`
  query findEndorsementBySubscription($id: ID, $table: String) {
    findEndorsementBySubscription(id: $id, table: $table) {
      statusCode
      message
      error
      response
    }
  }
`;
