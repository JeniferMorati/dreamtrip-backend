import { AuthRole } from "@providers/roles/roles.provider";
import { TravelRoute } from "routes/travel.routes";
import { UserRoute } from "routes/user.routes";

export const authenticatedRoutes: { [key: string]: AuthRole[] } = {
  [UserRoute.delete]: [AuthRole.Admin],
  [UserRoute.find]: [AuthRole.User],
  [UserRoute.update]: [AuthRole.User],
  [TravelRoute.create]: [AuthRole.Editor],
  [TravelRoute.delete]: [AuthRole.Editor],
  [TravelRoute.update]: [AuthRole.Editor],
};
