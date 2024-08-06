import createBroker from "./broker";
import createCedent from "./cedent";
import createCompany from "./company";
import createUser from "./user";

export default {
  ...createBroker,
  ...createCedent,
  ...createCompany,
  ...createUser,
};
