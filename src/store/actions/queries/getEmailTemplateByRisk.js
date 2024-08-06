import { gql } from 'graphql-tag'

export default gql`
  query getEmailTemplateByRisk($riskId: ID, $lang: String) {
    getEmailTemplateByRisk(riskId: $riskId, lang: $lang) {
      statusCode
      message
      error
      response
    }
  }
`
