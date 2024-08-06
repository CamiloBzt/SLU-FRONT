import gql from 'graphql-tag'

/**Queries */

export const getEndorsementType = gql`

query {
    getEndorsementType {
        statusCode
        message
        response
    }
}   

`

export const getEndorsmentReport = gql`

query getEndorsmentReport($data:endorsmentReportInput!){
    getEndorsmentReport(data: $data){
      statusCode
      message
      response
    }
  }  

`

export const getEndorsementsBySubscriptionId = gql`

query getEndorsementsBySubscriptionId($id: ID!){
    getEndorsementsBySubscriptionId(id: $id){
      statusCode
      message
      response
    }
  }  

`

export const getEndorsementById = gql`

query getEndorsementById($id: ID!){
  getEndorsementById(id: $id){
      statusCode
      message
      response
    }
  }  

`

export const getEndorsementByAccountcomplete = gql`

query getEndorsementByAccountcomplete($idAccountComplete: ID!){
  getEndorsementByAccountcomplete(idAccountComplete: $idAccountComplete){
      statusCode
      message
      response
    }
  }  

`

/**Mutations */

export const addEndorsment = gql`

mutation addEndorsment($data:endorsmentData!){
    addEndorsment(data: $data){
      statusCode
      message
      response
    }
  }  

`

export const editEndorsement = gql`

mutation editEndorsement(
  $endorsementId:ID!, 
  $columnName:String!, 
  $value:JSON!, 
  $transactionId:ID
){
  editEndorsement(
      endorsementId:$endorsementId
      columnName:$columnName
      value:$value
      transactionId:$transactionId
    ){
      statusCode
      message
      response
    }
  }  

`

export const updateDocumentEndorsementById = gql`

mutation updateDocumentEndorsementById($id: ID!){
    updateDocumentEndorsementById(id: $id){
      statusCode
      message
      response
    }
  }  

`

export const updateDocumentsEndorsement = gql`

mutation updateDocumentsEndorsement($data: updateEndorsmentDocuments!){
    updateDocumentsEndorsement(data: $data){
      statusCode
      message
      response
    }
  }  

`

