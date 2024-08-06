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

        <div class="table-container input-row justify-center">
            <div class="title-col">
                <div class="table-title-space"></div>
                <div class="col-subtitle">Damage</div>
                <div class="col-subtitle">Bi</div>
                <div class="col-subtitle">Stocks</div>
                <div class="col-subtitle">Total</div>
            </div>

            <template v-for="item in detailValues">
                <div :key="item.id" v-if="item.id === 1" class="table-col">
                <div>
                    <div class="table-title">{{ item.name }}</div>
                    <div class="input-row">
                        <div class="inner-col wide-col">
                            <div class="table-input blue-input">
                            {{ formatCurrency(item.premiumDamage) }}
                            </div>
                            <div class="table-input blue-input">
                            {{ formatCurrency(item.premiumBi) }}
                            </div>
                            <div class="table-input blue-input">
                            {{ formatCurrency(item.premiumStocks) }}
                            </div>
                            <div class="table-input">
                            {{ formatCurrency(item.premiumTotal) }}
                            </div>
                        </div>
                    </div>
                </div>
                </div>
            </template>

            <template v-for="item in detailValues">
                <div v-if="item.id === 2" :key="item.id" class="table-col">
                    <div>
                        <div class="table-title">{{ item.name }}</div>
                        <div class="input-row">
                            <div class="inner-col wide-col">
                                <div class="table-input blue-input">
                                {{ formatCurrency(item.premiumDamage) }}
                                </div>
                                <div class="table-input blue-input">
                                {{ formatCurrency(item.premiumBi) }}
                                </div>
                                <div class="table-input blue-input">
                                {{ formatCurrency(item.premiumStocks) }}
                                </div>
                                <div class="table-input">
                                {{ formatCurrency(item.premiumTotal) }}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </template>
        </div>
    </div>
</template>
<script>
/* utils */
import { formatCurrency } from '../utils';
import EndorsementService from '../services/endorsement.service';

export default {
    name: "EndorsementHistoryTable",
    components: {},
    props: {
        detailValues: Array,
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
    .table-container {
        margin-top: 30px;
    }
    .input-row {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        align-content: center;
        align-items: flex-start;
        justify-content: flex-start;
    }
    .title-col {
        width: 10%;
    }
    .table-title-space {
        height: 54px;
    }
    .col-subtitle {
        min-height: 40px;
        font-weight: 800;
        display: flex;
        align-items: center;
    }
    .table-col {
        width: 40%;

        .inner-col {
            width: 50%;
        }
    }
    .table-title {
        height: 50px;
        color: white;
        font-weight: 800;
        background-color: #547fa9;
        border-radius: 6px;
        margin: 2px;
        font-size: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .wide-col {
        width: 100% !important;
    }
    .table-input {
        min-height: 40px;
        padding: 0 10px;
        display: flex;
        align-items: center;
    }

    .blue-input {
        background-color: #dce5fc;
    }
</style>