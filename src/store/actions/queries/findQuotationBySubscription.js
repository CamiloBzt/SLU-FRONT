import gql from 'graphql-tag';

export default gql`
  query findQuotationBySubscription($id: Int!, $type: Int) {
    findQuotationBySubscription(id: $id, type: $type) {
      statusCode
      message
      error
      response
    }
  }
`;
