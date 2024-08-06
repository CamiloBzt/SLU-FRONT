import auth from './auth';
import errors from './errors';
import subscription from './subscription';
import email from './email';
import create from './create';
import close_account from './closeAccount';
import contacts from './contacts';
import toBeDefined from './toBeDefined';
import rates from './rates';
import quotation from './quotation';
import endorsements from './endorsements';
import catalogs from './catalogs';
import claims from './claims';
import socket from './socket';

export default {
  ...auth,
  ...errors,
  ...subscription,
  ...email,
  ...create,
  ...close_account,
  ...contacts,
  ...toBeDefined,
  ...rates,
  ...quotation,
  ...endorsements,
  ...catalogs,
  ...claims,
  ...socket
};
