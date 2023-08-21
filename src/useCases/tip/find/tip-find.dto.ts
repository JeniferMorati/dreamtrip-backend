import { ITip } from "@entities/tip.entity";

interface ITipFindRequestHeadersDTO {
  user_id?: string;
}

type ITipFindRequestDTO = {
  id: string;
} & ITipFindRequestHeadersDTO;

type ITipFindResponseDTO = ITip & {
  hasUpvoted: boolean;
};

export { ITipFindRequestDTO, ITipFindResponseDTO };
