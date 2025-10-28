import { request } from '../http';
import type {
  AdminLoginBody,
  AdminLoginResponse,
  CreateAdminBody,
  CreateAdminResponse,
  ListAdminsResponse,
} from './interface';

export const AdminService = {
  /**
   * Login de Administrador
   * Rota: POST /nous-admin-authenticate
   */
  login: (body: AdminLoginBody) =>
    request<AdminLoginResponse>("/nous-admin-authenticate", {
      method: "POST",
      body: JSON.stringify(body),
    }),

  /**
   * Criação de nova conta de Administrador (requer token de admin)
   * Rota: POST /nous-admin-create-account
   */
  createAccount: (body: CreateAdminBody) =>
    request<CreateAdminResponse>("/nous-admin-create-account", {
      method: "POST",
      body: JSON.stringify(body),
    }),

  /**
   * Lista todas as contas de Administrador (requer token de admin)
   * Rota: GET /nous-admin-create-account
   */
  listAccounts: () =>
    request<ListAdminsResponse>("/nous-admin-create-account"),
};