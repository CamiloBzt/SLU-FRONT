/* repos */
import { apolloClient } from '@/lib/api';
/* dtos */
import getCatalogDto from './dtos/get-catalog.dto.gql';
import getSublimesByIdDto from './dtos/get-sublimes-by-id.dto.gql';
import setSublimePropertyDto from './dtos/set-sublime-property.dto.gql';
import addSublimePropertyDto from './dtos/add-sublime-property.dto.gql';

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

export async function getSublimes(id) {
  const variables = { id };
  const { data } = await apolloClient.query({
    query: getSublimesByIdDto,
    variables,
    fetchPolicy: 'no-cache',
  });

  const { response } = data.getSublimesById;
  const parsedResponse = JSON.parse(response);
  return parsedResponse;
}

export async function saveSublime(id, column, value) {
  const variables = { id, column, value: String(value) };
  const { data } = await apolloClient.mutate({
    mutation: setSublimePropertyDto,
    variables,
    fetchPolicy: 'no-cache',
  });

  const { response, message } = data.setSublimeProperty;
  const parsedResponse = JSON.parse(response);
  return { response: parsedResponse, message };
}

export async function addSublime(id_subscription) {
  const variables = { id_subscription };
  const { data } = await apolloClient.mutate({
    mutation: addSublimePropertyDto,
    variables,
    fetchPolicy: 'no-cache',
  });

  const { response, message } = data.addSublimeProperty;
  const parsedResponse = JSON.parse(response);
  return { response: parsedResponse, message };
}
