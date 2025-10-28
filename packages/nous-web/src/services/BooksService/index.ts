import { request } from '../http';
import type {
  ListBooksResponse,
  RegisterBookBody,
  RegisterBookResponse,
} from './interface';

export const BooksService = {
  /**
   * Lista todos os livros (requer token)
   * Rota: GET /nous-books-list
   */
  list: () => request<ListBooksResponse>("/nous-books-list"),

  /**
   * Registra um novo livro (requer token de admin)
   * Rota: POST /nous-books-register
   */
  register: (body: RegisterBookBody) =>
    request<RegisterBookResponse>("/nous-books-register", {
      method: "POST",
      body: JSON.stringify(body),
    }),
};