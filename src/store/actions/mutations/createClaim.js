import gql from 'graphql-tag'

export default gql`
  mutation createNewClaim(
    $claimant: String!,
    $lossOcurrenceDate: String!,
    $inceptionDate: String!,
    $lossCauseId: String!,
    $lossTypeId: String!
    $lossCountryId: String!
    $lossCity: String
    $lossLocation: String!
    $lossDescription: String!
    $referenceSub: String!
    $subscriptionId: Int!
    $sluShare: Int!
    $dateSubscription: Date!
  ) {
    createNewClaim(item: {
      claimant: $claimant,
      lossOcurrenceDate: $lossOcurrenceDate,
      inceptionDate: $inceptionDate,
      lossCauseId: $lossCauseId,
      lossTypeId: $lossTypeId,
      lossCountryId: $lossCountryId,
      lossCity: $lossCity,
      lossLocation: $lossLocation,
      lossDescription: $lossDescription
      subscriptionId: $subscriptionId
      referenceSub: $referenceSub
      dateSubscription: $dateSubscription
      sluShare: $sluShare
    }) {
      statusCode,
      message,
      error,
      response
    }
  }
`