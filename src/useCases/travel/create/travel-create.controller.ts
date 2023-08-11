import { BaseController, StatusCode } from "@expressots/core";
import {
  controller,
  httpPost,
  request,
  requestBody,
  requestHeaders,
  response,
} from "inversify-express-utils";
import { Response } from "express";
import { CreateTravelUseCase } from "./travel-create.usecase";
import multer from "multer";
import {
  ICreateTravelRequestDTO,
  ICreateTravelResponseDTO,
} from "./travel-create.dto";

// Create a storage configuration for multer
const storage = multer.memoryStorage(); // Store files in memory as buffers

// Create the multer middleware with the storage configuration
const upload = multer({ storage });

@controller("/travel/create")
class CreateTravelController extends BaseController {
  constructor(private createUseCase: CreateTravelUseCase) {
    super("create-controller");
  }

  @httpPost("/", upload.single("image"))
  async execute(
    @requestBody() payload: ICreateTravelRequestDTO,
    @response() res: Response,
    @request() req,
  ): Promise<ICreateTravelResponseDTO> {
    if (req.file) {
      const uploadedImageBuffer = req.file.buffer;
      payload.image = uploadedImageBuffer;
    }

    const data = { ...payload };

    return this.callUseCaseAsync(
      this.createUseCase.execute(data),
      res,
      StatusCode.Created,
    );
  }
}

export { CreateTravelController };
