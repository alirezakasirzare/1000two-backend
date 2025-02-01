import { User as UserType } from "@prisma/client";
export {};

declare global {
  namespace Express {
    interface User extends UserType {}
  }
}
