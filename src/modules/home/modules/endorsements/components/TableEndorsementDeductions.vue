<template>
    <div class="formatEndorsementHistoryTable">
        <div class="detail-date">
            <div class="table-title-detail table-title-detail--large">
                Detail
            </div>
            <div class="input-col">
                <div class="input-cont">
                <v-menu
                    :close-on-content-click="false"
                    :nudge-right="40"
                    transition="scale-transition"
                    offset-y
                    min-width="auto"
                >
                    <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                        v-model="premiumPaymentDate"
                        label="Premium payment date"
                        readonly
                        disabled
                        v-bind="attrs"
                        v-on="on"
                    ></v-text-field>
                    </template>
                </v-menu>
                </div>
            </div>
            <div class="input-col">
                <div class="input-cont">
                <v-text-field 
                    label="Clause"
                    v-model="clause"
                    disabled
                >
                </v-text-field>
                </div>
            </div>
        </div>

        <div class="container-tables">
            <!-- Tabla Total Premium -->
            <div class="table-container">
                <div class="title1-table">Total Premium</div>
                <div class="container-table-one">
                    <template v-for="item in detailValues">
                        <div :key="item.id" v-if="item.id === 1" class="container-titles">
                            <div class="title2-table radius1">{{ item.name1 }}</div>
                            <div class="title2-table radius2">{{ item.name2 }}</div>
                        </div>
                    </template>
                </div>
                <div class="second-part-table margin-input">
                    <template v-for="item in detailValues">
                        <div :key="item.id" v-if="item.id === 2" class="second-part-table-input1">
                            <div class="title-input">{{ item.damage }}</div>
                        </div>
                        <div :key="item.id" v-if="item.id === 1" class="second-part-table-input2">
                            <div class="text-onInput blue-input">{{ formatCurrency(item.premiumDamage) }}</div>
                            <div class="text-onInput blue-input">{{ formatCurrency(item.premiumDamage2) }}</div>
                        </div>
                    </template>
                </div>
                <div class="second-part-table">
                    <template v-for="item in detailValues">
                        <div :key="item.id" v-if="item.id === 2" class="second-part-table-input1">
                            <div class="title-input">{{ item.bi }}</div>
                        </div>
                        <div :key="item.id" v-if="item.id === 1" class="second-part-table-input2">
                            <div class="text-onInput blue-input">{{ formatCurrency(item.premiumBi) }}</div>
                            <div class="text-onInput blue-input">{{ formatCurrency(item.premiumBi2) }}</div>
                        </div>
                    </template>
                </div>
                <div class="second-part-table">
                    <template v-for="item in detailValues">
                        <div :key="item.id" v-if="item.id === 2" class="second-part-table-input1">
                            <div class="title-input">{{ item.stocks }}</div>
                        </div>
                        <div :key="item.id" v-if="item.id === 1" class="second-part-table-input2">
                            <div class="text-onInput blue-input">{{ formatCurrency(item.premiumStocks) }}</div>
                            <div class="text-onInput blue-input">{{ formatCurrency(item.premiumStocks2) }}</div>
                        </div>
                    </template>
                </div>
                <div class="second-part-table">
                    <template v-for="item in detailValues">
                        <div :key="item.id" v-if="item.id === 2" class="second-part-table-input1">
                            <div class="title-input">{{ item.total }}</div>
                        </div>
                        <div :key="item.id" v-if="item.id === 1" class="second-part-table-input2">
                            <div class="text-onInput">{{ formatCurrency(item.premiumTotal) }}</div>
                            <div class="text-onInput">{{ formatCurrency(item.premiumTotal2) }}</div>
                        </div>
                    </template>
                </div>
            </div>
            <!-- Tabla Premium SLU -->
            <div class="table-container">
                <div class="title1-table">Premium SLU</div>
                <div class="container-table-one">
                    <template v-for="item in detailPremiumSlu">
                        <div :key="item.id" v-if="item.id === 1" class="container-titles">
                            <div class="title2-table radius1">{{ item.name1 }}</div>
                            <div class="title2-table radius2">{{ item.name2 }}</div>
                        </div>
                    </template>
                </div>
                <div class="second-part-table margin-input">
                    <template v-for="item in detailPremiumSlu">
                        <div :key="item.id" v-if="item.id === 1" class="second-part-table-input3">
                            <div class="text-onInput blue-input">{{ formatCurrency(item.premiumDamage) }}</div>
                            <div class="text-onInput blue-input">{{ formatCurrency(item.premiumDamage2) }}</div>
                        </div>
                    </template>
                </div>
                <div class="second-part-table">
                    <template v-for="item in detailPremiumSlu">
                        <div :key="item.id" v-if="item.id === 1" class="second-part-table-input3">
                            <div class="text-onInput blue-input">{{ formatCurrency(item.premiumBi) }}</div>
                            <div class="text-onInput blue-input">{{ formatCurrency(item.premiumBi2) }}</div>
                        </div>
                    </template>
                </div>
                <div class="second-part-table">
                    <template v-for="item in detailPremiumSlu">
                        <div :key="item.id" v-if="item.id === 1" class="second-part-table-input3">
                            <div class="text-onInput blue-input">{{ formatCurrency(item.premiumStocks) }}</div>
                            <div class="text-onInput blue-input">{{ formatCurrency(item.premiumStocks2) }}</div>
                        </div>
                    </template>
                </div>
                <div class="second-part-table">
                    <template v-for="item in detailPremiumSlu">
                        <div :key="item.id" v-if="item.id === 1" class="second-part-table-input3">
                            <div class="text-onInput">{{ formatCurrency(item.premiumTotal) }}</div>
                            <div class="text-onInput">{{ formatCurrency(item.premiumTotal2) }}</div>
                        </div>
                    </template>
                </div>
            </div>
            <!-- Tabla Net premium -->
            <div class="table-container">
                <div class="title1-table">Net Premium</div>
                <div class="container-table-one">
                    <template v-for="item in detailNetPremium">
                        <div :key="item.id" v-if="item.id === 1" class="container-titles">
                            <div class="title2-table radius1">{{ item.name1 }}</div>
                            <div class="title2-table radius2">{{ item.name2 }}</div>
                        </div>
                    </template>
                </div>
                <div class="second-part-table margin-input">
                    <template v-for="item in detailNetPremium">
                        <div :key="item.id" v-if="item.id === 1" class="second-part-table-input2">
                            <div class="text-onInput blue-input">{{ formatCurrency(item.premiumDamage) }}</div>
                            <div class="text-onInput blue-input">{{ formatCurrency(item.premiumDamage2) }}</div>
                        </div>
                    </template>
                </div>
                <div class="second-part-table">
                    <template v-for="item in detailNetPremium">
                        <div :key="item.id" v-if="item.id === 1" class="second-part-table-input2">
                            <div class="text-onInput blue-input">{{ formatCurrency(item.premiumBi) }}</div>
                            <div class="text-onInput blue-input">{{ formatCurrency(item.premiumBi2) }}</div>
                        </div>
                    </template>
                </div>
                <div class="second-part-table">
                    <template v-for="item in detailNetPremium">
                        <div :key="item.id" v-if="item.id === 1" class="second-part-table-input2">
                            <div class="text-onInput blue-input">{{ formatCurrency(item.premiumStocks) }}</div>
                            <div class="text-onInput blue-input">{{ formatCurrency(item.premiumStocks2) }}</div>
                        </div>
                    </template>
                </div>
                <div class="second-part-table">
                    <template v-for="item in detailNetPremium">
                        <div :key="item.id" v-if="item.id === 1" class="second-part-table-input2">
                            <div class="text-onInput">{{ formatCurrency(item.premiumTotal) }}</div>
                            <div class="text-onInput">{{ formatCurrency(item.premiumTotal2) }}</div>
                        </div>
                    </template>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
