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
import claims from './service/get-susbcription-cont.service'
import { machine } from "os";
export default{
	name:'ShowMoreButton',
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
			pages: [1,2,3,4],
			totalAccounnts: 0,
			totalPages: 0
		}
	},
	methods:{
		...mapActions([
			"getClaimsHistoryList",
		]),
		seeActual(page){
			const limit = this.$store.state.claims.table.limit;
			const offset = this.$store.state.claims.table.offset;
			const query = this.$store.state.claims.table.query;
			const filter = this.$store.state.claims.table.filter;
			const filterSearch = this.$store.state.claims.table.filterSearch;

			this.pagination.limit = limit;
			this.pagination.offset = page * 10;
			this.pagination.query = query;
			this.pagination.filter = filter;
			this.pagination.filterSearch = filterSearch;

			this.getClaimsHistoryList(this.pagination).then(()=>{
				var table = document.querySelector('.TableContentInner');
				// table.scrollTop = table.scrollHeight - table.clientHeight;
			});
		},
	},
	async mounted(){
		this.totalAccounnts = await claims()
		this.totalPages = Math.floor(this.totalAccounnts/ 10)
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