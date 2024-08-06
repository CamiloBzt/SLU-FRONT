// Repositories
import { apolloClient } from '@/lib/api';

// DTOs
import getNetPremiumOriginalCurrencyByIdDto from './dtos/getNetPremiumOriginalCurrencyByIdDto.gql'
export async function getNetPremiumOriginalCurrencyById({ id_subscription }) {
  const variables = {
    id_subscription
  }
  const { data: { getNetPremiumOriginalCurrencyById } } = await apolloClient.query({
    query: getNetPremiumOriginalCurrencyByIdDto,
    variables,
    fetchPolicy: 'no-cache'
  })
  const res = JSON.parse(getNetPremiumOriginalCurrencyById.response);
  return res
}

