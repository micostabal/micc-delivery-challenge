import React from 'react';
import '@blueprintjs/core/lib/css/blueprint.css';
import "./NavBar.css";
import {
  Navbar,
  NavbarGroup,
  NavbarHeading,
  NavbarDivider,
  Button
} from '@blueprintjs/core';
import { Link } from "react-router-dom";
import nv_logo from "../../delivery.svg";

const NavBar = () => {
  return (
    <div style={{
        display: 'block', width: "100%", padding: 30,
        color: "#354456"
    }}>
        <Navbar>
          <NavbarGroup align={'left'} margin-top={"0px"}>
            <div>
              <img
                src={nv_logo}
                className="NavBar-logo"
                alt="my-logo.svg"
                style={{width: "2em"}}
              />
            </div>
            <NavbarDivider />
            <NavbarHeading>Delivery System</NavbarHeading>
            <NavbarDivider />
          </NavbarGroup>
          <NavbarGroup align={'right'}>
            <NavbarDivider />
            <Link to="/">
              <Button minimal={true}>
                Search
              </Button>
            </Link>
            <NavbarDivider />
            <Link to="/historical-results">
              <Button minimal={true}>Historical</Button>
            </Link>
          </NavbarGroup>
        </Navbar>
    </div>
  );
};

export default NavBar;