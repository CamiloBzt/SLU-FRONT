import RATES from '../../constants/rates';
import BOUND from '../../constants/bound';
/**
 * @typedef {Object} State
 * @property {Array} contactsInformation
 * @property {Object} accountInformation
 */
export default {
  saveAccountInformation(state, { insuredName, name, country, typeOfRisk, activity, currency, broker, cedent, contacts }) {
    state.accountInformation = {
      insuredName,
      name,
      country,
      typeOfRisk,
      activity,
      currency,
      broker,
      cedent,
      contacts,
    };
    state.submittedAccountInformation = true;
  },
  saveContactsInformation(state, data) {
    state.contactsInformation = data;
    state.submittedContactsInformation = true;
  },
  setStateAccount(state, { key, value }) {
    state.accountInformation[key] = value;
  },
  setStateCedent(state, { key, value }) {
    state.cedentInformation[key] = value;
  },
  RESET_ACCOUNT_INFORMATION(state) {
    state.accountInformation = {
      insuredName: '',
      name: '',
      country: '',
      typeOfRisk: '',
      activity: '',
      currency: '',
      broker: '',
      cedent: '',
    };
  },
  RESET_CEDENT_INFORMATION(state) {
    state.cedentInformation = {
      cedentName: '',
      cedentEmail: '',
      cedentNumber: '',
      cedentAddress: '',
    };
  },
  RESET_CONTACTS_INFORMATION(state) {
    state.contactsInformation = [];
  },
  /**
   * @param {State} state
   */
  ADD_CONTACT_INFORMATION(state, data) {
    state.contactsInformation.push(data);
  },
  /**
   * @param {State} state
   * @param {number} index
   */
  REMOVE_CONTACT_INFORMATION(state, index) {
    state.contactsInformation.splice(index, 1);
  },
  RESET_DOCUMENTS_INFORMATION(state) {
    // vacío temporalmente, en caso de ser necesario
  },
  setCatalogByName(state, { name, response }) {
    state[name] = JSON.parse(response);
  },
  NEW_OR_RENEWAL(state, { value }) {
    state.subscription_type = value;
  },
  SET_SUBSCRIPTION_INFO(state, { subscription_id }) {
    state.subscription_id = subscription_id;
  },
  SET_SUBSCRIPTION_ID(state, id) {
    state.subscription_id = id;
  },
  SET_SUBSCRIPTION_STATUS(state, status) {
    state.subscriptionStatus = status;
  },
  RESET_SUBSCRIPTION_INFO(state) {
    state.subscription_id = null;
  },
  RESET_SUBSCRIPTION_STATUS(state) {
    state.subscriptionStatus = null;
  },
  SET_SUBSCRIPTION_REFERENCE(state, { nameReference }) {
    state.nameReference = nameReference;
  },
  SET_FACULTATIVE_REFERENCE(state, { facultativeReference }) {
    state.facultativeReference = facultativeReference;
  },
  RESET_SUBSCRIPTION_REFERENCE(state) {
    state.nameReference = '';
  },
  set_upload_document(state, { document }) {
    state.document = document;
  },
  set_slip_document(state, slipDocuments) {
    state.slipDocuments.push(slipDocuments);
  },
  set_correspondence_document(state, correspondenceDocuments) {
    state.correspondenceDocuments.push(correspondenceDocuments);
  },
  setSubscriptionList(state, payload) {
    state.subscription.table.list = JSON.parse(payload);
  },
  setSubscriptionListPagination(state, payload) {
    state.subscription.table.limit = payload.limit;
    state.subscription.table.offset = payload.offset;
    state.subscription.table.query = payload.query;
    state.subscription.table.filter = payload.filter;
    state.subscription.table.filterSearch = payload.filterSearch;
  },
  addNotesArray(state, note) {
    state.notesArray.push(note);
  },
  setMentionsObject(state, mentions) {
    state.mentionsObject = mentions;
  },
  setArrayNotes(state, arrayNotes) {
    state.notesArray = arrayNotes;
  },
  setDocuments(state, arrayDocuments) {
    state.docs = arrayDocuments;
  },
  setDocumentsLoader(state, arrayDocuments) {
    arrayDocuments.forEach((item, index) => {
      state.documents.forEach((doc, num) => {
        if (doc.id == item.catalog_document_id) {
          const docsIndex = state.docs.findIndex((e) => e.id == item.catalog_document_id);

          if (docsIndex !== -1) {
            state.docs[docsIndex] = state.documents[num];
            state.docs[docsIndex].doc_s3 = arrayDocuments[index].doc_s3;
            state.docs[docsIndex].text = arrayDocuments[index].doc_s3;
          }
        }
      });
    });
  },
  setSlipDocuments(state, arrayDocuments) {
    if (arrayDocuments.length != 0) {
      arrayDocuments.forEach((item, index) => {
        if (index == 0) {
          item.text = 'Slip Final';
        } else {
          item.text = 'Slip Document';
        }
      });
      state.slipDocuments = arrayDocuments;
    } else {
      state.slipDocuments = [
        {
          description: 'Slip Documents',
          id: 20,
          key: 'slip',
          name: 'Slip Final',
          text: 'Upload the next document',
          value: 1,
        },
      ];
    }
  },
  setCorrespondenceDocuments(state, arrayDocuments) {
    if (arrayDocuments.length != 0) {
      arrayDocuments.forEach((item, index) => {
        item.text = 'Correspondence Document';
      });
      state.correspondenceDocuments = arrayDocuments;
    }
  },
  setLoading(state) {
    state.loading = !state.loading;
  },
  setDownloadDocUrl(state, value) {
    state.downloadDocUrl = value;
  },
  setModalCreateCompany(state) {
    state.modalCreateCompany = !state.modalCreateCompany;
  },
  setModalCreateBrokerOrCedent(state) {
    state.modalCreateBrokerOrCedent = !state.modalCreateBrokerOrCedent;
  },
  setModalRate(state, type) {
    if (type == 'Other Line of Risks Modal') {
      state.modalRate = !state.modalRate;
    } else if (type == 'Car & Ear Modal') {
      state.modalRateCarEar = !state.modalRateCarEar;
    } else if (type == 'close') {
      state.modalRate = false;
      state.modalRateCarEar = false;
    }
  },
  setModalCreateCompany(state, manualChange) {
    if (typeof manualChange === 'undefined') state.modalCreateCompany = !state.modalCreateCompany;
    else state.modalCreateCompany = manualChange;
  },
  saveQuotation(state, { insuredName, currency, exchangeRate, inceptionDate, expiryDate }) {
    state.quotation = {
      insuredName,
      currency,
      exchangeRate,
      inceptionDate,
      expiryDate,
    };
  },
  setStateQuotation(state, { key, value }) {
    state.quotation = {
      ...state.quotation,
      [key]: value
    };
  },
  setStateDeductions(state, { key, value }) {
    state.deductions[key] = value;
  },
  setStatePremium(state, { key, value }) {
    state.premium = {
      ...state.premium,
      [key]: `${value}`
    };
  },
  setStateTobe(state, { key, value }) {
    state.toBeDefined[key] = value;
  },
  setStateCompleteQuotation(state, value) {
    state.quotation = value;
  },
  setStateCompleteDeductions(state, value) {
    state.deductions = value;
  },
  setStateCompletePremium(state, value) {
    state.premium = value;
  },
  setStateCompleteInsurable(state, value) {
    state.tiv = value;
  },
  setStateCompleteTobe(state, value) {
    state.toBeDefined = value;
  },
  setStateCompleteTIVNON(state, value) {
    state.tivNon = value;
  },
  setStateCompletePremiumNON(state, value) {
    state.premiumNon = value;
  },
  setStateTIV(state, { key, value }) {
    state.tiv[key] = parseFloat(value);
  },
  setStateTIVNON(state, { key, value }) {
    state.tivNon[key] = parseFloat(value);
  },
  setStatePremiumNON(state, { key, value }) {
    state.premiumNon[key] = parseFloat(value);
  },
  RESET_QUOTATION(state) {
    state.quotation = {
      insuredName: '',
      currency: '',
      exchangeRate: null,
      inceptionDate: '',
      expiryDate: '',
      tivTarifadorSelect: null,
      catRate: '',
      premiumRate: null
    };
  },
  setStatelayerSelect(state, value) {
    state.layerSelect = value;
  },
  resetCalculatePML(state) {
    state.calculatePML = [];
  },
  RESET_RATES_OBJ(state) {
    state.ratesObj = RATES.ratesObj;
  },
  SET_RATES_OBJ(state, value) {
    state.ratesObj = value;
  },
  RESET_CAT_RATES_GROUP(state) {
    state.catRatesGroup = RATES.catRatesGroup;
  },
  SET_CAT_RATES_GROUP(state, value) {
    state.catRatesGroup = value;
  },
  RESET_NON_CAT_RATES_OBJ(state) {
    state.nonRates = RATES.nonRates;
  },
  SET_NON_CAT_RATES_OBJ(state, value) {
    state.nonRates = value;
  },
  RESET_ALOP_OBJ(state) {
    state.alopRates = RATES.alopRates;
  },
  SET_ALOP_OBJ(state, value) {
    state.alopRates = value;
  },
  RESET_CAT_LARGE_OBJ(state) {
    state.nonCatLarge = RATES.nonCatLarge;
  },
  SET_CAT_LARGE_OBJ(state, value) {
    state.nonCatLarge = value;
  },
  SET_BOUND_ENG(state, { key, value }) {
    state.boundEng[key] = value;
  },
  SET_BOUND_ENG_CAT_DED(state, { index, key, value }) {
    state.boundEngCatDeductibles[index][key] = value;
  },
  RESET_BOUND_ENG_CAT_DED(state) {
    state.boundEngCatDeductibles = BOUND.boundEngCatDeductibles[0];
  },
  SET_BOUND_PROP_DED(state, { key, value }) {
    state.boundPropDeductibles[key] = value;
  },
  SET_BOUND_INSURABLE(state, { key, value }) {
    state.boundInsurable = {
      ...state.boundInsurable,
      [key]: `${value}`
    };
  },
  RESET_BOUND_ENG_DEDUCTIBLES(state) {
    state.boundEngDeductibles = BOUND.boundEngDeductibles;
  },
  SET_BOUND_ENG_DEDUCTIBLES(state, value) {
    state.boundEngDeductibles = value;
  },
  setStateCompleteBound(state, value) {
    state.boundEng = value;
  },
  setStateCompleteBoundInsurable(state, value) {
    state.boundInsurable = value;
  },
  setStateCompleteBUCED(state, value) {
    state.boundEngCatDeductibles = value;
  },
  resetStateCompleteBUCED(state) {
    state.boundEngCatDeductibles = BOUND.boundEngCatDeductibles[0];
  },
  setStateCompleteDeductiblesProp(state, value) {
    state.boundPropDeductibles = value;
  },
  resetStateCompleteDeductiblesProp(state) {
    state.boundPropDeductibles = BOUND.boundPropDeductibles;
  },
  setStateCompleteSublimes(state, value) {
    state.boundSublimes = value;
  },
  setStateCompleteSublimesProp(state, value) {
    state.boundSublimesProp = value;
  },
  resetStateCompleteSublimesProp(state) {
    state.boundSublimesProp = BOUND.boundSublimesProp;
  },
  RESET_SUBLIMITS_ENG(state) {
    state.boundSublimitsEng = BOUND.boundSublimitsEng;
  },
  SET_SUBLIMITS_ENG(state, value) {
    state.boundSublimitsEng = value;
  },
  RESET_SUBLIMITS_PROP(state) {
    state.boundSublimitsProp = BOUND.boundSublimitsProp;
  },
  SET_SUBLIMITS_PROP(state, value) {
    state.boundSublimitsProp = value;
  },
  SET_TIV_BOUND(state, value) {
    state.tivBound = value;
  },
  SET_INSURABLE_PROP_BOUND(state, { key, value }) {
    state.boundInsurableProp[key] = value;
  },
  setStateCompleteBoundInsurableProp(state, value) {
    state.boundInsurableProp = value;
  },
  setStateCompleteMainLocation(state, value) {
    state.mliv = value;
  },
  setStateCompleteBoundPml(state, value) {
    state.boundPml = value;
  },
  SET_MLIV_BOUND(state, { key, value }) {
    state.mliv[key] = value;
  },
  SET_BOUND_PML(state, { key, value }) {
    state.boundPml[key] = value;
  },
  saveCheckPaymentInformation(state, payload) {
    console.log(payload);
    state.checkPayment.value1.paymentDate = payload.payment_date1;
    state.checkPayment.value2.paymentDate = payload.payment_date2;
    state.checkPayment.value3.paymentDate = payload.payment_date3;
    state.checkPayment.value1.porcentaje = payload.percent1;
    state.checkPayment.value2.porcentaje = payload.percent2;
    state.checkPayment.value3.porcentaje = payload.percent3;
    state.checkPayment.value1.value = payload.invoice1;
    state.checkPayment.value2.value = payload.invoice2;
    state.checkPayment.value3.value = payload.invoice3;
  },
  setBoundClaims(state, payload) {
    state.boundClaims = payload
  },
};
