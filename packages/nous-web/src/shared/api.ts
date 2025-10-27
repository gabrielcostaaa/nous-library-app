export const API = import.meta.env.VITE_API_URL as string;

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const token = localStorage.getItem("jwt");
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
  const res = await fetch(`${API}${path}`, { ...init, headers });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `HTTP ${res.status}`);
  }
  return res.json();
}

export const api = {
  adminLogin: (email: string, password: string) =>
    request<{ token: string }>("/admin/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    }),

  createAdmin: (payload: { email: string; password: string }) =>
    request("/admin/users", { method: "POST", body: JSON.stringify(payload) }),

  createUser: (payload: { name: string; email: string }) =>
    request("/users", { method: "POST", body: JSON.stringify(payload) }),

  listBooks: () => request<{ id: number; title: string; price: number }[]>("/books"),
  registerBook: (p: { title: string; price: number }) =>
    request("/books", { method: "POST", body: JSON.stringify(p) }),

  registerLoan: (p: { userId: number; bookId: number; days: number }) =>
    request<{ id: number }>("/loans", { method: "POST", body: JSON.stringify(p) }),
  loanFine: (id: number) => request<{ fine: number }>(`/loans/${id}/fine`),
  loanRental: (id: number) => request<{ rental: number }>(`/loans/${id}/rental`),
};
