import * as React from 'react';

import { Table } from 'evergreen-ui';
import { HeaderCellToggler } from '../HeaderCellToggler';

const { SearchHeaderCell, TextHeaderCell } = Table;

/**
 * Table Header Cell Wrapper to toggle
 * and perform the table filterintg.
 *
 * @param {Object} props { title, handler, icon }
 *
 * @author Jose Aburto <pino0071@gmail.com>
 * @version 1.0.0
 */
export const SearcherCell = ({ title, handler, icon }) => {
  const [switchSearch, setSwitchSearch] = React.useState(false);

  const setFocus = node => {
    if (switchSearch && node) node.focus();
  };

  return (
    <>
      {switchSearch ? (
        <SearchHeaderCell ref={setFocus} onChange={handler}>
          <TextHeaderCell>{title}</TextHeaderCell>
        </SearchHeaderCell>
      ) : (
        <TextHeaderCell>{title}</TextHeaderCell>
      )}

      <HeaderCellToggler
        isActive={switchSearch}
        setIsActive={setSwitchSearch}
        icon={icon}
      />
    </>
  );
};