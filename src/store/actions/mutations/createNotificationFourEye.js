import gql from 'graphql-tag';

export default gql`
	mutation createNotificationFourEye(
		$subscription_id: ID!
		$reviewer_user_id: ID!
		$notifying_user_id: ID!
		$status: StatusNotificationFourEye!
		$commentary: String
	) {
		createNotificationFourEye(
			input: {
				subscription_id: $subscription_id
				reviewer_user_id: $reviewer_user_id
				notifying_user_id: $notifying_user_id
				status: $status
				commentary: $commentary
			}
		) {
			statusCode
			response
		}
		
	}
`;
