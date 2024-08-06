import accountInformation from './accountInformation';
import cedentInformation from './cedentInformation';
import dashboard from './dashboard';
import defaultOptions from './defaultOptions';
import contactsInformation from './contactsInformation';
import quotation from './quotation';
import rate from './rate';
import rates from './rates';
import bound from './bound';
import endorsements from './endorsements';
import wallet from './wallet';

export default {
  ...contactsInformation,
  ...accountInformation,
  ...cedentInformation,
  ...defaultOptions,
  ...dashboard,
  ...quotation,
  ...rates,
  ...rate,
  ...bound,
  ...endorsements,
  ...wallet,
};
