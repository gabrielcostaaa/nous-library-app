export type UserRole = "ADMIN" | "USER";

export type Session = {
  token: string;
  name: string;
  role: UserRole;
};

const TOK = "jwt";
const NAME = "name";
const ROLE = "role";

export function getSession(): Session | null {
  const token = localStorage.getItem(TOK);
  const role = localStorage.getItem(ROLE) as UserRole | null;
  const name = localStorage.getItem(NAME) || "Usuário";
  if (!token || !role) return null;
  return { token, name, role };
}

export function isAuthenticated() {
  return !!getSession();
}

export function saveSession(s: Session) {
  localStorage.setItem(TOK, s.token);
  localStorage.setItem(NAME, s.name);
  localStorage.setItem(ROLE, s.role);
}

export function clearSession() {
  localStorage.removeItem(TOK);
  localStorage.removeItem(NAME);
  localStorage.removeItem(ROLE);
}
