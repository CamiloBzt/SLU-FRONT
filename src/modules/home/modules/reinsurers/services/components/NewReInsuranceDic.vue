<template>
    <div>
        <div class="reinsurers-wrapper">
            <div class="inner-title">New re-insurance DIC</div>
            <div class="reinsurers-inputs">
                <div class="input-width">
                    <v-text-field
                        label="Re-insurance name"
                        v-model="reinsuranceRegistry.reInsuranceName"
                    >
                    </v-text-field>
                </div>
                <div class="input-width">
                    <v-menu
                        v-model="menu2"
                        :close-on-content-click="false"
                        :nudge-right="40"
                        transition="scale-transition"
                        offset-y
                        min-width="auto"
                    >
                        <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                            v-model="reinsuranceRegistry.inceptionDateNewReInsuranceDic"
                            label="Endorsement effective"
                            v-bind="attrs"
                            v-on="on"
                        ></v-text-field>
                        </template>
                        <v-date-picker
                        v-model="reinsuranceRegistry.inceptionDateNewReInsuranceDic"
                        @input="menu2 = false"
                        ></v-date-picker>
                    </v-menu>
                </div>
                <div class="input-width">
                    <v-text-field
                        label="Expiry date"
                        v-model="reinsuranceRegistry.expiryDateNewReInsuranceDic"
                    >
                    </v-text-field>
                </div>
            </div>
            <div class="reinsurers-inputs" v-for="(value, index) in broker" :key="index">
                <button class="plus" @click="deleteBroker(index)">-</button>
                <div class="input-width">
                    <v-text-field
                        label="Re-insurance broker"
                        v-model="value.reInsuranceBroker"
                    >
                    </v-text-field>
                </div>
                <div class="input-width">
                    <v-text-field
                        label="Comission broker"
                        v-model="value.comissionBroker"
                    >
                    </v-text-field>
                </div>
                <button v-if="index === (broker.length - 1)" class="plus" @click="addBroker()">+</button>
            </div>
            <div class="reinsurers-Conditions">
                <div class="input-width-Conditions">
                    <v-text-field
                        label="Comission SLU"
                        v-model="reinsuranceRegistry.comissionSluNewReInsuranceDic"
                    >
                    </v-text-field>
                </div>
                <div class="input-width-Conditions">
                    <v-text-field
                        label="To everglades re 1 DIC%"
                        v-model="reinsuranceRegistry.evergladesRe1Dic"
                    >
                    </v-text-field>
                </div>
                <div class="input-width-Conditions">
                    <v-text-field
                        label="Everglades re 2 DIC%"
                        v-model="reinsuranceRegistry.evergladesRe2Dic"
                    >
                    </v-text-field>
                </div>
                <div class="input-width-Conditions">
                    <v-text-field
                        label="Associated to"
                        v-model="reinsuranceRegistry.associated"
                    >
                    </v-text-field>
                </div>
            </div>
            <div class="inner-title">Restrictions</div>
            <div class="reinsurers-inputs" v-for="(value, index) in activitiesAndCountries" :key="index">
                <button class="plus" @click="deleteSelects(index)">-</button>
                <div class="input-width">
                    <v-autocomplete label="Activities" v-model="value.valueActivities" :items="catalogActivities"
                    item-value="id" item-text="type"/>
                </div>
                <div class="input-width">
                    <v-autocomplete label="Countries" v-model="value.valueCountries" :items="catalogCountries"
                    item-value="id" item-text="type"/>
                </div>
                <div v-if="index === (activitiesAndCountries.length - 1)" class="plus" @click="addSelects()">+</div>
            </div>
            <div class="inner-title">Conditions</div>
            <div class="reinsurers-Conditions">
                <div class="input-width-Conditions">
                    <v-text-field
                        label="Maximum limit including BI"
                        v-model="reinsuranceRegistry.maximumLimitIncludingBiNewReInsuranceDic"
                    >
                    </v-text-field>
                </div>
                <div class="input-width-Conditions">
                    <v-text-field
                        label="Maximum limit without BI"
                        v-model="reinsuranceRegistry.maximumLimitWithoutBiNewReInsuranceDic"
                    >
                    </v-text-field>
                </div>
                <div class="input-width-Conditions">
                    <v-text-field
                        label="Deductions"
                        v-model="reinsuranceRegistry.deductionsNewReInsuranceDic"
                    >
                    </v-text-field>
                </div>
                <div class="input-width-Conditions">
                    <v-text-field
                        label="Maximum line"
                        v-model="reinsuranceRegistry.maximumLineNewReInsuranceDic"
                    >
                    </v-text-field>
                </div>
            </div>
        </div>
        <transition name="fade">
            <div class="modal-overly" v-if="showModal"></div>
        </transition>

        <transition name="fade">
            <div class="modal" v-if="showModal">
                <p class="title-modal">Create</p>
                <hr class="line">
                <div class="text-modal">
                    <div>Your reinsurer has been successfully created.</div>
                </div>
                <div class="button-modal-direction">
                    <button class="button-modal" @click="closeModal()">Close</button>
                </div>
            </div>
        </transition>
        <div class="button-direction">
            <button class="button-dic" @click="submit()" >Create</button>
        </div>
    </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';

