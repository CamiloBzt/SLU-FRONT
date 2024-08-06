import gql from 'graphql-tag';

export default gql`
  query getCatalogForDocuments($catalog_document_id: [Int!]!) {
    getCatalogForDocuments(catalog_document_id: $catalog_document_id) {
      statusCode
      message
      error
      response
    }
  }
`;
