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
  SAVE_LINE_OF_RISK_INFORMATION(state, { key, description, active }) {
    state.lineOfRiskInformation = {
      key,
      description,
      active,
    };
    state.submittedLineOfRiskInformation = true;
  },

  RESET_LINE_OF_RISK_INFORMATION(state) {
    state.lineOfRiskInformation = {
      key: "",
      description: "",
      active: true,
    };
    state.submittedLineOfRiskInformation = false;
  },

  SET_AVAILABLE_LINE_OF_RISK(state, { lineOfRisk }) {
    state.availableLineOfRisk = lineOfRisk;
  },

  SET_INFO_LINE_OF_RISK(state, { payload }) {
    state.lineOfRisk.selected = payload;
  },

  SET_LINE_OF_RISK_LIST(state, { lineOfRisk }) {
    state.lineOfRisk.list = lineOfRisk;
  },

  SAVE_ACTIVITY_INFORMATION(
    state,
    { description, category, rate, risk_type_id, active }
  ) {
    state.activityInformation = {
      description,
      category,
      rate,
      risk_type_id,
      active,
    };
    state.submittedActivityInformation = true;
  },

  RESET_ACTIVITY_INFORMATION(state) {
    state.activityInformation = {
      description: "",
      category: "",
      rate: 1,
      risk_type_id: 2,
      active: true,
    };
    state.submittedActivityInformation = false;
  },

  SET_AVAILABLE_ACTIVITIES(state, { activities }) {
    state.availableActivities = activities;
  },

  SET_INFO_ACTIVITY(state, { payload }) {
    state.activities.selected = payload;
  },

  SET_ACTIVITY_LIST(state, { activities }) {
    state.activities.list = activities;
  },

  SAVE_CURRENCY_INFORMATION(state, { key, description, region, active }) {
    state.currencyInformation = {
      key,
      description,
      region,
      active,
    };
    state.submittedCurrencyInformation = true;
  },

  RESET_CURRENCY_INFORMATION(state) {
    state.currencyInformation = {
      key: "",
      description: "",
      region: "",
      active: true,
    };
    state.submittedCurrencyInformation = false;
  },

  SET_AVAILABLE_CURRENCIES(state, { currencies }) {
    state.availableCurrencies = currencies;
  },

  SET_INFO_CURRENCY(state, { payload }) {
    state.currencies.selected = payload;
  },

  SET_CURRENCY_LIST(state, { currencies }) {
    state.currencies.list = currencies;
  },
  SAVE_COUNTRY_INFORMATION(state, { description, active }) {
    state.countryInformation = {
      description,
      active,
    };
    state.submittedCountryInformation = true;
  },

  RESET_COUNTRY_INFORMATION(state) {
    state.countryInformation = {
      description: "",
      active: true,
    };
    state.submittedCountryInformation = false;
  },

  SET_AVAILABLE_COUNTRIES(state, { countries }) {
    state.availableCountries = countries;
  },

  SET_INFO_COUNTRY(state, { payload }) {
    state.countries.selected = payload;
  },

  SET_COUNTRY_LIST(state, { countries }) {
    state.countries.list = countries;
  },
};
