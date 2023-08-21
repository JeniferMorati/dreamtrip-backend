import { ITravelDestination } from "@entities/travel.entity";

interface ITravelFindRequestDTO {
  search: string;
  user_id?: string;
}

type ITravelFindResponseApiDTO = ITravelDestination & {
  hasFavorited: boolean;
};

type ITravelFindResponseDTO = ITravelFindResponseApiDTO[];

export { ITravelFindRequestDTO, ITravelFindResponseDTO };
