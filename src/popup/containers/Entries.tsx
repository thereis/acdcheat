import * as React from 'react';

/**
 * Dependencies
 */
import * as moment from 'moment';
import { useApp } from '../popup.context';

import { getWeekRange } from '../utils';

/**
 * Components
 */
import { EntriesTable } from '../components/EntriesTable';
import { Subheader } from '@ac-ui/react-components';

export const Entries: React.FC = () => {
  const [state] = useApp();

  const { entries } = state.user;

  const [start, end] = getWeekRange();

  const headers = Array.from(
    new Set(entries.map(item => moment(item.date).format('DD MMM')))
  );

  return (
    <>
      <Subheader title={<span>Entries</span>} content={'Week entries.'} />

      <EntriesTable
        headers={headers}
        entries={entries}
        caption={`${start} to ${end}`}
      />
    </>
  );
};
