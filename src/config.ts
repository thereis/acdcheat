export const isDev = process.env.NODE_ENV === 'development';
export const domain = isDev
  ? 'https://acdc-staging.avenuecode.io/api'
  : 'https://acdc2.avenuecode.com/api';

export const config = {
  USER_ENDPOINT: isDev
    ? 'https://acdc2.avenuecode.com/api/users/me'
    : 'https://acdc2.avenuecode.com/api/users/me',
  ACTIVITIES_ENDPOINT: 'https://acdc2.avenuecode.com/api/activities',
  HOLYDAYS_ENDPOINT:
    'https://acdc2.avenuecode.com/api/holidays?year=2020&city=SP&state=SP&country=BR',
  ENTRIES_ENDPOINT: `${domain}/time-entries`
};
