import { request } from '../http';
import type {
  ListLoansResponse,
  RegisterLoanBody,
  RegisterLoanResponse,
} from './interface';

export const LoansService = {
  /**
   * Lista todos os empréstimos (requer token de admin)
   * Rota: GET /nous-loans-list
   */
  list: () => request<ListLoansResponse>("/nous-loans-list"),

  /**
   * Registra um novo empréstimo (requer token de admin)
   * Rota: POST /nous-loans-register
   */
  register: (body: RegisterLoanBody) =>
    request<RegisterLoanResponse>("/nous-loans-register", {
      method: "POST",
      body: JSON.stringify(body),
    }),
};