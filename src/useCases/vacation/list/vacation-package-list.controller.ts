import { BaseController, StatusCode } from "@expressots/core";
import {
  controller,
  httpGet,
  requestHeaders,
  requestParam,
  response,
} from "inversify-express-utils";
import { Response } from "express";
import { VacationPackageUseCase } from "./vacation-package-list.usecase";
import {
  IVacationPackageRequestDTO,
  IVacationPackageResponseDTO,
} from "./vacation-package-list.dto";
import { VacationPackageRoute } from "routes/vacation-package.routes";
import authMiddleware from "@providers/middlewares/AuthMiddleware/authmiddleware.provider";

@controller(VacationPackageRoute.list)
class VacationPackageListController extends BaseController {
  constructor(private vacationPackageUseCase: VacationPackageUseCase) {
    super();
  }

  @httpGet("/", authMiddleware)
  async execute(
    @response() res: Response,
    @requestParam("id") payload: IVacationPackageRequestDTO,
    @requestHeaders("decoded") decoded,
  ): Promise<IVacationPackageResponseDTO> {
    return this.callUseCaseAsync(
      this.vacationPackageUseCase.execute({
        ...payload,
        user_id: decoded.id,
      }),
      res,
      StatusCode.OK,
    );
  }
}

export { VacationPackageListController };
