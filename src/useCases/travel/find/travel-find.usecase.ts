import { TravelRepository } from "@repositories/travel/travel.repository";
import { provide } from "inversify-binding-decorators";
import {
  ITravelFindRequestDTO,
  ITravelFindResponseDTO,
} from "./travel-find.dto";
import { Report, StatusCode } from "@expressots/core";
import { FavoriteRepository } from "@repositories/favorite/favorite.repository";
import { TravelDestination } from "@entities/travel.entity";

@provide(TravelFindUseCase)
class TravelFindUseCase {
  constructor(
    private travelRepository: TravelRepository,
    private favoriteRepository: FavoriteRepository,
  ) {}

  async execute(
    data: ITravelFindRequestDTO,
  ): Promise<ITravelFindResponseDTO | null> {
    let hasFavorited = false;
    const { search, user_id } = data;
    const travelList = await this.travelRepository.findByNameOrLocation(search);

    if (!travelList) {
      Report.Error(
        "Error on find travel",
        StatusCode.InternalServerError,
        "travel-find-usecase",
      );

      return null;
    }

    const resultList = await Promise.all(
      travelList.map(async (travel) => {
        if (user_id) {
          const checkFavorited =
            await this.favoriteRepository.getFavoriteTravel(travel.id, user_id);

          hasFavorited = !!checkFavorited?.status;
        }

        const newTravel = new TravelDestination(travel);

        const travelObject = newTravel.toObject();

        return {
          ...travelObject,
          hasFavorited: !!hasFavorited,
        };
      }),
    );

    if (!resultList) {
      Report.Error(
        "Error on find travel",
        StatusCode.InternalServerError,
        "travel-find-usecase",
      );

      return null;
    }

    return Promise.resolve(resultList);
  }
}

export { TravelFindUseCase };
