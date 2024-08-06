import gql from 'graphql-tag'

/**Queries */

export const getClaimsBySubscriptionId = gql`

query getClaimsBySubscriptionId($id: ID!){
  getClaimsBySubscriptionId(id: $id){
      statusCode
      message
      response
    }
  }  

`

/**Mutations */
export const addClaim = gql`

mutation addClaim($data:claimData!){
  addClaim(data: $data){
      statusCode
      message
      response
    }
  }  
`
export const updateClaim = gql`

mutation updateClaims($data:updateClaimData!){
  updateClaims(data: $data){
      statusCode
      message
      response
    }
  }  
`
export const deleteClaimDocumentById = gql`

mutation deleteClaimDocumentById($id: ID!){
  deleteClaimDocumentById(id: $id){
      statusCode
      message
      response
    }
  }  

`

export const addDocumentsClaims = gql`

mutation addDocumentsClaims($data: updateEndorsmentDocuments!){
  addDocumentsClaims(data: $data){
      statusCode
      message
      response
    }
  }  

`
export const deleteClaimCorrespondenceById = gql`

mutation deleteClaimCorrespondenceById($id: ID!){
  deleteClaimCorrespondenceById(id: $id){
      statusCode
      message
      response
    }
  }  

`

export const addCorrespondenceClaims = gql`

mutation addCorrespondenceClaims($data: updateEndorsmentDocuments!){
  addCorrespondenceClaims(data: $data){
      statusCode
      message
      response
    }
  }  

`

export const getClaimById = gql`

query getClaimById($id: ID!){
  getClaimById(id: $id){
      statusCode
      message
      response
    }
  }  

`
