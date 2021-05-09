import * as React from 'react';

import { Table } from 'evergreen-ui';
import { HeaderCellToggler } from '../HeaderCellToggler';

const { SearchHeaderCell } = Table;

/**
 * Table Header Cell Wrapper to toggle
 * and perform the table filterintg.
 *
 * @param {Object} props {onFilter, chilfren}
 *
 * @author Jose Aburto <pino0071@gmail.com>
 * @version 1.0.0
 */
export const SearcherWrapper = props => {
  const [switchSearch, setSwitchSearch] = React.useState(false);

  const setFocus = node => {
    if (switchSearch && node) node.focus();
  };

  const handleOnFilter = value => {
    props.onFilter(value);
  };

  return (
    <>
      {switchSearch ? (
        <SearchHeaderCell ref={setFocus} onChange={handleOnFilter}>
          {props.children}
        </SearchHeaderCell>
      ) : (
        props.children
      )}

      <HeaderCellToggler
        isActive={switchSearch}
        setIsActive={setSwitchSearch}
      />
    </>
  );
};
