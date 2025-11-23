import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import type { DecodedTokenType } from './types';
export async function HashPassword(password: string): Promise<string> {
  const salt = 10;

  return await bcrypt.hash(password, salt);
}

export async function ComparePassword(password: string, hashPassword: string): Promise<boolean> {
  return await bcrypt.compare(password, hashPassword);
}

export type TokenDetailsType = {
  email: string;
  role: string;
  id: string;
};

export function SignToken(data: TokenDetailsType): string {
  return jwt.sign(data, process.env.TOKEN_SECRET as string, {
    expiresIn: 400000,
  });
}

export function decodeToken(token: string): DecodedTokenType {
  return jwt.verify(token, process.env.TOKEN_SECRET as string) as DecodedTokenType;
}
