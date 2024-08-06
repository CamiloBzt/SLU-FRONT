import gql from 'graphql-tag';

export default gql`
  query getDocumentsByCatalog(
    $subscription_id: Int!
    $catalog_document_id: [Int!]!
  ) {
    getDocumentsByCatalog(
      subscription_id: $subscription_id
      catalog_document_id: $catalog_document_id
    ) {
      statusCode
      message
      error
      response
    }
  }
`;
