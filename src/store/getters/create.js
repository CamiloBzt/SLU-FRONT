export default {
  userType: ({ userType }) => userType,
  companies: ({ companies }) => companies,
  cedentData: ({ cedentData }) => cedentData,
  addCompany: ({ addCompany }) => addCompany,
  createUserData: ({ createUserData }) => createUserData,
  availableBrokers: ({ availableBrokers }) => availableBrokers,
  availableCedents: ({ availableCedents }) => availableCedents,
  availableCompanies: ({ availableCompanies }) => availableCompanies,
  brokerInformation: ({ brokerInformation }) => brokerInformation,
  availableBrokersById: ({ availableBrokers }) => id => {
    if (typeof id == "undefined" || !id) return [];
    return availableBrokers.filter(item => item.id == id)[0];
  },
  availableBrokersCedents: ({ availableBrokers, availableCedents }) => [
    ...availableBrokers,
    ...availableCedents,
  ],
  availableBrokersCedentsByUUID: ({
    availableBrokers,
    availableCedents,
  }) => uuid => {
    if (typeof uuid == "undefined" || !uuid) return [];
    const available = [...availableBrokers, ...availableCedents];
    return available.filter(item => item.uuid == uuid)[0];
  },
};
