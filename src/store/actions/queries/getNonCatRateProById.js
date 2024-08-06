import gql from 'graphql-tag';

export default gql`
  query getNonCatRateProById($id: ID) {
    getNonCatRateProById(id: $id) {
      statusCode
      message
      error
      response
    }
  }
`;
