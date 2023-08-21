import { provide } from "inversify-binding-decorators";
import {
  ITravelRecommendedRequestDTO,
  ITravelRecommendedResponseDTO,
} from "./travel-recommended.dto";
import { UserRepository } from "@repositories/user/user.repository";
import { TravelRepository } from "@repositories/travel/travel.repository";
import { Report, StatusCode } from "@expressots/core";

@provide(TravelRecommendedUseCase)
class TravelRecommendedUseCase {
  constructor(
    private userRepository: UserRepository,
    private travelRepository: TravelRepository,
  ) {}

  async execute(
    data: ITravelRecommendedRequestDTO,
  ): Promise<ITravelRecommendedResponseDTO | null> {
    const userInteresteds = await this.userRepository.getInterests(data.id);

    if (!userInteresteds) {
      Report.Error(
        "Error on recommended travels",
        StatusCode.InternalServerError,
        "travel-recommended-usecase",
      );

      return null;
    }

    const getTravels = await this.travelRepository.getRecommendedTravels(
      userInteresteds,
    );

    if (!getTravels) {
      Report.Error(
        "Error on recommended travels",
        StatusCode.InternalServerError,
        "travel-recommended-usecase",
      );

      return null;
    }

    return getTravels;
  }
}

export { TravelRecommendedUseCase };
