// Repositories
import { apolloClient } from '../../../../../lib/api';

// DTOs
import getNatcatDocumentListDto from './dtos/getNatcatDocumentListDto.gql'
import saveNatcatDocumentDto from './dtos/saveNatcatDocumentDto.gql'
import saveEndorsementDocumentDto from './dtos/saveEndorsementDocumentDto.gql'
import singleUploadDto from './dtos/singleUploadDto.gql'
import deleteNatcatDocumentDto from './dtos/deleteNatcatDocumentDto.gql'
import getEndorsementDocumentListDto from './dtos/getEndorsementDocumentListDto.gql'
import getEndorsementDocumentDto from './dtos/getEndorsementDocumentDto.gql'

export async function getDocsEndorsements ({ subscription_id }) {
  const variables = {
    subscription_id
  }

  const { data: { getEndorsementDocumentList } } = await apolloClient.query({
    query: getEndorsementDocumentListDto,
    variables,
    fetchPolicy: 'no-cache'
  })

  const res = JSON.parse(getEndorsementDocumentList.response)
  const formattedRes = res.map(e => ({
    id: e.id,
    document_url: e.document_url,
    uri: e.uri,
    status: 'loaded',
    errorMessage: ''
  }))

  return formattedRes
}
export async function getDocEndorsements ({ subscription_id, filename }) {
  const variables = {
    subscription_id,
    filename
  }

  const { data: { getEndorsementDocument } } = await apolloClient.query({
    query: getEndorsementDocumentDto,
    variables,
    fetchPolicy: 'no-cache'
  })

  const res = JSON.parse(getEndorsementDocument.response)
  console.log(res)
  const formattedRes ={
    id: res.id,
    document_url: res.document_url,
    uri: res.uri,
    status: 'loaded',
    errorMessage: ''
  }

  return formattedRes
}
export async function getNatcatDocs ({ subscription_id }) {
  const variables = {
    subscription_id
  }

  const { data: { getNatcatDocumentList } } = await apolloClient.query({
    query: getNatcatDocumentListDto,
    variables,
    fetchPolicy: 'no-cache'
  })

  const res = JSON.parse(getNatcatDocumentList.response)
  const formattedRes = res.map(e => ({
    id: e.id,
    fileName: e.doc_s3,
    downloadLink: e.uri,
    status: 'loaded',
    errorMessage: ''
  }))

  return formattedRes
}
export async function saveEndorsementDocumentBD ({ subscription_id, doc_s3 }) {
  const variables = {
    subscription_id,
    doc_s3
  }

  const { data: { saveEndorsementDocument } } = await apolloClient.mutate({
    mutation: saveEndorsementDocumentDto,
    variables,
    fetchPolicy: 'no-cache'
  })

  const res = JSON.parse(saveEndorsementDocument.response)

  return res
}

export async function saveNatcatDocumentBD ({ subscription_id, doc_s3 }) {
  const variables = {
    subscription_id,
    doc_s3
  }

  const { data: { saveNatcatDocument } } = await apolloClient.mutate({
    mutation: saveNatcatDocumentDto,
    variables,
    fetchPolicy: 'no-cache'
  })

  const res = JSON.parse(saveNatcatDocument.response)

  return res
}

export async function uploadNatcatDocumentAWS ({ file, path }) {
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

export async function deleteNatcatDocumentAWSBD ({ idDocument }) {
  const variables = {
    id_document: idDocument
  }

  const { data: { deleteNatcatDocument } } = await apolloClient.mutate({
    mutation: deleteNatcatDocumentDto,
    variables,
    fetchPolicy: 'no-cache'
  })

  const res = JSON.parse(deleteNatcatDocument.response)

  return res
}
