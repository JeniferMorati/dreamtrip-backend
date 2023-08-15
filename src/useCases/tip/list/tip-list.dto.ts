import { ITip } from "@entities/tip.entity";
import { Types } from "mongoose";

type ITipListRequestDTO = {
  user_id?: Types.ObjectId;
};

type ITipListResponseAPI = ITip & {
  hasUpvoted: boolean;
};

type ITipListResponseDTO = ITipListResponseAPI[];

export { ITipListResponseDTO, ITipListRequestDTO };
