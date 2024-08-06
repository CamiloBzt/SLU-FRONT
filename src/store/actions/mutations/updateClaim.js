import gql from 'graphql-tag'

export default gql`
  mutation updateClaim(
    $id: Int,
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
    $dateSubscription: Date!
    $lossAdjuster: String
    $sluShare: Int
    $claimReserveOriginalCurrency: Float
    $rateChange: Float
    $claimReserveUsd: Float
    $amountPaidExcluidAdjustingFee: Float
    $adjustingFee: Float
    $deductible: Float
    $excess: Float
    $salvage: Float
    $totalIncurred: Float
    $claimReserveSlu: Float
    $amountPaidExcluidAdjustingFeeSlu: Float
    $adjustingFeeSlu: Float
    $deductibleSlu: Float
    $excessSlu: Float
    $consultantFeeSlu: Float
    $bankingFeeSlu: Float
    $salvageSlu: Float
    $totalAmountAfterDeductible: Float
    $totalIncurredClaimSlu: Float
    $isNewVersion: Boolean
  ) {
    updateClaim(item: {
      id: $id,
      claimant: $claimant,
      lossOcurrenceDate: $lossOcurrenceDate,
      inceptionDate: $inceptionDate,
      lossCauseId: $lossCauseId,
      lossTypeId: $lossTypeId,
      lossCountryId: $lossCountryId,
      lossCity: $lossCity,
      lossLocation: $lossLocation,
      lossAdjuster: $lossAdjuster,
      lossDescription: $lossDescription
      subscriptionId: $subscriptionId
      referenceSub: $referenceSub
      dateSubscription: $dateSubscription
      sluShare: $sluShare
      claimReserveOriginalCurrency: $claimReserveOriginalCurrency,
      rateChange: $rateChange,
      claimReserveUsd: $claimReserveUsd,
      amountPaidExcluidAdjustingFee: $amountPaidExcluidAdjustingFee,
      adjustingFee: $adjustingFee,
      deductible: $deductible,
      excess: $excess,
      salvage: $salvage,
      totalIncurred: $totalIncurred,
      claimReserveSlu: $claimReserveSlu,
      amountPaidExcluidAdjustingFeeSlu: $amountPaidExcluidAdjustingFeeSlu,
      adjustingFeeSlu: $adjustingFeeSlu,
      deductibleSlu: $deductibleSlu,
      excessSlu: $excessSlu,
      consultantFeeSlu: $consultantFeeSlu,
      bankingFeeSlu: $bankingFeeSlu,
      salvageSlu: $salvageSlu,
      totalAmountAfterDeductible: $totalAmountAfterDeductible,
      totalIncurredClaimSlu: $totalIncurredClaimSlu
      isNewVersion: $isNewVersion

    }) {
      statusCode,
      message,
      error,
      response
    }
  }
`