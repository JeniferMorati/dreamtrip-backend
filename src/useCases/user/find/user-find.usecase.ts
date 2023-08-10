import { Report, StatusCode } from "@expressots/core";
import { UserRepository } from "@repositories/user/user.repository";
import { provide } from "inversify-binding-decorators";
import { IUserFindRequestDTO, IUserFindResponseDTO } from "./user-find.dto";

@provide(UserFindUseCase)
class UserFindUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(
    payload: IUserFindRequestDTO,
  ): Promise<IUserFindResponseDTO | null> {
    const userExists = await this.userRepository.findByEmail(payload.email);

    if (!userExists) {
      Report.Error(
        "User not found",
        StatusCode.BadRequest,
        "user-find-usecase",
      );
      return null;
    }

    return userExists;
  }
}

export { UserFindUseCase };
