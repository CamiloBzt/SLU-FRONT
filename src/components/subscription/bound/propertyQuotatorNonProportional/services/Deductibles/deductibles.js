// Repositories
import { apolloClient } from '@/lib/api';

// DTOs
import getDeductiblesByIdDto from './dtos/getDeductiblesByIdDto.gql'
import setDeductibleDto from './dtos/setDeductibleDto.gql'
import setNewDeductibleNonPropDto from './dtos/setNewDeductibleNonPropDto.gql'
import setDeleteDeductibleNonPropDto from './dtos/setDeleteDeductibleNonPropDto.gql'
import setNewFireDeductibleDto from './dtos/setNewFireDeductibleDto.gql'
import getFireDeductibleDto from './dtos/getFireDeductibleDto.gql'
import setFireDeductiblePropertyDto from './dtos/setFireDeductiblePropertyDto.gql'
import setDeleteFireDeductibleNonPropDto from './dtos/setDeleteFireDeductibleNonPropDto.gql'


export async function getDeductiblesById({ id }) {
    const variables = {
        id
    }
    const { data: { getDeductiblesById } } = await apolloClient.query({
        query: getDeductiblesByIdDto,
        variables,
        fetchPolicy: 'no-cache'
    })
    const res = JSON.parse(getDeductiblesById.response);
    return res
}

export async function setDeductible({ id, column, value }) {
    const variables = {
        id,
        column,
        value
    }
    const { data: { setDeductible } } = await apolloClient.query({
        query: setDeductibleDto,
        variables,
        fetchPolicy: 'no-cache'
    })
    const res = JSON.parse(setDeductible.statusCode);
    return res
}

export async function setNewDeductibleNonProp({ id_subscription }) {
    const variables = {
        id_subscription
    }
    const { data: { setNewDeductibleNonProp } } = await apolloClient.query({
        query: setNewDeductibleNonPropDto,
        variables,
        fetchPolicy: 'no-cache'
    })
    const res = JSON.parse(setNewDeductibleNonProp.statusCode);
    return res
}

export async function setDeleteDeductibleNonProp({ id }) {
    const variables = {
        id
    }
    const { data: { setDeleteDeductibleNonProp } } = await apolloClient.query({
        query: setDeleteDeductibleNonPropDto,
        variables,
        fetchPolicy: 'no-cache'
    })
    const res = JSON.parse(setDeleteDeductibleNonProp.statusCode);
    return res
}

export async function setNewFireDeductible({ deductible_id, id_subscription }) {
    const variables = {
        deductible_id,
        id_subscription,
    };
    console.log('antes de enviar')
    const { data: { setNewFireDeductible } } = await apolloClient.query({
        query: setNewFireDeductibleDto,
        variables,
        fetchPolicy: 'no-cache'
    })

    const res = JSON.parse(setNewFireDeductible.statusCode);
    return res
}

export async function getFireDeductible({ id }) {
    const variables = {
        id
    }
    const { data: { getFireDeductible } } = await apolloClient.query({
        query: getFireDeductibleDto,
        variables,
        fetchPolicy: 'no-cache'
    })
    const res = JSON.parse(getFireDeductible.response);
    return res
}

export async function setFireDeductibleProperty({ id, column, value }) {
    const variables = {
        id,
        column,
        value
    }
    const { data: { setFireDeductibleProperty } } = await apolloClient.query({
        query: setFireDeductiblePropertyDto,
        variables,
        fetchPolicy: 'no-cache'
    })
    const res = JSON.parse(setFireDeductibleProperty.statusCode);
    return res
}

export async function setDeleteFireDeductibleNonProp({ id }) {
    const variables = {
        id
    }
    const { data: { setDeleteFireDeductibleNonProp } } = await apolloClient.query({
        query: setDeleteFireDeductibleNonPropDto,
        variables,
        fetchPolicy: 'no-cache'
    })
    const res = JSON.parse(setDeleteFireDeductibleNonProp.statusCode);
    return res
}