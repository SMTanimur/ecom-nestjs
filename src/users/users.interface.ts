import { STATUS_ENUM } from '../shared/constants';
import { USERS_ROLE_ENUM } from './users.constant';

export interface IUsers {
  userName?: string;
  email?: string;
  password?: string;
  phone?: string;
  address?: string;
  role?: USERS_ROLE_ENUM;
  status?: STATUS_ENUM;
}

export interface IUsersQuery {
  userID: string;
}
export interface IPayloadJWT {
  userName: string;
  id: string;
  role?: USERS_ROLE_ENUM;
}
