import { getFromExtensionStorage, setToExtensionStorage } from '../storage';
import { getCurrentChromeTab, getTokenFromCurrentTab } from '../utils';

export const getToken = async (): Promise<string> => {
  try {
    const storedToken = await getFromExtensionStorage('accessToken');
    return storedToken;
  } catch (e) {
    try {
      const tab = await getCurrentChromeTab();
      const tokenFromTab = await getTokenFromCurrentTab(tab);

      if (tokenFromTab) {
        setToExtensionStorage('accessToken', tokenFromTab);

        return tokenFromTab;
      }
    } catch (e) {
      console.log('e: ', e);
    }
  }
};
