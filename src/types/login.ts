export interface LoginCredentials {
  email: string;
  password?: string;
}

export interface LoginResponse {
  token: string;
  email: string;
  role: "ROLE_ADMIN" | "ROLE_USER";
  id: number;
}
