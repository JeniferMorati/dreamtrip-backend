import { CreateModule } from "@expressots/core";
import { VacationPackageListController } from "./list/vacation-package-list.controller";
import { VacationLinkedController } from "./linked/vacation-linked.controller";

const VacationModule = CreateModule([
  VacationPackageListController,
  VacationLinkedController,
]);

export { VacationModule };
