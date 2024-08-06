import gql from 'graphql-tag';
export default gql`
    query getInsurable($id: ID!){
        getInsurable(id: $id){
        statusCode
        message
        response
    }
    }
`;