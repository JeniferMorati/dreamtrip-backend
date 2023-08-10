import fs from "fs";
import Env from "env";
import { createHash, generateKeyPairSync } from "crypto";
import { provide } from "inversify-binding-decorators";
import { Report, StatusCode } from "@expressots/core";

const salt = Env.Security.SALT_FOR_HASH;

@provide(CryptoHashGenProvider)
class CryptoHashGenProvider {
  generatePasswordHash(password: string): string | void {
    const hashedPass: string = createHash("sha256")
      .update(`${password}_${salt}`)
      .digest("hex");

    if (!hashedPass) {
      const error = Report.Error(
        "Hashing password failed",
        StatusCode.GatewayTimeout,
        "crypto-hash-gen-provider",
      );

      return error;
    }

    return hashedPass;
  }

  comparePasswordHash(password: string, hash: string): boolean | void {
    const comparison: boolean = hash === this.generatePasswordHash(password);

    if (!comparison) {
      const error = Report.Error(
        "Password comparison failed",
        StatusCode.Unauthorized,
        "crypto-hash-gen-provider",
      );
      return error;
    }

    return comparison;
  }

  async generatePrivatePublicKeyPair(): Promise<void> {
    const keyPair = await generateKeyPairSync("rsa", {
      modulusLength: 2048,
      publicExponent: 65537,
      privateKeyEncoding: {
        type: "pkcs8",
        format: "pem",
      },
      publicKeyEncoding: {
        type: "spki",
        format: "pem",
      },
    });

    fs.writeFileSync("./private.pem", keyPair.privateKey);
    fs.writeFileSync("./public.pem", keyPair.publicKey);
  }
}

export { CryptoHashGenProvider };
