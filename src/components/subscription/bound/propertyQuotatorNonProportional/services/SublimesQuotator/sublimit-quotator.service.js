/* repos */
import { apolloClient } from '@/lib/api';
/* dtos */
import getSublimitsByIdDto from './dtos/get-sublimits-by-id.dto.gql';
import setSublimitPropertyDto from './dtos/set-sublimit-property.dto.gql';
import addSublimitPropertyDto from './dtos/add-sublimit-property.dto.gql';

export async function getSublimits(id) {
  const variables = { id };
  const { data } = await apolloClient.query({
    query: getSublimitsByIdDto,
    variables,
    fetchPolicy: 'no-cache',
  });

  const { response } = data.getSublimitsById;
  const parsedResponse = JSON.parse(response);
  return parsedResponse;
}

export async function saveSublimit(id, column, value) {
  const variables = { id, column, value: String(value) };
  const { data } = await apolloClient.mutate({
    mutation: setSublimitPropertyDto,
    variables,
    fetchPolicy: 'no-cache',
  });

  const { response, message } = data.setSublimitProperty;
  const parsedResponse = JSON.parse(response);
  return { response: parsedResponse, message };
}

export async function addSublimit(id, id_subscription) {
  const variables = { id, id_subscription };
  const { data } = await apolloClient.mutate({
    mutation: addSublimitPropertyDto,
    variables,
    fetchPolicy: 'no-cache',
  });

  const { response, message } = data.addSublimitProperty;
  const parsedResponse = JSON.parse(response);
  return { response: parsedResponse, message };
}
