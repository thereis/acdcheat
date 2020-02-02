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
import { IUserProject } from './token/models/IUserProject';
import { IUserEntry } from './token/models/IUserEntry';
import { getWeekRange } from './utils';

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

    const [projects, entries] = await Promise.all([
      await this.fetchUserProjects(token, data.userId),
      await this.fetchUserEntries(token, data.userId)
    ]);

    return { ...response, projects, entries };
  };

  fetchUserProjects = async (
    token: string,
    userId: string
  ): Promise<IUserProject[]> => {
    const [start] = getWeekRange();

    const request = await axios.get(
      `${config.ACTIVITIES_ENDPOINT}/?userId=${userId}&startDate=${start}&endDate=${start}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    const { data } = request.data;

    const result: IUserProject[] = data[start];
    return result;
  };

  fetchUserEntries = async (token: string, userId: string) => {
    const [start, end] = getWeekRange();

    const request = await axios.get(
      `${config.ENTRIES_ENDPOINT}/?startDate=${start}&endDate=${end}&userId=${userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    const { data } = request.data;

    const result: IUserEntry[] = data ?? [];
    return result;
  };
}

export const AppService = new Service();
