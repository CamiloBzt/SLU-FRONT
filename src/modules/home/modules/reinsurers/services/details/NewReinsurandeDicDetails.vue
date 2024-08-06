<template>
    <div>
        <div class="reinsurers-wrapper">
            <div class="inner-title">New re-insurance DIC</div>
            <div class="reinsurers-inputs">
                <div class="input-width">
                    <v-text-field
                        class="disabled"
                        label="Re-insurance name"
                        disabled
                        v-model="detailsNewReinsurandeDic.reInsuranceName"
                    >
                    </v-text-field>
                </div>
                <div class="input-width">
                    <v-text-field
                        label="Inception date"
                        disabled
                        v-model="detailsNewReinsurandeDic.inceptionDateNewReInsuranceDic"
                    >
                    </v-text-field>
                </div>
                <div class="input-width">
                    <v-text-field
                        label="Expiry date"
                        disabled
                        v-model="detailsNewReinsurandeDic.expiryDateNewReInsuranceDic"
                    >
                    </v-text-field>
                </div>
            </div>
            <div class="reinsurers-inputs" v-for="(value, index) in brokerNewReinsurandeDic" :key="index">
                <div class="input-width">
                    <v-text-field
                        label="Re-insurance broker"
                        disabled
                        v-model="value.broker"
                    >
                    </v-text-field>
                </div>
                <div class="input-width">
                    <v-text-field
                        label="Comission broker"
                        disabled
                        v-model="value.brokerComission"
                    >
                    </v-text-field>
                </div>
            </div>
            <div class="reinsurers-Conditions">
                <div class="input-width-Conditions">
                    <v-text-field
                        label="Comission SLU"
                        disabled
                        v-model="detailsNewReinsurandeDic.comissionSluNewReInsuranceDic"
                    >
                    </v-text-field>
                </div>
                <div class="input-width-Conditions">
                    <v-text-field
                        label="To everglades re 1 DIC%"
                        disabled
                        v-model="detailsNewReinsurandeDic.evergladesRe1Dic"
                    >
                    </v-text-field>
                </div>
                <div class="input-width-Conditions">
                    <v-text-field
                        label="Everglades re 2 DIC%"
                        disabled
                        v-model="detailsNewReinsurandeDic.evergladesRe2Dic"
                    >
                    </v-text-field>
                </div>
                <div class="input-width-Conditions">
                    <v-text-field
                        label="Associated to"
                        disabled
                        v-model="detailsNewReinsurandeDic.associated"
                    >
                    </v-text-field>
                </div>
            </div>
            <div class="inner-title">Restrictions</div>
            <div class="reinsurers-inputs" v-for="(value, index) in restrictionsNewReinsurandeDic" :key="index">
                <div class="input-width">
                    <v-text-field
                        label="Activities"
                        disabled
                        v-model="value.activityName"
                    >
                    </v-text-field>
                </div>
                <div class="input-width">
                    <v-text-field
                        label="Countries"
                        disabled
                        v-model="value.countryName"
                    >
                    </v-text-field>
                </div>
            </div>
            <div class="inner-title">Conditions</div>
            <div class="reinsurers-Conditions">
                <div class="input-width-Conditions">
                    <v-text-field
                        label="Maximum limit including BI"
                        disabled
                        v-model="detailsNewReinsurandeDic.maximumLimitIncludingBiNewReInsuranceDic"
                    >
                    </v-text-field>
                </div>
                <div class="input-width-Conditions">
                    <v-text-field
                        label="Maximum limit without BI"
                        disabled
                        v-model="detailsNewReinsurandeDic.maximumLimitWithoutBiNewReInsuranceDic"
                    >
                    </v-text-field>
                </div>
                <div class="input-width-Conditions">
                    <v-text-field
                        label="Deductions"
                        disabled
                        v-model="detailsNewReinsurandeDic.deductionsNewReInsuranceDic"
                    >
                    </v-text-field>
                </div>
                <div class="input-width-Conditions">
                    <v-text-field
                        label="Maximum line"
                        disabled
                        v-model="detailsNewReinsurandeDic.maximumLineNewReInsuranceDic"
                    >
                    </v-text-field>
                </div>
            </div>
        </div>
        <div class="button-direction">
            <router-link class="direction-button" to="/reinsurers" >
                <button class="button-dic">Return</button>
            </router-link>
        </div>
    </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';

export default {
    name: "NewReinsurandeDicDetails",
    components: {},
    props: {
        detailsNewReinsurandeDic: Object,
        brokerNewReinsurandeDic: Array,
        restrictionsNewReinsurandeDic: Array,
    },
    data() {
        return {
            catalogActivities: [],
            catalogCountries: [],
        };
    },
    computed: {
        ...mapGetters([
            'countries',
            'activities',
        ]),
    },
    methods: {
        ...mapActions([
            'getCatalogByName',
            'createReinsurer',
        ]),
    },
    async mounted() {
        await this.getCatalogByName({ name: 'activities' });
        await this.getCatalogByName({ name: 'countries' });
        this.catalogCountries = this.countries.map((c) => c.description)
        this.catalogActivities = this.activities.map((a) => a.description)
    },
};
</script>
<style lang="less" scoped>
.reinsurers-wrapper {
    width: 100%;
    height: auto;
    border-radius: 15px;
    background: white;
    box-shadow: 8px 8px 12px rgba(10, 63, 102, 0.15);
    margin-top: 2rem;
    margin-bottom: 2rem;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-content: center;
    padding: 0 2rem;
}
.inner-title {
    width: 100%;
    font-size: 20px;
    font-weight: 800;
    margin: 15px 0;
}
.reinsurers-inputs {
    width: 80%;
    padding-left: 5rem;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 1.5rem;
}
.input-width {
    width: 31%;
}
.disabled{
    color: #000;
}
.reinsurers-Conditions {
    width: 100%;
    padding-left: 5rem;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 1.5rem;
}
.input-width-Conditions {
    width: 22%;
}
.button-direction{
    display: flex;
    flex-direction: row-reverse;
}
.button-dic {
    box-sizing: border-box;
    border: 1px solid #003D6D;
    border-radius: 24px;
    width: 12rem;
    height: 3rem;
    font-family: 'Avenir Next Cyr';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 110%;
    text-align: center;
    color: #003D6D;
    margin-bottom: 2rem;
}
</style>