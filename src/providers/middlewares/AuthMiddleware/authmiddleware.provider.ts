import { Request, Response, NextFunction } from "express";
import { JWTProvider } from "@providers/hashGenerator/jwt/jwt.provider";

async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response<any, Record<string, any>> | void> {
  const jwtProvider: JWTProvider = new JWTProvider();

  const token = req.headers["authorization"];

  if (!token) {
    return res.status(401).json({
      auth: false,
      message: "The token was not provisioned in the request",
    });
  }

  try {
    const decoded = jwtProvider.decodeToken(token);

    req.headers["decoded"] = decoded as unknown as string;
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ auth: false, message: "Token expirado ou incorreto." });
  }
}

export default authMiddleware;
