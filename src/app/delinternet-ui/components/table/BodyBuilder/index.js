import React from 'react';

import { Table } from 'evergreen-ui';
import { RowBuilder } from './RowBuilder';

const { Body } = Table;

/**
 *
 * @param {array} dataSource - data
 * @param {array} columns - columns to show
 * @param {function} Component - cell component
 * @returns component|null
 */
export const BodyBuilder = ({ dataSource = [], columns = [] }) => {
  return (
    <Body>
      {dataSource.map((data, key) => (
        <RowBuilder
          key={key}
          model={data}
          columns={columns}
          isSelectable={true}
          onSelect={() => console.log(data)}
        />
      ))}
    </Body>
  );
};
