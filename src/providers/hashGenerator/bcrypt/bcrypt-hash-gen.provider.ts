import { Report, StatusCode } from "@expressots/core";
import bcrypt from "bcrypt";
import { provide } from "inversify-binding-decorators";

const SALT_ROUNDS = 10;

@provide(BcryptHashGenProvider)
class BcryptHashGenProvider {
  async generatePasswordHash(password: string): Promise<string | void> {
    return new Promise(
      (resolve: (arg: string) => void, reject: (arg: unknown) => any) => {
        bcrypt.hash(password, SALT_ROUNDS, (error: any, hash: string) => {
          if (error) {
            reject(
              Report.Error(
                error ? error.message : "Error to generate password hash",
                StatusCode.BadRequest,
                "password-encrypt",
              ),
            );
          } else {
            resolve(hash);
          }
        });
      },
    );
  }

  async comparePasswordHash(
    password: string,
    hash: string,
  ): Promise<boolean | void> {
    return new Promise(
      (resolve: (arg: boolean) => unknown, reject: (arg: unknown) => void) => {
        bcrypt.compare(password, hash, (error: any, result: boolean) => {
          if (error) {
            reject(
              Report.Error(
                error ? error.message : "Error to compare password hash",
                StatusCode.BadRequest,
                "password-encrypt",
              ),
            );
          } else {
            resolve(result);
          }
        });
      },
    );
  }
}

export { BcryptHashGenProvider };
