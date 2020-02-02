import * as React from 'react';

/**
 * Components
 */
import { Subheader, Table } from '@ac-ui/react-components';
import { useApp } from '../popup.context';
import { getWeekRange } from '../utils';

export const Entries: React.FC = () => {
  const [state] = useApp();
  const { entries } = state.user;

  const allEntries = entries.map(item => [
    `${item.activity.fullName.slice(0, 10)}... ${item.startTime} - ${
      item.endTime
    }`
  ]);

  const [start, end] = getWeekRange();

  return (
    <>
      <Subheader title={<span>Entries</span>} content={'Week entries.'} />
      <Table
        caption={`${start} to ${end}`}
        headerNames={Array.from(new Set(entries.map(item => item.date)))}
        tableData={allEntries}
      />
    </>
  );
};
