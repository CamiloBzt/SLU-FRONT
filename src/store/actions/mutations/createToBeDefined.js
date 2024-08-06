import gql from "graphql-tag";

export default gql`
  mutation createToBeDefined(
    $id: Int!
    $limitedInsured: String!
    $limitedInsuredUsd: String!
    $sluShare: String!
    $limitSlu: String!
    $limitSluUsd: String!
    $premiumSlu: String!
    $premiumSluUsd: String!
  ) {
    createToBeDefined(
      id: $id
      toBe: {
        limitedInsured: $limitedInsured
        limitedInsuredUsd: $limitedInsuredUsd
        sluShare: $sluShare
        limitSlu: $limitSlu
        limitSluUsd: $limitSluUsd
        premiumSlu: $premiumSlu
        premiumSluUsd: $premiumSluUsd
      }
    ) {
      statusCode
      message
      error
      response
    }
  }
`;
