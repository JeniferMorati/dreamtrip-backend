import { BaseController, StatusCode } from "@expressots/core";
import {
  controller,
  httpPatch,
  requestBody,
  requestHeaders,
  response,
} from "inversify-express-utils";
import { Response } from "express";
import { TravelUpdateUseCase } from "./travel-update.usecase";
import {
  ITravelUpdateRequestDTO,
  ITravelUpdateResponseDTO,
} from "./travel-update.dto";
import { TravelRoute } from "routes/travel.routes";
import authMiddleware from "@providers/middlewares/AuthMiddleware/authmiddleware.provider";
import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({ storage });

@controller(TravelRoute.update)
class TravelUpdateController extends BaseController {
  constructor(private travelUpdateUseCase: TravelUpdateUseCase) {
    super("travel-update-controller");
  }

  @httpPatch(
    "/",
    upload.fields([
      {
        name: "gallery",
        maxCount: 5,
      },
      {
        name: "image",
        maxCount: 1,
      },
    ]),
    authMiddleware,
  )
  execute(
    @response() res: Response,
    @requestBody() payload: ITravelUpdateRequestDTO,
    @requestHeaders() req,
  ): ITravelUpdateResponseDTO {
    let gallery = payload.gallery
      ? (payload.gallery as unknown as Buffer[])
      : [];
    let image = payload.image ? (payload.image as unknown as Buffer) : "";

    if (req?.files) {
      const storages = req.files;
      if (storages?.image) image = storages.image[0].buffer;
      if (storages?.gallery)
        gallery = storages.gallery.map(
          (file: Express.Multer.File) => file.buffer,
        );
    }

    const data = { ...payload, image, gallery } as ITravelUpdateRequestDTO;

    return this.callUseCase(
      this.travelUpdateUseCase.execute(data),
      res,
      StatusCode.OK,
    );
  }
}

export { TravelUpdateController };
