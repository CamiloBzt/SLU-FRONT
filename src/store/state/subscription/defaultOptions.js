export default {
  countries: [],
  currencies: '',
  risk_type: '',
  activities: '',
  documents: '',
  document: '',
  docs: [],
  endorsementsDocuments: [],
  slipDocuments: [
    {
      description: 'Slip Documents',
      id: 20,
      key: 'slip',
      name: 'Slip Document',
      text: 'Upload the next document',
      value: 1,
    },
  ],
  correspondenceDocuments: [
    {
      description: 'Correspondence Documents',
      id: 21,
      key: 'correspondence',
      name: 'Correspondence Document',
      text: 'Upload the next document',
      value: 1,
    },
  ],
  subscription_type: 'NEW',
  subscription_id: null,
  nameReference: '',
  facultativeReference: null,
  subscriptionStatus: null,
  lastSubscriptionId: null,
  notesArray: [
    {
      id: 65,
      description: 'prueba de nota',
      subscription_id: 1207,
      user_author_id: 9,
      user_name: 'Dan',
      parent_note_id: 0,
      created_at: '2021-08-24T02:35:08.192Z',
      updated_at: '2021-08-24T02:35:08.192Z',
      current: true,
      showRes: true,
      arrayResponse: {
        id: 66,
        description: 'respuesta de nota',
        subscription_id: 1207,
        user_author_id: 9,
        user_name: 'Dan',
        parent_note_id: 0,
        created_at: '2021-08-24T02:35:08.192Z',
        updated_at: '2021-08-24T02:35:08.192Z',
        current: true,
      },
    },
  ],
  mentionsObject: [],
  loading: false,
  downloadDocUrl: '',
  modalCreateCompany: false,
  modalRate: false,
  modalRateCarEar: false,
  modalCreateBrokerOrCedent: false,
};
