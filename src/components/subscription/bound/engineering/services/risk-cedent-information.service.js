/* repos */
import { apolloClient } from '@/lib/api';
/* dtos */
import getRiskCedentInfoDto from './dtos/get-risk-cedent-info-by-id.dto.gql';
import setRiskCedentInfoDto from './dtos/set-risk-cedent-info.dto.gql';

export async function getRiskCedentInformation(idSubscription) {
  const variables = { idSubscription };
  const { data } = await apolloClient.query({
    query: getRiskCedentInfoDto,
    variables,
    fetchPolicy: 'no-cache',
  });

  const { response } = data.getRiskCedentInfoById;
  const parsedResponse = JSON.parse(response);
  return parsedResponse;
}

export async function saveRiskCedentInformation(idSubscription, column, value) {
  const variables = { idSubscription, column, data: String(value) };
  const { data } = await apolloClient.mutate({
    mutation: setRiskCedentInfoDto,
    variables,
    fetchPolicy: 'no-cache',
  });

  const { response } = data.setRiskCedentInfo;
  const parsedResponse = JSON.parse(response);
  return parsedResponse;
}
