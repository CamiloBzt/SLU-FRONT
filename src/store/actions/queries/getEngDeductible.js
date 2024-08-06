import gql from 'graphql-tag';

export default gql`
  query getEngDeductible($id: ID) {
    getEngDeductible(id: $id) {
      statusCode
      message
      error
      response
    }
  }
`;
