interface IWorkLocation {
  id: string;
  city: 'SP' | 'MG';
  state: 'SP' | 'MG';
  country: 'BR' | 'US';
  startDate: string;
  endDate: string;
}

export interface IDecodedToken {
  sub: string;
  companyRole: 'fellow' | 'buddy' | string;
  accessRole: [
    {
      id: string;
      name: 'ROLE_USER' | string;
      description: string;
    }
  ];
  workLocation: IWorkLocation;
  temporaryLocation: IWorkLocation[];
  iat: number;
  exp: number;
}
