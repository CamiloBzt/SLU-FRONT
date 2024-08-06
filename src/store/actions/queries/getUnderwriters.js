import gql from 'graphql-tag';

export default gql`
	query {
		getUnderwriters {
			id
			name
			lastName
		}
	}
`;
