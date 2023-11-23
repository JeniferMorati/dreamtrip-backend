import { provide } from "inversify-binding-decorators";
import { ITravelPopularResponseDTO } from "./travel-popular.dto";
import { TravelRepository } from "@repositories/travel/travel.repository";
import { Report, StatusCode } from "@expressots/core";

@provide(TravelPopularUseCase)
class TravelPopularUseCase {
  constructor(private travelRepository: TravelRepository) {}

  async execute(): Promise<ITravelPopularResponseDTO | null> {
    const popularLocations = await this.travelRepository.getPopularTravels(5);

    if (!popularLocations) {
      Report.Error(
        "Error on popular travels",
        StatusCode.InternalServerError,
        "travel-popular-usecase",
      );

      return null;
    }

    return popularLocations;
  }
}

export { TravelPopularUseCase };
