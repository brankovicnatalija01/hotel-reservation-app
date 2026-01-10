import { apiRequest } from "./apiClient";
import type { LoginCredentials, LoginResponse } from "../types/login";
import type { RegisterData, RegisterResponse } from "../types/register";

const PATH = "/auth";

export const loginUser = (
  credentials: LoginCredentials
): Promise<LoginResponse> =>
  apiRequest(`${PATH}/login`, {
    method: "POST",
    body: JSON.stringify(credentials),
  });

export const registerUser = (
  userData: RegisterData
): Promise<RegisterResponse> =>
  apiRequest(`${PATH}/register`, {
    method: "POST",
    body: JSON.stringify(userData),
  });
