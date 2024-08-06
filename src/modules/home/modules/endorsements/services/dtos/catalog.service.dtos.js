import gql from 'graphql-tag'

/**Queries */

export const getCatalog = gql`

query getCatalog($name:String){
    getCatalog (name:$name){
        statusCode
        message
        response
    }
}   

`

export const getAllBrokers = gql`
  query getAllBrokers {
    getAllBrokers {
      statusCode,
      message,
      error,
      response
    }
  }
`

/**Mutations */