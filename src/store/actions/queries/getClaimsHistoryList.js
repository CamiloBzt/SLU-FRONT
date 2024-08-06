import gql from 'graphql-tag';

export default gql`
query getClaimsHistoryList(
  $query1: String,
  $query2: String,
  $filterOrderBy: [[String]],
  $filterSearch1: String,
  $filterSearch2: String,
  $limit: Int,
  $offset: Int
) {
  getClaimsHistoryList(
    query1: $query1,
    query2: $query2,
    filterOrderBy: $filterOrderBy,
    filterSearch1: $filterSearch1,
    filterSearch2: $filterSearch2,
    limit: $limit,
    offset: $offset
  ) {
    statusCode,
    message,
    error,
    response
  }
}
`;
