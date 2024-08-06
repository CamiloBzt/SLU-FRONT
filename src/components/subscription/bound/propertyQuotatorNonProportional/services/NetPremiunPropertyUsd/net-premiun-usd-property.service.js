// Repositories
import { apolloClient } from '@/lib/api';

// DTOs
import setNetPremiumUsdDto from './dtos/setNetPremiumUsdDto.gql'

export async function setNetPremiumUsd({ id_subscription, column, data }) {
  const variables = {
    id_subscription,
    column,
    data
  }
  const { data: { setNetPremiumUsd } } = await apolloClient.query({
    query: setNetPremiumUsdDto,
    variables,
    fetchPolicy: 'no-cache'
  })
  const res = JSON.parse(setNetPremiumUsd.response);
  return res
}

