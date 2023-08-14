import { ITip } from "@entities/tip.entity";

type ITipUpdateRequestDTO = {
  coverPhoto: Buffer;
} & ITip;

type ITipUpdateResponseDTO = ITip;

export { ITipUpdateRequestDTO, ITipUpdateResponseDTO };
