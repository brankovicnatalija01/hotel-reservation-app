export interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
}

export interface RegisterResponse {
    id?: number;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    role?: string;
    message?: string; 
  }
