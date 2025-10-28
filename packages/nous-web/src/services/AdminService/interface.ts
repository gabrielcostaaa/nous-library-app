import type { User } from "../models";

export interface AdminLoginBody {
  email: string;
  password: string;
}

export interface AdminLoginResponse {
  access_token: string;
}

export interface CreateAdminBody {
  name: string;
  email: string;
  password: string;
}

export type CreateAdminResponse = User;

export type ListAdminsResponse = User[];