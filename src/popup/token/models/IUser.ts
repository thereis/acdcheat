import { IDecodedToken } from './IDecodedToken';
import { IUserProject } from './IUserProject';
import { IUserEntry } from './IUserEntry';

export class User {
  userId: string;
  employeeId: string;
  name: string;
  email: string;
  imageUrl: string;

  workLocation: { city: 'SP' | 'MG'; state: 'SP' | 'MG'; country: 'BR' | 'US' };

  projects: IUserProject[];
  entries: IUserEntry[];

  token: string;
  decodedToken: IDecodedToken;

  constructor(params: Partial<User>) {
    Object.assign(this, params);
  }
}
