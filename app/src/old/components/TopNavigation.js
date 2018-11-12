import React from 'react'
import { Nav, NavItem, NavLink } from 'reactstrap';

const TopNavigation =()=>
  (
        <Nav>
          <NavItem>
            <NavLink href='/'>Dom</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href='/swiatlo'>Światło</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href='/ogrzewanie'>Ogrzewanie</NavLink>
          </NavItem>
        </Nav>
   )

export default TopNavigation
