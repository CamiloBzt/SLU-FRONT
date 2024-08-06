import auth from './auth';
import docs from './docs';
import ui from './ui';
import errors from './errors';
import emails from './emails';
import subscription from './subscription';
import createBroker from './brokersAndCedents';
import notes from './notes';
import users from './users';
import companies from './companies';
import contacts from './contacts';
import quotation from './quotation';
import copy from './copyData';
import rates from './rates';
import bound from './bound';
import roles from './roles';
import reinsurers from './reinsurers';
import endorsements from './endorsements';
import wallet from './wallet';
import claims from './claims';
import layers from './layers';
import facultative from './facultative';
import socket from './socket';
import underwriters from './underwriters';

export default {
  ...auth,
  ...ui,
  ...docs,
  ...errors,
  ...emails,
  ...subscription,
  ...createBroker,
  ...claims,
  ...notes,
  ...users,
  ...companies,
  ...contacts,
  ...quotation,
  ...copy,
  ...rates,
  ...bound,
  ...roles,
  ...reinsurers,
  ...endorsements,
  ...wallet,
  ...layers,
  ...facultative,
  ...socket,
  ...underwriters,
};
