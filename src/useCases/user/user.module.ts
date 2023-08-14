import { CreateModule } from "@expressots/core";
import { UserCreateController } from "./create/user-create.controller";
import { UserDeleteController } from "./delete/user-delete.controller";
import { UserFindController } from "./find/user-find.controller";
import { UserLoginController } from "./login/user-login.controller";
import { UserUpdateController } from "./update/user-update.controller";
import { UserUpdatePhotoController } from "./update/photo/user-update-photo.controller";

// controllers

const UserModule = CreateModule([
  UserCreateController,
  UserDeleteController,
  UserFindController,
  UserLoginController,
  UserUpdateController,
  UserUpdatePhotoController,
]);

export { UserModule };
