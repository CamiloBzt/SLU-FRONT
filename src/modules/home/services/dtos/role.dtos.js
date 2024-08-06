import gql  from 'graphql-tag'

export const getAllRoles = gql`
 query getAllRoles{
    getAllRoles{
        id
        role
        description
    }
 }
`