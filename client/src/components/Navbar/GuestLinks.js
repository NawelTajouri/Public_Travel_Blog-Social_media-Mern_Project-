import React from "react";
import { Navbar, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';

export default function () {
  return (
    <>
      <Navbar.Text>
     
          <Link
            to="/login"
            style={{ color: "inherit", textDecoration: "inherit" }}
          >
               <Button variant="outline-success" className="mx-1">
            Login
        </Button>
          </Link>
      </Navbar.Text>
      <Navbar.Text>
          <Link
            style={{ color: "inherit", textDecoration: "inherit" }}
            to="/SignUp"
          >
        <Button variant="outline-success" className="mx-1">
        SignUp
        </Button>
          </Link>
      </Navbar.Text>
    </>
  );
}