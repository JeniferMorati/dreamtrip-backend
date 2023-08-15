import { AuthRole } from "@providers/roles/roles.provider";
import { TipRoute } from "routes/tip.routes";
import { TravelRoute } from "routes/travel.routes";
import { UpvoteRoute } from "routes/upvote.routes";
import { UserRoute } from "routes/user.routes";

const travelRoutes: { [key: string]: AuthRole[] } = {
  [TravelRoute.create]: [AuthRole.Editor],
  [TravelRoute.delete]: [AuthRole.Editor],
  [TravelRoute.update]: [AuthRole.Editor],
};

const userRoutes: { [key: string]: AuthRole[] } = {
  [UserRoute.delete]: [AuthRole.Admin],
  [UserRoute.find]: [AuthRole.User],
  [UserRoute.update]: [AuthRole.User],
};

const tipRoutes: { [key: string]: AuthRole[] } = {
  [TipRoute.delete]: [AuthRole.Editor],
  [TipRoute.create]: [AuthRole.Editor],
  [TipRoute.update]: [AuthRole.Editor],
};

const upvoteRoutes: { [key: string]: AuthRole[] } = {
  [UpvoteRoute.send]: [AuthRole.User],
  [UpvoteRoute.remove]: [AuthRole.User],
};

export const authenticatedRoutes: { [key: string]: AuthRole[] } = {
  ...userRoutes,
  ...travelRoutes,
  ...tipRoutes,
  ...upvoteRoutes,
};
