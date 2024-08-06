<template>
	<div>
		<div class="create-endorsement">
			<div class="catalog">
				<div class="catalog-select">
					<v-autocomplete label="Movement Type" v-model="movementsValue" :items="catalogEndorsements"
						item-value="id" item-text="type" :disabled="disabledSelect" />
				</div>

				<div class="button-cont">
					<v-btn rounded large color="#003D6D" class="btn" @click="createEndorsement()"
						:disabled="disabledSelect">
						Create endorsement
					</v-btn>
				</div>
			</div>
		</div>

		<div class="cards_endorsement" v-if="!endorsementHistory  && !onCreatrEndorsement">
			<v-card
				v-for="(endorsement, index) in listEndorsement"
				:key = "endorsement.id"
				width="24%"
				height="12.5rem"
				class="margin_cards"
			>
				<v-list-item three-line>
				<v-list-item-content>
					<div class="text-wrap text-h6">
						<!-- Endorsement [{{ endorsement.EndorsementType.type === "Increase insurable value/ inclusion risk" ? 1 
										: endorsement.EndorsementType.type === "Reduction of insurable value/ Risk Exclusion" ? 2 
										: endorsement.EndorsementType.type === "Extension" ? 3
										: endorsement.EndorsementType.type === "Deductions Change" ? 4
										: endorsement.EndorsementType.type === "Movement without premium" ? 5
										: endorsement.EndorsementType.type === "Change of share" ? 6
										: endorsement.EndorsementType.type === "Rate Change" ? 7
										: endorsement.EndorsementType.type === "Change of period (Inception or Expiry date)" ? 8
										: endorsement.EndorsementType.type === "construction work stoppage (aplica solo para ingeniería CAR y EAR)" ? 9
										: endorsement.EndorsementType.type === "Extension GPW" ? 10
										: endorsement.EndorsementType.type === "change of technical conditions" ? 11
										: endorsement.EndorsementType.type === "Canelacion de poliza ( a prorroga y/o corto plazo)" ? 12
										: endorsement.EndorsementType.type === "PMD Adjustment" ? 13
										: endorsement.EndorsementType.type === "BI Adjustment" ? 14
										: endorsement.EndorsementType.type === "Internal Adjustments" ? 15
										: 0
									}}]:  -->
						Endorsement [{{ index + 1 }}]: 
						{{ endorsement.EndorsementType.type }}
					</div>
					<v-list-item-subtitle>{{ endorsement.effective_date | formattedDate }}</v-list-item-subtitle>
				</v-list-item-content>
				</v-list-item>
				<v-card-actions>
				<v-btn
					class="color_endorsement mx-auto"
					width="12rem"
					outlined
					rounded
					text
					color="white"
					@click="backHistoryTableToId(endorsement.id)"
				>
					See endorsement
				</v-btn>
				</v-card-actions>
			</v-card>
		</div>

		<div v-if="endorsementHistory">
			<div class="endorsement-title">{{ listEndorsement.find(element => element.id === idDinamyc).EndorsementType.type }}</div>
			<div class="editAccount" v-if="accountComplete.reference">
				{{ accountComplete.reference }}
			</div>
		</div>
		
		<!-- Vista para el endoso 1, 2 y 3 -->
		<div v-if="endorsementHistory">
			<div 
				v-if="listEndorsement.find(element => element.id === idDinamyc).EndorsementType.type === 'Increase insurable value/ inclusion risk' ||
					listEndorsement.find(element => element.id === idDinamyc).EndorsementType.type === 'Reduction of insurable value/ Risk Exclusion' ||
					listEndorsement.find(element => element.id === idDinamyc).EndorsementType.type === 'Extension' ||
          			listEndorsement.find(element => element.id === idDinamyc).EndorsementType.type === 'change of technical conditions'"
			>
				<EndorsementHistoryTableEngineering :clause="value" :detailValues="totalPremiumHistoryTable"/>
				<AdmittedPremiumTableEngineering :detailValues="totalPremium"/>
			</div>
		</div>

		<!-- Vista para el endoso 4 "Deductions Change" -->
		<div v-if="endorsementHistory">
			<div v-if="listEndorsement.find(element => element.id === idDinamyc).EndorsementType.type === 'Deductions Change'">
				<TableEndorsementDeductionsEngineeringVue
				:clause="clause"
				:detailValues="detailValues"
				:detailPremiumSlu="premiumSlu"
				:detailNetPremium="netPremium"
				/>
			</div>
		</div>

		<div v-if="endorsementHistory">
			<div class="formatEndorsementHistoryTable" v-if="listEndorsement.find(element => element.id === idDinamyc).EndorsementType.type !== 'Movement without premium'">
				<div class="inner-title">Endorsement Report</div>
				<div
					class="files-submit flex justify-content-start align-items-start align-content-start"
					v-if="endorsementHistory"
				>
					<AppFile
					v-for="(item, clave) in files"
					:key="clave"
					:fileId="item.fileId"
					:fileName="item.fileName"
					:fileDownloadLink="item.fileDownloadLink"
					:loaded="item.loaded"
					:error="item.error"
					:errorMessage="item.errorMessage"
					:loading="item.loading"
					:fileType="item.fileType"
					:fileTypeMessage="item.fileTypeMessage"
					@removeFileById="removeFileById($event)"
					@errors="errors($event)"
					@loading="loadingFile($event)"
					@loadFile="updateFile($event)"
					/>
				</div>
			</div>
		</div>

		<!-- Vista para el endoso 5 "Movement without premium" -->
		<div v-if="endorsementHistory">
			<div v-if="listEndorsement.find(element => element.id === idDinamyc).EndorsementType.type === 'Movement without premium'">
				<TableEndorsementMovement
					:description="description"
					:effectiveDate="effectiveDate"
					:endDate="endDate"
					:admittedPremiumEndorsement5="admittedPremiumEndorsement5"
				/>
			</div>
		</div>

		<EndorsementDocuments
      	:idEndorsement="idEndorsementDinamic"
      	:endorsementDocuments="endorsementDocuments"
      	:reloadFiles="reloadFiles"
      	v-if="endorsementHistory"
      	:key="endorsementDocuments"
    />

		<!-- Boton return para la vista de endosos creados -->
		<div
    		v-if="endorsementHistory"
        	class="stepper-btn mb-7 d-flex justify-end align-center"
      		>
        	<v-btn rounded large text class="blue-btn mt" @click="ReturnFromEndorsement()">
          	Return
        	</v-btn>
      	</div>

		<div v-if="showEndorsement" class="ditrtibution-container mt-5">
			<InclusionRisk
				v-if="endorsementType == 1"
				:backToCreateEndorsement="backToCreateEndorsement"
				:accountComplete="accountComplete"
				:changeDateEndorsement="changeDateEndorsement"
        		:dateSaved="dateSaved"
        		:showInfoEndorsement="showInfoEndorsement"
       	 		:key="reloadEndorsementData"
			/>
			<ExclusionRisk
				v-if="endorsementType == 2"
				:backToCreateEndorsement="backToCreateEndorsement"
				:insurableRisk="insurableRisk"
				:accountComplete="accountComplete"
				:changeDateEndorsement="changeDateEndorsement"
        		:dateSaved="dateSaved"
        		:showInfoEndorsement="showInfoEndorsement"
       	 		:key="reloadEndorsementData"
			/>
			<Extension
				v-if="endorsementType == 3"
				:backToCreateEndorsement="backToCreateEndorsement"
				:accountComplete="accountComplete"
				:changeDateEndorsement="changeDateEndorsement"
        		:dateSaved="dateSaved"
        		:showInfoEndorsement="showInfoEndorsement"
       	 		:key="reloadEndorsementData"
			/>
			<DeductionsChange
				v-if="endorsementType == 4"
				:backToCreateEndorsement="backToCreateEndorsement"
				:accountComplete="accountComplete"
				:changeDateEndorsement="changeDateEndorsement"
        		:dateSaved="dateSaved"
        		:showInfoEndorsement="showInfoEndorsement"
       	 		:key="reloadEndorsementData"
			/>
			<!-- <DeductionsChangeView v-if="endorsementType == 4"/> -->
			<MovementWithoutPremium
				v-if="endorsementType == 5"
				:backToCreateEndorsement="backToCreateEndorsement"
				:accountComplete="accountComplete"
				:changeDateEndorsement="changeDateEndorsement"
        		:dateSaved="dateSaved"
        		:showInfoEndorsement="showInfoEndorsement"
       	 		:key="reloadEndorsementData"
			/>
			<ChangeOfShare
				v-if="endorsementType == 6"
				:backToCreateEndorsement="backToCreateEndorsement"
				:accountComplete="accountComplete"
				:changeDateEndorsement="changeDateEndorsement"
        		:dateSaved="dateSaved"
        		:showInfoEndorsement="showInfoEndorsement"
       	 		:key="reloadEndorsementData"
			/>
			<ChangeOfPeriod
				v-if="endorsementType == 8"
				:backToCreateEndorsement="backToCreateEndorsement"
				:accountComplete="accountComplete"
				:changeDateEndorsement="changeDateEndorsement"
        		:dateSaved="dateSaved"
        		:showInfoEndorsement="showInfoEndorsement"
       	 		:key="reloadEndorsementData"
			/>
			<ConstructionWorkStoppage
				:backToCreateEndorsement="backToCreateEndorsement"
				v-if="endorsementType == 9"
				:accountComplete="accountComplete"
				:changeDateEndorsement="changeDateEndorsement"
        		:dateSaved="dateSaved"
        		:showInfoEndorsement="showInfoEndorsement"
       	 		:key="reloadEndorsementData"
			/>
			<ExtensionGPW
				v-if="endorsementType == 10"
				:backToCreateEndorsement="backToCreateEndorsement"
				:accountComplete="accountComplete"
				:changeDateEndorsement="changeDateEndorsement"
        		:dateSaved="dateSaved"
        		:showInfoEndorsement="showInfoEndorsement"
       	 		:key="reloadEndorsementData"
				:selectedEndorsementId="selectedEndorsementId"
			/>
			<ChangeOfTechnicalConditions
				v-if="endorsementType == 11"
				:backToCreateEndorsement="backToCreateEndorsement"
				:accountComplete="accountComplete"
				:changeDateEndorsement="changeDateEndorsement"
        		:dateSaved="dateSaved"
        		:showInfoEndorsement="showInfoEndorsement"
       	 		:key="reloadEndorsementData"
			/>
			<PmdAdjustment
				v-if="endorsementType == 13"
				:backToCreateEndorsement="backToCreateEndorsement"
				:accountComplete="accountComplete"
				:changeDateEndorsement="changeDateEndorsement"
        		:dateSaved="dateSaved"
        		:showInfoEndorsement="showInfoEndorsement"
       	 		:key="reloadEndorsementData"
			/>
			
		</div>

	</div>
