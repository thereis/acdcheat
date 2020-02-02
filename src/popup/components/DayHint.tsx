import * as React from 'react';

/**
 * Dependencies
 */
import { useApp } from '../popup.context';

/**
 * Components
 */
import { Subheader } from '@ac-ui/react-components';

export const DayHint: React.FC = () => {
  const [state] = useApp();

  const { user } = state;

  const [hint, setHint] = React.useState<string>();

  React.useEffect(() => {
    let theHint;

    const currentDate = new Date();
    const dayOfWeek = currentDate.getDay();

    switch (dayOfWeek) {
      case 0: // sunday
      case 5: // friday
      case 6: // saturday
        theHint = 'Submit the week!';
        break;
      default:
        theHint = "It's all good <3.";
        break;
    }

    setHint(theHint);
  }, []);
  return (
    <Subheader
      title={<span>Welcome {user.name.split(' ')[0]}!</span>}
      content={<>{hint}</>}
    />
  );
};
