import gql from 'graphql-tag';

export default gql`
  query getNonCatRatesPro($id: ID) {
    getNonCatRatesPro(id: $id) {
      statusCode
      message
      error
      response
    }
  }
`;
