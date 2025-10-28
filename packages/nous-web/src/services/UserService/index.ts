import { request } from '../http';
import type {
  UserLoginBody,
  UserLoginResponse,
  CreateUserBody,
  CreateUserResponse,
  ListUsersResponse,
} from './interface';

export const UserService = {
  /**
   * Login de Usuário comum
   * Rota: POST /nous-user-authenticate
   */
  login: (body: UserLoginBody) =>
    request<UserLoginResponse>("/nous-user-authenticate", {
      method: "POST",
      body: JSON.stringify(body),
    }),

  /**
   * Criação de nova conta de Usuário (público)
   * Rota: POST /nous-user-create-account
   */
  createAccount: (body: CreateUserBody) =>
    request<CreateUserResponse>("/nous-user-create-account", {
      method: "POST",
      body: JSON.stringify(body),
    }),

  /**
   * Lista todas as contas de Usuário (público)
   * Rota: GET /nous-user-create-account
   */
  listAccounts: () =>
    request<ListUsersResponse>("/nous-user-create-account"),
};