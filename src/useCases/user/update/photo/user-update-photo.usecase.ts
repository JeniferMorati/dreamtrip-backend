import { provide } from "inversify-binding-decorators";
import {
  IUserUpdatePhotoRequestDTO,
  IUserUpdatePhotoResponseDTO,
} from "./user-update-photo.dto";
import { UserRepository } from "@repositories/user/user.repository";
import { CloudinaryProvider } from "@providers/cloudnary/cloudinary.provider";
import { Report, StatusCode } from "@expressots/core";

@provide(UserUpdatePhotoUseCase)
class UserUpdatePhotoUseCase {
  constructor(
    private userRepository: UserRepository,
    private cloudinaryProvider: CloudinaryProvider,
  ) {}

  async execute(
    data: IUserUpdatePhotoRequestDTO,
    id: string,
  ): Promise<IUserUpdatePhotoResponseDTO | null> {
    const user = await this.userRepository.findById(id);

    if (!user || user === null) {
      Report.Error(
        "User not found",
        StatusCode.NotFound,
        "user-update-photo.usecase",
      );

      return null;
    }

    const uploadImage = await this.cloudinaryProvider.uploadImage(
      data.image,
      "profile_photo",
      `profile/${user.id}`,
    );

    if (uploadImage) {
      user.imageVersion = uploadImage.secure_url;
      user.image = this.cloudinaryProvider.removeVersionUrl(uploadImage);
    }

    const updatedImage = await this.userRepository.update(user);

    if (!updatedImage) {
      Report.Error(
        "User not found",
        StatusCode.NotFound,
        "user-update-photo.usecase",
      );

      return null;
    }

    return Promise.resolve({ image: user.image || "" });
  }
}

export { UserUpdatePhotoUseCase };
