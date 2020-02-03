import React, { useState } from 'react';
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Row,
  Col,
  Container,
} from 'reactstrap';
import classnames from 'classnames';
import { Event } from '../Shared/Tracking';

import Table from '../Table';
import Tips from '../Tips';
import Acknowledgements from '../Acknowledgements';

import './styles.scss';

const Tabs = () => {
  const [activeTab, setActiveTab] = useState('1');

  const toggle = tab => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  return (
    <Container>
      <Nav tabs>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '1' })}
            onClick={() => {
              toggle('1');
              Event('Tabs', 'Clicked Tab', 'Question List tab');
            }}
          >
            Question List
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '2' })}
            onClick={() => {
              toggle('2');
              Event('Tabs', 'Clicked Tab', 'Tips tab');
            }}
          >
            Tips
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '3' })}
            onClick={() => {
              toggle('3');
              Event('Tabs', 'Clicked Tab', 'Acknowledgements tab');
            }}
          >
            Acknowledgements
          </NavLink>
        </NavItem>
      </Nav>
      <Container>
        <TabContent activeTab={activeTab}>
          <TabPane tabId="1">
            <Row>
              <Col>
                <Table />
              </Col>
            </Row>
          </TabPane>
          <TabPane tabId="2">
            <Row>
              <Col>
                <Tips />
              </Col>
            </Row>
          </TabPane>
          <TabPane tabId="3">
            <Row>
              <Col>
                <Acknowledgements />
              </Col>
            </Row>
          </TabPane>
        </TabContent>
      </Container>
    </Container>
  );
};

export default Tabs;
