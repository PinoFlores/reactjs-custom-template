/**
 *
 * Dashboard
 *
 */
import * as React from 'react';
import styled from 'styled-components/macro';
import { Card, Row, Col } from 'antd';
import { connect } from 'react-redux';

import { updateLocalAvatar } from 'store/Action/ProfileAction';
import { Redirect } from 'react-router';

// ! Testing actions

const Dashboard = props => {
  React.useEffect(() => {
    props.updateLocalAvatar();
  }, []);

  return (
    <Div>
      <Row>
        <Col span={24}>
          <Card type="inner" style={{ height: '80rem', background: '#F7F9FC' }}>
            <small>WORK SPACE HERE</small>
          </Card>
        </Col>
      </Row>
    </Div>
  );
};

const Div = styled.div``;

const mapStateToProps = () => {
  return {};
};
export default connect(mapStateToProps, { updateLocalAvatar })(Dashboard);
