import * as React from 'react';

import { Avatar, Pane, Table as EverTable } from 'evergreen-ui';
import TablePagination from '@material-ui/core/TablePagination';
import { filterBuilder } from './helpers';
import { BodyBuilder } from './BodyBuilder';
import { applyDataFilters } from './filters/index';

const Table = ({ dataSource = [], columns = [] }) => {
  return (
    <Pane background="tint2" elevation={1} style={{ height: 'fit-content' }}>
      <EverTable>
        <EverTable.Head>{filterBuilder(columns)}</EverTable.Head>
        <BodyBuilder dataSource={dataSource} columns={columns} />
      </EverTable>
      {/* <TablePagination
        // rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={55}
        rowsPerPage={10}
        page={1}
        // onChangePage={handleChangePage}
        // onChangeRowsPerPage={handleChangeRowsPerPage}
      /> */}
    </Pane>
  );
};

export default Table;
