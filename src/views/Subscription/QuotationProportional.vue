<template>
	<div class="AppMain d-flex flex-wrap">
		<!--MENU LATERAL IZQUIERDO-->
		<div class="LateralMenuContent HideOnMovil">
			<MenuGeneral />
		</div>

		<!--MENU PARA DISPOSITIVOS MOVILES-->
		<div class="SuperiorMenuContent ShowFlexOnMovil">
			<MenuGeneralMovil />
		</div>

		<!--CONTENEDOR GENERAL-->
		<div class="GeneralContent FullOnMovil pl-10 pr-10">
			<!--TITULO DE LA PÁGINA-->
			<TitlePage title="Underwriting" />

			<!--BARRA DE NAVEGACIÓN DE Underwriting-->
			<BarNav link1="" link2="lnkActive" />

			<!--POPORTIONAL / NON PROPORTIONAL -->
			<TypeProportional />

			<!--PASOS DE REGISTRO-->
			<Stepper
				step2="StepActive"
				stepMovil1=""
				stepMovil2="Quotation"
				stepMovil3=""
			/>

			<div class="CopyAndDetailscont">
				<EditAccount
					v-if="facultativeReference"
					:editAccount="editable"
					:accountName="facultativeReference"
				/>
				<EditAccount
					v-else
					:editAccount="editable"
					:accountName="nameReference"
				/>
				<CopyAccount />
			</div>

			<QuoProprtional ref="quoProp" :loadingPanel="loadingPanel" @panel-event="disabledInteracton" />

			<!--SLIPS-->
			<SlipDocuments @panel-event="disabledInteracton"/>

			<!--NOTAS-->
			<NotesComponent @panel-event="disabledInteracton"/>

			<ButtonsQuotation ref="qBtn" @sendToBound="submitQuotation()" />

			<!--MODAL TARIFAR-->
			<RateModal />
			<RateModalCarEar />

			<!--ESPACIO EN BLANCO-->
			<WhiteSpace></WhiteSpace>
		</div>
	</div>
</template>
<script>
import RateModalCarEar from '@/components/Rate/RateModalCarEar.vue';
import RateModal from '@/components/Rate/RateModal.vue';
import TitlePage from '@/components/TitlePage.vue';
import MenuGeneral from '@/components/Menu/MenuGeneral.vue';
import MenuGeneralMovil from '@/components/Menu/MenuGeneralMovil.vue';
import BarNav from '@/components/subscription/BarNav.vue';
import QuoProprtional from '@/components/subscription/quotation/QuoProprtional.vue';
import EditAccount from '@/components/subscription/EditAccount.vue';
import CopyAccount from '@/components/subscription/quotation/CopyAccount.vue';
import TypeProportional from '@/components/subscription/quotation/TypeProportional';
import Stepper from '@/components/subscription/submission/Stepper';
import NotesComponent from '@/components/Notes/NotesComponent.vue';
import ExposureCurves from '@/components/subscription/quotation/ExposureCurves';
import SlipDocuments from '@/components/subscription/submission/SlipDocuments.vue';
import ButtonsQuotation from '@/components/subscription/quotation/ButtonsQuotation';
import WhiteSpace from '@/components/WhiteSpace';

/* mixins */
import { stateExpansiveManager } from '@/mixins/subscription.js';
// Vuex
import { mapState, mapActions, mapMutations, mapGetters } from 'vuex';
// Servicios
import SubscriptionService from '@/modules/home/services/subscription.service'

