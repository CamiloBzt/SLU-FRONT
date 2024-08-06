import gql from 'graphql-tag';

export default gql`
    mutation updateNotificationFourEyesDetail(
        $id: ID!
        $input: [notifyUpdateData]!
    ) {
        updateNotificationFourEyesDetail(
            id: $id,
            input: $input
        ){
            statusCode
            message
            response
        }
    }
`;