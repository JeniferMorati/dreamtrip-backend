import { provide } from "inversify-binding-decorators";
import jwt from "jsonwebtoken";
import ENV from "env";

@provide(JWTProvider)
class JWTProvider {
  public decodeToken(token) {
    return jwt.verify(token, ENV.Security.JWT_SECRET);
  }

  public generateToken(payload) {
    return jwt.sign(payload, ENV.Security.JWT_SECRET, {
      expiresIn: ENV.Security.JWT_EXPIRES_IN,
    });
  }
}

export { JWTProvider };
