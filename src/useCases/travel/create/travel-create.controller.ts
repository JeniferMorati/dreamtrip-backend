import { BaseController, StatusCode } from "@expressots/core";
import {
  controller,
  httpPost,
  request,
  requestBody,
  requestHeaders,
  response,
} from "inversify-express-utils";
import { Request, Response } from "express";
import { CreateTravelUseCase } from "./travel-create.usecase";
import multer from "multer";
import {
  ICreateTravelRequestDTO,
  ICreateTravelResponseDTO,
} from "./travel-create.dto";
import { TravelRoute } from "routes/travel.routes";
import authMiddleware from "@providers/middlewares/AuthMiddleware/authmiddleware.provider";

const storage = multer.memoryStorage();

const upload = multer({ storage });

@controller(TravelRoute.create, authMiddleware)
class CreateTravelController extends BaseController {
  constructor(private createUseCase: CreateTravelUseCase) {
    super("create-controller");
  }

  @httpPost(
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
  )
  async execute(
    @requestBody() payload: ICreateTravelRequestDTO,
    @response() res: Response,
    @request()
    req: Request & { files: { [fieldname: string]: Express.Multer.File[] } }, // Usar MulterFile
  ): Promise<ICreateTravelResponseDTO> {
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

    const data = { ...payload, gallery, image } as ICreateTravelRequestDTO;

    return this.callUseCaseAsync(
      this.createUseCase.execute(data),
      res,
      StatusCode.Created,
    );
  }
}

export { CreateTravelController };
