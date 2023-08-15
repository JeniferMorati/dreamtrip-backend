import { ITip } from "@entities/tip.entity";
import { Types } from "mongoose";

interface ITipFindRequestDTO {
  id: string;
  user_id?: Types.ObjectId;
}

type ITipFindResponseDTO = ITip & {
  hasUpvoted: boolean;
};

export { ITipFindRequestDTO, ITipFindResponseDTO };
