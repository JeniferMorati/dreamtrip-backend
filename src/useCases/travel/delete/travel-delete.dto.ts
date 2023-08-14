import { ITravelDestination } from "@entities/travel.entity";

interface ITravelDeleteRequestDTO {
  related_id: string;
  id: string;
}

interface ITravelDeleteResponseDTO extends ITravelDestination {
  status: string;
}

export { ITravelDeleteRequestDTO, ITravelDeleteResponseDTO };
