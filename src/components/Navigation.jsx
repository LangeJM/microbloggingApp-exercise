import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import {
  Link
} from "react-router-dom";

const Navigation = () => {
    return (
        <div className="nav-bar d-flex justify-content-center" >
            <div className="w-50">
                <Navbar>
                <Navbar.Brand>Micro Blogging App</Navbar.Brand>
                    <Nav className="mr-auto">
                        <Link className="m-2" to="/home" href="#home"><strong>Home</strong></Link>
                        <Link className="m-2" to="/profile" href="#link"><strong>Profile</strong></Link>
                    </Nav>
                </Navbar>
            </div>
        </div>
    )
}

export default Navigation;

