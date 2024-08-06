import gql from 'graphql-tag'

/**Queries */

export const getQuotation = gql`
    query findQuotationBySubscription(
        $id:Int!, 
        $type:Int!
    ){
        findQuotationBySubscription(id: $id, type:$type){
            statusCode
            message
            response
        }
    }
`