import type { User } from '../models';

export interface UserLoginBody {
  email: string;
  password: string;
}

export interface UserLoginResponse {
  access_token: string;
}

export interface CreateUserBody {
  name: string;
  email: string;
  password: string;
}

export type CreateUserResponse = User;

export type ListUsersResponse = User[];