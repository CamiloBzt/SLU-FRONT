import gql from 'graphql-tag';

export default gql`
  query findInformationByBoundId($boundId: String) {
    findInformationByBoundId(boundId: $boundId) {
      statusCode
      message
      error
      response
    }
  }
`;
