import { ITravelDestination } from "@entities/travel.entity";

export type ITravelReserverdDate = {
  from: Date;
  to: Date;
};

export type ITravelApresentation = ITravelDestination & {
  reservedDates: ITravelReserverdDate[];
  hasFavorited: boolean;
};
