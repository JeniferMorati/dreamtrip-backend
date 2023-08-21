import { provide } from "inversify-binding-decorators";
import {
  IFavoriteListUseCaseRequestDTO,
  IFavoriteListUseCaseResponseDTO,
} from "./favorite-list.dto";
import { FavoriteRepository } from "@repositories/favorite/favorite.repository";
import { Report, StatusCode } from "@expressots/core";

@provide(FavoriteListUseCase)
class FavoriteListUseCase {
  constructor(private favoriteRepository: FavoriteRepository) {}

  async execute(
    data: IFavoriteListUseCaseRequestDTO,
  ): Promise<IFavoriteListUseCaseResponseDTO | null> {
    const favoriteList = await this.favoriteRepository.getFavoriteList(data.id);

    if (!favoriteList) {
      Report.Error(
        "Error on get favorite list",
        StatusCode.InternalServerError,
        "favoite-list-usecase",
      );

      return null;
    }

    const response = favoriteList.map((travel) => {
      return {
        ...travel,
        hasFavorite: true,
      };
    });

    return Promise.resolve(response);
  }
}

export { FavoriteListUseCase };
