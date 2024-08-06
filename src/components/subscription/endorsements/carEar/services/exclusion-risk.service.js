/* repos */
import { apolloClient } from '@/lib/api';
/* dtos */
import getCatalogDto from './dtos/get-catalog.dto.gql';
import updateReductionInsurableDto from './dtos/update-reduction-insurable.dto.gql';
import getEndorsementReductionInsurableDto from './dtos/get-endorsement-reduction-insurable.dto.gql';

export async function getCatalog(name) {
  const variables = { name };
  const { data } = await apolloClient.query({
    query: getCatalogDto,
    variables,
    fetchPolicy: 'no-cache',
  });

  const { response } = data.getCatalog;
  const parsedResponse = JSON.parse(response);
  return parsedResponse;
}

export async function getExclusionRisk(id) {
  const variables = { id };
  const { data } = await apolloClient.query({
    query: getEndorsementReductionInsurableDto,
    variables,
    fetchPolicy: 'no-cache',
  });

  const { response } = data.getEndorsementReductionInsurable;
  const parsedResponse = JSON.parse(response);
  return parsedResponse;
}

export async function saveExclusionRisk(id, column, value) {
  const variables = { id, column, data: String(value) };
  const { data } = await apolloClient.mutate({
    mutation: updateReductionInsurableDto,
    variables,
    fetchPolicy: 'no-cache',
  });

  const { response } = data.updateReductionInsurable;
  const parsedResponse = JSON.parse(response);
  return parsedResponse;
}
