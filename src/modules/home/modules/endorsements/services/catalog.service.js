import {apolloClient} from '@/lib/api'

/**typeDefs */
import {getCatalog, getAllBrokers} from './dtos/catalog.service.dtos'


const getCatalogbyName = async (name) => {

    const variables = {
        name
    };

    try {

        const findResponse = apolloClient.query({
            variables,
            query: getCatalog,
            fetchPolicy:'no-cache'
        });

        const { data } = await findResponse;

        const response = JSON.parse(data['getCatalog'].response);

        return response;
    } catch (error) {
        console.log(error)
        return {error:true}        
    }

}


class Catalog {
    constructor(){

    }

    async getUnderlyingCat(){

        const response = getCatalogbyName('underlying_cats');

        return response;

    }

    async getUnderlyingCatAplica(){

        const response = getCatalogbyName('underlying_cat_aplica');

        return response;

    }

    async getUnderlyingCatValues(){

        const response = getCatalogbyName('underlying_cat_values');

        return response;

    }

    async getUnderlyingFireAplica(){

        const response = getCatalogbyName('underlying_fire_aplica');

        return response;

    }

    async getUnderlyingFire(){

        const response = getCatalogbyName('underlying_fire');

        return response;

    }

    async getUnderlyingFireQuotator(){

        const response = getCatalogbyName('underlying_fire_quotator');

        return response;

    }

    async getSublimits(){

        const response = getCatalogbyName('sublimits');

        return response;

    }

    async getEndoso(){
        const response = getCatalogbyName('endoso');

        return response;
    }

    async getOtherDeductibles(){
        const response = getCatalogbyName('other_deductibles');

        return response;
    }

    async getAllBrokers(){
        try {

            const findResponse = apolloClient.query({
                query: getAllBrokers,
                fetchPolicy:'no-cache'
            });
    
            const { data } = await findResponse;
    
            const response = JSON.parse(data['getAllBrokers'].response);
    
            return response;
        } catch (error) {
            console.log(error)
            return {error:true}        
        }
    }

}

export default new Catalog();