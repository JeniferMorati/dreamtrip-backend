import { provide } from "inversify-binding-decorators";
import {
  IVacationPackageRequestDTO,
  IVacationPackageResponseDTO,
} from "./vacation-package-list.dto";
import { VacationPackageRepository } from "@repositories/vacation-package/vacation-package.repository";
import { Report, StatusCode } from "@expressots/core";
import { ReserveRepository } from "@repositories/reserve/reserve-repository";
import { FavoriteRepository } from "@repositories/favorite/favorite.repository";
import { TravelDestination } from "@entities/travel.entity";

@provide(VacationPackageUseCase)
class VacationPackageUseCase {
  constructor(
    private vacationPackageRepository: VacationPackageRepository,
    private reserveRepository: ReserveRepository,
    private favoriteRepository: FavoriteRepository,
  ) {}

  async execute(
    data: IVacationPackageRequestDTO,
  ): Promise<IVacationPackageResponseDTO | null> {
    const travelList = await this.vacationPackageRepository.getVacationPackages(
      data.package_id,
    );

    if (!travelList) {
      Report.Error(
        "Vacation pacakge error",
        StatusCode.InternalServerError,
        "vacation-package-list",
      );

      return null;
    }

    const resultList = await Promise.all(
      travelList.map(async (travel) => {
        let hasFavorited = false;
        const reservedDates =
          await this.reserveRepository.getReservedDatesForTravel(travel.id);

        if (data?.user_id) {
          const checkFavorited =
            await this.favoriteRepository.getFavoriteTravel(
              travel.id,
              data.user_id,
            );

          hasFavorited = !!checkFavorited?.status;
        }

        const newTravel = new TravelDestination(travel);

        const travelObject = newTravel.toObject();

        return {
          ...travelObject,
          reservedDates,
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

export { VacationPackageUseCase };