/* utils */
import { formatCurrency } from '../utils';
import EndorsementService from '../services/endorsement.service';

export default {
    name: "TableEndorsementDeductions",
    components: {},
    props: {
        detailValues: Array,
        detailPremiumSlu: Array,
        detailNetPremium: Array,
        clause: String
    },
    data() {
        return {
            subscriptionId: this.$route.params.id,
            listEndorsement: [],
            premiumPaymentDate: new Date(
                Date.now() + 31536000000 - new Date().getTimezoneOffset() * 60000
            )
                .toISOString()
                .substr(0, 10),
            /* totalPremium: [
                {
                    id: 1,
                    name1: "Original Currency",
                    name2: "USD",
                    premiumDamage: 1000,
                    premiumBi: 2000,
                    premiumStocks: 3000,
                    premiumTotal: 6000,
                    premiumDamage2: 5000,
                    premiumBi2: 6000,
                    premiumStocks2: 7000,
                    premiumTotal2: 18000
                },
                {
                    id: 2,
                    damage: "Damage",
                    bi: "Bi",
                    stocks: "Stocks",
                    total: "total"
                },
            ],
            premiumSlu: [
                {
                    id: 1,
                    name1: "Original Currency",
                    name2: "USD",
                    premiumDamage: 2000,
                    premiumBi: 5500,
                    premiumStocks: 1000,
                    premiumTotal: 8500,
                    premiumDamage2: 1500,
                    premiumBi2: 2500,
                    premiumStocks2: 3000,
                    premiumTotal2: 7000
                },
                {
                    id: 2,
                    damage: "Damage",
                    bi: "Bi",
                    stocks: "Stocks",
                    total: "total"
                },
            ],
            netPremium: [
                {
                    id: 1,
                    name1: "Original Currency",
                    name2: "USD",
                    premiumDamage: 3000,
                    premiumBi: 3500,
                    premiumStocks: 3200,
                    premiumTotal: 9700,
                    premiumDamage2: 1800,
                    premiumBi2: 2700,
                    premiumStocks2: 3200,
                    premiumTotal2: 7700
                },
                {
                    id: 2,
                    damage: "Damage",
                    bi: "Bi",
                    stocks: "Stocks",
                    total: "total"
                },
            ], */
        }
    },
    methods: {
        formatCurrency(amount) {
            return formatCurrency(amount);
        },
    },
    async mounted(){
        this.listEndorsement = await EndorsementService.getEndorsementsBySubscriptionId(this.subscriptionId)
    }
}

