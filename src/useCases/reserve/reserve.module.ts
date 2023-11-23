import { CreateModule } from "@expressots/core";
import { ReserveCreateController } from "./create/reserve-create.controller";

const ReserveModule = CreateModule([ReserveCreateController]);

export { ReserveModule };
