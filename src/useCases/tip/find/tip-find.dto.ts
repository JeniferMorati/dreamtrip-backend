import { ITip } from "@entities/tip.entity";

interface ITipFindRequestDTO {
  id: string;
}

type ITipFindResponseDTO = ITip;

export { ITipFindRequestDTO, ITipFindResponseDTO };
