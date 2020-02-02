export const isDev = process.env.NODE_ENV === 'development';

export const config = {
  USER_ENDPOINT: isDev
    ? 'https://acdc2.avenuecode.com/api/users/me'
    : 'https://acdc2.avenuecode.com/api/users/me',
  HOLYDAYS_ENDPOINT:
    'https://acdc2.avenuecode.com/api/holidays?year=2020&city=SP&state=SP&country=BR'
};
