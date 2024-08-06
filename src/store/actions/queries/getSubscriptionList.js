import gql from 'graphql-tag'

export default gql`
  query getSubscriptionList(
    $query1: String,
    $query2: String,
    $query3: String,
    $filterOrderBy: [[String]],
    $filterSearch1: String,
    $filterSearch2: String,
    $filterSearch3: String,
    $limit: Int,
    $offset: Int
  ) {
    getSubscriptionList(
      query1: $query1,
      query2: $query2,
      query3: $query3,
      filterOrderBy: $filterOrderBy,
      filterSearch1: $filterSearch1,
      filterSearch2: $filterSearch2,
      filterSearch3: $filterSearch3,
      limit: $limit,
      offset: $offset
    ) {
      statusCode,
      message,
      error,
      response
    }
  }
`
