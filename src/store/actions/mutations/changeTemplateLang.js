import gql from "graphql-tag";

export default gql`
  mutation changeTemplateLang($langId: Int, $id: ID) {
    changeTemplateLang(langId: $langId, id: $id) {
      response
      statusCode
      message
      error
    }
  }
`;
