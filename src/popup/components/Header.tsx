import * as React from 'react';

/**
 * Dependencies
 */
import { useApp } from '../popup.context';
import { clearExtensionStorage } from '../storage';

/**
 * Components
 */
import { Header as HeaderComponent } from '@ac-ui/react-components';

/**
 * Styles
 */
import './Header.style.scss';

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
    </div>
  );
};
