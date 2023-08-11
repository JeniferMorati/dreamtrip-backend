import { IEntity } from "@entities/base.entity";
import { UserDocument } from "@entities/user.entity";

export interface ITravelGenericCategory {
  icon: string;
  label: string;
}

export interface ITravelGenericFeature extends ITravelGenericCategory {
  description?: string;
  active: boolean;
}

export interface ITravelReview {
  user: UserDocument;
  comment: string;
  rating: number;
  date: Date;
}

export interface ILocation {
  city: string;
  country: string;
  state?: string;
  address?: string;
  zipCode?: string;
  coordinates?: {
    latitude: number;
    longitude: number;
  };
}

export interface IAvailableDate {
  startDate: Date;
  endDate: Date;
}

export interface INote {
  title: string;
  content: string;
  date: Date;
}

export interface IItinerary {
  activity: string;
  date: Date;
  time: string;
  notes: string;
}

export interface ITravelDestination extends IEntity {
  name: string;
  description: string;
  location: ILocation;
  image?: string;
  imageVersion?: string;
  category?: ITravelGenericCategory[];
  rating?: number;
  reviews: ITravelReview[];
  price: number;
  availableDates: IAvailableDate[];
  notes: INote[];
  accommodation?: ITravelGenericFeature[];
  itinerary: IItinerary[];
}
