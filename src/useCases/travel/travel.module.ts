import { CreateModule } from "@expressots/core";
import { CreateTravelController } from "./create/travel-create.controller";
import { TravelFindController } from "./find/travel-find.controller";

const TravelModule = CreateModule([
  CreateTravelController,
  TravelFindController,
]);

export { TravelModule };
