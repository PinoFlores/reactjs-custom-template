import * as React from 'react';

import { Pane, Table as EverTable } from 'evergreen-ui';
import TablePagination from '@material-ui/core/TablePagination';
import { filterBuilder } from './helpers';
import { BodyBuilder } from './BodyBuilder';

const initialState = [
  {
    name: 'Jose',
    lastname: 'Aburto',
    email: 'jose@gmail.com',
  },
  {
    name: 'Jeremias',
    lastname: 'Aburto',
    email: 'jeremias.aburto@gmail.com',
  },
];

const initialColumns = [
  {
    title: 'Name',
    key: 'name',
    dataIndex: 'name',
    filter: {
      type: 'search',
      handler: value => console.log(value),
    },
    render(text, record) {
      return <span style={{ background: 'red' }}>{text}</span>;
    },
  },
  {
    title: 'Last Name',
    key: 'lastname',
    dataIndex: 'lastname',
    filter: {
      type: 'select',
      handler: value => console.log(value),
    },
  },
];

const Table = ({ dataSource = initialState, columns = initialColumns }) => {
  return (
    <Pane background="tint2" elevation={1} style={{ height: 'fit-content' }}>
      <EverTable>
        <EverTable.Head>{filterBuilder(columns)}</EverTable.Head>
        <BodyBuilder dataSource={dataSource} columns={columns} />
      </EverTable>
      <TablePagination
        // rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={55}
        rowsPerPage={10}
        page={1}
        // onChangePage={handleChangePage}
        // onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Pane>
  );
};

export default Table;
