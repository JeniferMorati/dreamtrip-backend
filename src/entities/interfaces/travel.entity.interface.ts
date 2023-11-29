import { IEntity } from "@entities/base.entity";
import { Types } from "mongoose";

export interface ITravelGenericCategory {
  icon: string;
  label: string;
}

export interface ITravelGenericFeature extends ITravelGenericCategory {
  description?: string;
  active: boolean;
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

export interface IDateRange {
  openDate: Date;
  closeDate: Date;
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
  included?: ITravelGenericCategory[];
  rating?: number;
  price: number;
  dateRange: IDateRange;
  notes: INote[];
  accommodation?: ITravelGenericFeature[];
  itinerary: IItinerary[];
  gallery: string[];
  vacanciesPerPeriod: number;
  vacationPackageId?: Types.ObjectId;
  capacityPeople: number;
  additionalPerPerson: number;
}
