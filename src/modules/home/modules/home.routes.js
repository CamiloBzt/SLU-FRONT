import { facultativeRoutes } from "./facultative/facultative.router";
import { walletWoutes } from "./wallet/wallet.router";
import { endorsementRoutes } from "./endorsements/endorsements.router";
import { reinsurersRoutes } from "./reinsurers/reinsurers.router";
import { claimsRoutes } from "./claims/claims.router";
export const HomeRoutes = [
  ...facultativeRoutes,
  ...endorsementRoutes,
  ...walletWoutes,
  ...reinsurersRoutes,
  ...claimsRoutes,
];
