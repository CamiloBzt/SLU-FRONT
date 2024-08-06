<template>
  <div>
		<Table 
			:dataTable="walletList" 
			@showModal= "({ref , walletId})=> showCommentsModal(ref, walletId)"
		/>
		<ShowMoreButton @click="nextPage" />
		<CommentsModal 
			:open="modalOpened" 
			@closeModal="closeCommentsModal()"
			@showSuccessModal="showCommentsSuccessModal"
			:reference="reference"
			:wallet="wallet"
		/>
		<CommentsSuccessModal 
			:open="modalSuccessOpened" 
			@closeModal="closeCommentsSuccessModal()"
		/>
	</div>
</template>
<script>
// Components
import ShowMoreButton from "@/components/subscription/ShowMoreButton.vue";
import Table from './components/Table.vue'
import CommentsModal from './components/CommentsModal'
import CommentsSuccessModal from './components/CommentsSuccessModal'
// Services
import WalletService from './services/wallet.service'

export default {
	name: 'WalletList',
	data: () => {
		return {
			limit:10,
			offset:0,
			walletList: [],
			modalOpened: false,
			modalSuccessOpened: false,
			reference:null,
			wallet: null
		}
	},
	components: {
		Table,
		ShowMoreButton,
		CommentsModal,
		CommentsSuccessModal
	},
	async beforeMount() {
	   await this.getWallets()
	},
	methods: {
		async getWallets (){
		   this.walletList = await WalletService.getWallets(this.limit, this.offset)	
		},
		showCommentsModal ({ref, walletId}) {
			this.wallet = walletId
			this.reference = ref
			this.modalOpened = true
		},
		closeCommentsModal () {
			this.modalOpened = false
		},
		showCommentsSuccessModal () {
			this.closeCommentsModal()
			this.modalSuccessOpened = true
		},
		closeCommentsSuccessModal () {
			this.modalSuccessOpened = false
		},
		async nextPage(){
			this.offset += 10
			const walletsNextPage = await this.getWallets()
			this.walletList = [...walletList, ...walletsNextPage]  
		}
	}
}
</script>