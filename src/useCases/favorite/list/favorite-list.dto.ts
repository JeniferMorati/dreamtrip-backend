import { ITravelDestination } from "@entities/travel.entity";

type IFavoriteListResponseDTO = ITravelDestination & {
  hasFavorite: boolean;
};

type IFavoriteListUseCaseResponseDTO = IFavoriteListResponseDTO[];

interface IFavoriteListRequestHeaders {
  id: string;
}

type IFavoriteListUseCaseRequestDTO = IFavoriteListRequestHeaders;

export {
  IFavoriteListResponseDTO,
  IFavoriteListUseCaseResponseDTO,
  IFavoriteListRequestHeaders,
  IFavoriteListUseCaseRequestDTO,
};
