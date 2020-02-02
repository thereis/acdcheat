import { IDecodedToken } from './IDecodedToken';

export class User {
  userId: string;
  employeeId: string;
  name: string;
  email: string;
  imageUrl: string;

  workLocation: { city: 'SP' | 'MG'; state: 'SP' | 'MG'; country: 'BR' | 'US' };

  token: string;
  decodedToken: IDecodedToken;

  constructor(params: Partial<User>) {
    Object.assign(this, params);
  }
}
