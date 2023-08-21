import { provide } from "inversify-binding-decorators";
import {
  IFavoriteSendResponseDTO,
  IFavoriteSendUseCaseParamsDTO,
} from "./favorite-send.dto";
import { TravelRepository } from "@repositories/travel/travel.repository";
import { Report, StatusCode } from "@expressots/core";
import { FavoriteRepository } from "@repositories/favorite/favorite.repository";
import { Favorite } from "@entities/favorite.entity";
import { TravelDestination } from "@entities/travel.entity";

@provide(FavoriteSendUseCase)
class FavoriteSendUseCase {
  constructor(
    private travelRepository: TravelRepository,
    private favoriteRepository: FavoriteRepository,
  ) {}

  async execute(
    data: IFavoriteSendUseCaseParamsDTO,
  ): Promise<IFavoriteSendResponseDTO | null> {
    const existTravel = await this.travelRepository.findById(data.travel_id);

    if (!existTravel) {
      Report.Error(
        "Travel not exist",
        StatusCode.NotFound,
        "favorite-send-usecase",
      );

      return null;
    }

    const travel = new TravelDestination(existTravel.toObject());

    const favoriteTravel = await this.favoriteRepository.getFavoriteTravel(
      data.travel_id,
      data.id,
    );

    if (!favoriteTravel) {
      Report.Error(
        "Error on add favorite travel",
        StatusCode.InternalServerError,
        "favorite-send-usecase",
      );

      return null;
    }

    if (favoriteTravel?.status) {
      console.log(favoriteTravel);
      const removeFavoriteTravel = await this.favoriteRepository.delete(
        favoriteTravel.travel,
      );

      if (!removeFavoriteTravel) {
        Report.Error(
          "Error on remove favorite travel",
          StatusCode.InternalServerError,
          "favorite-send-usecase",
        );

        return null;
      }

      return Promise.resolve({
        ...travel.toObject(),
        message: "removed",
      });
    }

    const newFavoriteAdd = new Favorite({
      travel: travel.id,
      user: data.id,
    });

    const addTravelToFavorites = await this.favoriteRepository.create(
      newFavoriteAdd,
    );

    if (!addTravelToFavorites) {
      Report.Error(
        "Error on add favorite travel",
        StatusCode.InternalServerError,
        "favorite-send-usecase",
      );

      return null;
    }

    return Promise.resolve({
      ...travel.toObject(),
      message: "add",
    });
  }
}

export { FavoriteSendUseCase };
