export const API_URL = (import.meta.env.VITE_API_URL as string) || "http://localhost:3000";

/**
 * Pega o token de autenticação do localStorage.
 */
function getToken(): string | null {
  return localStorage.getItem("jwt");
}

/**
 * Função base para requisições HTTP autenticadas.
 * Trata erros padronizados da API Nest ({ message: "..." }).
 * Ajuste principal: NÃO força Content-Type quando o body é FormData.
 */
export async function request<T>(path: string, init: RequestInit = {}): Promise<T> {
  const token = getToken();

  const headers = new Headers(init.headers);

  if (token && !headers.has("Authorization")) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  const isFormData = init.body instanceof FormData;
  if (isFormData) {
    headers.delete("Content-Type");
  } else if (!headers.has("Content-Type") && (init.method || "GET").toUpperCase() !== "GET") {
    headers.set("Content-Type", "application/json");
  }

  if (!headers.has("Accept")) {
    headers.set("Accept", "application/json");
  }

  const res = await fetch(`${API_URL}${path}`, { ...init, headers });

  if (!res.ok) {
    try {
      const errorData = await res.json();
      if (errorData?.message) {
        if (errorData.error?.issues) {
          throw new Error(errorData.error.issues[0].message);
        }
        throw new Error(errorData.message);
      }
      throw new Error(JSON.stringify(errorData));
    } catch (e) {
      if (e instanceof Error) throw e;
      throw new Error(res.statusText || `HTTP ${res.status}`);
    }
  }

  if (res.status === 204) {
    return {} as T;
  }

  return res.json();
}
