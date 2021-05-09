import * as React from 'react';

import { connect } from 'react-redux';
// import { useHistory } from 'react-router-dom';

const Login = props => {
  // const history = useHistory();

  return <>Login</>;
};

const mapStateToProps = state => {
  return state;
};

export default connect(mapStateToProps, {})(Login);
