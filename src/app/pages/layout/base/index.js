import * as React from 'react';
import axios from 'axios';
import Table from 'app/delinternet-ui/components/table';
import { Avatar } from 'evergreen-ui';

// import { Helmet } from 'react-helmet-async';
import { connect } from 'react-redux';
// import { Switch } from 'react-router';

import { getAllUsers, filterUsers } from 'store/Action/UsersActions';

import './index.less';

const initialState = [];

const Base = props => {
  const [users, setUsers] = React.useState([]);
  const [filter, setFilter] = React.useState({
    // name: 'Jose',
    lastname: 'Aburto',
  });

  React.useEffect(() => {
    props.filterUsers(filter);
  }, [filter]);

  React.useEffect(() => {
    if (props.users) {
      setUsers(props.users);
    }
  }, [props.users]);

  axios
    .get('http://unpaid.delinternet.com/api/unpaid/xmls?page=1&perPage=10', {
      email: 'jose.aburto@delinternet.com',
      password: 'jose123',
    })
    .then(({ data }) => {
      console.log(data);
    })
    .catch(({ response }) => {
      console.log(response);
    });

  return (
    <>
      {process.env.NODE_ENV}

      {process.env.REACT_APP_TEST}

      {/* <Helmet>
        <title>Home Page</title>
        <meta name="description" content="Delinternet Unpaid" />
      </Helmet> */}
      <div className="main-container">
        <div className="navbar-container"></div>
        <main style={{ margin: '3rem' }}>
          {/* <Switch></Switch> */}

          <Table
            // filter={state}
            dataSource={users}
            columns={[
              {
                title: 'Name',
                key: 'name',
                dataIndex: 'name',
                filter: {
                  type: 'search',
                  name: 'name',
                  defaultValue: filter.name,
                  handler: value => {
                    setFilter(pre => ({ ...pre, ...value }));
                  },
                },
                render(text, record) {
                  return (
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        padding: '1rem',
                      }}
                    >
                      <Avatar
                        src="https://upload.wikimedia.org/wikipedia/commons/a/a1/Alan_Turing_Aged_16.jpg"
                        name="Alan Turing"
                        size={40}
                      />
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'center',
                          flexDirection: 'column',
                          marginLeft: '0.4rem',
                        }}
                      >
                        <b>{text}</b>
                        <small>pino@gmail.com</small>
                      </div>
                    </div>
                  );
                },
              },
              {
                title: 'Last Name',
                key: 'lastname',
                dataIndex: 'lastname',
                defaultValue: filter.lastname,
                filter: {
                  name: 'lastname',
                  type: 'select',
                  options: ['Mango', 'Mandarina', 'All'],
                  handler: value => {
                    setFilter(pre => ({ ...pre, ...value }));
                  },
                },
              },
            ]}
          />
        </main>
      </div>
    </>
  );
};

const mapStateToProps = ({ UserReducer }) => {
  const { users } = UserReducer;
  return { users };
};

export default connect(mapStateToProps, {
  getAllUsers,
  filterUsers,
})(Base);
