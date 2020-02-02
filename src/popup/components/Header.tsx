import * as React from 'react';

/**
 * Dependencies
 */
import { useApp } from '../popup.context';
import { clearExtensionStorage } from '../storage';

/**
 * Components
 */
import { Subheader, Header as HeaderComponent } from '@ac-ui/react-components';

/**
 * Styles
 */
import './Header.style.scss';

const DayHint: React.FC = () => {
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

  return <>{hint}</>;
};

export const Header: React.FC = props => {
  const [state, dispatch] = useApp();

  const { user } = state;

  const [isOpen, setOpen] = React.useState(false);
  const handleClick = () => setOpen(!isOpen);
  const handleClose = () => setOpen(false);

  const PopoverToggle = () => (
    <img
      onClick={handleClick}
      src={user.imageUrl}
      className="user-picture"
      alt={user.name}
    />
  );

  return (
    <div>
      <HeaderComponent
        title="ACDCheat"
        popoverToggle={<PopoverToggle />}
        popoverContent={
          <p
            className="dropdown-item text-white"
            onClick={async () => {
              await clearExtensionStorage();
              dispatch({ type: 'resetContext', value: undefined });
            }}
          >
            Logout
          </p>
        }
        isPopoverOpen={isOpen}
        onPopoverClose={handleClose}
      />
      <Subheader
        title={<span>Welcome {user.name.split(' ')[0]}!</span>}
        content={<DayHint />}
      />
    </div>
  );
};
