import gql from 'graphql-tag';
export default gql`
	query getNotificationsFourEyeSuscriptor($id: ID!) {
		getNotificationsFourEyeSuscriptor(id: $id) {
			id

			reviewer_user {
				id
				name
				last_name
			}

			status
			commentary
		}
	}
`;
