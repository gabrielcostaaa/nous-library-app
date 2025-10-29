import { request } from "../http"
import type {
  ListBooksResponse,
  RegisterBookBody,
  RegisterBookResponse,
  UpdateBookBody,
  UpdateBookResponse,
  DeleteBookResponse,
} from "./interface"

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
  register: (body: RegisterBookBody | FormData) =>
    request<RegisterBookResponse>("/nous-books-register", {
      method: "POST",
      body: body instanceof FormData ? body : JSON.stringify(body),
    }),

  /**
   * Atualiza um livro existente (requer token de admin)
   * Rota: PUT /nous-books-update/:id
   */
  update: (id: string, body: UpdateBookBody | FormData) =>
    request<UpdateBookResponse>(`/nous-books-update/${id}`, {
      method: "PUT",
      body: body instanceof FormData ? body : JSON.stringify(body),
    }),

  /**
  * Remove um livro (requer token de admin)
  * Rota: DELETE /nous-books-delete?id=:id
  */
  delete: (id: string) =>
    request<DeleteBookResponse>(`/nous-books-delete?id=${encodeURIComponent(id)}`, {
      method: "DELETE",
    }),
}
