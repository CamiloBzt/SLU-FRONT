export default {
  SET_CURRENT_EMAIL_TEMPLATE(state, { currentEmailTemplate }) {
    state.currentEmailTemplate = currentEmailTemplate;
  },
  SET_TEMPLATE_EMAIL_ALL_QUOTATION(state, templates) {
    state.emailTemplatesQuotation = templates;
  },
  SET_CURRENT_EMAIL_RISK_ID(state, { id }) {
    state.currentTemplateRiskID = id;
  },
  SET_SELECTED_TEMPLATE_LANG(state, lang) {
    state.selectedLang = lang;
  },
  RESET_SEND_EMAIL(state) {
    state.currentEmailTemplate = "";
  },
  SET_MAIL_CC_PARTICIPANTS(state, ccParticipants) {
    console.log('asignando los particimaptne')

    state.ccParticipants = ccParticipants.reduce((accum, item) => {
      accum.push(item.email)
      return accum;
    }, []);
    console.log(state.ccParticipants)
  },
  SET_MAIL_TEMPLATE (state, template) {
    state.currentEmailTemplateQuotation = template
    if(state.selectedLang === 'es') {
      state.htmlTemplate = template.htmlTemplateEs
      state.currentEmailTemplate = template.htmlTemplateEs;
    } else {
      state.htmlTemplate =  template.htmlTemplate
      state.currentEmailTemplate = template.htmlTemplate;
    }
  },
  SET_LANG_MAIL_TEMPLATE (state, lang) {
    state.selectedLang = lang;
    if(state.selectedLang === 'es') {
      state.htmlTemplate = state.currentEmailTemplateQuotation.htmlTemplateEs
      state.currentEmailTemplate = state.currentEmailTemplateQuotation.htmlTemplateEs;
    } else {
      state.htmlTemplate =  state.currentEmailTemplateQuotation.htmlTemplate
      state.currentEmailTemplate = state.currentEmailTemplateQuotation.htmlTemplate;
    }
  }
};
