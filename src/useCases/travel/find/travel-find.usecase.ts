import { TravelRepository } from "@repositories/travel/travel.repository";
import { provide } from "inversify-binding-decorators";
import {
  ITravelFindRequestDTO,
  ITravelFindResponseDTO,
} from "./travel-find.dto";

@provide(TravelFindUseCase)
class TravelFindUseCase {
  constructor(private travelRepository: TravelRepository) {}

  async execute(
    data: ITravelFindRequestDTO,
  ): Promise<ITravelFindResponseDTO | null> {
    const { search } = data;

    const result = await this.travelRepository.findByNameOrLocation(search);

    return result;
  }
}

export { TravelFindUseCase };
