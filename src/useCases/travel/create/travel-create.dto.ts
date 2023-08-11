import { ITravelDestination } from "@entities/travel.entity";

type ICreateTravelRequestDTO = {
  image: Buffer;
} & ITravelDestination;

type ICreateTravelResponseDTO = ITravelDestination;

export { ICreateTravelRequestDTO, ICreateTravelResponseDTO };
