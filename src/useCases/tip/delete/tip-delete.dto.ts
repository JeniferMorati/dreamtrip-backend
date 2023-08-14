import { ITip } from "@entities/tip.entity";

interface ITipDeleteRequestDTO {
  id: string;
}

type ITipDeleteResponseDTO = ITip;

export { ITipDeleteRequestDTO, ITipDeleteResponseDTO };
