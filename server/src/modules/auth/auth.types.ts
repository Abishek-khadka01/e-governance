import type { users } from '../../generated/prisma/browser';

export interface UserRegisterRequest {
  username: string;
  phone_number: string;
  email: string;
  password: string;
  citizenship_no: string;
  document_type: string; // the enum type for it
}

export interface UserRegisterResponse {}

export interface UserLoginRequest {
  email: string;
  password: string;
}

export type UserLoginResponse = users;
