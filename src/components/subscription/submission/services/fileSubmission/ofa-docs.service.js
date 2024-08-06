// Repositories
import { apolloClient } from '../../../../../lib/api';

// DTOs
import getOfaDocumentListDto from './dtos/getOfaDocumentListDto.gql'
import saveOfaDocumentDto from './dtos/saveOfaDocumentDto.gql'
import singleUploadDto from './dtos/singleUploadDto.gql'
import deleteOfaDocumentDto from './dtos/deleteOfaDocumentDto.gql'

export async function getOfaDocs ({ subscription_id }) {
  const variables = {
    subscription_id
  }

  const { data: { getOfaDocumentList } } = await apolloClient.query({
    query: getOfaDocumentListDto,
    variables,
    fetchPolicy: 'no-cache'
  })

  const res = JSON.parse(getOfaDocumentList.response)
  const formattedRes = res.map(e => ({
    id: e.id,
    fileName: e.doc_s3,
    downloadLink: e.uri,
    status: 'loaded',
    errorMessage: ''
  }))

  return formattedRes
}

export async function saveOfaDocumentBD ({ subscription_id, doc_s3 }) {
  const variables = {
    subscription_id,
    doc_s3
  }

  const { data: { saveOfaDocument } } = await apolloClient.mutate({
    mutation: saveOfaDocumentDto,
    variables,
    fetchPolicy: 'no-cache'
  })

  const res = JSON.parse(saveOfaDocument.response)

  return res
}

export async function uploadOfaDocumentAWS ({ file, path }) {
  const variables = {
    file,
    path
  }

  const { data: { singleUpload } } = await apolloClient.mutate({
    mutation: singleUploadDto,
    variables,
    fetchPolicy: 'no-cache'
  })

  const res = singleUpload.uri

  return res
}

export async function deleteOfaDocumentAWSBD ({ idDocument }) {
  const variables = {
    id_document: idDocument
  }

  const { data: { deleteOfaDocument } } = await apolloClient.mutate({
    mutation: deleteOfaDocumentDto,
    variables,
    fetchPolicy: 'no-cache'
  })

  const res = JSON.parse(deleteOfaDocument.response)

  return res
}
