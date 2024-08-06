import gql from 'graphql-tag';

export default gql`
  mutation addSubmission($insuredName: String, $catalogTypeRiskId: Int, $name: String, $catalogActivityId: Int, $catalogCountryId: Int, $catalogCurrencyId: Int, $broker: Int, $cedent: Int, $contacts: JSON, $subscriptionId: ID) {
    addSubmission(
      submission: {
        insuredName: $insuredName
        catalogTypeRiskId: $catalogTypeRiskId
        name: $name
        catalogActivityId: $catalogActivityId
        catalogCountryId: $catalogCountryId
        catalogCurrencyId: $catalogCurrencyId
        broker: $broker
        cedent: $cedent
        contacts: $contacts
        subscriptionId: $subscriptionId
      }
    ) {
      statusCode
      message
      error
      response
    }
  }
`;
