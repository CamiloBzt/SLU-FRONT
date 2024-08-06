/* repos */
import { apolloClient } from '@/lib/api';
/* dtos */
import getMainLocationByIdDto from './dtos/get-main-location-by-id.dto.gql';
import setMainLocationDto from './dtos/set-main-location.dto.gql';

export async function getMainLocation(id_subscription) {
  const variables = { id_subscription };
  const { data } = await apolloClient.query({
    query: getMainLocationByIdDto,
    variables,
    fetchPolicy: 'no-cache',
  });

  const { response } = data.getMainLocationById;
  const parsedResponse = JSON.parse(response);
  return parsedResponse;
}

export async function saveMainLocation(id_subscription, column, value) {
  const variables = { id_subscription, column, data: String(value) };
  const { data } = await apolloClient.mutate({
    mutation: setMainLocationDto,
    variables,
    fetchPolicy: 'no-cache',
  });

  const { response } = data.setMainLocation;
  const parsedResponse = JSON.parse(response);
  return parsedResponse;
}
