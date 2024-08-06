import gql from 'graphql-tag';

export default gql`
  query getEngDeductibleById($id: ID) {
    getEngDeductibleById(id: $id) {
      statusCode
      message
      error
      response
    }
  }
`;
