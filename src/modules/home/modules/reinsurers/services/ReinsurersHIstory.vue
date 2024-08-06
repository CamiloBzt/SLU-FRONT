<template>
    <div>
        <hr class="line">
        <div class="create-reinsurers">
			<div class="catalog">
				<div class="catalog-select">
					<v-autocomplete label="Registration reinsurers" v-model="valueReinsurers" :items="catalogReinsurers" 
					item-value="id" item-text="type"/>
				</div>

				<div class="button-cont">
					<v-btn rounded large color="#003D6D" class="btn" @click="createReinsurers()">
						Create reinsurer
					</v-btn>
				</div>
			</div>
		</div>
		<div class="cards-reinsurer" v-if="!disabledCards">
			<v-card
				v-for="reinsurer in cards"
				:key = "reinsurer.id"
				width="24%"
				height="12.5rem"
				class="margin_cards"
			>
				<v-list-item three-line>
					<v-list-item-content>
						<div class="text-wrap text-reinsurer">
							Reinsurer:
						</div>
						<div class="text-wrap text-reinsurer">
							{{ reinsurer.name }}
						</div>
						<v-list-item-subtitle>{{ reinsurer.inceptionDate }}</v-list-item-subtitle>
					</v-list-item-content>
				</v-list-item>
				<v-card-actions>
					<router-link class="direction-button" :to="`/reinsurers/${reinsurer.id}`" >
						<v-btn
							class="color-reinsurer mx-auto"
							width="12rem"
							outlined
							rounded
							text
							color="white"
						>
							See reinsurer
						</v-btn>
					</router-link>
				</v-card-actions>
			</v-card>
		</div>
		<NewContract v-if="reinsurersType === 'New contract'" />
		<NewReInsuranceDic v-if="reinsurersType === 'New re-insurance DIC'" />
		<NewDirectReInsurance v-if="reinsurersType === 'New direct re-insurance'" />
    </div>
</template>
<script>
import NewContract from './components/NewContract.vue';
import NewReInsuranceDic from './components/NewReInsuranceDic.vue';
import NewDirectReInsurance from './components/NewDirectReInsurance.vue';
import { mapActions, mapState } from 'vuex';

export default {
    name: "ReinsurersHIstory",
    components: {
		NewContract,
		NewReInsuranceDic,
		NewDirectReInsurance,
	},
    data() {
        return {
			catalogReinsurers: ["New contract", "New re-insurance DIC", "New direct re-insurance"],
			valueReinsurers: '',
			reinsurersType: '',
			cards: [],
			disabledCards: false,
        };
    },
	computed:{
		...mapState({
			list: (state) => state.reinsurers,
		}),
	},
    methods: {
		...mapActions(['getAllReinsurers']),
		createReinsurers(){
			if (this.valueReinsurers != '') {
				this.reinsurersType = this.valueReinsurers
				this.disabledCards = true
			}
		},
	},
    async beforeMount(){
		await this.getAllReinsurers()
		this.cards = this.list
		console.log("cards =>", this.cards)
	},
};
</script>
<style lang="less" scoped>
.line{
    width: 100%;
    height: 1px;
    margin-top: 0.5rem;
	margin-bottom: 1rem;
    border: none;
    background-color: #a8bfd9;
}
.create-reinsurers {
	display: flex;
	justify-content: flex-start;
	align-content: center;
	align-items: center;
	flex-wrap: wrap;

	.catalog {
		width: 100%;
		display: flex;

		.catalog-select {
			width: 25%;
		}
	}

	.button-cont {
		margin-left: 20px;
		margin-top: 20;
		display: flex;
		justify-content: flex-end;
		align-items: center;

		.btn {
			color: white;
			width: 200px;
			height: 35px;
			font-size: 15px;
			font-weight: 500;
			letter-spacing: normal;
			text-transform: capitalize;
		}
	}
}
.cards-reinsurer{
	width: 100%;
	display: flex;
	flex-wrap: wrap;
	gap: 15px;
}
.color-reinsurer {
	background-color: #003D6D;
}
.text-reinsurer {
	font-family: 'Avenir Next LT Pro';
	font-style: normal;
	font-weight: 400;
	font-size: 20px;
	line-height: 110%;
	margin-bottom: 1rem;
}
.direction-button {
	width: 100%;
	display: flex;
	justify-content: center;
}
</style>