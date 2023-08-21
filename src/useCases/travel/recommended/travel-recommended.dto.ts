import { ITravelDestination } from "@entities/travel.entity";

interface ITravelRecommendedRequestHeadersDTO {
  id: string;
}

type ITravelRecommendedRequestDTO = {
  categories: string[];
} & ITravelRecommendedRequestHeadersDTO;

type ITravelRecommendedResponseDTO = ITravelDestination[];

export { ITravelRecommendedRequestDTO, ITravelRecommendedResponseDTO };
