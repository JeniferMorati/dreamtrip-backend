import { provide } from "inversify-binding-decorators";

export enum AuthRole {
  User = "user",
  Guest = "guest",
  Editor = "editor",
  Admin = "admin",
}

@provide(RoleProvider)
class RoleProvider {
  private roleHierarchy: { [role: string]: AuthRole[] } = {
    [AuthRole.User]: [AuthRole.User, AuthRole.Editor, AuthRole.Admin],
    [AuthRole.Editor]: [AuthRole.Editor, AuthRole.Admin],
    [AuthRole.Admin]: [AuthRole.Admin],
    [AuthRole.Guest]: [
      AuthRole.Guest,
      AuthRole.Admin,
      AuthRole.User,
      AuthRole.Editor,
    ],
  };

  getRoleHierarchy(requiredRole: AuthRole): AuthRole[] {
    return this.roleHierarchy[requiredRole] || [];
  }
}

export { RoleProvider };
