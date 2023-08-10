import { Report, StatusCode } from "@expressots/core";
import {
  IUserDeleteRequestDTO,
  IUserDeleteResponseDTO,
} from "./user-delete.dto";
import { UserRepository } from "@repositories/user/user.repository";
import { provide } from "inversify-binding-decorators";

@provide(UserDeleteUseCase)
class UserDeleteUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(
    data: IUserDeleteRequestDTO,
  ): Promise<IUserDeleteResponseDTO | void> {
    const { id } = data;

    const userExist = await this.userRepository.findById(id);

    if (!userExist) {
      Report.Error("User not found", StatusCode.BadRequest, "user-delete");
    }

    const userDeleted = await this.userRepository.delete(id);

    if (!userDeleted) {
      Report.Error("User not deleted", StatusCode.BadRequest, "user-delete");
    }

    if (userDeleted) {
      const userDataReturn: IUserDeleteResponseDTO = {
        id: userDeleted._id,
        name: userDeleted.name,
        email: userDeleted.email,
        status: "User deleted successfully",
      };
      return Promise.resolve(userDataReturn);
    }
  }
}

export { UserDeleteUseCase };
