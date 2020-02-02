import * as React from 'react';

/**
 * Components
 */
import { Table } from '@ac-ui/react-components';
import { useApp } from '../popup.context';

export const Entries: React.FC = () => {
  const [state] = useApp();
  const { entries } = state.user;

  const allEntries = entries.map(item => [
    `${item.activity.fullName.slice(0, 10)}... ${item.startTime} - ${
      item.endTime
    }`
  ]);

  return (
    <>
      Your week entries:
      <Table
        caption={'Week entries'}
        headerNames={Array.from(new Set(entries.map(item => item.date)))}
        tableData={allEntries}
      />
    </>
  );
};
