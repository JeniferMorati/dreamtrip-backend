import { CreateModule } from "@expressots/core";
import { UserCreateController } from "./create/user-create.controller";
import { UserDeleteController } from "./delete/user-delete.controller";
import { UserFindController } from "./find/user-find.controller";
import { UserLoginController } from "./login/user-login.controller";
import { UserUpdateController } from "./update/user-update.controller";
import { UserUpdateProfilePhotoController } from "/user-update-profile-photo.controller";
import { UserUpdatePhotoController } from "/user-update-photo.controller";

// controllers

const UserModule = CreateModule([UserCreateController, UserDeleteController, UserFindController, UserLoginController, UserUpdateController, , UserUpdateProfilePhotoController, UserUpdatePhotoController]);

export { UserModule };
