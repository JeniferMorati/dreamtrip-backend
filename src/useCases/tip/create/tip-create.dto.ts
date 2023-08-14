import { ITip } from "@entities/tip.entity";

type ITipCreateRequestDTO = {
  coverPhoto: Buffer;
} & ITip;

type ITipCreateResponseDTO = ITip;

export { ITipCreateRequestDTO, ITipCreateResponseDTO };
