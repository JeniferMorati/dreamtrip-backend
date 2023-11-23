import { ITravelApresentation } from "@repositories/travel/travel.repository.interface";

interface ITravelFindRequestDTO {
  search: string;
  startDate: Date;
  endDate: Date;
  user_id?: string;
}

type ITravelFindResponseApiDTO = ITravelApresentation;

type ITravelFindResponseDTO = ITravelFindResponseApiDTO[];

export {
  ITravelFindRequestDTO,
  ITravelFindResponseDTO,
  ITravelFindResponseApiDTO,
};
