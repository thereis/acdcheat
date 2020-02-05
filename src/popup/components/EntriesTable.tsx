import * as React from 'react';

/**
 * Models
 */
import { IUserEntry } from '../token/models/IUserEntry';

const groupEntries = (entries: IUserEntry[]): Map<string, IUserEntry[]> => {
  const allEntries = new Map();

  for (const entry of entries) {
    const items = allEntries.get(entry.date);

    if (!items) allEntries.set(entry.date, [entry]);
    else items.push(entry);
  }

  return allEntries;
};

const getAllEntries = (entries: IUserEntry[]) => {
  const result = Array.from(groupEntries(entries).values()).map(item =>
    item.map(
      entry =>
        `${entry.activity.fullName.slice(0, 10)}... ${entry.startTime}-${
          entry.endTime
        }`
    )
  );

  return result;
};

interface IProps {
  headers: string[];
  entries: IUserEntry[];
  caption?: string;
}

export const EntriesTable: React.FC<IProps> = props => {
  const { headers, entries, caption } = props;

  const allEntries = getAllEntries(entries);

  return (
    <table className="ac-table table table-bordered table-hover">
      {caption && <caption>{caption}</caption>}

      <tbody>
        {headers.map((header, index) => {
          return (
            <tr key={`t_${header}`}>
              <th>{header}</th>
              {allEntries[index].map((entry, key) => (
                <td key={`entry_${key}`}>{entry}</td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
