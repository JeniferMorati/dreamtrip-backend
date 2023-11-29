import { FavoriteRepository } from "@repositories/favorite/favorite.repository";
import { ReserveRepository } from "@repositories/reserve/reserve-repository";
import { TravelRepository } from "@repositories/travel/travel.repository";
import { provide } from "inversify-binding-decorators";
import { ITravelFindResponseApiDTO } from "../find/travel-find.dto";
import { Report, StatusCode } from "@expressots/core";
import { ITravelFindOneRequestDTO } from "./find-one.dto";

@provide(TravelFindOneUseCase)
export class TravelFindOneUseCase {
  constructor(
    private travelRepository: TravelRepository,
    private favoriteRepository: FavoriteRepository,
    private reserveRepository: ReserveRepository,
  ) {}
  async execute(
    data: ITravelFindOneRequestDTO,
  ): Promise<ITravelFindResponseApiDTO | null> {
    const { id, user_id } = data;
    const travel = await this.travelRepository.findById(id);

    if (!travel) {
      Report.Error(
        "Error on find travel",
        StatusCode.InternalServerError,
        "travel-findone-usecase",
      );

      return null;
    }
    const checkFavorited = await this.favoriteRepository.getFavoriteTravel(
      travel.id,
      user_id,
    );

    const reservedDates =
      await this.reserveRepository.getReservedDatesForTravel(travel.id);

    const travelObject = travel.toObject();
    const hasFavorited = !!checkFavorited?.status;

    return {
      ...travelObject,
      reservedDates,
      hasFavorited: !!hasFavorited,
    };
  }
}
