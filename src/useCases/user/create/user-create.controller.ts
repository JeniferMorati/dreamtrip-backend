import { BaseController, StatusCode } from "@expressots/core";
import {
  controller,
  httpPost,
  request,
  requestBody,
  response,
} from "inversify-express-utils";
import { Response } from "express";
import { ICreateUserDTO, ICreateUserReturnDTO } from "./user-create.dto";
import { CreateUserUseCase } from "./user-create.usecase";
import multer from "multer";

// Create a storage configuration for multer
const storage = multer.memoryStorage(); // Store files in memory as buffers

// Create the multer middleware with the storage configuration
const upload = multer({ storage });

@controller("/user/create")
class UserCreateController extends BaseController {
  constructor(private createUserUseCase: CreateUserUseCase) {
    super("create-user-controller");
  }

  @httpPost("/", upload.single("image"))
  execute(
    @requestBody() payload: ICreateUserDTO,
    @request() req,
    @response() res: Response,
  ): Promise<ICreateUserReturnDTO> {
    if (req.file) {
      const uploadedImageBuffer = req.file.buffer;
      payload.image = uploadedImageBuffer;
    }

    const data = { ...payload };

    return this.callUseCaseAsync(
      this.createUserUseCase.execute(data),
      res,
      StatusCode.Created,
    );
  }
}

export { UserCreateController };