</template>

<script>
import router from '../../../../../router';
import BarNavGeneral from '@/components/BarNavGeneral';
import AppCloseAccount from '@/application/components/AppCloseAccount';
import InclusionRisk from './components/InclusionRisk';
import ExclusionRisk from './components/ExclusionRisk';
import Extension from './components/Extension';
import ExtensionGPW from './components/ExtensionGPW';
import DeductionsChange from './components/DeductionsChange';
import MovementWithoutPremium from './components/MovementWithoutPremium.vue';
import ChangeOfShare from './components/ChangeOfShare.vue';
import ChangeOfPeriod from './components/ChangeOfPeriod.vue';
import DeductionsChangeView from './modules/deductions-change/detail/DetailView.vue'
import ConstructionWorkStoppage from './components/ConstructionWorkStoppage.vue';
import PmdAdjustment from './components/PmdAdjustment.vue';
import EndorsementDocuments from '../components/EndorsementDocuments.vue';
import EndorsementHistoryTableEngineering from '../components/EndorsementHistoryTableEngineering.vue';
import AdmittedPremiumTableEngineering from '../components/AdmittedPremiumTableEngineering.vue';
import AppFile from "../components/AppFile.vue"
import TableEndorsementMovement from '../components/TableEndorsementMovement.vue';
import ChangeOfTechnicalConditions from './components/ChangeOfTechnicalConditions.vue';
import TableEndorsementDeductionsEngineeringVue from '../components/TableEndorsementDeductionsEngineering.vue';
// Services
import { BarNavData } from './services/mock-bar-nav.service.js';
import { GetCloseAccount } from './services/mock-get-close-account.service';
import AccountCompleteService from '@/modules/home/services/account-complete.service';
import EndorsementService from '../services/endorsement.service';
import moment from "moment";
import { mapActions } from 'vuex'

