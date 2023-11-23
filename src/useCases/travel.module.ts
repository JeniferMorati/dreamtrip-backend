import { CreateModule } from "@expressots/core";
import { FindOneController } from "./travel/findOne/find-one.controller";

export const TravelModule = CreateModule([FindOneController]);