</script>
<style lang="less" scoped>
.formatEndorsementHistoryTable {
    width: 100%;
    height: auto;
    border-radius: 15px;
    background: white;
    box-shadow: 8px 8px 12px rgba(10, 63, 102, 0.15);
    margin-top: 28px;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-content: center;
    padding: 0 20px;
    padding-bottom: 2rem;
}
.detail-date {
    width: 91%;
    height: auto;
    margin: auto;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    padding: 50px 0 20px;
}
.table-title-detail {
    &--large {
        width: 100%;
    }
    width: 100%;
    font-weight: 800;
    font-size: 16px;
    line-height: 110%;
    height: 50px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 0px 5px;
}
.input-col {
    width: 20%;
    display: block;
    margin-right: 30px;
}
.input-cont {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    align-content: center;
    margin: 5px 0;
}
.container-tables {
    width: 100%;
    display: flex;
    justify-content: space-between;
}
.table-container {
    width: 33%;
}
.title1-table {
    font-weight: 800;
    font-size: 20px;
    text-align: center;
    margin-bottom: 2rem;
}
.container-table-one {
    display: flex;
    flex-direction: row-reverse;
    justify-content: space-between;
}
.container-titles {
    width: 83%;
    display: flex;
    justify-content: space-between;
}
.title2-table {
    width: 49.5%;
    height: 3.5rem;
    text-align: center;
    font-size: 16px;
    font-weight: 800;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #547fa9;
    color: white;
}
.radius1 {
    border-top-left-radius: 6.5px;
    border-bottom-left-radius: 6.5px;
}
.radius2 {
    border-top-right-radius: 6.5px;
    border-bottom-right-radius: 6.5px;
}
.second-part-table {
    width: 100%;
    display: flex;
    flex-direction: row-reverse;
    justify-content: space-between;
}
.margin-input {
    margin-top: 2rem;
}
.second-part-table-input1 {
    width: 17%;
    display: flex;
    align-items: center;
}
.second-part-table-input2 {
    width: 83%;
    display: flex;
}
.second-part-table-input3 {
    width: 83%;
    display: flex;
}
.title-input {
    font-weight: 800;
    font-size: 14px;
}
.text-onInput {
    width: 50%;
    height: 3rem;
    display: flex;
    align-items: center;
    padding: 0 10px;
}
.blue-input {
    background-color: #dce5fc;
}
</style>