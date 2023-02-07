import { SetMetadata } from '@nestjs/common';
import { USERS_ROLE_ENUM } from '../users/users.constant';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: USERS_ROLE_ENUM[]) =>
  SetMetadata(ROLES_KEY, roles);
