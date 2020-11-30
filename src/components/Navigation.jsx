import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Container  from 'react-bootstrap/Container'

// import {Nav, NavDropdown, Form, FormControl, Button} from 

const Navigation = (props) => {
    return (
        <Container>
            <Navbar bg="light" expand="lg">
            <Navbar.Brand href="#home">Micro Blogging App</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                <Nav.Link href="#home">Home</Nav.Link>
                <Nav.Link href="#link">Profile</Nav.Link>
                </Nav>
            </Navbar.Collapse>
            </Navbar>
        </Container>
)}


export default Navigation;
