import { CreateModule } from "@expressots/core";
import { TipCreateController } from "./create/tip-create.controller";
import { TipUpdateController } from "./update/tip-update.controller";
import { TipDeleteController } from "./delete/tip-delete.controller";
import { TipFindController } from "./find/tip-find.controller";
import { TipListController } from "./list/tip-list.controller";

const TipModule = CreateModule([
  TipCreateController,
  TipUpdateController,
  TipDeleteController,
  TipFindController,
  TipListController,
]);

export { TipModule };
