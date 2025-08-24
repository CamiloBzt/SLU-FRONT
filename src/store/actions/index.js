import activities from "./activities";
import auth from "./auth";
import bound from "./bound";
import createBroker from "./brokersAndCedents";
import claims from "./claims";
import companies from "./companies";
import contacts from "./contacts";
import copy from "./copyData";
import countries from "./countries";
import currencies from "./currencies";
import docs from "./docs";
import emails from "./emails";
import endorsements from "./endorsements";
import errors from "./errors";
import facultative from "./facultative";
import layers from "./layers";
import lineOfRisk from "./lineOfRisk";
import notes from "./notes";
import quotation from "./quotation";
import rates from "./rates";
import reinsurers from "./reinsurers";
import roles from "./roles";
import socket from "./socket";
import subscription from "./subscription";
import ui from "./ui";
import underwriters from "./underwriters";
import users from "./users";
import wallet from "./wallet";

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
  ...lineOfRisk,
  ...activities,
  ...currencies,
  ...countries,
};
