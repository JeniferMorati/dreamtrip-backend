import { BaseController, StatusCode } from "@expressots/core";
import {
  controller,
  httpPost,
  requestBody,
  request,
  response,
} from "inversify-express-utils";
import { Response } from "express";
import { TipCreateUseCase } from "./tip-create.usecase";
import { ITipCreateRequestDTO, ITipCreateResponseDTO } from "./tip-create.dto";
import multer from "multer";
import authMiddleware from "@providers/middlewares/AuthMiddleware/authmiddleware.provider";
import { TipRoute } from "routes/tip.routes";

const storage = multer.memoryStorage();
const upload = multer({ storage });

@controller(TipRoute.create)
class TipCreateController extends BaseController {
  constructor(private tipCreateUseCase: TipCreateUseCase) {
    super("tip-create-controller");
  }

  @httpPost("/", upload.single("coverPhoto"), authMiddleware)
  async execute(
    @response() res: Response,
    @requestBody() payload: ITipCreateRequestDTO,
    @request() req,
  ): Promise<ITipCreateResponseDTO> {
    if (req.file) {
      const coverPhotoBuffer = req.file.buffer;
      payload.coverPhoto = coverPhotoBuffer;
    }

    return this.callUseCaseAsync(
      this.tipCreateUseCase.execute(payload),
      res,
      StatusCode.OK,
    );
  }
}

export { TipCreateController };