export default {
    name: "NewReInsuranceDic",
    components: {},
    data() {
        return {
            reinsuranceRegistry: {
                reInsuranceName: "",
                inceptionDateNewReInsuranceDic: "",
                expiryDateNewReInsuranceDic: "",
                comissionSluNewReInsuranceDic: "",
                evergladesRe1Dic: "",
                evergladesRe2Dic: "",
                associated: "",
                maximumLimitIncludingBiNewReInsuranceDic: "",
                maximumLimitWithoutBiNewReInsuranceDic: "",
                deductionsNewReInsuranceDic: "",
                maximumLineNewReInsuranceDic: "",
            },
            broker: [{
                reInsuranceBroker: "",
                comissionBroker: "",
            }],
            activitiesAndCountries: [
                {
                    valueActivities: "",
                    idActivities: 0,
                    valueCountries: "",
                    idCountries: 0,
                }
            ],
            catalogActivities: [],
            catalogCountries: [],
            menu2: false,
            showModal: false,
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
        closeModal() {
            this.showModal = false;
        },
        addBroker(){
            if(this.broker.length === 3) return;

            this.broker.push({
                reInsuranceBroker: "",
                comissionBroker: "",
            })
        },
        deleteBroker(index){
            if(this.broker.length === 1){
                this.broker = [{
                    reInsuranceBroker: "",
                    comissionBroker: "",
                }];
                return;
            }

            this.broker.splice(index, 1)
        },
        addSelects(){
            this.activitiesAndCountries.push({
                valueActivities: "",
                idActivities: 0,
                valueCountries: "",
                idCountries: 0,
            })
        },
        deleteSelects(index){
            if(this.activitiesAndCountries.length === 1){
                this.activitiesAndCountries = [{
                    valueActivities: "",
                    idActivities: 0,
                    valueCountries: "",
                    idCountries: 0,
                }];
                return;
            }

            this.activitiesAndCountries.splice(index, 1)
        },
        submit(){
            if(
                this.reinsuranceRegistry.reInsuranceName === "" ||
                this.reinsuranceRegistry.inceptionDateNewReInsuranceDic === "" ||
                this.reinsuranceRegistry.expiryDateNewReInsuranceDic === "" ||
                this.reinsuranceRegistry.comissionSluNewReInsuranceDic === "" ||
                this.reinsuranceRegistry.evergladesRe1Dic === "" ||
                this.reinsuranceRegistry.evergladesRe2Dic === "" ||
                this.reinsuranceRegistry.associated === "" ||
                this.reinsuranceRegistry.maximumLimitIncludingBiNewReInsuranceDic === "" ||
                this.reinsuranceRegistry.maximumLineNewReInsuranceDic === "" ||
                this.activitiesAndCountries[0].valueActivities === "" ||
                this.activitiesAndCountries[0].valueCountries === "" ||
                this.broker[0].brokerContract === "" ||
                this.broker[0].comissionBroker === ""
                ){
                alert("Te falta información por llenar");
                return;
            }

            this.showModal = true;

            this.activitiesAndCountries.map((elem) => {
                elem.idActivities = this.activities.find(val => val.description == elem.valueActivities).id
                elem.idCountries = this.countries.find(val => val.description == elem.valueCountries).id
            })

            const arrayBroker = []

            this.broker.forEach((e) => {
                arrayBroker.push({
                    "broker": e.reInsuranceBroker,
                    "brokerComission": e.comissionBroker
                })
            })

            const restriction = []

            this.activitiesAndCountries.forEach((e) => {
                restriction.push({"activityId": e.idActivities, "countryId": e.idCountries })
            })

            /* this.createReinsurer(
                {
                    "name": this.reinsuranceRegistry.reInsuranceName,
                    "inceptionDate": this.reinsuranceRegistry.inceptionDateNewReInsuranceDic,
                    "expiryDate": this.reinsuranceRegistry.expiryDateNewReInsuranceDic,
                    "comissionSlu": this.reinsuranceRegistry.comissionSluNewReInsuranceDic,
                    "maximumWith": this.reinsuranceRegistry.maximumLimitIncludingBiNewReInsuranceDic,
                    "maximumWithout": this.reinsuranceRegistry.maximumLimitWithoutBiNewReInsuranceDic,
                    "deductions": this.reinsuranceRegistry.deductionsNewReInsuranceDic,
                    "contractType": 2,
                    "restriction": restriction,
                    "broker": arrayBroker,
                    "dic": {
                        "everglades1": this.reinsuranceRegistry.evergladesRe1Dic,
                        "everglades2": this.reinsuranceRegistry.evergladesRe2Dic,
                        "associatedTo": this.reinsuranceRegistry.associated,
                        "maximumLine": this.reinsuranceRegistry.maximumLineNewReInsuranceDic
                    }
                }
            ) */
        }
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
.modal-overly {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 100;
    background: rgba(0, 0, 0, 0.4);
}
.modal {
    width: 25rem;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: #FFFFFF;
    padding: 1rem;
    border-radius: 12px;
    box-shadow: 3px, 3px, rgba(0, 0, 0, 0.4);
    z-index: 101;
}
.title-modal {
    font-family: 'Avenir Next LT Pro';
    font-style: normal;
    font-weight: 700;
    font-size: 26px;
    line-height: 110%;
}
.line {
    width: 100%;
    height: 1px;
    margin-top: 0.5rem;
	margin-bottom: 1rem;
    border: none;
    background-color: #a8bfd9;
}
.text-modal {
    width: 100%;
    height: 6rem;
    box-sizing: border-box;
    border: 1px solid #A8BFD9;
    border-radius: 16px;
    display: flex;
    justify-content: center;
    align-items: center;
    /* text-align: center; */
}
.text-modal div {
    font-family: 'Avenir Next Cyr';
    font-style: normal;
    font-weight: 800;
    font-size: 16px;
    line-height: 110%;
    text-align: center;
    color: #547FA9;
}
.button-modal-direction {
    display: flex;
    justify-content: center;
}
.button-modal {
    background-color: #F59607;
    margin-top: 15px;
    width: 10rem;
    height: 3rem;
    border-radius: 16px;
    font-family: 'Avenir Next Cyr';
    font-style: normal;
    font-weight: 800;
    font-size: 16px;
    line-height: 110%;
    text-align: center;
    color: #fff;
}
</style>