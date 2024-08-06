import {apolloClient} from '@/lib/api'

/**typeDefs */
import { 
    addClaim,
    getClaimsBySubscriptionId,
    deleteClaimDocumentById,
    addDocumentsClaims,
    deleteClaimCorrespondenceById,
    addCorrespondenceClaims,
    getClaimById,
    updateClaim
 } from './dtos/claims.service.dtos'

class claimsService {
    async addClaim({ 
        subscriptionId,
        idUser,
        infoClaim,
        files,
        correspondence
     }){
        try {
            
            const variables = {
                data:{
                    subscriptionId,
                    idUser,
                    infoClaim,
                    files,
                    correspondence
                }
            }
            
            const findResponse = apolloClient.mutate({
                variables,
                mutation: addClaim,
                fetchPolicy:'no-cache'
            });

            const { data } = await findResponse;


            const response = JSON.parse(data['addClaim'].response);

            return response;
        } catch (error) {
            //console.log(error)
            const message =  String(error)
            throw new Error(message)
        }
    } 

    async getClaimsBySubscriptionId(id){
        const variables = { id }
        const { data } = await apolloClient.query({
            query: getClaimsBySubscriptionId,
            variables,
            fetchPolicy:'no-cache'
        });
        const { response } = data.getClaimsBySubscriptionId;
        const parsedResponse = JSON.parse(response);
        return parsedResponse;
    }

    async deleteClaimDocumentById(id) {
        const variables = { id }
        const { data } = await apolloClient.query({
            query: deleteClaimDocumentById,
            variables,
            fetchPolicy: 'no-cache'
        });
        const { response } = data.deleteClaimDocumentById;
        const parsedResponse = JSON.parse(response);
        return parsedResponse;
    }

    async addDocumentsClaims({ id, files }) {
        const variables = {
            data: { id, files }
        }
        const { data } = await apolloClient.query({
            query: addDocumentsClaims,
            variables,
            fetchPolicy: 'no-cache'
        });
        const { response } = data.addDocumentsClaims;
        const parsedResponse = JSON.parse(response);
        return parsedResponse;
    }

    async deleteClaimCorrespondenceById(id) {
        const variables = { id }
        const { data } = await apolloClient.query({
            query: deleteClaimCorrespondenceById,
            variables,
            fetchPolicy: 'no-cache'
        });
        const { response } = data.deleteClaimCorrespondenceById;
        const parsedResponse = JSON.parse(response);
        return parsedResponse;
    }

    async addCorrespondenceClaims({ id, files }) {
        const variables = {
            data: { id, files }
        }
        const { data } = await apolloClient.query({
            query: addCorrespondenceClaims,
            variables,
            fetchPolicy: 'no-cache'
        });
        const { response } = data.addCorrespondenceClaims;
        const parsedResponse = JSON.parse(response);
        return parsedResponse;
    }

    async getClaimById(id){
        const variables = { id }
        const { data } = await apolloClient.query({
            query: getClaimById,
            variables,
            fetchPolicy:'no-cache'
        });
        const { response } = data.getClaimById;
        const parsedResponse = JSON.parse(response);
        return parsedResponse;
    }

    async updateClaim({ 
        subscriptionId,
        idUser,
        infoClaim,
        idClaim
     }){
        try {
            
            const variables = {
                data:{
                    subscriptionId,
                    idUser,
                    infoClaim,
                    idClaim
                }
            }
            
            const findResponse = apolloClient.mutate({
                variables,
                mutation: updateClaim,
                fetchPolicy:'no-cache'
            });

            const { data } = await findResponse;


            const response = JSON.parse(data['updateClaims'].response);

            return response;
        } catch (error) {
            //console.log(error)
            const message =  String(error)
            throw new Error(message)
        }
    } 
}


export default new claimsService()