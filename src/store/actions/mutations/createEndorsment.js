import gql from 'graphql-tag';
export default gql`
    mutation createEndorsment($data: endorsmentData!){
        createEndorsment(data: $data){
        statusCode
        message
        response
    }
    }
`;