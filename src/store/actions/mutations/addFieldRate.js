import gql from 'graphql-tag';

export default gql`
  mutation addFieldRate($table: String!, $id: ID!) {
    addFieldRate(table: $table, id: $id) {
      statusCode
      message
      error
      response
    }
  }
`;
