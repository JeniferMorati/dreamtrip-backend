import { BaseController, StatusCode } from "@expressots/core";
import {
  controller,
  httpGet,
  httpPatch,
  response,
} from "inversify-express-utils";
import { Response } from "express";
import { VacationLinkedUseCase } from "./vacation-linked.usecase";
import { IVacationLinkedResponseDTO } from "./vacation-linked.dto";
import { VacationPackageRoute } from "routes/vacation-package.routes";
import authMiddleware from "@providers/middlewares/AuthMiddleware/authmiddleware.provider";

@controller(VacationPackageRoute.linked)
class VacationLinkedController extends BaseController {
  constructor(private vacationLinkedUseCase: VacationLinkedUseCase) {
    super();
  }

  @httpPatch("/", authMiddleware)
  execute(@response() res: Response): IVacationLinkedResponseDTO {
    return this.callUseCase(
      this.vacationLinkedUseCase.execute(),
      res,
      StatusCode.OK,
    );
  }
}

export { VacationLinkedController };