export default {
	name: 'EndorsementsView',
	components: {
		AppCloseAccount,
		BarNavGeneral,
		InclusionRisk,
		ExclusionRisk,
		Extension,
		ExtensionGPW,
		DeductionsChange,
		MovementWithoutPremium,
		ChangeOfShare,
		ChangeOfPeriod,
    	DeductionsChangeView,
		ConstructionWorkStoppage,
		PmdAdjustment,
		EndorsementDocuments,
		EndorsementHistoryTableEngineering,
		AdmittedPremiumTableEngineering,
		AppFile,
		ChangeOfTechnicalConditions,
		TableEndorsementMovement,
		TableEndorsementDeductionsEngineeringVue,
	},
	props: {
		type: { type: String, default: "Inclusion Risk" },
		// backToCreateEndorsement: {
		// type: Function,
		// },
		// accountComplete: { type: Object },
	},
	data() {
		return {
			selectedEndorsementId: 0,
			onCreatrEndorsement: false,
			idEndorsementDinamic: null,
			value: '',
			effectiveDate: "11/11/23",
			endDate: "11/11/24",
			admittedPremiumEndorsement5: "$10,900",
			description: "Este es un gran ejemplo para hacer pruebas",
			clause: "",
      		idDinamyc: 0,
			dateSaved: "",
      		showInfoEndorsement: false,
      		reloadEndorsementData: 0,
			accountComplete: {},
			catalogEndorsements: [],
			movementsValue: '',
			disabledSelect: false,
			showEndorsement: false,
			loading: false,
			endorsements: [],
			endorsementType: '',
			BarNavData: [],
			CloseAccountData: [],
			insurableRisk: {},
			subscriptionId: this.$route.params.id,
			listEndorsement: [],
			informationCard: "",
			titleCard: "",
			formatEndorsement5: 0,
			endorsementHistory: false,
			endorsementDocuments: [],
			totalPremium: [
				{
					id: 1,
					name: "Original Currency",
					premiumAllRisk: 0,
					premiumAlop: 0,
					premiumTotal: 0,
					sluAllRisk: 0,
					sluAlop: 0,
					sluTotal:0,
				},
				{
					id: 2,
					name: "USD",
					premiumAllRisk: 0,
					premiumAlop: 0,
					sluAllRisk: 0,
					sluAlop: 0,
				},
			],
			totalPremiumHistoryTable: [
				{
					id: 1,
					name: "Original Currency",
					premiumAllRisk: 0,
					premiumAlop: 0,
					premiumTotal: 0,
					sluAllRisk: 0,
					sluAlop: 0,
					sluTotal: 0,
				},
				{
					id: 2,
					name: "USD",
					premiumAllRisk: 0,
					premiumAlop: 0,
					premiumTotal:0,
					sluAllRisk: 0,
					sluAlop: 0,
				},
			],
			files: [
				{
				fileId: 1,
				fileName: "Report Inclusion Risk",
				fileDownloadLink: "",
				loaded: false,
				error: false,
				errorMessage: "Could not load the file",
				loading: true,
				fileType: "xlsx",
				fileTypeMessage: "Download",
				},
			],
			detailValues: [
				{
					id: 1,
                    name1: "Original Currency",
                    name2: "USD",
                    premiumAllRisk: 0,
                    premiumAlop: 0,
                    premiumTotal: 0,
                    premiumAllRisk2: 0,
                    premiumAlop2: 0,
                    premiumTotal2: 0
				},
				{
					id: 2,
                    allRisk: "All Risk",
                    alop: "ALOP",
                    total: "Total"
				},
			],
			premiumSlu: [
				{
					id: 1,
                    name1: "Original Currency",
                    name2: "USD",
                    premiumAllRisk: 0,
                    premiumAlop: 0,
                    premiumTotal: 0,
                    premiumAllRisk2: 0,
                    premiumAlop2: 0,
                    premiumTotal2: 0
				},
				{
					id: 2,
                    allRisk: "All Risk",
                    alop: "ALOP",
                    total: "Total"
				},
			],
			netPremium: [
				{
					id: 1,
                    name1: "Original Currency",
                    name2: "USD",
                    premiumAllRisk: 0,
                    premiumAlop: 0,
                    premiumTotal: 0,
                    premiumAllRisk2: 0,
                    premiumAlop2: 0,
                    premiumTotal2: 0
				},
				{
					id: 2,
                    allRisk: "All Risk",
                    alop: "ALOP",
                    total: "Total"
				},
			],
		};
	},

	methods: {
		...mapActions(["saveEndorsmentType"]),
		async reloadFiles(){
      		this.informationCard = await EndorsementService.getEndorsementById(this.idDinamyc);
      		this.endorsementDocuments = this.informationCard.EndorsementDocuments
    	},
		ReturnFromEndorsement() {
      		this.endorsementHistory = false
      		this.disabledSelect = false;
      		this.showEndorsement = false;
    	},
		async createEndorsement() {
			if (this.movementsValue != '') {
				this.onCreatrEndorsement = true
				this.disabledSelect = true;
				this.showEndorsement = true;
				this.endorsementType = this.movementsValue;
				await this.saveEndorsmentType(this.movementsValue)
			}

		},
		async backToCreateEndorsement() {
			this.onCreatrEndorsement = false;
			this.movementsValue = '';
			this.disabledSelect = false;
			this.showEndorsement = false;
			this.loading = false;
			this.endorsements = [];
			this.endorsementType = '';
			this.listEndorsement = await EndorsementService.getEndorsementsBySubscriptionId(this.subscriptionId)
		},
		async backHistoryTableToId(id){
			this.selectedEndorsementId = id;
			this.showEndorsement = false;
      		this.disabledSelect = true;
			this.endorsementHistory = true
			this.idDinamyc = id;
			this.informationCard = await EndorsementService.getEndorsementById(id)
			console.log("informationCard =>", this.informationCard)
			this.clause = this.informationCard.report.cartera.clausula

			this.endorsementDocuments = this.informationCard.EndorsementDocuments

			this.value = this.informationCard.report.cartera.clausula
			
			this.idEndorsementDinamic = this.informationCard.id
			
			/**RECUPERANDO INFO PARA ENDOSO 5 */
			if(this.listEndorsement.find(element => element.id === this.idDinamyc).EndorsementType.type === "Movement without premium"){
        	this.description = this.informationCard.report.cartera.description
        	this.effectiveDate = this.informationCard.report.cartera.effectiveDate
        	this.endDate =new Date(
          	this.informationCard.report.cartera.endDate
        	)
        	.toISOString()
        	.substr(0, 10),
        	this.admittedPremiumEndorsement5 = ''
      		}

			if(!this.informationCard.report.endorsmentReporData){ 
      		this.endorsementDocuments = this.informationCard.EndorsementDocuments
    		} else{
			// if(
			// 	this.listEndorsement.find(element => element.id === this.idDinamyc).EndorsementType.type === 'Increase insurable value/ inclusion risk' ||
			// 	this.listEndorsement.find(element => element.id === this.idDinamyc).EndorsementType.type === 'Reduction of insurable value/ Risk Exclusion' ||
			// 	this.listEndorsement.find(element => element.id === this.idDinamyc).EndorsementType.type === 'Extension'
			// ){


				// Primera Tabla
				this.totalPremiumHistoryTable[0].premiumAllRisk = this.informationCard.report.endorsmentReporData.movementValues.allRisk
				this.totalPremiumHistoryTable[0].premiumAlop = this.informationCard.report.endorsmentReporData.movementValues.alop
				this.totalPremiumHistoryTable[0].premiumTotal = this.informationCard.report.endorsmentReporData.movementValues.total
				
				this.totalPremiumHistoryTable[1].premiumAllRisk = this.informationCard.report.endorsmentReporData.movementValues.allRiskUsd
				this.totalPremiumHistoryTable[1].premiumAlop = this.informationCard.report.endorsmentReporData.movementValues.alopUsd
				this.totalPremiumHistoryTable[1].premiumTotal = this.informationCard.report.endorsmentReporData.movementValues.totalUsd
				
				// Segunda Tabla
				this.totalPremium[0].premiumAllRisk = this.informationCard.report.endorsmentReporData.premium.allRisk
				this.totalPremium[0].premiumAlop = this.informationCard.report.endorsmentReporData.premium.alop
				this.totalPremium[0].premiumTotal = this.informationCard.report.endorsmentReporData.premium.totalInsured
				this.totalPremium[0].sluAllRisk = this.informationCard.report.endorsmentReporData.netPremium.allRiskSluShare
				this.totalPremium[0].sluAlop = this.informationCard.report.endorsmentReporData.netPremium.alopSluShare
				this.totalPremium[0].sluTotal = this.informationCard.report.endorsmentReporData.netPremium.sluShareTotal
			// } else if(this.listEndorsement.find(element => element.id === this.idDinamyc).EndorsementType.type === 'Deductions Change'){
			/*	this.detailValues[0].premiumAllRisk = this.informationCard.report.endorsmentReporData.movementValues.allRisk
				this.detailValues[0].premiumAlop = this.informationCard.report.endorsmentReporData.movementValues.alop
				this.detailValues[0].premiumTotal = this.informationCard.report.endorsmentReporData.movementValues.total
				this.detailValues[0].premiumAllRisk2 = this.informationCard.report.endorsmentReporData.movementValues.allRiskUsd
				this.detailValues[0].premiumAlop2 = this.informationCard.report.endorsmentReporData.movementValues.alopUsd
				this.detailValues[0].premiumTotal2 = this.informationCard.report.endorsmentReporData.movementValues.totalUsd

				this.premiumSlu[0].premiumAllRisk = this.informationCard.report.endorsmentReporData.premium.allRisk
				this.premiumSlu[0].premiumAlop = this.informationCard.report.endorsmentReporData.premium.alop
				this.premiumSlu[0].premiumTotal = this.informationCard.report.endorsmentReporData.premium.totalInsured
				this.premiumSlu[0].premiumAllRisk2 = this.informationCard.report.endorsmentReporData.premium.allRiskUsd
				this.premiumSlu[0].premiumAlop2 = this.informationCard.report.endorsmentReporData.premium.alopUsd
				this.premiumSlu[0].premiumTotal2 = this.informationCard.report.endorsmentReporData.premium.totalUsd
				
				this.netPremium[0].premiumAllRisk = this.informationCard.report.endorsmentReporData.netPremium.allRiskNetSLUExcludingSurveyFees
				this.netPremium[0].premiumAlop = this.informationCard.report.endorsmentReporData.netPremium.alopNetSLUExcludingSurveyFees
				this.netPremium[0].premiumTotal = this.informationCard.report.endorsmentReporData.netPremium.netSLUExcludingSurveyFeesTotal
				this.netPremium[0].premiumAllRisk2 = this.informationCard.report.endorsmentReporData.netPremiumUSD.allRiskNetSLUExcludingSurveyFees
				this.netPremium[0].premiumAlop2 = this.informationCard.report.endorsmentReporData.netPremiumUSD.alopNetSLUExcludingSurveyFees
				this.netPremium[0].premiumTotal2 = this.informationCard.report.endorsmentReporData.netPremiumUSD.netSLUExcludingSurveyFeesTotal
			 }*/
			}
   
			// Invoca el  servicio para generar el excel
			const fileLink = await EndorsementService.getEndorsmentReport({
				subscriptionId: this.subscriptionId,
				endorsmentType: 1,
				endorsmentReporData: this.informationCard.report.endorsmentReporData,
			});

			const file = this.files.find((file) => file.fileId === 1);

			if (!fileLink) {
				file.error = true;
			} else {
				file.fileDownloadLink = fileLink;
				file.loaded = true;
				file.loading = false;
			}
		},
		async changeDateEndorsement(selectedDate) {
    		this.dateSaved = selectedDate
      		this.showInfoEndorsement = false
     		this.reloadEndorsementData = this.reloadEndorsementData +1
      		this.accountComplete = await AccountCompleteService.getAccountCompleteByIdSubscriptionDate(this.subscriptionId, selectedDate)
		  	if (!this.accountComplete) {
      			this.accountComplete =
        		await AccountCompleteService.getLastAccountCompleteByIdSubscription(
        		this.subscriptionId
      			);
     		}
     		this.showInfoEndorsement = true
    	},
		closeAccountById({ idOptionSelected }) { },
	},

	filters: {
		formattedDate(date){
			return moment(date).format("YYYY/MM/DD")
		}
  	},
	async beforeMount() {
		this.BarNavData = await BarNavData();
		this.CloseAccountData = await GetCloseAccount();
	},

	async mounted() {
		this.catalogEndorsements = await EndorsementService.getEndorsementType();
		this.accountComplete = await AccountCompleteService.getLastAccountCompleteByIdSubscription(this.subscriptionId);
      	this.listEndorsement = await EndorsementService.getEndorsementsBySubscriptionId(this.subscriptionId)
		
		this.formatEndorsement5 = new Intl.NumberFormat('en-US', {
			style: "currency",
			currency: "USD",
			minimumFractionDigits: 2
		})
		
		if (!this.accountComplete)
			router.back();
		
		if(this.accountComplete.reference.includes('PRO'))
			router.back();
		
	},
};
</script>

