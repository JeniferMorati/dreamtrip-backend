import { AppContainer } from "@expressots/core";
import { UserModule } from "@useCases/user/user.module";
import { TravelModule } from "@useCases/travel/travel.module";
import { TipModule } from "@useCases/tip/tip.module";
import { UpvoteModule } from "@useCases/upvote/upvote.module";
import { FavoriteModule } from "@useCases/favorite/favorite.module";
import { ReviewModule } from "@useCases/review/review.module";

const appContainer = new AppContainer();

const container = appContainer.create([
  UserModule,
  TravelModule,
  TipModule,
  UpvoteModule,
  FavoriteModule,
  ReviewModule,
]);

export { container };
