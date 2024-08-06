import gql from 'graphql-tag';

export default gql`
  mutation createEndorsement($id: ID!) {
    createEndorsement(id: $id) {
      statusCode
      message
      error
      response
    }
  }
`;
