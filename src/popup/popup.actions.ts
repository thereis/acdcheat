/**
 * Service
 */
import { AppService } from './popup.service';

/**
 * Models
 */
import { Action } from './popup.context';

export const fetchUser = async (token: string): Promise<Action> => {
  const user = await AppService.fetchUser(token);

  return {
    type: 'setUser',
    value: user
  };
};
