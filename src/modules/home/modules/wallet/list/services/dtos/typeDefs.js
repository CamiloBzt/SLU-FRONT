import gql from 'graphql-tag'

/**Queries */
export const getWallets = gql`
  query getWallets($limit:Int!, $offset:Int!){
    getWallets(limit:$limit, offset:$offset ){
        statusCode
        response
        message
    }
 }
`

/**Mutations */

export const createWalletComment = gql`
  mutation createWalletComment(
    $walletId:ID!
    $text:String! 
    $all:Boolean! 
    $roles:[Int]){
    createWalletComment(walletId:$walletId,data:{text:$text, all:$all, roles:$roles }){
      statusCode
      response
      message
    }
  }
`