import { CreateModule } from "@expressots/core";
import { CreateTravelController } from "./create/travel-create.controller";

const TravelModule = CreateModule([CreateTravelController]);

export { TravelModule };
