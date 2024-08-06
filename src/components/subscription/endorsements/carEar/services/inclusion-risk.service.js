/* repos */
import { apolloClient } from '@/lib/api';
/* dtos */
import getCatalogDto from './dtos/get-catalog.dto.gql';
import updateIncreaseInsurableDto from './dtos/update-increase-insurable.dto.gql';
import getEndorsementIncreaseInsurableDto from './dtos/get-endorsement-increase-insurable.dto.gql';

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

export async function getInclusionRisk(id) {
  const variables = { id };
  const { data } = await apolloClient.query({
    query: getEndorsementIncreaseInsurableDto,
    variables,
    fetchPolicy: 'no-cache',
  });

  const { response } = data.getEndorsementIncreaseInsurable;
  const parsedResponse = JSON.parse(response);
  return parsedResponse;
}

export async function saveInclusionRisk(id, column, value) {
  const variables = { id, column, data: String(value) };
  const { data } = await apolloClient.mutate({
    mutation: updateIncreaseInsurableDto,
    variables,
    fetchPolicy: 'no-cache',
  });

  const { response } = data.updateIncreaseInsurable;
  const parsedResponse = JSON.parse(response);
  return parsedResponse;
}
