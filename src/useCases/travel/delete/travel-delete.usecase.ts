import { Report, StatusCode } from "@expressots/core";
import {
  ITravelDeleteRequestDTO,
  ITravelDeleteResponseDTO,
} from "./travel-delete.dto";
import { provide } from "inversify-binding-decorators";
import { TravelRepository } from "@repositories/travel/travel.repository";

@provide(TravelDeleteUseCase)
class TravelDeleteUseCase {
  constructor(private travelRepository: TravelRepository) {}

  async execute(
    data: ITravelDeleteRequestDTO,
  ): Promise<ITravelDeleteResponseDTO | void> {
    const { id } = data;

    const travel = await this.travelRepository.findById(id);

    if (!travel) {
      Report.Error("User not found", StatusCode.BadRequest, "user-delete");
    }

    const userDeleted = await this.travelRepository.delete(id);

    if (!userDeleted) {
      Report.Error("User not deleted", StatusCode.BadRequest, "user-delete");
    }

    if (userDeleted) {
      const userDataReturn = {
        ...userDeleted,
        status: "User deleted successfully",
      };

      return Promise.resolve(userDataReturn);
    }
  }
}

export { TravelDeleteUseCase };
