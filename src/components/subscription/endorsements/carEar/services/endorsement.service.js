/* repos */
import { apolloClient } from '@/lib/api';
/* dtos */
import getCatalogDto from './dtos/get-catalog.dto.gql';
import getEndorsementsDto from './dtos/get-endorsements.dto.gql';
import updateEndorsementDto from './dtos/update-endorsement.dto.gql';
import updateEndorsementMovementDto from './dtos/update-endorsement-movement.dto.gql';
import createEndorsementDto from './dtos/create-endorsement.dto.gql';
import getEndorsementPolicyDto from './dtos/get-endorsement-policy.dto.gql';
import setEndorsementPolicyDto from './dtos/set-endorsement-policy.dto.gql';
import getTotalInsurableValueByIdDto from './dtos/get-total-insurable-value-by-id.dto.gql';

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

export async function getEndorsements(id) {
  const variables = { id };
  const { data } = await apolloClient.query({
    query: getEndorsementsDto,
    variables,
    fetchPolicy: 'no-cache',
  });

  const { response } = data.getEndorsements;
  const parsedResponse = JSON.parse(response);
  return parsedResponse;
}

export async function createEndorsement(id) {
  const variables = { id };
  const { data } = await apolloClient.mutate({
    mutation: createEndorsementDto,
    variables,
    fetchPolicy: 'no-cache',
  });

  const { response } = data.createEndorsement;
  const parsedResponse = JSON.parse(response);
  return parsedResponse;
}

export async function updateEndorsement(id, column, value) {
  const variables = { id, column, data: String(value) };
  const { data } = await apolloClient.mutate({
    mutation: updateEndorsementDto,
    variables,
    fetchPolicy: 'no-cache',
  });

  const { response } = data.updateEndorsement;
  const parsedResponse = JSON.parse(response);
  return parsedResponse;
}

export async function updateEndorsementMovement(id, value) {
  const variables = { id, data: String(value) };
  const { data } = await apolloClient.mutate({
    mutation: updateEndorsementMovementDto,
    variables,
    fetchPolicy: 'no-cache',
  });

  const { response } = data.updateEndorsementMovement;
  const parsedResponse = JSON.parse(response);
  return parsedResponse;
}

export async function getPolicy(id) {
  const variables = { id };
  const { data } = await apolloClient.query({
    query: getEndorsementPolicyDto,
    variables,
    fetchPolicy: 'no-cache',
  });

  const { response } = data.getEndorsementPolicy;
  const parsedResponse = JSON.parse(response);
  return parsedResponse;
}

export async function savePolicy(id_subscription, column, value) {
  const variables = { id_subscription, column, data: String(value) };
  const { data } = await apolloClient.mutate({
    mutation: setEndorsementPolicyDto,
    variables,
    fetchPolicy: 'no-cache',
  });

  const { response } = data.setEndorsementPolicy;
  const parsedResponse = JSON.parse(response);
  return parsedResponse;
}
