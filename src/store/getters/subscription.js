export default {
  subscription_type: ({ subscription_type }) => subscription_type, // new or renewal
  countries: ({ countries }) => {
    if (countries.length === 0) return [];
    return countries;
  },
  brokers: ({ brokers }) => {
    if (brokers.length === 0) return [];
    return brokers;
  },
  lossType: ({ loss_type }) => {
    if (loss_type.length === 0) return [];
    return loss_type;
  },
  risk_type: ({ risk_type }) => {
    if (risk_type.length === 0) return [];
    return risk_type;
  },
  activities: ({ activities }) => {
    if (activities.length === 0) return [];
    return activities;
  },
  currencies: ({ currencies }) => {
    if (currencies.length === 0) return [];
    return currencies;
  },
  activitiesById:
    ({ activities }) =>
    (id) => {
      if (typeof id === "undefined" || !id) return [];
      if (!Array.isArray(activities)) return []; // <- protección clave
      return activities.filter(({ risk_type_id }) => risk_type_id == id);
    },
  subscription_id: ({ subscription_id }) => subscription_id,
  subscriptionStatus: ({ subscriptionStatus }) => subscriptionStatus,
  nameReference: ({ nameReference }) => nameReference,
  facultativeReference: ({ facultativeReference }) => facultativeReference,
  lastSubscriptionId: ({ lastSubscriptionId }) => lastSubscriptionId,
  cedentInformation: ({ cedentInformation }) => cedentInformation,
  accountInformation: ({ accountInformation }) => accountInformation,
  contactsInformation: ({ contactsInformation }) => contactsInformation,
  submittedCedentInformation: ({ submittedCedentInformation }) => submittedCedentInformation,
  documents: ({ documents }) => documents,
  document: ({ document }) => document,
  docs: ({ docs }) => docs,
  slipDocuments: ({ slipDocuments }) => slipDocuments,
  notesArray: ({ notesArray }) => notesArray,
  correspondenceDocuments: ({ correspondenceDocuments }) => correspondenceDocuments,
  mentionsObject: ({ mentionsObject }) => mentionsObject,
  loading: ({ loading }) => loading,
  downloadDocUrl: ({ downloadDocUrl }) => downloadDocUrl,
  modalCreateCompany: ({ modalCreateCompany }) => modalCreateCompany,
  modalCreateBrokerOrCedent: ({ modalCreateBrokerOrCedent }) => modalCreateBrokerOrCedent,
  quotation: ({ quotation }) => quotation,
  contractors: ({ contractors }) => contractors,
  rate: ({ rate }) => rate,
  deductions: ({ deductions }) => deductions,
  tiv: ({ tiv }) => tiv,
  premium: ({ premium }) => premium,
  tivNon: ({ tivNon }) => tivNon,
  premiumNon: ({ premiumNon }) => premiumNon,
  layersArray: ({ layersArray }) => layersArray,
  layerSelect: ({ layerSelect }) => layerSelect,
  smallestRisks: ({ smallestRisks }) => smallestRisks,
  smallHouses: ({ smallHouses }) => smallHouses,
  unMayor: ({ unMayor }) => unMayor,
  dosMayor: ({ dosMayor }) => dosMayor,
  tresMayor: ({ tresMayor }) => tresMayor,
  great: ({ great }) => great,
  calculatePML: ({ calculatePML }) => calculatePML,
  monthlyRate: ({ monthlyRate }) => monthlyRate,
  typeofconstruction: ({ typeofconstruction }) => typeofconstruction,
  testing: ({ testing }) => testing,
  ThirdPartyLiability: ({ ThirdPartyLiability }) => ThirdPartyLiability,
  firstyearOp: ({ firstyearOp }) => firstyearOp,
  inlandTransit: ({ inlandTransit }) => inlandTransit,
  ALOP: ({ ALOP }) => ALOP,
  errorsDesign: ({ errorsDesign }) => errorsDesign,
  equipmentInstallation: ({ equipmentInstallation }) => equipmentInstallation,
  maintenancePeriod: ({ maintenancePeriod }) => maintenancePeriod,
  thirdPartyLiability: ({ thirdPartyLiability }) => thirdPartyLiability,
  firstyearOp: ({ firstyearOp }) => firstyearOp,
  inlandTransit: ({ inlandTransit }) => inlandTransit,
  SRCC: ({ SRCC }) => SRCC,
  errorsDesign: ({ errorsDesign }) => errorsDesign,
  reasons: ({ reasons }) => reasons,
  catTable: ({ catTable }) => catTable,
  alopRate: ({ alopRate }) => alopRate,
  tarifarNonCatRate: ({ tarifarNonCatRate }) => tarifarNonCatRate,
  underwriterMonth: ({ underwriterMonth }) => underwriterMonth,
  operatingEng: ({ operatingEng }) => operatingEng,
  boundEng: ({ boundEng }) => boundEng,
  boundInsurable: ({ boundInsurable }) => boundInsurable,
  boundInsurableProp: ({ boundInsurableProp }) => boundInsurableProp,
  boundEngCatDeductibles: ({ boundEngCatDeductibles }) => boundEngCatDeductibles,
  boundEngDeductibles: ({ boundEngDeductibles }) => boundEngDeductibles,
  boundPropDeductibles: ({ boundPropDeductibles }) => boundPropDeductibles,
  clause: ({ clause }) => clause,
  mliv: ({ mliv }) => mliv,
  tivBound: ({ tivBound }) => tivBound,
  boundSublimes: ({ boundSublimes }) => boundSublimes,
  boundSublimesProp: ({ boundSublimesProp }) => boundSublimesProp,
  boundSublimitsEng: ({ boundSublimitsEng }) => boundSublimitsEng,
  boundSublimitsProp: ({ boundSublimitsProp }) => boundSublimitsProp,
  boundPml: ({ boundPml }) => boundPml,
  boundClaims: ({ boundClaims }) => boundClaims,
  checkPayment: ({ checkPayment }) => checkPayment,
};
