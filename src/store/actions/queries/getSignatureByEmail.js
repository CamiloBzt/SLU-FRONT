import gql from 'graphql-tag';

export default gql`
  query getSignatureByEmail($email: String!) {
    getSignatureByEmail(email: $email) {
      signature
      statusCode
      message
    }
  }
`;
