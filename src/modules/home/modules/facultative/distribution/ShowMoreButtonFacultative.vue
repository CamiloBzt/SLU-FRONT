<template>
	<div class="text-center">
		<v-container>
			<v-row justify="center">
				<v-col cols="15" sm="9">
					<v-pagination
						v-model="page"
						class="my-4"
						:length="totalPages"
						total-visible="8"
						@input="seeActual(page)"
					>
					</v-pagination>
				</v-col>
			</v-row>
		</v-container>
  	</div>
</template>
<script>
import { mapActions} from "vuex";
import subscription from "@/components/subscription/service/get-susbcription-cont-bc.service";
// import subscription from './service/get-susbcription-cont.service'
export default{
	name:'ShowMoreButtonFacultative',
	data(){
		return {
			page: 1,
			pagination:{
				limit : 10,
				offset: 0,
				query: '',
				filter: '',
			},
			numberPage: 5,
			totalAccounnts: 0,
			totalPages: 0
		}
	},
	methods:{
		...mapActions([
			"getSubscriptionList",
		]),
		seeActual(page){
			const limit = this.$store.state.subscription.table.limit;
			const offset = this.$store.state.subscription.table.offset;
			const query = this.$store.state.subscription.table.query;
			const query3 = '7';
			const filter = this.$store.state.subscription.table.filter;
			const filterSearch = this.$store.state.subscription.table.filterSearch;
			const filterSearch3 = 's.status_id';

			this.pagination.limit = limit;
			this.pagination.offset = page * 10;
			this.pagination.query = query;
			this.pagination.query3 = query3;
			this.pagination.filter = filter;
			this.pagination.filterSearch = filterSearch;
			this.pagination.filterSearch3 = filterSearch3;

			this.getSubscriptionList(this.pagination).then(()=>{
				var table = document.querySelector('.TableContentInner');
				table.scrollTop = table.scrollHeight - table.clientHeight;
			});
		},
	},
	async mounted(){
		this.totalAccounnts = await subscription()

		this.totalPages = Math.ceil(this.totalAccounnts/ 10) - 1
	}
}
</script>
<style lang="less" scoped>
.ShowMoreCont{
	margin-top: 1rem;
	width: 100%;
	display: flex;
	justify-content: center;
	gap: 1rem;
	.loadMoreButton{
		width: 2rem;
		height: 40px;
		color: white !important;
		text-transform: none;

		letter-spacing: normal !important;
		font-size: 15px !important;;
		font-weight: 500 !important;;
	}
}

@media(max-width: 600px)
{
.ShowMoreCont{
	.loadMoreButton{
		width: 90%;
	}
}
}
</style>