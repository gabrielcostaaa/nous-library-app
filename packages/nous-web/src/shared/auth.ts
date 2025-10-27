const KEY = "jwt";

export function saveToken(token: string) {
  localStorage.setItem(KEY, token);
}

export function getToken(): string | null {
  return localStorage.getItem(KEY);
}

export function isAuthed(): boolean {
  return !!getToken();
}

export function clearToken() {
  localStorage.removeItem(KEY);
}