<style lang="less" scoped>
.ditrtibution-container {
	width: 100%;
	height: auto;

	@media (max-width: 650px) {
		overflow-x: hidden;
	}

	/* .content {
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
    @media (max-width: 650px) {
      overflow-x: auto !important;
    }
    //CABEZA DE LA TABLA

    .body-content {
      width: 100%;
      height: auto;
      padding-top: 10px;
      display: flex;
      justify-content: flex-start;
      align-items: flex-start;
      align-content: flex-start;
      flex-wrap: wrap;
      padding-bottom: 10px;
      .button-cont {
        width: 100%;
        height: auto;
        margin-top: 20;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        .blue-btn {
          color: white;
          width: 200px;
          height: 35px;
          background: #003d6d;
          font-size: 15px;
          font-weight: 500;
          letter-spacing: normal;
          text-transform: capitalize;
        }
        .clear-btn {
          width: 200px;
          height: 35px;
        }
      }
    }
    .v-btn {
      justify-content: flex-start !important;
      color: #003d6d;
    }
  } */
}

.create-endorsement {
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

		.clear-btn {
			width: 200px;
			height: 35px;
		}
	}
}

.color_endorsement {
		background-color: #183d6d;
	}

.cards_endorsement{
	width: 100%;
	display: flex;
	flex-wrap: wrap;
	gap: 15px;
}

.margin_cards {
	margin-bottom: 1rem;
}

.endorsement-title {
  font-weight: 800;
  font-size: 20px;
}

.editAccount {
  width: auto;
  color: #f59607;
  font-weight: 600;
  font-size: 19px;
}

.inner-title {
  width: 100%;
  font-size: 20px;
  font-weight: 800;
  margin: 15px 0;
}
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

.stepper-btn {
  width: 100%;
  height: 40px;

  .blue-btn {
    color: white;
    width: 200px;
    height: 35px;
    background: #003d6d;
    font-size: 15px;
    font-weight: 500;
    letter-spacing: normal;
    text-transform: capitalize;
  }

  .clear-btn {
    width: 200px;
    height: 35px;
  }
}
.mt {
  margin-top: 30px;
}
</style>
