<template>
  <div class="comments-success-modal" v-if="open">
		<div class="modal">
			<div class="modal__close-btn">
				<v-btn @click="emitCloseModal" icon depressed>
					<img src="@/assets/img/icons/close.png" />
				</v-btn>
			</div>
			<div class="modal__title">
				Comments
			</div>
			<div class="modal__divider modal__divider--margin-top" />
			<div class="modal__message">
				Your comments has been sent successfully
			</div>
		</div>
		<div class="modal-background" @click="emitCloseModal" />
	</div>
</template>
<script>
export default {
	name: 'CommentsSuccessModal',
	props: {
		open: {
			type: Boolean,
			default: false
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
.comments-success-modal {
	width: 100%;
	height: 100vh;
	position: fixed;
	left: 0;
	top: 0;
	z-index: 6000;
	display: flex;
	justify-content: center;
	align-items: center;

	.modal {
		width: 613px;
		height: 196px;
		background: white;
		border-radius: 12px;
		padding: 10px 32px;
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
			font-weight: 700;
			font-size: 26px;
		}
		&__divider {
			width: 100%;
			height: 1px;
			background: #A8BFD9;
			&--margin-top {
				margin-top: 10px;
			}
		}
		&__message {
			width: 100%;
			height: 86px;
			font-weight: 800;
			font-size: 16px;
			line-height: 110%;
			color: #547FA9;
			border: 1px solid #A8BFD9;
			display: flex;
			justify-content: center;
			align-items: center;
			border-radius: 16px;
			margin-top: 15px;
		}
	}
	.modal-background {
		width: 100%;
		height: 100%;
		background: black;
		opacity: 0.7;
		position: absolute;
		z-index: 0;
	}
}
</style>