import { Report, StatusCode } from "@expressots/core";
import { UserRepository } from "@repositories/user/user.repository";
import { provide } from "inversify-binding-decorators";
import {
  IUserUpdateRequestDTO,
  IUserUpdateResponseDTO,
} from "./user-update.dto";
import { CloudinaryProvider } from "@providers/cloudnary/cloudinary.provider";

@provide(UserUpdateUseCase)
class UserUpdateUseCase {
  constructor(
    private userRepository: UserRepository,
    private cloudinaryProvider: CloudinaryProvider,
  ) {}

  async execute(
    payload: IUserUpdateRequestDTO,
  ): Promise<IUserUpdateResponseDTO | null> {
    const userExists = await this.userRepository.findById(payload.id);

    if (!userExists) {
      Report.Error(
        "User not found",
        StatusCode.BadRequest,
        "user-update-usecase",
      );

      return null;
    }

    if (payload.image) {
      const newProfileImage = await this.cloudinaryProvider.uploadImage(
        payload.image,
        payload.id,
        "profile",
      );

      if (newProfileImage) {
        userExists.imageVersion = newProfileImage.secure_url;
        userExists.image =
          this.cloudinaryProvider.removeVersionUrl(newProfileImage);
      }
    }

    userExists.nickName = payload.nickName || userExists.nickName;

    const updatedUser = await this.userRepository.update(userExists);

    if (!updatedUser) {
      Report.Error(
        "Update user fail",
        StatusCode.InternalServerError,
        "user-update-usecase",
      );
      return null;
    }

    return Promise.resolve(userExists);
  }
}

export { UserUpdateUseCase };
