import { ITravelDestination } from "@entities/travel.entity";

interface IFavoriteSendRequestDTO {
  travel_id: string;
}

interface IFavoriteSendRequestHeadersDTO {
  id: string;
}

type IFavoriteSendResponseDTO = ITravelDestination & {
  message: string;
};

type IFavoriteSendUseCaseParamsDTO = IFavoriteSendRequestDTO &
  IFavoriteSendRequestHeadersDTO;

export {
  IFavoriteSendRequestDTO,
  IFavoriteSendResponseDTO,
  IFavoriteSendUseCaseParamsDTO,
  IFavoriteSendRequestHeadersDTO,
};
