/* repos */
import { apolloClient } from '@/lib/api';
/* dtos */
import getBoundClaimsDto from './dtos/getBoundClaimsDto.gql';
import updateBoundClaimDto from './dtos/updateBoundClaimDto.gql';

export async function getBoundClaims(subscription_id, type) {
  const variables = {
    subscription_id,
    type
  };
  const { data } = await apolloClient.query({
    query: getBoundClaimsDto,
    variables,
    fetchPolicy: 'no-cache',
  });

  const { response } = data.getBoundClaims;
  const parsedResponse = JSON.parse(response);
  return parsedResponse;
}

export async function updateBoundClaim(id, column, value, type) {
  const variables = {
    id,
    column,
    value,
    type
  };
  const { data } = await apolloClient.query({
    query: updateBoundClaimDto,
    variables,
    fetchPolicy: 'no-cache',
  });

  const response = data.updateBoundClaim;
  return response;
}

