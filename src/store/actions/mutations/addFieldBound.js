import gql from 'graphql-tag';

export default gql`
  mutation addFieldBound($table: String!, $id: ID!) {
    addFieldBound(table: $table, id: $id) {
      statusCode
      message
      error
      response
    }
  }
`;
