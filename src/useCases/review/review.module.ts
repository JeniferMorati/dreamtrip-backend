import { CreateModule } from "@expressots/core";
import { ReviewCreateController } from "./create/review-create.controller";
import { ReviewListController } from "./list/review-list.controller";
import { ReviewDeleteController } from "./delete/review-delete.controller";
import { ReviewUpdateController } from "./update/review-update.controller";

const ReviewModule = CreateModule([
  ReviewCreateController,
  ReviewListController,
  ReviewDeleteController,
  ReviewUpdateController,
]);

export { ReviewModule };
