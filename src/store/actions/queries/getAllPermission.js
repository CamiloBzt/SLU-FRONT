import gql from 'graphql-tag';

export default gql`
  query {
    getGlobalViews {
      views,
      actions
    }
  }
`;
