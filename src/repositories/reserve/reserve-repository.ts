import { IReserve, Reserve, ReserveDocument } from "@entities/reserve.entity";
import { BaseRepository } from "@repositories/base-repository";
import { ITravelReserverdDate } from "@repositories/travel/travel.repository.interface";
import { provide } from "inversify-binding-decorators";

@provide(ReserveRepository)
export class ReserveRepository extends BaseRepository<
  IReserve,
  ReserveDocument
> {
  constructor() {
    super();
    this.model = Reserve;
  }

  async getReservedDatesForTravel(
    travelId: string,
  ): Promise<ITravelReserverdDate[]> {
    const reservations = await this.model.find({
      travel: travelId,
    });

    const reservationDates = reservations.map((reserve) => ({
      from: reserve.startDate,
      to: reserve.endDate,
    }));

    return reservationDates;
  }

  async isDateRangeAlreadyReserved(
    travelId: string,
    startDate: Date,
    endDate: Date,
  ): Promise<boolean> {
    const overlappingReservations: IReserve[] = await this.model.find({
      travel: travelId,
      $or: [
        { startDate: { $gte: startDate, $lte: endDate } },
        { endDate: { $gte: startDate, $lte: endDate } },
      ],
    });

    return overlappingReservations.length > 0;
  }
}
