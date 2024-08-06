import ui from './ui';
import auth from './auth';
import email from './email';
import rates from './rates';
import errors from './errors';
import create from './create';
import contacts from './contacts';
import toBeDefined from './toBeDefined';
import subscription from './subscription';
import roles from './roles';
import reinsurers from './reinsurers';
import endorsements from './endorsements';
import brokers from './brokers';
import cedents from './cedents';
import claims from './claims';
import layers from './layers';
import socket from './socket';

export default {
  ...auth,
  ...ui,
  ...errors,
  ...subscription,
  ...create,
  ...email,
  ...contacts,
  ...toBeDefined,
  ...rates,
  ...roles,
  ...reinsurers,
  ...endorsements,
  ...brokers,
  ...cedents,
  ...claims,
  ...layers,
  ...socket,
};
