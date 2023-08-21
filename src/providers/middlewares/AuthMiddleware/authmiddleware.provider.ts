import { Request, Response, NextFunction } from "express";
import { JWTProvider } from "@providers/hashGenerator/jwt/jwt.provider";
import { AuthRole, RoleProvider } from "@providers/roles/roles.provider";
import { StatusCode } from "@expressots/core";
import { authenticatedRoutes } from "routes/auth/auth.routes";

async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response<any, Record<string, any>> | void> {
  const jwtProvider: JWTProvider = new JWTProvider();
  const roleProvider: RoleProvider = new RoleProvider();
  const currentRoute = req.originalUrl;
  const routerParamsKeys = Object.keys(req.params);
  const queryParamsKeys = Object.keys(req.query);
  let cleanedRoute = currentRoute;
  routerParamsKeys.forEach((paramKey) => {
    cleanedRoute = cleanedRoute.replace(
      `/${req.params[paramKey]}`,
      `/:${paramKey}`,
    );
  });

  queryParamsKeys.forEach((queryKey) => {
    cleanedRoute = cleanedRoute.replace(
      `?${queryKey}=${req.query[queryKey]}`,
      `?${queryKey}=:${queryKey}`,
    );
  });
  const token = req.headers["authorization"];
  const allowedRoles = authenticatedRoutes[cleanedRoute] || [];
  const isGuestRoute = allowedRoles[0] === AuthRole.Guest;

  if (!isGuestRoute) {
    if (!token) {
      return res.status(401).json({
        auth: false,
        message: "The token was not provisioned in the request",
      });
    }
  }

  try {
    const decoded = token ? jwtProvider.decodeToken(token) : "";
    const tokenInfo: any = decoded;
    const userRoles: AuthRole[] = tokenInfo?.roles || [];

    const hasRoleOrAbove = (requiredRole: AuthRole): boolean =>
      roleProvider
        .getRoleHierarchy(requiredRole)
        .some((role) => userRoles.includes(role));

    if (allowedRoles.length > 0) {
      const hasRequiredRoles = allowedRoles.some(hasRoleOrAbove);

      if (!hasRequiredRoles && !isGuestRoute) {
        return res.status(StatusCode.Forbidden).send({
          statusCode: StatusCode.Forbidden,
          error: "Insufficient role permissions",
        });
      }
    }

    req.headers["decoded"] = decoded as unknown as string;
    next();
  } catch (error) {
    return res.status(StatusCode.Unauthorized).send({
      statusCode: StatusCode.Unauthorized,
      error: "Token incorrect or expired",
    });
  }
}

export default authMiddleware;
