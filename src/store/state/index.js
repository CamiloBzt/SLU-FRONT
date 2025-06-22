import activities from "./activities";
import auth from "./auth";
import brokers from "./brokers";
import catalogs from "./catalogs";
import cedents from "./cedents";
import claims from "./claims";
import closeAccount from "./close_account";
import contacts from "./contacts";
import countries from "./countries";
import create from "./create";
import currencies from "./currencies";
import emails from "./emails";
import errors from "./errors";
import lineOfRisk from "./lineOfRisk";
import outlook from "./outlook";
import roles from "./roles";
import socket from "./socket";
import subscription from "./subscription";
import ui from "./ui";

export default {
  auth,
  ui,
  outlook,
  brokers,
  cedents,
  lineOfRisk,
  activities,
  currencies,
  countries,
  claims,
  roles,
  socket,
  ...create,
  ...errors,
  ...subscription,
  ...closeAccount,
  ...emails,
  ...contacts,
  ...catalogs,
};
