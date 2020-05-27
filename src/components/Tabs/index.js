import React, { useState } from 'react';
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
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
      <TabContent activeTab={activeTab}>
        <TabPane tabId="1">
          <Table />
        </TabPane>
        <TabPane tabId="2">
          <Tips />
        </TabPane>
        <TabPane tabId="3">
          <Acknowledgements />
        </TabPane>
      </TabContent>
    </Container>
  );
};

export default Tabs;
