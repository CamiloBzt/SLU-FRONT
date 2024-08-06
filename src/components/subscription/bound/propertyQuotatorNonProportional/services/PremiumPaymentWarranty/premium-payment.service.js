// Repositories
import { apolloClient } from '@/lib/api';

// DTOs
import findBoundBySubscriptionDto from './dtos/findBoundBySubscriptionDto.gql'
import updateChangeDto from './dtos/updateChangeDto.gql'

export async function findBoundBySubscription({ id, type }) {
  const variables = {
    id,
    type
  }
  const { data: { findBoundBySubscription } } = await apolloClient.query({
    query: findBoundBySubscriptionDto,
    variables,
    fetchPolicy: 'no-cache'
  })
  const res = JSON.parse(findBoundBySubscription.response);
  return res
}

export async function updateChange({ id, tableName, column, dataValue }) {
  const variables = {
    id,
    tableName,
    column,
    dataValue
  }
  const { data: { updateChange } } = await apolloClient.query({
    query: updateChangeDto,
    variables,
    fetchPolicy: 'no-cache'
  })
  const res = updateChange
  return res
}

