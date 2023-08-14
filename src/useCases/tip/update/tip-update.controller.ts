import { BaseController, StatusCode } from "@expressots/core";
import {
  controller,
  httpPatch,
  request,
  requestBody,
  response,
} from "inversify-express-utils";
import { Response } from "express";
import { TipUpdateUseCase } from "./tip-update.usecase";
import { ITipUpdateRequestDTO, ITipUpdateResponseDTO } from "./tip-update.dto";
import multer from "multer";
import authMiddleware from "@providers/middlewares/AuthMiddleware/authmiddleware.provider";
import { TipRoute } from "routes/tip.routes";

const storage = multer.memoryStorage();
const upload = multer({ storage });

@controller(TipRoute.update)
class TipUpdateController extends BaseController {
  constructor(private tipUpdateUseCase: TipUpdateUseCase) {
    super("tip-update-controller");
  }

  @httpPatch("/", upload.single("coverPhoto"), authMiddleware)
  async execute(
    @response() res: Response,
    @requestBody() payload: ITipUpdateRequestDTO,
    @request() req,
  ): Promise<ITipUpdateResponseDTO> {
    if (req.file) {
      const coverPhotoBuffer = req.file.buffer;
      payload.coverPhoto = coverPhotoBuffer;
    }
    return this.callUseCaseAsync(
      this.tipUpdateUseCase.execute(payload),
      res,
      StatusCode.OK,
    );
  }
}

export { TipUpdateController };