export default {
	name: 'QuotationProportional',
	mixins: [stateExpansiveManager],
	data() {
		return {
			loadingPanel: false,
			editable: false,
		};
	},
	components: {
		RateModalCarEar,
		RateModal,
		TitlePage,
		MenuGeneral,
		MenuGeneralMovil,
		BarNav,
		TypeProportional,
		Stepper,
		QuoProprtional,
		EditAccount,
		CopyAccount,
		NotesComponent,
		ExposureCurves,
		SlipDocuments,
		ButtonsQuotation,
		WhiteSpace,
	},
	computed: {
		...mapState(['modalRateCarEar']),
		...mapGetters([
			'subscription_id',
			'subscriptionStatus',
			'nameReference',
			'subscription_type',
			'accountInformation',
			'risk_type',
			'facultativeReference',
			'modalRate'
		]),
		
		selectedRisk: {
			get() {
				if (
					this.accountInformation.typeOfRisk &&
					this.risk_type &&
					this.risk_type.length > 0
				) {
					const typeObj = this.risk_type.find(
						(v) => v.id === this.accountInformation.typeOfRisk
					);
					return typeObj;
				}
				return 0;
			},
		},
		routeToPush: {
			get() {
				if (this.selectedRisk && this.selectedRisk.key) {
					const { key } = this.selectedRisk;
					if (key === 'CAR' || key === 'EAR') return 'Edit Bound';
				}
				return 'Bound Property Quotator Proportional';
			},
		},
	},
	watch: {
		'$route.params.subscriptionId': async function (id) {
			this.RESET_SUBSCRIPTION_REFERENCE();
			await this.resetSubscriptionStatus();
			if (this.$route.params && this.$route.params.subscriptionId) {
				this.editable = true;
			}
		},
		'loadingPanel': function (newLoadingPanel){
			if(!newLoadingPanel) this.disabledInteracton()
		},
		'modalRateCarEar': function (newValue){
			if(newValue) this.disabledInteracton()
		},
	},
	async mounted() {
		this.disabledInteracton()
		/* set loaders */
		const lpa = 'loadingPanel';
		/* loaders to true */
		this[lpa] = !this[lpa];
		/* editable */
		this.RESET_SUBSCRIPTION_REFERENCE();
		await this.resetSubscriptionStatus();
		if (this.$route.params && this.$route.params.subscriptionId) {
			this.editable = true;
		}
		/* load data */
		await this.checkSubscriptionStored();
		await this.getCatalogByName({ name: 'currencies' });
		await this.updateQuotationType(1);
		await this.getQuotationInformation();
		/* load finished */
		this[lpa] = false;

		/* abrir panel después de carga para montar el componente */
		const quoProp = this.$refs.quoProp;
		if (quoProp) quoProp.quoPropPanel = 0;
	},
	methods: {
		...mapActions([
			'updateQuotationType',
			'checkSubscriptionStored',
			'getQuotationInformation',
			'getCatalogByName',
			'updateSubscriptionStatus',
			'resetSubscriptionStatus',
			'globalSaveColumn',
			'addFacultative',
		]),
		...mapMutations([
			'RESET_QUOTATION',
			'RESET_SUBSCRIPTION_REFERENCE',
			'NEW_OR_RENEWAL',
		]),
		async disabledInteracton () {
			if(!this.$route.params.subscriptionId) return;
			const subscriptionId = Number(this.$route.params.subscriptionId)
      const isBoundComplete = await SubscriptionService.isAccountComplete(subscriptionId)
      isBoundComplete ? this.checkDisableInputsFile() : ''
    },
    checkDisableInputsFile  () {
      setTimeout(() => {
        // Disabled close account
        const closeAccountButton = document.querySelector('.closeCont')
        closeAccountButton.classList.add('disabled-element');
        // Disabled copy account
        const copyAccountButton = document.querySelector('.CopyAccount')
        copyAccountButton.classList.add('disabled-element');
				// Disabled buttons
				const fourEyesButton = document.querySelector('.four-eyes-button')
				fourEyesButton.classList.add('disabled-element');
				fourEyesButton.replaceWith(fourEyesButton.cloneNode(true));

        // Disable all another elements
				const rateCarModalButtons = document.querySelectorAll('.buttons-modal-car')
        const getElements = document.querySelectorAll('.v-input')
        const deleteButtons = document.querySelectorAll('.TableDelete')
        const getInputSquare = document.querySelectorAll('.InputFileContent')
        const getButtosnDelete = document.querySelectorAll('.InputDeletContBtn')
        const buttonsFileLarge = document.querySelectorAll('.actions button.v-btn')
        const getButtosAdd = document.querySelectorAll('.button')
        const getButtosAddTwo = document.querySelectorAll('.moreButton')
        const inputButton = document.querySelectorAll('button.moreButton')
        const buttonAddNotes = document.querySelectorAll('.CreateNoteCont button.v-btn')
				const inputsModal = document.querySelectorAll('.InputContent')
				const inputsModalTable = document.querySelectorAll('.Row')
				const inputsModalTableLine = document.querySelectorAll('.Line')
        
				for (const rateModalButton of rateCarModalButtons) {
          rateModalButton.classList.add('disabled-element');
					rateModalButton.replaceWith(rateModalButton.cloneNode(true));
        }
				for (const modalInputs of inputsModal) {
          modalInputs.classList.add('disabled-element');
					modalInputs.replaceWith(modalInputs.cloneNode(true));
        }
				for (const rowInput of inputsModalTable) {
          rowInput.classList.add('disabled-element');
        }
				for (const lineInput of inputsModalTableLine) {
          lineInput.classList.add('disabled-element');
        }
        for (const inputSquare of getInputSquare) {
          inputSquare.classList.add('disabled-element');
        }
        for (const button of inputButton) {
          button.disabled = true;
          button.classList.add('disabled-element');
        }
        for (const buttonDelete of getButtosnDelete) {
          buttonDelete.classList.add('disabled-element');
          buttonDelete.replaceWith(buttonDelete.cloneNode(true));
        }
        for (const buttonFileLarge of buttonsFileLarge) {
          buttonFileLarge.classList.add('disabled-element');
          buttonFileLarge.replaceWith(buttonFileLarge.cloneNode(true));
        }
        for (const buttonAdd of getButtosAdd) {
          buttonAdd.classList.add('disabled-element');
        }
        for (const buttonAddTwo of getButtosAddTwo) {
          buttonAddTwo.classList.add('disabled-element-hidden');
        }
        for (const element of getElements) {
          element.classList.add('disabled-element');
        }
        for (const deleteButtons of deleteButtons) {
          deleteButtons.classList.add('disabled-element');
          deleteButtons.replaceWith(deleteButtons.cloneNode(true));
        }
        for (const addNotesBtn of buttonAddNotes) {
          addNotesBtn.classList.add('disabled-element');
          addNotesBtn.replaceWith(addNotesBtn.cloneNode(true));
        }
      }, 50);
    },
		async submitQuotation() {
			const qbtns = this.$refs.qBtn;
			qbtns.loadBtn = true;

			const quoProp = this.$refs.quoProp;

			const proportional = quoProp.$refs.proportional;
			const deductions = quoProp.$refs.deductions;
			const insurable = quoProp.$refs.insurable;
			const premium = quoProp.$refs.premium;
			const toBe = quoProp.$refs.toBe;

			/* open panels */
			if (quoProp.loadingPanel) {
				qbtns.loadBtn = false;

				return;
			}

			quoProp.quoPropPanel = 0;

			/* validación de formularios */
			proportional.$v.$touch();
			deductions.$v.$touch();
			insurable.$v.$touch();
			premium.$v.$touch();
			toBe.$v.$touch();

			const propError =
				proportional.$v.$error || proportional.$v.$invalid;
			const deduError = deductions.$v.$error || deductions.$v.$invalid;
			const insuError = insurable.$v.$error || insurable.$v.$invalid;
			const premError = premium.$v.$error || premium.$v.$invalid;
			const tobeError = toBe.$v.$error || toBe.$v.$invalid;

			if (propError || deduError || insuError || premError || tobeError) {
				if (tobeError) this.scrollToSection(toBe);
				if (premError) this.scrollToSection(premium);
				if (insuError) this.scrollToSection(insurable);
				if (deduError) this.scrollToSection(deductions);
				if (propError) this.scrollToSection(proportional);

				qbtns.loadBtn = false;
				return;
			}

			if (this.subscriptionStatus <= 3 || !this.subscriptionStatus)
				await this.updateSubscriptionStatus(4);

			if (this.subscription_type === 'RENEWAL') {
				this.NEW_OR_RENEWAL({ value: 'NEW' });
				await this.globalSaveColumn({
					table: 'subscription',
					column: 'subscription_type',
					difname: 'type',
					id: this.subscription_id,
				});
			}

			qbtns.loadBtn = false;
			await this.addFacultative({
				subscription_id: this.subscription_id,
			});
			this.$router.push({
				name: this.routeToPush,
				params: { subscriptionId: this.subscription_id },
			});
		},
		startLoad() {
			this.loader = 'loading';
			const l = this.loader;
			this[l] = !this[l];
		},
		endLoad(l) {
			this[l] = false;
			this.loader = null;
		},
		scrollToSection(reference) {
			this.$nextTick(() => {
				const input = reference.$el;
				input.scrollIntoView({ behavior: 'smooth' });
			});
		},
	},
};
</script>
<style lang="less" scoped>
//CONTENEDOR DE QUOTATION
@import '~@/assets/style/AccordionStyle.less';
</style>
