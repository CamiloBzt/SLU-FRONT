// Repositories
import { apolloClient } from '@/lib/api';

// DTOs
import getCatalogDto from './dtos/getCatalogDto.gql'

export async function getCatalog({name}) {
  const variables = {
    name
  }
  const { data: { getCatalog } } = await apolloClient.query({
    query: getCatalogDto,
    variables,
    fetchPolicy: 'no-cache'
  })
  const res = JSON.parse(getCatalog.response)
  return res
}
