import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Container from 'react-bootstrap/Container'

import {
  Link
} from "react-router-dom";


const Navigation = (props) => {
    return (
        <Container>
            <Navbar bg="light" expand="lg">
            <Navbar.Brand href="#home">Micro Blogging App</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                <Link to="/home"><Nav.Link href="#home">Home</Nav.Link></Link>
                <Link to="/profile"><Nav.Link href="#link">Profile</Nav.Link></Link>
                </Nav>
            </Navbar.Collapse>
            </Navbar>
        </Container>
    )
}

export default Navigation;
