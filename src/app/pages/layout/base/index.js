import Table from 'app/delinternet-ui/components/table';
import * as React from 'react';

// import { Helmet } from 'react-helmet-async';
import { connect } from 'react-redux';
// import { Switch } from 'react-router';

import './index.less';

const Base = props => {
  React.useEffect(() => {}, []);

  return (
    <>
      {/* <Helmet>
        <title>Home Page</title>
        <meta name="description" content="Delinternet Unpaid" />
      </Helmet> */}
      <div className="main-container">
        <div className="navbar-container"></div>
        <main style={{ margin: '3rem' }}>
          {/* <Switch></Switch> */}

          <Table />
        </main>
      </div>
    </>
  );
};

const mapStateToProps = state => {
  return state;
};

export default connect(mapStateToProps, {})(Base);
