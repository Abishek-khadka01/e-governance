import type { JwtPayload } from 'jsonwebtoken';

export interface DecodedTokenType extends JwtPayload {
  role: string;
  email: string;
  id: string;
}
