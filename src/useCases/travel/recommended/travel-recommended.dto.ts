import { ITravelDestination } from "@entities/travel.entity";

interface ITravelRecommendedRequestHeadersDTO {
  id: string;
}

type ITravelRecommendedRequestDTO = ITravelRecommendedRequestHeadersDTO;

type ITravelRecommendedResponseDTO = ITravelDestination[];

export { ITravelRecommendedRequestDTO, ITravelRecommendedResponseDTO };
