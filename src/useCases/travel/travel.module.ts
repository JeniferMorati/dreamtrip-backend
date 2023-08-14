import { CreateModule } from "@expressots/core";
import { CreateTravelController } from "./create/travel-create.controller";
import { TravelFindController } from "./find/travel-find.controller";
import { TravelUpdateController } from "./update/travel-update.controller";
import { TravelDeleteController } from "./delete/travel-delete.controller";

const TravelModule = CreateModule([
  CreateTravelController,
  TravelFindController,
  TravelUpdateController,
  TravelDeleteController,
]);

export { TravelModule };
