import {
  IAvailableDate,
  IItinerary,
  ILocation,
  INote,
  ITravelGenericCategory,
  ITravelGenericFeature,
  ITravelReview,
} from "@entities/interfaces/travel.entity.interface";
import { ITravelDestination } from "@entities/travel.entity";

interface ITravelUpdateRequestDTO {
  id: string;
  name: string;
  description: string;
  location: ILocation;
  image?: Buffer;
  imageVersion?: string;
  category?: ITravelGenericCategory[];
  included?: ITravelGenericCategory[];
  rating?: number;
  reviews?: ITravelReview[];
  price: number;
  availableDates?: IAvailableDate[];
  notes: INote[];
  accommodation?: ITravelGenericFeature[];
  itinerary: IItinerary[];
  gallery: Buffer[];
}

type ITravelUpdateResponseDTO = ITravelDestination;

export { ITravelUpdateRequestDTO, ITravelUpdateResponseDTO };
