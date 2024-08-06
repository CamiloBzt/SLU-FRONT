import gql from 'graphql-tag';

export default gql`
  query getEndorsements($id: ID!) {
    getEndorsements(id: $id) {
      statusCode
      message
      error
      response
    }
  }
`;
