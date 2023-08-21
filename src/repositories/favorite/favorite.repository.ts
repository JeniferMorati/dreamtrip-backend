import {
  Favorite,
  FavoriteDocument,
  IFavorite,
} from "@entities/favorite.entity";
import { ITravelDestination, TravelDestination } from "@entities/travel.entity";
import { Report, StatusCode } from "@expressots/core";

import { BaseRepository } from "@repositories/base-repository";
import { TravelRepository } from "@repositories/travel/travel.repository";
import { provide } from "inversify-binding-decorators";

@provide(FavoriteRepository)
export class FavoriteRepository extends BaseRepository<
  IFavorite,
  FavoriteDocument
> {
  constructor(private travelRepository: TravelRepository) {
    super();
    this.model = Favorite;
  }

  async getFavoriteList(user_id?: string): Promise<ITravelDestination[]> {
    if (!user_id) return [];

    try {
      const favoriteIds = await Favorite.find({ user: user_id });

      const travelIds = favoriteIds.map((favorite) => favorite.travel);

      const travels = await TravelDestination.find({ _id: { $in: travelIds } });

      return travels.map((travel) => new TravelDestination(travel).toObject());
    } catch (error) {
      Report.Error(
        "Error to find favorite list",
        StatusCode.InternalServerError,
        "favorite-repository",
      );
      throw error;
    }
  }

  async getFavoriteTravel(travel_id: string, user_id?: string) {
    if (!user_id)
      return {
        travel: travel_id,
        status: false,
      };

    try {
      const findTravel = await Favorite.findOne({
        travel: travel_id,
        user: user_id,
      });

      return {
        travel: findTravel?.id || travel_id,
        status: !!findTravel,
      };
    } catch (error) {
      Report.Error(
        "Error to find travel",
        StatusCode.InternalServerError,
        "favorite-repository",
      );
    }
  }
}
