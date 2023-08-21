import { CreateModule } from "@expressots/core";
import { FavoriteSendController } from "./send/favorite-send.controller";
import { FavoriteListController } from "./list/favorite-list.controller";

const FavoriteModule = CreateModule([
  FavoriteSendController,
  FavoriteListController,
]);

export { FavoriteModule };
