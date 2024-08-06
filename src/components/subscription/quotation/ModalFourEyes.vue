<template>
	<v-dialog v-model="dialogFourEyes" width="600">
		<template v-slot:activator="{ on, attrs }">
			<v-btn 
				v-if="subscriptionStatus < 3"
				rounded 
				large 
				depressed 
				outlined 
				class="btn four-eyes-button" 
				color="#003D6D" 
				v-bind="attrs" v-on="on">
				Four eyes law
			</v-btn>
		</template>
		<v-card id="card-eye" class="pb-3">
			<!-- button close -->
			<v-card-actions class="px-3 pb-3">
				<v-flex text-xs-right>
					<v-btn @click="dialogFourEyes = false" color="orange" dark small absolute fab right>
						<v-icon color="white">mdi-close</v-icon>
					</v-btn>
				</v-flex>
			</v-card-actions>
			<v-card-title class="font-weight-bold text-h5">Four eyes law</v-card-title>
			<v-divider id="divisor"></v-divider>
			<div id="border-blue" class="mb-8">
				<v-card-text class="font-weight-bold text-h6 blue-text">Following the company's policies select the underwriter
					who
					will check the quotation.</v-card-text>
				<v-divider id="divisor"></v-divider>
				<v-autocomplete class="rounded-lg inputSearch mx-6 my-3" filled background-color="#EDF2F8" label="Search"
					prepend-inner-icon="mdi-magnify" :items="underwriters" :item-text="getFullName" item-value="id"
					v-model="selectedValue"></v-autocomplete>
				<v-btn class="d-flex mx-auto px-16 btnRequest" elevation="2" large rounded
					@click="addUnderwriters()">Request</v-btn>
				<v-card-text class="font-weight-bold text-h6 blue-text">This is your review history</v-card-text>
				<v-divider id="divisor"></v-divider>
				<!-- table -->
				<template>
					<v-data-table :headers="headers" :items="underwritersTable" :items-per-page="5" class="elevation-1">
						<template v-slot:item.reviewer_user="{ item }">
							{{ item.reviewer_user.name }}
						</template>
					</v-data-table>
				</template>
			</div>
		</v-card>
	</v-dialog>
</template>
<script>
import { mapActions, mapState, mapGetters } from 'vuex';
export default {
	async beforeMount() {
		this.underwriters = await this.getListUnderwriters();
		this.underwritersTable = await this.getNotificationsFourEyeSuscriptor(
			this.$store.state.subscription_id
		);
	},
	data() {
		return {
			dialogFourEyes: false,
			isValidated: true,
			underwriters: [],
			headers: [
				{
					text: 'Name',
					align: 'start',
					value: 'reviewer_user',
				},
				{
					text: 'Status',
					align: 'start',
					value: 'status',
				},
				{
					text: 'Comments',
					align: 'start',
					value: 'commentary',
				},
			],
			underwritersTable: [],
			selectedValue: null
		};
	},
	computed: {
		...mapState({
			socket: (state) => state.socket.socketClient,
		}),
		...mapGetters([
			'subscriptionStatus'
		])
	},
	methods: {
		...mapActions([
			'getListUnderwriters',
			'getNotificationsFourEyeSuscriptor',
			'createNotificationFourEye',
			'socketReloadNotifications'
		]),
		// print fullname inside v-autocomplete
		getFullName(underwriter) {
			return `${underwriter.name} ${underwriter.lastName}`;
		},
		// send underwriters to request
		async addUnderwriters() {

			const response = await this.createNotificationFourEye({
				subscription_id: this.$store.state.subscription_id,
				reviewer_user_id: this.selectedValue,
				notifying_user_id: this.$store.state.auth.user.id,
				status: 'VALIDATING',
				commentary: '',
			});

			if (response.statusCode == 200) {
				this.underwritersTable = await this.getNotificationsFourEyeSuscriptor(
					this.$store.state.subscription_id
				);
				try {
					this.socket.emit('send_notification', { idUser: this.selectedValue });
				} catch (error) {
					console.log(error);
				}
			}

			this.socketReloadNotifications(this.selectedValue)

			this.dialogFourEyes = false
		},
	},
};
</script>
<style scoped>
.btn {
	width: 200px;
	color: white;
	text-transform: none;
	font-weight: 500;
	height: 40px !important;
	font-size: 15px;
	letter-spacing: normal !important;
}

#card-eye {
	border-radius: 20px;
}

#divisor {
	width: 92%;
	margin: auto;
	background-color: #a8bfd9;
}

#border-blue {
	margin: 20px;
	border: solid 2px #a8bfd9;
	border-radius: 20px;
}

.blue-text {
	color: #547fa9 !important;
}

.inputSearch>>>.v-input__slot::before {
	border-style: none !important;
}

.btnRequest {
	background-color: #003d6d !important;
	color: white;
	font-weight: 800;
}

.transparent-bg {
	background-color: transparent !important;
}
</style>
