<template>
  <div class="accounts-and-instalments-modal" v-if="open">
		<div class="modal">
			<div class="modal__title">
				[Ref Number {{account}}] Notes
			</div>
			<div class="modal__close-btn">
				<v-btn @click="emitCloseModal" icon depressed>
					<img src="@/assets/img/icons/close.png" />
				</v-btn>
			</div>
			<div class="modal__divider modal__divider--margin-top" />
			<div class="modal__notes scrollable">
				<div v-for="comment in history" :key="comment.id" class="note-container scroll-st">
					<div class="note-container__title">
						{{comment.user}} - {{comment.date}}
					</div>
					<div class="note-container__content">
						{{comment.comment}}
					</div>
				</div>
			</div>
		</div>
		<div class="modal-background" @click="emitCloseModal" />
	</div>
</template>
<script>
export default {
	name: 'CommentsHistory',
	data: () => {
		return {
		}
	},
	props: {
		open: {
			type: Boolean,
			default: false
		},
		history: {
			required: false
		},
		account: {
			type: String
		}
	},
	methods: {
		emitCloseModal () {
			this.$emit('closeModal')
		}
	}
}
</script>
<style lang="less" scoped>
.accounts-and-instalments-modal {
	width: 100%;
	height: 100vh;
	position: fixed;
	left: 0;
	top: 0;
	z-index: 6000;
	display: flex;
	justify-content: center;
	align-items: center;
	.modal-background {
		width: 100%;
		height: 100%;
		background: black;
		opacity: 0.7;
		position: absolute;
		z-index: 0;
	}
	.modal {
		width: 913px;
		height: 459px;
		background: white;
		border-radius: 12px;
		padding: 20px 32px;
		position: absolute;
		z-index: 1;
		&__close-btn {
			width: 30px;
			height: 30px;
			position: absolute;
			right: -10px;
			top: -10px;
			display: flex;
			justify-content: center;
			align-items: center;
		}
		&__title {
			font-weight:600;
			font-size: 18px;
			height: 30px;
		}
		&__notes {
			width: 100%;
			height: 390px;
			display: flex;
			justify-content: flex-start;
			align-items: flex-start;
			align-content: flex-start;
			flex-wrap: wrap;
			gap: 10px;
			margin-top: 10px;
			overflow-y: auto;
    	overflow-x: hidden;
    	scroll-behavior: smooth;
			padding-right: 5px;
			.note-container {
				width: 100%;
				display: flex;
				justify-content: flex-start;
				align-items: flex-start;
				align-content: flex-start;
				flex-wrap: wrap;
				&__title {
					width: 100%;
					height: auto;
					font-size: 16px;
					font-weight: 600;
					margin-top: 5px;
				}
				&__content {
					width: 100%;
					height: auto;
					border-bottom: solid 1px #d2deed;
					padding-bottom: 5px;
					margin-top: 5px;
				}
			}
		}
	}
}
</style>