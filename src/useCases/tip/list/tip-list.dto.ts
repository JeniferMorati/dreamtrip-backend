import { ITip } from "@entities/tip.entity";

type ITipListRequestDTO = {
  id: string;
};

type ITipListResponseAPI = ITip & {
  hasUpvoted: boolean;
};

type ITipListResponseDTO = ITipListResponseAPI[];

export { ITipListResponseDTO, ITipListRequestDTO };
