import { AuthRole } from "@providers/roles/roles.provider";
import { FavoriteRoute } from "routes/favorites.routes";
import { ReviewRoute } from "routes/review.routes";
import { TipRoute } from "routes/tip.routes";
import { TravelRoute } from "routes/travel.routes";
import { UpvoteRoute } from "routes/upvote.routes";
import { UserRoute } from "routes/user.routes";

const favoriteRoutes: { [key: string]: AuthRole[] } = {
  [FavoriteRoute.send]: [AuthRole.User],
};

const travelRoutes: { [key: string]: AuthRole[] } = {
  [TravelRoute.create]: [AuthRole.Editor],
  [TravelRoute.delete]: [AuthRole.Editor],
  [TravelRoute.update]: [AuthRole.Editor],
  [TravelRoute.find]: [AuthRole.Guest],
  [TravelRoute.recommended]: [AuthRole.User],
};

const userRoutes: { [key: string]: AuthRole[] } = {
  [UserRoute.delete]: [AuthRole.Admin],
  [UserRoute.find]: [AuthRole.User],
  [UserRoute.update]: [AuthRole.User],
};

const tipRoutes: { [key: string]: AuthRole[] } = {
  [TipRoute.find]: [AuthRole.Guest],
  [TipRoute.list]: [AuthRole.Guest],
  [TipRoute.delete]: [AuthRole.Editor],
  [TipRoute.create]: [AuthRole.Editor],
  [TipRoute.update]: [AuthRole.Editor],
};

const upvoteRoutes: { [key: string]: AuthRole[] } = {
  [UpvoteRoute.send]: [AuthRole.User],
};

const reviewRoutes: { [key: string]: AuthRole[] } = {
  [ReviewRoute.list]: [AuthRole.Guest],
  [ReviewRoute.delete]: [AuthRole.User],
  [ReviewRoute.create]: [AuthRole.User],
  [ReviewRoute.update]: [AuthRole.User],
};

export const authenticatedRoutes: { [key: string]: AuthRole[] } = {
  ...userRoutes,
  ...travelRoutes,
  ...tipRoutes,
  ...upvoteRoutes,
  ...favoriteRoutes,
  ...reviewRoutes,
};
