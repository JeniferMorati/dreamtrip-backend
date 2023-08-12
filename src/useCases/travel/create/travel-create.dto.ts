import { ITravelDestination } from "@entities/travel.entity";

type ICreateTravelRequestDTO = {
  image: Buffer;
  gallery: Buffer[];
} & ITravelDestination;

type ICreateTravelResponseDTO = ITravelDestination;

export { ICreateTravelRequestDTO, ICreateTravelResponseDTO };
