import React from 'react'
import { Container, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import GuestLinks from "./GuestLinks";

import 'bootstrap/dist/css/bootstrap.css';
import './Navbar.css';

const Navigation = () => {
    return (
      <>
        <Navbar  fixed="top" variant="light"expand="lg" style={{ backgroundColor: "pink", textDecoration: "inherit" }}>
        <Container>
          <Navbar.Brand>
            <Link to="/" style={{ color: "green", textDecoration: "none" }}>
              TravelBlog
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
             <GuestLinks />
          </Navbar.Collapse>
          </Container>
        </Navbar>
        
        </>
    )
    
}

export default Navigation
