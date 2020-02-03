import React from 'react';
import {
  Container,
  Nav,
  Navbar,
  NavbarBrand,
  NavLink,
  NavItem,
} from 'reactstrap';
import { FaGithub } from 'react-icons/fa';
import { Event } from '../Shared/Tracking';

import './styles.scss';

const Navigation = () => {
  return (
    <Navbar color="light" light>
      <Container>
        <NavbarBrand
          onClick={() =>
            Event('Navigation', 'Clicked link', 'Leetcode Patterns link')
          }
        >
          Leetcode Patterns
        </NavbarBrand>
        <Nav className="ml-auto" navbar>
          <NavItem>
            <NavLink
              target="_blank"
              href="https://github.com/SeanPrashad/leetcode-patterns"
              onClick={() => Event('Navigation', 'Clicked link', 'GitHub link')}
            >
              <FaGithub />
            </NavLink>
          </NavItem>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Navigation;
