/**
 * Dependencies
 */
import axios, { AxiosInstance } from 'axios';
import { config } from '../config';
import { decodeJWT } from './token/jwt';

/**
 * Models
 */
import { User } from './token/models/IUser';

class Service {
  fetchUser = async (token: string) => {
    const request = await axios.get(config.USER_ENDPOINT, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    const { data } = request.data;

    const response = new User({
      ...data,
      token: token,
      decodedToken: decodeJWT(token)
    });

    return response;
  };
}

export const AppService = new Service();
