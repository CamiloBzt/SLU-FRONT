<template>
    <div>
        <div class="reinsurers-wrapper">
            <div class="inner-title">New contract</div>
            <div class="reinsurers-inputs">
                <div class="input-width">
                    <v-text-field
                        label="Name contract"
                        disabled
                        v-model="detailsNewContract.nameContract"
                    >
                    </v-text-field>
                </div>
                <div class="input-width">
                    <v-text-field
                        label="Inception date"
                        disabled
                        v-model="detailsNewContract.inceptionDate"
                    >
                    </v-text-field>
                </div>
                <div class="input-width">
                    <v-text-field
                        label="Expiry date"
                        disabled
                        v-model="detailsNewContract.expiryDate"
                    >
                    </v-text-field>
                </div>
            </div>
            <div class="reinsurers-inputs" v-for="(value, index) in brokerNewContract" :key="index">
                <div class="input-width">
                    <v-text-field
                        label="Broker contract"
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
            <div class="reinsurers-inputs">
                <div class="input-width">
                    <v-text-field
                        label="Comission SLU"
                        disabled
                        v-model="detailsNewContract.comissionSlu"
                    >
                    </v-text-field>
                </div>
                <div class="input-width">
                    <v-text-field
                        label="Percentage amount to Re-insurance"
                        disabled
                        v-model="detailsNewContract.percentageAmountToReinsurance"
                    >
                    </v-text-field>
                </div>
            </div>
            <div class="inner-title">Distribution</div>
            <div class="reinsurers-label">
                <div class="column-title">Re-insurance of contract</div>
                <div class="column-title">Percentage</div>
            </div>
            <div class="reinsurers-distribution">
                <div class="plus2"></div>
                <div class="input-width">
                    <v-text-field
                        label="Name re-insurance"
                        disabled
                        v-model="detailsNewContract.nameReinsurance"
                    >
                    </v-text-field>
                </div>
                <div class="input-width">
                    <v-text-field
                        disabled
                        v-model="detailsNewContract.nameReinsurancePercentage"
                    >
                    </v-text-field>
                </div>
            </div>
            <div class="reinsurers-distribution" v-for="(value, index) in partherNewContract" :key="index">
                <div class="plus2"></div>
                <div class="input-width">
                    <v-text-field
                        label="Parther Re"
                        disabled
                        v-model="value.parther"
                    >
                    </v-text-field>
                </div>
                <div class="input-width">
                    <v-text-field
                        v-model="value.partherPercentage"
                        disabled
                    >
                    </v-text-field>
                </div>
            </div>
            <div class="reinsurers-distribution">
                <div class="plus2"></div>
                <div class="input-width"></div>
                <div class="input-width">
                    <v-text-field
                        v-model="detailsNewContract.total"
                        disabled
                    >
                    </v-text-field>
                </div>
            </div>
            <div class="inner-title">Restrictions</div>
            <div class="reinsurers-inputs" v-for="(value, index) in restrictionsNewContract" :key="index">
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
                        v-model="detailsNewContract.maximumLimitIncludingBi"
                    >
                    </v-text-field>
                </div>
                <div class="input-width-Conditions">
                    <v-text-field
                        label="Maximum limit without BI"
                        disabled
                        v-model="detailsNewContract.maximumLimitWithoutBi"
                    >
                    </v-text-field>
                </div>
                <div class="input-width-Conditions">
                    <v-text-field
                        label="Deductions"
                        disabled
                        v-model="detailsNewContract.deductions"
                    >
                    </v-text-field>
                </div>
                <div class="input-width-Conditions">
                    <v-text-field
                        label="Maximum line"
                        disabled
                        v-model="detailsNewContract.maximumLine"
                    >
                    </v-text-field>
                </div>
            </div>
        </div>
        <div class="button-direction">
            <router-link class="direction-button" to="/reinsurers" >
                <button class="button-new-contract">Return</button>
            </router-link>
        </div>
    </div>
</template>
<script>

export default {
    name: "NewContractDetails",
    components: {},
    props: {
        detailsNewContract: Object,
        restrictionsNewContract: Array,
        brokerNewContract: Array,
        partherNewContract: Array
    },
    data() {
        return {};
    },
    computed: {},
    methods: {},
    async mounted () {},
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
.plus {
    width: 1.5rem;
    height: 1.5rem;
    display: flex;
    font-weight: 500;
    justify-content: center;
    align-items: center;
    background-color: #D2DEED;
    border-radius: 15px;
    cursor: pointer;
}
.plus2 {
    width: 1.5rem;
    height: 1.5rem;
    display: flex;
    font-weight: 500;
    justify-content: center;
    align-items: center;
    border-radius: 15px;
    opacity: 1;
}
.reinsurers-label {
    width: 80%;
    padding-left: 5rem;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 1.5rem;
}
.column-title {
    width: 40%;
    font-size: 16px;
    font-weight: 800;
}
.reinsurers-distribution {
    width: 80%;
    padding-left: 7rem;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 1.5rem;
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
.button-new-contract {
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