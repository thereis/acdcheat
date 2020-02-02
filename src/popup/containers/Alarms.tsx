import * as React from 'react';

/**
 * Dependencies
 */
import { getAllAlarms, createNewAlarm, clearAllAlarms } from '../alarm';

/**
 * Components
 */
import { Table, Button } from '@ac-ui/react-components';
import { useApp } from '../popup.context';

interface IProps {}

export const Alarms: React.FC<IProps> = props => {
  const [state, dispatch] = useApp();

  React.useEffect(() => {
    if (!state.alarms) return;

    const _load = async () => {
      //   const alarm = createNewAlarm('teste-lucas');
      //   const alarms = await getAllAlarms();
      //   console.log('alarms: ', alarms);
    };
    _load();
  }, [state.alarms]);

  const _handleClearAlarms = async () => {
    await clearAllAlarms();
    dispatch({ type: 'setAlarms', value: [] });
  };

  return (
    <>
      <Table
        caption={'Alarms'}
        headerNames={['Alarm Name']}
        tableData={[state.alarms.map(alarm => alarm.name)]}
      />

      <Button classList={['btn-sm', 'btn-primary', 'btn-plain']}>
        Create alarm
      </Button>

      {state.alarms.length > 0 && (
        <Button
          onClick={_handleClearAlarms}
          classList={['btn-sm', 'btn-primary', 'btn-plain']}
        >
          Clear alarms
        </Button>
      )}
    </>
  );
};
