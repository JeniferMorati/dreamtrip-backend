import {
  IDateRange,
  IItinerary,
  ILocation,
  INote,
  ITravelDestination,
  ITravelGenericCategory,
  ITravelGenericFeature,
} from "@entities/interfaces/travel.entity.interface";

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
  price: number;
  dateRange?: IDateRange;
  notes: INote[];
  accommodation?: ITravelGenericFeature[];
  itinerary: IItinerary[];
  gallery: Buffer[];
}

type ITravelUpdateResponseDTO = ITravelDestination;

export { ITravelUpdateRequestDTO, ITravelUpdateResponseDTO };
