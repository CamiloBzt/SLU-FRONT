import gql from 'graphql-tag'

export default gql`
  mutation updateSubmission(
    $subscriptionId: ID,
    $insuredName: String,
    $catalogTypeRiskId: Int,
    $name: String,
    $catalogActivityId: Int,
    $catalogCountryId: Int,
    $catalogCurrencyId: Int,
    $broker: Int
    $cedent: Int
    $contacts: JSON
  ) {
    updateSubmission(subscriptionId: $subscriptionId, submission: {
      insuredName: $insuredName,
      catalogTypeRiskId: $catalogTypeRiskId,
      name: $name,
      catalogActivityId: $catalogActivityId,
      catalogCountryId: $catalogCountryId,
      catalogCurrencyId: $catalogCurrencyId,
      broker: $broker,
      cedent: $cedent,
      contacts: $contacts
    }) {
      statusCode,
      message,
      error,
      response
    }
  }
`