import gql from 'graphql-tag';

export default gql`
  query filterSubscription($query: String, $filter: [String], $limit: Int, $offset: Int) {
    filterSubscription(query: $query, filter: $filter, limit: $limit, offset: $offset) {
      statusCode
      message
      error
      response
    }
  }
`;
