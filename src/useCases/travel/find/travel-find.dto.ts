import { ITravelDestination } from "@entities/travel.entity";

interface ITravelFindRequestDTO {
  search: string;
}

type ITravelFindResponseDTO = ITravelDestination[];

export { ITravelFindRequestDTO, ITravelFindResponseDTO };
