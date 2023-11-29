import { ITravelDestination, TravelDestination } from "@entities/travel.entity";
import {
  IVacationPackage,
  VacationPackage,
  VacationPackageDocument,
} from "@entities/vacation-package.entity";
import { Report, StatusCode } from "@expressots/core";
import { BaseRepository } from "@repositories/base-repository";
import { provide } from "inversify-binding-decorators";

@provide(VacationPackageRepository)
export class VacationPackageRepository extends BaseRepository<
  IVacationPackage,
  VacationPackageDocument
> {
  constructor() {
    super();
    this.model = VacationPackage;
  }

  async getVacationPackages(id: string): Promise<ITravelDestination[] | null> {
    try {
      const vacationPackage = await this.model.findById(id);

      if (!vacationPackage) {
        Report.Error(
          "Vacation package not found",
          StatusCode.NoContent,
          "vacation-package-repository",
        );

        return null;
      }

      const travelPresentations = await TravelDestination.find({
        vacationPackageId: id,
      }).exec();

      const travelApresentations = travelPresentations.map((travel) =>
        travel.toObject(),
      );

      return travelApresentations;
    } catch (error: any) {
      if (error?.statusCode === 204) {
        Report.Error(
          "No vacations package linked",
          StatusCode.NoContent,
          "vacation-package-repository",
        );

        return null;
      }

      Report.Error(
        "Failed to get recommended travels",
        StatusCode.InternalServerError,
        "vacation-package-repository",
      );
      return null;
    }
  }
}
