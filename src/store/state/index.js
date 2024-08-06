import auth from "./auth";
import errors from "./errors";
import ui from "./ui";
import subscription from "./subscription";
import create from "./create";
import outlook from "./outlook";
import closeAccount from "./close_account";
import emails from "./emails";
import contacts from "./contacts";
import roles from './roles'
import brokers from './brokers'
import cedents from './cedents'
import catalogs from './catalogs'
import claims from './claims'
import socket from "./socket";

export default {
  auth,
  ui,
  outlook,
  brokers,
  cedents,
  claims,
  roles,
  socket,
  ...create,
  ...errors,
  ...subscription,
  ...closeAccount,
  ...emails,
  ...contacts,
  ...catalogs
};
