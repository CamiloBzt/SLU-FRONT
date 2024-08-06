import gql from 'graphql-tag';

export default gql`
  query getCatalogDocuments {
    getCatalogDocuments {
      statusCode
      message
      error
      response
    }
  }
`;
