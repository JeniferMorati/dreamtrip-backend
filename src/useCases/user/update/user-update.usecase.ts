import { Report, StatusCode } from "@expressots/core";
import { UserRepository } from "@repositories/user/user.repository";
import { provide } from "inversify-binding-decorators";
import {
  IUserUpdateRequestDTO,
  IUserUpdateResponseDTO,
} from "./user-update.dto";

@provide(UserUpdateUseCase)
class UserUpdateUseCase {
  constructor(private userRepository: UserRepository) {}

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

    userExists.name = payload.name || userExists.name;

    return userExists;
  }
}

export { UserUpdateUseCase };
