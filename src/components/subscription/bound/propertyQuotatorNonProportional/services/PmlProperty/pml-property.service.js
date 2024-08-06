/* repos */
import { apolloClient } from '@/lib/api';
/* dtos */
import getPmlPropertyByIdDto from './dtos/get-pml-property-by-id.dto.gql';
import setPmlPropertyDto from './dtos/set-pml-property.dto.gql';

export async function getPmlProperty(id_subscription) {
  const variables = { id_subscription };
  const { data } = await apolloClient.query({
    query: getPmlPropertyByIdDto,
    variables,
    fetchPolicy: 'no-cache',
  });

  const { response } = data.getPmlPropertyById;
  const parsedResponse = JSON.parse(response);
  return parsedResponse;
}

export async function savePmlProperty(id_subscription, column, value) {
  const variables = { id_subscription, column, data: String(value) };
  const { data } = await apolloClient.mutate({
    mutation: setPmlPropertyDto,
    variables,
    fetchPolicy: 'no-cache',
  });

  const { response } = data.setPmlProperty;
  const parsedResponse = JSON.parse(response);
  return parsedResponse;
}
