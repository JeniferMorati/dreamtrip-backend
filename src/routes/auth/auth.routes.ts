import { AuthRole } from "@providers/roles/roles.provider";
import { TravelRoute } from "routes/travel.routes";
import { UserRoute } from "routes/user.routes";

export const authenticatedRoutes: { [key: string]: AuthRole[] } = {
  [TravelRoute.create]: [AuthRole.Editor],
  [UserRoute.delete]: [AuthRole.Admin],
  [UserRoute.update]: [AuthRole.User],
  [UserRoute.find]: [AuthRole.User],
};
