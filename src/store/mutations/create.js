export default {
  SAVE_BROKER_INFORMATION(
    state,
    {
      brokerName,
      // brokerPhone,
      // brokerEmail,
      // brokerRole,
      brokerCountry,
      // brokerCompany,
      brokerAddress,
    }
  ) {
    state.brokerInformation = {
      // brokerRole,
      brokerName,
      // brokerPhone,
      // brokerEmail,
      brokerAddress,
      // brokerCompany,
      brokerCountry,
    };
    state.submittedBrokerInformation = true;
  },
  SAVE_CEDENT_DATA(
    state,
    {
      cedentName,
      // cedentPhone,
      // cedentEmail,
      // cedentRole,
      cedentCountry,
      // cedentCompany,
      cedentAddress,
    }
  ) {
    state.cedentInformation = {
      // cedentRole,
      cedentName,
      // cedentPhone,
      // cedentEmail,
      cedentAddress,
      // cedentCompany,
      cedentCountry,
    };
    state.submittedCedentData = true;
  },
  SAVE_ADD_COMPANY(state, { name, address, phone, country, type }) {
    state.addCompany = {
      name,
      type,
      phone,
      address,
      country,
    };
    state.submittedAddCompany = true;
  },
  SAVE_CREATE_SLU_USER(
    state,
    {
      userSignature,
      userLastName,
      userAddress,
      userCountry,
      userCompany,
      userPhone,
      userEmail,
      userName,
      userRole,
    }
  ) {
    state.createUserData = {
      userSignature,
      userLastName,
      userAddress,
      userCountry,
      userCompany,
      userPhone,
      userEmail,
      userName,
      userRole,
    };
    state.submittedCreateSluUser = true;
  },
  RESET_BROKER_INFORMATION(state) {
    state.brokerInformation = {
      brokerRole: "",
      brokerName: "",
      brokerPhone: "",
      brokerEmail: "",
      brokerAddress: "",
      brokerCompany: "",
      brokerCountry: "",
    };
    state.submittedBrokerInformation = false;
  },
  RESET_CEDENT_DATA(state) {
    state.cedentData = {
      cedentRole: "",
      cedentName: "",
      cedentPhone: "",
      cedentEmail: "",
      cedentAddress: "",
      cedentCompany: "",
      cedentCountry: "",
    };
  },
  RESET_ADD_COMPANY(state) {
    state.addCompany = {
      name: "",
      type: "",
      phone: "",
      address: "",
      country: "",
    };
    state.submittedAddCompany = false;
  },
  RESET_CREATE_SLU_USER(state) {
    (state.createUserData = {
      userSignature: "",
      userLastName: "",
      userAddress: "",
      userCountry: "",
      userCompany: "",
      userPhone: "",
      userEmail: "",
      userName: "",
      userRole: "",
    }),
      (state.submittedCreateSluUser = false);
  },
  SET_AVAILABLE_BROKERS(state, { brokers }) {
    state.availableBrokers = brokers;
  },
  SET_AVAILABLE_CEDENTS(state, { cedents }) {
    state.availableCedents = cedents;
  },
  SET_USER_TYPE(state, { value }) {
    state.userType = value;
  },
};
