/**
 * Dependencies
 */
import * as jwt from 'jsonwebtoken';
import * as moment from 'moment';

/**
 * Models
 */
import { IDecodedToken } from './models/IDecodedToken';

export const decodeJWT = (token: string): IDecodedToken => {
  const decoded = jwt.decode(token) as IDecodedToken;
  return decoded;
};

export const isExpiredJWT = (token: string) => {
  const { exp } = decodeJWT(token);

  const currentTime = new Date().getTime() / 1000;
  return currentTime > exp;
};

export const daysToExpire = (token: string): number => {
  const { exp } = decodeJWT(token);

  const days = moment(moment.unix(exp)).diff(new Date(), 'days');
  return days;
};
