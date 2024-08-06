/* repos */
import { apolloClient } from '@/lib/api';
/* dtos */
import getCatalogDto from './dtos/get-catalog.dto.gql';
import getTotalInsurableValueByIdDto from './dtos/get-total-insurable-value-by-id.dto.gql';
import setTotalInsurableValueDto from './dtos/set-total-insurable-value.dto.gql';

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

export async function getTotalInsurableValue(id_subscription) {
  const variables = { id_subscription };
  const { data } = await apolloClient.query({
    query: getTotalInsurableValueByIdDto,
    variables,
    fetchPolicy: 'no-cache',
  });

  const { response } = data.getTotalInsurableValueById;
  const parsedResponse = JSON.parse(response);
  return parsedResponse;
}

export async function saveTotalInsurableValue(id_subscription, column, value) {
  const variables = { id_subscription, column, data: String(value) };
  const { data } = await apolloClient.mutate({
    mutation: setTotalInsurableValueDto,
    variables,
    fetchPolicy: 'no-cache',
  });

  const { response } = data.setTotalInsurableValue;
  const parsedResponse = JSON.parse(response);
  return parsedResponse;
}
